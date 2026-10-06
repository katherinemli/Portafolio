// fx.js — extra playful effects, all decorative. Load after the GSAP and Vue inline scripts.
(() => {
  if (!window.gsap) return;
  const css = document.createElement('style');
  css.textContent = `
.fx-sky { position: fixed; inset: 0; z-index: -1; overflow: hidden; pointer-events: none; }
.fx-sky span { position: absolute; font-size: 22px; line-height: 1; color: var(--accent); opacity: .16; will-change: transform; }
.fx-pop { position: fixed; z-index: 70; pointer-events: none; font: 18px/1 var(--body); color: var(--accent); translate: -50% -50%; }
.fx-paw { position: fixed; z-index: 30; pointer-events: none; font-size: 15px; line-height: 1; opacity: .5; translate: -50% -50%; }
.fx-note { position: absolute; z-index: 5; pointer-events: none; font: 700 24px/1 var(--display); color: var(--accent); }
.fx-squiggle { position: absolute; left: 0; bottom: -10px; width: 100%; height: 12px; overflow: visible; pointer-events: none; }
.fx-squiggle path { fill: none; stroke: var(--accent); stroke-width: 3; stroke-linecap: round; opacity: .6; }
.fx-has-squiggle { position: relative; }
.fx-peek-box { position: absolute; right: 0; top: 0; width: 40px; height: 40px; overflow: hidden; pointer-events: none; }
.fx-peek { position: absolute; left: 4px; bottom: 0; font-size: 30px; line-height: 1; }
footer { position: relative; padding-top: 48px !important; }
.fx-spark { position: absolute; z-index: 3; pointer-events: none; font-size: 12px; color: var(--accent); translate: -50% -50%; }
`;
  document.head.appendChild(css);

  const mm = gsap.matchMedia();
  const rnd = gsap.utils.random;

  // Burst of hearts/sparkles at a screen point (non-blocking).
  function pop(x, y, glyphs = ['♥', '✦', '✿', '★'], n = 16) {
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.className = 'fx-pop'; s.setAttribute('aria-hidden', 'true');
      s.textContent = glyphs[i % glyphs.length];
      s.style.left = x + 'px'; s.style.top = y + 'px';
      s.style.color = ['var(--accent)', '#c45ad9', '#ffb703', '#ff7aa8'][i % 4];
      document.body.appendChild(s);
      const a = rnd(0, Math.PI * 2), d = rnd(40, 120);
      gsap.fromTo(s, { scale: 0 }, {
        x: Math.cos(a) * d, y: Math.sin(a) * d - 40, scale: rnd(.7, 1.5), rotate: rnd(-120, 120),
        autoAlpha: 0, duration: rnd(.8, 1.3), ease: 'power3.out', onComplete: () => s.remove(),
      });
    }
  }

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const cleanups = [];
    const on = (el, ev, fn, opt) => { el.addEventListener(ev, fn, opt); cleanups.push(() => el.removeEventListener(ev, fn, opt)); };

    // 1. Confetti when someone goes to LinkedIn or grabs the CV. The link still works.
    document.querySelectorAll('.links .lk, #contact .lk').forEach(a => on(a, 'click', e => {
      const r = a.getBoundingClientRect();
      pop(e.clientX || r.left + r.width / 2, e.clientY || r.top + r.height / 2,
        a.classList.contains('cvlink') ? ['📄', '✦', '♥'] : ['♥', '✦', '✿', '★']);
    }));

    // 2. The job title does a wave on hover: same letters, so its width never changes
    //    (a random-letter scramble made the italic line wrap and the page jump).
    const role = document.querySelector('.role');
    if (role) {
      let busy = false;
      on(role, 'pointerenter', () => {
        if (busy) return; busy = true;
        const st = SplitText.create(role, { type: 'chars' });
        gsap.timeline({ onComplete: () => {
          st.revert();
          // end on the current language's text, even if FR/EN was switched mid-wave
          if (typeof T !== 'undefined' && typeof lang !== 'undefined') role.innerHTML = T[lang].role;
          busy = false;
        } })
          .to(st.chars, { y: -12, color: '#c45ad9', duration: .18, ease: 'power2.out', stagger: .03 })
          .to(st.chars, { y: 0, clearProps: 'color', duration: .5, ease: 'bounce.out', stagger: .03 }, .18);
      });
    }

    // 3. Floating doodles in the background, drifting and parallaxing with the scroll.
    const sky = document.createElement('div');
    sky.className = 'fx-sky'; sky.setAttribute('aria-hidden', 'true');
    const doodles = ['✦', '✿', '♥', '🛰', '🐾', '★', '✦', '♪', '✿', '🐾', '♥', '✦'];
    doodles.forEach((g, i) => {
      const s = document.createElement('span');
      s.textContent = g;
      s.style.left = (5 + (i * 83) % 90) + '%';
      s.style.top = (8 + (i * 47) % 85) + '%';
      s.style.fontSize = rnd(14, 30) + 'px';
      sky.appendChild(s);
      gsap.to(s, { y: rnd(-30, 30), x: rnd(-20, 20), rotate: rnd(-40, 40), duration: rnd(4, 8), ease: 'sine.inOut', yoyo: true, repeat: -1 });
    });
    document.body.prepend(sky);
    cleanups.push(() => sky.remove());
    gsap.utils.toArray(sky.children).forEach((s, i) => {
      gsap.to(s, { yPercent: -((i % 4) + 1) * 120, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 1 } });
    });

    // 4. Tags wobble like jelly on hover.
    document.querySelectorAll('.tags li').forEach(t => on(t, 'pointerenter', () => {
      gsap.fromTo(t, { scaleX: 1.25, scaleY: .8 }, { scaleX: 1, scaleY: 1, duration: .8, ease: 'elastic.out(1.2, .3)', overwrite: 'auto' });
    }));

    // 5. Stats squash-and-stretch once they finished counting (the count-up lasts ~2.2 s).
    document.querySelectorAll('.stats .num').forEach((n, i) => {
      gsap.set(n, { display: 'inline-block', transformOrigin: '50% 100%' });
      ScrollTrigger.create({
        trigger: n, start: 'top 95%', once: true,
        onEnter: () => gsap.delayedCall(2.3 + i * .12, () =>
          gsap.timeline().to(n, { scaleX: 1.3, scaleY: .7, duration: .12 }).to(n, { scaleX: .9, scaleY: 1.2, duration: .12 })
            .to(n, { scaleX: 1, scaleY: 1, duration: .6, ease: 'elastic.out(1, .3)' })),
      });
      on(n, 'pointerenter', () => gsap.fromTo(n, { scaleY: 1.3, scaleX: .85 }, { scaleY: 1, scaleX: 1, duration: .7, ease: 'elastic.out(1, .3)', overwrite: 'auto' }));
    });

    // 6. A hand-drawn squiggle draws itself under each section title.
    document.querySelectorAll('section h2').forEach(h => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'fx-squiggle'); svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('viewBox', '0 0 200 12'); svg.setAttribute('preserveAspectRatio', 'none');
      svg.innerHTML = '<path d="M2 7 Q 15 1 28 7 T 54 7 T 80 7 T 106 7 T 132 7 T 158 7 T 184 7 L198 6"/>';
      h.classList.add('fx-has-squiggle'); h.appendChild(svg);
      cleanups.push(() => svg.remove());
      gsap.fromTo(svg.querySelector('path'), { drawSVG: 0 }, { drawSVG: '100%', duration: 1, ease: 'power2.inOut', scrollTrigger: { trigger: h, start: 'top 85%', once: true } });
    });

    // 7. A little cat peeks out of the footer when it comes into view.
    const foot = document.querySelector('footer');
    if (foot) {
      const box = document.createElement('span');
      box.className = 'fx-peek-box'; box.setAttribute('aria-hidden', 'true');
      const peek = document.createElement('span');
      peek.className = 'fx-peek'; peek.textContent = '🐈';
      box.appendChild(peek); foot.appendChild(box); cleanups.push(() => box.remove());
      gsap.set(peek, { yPercent: 110 });
      ScrollTrigger.create({
        trigger: foot, start: 'top 98%',
        onEnter: () => gsap.timeline().to(peek, { yPercent: 0, duration: .5, ease: 'back.out(2)' })
          .to(peek, { rotate: -12, duration: .15, yoyo: true, repeat: 3 }, '+=.3'),
        onLeaveBack: () => gsap.to(peek, { yPercent: 110, duration: .3 }),
      });
    }

    // 8. Clicking the avatar cat sends a few music notes floating up.
    const av = document.querySelector('.avatar');
    if (av) on(av, 'click', () => {
      const host = av.parentElement; host.style.position = 'relative';
      for (let i = 0; i < 5; i++) {
        const s = document.createElement('span');
        s.className = 'fx-note'; s.setAttribute('aria-hidden', 'true'); s.textContent = i % 2 ? '♫' : '♪';
        s.style.left = rnd(25, 75) + '%'; s.style.top = '30%';
        host.appendChild(s);
        gsap.fromTo(s, { y: 0, autoAlpha: 1, scale: .4 }, { y: rnd(-90, -150), x: rnd(-40, 40), rotate: rnd(-30, 30), scale: 1, autoAlpha: 0, duration: rnd(1.2, 1.8), delay: i * .1, ease: 'power1.out', onComplete: () => s.remove() });
      }
    });

    return () => cleanups.forEach(f => f());
  });

  mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
    // 9. A fading trail of paw prints follows the mouse.
    let last = null, flip = false;
    const paw = e => {
      if (last && Math.hypot(e.clientX - last.x, e.clientY - last.y) < 70) return;
      const ang = last ? Math.atan2(e.clientY - last.y, e.clientX - last.x) * 180 / Math.PI + 90 : 0;
      last = { x: e.clientX, y: e.clientY }; flip = !flip;
      const s = document.createElement('span');
      s.className = 'fx-paw'; s.setAttribute('aria-hidden', 'true'); s.textContent = '🐾';
      const off = flip ? 8 : -8, rad = (ang - 90) * Math.PI / 180;
      s.style.left = e.clientX - Math.sin(rad) * off + 'px'; s.style.top = e.clientY + Math.cos(rad) * off + 'px';
      s.style.rotate = ang + 'deg';
      document.body.appendChild(s);
      gsap.to(s, { autoAlpha: 0, scale: .6, duration: 1.4, delay: .3, ease: 'power1.in', onComplete: () => s.remove() });
    };
    addEventListener('pointermove', paw);

    // 10. Sparkles trail the cursor across the Comtech card.
    const card = document.querySelector('#experience .job-now');
    let lastSpark = 0;
    const spark = e => {
      const now = performance.now(); if (now - lastSpark < 45) return; lastSpark = now;
      const r = card.getBoundingClientRect();
      const s = document.createElement('span');
      s.className = 'fx-spark'; s.setAttribute('aria-hidden', 'true'); s.textContent = ['✦', '·', '✧'][now % 3 | 0];
      s.style.left = e.clientX - r.left + 'px'; s.style.top = e.clientY - r.top + 'px';
      card.appendChild(s);
      gsap.fromTo(s, { scale: 1.2 }, { y: rnd(10, 30), x: rnd(-12, 12), scale: 0, autoAlpha: 0, duration: .8, ease: 'power2.out', onComplete: () => s.remove() });
    };
    if (card) card.addEventListener('pointermove', spark);

    return () => { removeEventListener('pointermove', paw); card?.removeEventListener('pointermove', spark); };
  });

  // ------------------------------------------------------------------
  // Round 2: pure nonsense, just for fun.
  // ------------------------------------------------------------------
  const css2 = document.createElement('style');
  css2.textContent = `
.fx-fall { position: fixed; z-index: 65; pointer-events: none; font-size: 30px; line-height: 1; translate: -50% -50%; }
.fx-star { position: fixed; z-index: 2; pointer-events: none; width: 120px; height: 2px; border-radius: 2px;
  background: linear-gradient(90deg, transparent, var(--accent)); }
.fx-star::after { content: '✦'; position: absolute; right: -8px; top: -9px; font-size: 16px; color: var(--accent); }
.fx-ufo { position: fixed; z-index: 66; pointer-events: none; font-size: 44px; line-height: 1; top: 18%; left: 0; }
.fx-zzz { position: fixed; z-index: 66; pointer-events: none; font: italic 600 28px var(--display); color: var(--accent); }
.fx-toast { position: fixed; z-index: 80; left: 50%; bottom: 92px; translate: -50% 0; pointer-events: none;
  background: var(--ink); color: var(--paper); font: 600 15px var(--body); padding: 12px 20px; border-radius: 999px; white-space: nowrap; }
.fx-disco .sheet { animation: fx-hue 1.2s linear infinite; }
@keyframes fx-hue { to { filter: hue-rotate(360deg); } }
.kpi b { display: inline-block; }
.stats .num { cursor: pointer; }
.fx-peek { pointer-events: auto; cursor: pointer; }
.fx-peek-box { pointer-events: auto; overflow: visible; }
`;
  document.head.appendChild(css2);
  const L = () => (document.documentElement.lang || '').startsWith('en') ? 'en' : 'fr';
  const toast = (txt, ms = 2600) => {
    const t = document.createElement('div'); t.className = 'fx-toast'; t.setAttribute('aria-hidden', 'true'); t.textContent = txt;
    document.body.appendChild(t);
    gsap.timeline({ onComplete: () => t.remove() }).from(t, { y: 40, autoAlpha: 0, duration: .4, ease: 'back.out(2)' }).to(t, { y: 40, autoAlpha: 0, duration: .3 }, `+=${ms / 1000}`);
  };
  const rain = (n = 60) => {
    const glyphs = ['♥', '✦', '✿', '★', '🌸', '🍓', '🎀'];
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span'); s.className = 'fx-fall'; s.setAttribute('aria-hidden', 'true');
      s.textContent = glyphs[i % glyphs.length]; s.style.fontSize = rnd(14, 30) + 'px';
      s.style.left = rnd(0, innerWidth) + 'px'; s.style.top = '-40px';
      s.style.color = ['var(--accent)', '#c45ad9', '#ffb703', '#ff7aa8'][i % 4];
      document.body.appendChild(s);
      gsap.to(s, { y: innerHeight + 80, x: rnd(-80, 80), rotate: rnd(-360, 360), duration: rnd(2, 4), delay: rnd(0, 1.2), ease: 'power1.in', onComplete: () => s.remove() });
    }
  };

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const cleanups = [];
    const on = (el, ev, fn, opt) => { el.addEventListener(ev, fn, opt); cleanups.push(() => el.removeEventListener(ev, fn, opt)); };

    // 11. Click on empty space: a random thing falls with gravity and bounces.
    on(document, 'click', e => {
      if (e.target.closest('a, button, input, .avatar, .job, .stats, h1, .tags, .plist, .lang, .fx-peek-box')) return;
      const s = document.createElement('span'); s.className = 'fx-fall'; s.setAttribute('aria-hidden', 'true');
      s.textContent = ['🍓', '🌸', '🐟', '🦄', '🍩', '⭐', '🧁', '🍉', '🐙', '🌈'][Math.floor(rnd(0, 10))];
      s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px';
      document.body.appendChild(s);
      const floor = innerHeight - 20 - e.clientY;
      gsap.timeline({ onComplete: () => s.remove() })
        .fromTo(s, { scale: 0 }, { scale: 1, duration: .2, ease: 'back.out(3)' })
        .to(s, { y: floor, x: rnd(-60, 60), rotate: rnd(-200, 200), duration: .9, ease: 'bounce.out' })
        .to(s, { autoAlpha: 0, scale: .4, duration: .5 }, '+=.5');
    });

    // 12. Shooting stars every few seconds.
    const shoot = () => {
      const st = document.createElement('span'); st.className = 'fx-star'; st.setAttribute('aria-hidden', 'true');
      document.body.appendChild(st);
      const y = rnd(40, innerHeight * .5);
      gsap.fromTo(st, { x: -160, y, rotate: 18, autoAlpha: 0 }, { x: innerWidth + 60, y: y + innerWidth * .32, autoAlpha: 1, duration: 1.3, ease: 'power1.in', onComplete: () => st.remove() });
    };
    const starTimer = setInterval(() => { if (!document.hidden) shoot(); }, 7000);
    cleanups.push(() => clearInterval(starTimer));

    // 13. Scroll down really fast and a UFO crosses the screen.
    let ufoBusy = false;
    const ufoST = ScrollTrigger.create({ onUpdate: self => {
      if (ufoBusy || self.getVelocity() < 2600) return;
      ufoBusy = true;
      const u = document.createElement('span'); u.className = 'fx-ufo'; u.setAttribute('aria-hidden', 'true'); u.textContent = '🛸';
      document.body.appendChild(u);
      gsap.timeline({ onComplete: () => { u.remove(); ufoBusy = false; } })
        .fromTo(u, { x: -70 }, { x: innerWidth + 70, duration: 1.8, ease: 'none' })
        .to(u, { y: 30, duration: .3, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 0);
    } });
    cleanups.push(() => ufoST.kill());

    // 14. Nobody touches anything for 10 s: zzz, and the bubbles fall asleep. Any move wakes them up.
    let idle, sleeping = false, zzzTl;
    const sleep = () => {
      sleeping = true;
      gsap.to('.bubble', { y: 60, rotate: 20, duration: 1.4, ease: 'power2.in', overwrite: 'auto' });
      const hero = document.querySelector('.hero h1');
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      zzzTl = gsap.timeline({ repeat: -1 });
      ['z', 'z', 'Z'].forEach((c, i) => {
        const z = document.createElement('span'); z.className = 'fx-zzz'; z.setAttribute('aria-hidden', 'true'); z.textContent = c;
        z.style.left = Math.min(innerWidth - 40, r.right - 20) + 'px'; z.style.top = Math.max(20, r.top) + 'px';
        document.body.appendChild(z);
        zzzTl.fromTo(z, { x: 0, y: 0, autoAlpha: 0, scale: .5 }, { x: 30 + i * 12, y: -60 - i * 10, autoAlpha: 1, scale: 1 + i * .3, duration: 1.4, ease: 'sine.out' }, i * .5)
          .to(z, { autoAlpha: 0, duration: .4 }, i * .5 + 1.2);
      });
    };
    const wake = () => {
      clearTimeout(idle);
      if (sleeping) {
        sleeping = false;
        zzzTl?.kill(); document.querySelectorAll('.fx-zzz').forEach(z => z.remove());
        gsap.to('.bubble', { y: -30, rotate: 0, duration: .3, ease: 'power2.out', overwrite: 'auto', onComplete: () => gsap.to('.bubble', { y: 0, duration: .8, ease: 'bounce.out' }) });
      }
      idle = setTimeout(sleep, 10000);
    };
    ['pointermove', 'keydown', 'scroll', 'touchstart'].forEach(ev => on(window, ev, wake, { passive: true }));
    wake();
    cleanups.push(() => clearTimeout(idle));

    // 15. Double-click my name: the letters explode and come back.
    const h1 = document.querySelector('h1');
    if (h1) on(h1, 'mousedown', e => { if (e.detail > 1) e.preventDefault(); });
    if (h1) on(h1, 'dblclick', () => {
      getSelection()?.removeAllRanges();
      const chars = h1.querySelectorAll('.name div, .name span');
      const letters = [...chars].filter(c => c.children.length === 0 && c.textContent.trim().length === 1);
      gsap.timeline()
        .to(letters, { x: () => rnd(-300, 300), y: () => rnd(-250, 200), rotate: () => rnd(-540, 540), duration: .6, ease: 'power3.out' })
        .to(letters, { x: 0, y: 0, rotate: 0, duration: 1, ease: 'elastic.out(1, .5)', stagger: .01 }, '+=.25');
    });

    // 16. Click a stat: +1 for fun, then it goes back.
    document.querySelectorAll('.stats .num').forEach(n => on(n, 'click', () => {
      const v = +n.textContent;
      if (Number.isNaN(v) || gsap.isTweening(n)) return;
      n.textContent = v + 1;
      gsap.timeline().fromTo(n, { scale: 1.6, rotate: -10 }, { scale: 1, rotate: 0, duration: .5, ease: 'back.out(3)' })
        .add(() => { n.textContent = v; }, '+=.8').fromTo(n, { y: -8 }, { y: 0, duration: .4, ease: 'bounce.out' });
      toast(L() === 'en' ? 'nice try 😹' : 'bien essayé 😹', 1000);
    }));

    // 17. The −80 % shakes like an alarm on hover.
    const kpi = document.querySelector('.kpi b');
    if (kpi) on(kpi.closest('.kpi'), 'pointerenter', () => {
      if (gsap.isTweening(kpi)) return;
      gsap.fromTo(kpi, { x: -6, rotate: -4 }, { x: 6, rotate: 4, duration: .06, repeat: 9, yoyo: true, ease: 'none', onComplete: () => gsap.set(kpi, { x: 0, rotate: 0 }) });
    });

    // 18. Type "fiesta": disco mode with confetti rain.
    let typed = '';
    on(window, 'keydown', e => {
      typed = (typed + (e.key || '').toLowerCase()).slice(-6);
      if (typed !== 'fiesta') return;
      typed = '';
      window.count?.('fiesta');
      document.documentElement.classList.add('fx-disco'); rain(80);
      toast('🪩 FIESTA 🪩', 2400);
      setTimeout(() => document.documentElement.classList.remove('fx-disco'), 4000);
    });

    // 19. Reach the very bottom: confetti and a thank-you.
    let thanked = false;
    const endST = ScrollTrigger.create({ trigger: 'footer', start: 'bottom bottom', onEnter: () => {
      if (thanked) return; thanked = true;
      rain(50); toast(L() === 'en' ? 'Thanks for scrolling all the way ♥' : 'Merci d’être venu·e jusqu’ici ♥');
    } });
    cleanups.push(() => endST.kill());

    // 20. The little flowers of the ribbon spin forever.
    gsap.to('.track i', { rotate: 360, duration: 3, ease: 'none', repeat: -1, transformOrigin: '50% 55%' });
    gsap.set('.track i', { display: 'inline-block' });

    // 21. Click the footer cat: miaou, and a jump.
    const peek = document.querySelector('.fx-peek');
    if (peek) on(peek, 'click', () => {
      gsap.timeline().to(peek, { y: -40, rotate: 20, duration: .25, ease: 'power2.out' }).to(peek, { y: 0, rotate: 0, duration: .6, ease: 'bounce.out' });
      toast('miaou ! 🐾', 1200);
    });

    return () => cleanups.forEach(f => f());
  });

  // ------------------------------------------------------------------
  // Round 3: one personal animation per experience card.
  // ------------------------------------------------------------------
  if (window.Flip) gsap.registerPlugin(Flip);
  const css3 = document.createElement('style');
  css3.textContent = `
.fx-deco { position: absolute; pointer-events: none; z-index: -1; }
.fx-stars { inset: 0; overflow: hidden; border-radius: inherit; }
.fx-stars i { position: absolute; border-radius: 50%; background: var(--brand); }
.fx-scan { left: 0; right: 0; height: 80px; border-radius: inherit; background: linear-gradient(transparent, color-mix(in srgb, var(--brand) 30%, transparent), transparent); opacity: 0; }
.fx-orbit { z-index: 3; font-size: 24px; line-height: 1; left: 0; top: 0; opacity: 0; translate: -50% -50%; }
.fx-box { position: absolute; z-index: 3; pointer-events: none; font-size: 22px; line-height: 1; }
.fx-ping { z-index: 0; left: 50%; top: 42%; width: 70px; height: 70px; margin: -35px 0 0 -35px; border-radius: 50%; border: 3px solid var(--brand); opacity: 0; }
.fx-siren-ico { position: absolute; z-index: 3; right: 14px; top: 12px; font-size: 26px; line-height: 1; pointer-events: none; opacity: 0; }
.fx-rank { position: absolute; z-index: 3; pointer-events: none; font: 700 11px/1 var(--mono); color: var(--on-accent); background: var(--accent); padding: 3px 6px; border-radius: 999px; }
.fx-siren { transition: none !important; }
`;
  document.head.appendChild(css3);

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const cleanups = [];
    const on = (el, ev, fn, opt) => { el.addEventListener(ev, fn, opt); cleanups.push(() => el.removeEventListener(ev, fn, opt)); };
    const deco = (card, cls, tag = 'div') => {
      const d = document.createElement(tag); d.className = 'fx-deco ' + cls; d.setAttribute('aria-hidden', 'true');
      card.prepend(d); cleanups.push(() => d.remove()); return d;
    };
    const once = (card, fn) => ScrollTrigger.create({ trigger: card, start: 'top 80%', once: true, onEnter: fn });

    // Comtech: a little starry sky in the card, a scan beam when it appears,
    // and a satellite that orbits the card while the mouse is on it.
    const ct = document.querySelector('#job-comtech');
    if (ct) {
      const sky = deco(ct, 'fx-stars');
      for (let i = 0; i < 30; i++) {
        const d = document.createElement('i'), z = rnd(2, 4.5);
        Object.assign(d.style, { left: rnd(0, 100) + '%', top: rnd(0, 100) + '%', width: z + 'px', height: z + 'px' });
        sky.appendChild(d);
        gsap.fromTo(d, { opacity: .1 }, { opacity: rnd(.4, .9), duration: rnd(.6, 1.8), repeat: -1, yoyo: true, delay: rnd(0, 2), ease: 'sine.inOut' });
      }
      const scan = deco(ct, 'fx-scan');
      once(ct, () => gsap.fromTo(scan, { top: -80, opacity: 1 }, { top: ct.offsetHeight, duration: 1.5, ease: 'power1.inOut', onComplete: () => gsap.set(scan, { opacity: 0 }) }));
      const sat = deco(ct, 'fx-orbit'); sat.textContent = '🛰️';
      let orbit;
      on(ct, 'pointerenter', () => {
        const w = ct.clientWidth, h = ct.clientHeight, m = 14;
        orbit?.kill();
        gsap.to(sat, { opacity: 1, duration: .3 });
        orbit = gsap.fromTo(sat, { x: m, y: m }, {
          motionPath: { path: [{ x: m, y: m }, { x: w - m, y: m }, { x: w - m, y: h - m }, { x: m, y: h - m }, { x: m, y: m }], curviness: 0 },
          duration: 7, ease: 'none', repeat: -1,
        });
      });
      on(ct, 'pointerleave', () => { orbit?.kill(); gsap.to(sat, { opacity: 0, duration: .3 }); });
    }

    // wherEX: the card's parts fly in from everywhere and snap together like microservices;
    // on hover the tags re-rank themselves (their ranking algorithm) and #1 gets a badge.
    const wx = document.querySelector('#job-wherex');
    if (wx) {
      const parts = [...wx.children].filter(c => !c.classList.contains('fx-deco'));
      gsap.set(parts, { x: () => rnd(-90, 90), y: () => rnd(-70, 70), rotate: () => rnd(-14, 14) });
      once(wx, () => gsap.to(parts, { x: 0, y: 0, rotate: 0, duration: .9, stagger: .08, ease: 'back.out(1.7)', clearProps: 'transform' }));
      const ul = wx.querySelector('.tags');
      if (ul && window.Flip) on(wx, 'pointerenter', () => {
        const state = Flip.getState(ul.children);
        [...ul.children].sort(() => Math.random() - .5).forEach(li => ul.appendChild(li));
        Flip.from(state, { duration: .6, ease: 'power2.inOut', stagger: .04, onComplete: () => {
          const first = ul.children[0], r1 = first.getBoundingClientRect(), rc = wx.getBoundingClientRect();
          const b = document.createElement('span'); b.className = 'fx-rank'; b.setAttribute('aria-hidden', 'true'); b.textContent = '#1';
          b.style.left = (r1.left - rc.left + r1.width - 10) + 'px'; b.style.top = (r1.top - rc.top - 10) + 'px';
          wx.appendChild(b);
          gsap.timeline({ onComplete: () => b.remove() }).from(b, { scale: 0, duration: .3, ease: 'back.out(3)' }).to(b, { opacity: 0, duration: .3 }, '+=.9');
        } });
      });
    }

    // Falabella: the card drives in from the left and brakes with a bump;
    // on hover parcels drop in and the −80 % counts up again.
    const fb = document.querySelector('#job-falabella');
    if (fb) {
      gsap.set(fb, { x: -140, skewX: 10 });
      once(fb, () => gsap.timeline()
        .to(fb, { x: 0, skewX: 0, duration: .8, ease: 'power3.out' })
        .fromTo(fb, { skewX: -7 }, { skewX: 0, duration: .7, ease: 'elastic.out(1, .35)' })
        .set(fb, { clearProps: 'x,skewX' }));
      const kb = fb.querySelector('.kpi b'), kOrig = kb?.innerHTML;
      let busy = false;
      on(fb, 'pointerenter', () => {
        if (busy) return; busy = true;
        const k = kb?.getBoundingClientRect(), rc = fb.getBoundingClientRect();
        for (let i = 0; i < 4; i++) {
          const p = document.createElement('span'); p.className = 'fx-box'; p.setAttribute('aria-hidden', 'true'); p.textContent = '📦';
          const x = (k ? k.left - rc.left + k.width : rc.width / 2) + rnd(0, 120), y = k ? k.top - rc.top : 120;
          p.style.left = x + 'px'; p.style.top = '-30px';
          fb.appendChild(p);
          gsap.timeline({ delay: i * .12, onComplete: () => p.remove() })
            .to(p, { y: y + 30, rotate: rnd(-40, 40), duration: .7, ease: 'bounce.out' })
            .to(p, { opacity: 0, duration: .3 }, '+=.4');
        }
        if (kb) {
          const o = { v: 0 };
          gsap.to(o, { v: 80, duration: .9, ease: 'power2.out', onUpdate: () => { kb.innerHTML = '−' + Math.round(o.v) + '&nbsp;%'; },
            onComplete: () => { kb.innerHTML = kOrig; busy = false; } });
        } else busy = false;
      });
    }

    // CITIAPS: a radar ping when it appears; on hover, emergency siren lights on the border.
    const ci = document.querySelector('#job-citiaps');
    if (ci) {
      const ping = deco(ci, 'fx-ping');
      once(ci, () => gsap.fromTo(ping, { scale: .2, opacity: .8 }, { scale: 4.5, opacity: 0, duration: 1.4, repeat: 2, ease: 'power1.out' }));
      const ico = document.createElement('span'); ico.className = 'fx-siren-ico'; ico.setAttribute('aria-hidden', 'true'); ico.textContent = '🚨';
      ci.appendChild(ico); cleanups.push(() => ico.remove());
      let siren;
      on(ci, 'pointerenter', () => {
        ci.classList.add('fx-siren');
        siren?.kill();
        siren = gsap.timeline({ repeat: -1 })
          .set(ci, { boxShadow: '0 0 0 3px #e8505b, 0 0 34px #e8505b99', borderColor: '#e8505b' })
          .set(ci, { boxShadow: '0 0 0 3px #3b82f6, 0 0 34px #3b82f699', borderColor: '#3b82f6' }, .25)
          .set({}, {}, .5);
        gsap.to(ico, { opacity: 1, duration: .2 });
        gsap.fromTo(ico, { rotate: -15 }, { rotate: 15, duration: .12, repeat: -1, yoyo: true, ease: 'none', id: 'sirenIco' });
      });
      on(ci, 'pointerleave', () => {
        siren?.kill(); gsap.getById('sirenIco')?.kill();
        gsap.set(ci, { clearProps: 'boxShadow,borderColor' }); ci.classList.remove('fx-siren');
        gsap.to(ico, { opacity: 0, rotate: 0, duration: .2 });
      });
    }

    return () => cleanups.forEach(f => f());
  });

  // ------------------------------------------------------------------
  // Round 4: a toy for every GSAP plugin we hadn't touched yet.
  // ------------------------------------------------------------------
  const have = n => typeof window[n] !== 'undefined';
  ['Draggable', 'InertiaPlugin', 'MorphSVGPlugin', 'Physics2DPlugin', 'PhysicsPropsPlugin', 'ScrambleTextPlugin',
   'CustomEase', 'CustomWiggle', 'CustomBounce', 'EasePack', 'Observer', 'RoughEase'].forEach(n => { if (have(n)) gsap.registerPlugin(window[n]); });
  const css4 = document.createElement('style');
  css4.textContent = `
#about .skills li { cursor: grab; touch-action: none; position: relative; z-index: 1; }
#about .skills li:active { cursor: grabbing; }
#about { position: relative; }
.avatar { touch-action: none; }
.bubble { pointer-events: auto; cursor: pointer; }
.fx-conf { position: fixed; z-index: 70; width: 9px; height: 14px; border-radius: 2px; pointer-events: none; }
.now-pill { cursor: pointer; }
.kpi b { cursor: pointer; }
`;
  document.head.appendChild(css4);
  if (have('CustomBounce')) CustomBounce.create('fruitBounce', { strength: .6, squash: 3, squashID: 'fruitBounce-squash' });
  if (have('CustomWiggle')) CustomWiggle.create('quake', { wiggles: 14, type: 'uniform' });

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const cleanups = [];
    const on = (el, ev, fn, opt) => { el.addEventListener(ev, fn, opt); cleanups.push(() => el.removeEventListener(ev, fn, opt)); };

    // 22. Draggable + Inertia: skill chips are fridge magnets — drag, throw, bounce off the edges.
    if (have('Draggable')) {
      const chips = gsap.utils.toArray('#about .skills li');
      const ds = Draggable.create(chips, { type: 'x,y', bounds: '#about', inertia: have('InertiaPlugin'), edgeResistance: .6,
        onPress() { gsap.to(this.target, { scale: 1.15, rotate: rnd(-8, 8), duration: .2 }); },
        onRelease() { gsap.to(this.target, { scale: 1, duration: .3 }); } });
      cleanups.push(() => ds.forEach(d => d.kill()));

      // 23. Throw the cat avatar across the screen; it walks back home after a moment.
      const home = document.querySelector('#avatar');
      if (home) {
        let back;
        const [dc] = Draggable.create(home, { type: 'x,y', trigger: '#avatar .avatar', dragClickables: true, minimumMovement: 8,
          inertia: have('InertiaPlugin'), bounds: window,
          onPress() { back?.kill(); },
          onDragStart() { gsap.to(home, { rotate: rnd(-25, 25), duration: .3 }); },
          onThrowComplete() { back = gsap.to(home, { x: 0, y: 0, rotate: 0, duration: 1.2, delay: 1.2, ease: 'elastic.out(1, .5)' }); },
          onRelease() { if (!this.tween) back = gsap.to(home, { x: 0, y: 0, rotate: 0, duration: 1.2, delay: 1.2, ease: 'elastic.out(1, .5)' }); } });
        cleanups.push(() => dc.kill());
      }
    }

    // 24. MorphSVG: section squiggles turn into a heart on hover.
    if (have('MorphSVGPlugin')) {
      const heart = 'M100 11 C 92 3 80 1 76 5 C 70 11 82 17 100 11 C 118 17 130 11 124 5 C 120 1 108 3 100 11 Z';
      document.querySelectorAll('section h2').forEach(h => {
        const path = h.querySelector('.fx-squiggle path'); if (!path) return;
        const orig = path.getAttribute('d');
        on(h, 'pointerenter', () => gsap.to(path, { morphSVG: heart, fill: 'var(--accent)', duration: .5, ease: 'back.out(2)' }));
        on(h, 'pointerleave', () => gsap.to(path, { morphSVG: orig, fill: 'none', duration: .5 }));
      });
    }

    // 25. Physics2D: the "Currently" pill shoots a confetti fountain with real gravity.
    const pill = document.querySelector('.now-pill');
    if (pill && have('Physics2DPlugin')) on(pill, 'click', () => {
      const r = pill.getBoundingClientRect();
      for (let i = 0; i < 70; i++) {
        const c = document.createElement('i'); c.className = 'fx-conf'; c.setAttribute('aria-hidden', 'true');
        c.style.left = r.left + r.width / 2 + 'px'; c.style.top = r.top + 'px';
        c.style.background = ['#f7941d', '#ed1c5b', '#7900a6', '#28b095', '#aad500', '#e8505b'][i % 6];
        document.body.appendChild(c);
        gsap.to(c, { physics2D: { velocity: rnd(380, 720), angle: rnd(235, 305), gravity: 900 }, rotation: rnd(-720, 720), duration: 2.4, ease: 'none', onComplete: () => c.remove() });
      }
    });

    // 26. PhysicsProps: click a bubble and it flies off with friction, then floats back.
    if (have('PhysicsPropsPlugin')) document.querySelectorAll('.bubble').forEach(b => on(b, 'click', e => {
      e.stopPropagation();
      gsap.timeline()
        .to(b, { physicsProps: { x: { velocity: rnd(-700, 700), friction: .08 }, y: { velocity: rnd(-600, -200), acceleration: 600, friction: .04 } }, rotation: rnd(-360, 360), duration: 1.6 })
        .to(b, { x: 0, y: 0, rotation: 0, duration: 1.4, ease: 'elastic.out(1, .4)' });
    }));

    // 27. ScrambleText: job dates decode in binary on hover (monospace, so nothing moves).
    if (have('ScrambleTextPlugin')) document.querySelectorAll('.jobs-past .label, .sec-head .label').forEach(l => on(l, 'pointerenter', () => {
      if (gsap.isTweening(l)) return;
      gsap.to(l, { duration: .9, scrambleText: { text: l.textContent, chars: '01', revealDelay: .3, speed: .6 } });
    }));

    // 28. CustomWiggle: click the −80 % for an earthquake.
    const kb = document.querySelector('.kpi b');
    if (kb && have('CustomWiggle')) on(kb, 'click', () => {
      gsap.fromTo(kb, { x: 0 }, { x: 14, rotate: 6, duration: 1, ease: 'quake', clearProps: 'x,rotate' });
      gsap.fromTo(document.querySelector('#job-falabella'), { y: 0 }, { y: 6, duration: 1, ease: 'quake', clearProps: 'y' });
    });

    // 29. CustomBounce: fruit that falls on empty clicks now squashes when it lands (overrides 11's motion).
    if (have('CustomBounce')) on(document, 'click', e => {
      if (e.target.closest('a, button, input, .avatar, .job, .stats, h1, .tags, .plist, .lang, .fx-peek-box, .bubble, .now-pill')) return;
      requestAnimationFrame(() => {
        const s = [...document.querySelectorAll('.fx-fall')].pop(); if (!s) return;
        gsap.killTweensOf(s);
        const floor = innerHeight - 30 - e.clientY;
        gsap.timeline({ onComplete: () => s.remove() })
          .fromTo(s, { y: 0, scale: 1 }, { y: floor, duration: 1.4, ease: 'fruitBounce' })
          .to(s, { scaleX: 1.6, scaleY: .5, duration: 1.4, ease: 'fruitBounce-squash', transformOrigin: '50% 100%' }, 0)
          .to(s, { autoAlpha: 0, duration: .4 }, '+=.3');
      });
    });

    // 30. RoughEase: the Comtech "LIVE" label flickers like a broken neon sign.
    const live = document.querySelector('.ill-sat .label-t');
    if (live && have('RoughEase')) gsap.to(live, { opacity: .15, duration: 2.5, repeat: -1, yoyo: true,
      ease: RoughEase.ease.config({ template: 'none', strength: 2, points: 30, taper: 'none', randomize: true, clamp: true }) });

    // 31. Observer: spin the wheel fast and my name stretches with the speed.
    if (have('Observer')) {
      const name = document.querySelector('h1 .name');
      const sk = gsap.quickTo(name, 'skewX', { duration: .4, ease: 'power3' });
      const sy = gsap.quickTo(name, 'scaleY', { duration: .4, ease: 'power3' });
      const obs = Observer.create({ target: window, type: 'wheel,touch', onChange: self => {
        const v = gsap.utils.clamp(-1, 1, self.velocityY / 4000);
        sk(v * -14); sy(1 + Math.abs(v) * .25);
      }, onStop: () => { sk(0); sy(1); }, onStopDelay: .15 });
      cleanups.push(() => obs.kill());
    }

    return () => cleanups.forEach(f => f());
  });
})();
