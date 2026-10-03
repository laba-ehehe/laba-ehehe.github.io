// Shared content renderers: every prototype styles these generic classes in its own way.
window.C = (() => {
  const D = window.PORTFOLIO;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  const chips = a => a.map(t => `<span class="chip">${esc(t)}</span>`).join('');
  const bullets = a => `<ul class="c-bullets">${a.map(b => `<li>${fmt(b)}</li>`).join('')}</ul>`;

  const item = x => `
    <article class="c-item">
      <header><div><h3>${esc(x.role)}</h3><p class="c-org">${esc(x.org)}</p></div><span class="c-date">${esc(x.dates)}</span></header>
      ${x.sub ? `<p class="c-sub">${esc(x.sub)}</p>` : ''}
      ${x.stat ? `<p class="c-stat"><b>${esc(x.stat[0])}</b> ${esc(x.stat[1])}</p>` : ''}
      ${bullets(x.bullets)}
    </article>`;

  const proj = p => `
    <article class="c-proj">
      ${p.img ? `<img class="c-img" src="${p.img}" alt="${esc(p.name)} preview" loading="lazy">` : ''}
      <div class="c-proj-body">
        <h3>${esc(p.name)}</h3>
        ${p.awards ? `<p class="c-award">🏆 ${esc(p.awards.join(' · '))} — ${esc(p.event||'')}</p>` : p.badge ? `<p class="c-award">${esc(p.badge)}</p>` : ''}
        ${p.role ? `<p class="c-org">${esc(p.role)} · ${esc(p.dates)}</p>` : ''}
        <p>${esc(p.desc)}</p>
        ${p.points ? bullets(p.points) : ''}
        <div class="c-chips">${chips(p.tags)}</div>
        ${p.links.length ? `<div class="c-links">${p.links.map(([t, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(t)} ↗</a>`).join('')}</div>` : ''}
      </div>
    </article>`;

  const sections = {
    profile: () => {
      const p = D.profile, e = p.education;
      return `<div class="c-about">
        <div class="c-stats">${p.stats.map(([n, l]) => `<div class="c-stat-box"><b>${esc(n)}</b><span>${esc(l)}</span></div>`).join('')}</div>
        ${p.about.map(t => `<p>${esc(t)}</p>`).join('')}
        <div class="c-edu"><h3>🎓 ${esc(e.school)}</h3><p class="c-org">${esc(e.dates)}</p>
          <ul class="c-bullets">${e.degrees.map(d => `<li>${fmt(d)}</li>`).join('')}</ul>
          <div class="c-chips">${chips(e.certificates)}</div></div>
      </div>`;
    },
    skills: () => D.skills.map(g => `<div class="c-group"><h4>${esc(g.name)}</h4><div class="c-chips">${chips(g.items)}</div></div>`).join(''),
    experience: () => D.experience.map(item).join(''),
    projects: () => {
      const main = D.projects.filter(p => !p.side), side = D.projects.filter(p => p.side);
      return `<div class="c-proj-grid">${main.map(proj).join('')}</div><h4 class="c-sub-h">side quests</h4><div class="c-proj-grid">${side.map(proj).join('')}</div>`;
    },
    leadership: () => D.leadership.map(item).join(''),
    contact: () => `
      <div class="c-contact">
        <p class="c-big">Let's build something together!</p>
        <p>Internships, collabs, or just a hello: my inbox is open.</p>
        <p class="c-row"><a class="c-btn" href="mailto:${D.email}">✉ ${esc(D.email)}</a>
          <a class="c-btn" href="${D.resume}" download="Lan-Anh-Do-Resume.pdf">⬇ resume</a>
          <a class="c-btn" href="${D.github}" target="_blank" rel="noopener">GitHub ↗</a>
          <a class="c-btn" href="${D.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a></p>
        <form class="c-form" action="https://formspree.io/f/myznprrw" method="POST">
          <div class="c-form-row"><input name="fullname" placeholder="your name" required autocomplete="name"><input name="email" type="email" placeholder="you@email.com" required autocomplete="email"></div>
          <textarea name="message" rows="4" placeholder="say hi!" required></textarea>
          <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">
          <div class="c-row"><button class="c-btn" type="submit">send ♡</button><span class="c-msg" role="status"></span></div>
        </form>
      </div>`
  };

  // make the contact form submit via fetch (Formspree), inside a given root element
  function wire(root) {
    root.querySelectorAll('.c-form').forEach(f => {
      if (f.dataset.wired) return; f.dataset.wired = 1;
      const msg = f.querySelector('.c-msg'), btn = f.querySelector('button');
      f.addEventListener('submit', async e => {
        e.preventDefault(); btn.disabled = true; msg.textContent = 'sending…';
        try {
          const r = await fetch(f.action, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } });
          if (!r.ok) throw 0; f.reset(); msg.textContent = 'sent! thank you ♡';
        } catch { msg.textContent = 'oops, that did not send. email me directly?'; }
        btn.disabled = false;
      });
    });
  }

  const get = id => sections[id]();
  return { esc, fmt, chips, sections, get, wire, D };
})();
