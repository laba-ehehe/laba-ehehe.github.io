(() => {
  'use strict';
  const D = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => matchMedia('(max-width: 900px)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } }
  };

  // text helpers (content is our own, but escape anyway); **x** -> <strong>
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  const chips = a => a.map(t => `<span class="chip">${esc(t)}</span>`).join('');

  const root = document.documentElement;
  const isNight = () => root.dataset.theme === 'night';

  /* ---------- cats that depend on theme (they sleep at night) ---------- */
  const MASCOT = { fur: 'cream', costume: 'bow' };
  const mascot = $('#mascot');
  let peekFur = 'orange';

  function renderCats() {
    const night = isNight();
    mascot.innerHTML = Cat.svg({ ...MASCOT, pose: night ? 'sleep' : 'wave', cls: 'cat-mascot' });
    $('#peekCard').innerHTML = Cat.svg({ fur: 'orange', pose: night ? 'sleep-peek' : 'peek' });
    $('#peekPanel').innerHTML = Cat.svg({ fur: peekFur, pose: night ? 'sleep-peek' : 'peek' });
  }

  /* ---------- theme ---------- */
  function setTheme(t) {
    root.dataset.theme = t;
    const night = t === 'night';
    $('#themeIcon').textContent = night ? '☀' : '☾';
    $('#themeText').textContent = night ? 'day' : 'night';
    $('#themeBtn').setAttribute('aria-label', night ? 'Switch to day theme' : 'Switch to night theme');
    const m = $('meta[name="theme-color"]'); if (m) m.content = night ? '#222b49' : '#fff8ee';
    store.set('theme', t);
    renderCats();
  }
  $('#themeBtn').addEventListener('click', () => {
    setTheme(isNight() ? 'day' : 'night');
    say(isNight() ? "shhh… mochi is sleeping 💤" : "good morning! nya~ ☀");
  });

  /* ---------- decorations ---------- */
  $('#brandCat').innerHTML = Cat.svg({ fur: 'cream', pose: 'peek' });
  $('#consoleCat').innerHTML = Cat.svg({ fur: 'cream', pose: 'peek' });
  $('#bootCat').innerHTML = Cat.svg({ fur: 'cream', costume: 'bow', pose: 'wave' });
  (function bgDoodles() {
    const items = [
      ['star', '#ffe28f', '6%', '24%', 26, 0], ['paw', '#f4d3c4', '38%', '17%', 24, -2], ['fish', '#a9d8f0', '31%', '88%', 52, -4],
      ['star', '#cbbcf6', '94%', '28%', 22, -1], ['paw', '#cfe6d6', '88%', '84%', 28, -3], ['fish', '#f8c3cf', '12%', '70%', 46, -5],
      ['star', '#ffd0bb', '60%', '92%', 20, -2], ['paw', '#c9e4f5', '3%', '48%', 22, -6]
    ];
    $('#bg').innerHTML = items.map(([k, c, x, y, w, d]) =>
      `<span class="doodle" style="left:${x};top:${y};width:${w}px;animation-delay:${d}s">${Cat.decor[k](c)}</span>`).join('') +
      '<span class="moon" aria-hidden="true">☾</span>';
  })();

  /* ---------- clock (Gainesville time) ---------- */
  const fmtClock = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: '2-digit' });
  const tick = () => { $('#clock').textContent = fmtClock.format(new Date()); };
  tick(); setInterval(tick, 15000);

  /* ---------- console typewriter ---------- */
  let typer = null;
  function say(text) {
    const out = $('#consoleText');
    clearInterval(typer);
    if (reduceMotion) { out.textContent = text; return; }
    let i = 0; out.textContent = '';
    typer = setInterval(() => {
      out.textContent = text.slice(0, ++i);
      if (i >= text.length) clearInterval(typer);
    }, 24);
  }

  /* ---------- profile card ---------- */
  $('#pRole').textContent = D.profile.role;
  $('#pMotto').textContent = '“' + D.profile.tagline + '”';
  $('#pFacts').innerHTML = D.profile.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');

  /* ---------- dial ---------- */
  const ring = $('#ring');
  const mods = D.modules;
  const STEP = 360 / mods.length;
  const BUBBLES = ['#fcd9df', '#fff0bf', '#cfe9f8', '#d8f1e2', '#e6defb', '#ffe0cc'];
  let rot = 0, current = null, lastBtn = null;

  ring.innerHTML = mods.map((m, i) => `
    <div class="node" style="--a:${i * STEP}deg; --c:${BUBBLES[i % BUBBLES.length]}; --d:${-i * 0.9}s"><div class="node-rot">
      <button class="node-btn" type="button" data-id="${m.id}" aria-label="${m.label}">
        <span class="bubble">${Cat.svg(m.cat)}</span>
        <span class="node-name">${m.label}</span>
      </button>
    </div></div>`).join('');
  const nodeRots = [...ring.querySelectorAll('.node-rot')];

  function applyRot() {
    ring.style.transform = `rotate(${rot}deg)`;
    nodeRots.forEach((n, i) => { n.style.transform = `rotate(${-(i * STEP + rot)}deg)`; });
  }
  function rotateTo(i) {
    const target = -i * STEP;
    const delta = ((target - rot) % 360 + 540) % 360 - 180; // shortest path
    rot += delta; applyRot();
  }
  applyRot();

  /* ---------- mascot: eyes follow the pointer, click for a meow ---------- */
  let ptr = null;
  addEventListener('pointermove', e => {
    if (reduceMotion || isNight()) return;
    if (!ptr) requestAnimationFrame(look);
    ptr = e;
  }, { passive: true });
  function look() {
    const e = ptr; ptr = null;
    const eyes = mascot.querySelector('.look'); if (!eyes || !e) return;
    const r = mascot.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * .42);
    const dist = Math.hypot(dx, dy) || 1, k = Math.min(1, dist / 220);
    eyes.style.transform = `translate(${(dx / dist) * 4.5 * k}px, ${(dy / dist) * 3.5 * k}px)`;
  }
  const MEOWS = ['nyan!', 'mew~', 'prrr…', 'nya!', '♡'];
  mascot.addEventListener('click', () => {
    const pop = document.createElement('span');
    pop.className = 'pop';
    pop.textContent = isNight() ? 'zzz…' : MEOWS[Math.floor(Math.random() * MEOWS.length)];
    $('#center').appendChild(pop);
    setTimeout(() => pop.remove(), 1100);
    mascot.classList.remove('boing'); void mascot.offsetWidth; mascot.classList.add('boing');
    say(isNight() ? "mochi is asleep… come back in the morning" : "you petted mochi! she purrs ♡");
  });

  /* paw-print pops wherever you tap */
  let lastPaw = 0;
  addEventListener('pointerdown', e => {
    if (reduceMotion || e.target.closest('input, textarea, select')) return;
    const now = performance.now(); if (now - lastPaw < 140) return; lastPaw = now;
    const p = document.createElement('span');
    p.className = 'paw-pop';
    p.style.left = e.clientX + 'px'; p.style.top = e.clientY + 'px';
    p.style.setProperty('--tilt', (Math.random() * 50 - 25) + 'deg');
    p.innerHTML = Cat.decor.paw(isNight() ? '#b9a9e8' : '#efb8a8');
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }, { passive: true });

  /* ---------- renderers ---------- */
  const R = {};
  R.profile = () => {
    const p = D.profile, e = p.education;
    return `
      <div class="stats rise" style="--i:0">${p.stats.map(([n, l]) => `<div class="stat"><b>${esc(n)}</b><span>${esc(l)}</span></div>`).join('')}</div>
      <div class="about rise" style="--i:1">${p.about.map(t => `<p>${esc(t)}</p>`).join('')}</div>
      <article class="block rise" style="--i:2">
        <h3>🎓 Education</h3>
        <div class="row"><strong>${esc(e.school)}</strong><span class="pill">${esc(e.dates)}</span></div>
        <ul class="plain">${e.degrees.map(d => `<li>${fmt(d)}</li>`).join('')}</ul>
        <div class="chips"><span class="chip-label">certificates</span>${chips(e.certificates)}</div>
      </article>`;
  };
  R.skills = () => D.skills.map((g, i) => `
      <article class="block rise" style="--i:${i}">
        <div class="row"><h3>${esc(g.name)}</h3><span class="count">${g.items.length} spells</span></div>
        <div class="chips">${chips(g.items)}</div>
      </article>`).join('');
  const timeline = list => `<div class="timeline">${list.map((x, i) => `
      <article class="tl rise" style="--i:${i}">
        <div class="row"><div><h3>${esc(x.role)}</h3><p class="org">${esc(x.org)}</p></div><span class="pill">${esc(x.dates)}</span></div>
        ${x.sub ? `<p class="sub">${esc(x.sub)}</p>` : ''}
        ${x.stat ? `<div class="badge-stat"><b>${esc(x.stat[0])}</b> ${esc(x.stat[1])}</div>` : ''}
        <ul>${x.bullets.map(b => `<li>${fmt(b)}</li>`).join('')}</ul>
      </article>`).join('')}</div>`;
  R.experience = () => timeline(D.experience);
  R.leadership = () => timeline(D.leadership);
  const projCard = (p, i) => `
      <article class="proj rise" style="--i:${i}">
        <div class="proj-art ${p.img ? '' : 'noimg'}">${p.img ? `<img src="${p.img}" alt="${esc(p.name)} preview" loading="lazy">` : Cat.svg({ fur: 'cream', costume: 'hardhat', pose: 'wave' })}</div>
        <div class="proj-body">
          <h3>${esc(p.name)}</h3>
          ${p.badge ? `<p class="award">${esc(p.badge)}</p>` : ''}
          ${p.role ? `<p class="org">${esc(p.role)} · ${esc(p.dates)}</p>` : ''}
          <p>${esc(p.desc)}</p>
          ${p.points ? `<ul>${p.points.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
          <div class="chips">${chips(p.tags)}</div>
          ${p.links.length ? `<div class="links">${p.links.map(([t, u]) => `<a class="btn-sm" href="${u}" target="_blank" rel="noopener">${esc(t)} ↗</a>`).join('')}</div>` : ''}
        </div>
      </article>`;
  R.projects = () => {
    const main = D.projects.filter(p => !p.side), side = D.projects.filter(p => p.side);
    return `<div class="proj-grid">${main.map(projCard).join('')}</div>
      <h3 class="section-sub rise" style="--i:4">🐟 side quests</h3>
      <div class="proj-grid">${side.map((p, i) => projCard(p, i + 5)).join('')}</div>`;
  };
  R.contact = () => `
      <article class="block mail rise" style="--i:0">
        <p class="big">Let's build something together!</p>
        <p>Internships, collabs, or just a hello: my inbox is open.</p>
        <div class="row-gap">
          <a class="btn" href="mailto:${D.email}">✉ ${esc(D.email)}</a>
          <button class="btn-ghost" id="copyBtn" type="button">copy email</button>
        </div>
      </article>
      <form class="block form rise" style="--i:1" id="contactForm" action="https://formspree.io/f/myznprrw" method="POST">
        <h3>💌 Send a letter</h3>
        <div class="form-row">
          <label>Name<input name="fullname" type="text" placeholder="your name" autocomplete="name" required></label>
          <label>Email<input name="email" type="email" placeholder="you@email.com" autocomplete="email" required></label>
        </div>
        <label>Message<textarea name="message" rows="5" placeholder="say hi!" required></textarea></label>
        <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true">
        <div class="row-gap"><button class="btn" type="submit" id="sendBtn">send ♡</button><span class="form-msg" id="formMsg" role="status"></span></div>
      </form>
      <div class="link-grid">
        <a class="block link rise" style="--i:2" href="${D.github}" target="_blank" rel="noopener"><span>🐙</span><b>GitHub</b><em>laba-ehehe</em></a>
        <a class="block link rise" style="--i:3" href="${D.linkedin}" target="_blank" rel="noopener"><span>💼</span><b>LinkedIn</b><em>lananhnguyendo</em></a>
        <a class="block link rise" style="--i:4" href="${D.resume}" download="Lan-Anh-Do-Resume.pdf"><span>📄</span><b>Resume</b><em>PDF · updated Oct 2026</em></a>
      </div>`;

  function wireForm() {
    const f = $('#contactForm'); if (!f) return;
    const msg = $('#formMsg'), btn = $('#sendBtn');
    f.addEventListener('submit', async e => {
      e.preventDefault();
      btn.disabled = true; msg.className = 'form-msg'; msg.textContent = 'sending…';
      try {
        const r = await fetch(f.action, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } });
        if (!r.ok) throw new Error(r.status);
        f.reset(); msg.classList.add('ok'); msg.textContent = 'sent! thank you ♡';
        say("letter delivered by paw! she'll reply soon ✿");
      } catch {
        msg.classList.add('err'); msg.textContent = 'oops, that did not send. email me directly?';
      }
      btn.disabled = false;
    });
  }

  /* ---------- panel open / close ---------- */
  const panel = $('#panel'), hud = $('#hud'), body = $('#panelBody');

  function select(id, { updateHash = true } = {}) {
    const i = mods.findIndex(m => m.id === id);
    if (i < 0) return;
    const m = mods[i];
    current = id;
    rotateTo(i);
    ring.querySelectorAll('.node-btn').forEach(b => {
      const on = b.dataset.id === id;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on);
      if (on) lastBtn = b;
    });
    peekFur = m.cat.fur === 'white' ? 'cream' : m.cat.fur;
    $('#peekPanel').innerHTML = Cat.svg({ fur: peekFur, pose: isNight() ? 'sleep-peek' : 'peek' });
    $('#panelIcon').innerHTML = Cat.svg(m.cat);
    $('#panelIcon').style.setProperty('--c', BUBBLES[i % BUBBLES.length]);
    $('#panelKicker').textContent = m.kicker;
    $('#panelTitle').textContent = m.title;
    $('#panelCode').textContent = 'No. ' + m.code;
    $('#panelTag').textContent = m.tag;
    $('#cLabel').textContent = m.label;
    body.innerHTML = R[id]();
    body.scrollTop = 0;
    const cb = $('#copyBtn');
    if (cb) cb.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(D.email); cb.textContent = 'copied ✓'; }
      catch { cb.textContent = D.email; }
      setTimeout(() => { cb.textContent = 'copy email'; }, 1800);
    });
    wireForm();
    hud.classList.add('open');
    document.body.classList.toggle('lock', isMobile());
    panel.removeAttribute('inert'); panel.setAttribute('aria-hidden', 'false');
    $('#stageHint').textContent = 'scroll or ← → to flip through';
    say(m.say);
    if (updateHash) history.replaceState(null, '', '#' + id);
    setTimeout(() => body.focus({ preventScroll: true }), 350);
  }

  function close() {
    if (!current) return;
    current = null;
    hud.classList.remove('open');
    document.body.classList.remove('lock');
    panel.setAttribute('inert', ''); panel.setAttribute('aria-hidden', 'true');
    ring.querySelectorAll('.node-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', false); });
    $('#cLabel').textContent = 'pick a friend';
    $('#stageHint').textContent = 'tap a cat · or scroll · or use ← →';
    say("bye bye! come back soon nya~ ♡");
    history.replaceState(null, '', location.pathname + location.search);
    if (lastBtn) lastBtn.focus({ preventScroll: true });
  }

  function step(dir) {
    const i = current ? mods.findIndex(m => m.id === current) : (dir > 0 ? -1 : 0);
    select(mods[(i + dir + mods.length) % mods.length].id);
  }

  ring.addEventListener('click', e => {
    const b = e.target.closest('.node-btn'); if (!b) return;
    select(b.dataset.id);
  });
  document.addEventListener('click', e => {
    const o = e.target.closest('[data-open]'); if (o) select(o.dataset.open);
  });
  $('#backBtn').addEventListener('click', close);
  $('#brand').addEventListener('click', e => { e.preventDefault(); close(); });

  // wheel flips modules (desktop only; the mobile page scrolls normally)
  let wheelLock = false;
  $('#stage').addEventListener('wheel', e => {
    if (isMobile() || wheelLock || Math.abs(e.deltaY) < 12) return;
    e.preventDefault();
    wheelLock = true; setTimeout(() => { wheelLock = false; }, 650);
    step(e.deltaY > 0 ? 1 : -1);
  }, { passive: false });

  document.addEventListener('keydown', e => {
    if (e.target.closest('input, textarea') || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
  });

  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    if (mods.some(m => m.id === id)) { if (id !== current) select(id, { updateHash: false }); }
    else close();
  });

  /* ---------- boot: paw prints fill as it loads ---------- */
  const bootEl = $('#boot');
  const PAWS = 6;
  $('#bootPaws').innerHTML = Array.from({ length: PAWS }, (_, i) => `<span class="bp" style="--r:${i % 2 ? 12 : -12}deg">${Cat.decor.paw('currentColor')}</span>`).join('');
  const bootSteps = ["waking up mochi…", "counting fish treats…", "fluffing the cushions…", "sweeping up paw prints ✦", "ready! nyan ♡"];
  function start() {
    const id = location.hash.slice(1);
    if (mods.some(m => m.id === id)) select(id, { updateHash: false });
    else say("nya~ hi! i'm mochi. pick a cat to see what she's made ✿");
  }
  function finishBoot() {
    if (bootEl.classList.contains('done')) return;
    bootEl.classList.add('done');
    setTimeout(() => bootEl.remove(), 700);
    store.set('seen', '1');
    start();
  }
  setTheme(store.get('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'));
  if (store.get('seen') === '1' || reduceMotion) {
    bootEl.remove(); start();
  } else {
    const t0 = performance.now(), DUR = 2400;
    const pct = $('#bootPct'), msg = $('#bootMsg'), paws = [...document.querySelectorAll('.bp')];
    (function loop(now) {
      if (bootEl.classList.contains('done')) return;
      const p = Math.min(1, (now - t0) / DUR);
      pct.textContent = Math.round(p * 100) + '%';
      msg.textContent = bootSteps[Math.min(bootSteps.length - 1, Math.floor(p * bootSteps.length))];
      paws.forEach((el, i) => el.classList.toggle('on', p >= (i + 1) / PAWS - 0.04));
      p < 1 ? requestAnimationFrame(loop) : setTimeout(finishBoot, 280);
    })(t0);
    bootEl.addEventListener('click', finishBoot);
    addEventListener('keydown', finishBoot, { once: true });
  }
})();
