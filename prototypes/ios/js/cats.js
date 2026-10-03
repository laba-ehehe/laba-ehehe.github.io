// Original flat-pastel cat illustrations (SVG generated in code). Style: chubby loaf cats,
// wide-set dot eyes, tiny "w" mouth, blush, costumes. No third-party art.
window.Cat = (() => {
  const FURS = {
    cream:  { fur: '#fff1dc', fur2: '#f2d9b8', belly: '#fffaf1', ear: '#ffc4bd', line: '#b99580', eye: '#3a2c2c' },
    orange: { fur: '#ffc888', fur2: '#f0a25a', belly: '#fff0dc', ear: '#ffb3a3', line: '#c77f45', eye: '#3a2c2c', tabby: true },
    grey:   { fur: '#d3d9e4', fur2: '#aeb8ca', belly: '#f3f5f9', ear: '#f5bfc6', line: '#7f8ba3', eye: '#33303b' },
    black:  { fur: '#5d5864', fur2: '#46414d', belly: '#7b7583', ear: '#d99aa6', line: '#2b2730', eye: '#ffe9a0' },
    white:  { fur: '#ffffff', fur2: '#e6eaf2', belly: '#ffffff', ear: '#ffc4cf', line: '#a9b1c3', eye: '#3a2c2c' }
  };
  const BLUSH = '#ffadb0';
  const O = (line, w = 3) => `stroke="${line}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

  function costume(c, f) {
    const L = O(f.line, 3);
    switch (c) {
      case 'wizard': return `
        <path d="M62 58 C74 34 96 8 116 -20 C120 14 134 38 140 58Z" fill="#cbbcf6" ${L}/>
        <path d="M66 52 Q100 66 136 52" fill="none" stroke="#9d8be0" stroke-width="6" stroke-linecap="round"/>
        <ellipse cx="101" cy="58" rx="54" ry="10" fill="#b8a6ee" ${L}/>
        <circle cx="104" cy="26" r="3.6" fill="#ffe793"/><circle cx="118" cy="42" r="2.6" fill="#ffe793"/><circle cx="94" cy="44" r="2.2" fill="#fff"/>`;
      case 'hardhat': return `
        <path d="M56 70 Q58 20 100 18 Q142 20 144 70Z" fill="#ffd45e" ${L}/>
        <rect x="91" y="19" width="18" height="46" rx="6" fill="#ffe591"/>
        <rect x="46" y="64" width="108" height="12" rx="6" fill="#ffc233" ${L}/>`;
      case 'crown': return `
        <path d="M70 54 L68 22 L86 38 L100 12 L114 38 L132 22 L130 54Z" fill="#ffd86b" ${L}/>
        <circle cx="100" cy="42" r="4" fill="#ff9bb0"/><circle cx="82" cy="48" r="3" fill="#9fd7ff"/><circle cx="118" cy="48" r="3" fill="#9fd7ff"/>`;
      case 'bow': return `
        <g transform="translate(142 56) rotate(14)">
          <path d="M0 0 L-24 -14 L-24 14Z M0 0 L24 -14 L24 14Z" fill="#ff9fb8" ${L}/>
          <circle r="6.5" fill="#ff7fa0" ${L}/></g>`;
      default: return '';
    }
  }

  // pose: sit | wave | sleep | peek
  function svg(o = {}) {
    const f = FURS[o.fur || 'cream'];
    const pose = o.pose || 'sit', cos = o.costume || 'none';
    const line = f.line, L = O(line, 3);
    const sleep = pose === 'sleep' || pose === 'sleep-peek';
    const eyeCol = f.eye;
    const eyes = sleep
      ? `<path d="M66 98 q8 8 16 0 M118 98 q8 8 16 0" fill="none" stroke="${eyeCol}" stroke-width="3" stroke-linecap="round"/>`
      : `<g class="eyes"><g class="look"><ellipse cx="76" cy="96" rx="5.4" ry="7.4" fill="${eyeCol}"/><ellipse cx="124" cy="96" rx="5.4" ry="7.4" fill="${eyeCol}"/></g></g>`;
    const mouthCol = o.fur === 'black' ? '#f3e3df' : '#3a2c2c';
    const mouth = `<path d="M92 109 q4 5 8 0 q4 5 8 0" fill="none" stroke="${mouthCol}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    const stripes = f.tabby ? `<path d="M100 47 v14 M88 50 l3 11 M112 50 l-3 11 M44 92 h11 M44 102 h9 M156 92 h-11 M156 102 h-9" fill="none" stroke="${f.fur2}" stroke-width="4.5" stroke-linecap="round"/>` : '';
    const ears = `
      <path d="M48 76 L54 26 L92 52Z" fill="${f.fur}" ${L}/><path d="M152 76 L146 26 L108 52Z" fill="${f.fur}" ${L}/>
      <path d="M60 64 L62 40 L80 52Z" fill="${f.ear}"/><path d="M140 64 L138 40 L120 52Z" fill="${f.ear}"/>`;
    const head = `
      <g class="head">${ears}
        <ellipse cx="100" cy="94" rx="58" ry="46" fill="${f.fur}" ${L}/>
        ${stripes}
        <ellipse cx="58" cy="112" rx="9.5" ry="5.8" fill="${BLUSH}" opacity=".7"/><ellipse cx="142" cy="112" rx="9.5" ry="5.8" fill="${BLUSH}" opacity=".7"/>
        ${eyes}${mouth}
        ${costume(cos, f)}
      </g>`;

    const paws = (cx1, cx2, cy) => `<ellipse cx="${cx1}" cy="${cy}" rx="16" ry="10" fill="${f.fur}" ${L}/><ellipse cx="${cx2}" cy="${cy}" rx="16" ry="10" fill="${f.fur}" ${L}/>`;

    if (pose === 'peek' || pose === 'sleep-peek') {
      return wrap(o, '30 14 140 146', `${head}${paws(72, 128, 142)}`);
    }

    const tail = `<g class="tail"><path d="M146 172 C190 180 196 128 170 118" fill="none" stroke="${line}" stroke-width="17" stroke-linecap="round"/>
        <path d="M146 172 C190 180 196 128 170 118" fill="none" stroke="${f.fur}" stroke-width="11" stroke-linecap="round"/></g>`;
    const body = `<path d="M54 170 C38 124 62 112 100 112 C138 112 162 124 146 170 C140 194 60 194 54 170Z" fill="${f.fur}" ${L}/>
        <ellipse cx="100" cy="162" rx="25" ry="22" fill="${f.belly}"/>`;
    const feet = `<ellipse cx="78" cy="189" rx="16" ry="9" fill="${f.fur}" ${L}/><ellipse cx="122" cy="189" rx="16" ry="9" fill="${f.fur}" ${L}/>`;
    const armL = pose === 'wave'
      ? `<g class="wave"><ellipse cx="38" cy="126" rx="9" ry="16" transform="rotate(34 38 126)" fill="${f.fur}" ${L}/></g>`
      : `<ellipse cx="62" cy="152" rx="9" ry="16" transform="rotate(12 62 152)" fill="${f.fur}" ${L}/>`;
    const armR = `<ellipse cx="138" cy="152" rx="9" ry="16" transform="rotate(-12 138 152)" fill="${f.fur}" ${L}/>`;

    let mid = '', front = '';
    if (cos === 'tie') {
      mid = `<g transform="translate(26 150)"><rect width="42" height="32" rx="7" fill="#c9a077" ${L}/><path d="M14 0 v-7 h14 v7" fill="none" ${L}/><rect x="18" y="12" width="6" height="7" rx="2" fill="#ffe28f"/></g>`;
      front = `<path d="M100 134 l-9 9 l9 6 l9 -6Z" fill="#8cc0e8" ${L}/><path d="M100 150 l-8 26 l8 9 l8 -9Z" fill="#8cc0e8" ${L}/>`;
    }
    if (cos === 'envelope') {
      front = `<path d="M34 152 h132 v40 q0 10 -10 10 H44 q-10 0 -10 -10Z" fill="#fffafb" ${L}/>
        <path d="M34 152 L100 190 L166 152" fill="none" ${L}/>
        <path d="M100 196 c-14 -9 -16 -21 -6 -22 c4 0 6 2 6 5 c0 -3 2 -5 6 -5 c10 1 8 13 -6 22Z" fill="#ff9fb4"/>
        <ellipse cx="66" cy="153" rx="15" ry="9" fill="${f.fur}" ${L}/><ellipse cx="134" cy="153" rx="15" ry="9" fill="${f.fur}" ${L}/>`;
    }
    const zz = sleep ? `<g class="zz" fill="#8fa2d6" font-family="Zen Maru Gothic, sans-serif" font-weight="700"><text x="152" y="52" font-size="22">z</text><text x="168" y="30" font-size="16">z</text></g>` : '';
    const lower = cos === 'envelope' ? '' : `${armL}${armR}${feet}`;
    return wrap(o, '-6 -26 212 236', `${tail}${body}${mid}${lower}${head}${front}${zz}`);
  }

  function wrap(o, vb, inner) {
    const label = o.label ? `role="img" aria-label="${o.label}"` : 'aria-hidden="true"';
    return `<svg class="cat ${o.cls || ''}" viewBox="${vb}" ${label} xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  }

  // small decorative doodles
  const decor = {
    paw: (c = '#e9c9b3') => `<svg viewBox="0 0 32 32" aria-hidden="true"><g fill="${c}"><ellipse cx="16" cy="21" rx="8" ry="6.5"/><ellipse cx="6.5" cy="13" rx="3.2" ry="4.2"/><ellipse cx="12.5" cy="7.5" rx="3.2" ry="4.4"/><ellipse cx="19.5" cy="7.5" rx="3.2" ry="4.4"/><ellipse cx="25.5" cy="13" rx="3.2" ry="4.2"/></g></svg>`,
    fish: (c = '#9fd3ee') => `<svg viewBox="0 0 48 28" aria-hidden="true"><path d="M4 14 C14 2 30 2 38 14 C30 26 14 26 4 14Z" fill="${c}"/><path d="M36 14 L46 5 V23Z" fill="${c}"/><circle cx="12" cy="12" r="2" fill="#3a2c2c"/></svg>`,
    star: (c = '#ffe28f') => `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3 L19.5 12.5 L29 16 L19.5 19.5 L16 29 L12.5 19.5 L3 16 L12.5 12.5Z" fill="${c}"/></svg>`
  };

  return { svg, decor, FURS };
})();
