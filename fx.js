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
.fx-toast { position: fixed; z-index: 80; left: 50%; bottom: 28px; translate: -50% 0; pointer-events: none;
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
      document.documentElement.classList.add('fx-disco'); rain(80);
      toast('🪩 FIESTA 🪩', 2400);
      setTimeout(() => document.documentElement.classList.remove('fx-disco'), 4000);
    });

    // 19. Reach the very bottom: confetti and a thank-you.
    let thanked = false;
    const endST = ScrollTrigger.create({ start: 'max -2', end: 'max', onEnter: () => {
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
})();
