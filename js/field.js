/* Decorative microscope field for the hero.
   Draws drifting cells on a canvas. Histology theme uses H&E stain colours,
   fluorescence theme uses DAPI-blue nuclei on a black field.
   Moves slowly, follows the pointer slightly, and holds still when the
   visitor prefers reduced motion. */
(() => {
  'use strict';

  const canvas = document.getElementById('field');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  const root = document.documentElement;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const WORLD = 1.5; // world is 1.5x the visible circle so wrapped cells stay off-screen
  let size = 0;
  let dpr = 1;
  let raf = 0;
  let last = 0;
  let clock = 0;
  let onScreen = true;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

  /* Small seeded generator so the layout is the same on every visit */
  const rng = (seed) => () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const rand = rng(20260921);

  const cells = [];
  const add = (type, n, rMin, rMax, speed) => {
    for (let i = 0; i < n; i += 1) {
      cells.push({
        type,
        x: rand(),
        y: rand(),
        r: rMin + rand() * (rMax - rMin),
        vx: (rand() - 0.5) * speed,
        vy: (rand() - 0.5) * speed,
        rot: rand() * Math.PI * 2,
        spin: (rand() - 0.5) * 0.06,
        offs: Array.from({ length: 9 }, () => 0.8 + rand() * 0.35),
        nx: (rand() - 0.5) * 0.36,
        ny: (rand() - 0.5) * 0.36,
        nr: 0.36 + rand() * 0.14,
        chr: Array.from({ length: 4 }, () => [rand() * Math.PI * 2, rand() * 0.7])
      });
    }
  };
  add(2, 7, 0.16, 0.28, 0.004); // faint tissue matrix, drawn first
  add(0, 30, 0.05, 0.085, 0.01); // large cells with nuclei
  add(1, 38, 0.018, 0.03, 0.014); // small dense cells

  const PAL = {
    histology: {
      bg: '#f8e6ec',
      matrix: 'rgba(238, 176, 198, 0.35)',
      cyto: 'rgba(233, 122, 155, 0.55)',
      cytoEdge: 'rgba(176, 58, 104, 0.5)',
      nuc: 'rgba(52, 46, 140, 0.88)',
      chr: 'rgba(170, 160, 235, 0.55)',
      small: 'rgba(44, 38, 120, 0.92)',
      blend: 'source-over'
    },
    fluorescence: {
      bg: '#03030a',
      matrix: 'rgba(255, 90, 170, 0.05)',
      cyto: 'rgba(255, 90, 170, 0.14)',
      cytoEdge: 'rgba(255, 130, 195, 0.28)',
      nuc: 'rgba(96, 130, 255, 0.6)',
      chr: 'rgba(210, 225, 255, 0.55)',
      small: 'rgba(120, 155, 255, 0.85)',
      blend: 'lighter'
    }
  };

  const blob = (x, y, r, offs, rot) => {
    const n = offs.length;
    const pts = offs.map((o, i) => {
      const a = rot + (i / n) * Math.PI * 2;
      return [x + Math.cos(a) * r * o, y + Math.sin(a) * r * o];
    });
    ctx.beginPath();
    ctx.moveTo((pts[n - 1][0] + pts[0][0]) / 2, (pts[n - 1][1] + pts[0][1]) / 2);
    for (let i = 0; i < n; i += 1) {
      const p = pts[i];
      const q = pts[(i + 1) % n];
      ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2);
    }
    ctx.closePath();
  };

  const draw = () => {
    if (!size) return;
    const S = size;
    const W = S * WORLD;
    const dark = root.dataset.theme === 'fluorescence';
    const pal = dark ? PAL.fluorescence : PAL.histology;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = pal.bg;
    ctx.fillRect(0, 0, S, S);
    ctx.globalCompositeOperation = pal.blend;

    const shiftX = -(W - S) / 2 + pointer.x * S * 0.05;
    const shiftY = -(W - S) / 2 + pointer.y * S * 0.05;

    for (const c of cells) {
      const gx = (((c.x + c.vx * clock) % 1) + 1) % 1;
      const gy = (((c.y + c.vy * clock) % 1) + 1) % 1;
      const px = gx * W + shiftX;
      const py = gy * W + shiftY;
      const r = c.r * S;
      if (px < -r * 1.6 || px > S + r * 1.6 || py < -r * 1.6 || py > S + r * 1.6) continue;
      const rot = c.rot + c.spin * clock;

      if (c.type === 2) {
        blob(px, py, r, c.offs, rot);
        ctx.fillStyle = pal.matrix;
        ctx.fill();
        continue;
      }

      if (c.type === 1) {
        if (dark) {
          const g = ctx.createRadialGradient(px, py, 0, px, py, r * 2.2);
          g.addColorStop(0, 'rgba(170, 195, 255, 0.85)');
          g.addColorStop(0.5, 'rgba(90, 120, 255, 0.3)');
          g.addColorStop(1, 'rgba(60, 80, 255, 0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(px, py, r * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
        blob(px, py, r, c.offs, rot);
        ctx.fillStyle = pal.small;
        ctx.fill();
        continue;
      }

      // large cell: cytoplasm, then nucleus, then chromatin flecks
      blob(px, py, r, c.offs, rot);
      ctx.fillStyle = pal.cyto;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = pal.cytoEdge;
      ctx.stroke();

      const nx = px + c.nx * r;
      const ny = py + c.ny * r;
      const nr = c.nr * r;

      if (dark) {
        const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr * 2);
        g.addColorStop(0, 'rgba(150, 180, 255, 0.9)');
        g.addColorStop(0.45, 'rgba(80, 110, 255, 0.5)');
        g.addColorStop(1, 'rgba(60, 80, 255, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(nx, ny, nr * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.ellipse(nx, ny, nr, nr * 0.85, rot, 0, Math.PI * 2);
      ctx.fillStyle = pal.nuc;
      ctx.fill();

      ctx.fillStyle = pal.chr;
      for (const [a, d] of c.chr) {
        ctx.beginPath();
        ctx.arc(nx + Math.cos(a) * nr * d, ny + Math.sin(a) * nr * d, Math.max(1, nr * 0.12), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalCompositeOperation = 'source-over';
  };

  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    clock += dt;
    const k = Math.min(1, dt * 3);
    pointer.x += (pointer.tx - pointer.x) * k;
    pointer.y += (pointer.ty - pointer.y) * k;
    draw();
  };

  const start = () => {
    if (raf || motion.matches || !onScreen) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };

  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    size = Math.max(200, Math.round(rect.width));
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = canvas.height = Math.round(size * dpr);
    draw();
  };

  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );

  window.addEventListener('themechange', () => {
    if (!raf) draw();
  });

  const onMotionChange = () => {
    if (motion.matches) {
      stop();
      draw();
    } else {
      start();
    }
  };
  if (motion.addEventListener) motion.addEventListener('change', onMotionChange);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      if (onScreen) start();
      else stop();
    }).observe(canvas);
  }

  if ('ResizeObserver' in window) {
    new ResizeObserver(resize).observe(canvas);
  } else {
    window.addEventListener('resize', resize);
  }

  resize();
  start();
})();
