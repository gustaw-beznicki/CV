// Progressive enhancement: active-section nav highlight, scroll fade-in, the
// print button, and the "circuit" motion layer (PCB canvas, chip parallax,
// scroll progress, spotlights, timeline). All optional — the page is fully
// usable without JS.

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

if (!prefersReducedMotion) {
  document.documentElement.classList.add("has-motion");
}

// Print / Save as PDF buttons (hero CTA + sidebar link).
document.querySelectorAll<HTMLButtonElement>("[data-print]").forEach((btn) => {
  btn.addEventListener("click", () => window.print());
});

// Highlight the sidebar link for the section currently in view.
const sections = document.querySelectorAll<HTMLElement>(".content section");
const navLinks = document.querySelectorAll<HTMLAnchorElement>(".sidebar-nav a");

if (sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`,
            );
          });
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px" },
  );
  sections.forEach((section) => {
    navObserver.observe(section);
  });
}

// Staggered fade-in for cards (skipped when reduced motion is requested).
// Skill rows also cascade their tags in one by one.
const fadeItems = document.querySelectorAll<HTMLElement>(
  ".exp-item, .skill-row, .edu-item, .cert-item",
);

const reveal = (el: HTMLElement) => {
  el.style.opacity = "1";
  el.style.transform = "translateY(0)";
  // Once in place, drop the inline styles so CSS hover transforms work again.
  const done = (e: TransitionEvent) => {
    if (e.target !== el || e.propertyName !== "transform") return;
    el.removeEventListener("transitionend", done);
    el.style.removeProperty("opacity");
    el.style.removeProperty("transform");
    el.style.removeProperty("transition");
  };
  el.addEventListener("transitionend", done);
};
const hide = (el: HTMLElement, transition: string) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(12px)";
  el.style.transition = transition;
};

if (!prefersReducedMotion && fadeItems.length) {
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          reveal(el);
          el.querySelectorAll<HTMLElement>(".skill-tag").forEach(reveal);
          fadeObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.1 },
  );

  fadeItems.forEach((item, i) => {
    hide(
      item,
      `opacity 0.6s ${i * 0.04}s ease, transform 0.6s ${i * 0.04}s ease`,
    );
    item.querySelectorAll<HTMLElement>(".skill-tag").forEach((tag, j) => {
      const delay = 0.15 + j * 0.035;
      hide(
        tag,
        `opacity 0.4s ${delay}s ease, transform 0.4s ${delay}s ease, ` +
          "color 0.2s, background 0.2s, border-color 0.2s, box-shadow 0.2s",
      );
    });
    fadeObserver.observe(item);
  });
}

// Section headers: draw the divider trace + flicker the LED once in view.
if (!prefersReducedMotion) {
  const headerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          headerObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 },
  );
  document.querySelectorAll<HTMLElement>(".section-header").forEach((h) => {
    headerObserver.observe(h);
  });
}

// Cursor spotlight on highlight rows + experience cards.
if (finePointer) {
  document
    .querySelectorAll<HTMLElement>(".highlight, .exp-item")
    .forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
}

// ─── Scroll-linked effects (one rAF-throttled handler) ───
const hero = document.querySelector<HTMLElement>(".hero");
const chip = document.querySelector<HTMLElement>(".chip");
const brandMark = document.querySelector<HTMLElement>(".brand-mark");
const progressBar = document.querySelector<HTMLElement>(".scroll-progress");
const canvas = document.querySelector<HTMLCanvasElement>(".circuit-bg");
const expItems = Array.from(
  document.querySelectorAll<HTMLElement>(".exp-item"),
);

let scrollQueued = false;
const onScroll = () => {
  scrollQueued = false;
  const y = window.scrollY;
  const vh = window.innerHeight;
  const max = document.documentElement.scrollHeight - vh;

  progressBar?.style.setProperty(
    "--progress",
    String(max > 0 ? Math.min(y / max, 1) : 0),
  );

  const heroH = hero?.offsetHeight ?? vh;
  brandMark?.classList.toggle("is-shown", y > heroH * 0.6);

  // Circuit layer: full strength over the hero, quieter behind the content.
  if (canvas) {
    canvas.style.opacity = String(1 - Math.min(y / heroH, 1) * 0.65);
  }

  if (!prefersReducedMotion) {
    if (chip && y < heroH) {
      chip.style.setProperty("--chip-shift", `${(y * 0.18).toFixed(1)}px`);
    }

    // Timeline: fill each rail segment as the reading line (40% down) passes.
    const line = vh * 0.4;
    for (const item of expItems) {
      const r = item.getBoundingClientRect();
      const fill = Math.min(Math.max((line - r.top) / r.height, 0), 1);
      item.style.setProperty("--fill", fill.toFixed(3));
      item.classList.toggle("is-lit", r.top < line);
    }
  }
};

window.addEventListener(
  "scroll",
  () => {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(onScroll);
    }
  },
  { passive: true },
);
onScroll();

// Chip tilts towards the cursor while it's over the hero, and the light on
// the engraved deer + die follows it like a lamp held above the chip (eased
// in rAF; the vars live on .chip so the deer and the die glint share them).
if (hero && chip && finePointer && !prefersReducedMotion) {
  const LIGHT_HEIGHT = 380; // lamp height above the die, px
  const rest = { x: -0.48, y: -0.56, z: 0.67 };
  const light = { ...rest };
  let target = { ...rest };
  let lightRaf = 0;

  const stepLight = () => {
    light.x += (target.x - light.x) * 0.15;
    light.y += (target.y - light.y) * 0.15;
    light.z += (target.z - light.z) * 0.15;
    chip.style.setProperty("--lx", light.x.toFixed(3));
    chip.style.setProperty("--ly", light.y.toFixed(3));
    chip.style.setProperty("--lz", light.z.toFixed(3));
    const done =
      Math.abs(target.x - light.x) +
        Math.abs(target.y - light.y) +
        Math.abs(target.z - light.z) <
      0.002;
    lightRaf = done ? 0 : requestAnimationFrame(stepLight);
  };
  const aimLight = (next: typeof rest) => {
    target = next;
    if (!lightRaf) lightRaf = requestAnimationFrame(stepLight);
  };

  const reset = () => {
    chip.style.removeProperty("--tilt-x");
    chip.style.removeProperty("--tilt-y");
    aimLight({ ...rest });
  };

  // Listen on window: the hero is a centred 1180px column, but the effect
  // should follow the cursor across the whole first screen.
  window.addEventListener("pointermove", (e) => {
    if (e.clientY > hero.getBoundingClientRect().bottom) {
      reset();
      return;
    }
    const r = chip.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const nx = (e.clientX - cx) / window.innerWidth;
    const ny = (e.clientY - cy) / window.innerHeight;
    chip.style.setProperty("--tilt-y", `${(-16 + nx * 28).toFixed(2)}deg`);
    chip.style.setProperty("--tilt-x", `${(10 - ny * 22).toFixed(2)}deg`);

    const lx = e.clientX - cx;
    const ly = e.clientY - cy;
    const len = Math.hypot(lx, ly, LIGHT_HEIGHT);
    aimLight({ x: lx / len, y: ly / len, z: LIGHT_HEIGHT / len });
  });
  document.addEventListener("pointerout", (e) => {
    if (!e.relatedTarget) reset();
  });
}

// ─── PCB circuit background ───
// Random-walk traces on a grid (90°/45° turns, pads at both ends), drawn once
// to offscreen layers. Each frame composites the dim layer, a cursor-centred
// window of the bright layer, and a few "signal" pulses running along traces.
type Pt = { x: number; y: number };
type Trace = { pts: Pt[]; len: number; seg: number[] };

if (canvas) {
  const ctx = canvas.getContext("2d");
  if (ctx) initCircuit(canvas, ctx);
}

function initCircuit(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const GRID = 26;
  const GLOW = 170; // cursor highlight radius (CSS px)
  const PCB = "47, 168, 131";
  const GOLD = "212, 165, 116";
  const DIRS: Pt[] = [
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: 0 },
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
  ];

  let w = 0;
  let h = 0;
  let dpr = 1;
  let traces: Trace[] = [];
  const dim = document.createElement("canvas");
  const bright = document.createElement("canvas");
  const lens = document.createElement("canvas");
  const mouse = { x: -9999, y: -9999, active: false };

  type Pulse = { t: Trace; d: number; speed: number; gold: boolean };

  let pulses: Pulse[] = [];

  // Rebuild only when the layout really changes — mobile browsers fire
  // resize on every URL-bar show/hide, which would reshuffle the traces.
  const onResize = (fn: () => void) => {
    let timer = 0;
    window.addEventListener("resize", () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (window.innerWidth !== w || window.innerHeight > h) fn();
      }, 200);
    });
  };

  const build = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    // Over-size a little so a growing mobile viewport doesn't expose an edge.
    h = Math.round(window.innerHeight * 1.15);
    canvas.style.height = `${h}px`;
    for (const c of [canvas, dim, bright]) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
    }
    lens.width = lens.height = Math.round(GLOW * 2 * dpr);

    const cols = Math.ceil(w / GRID) + 1;
    const rows = Math.ceil(h / GRID) + 1;
    const used = new Set<number>();
    const key = (c: number, r: number) => r * cols + c;
    const count = Math.round((cols * rows) / 14);
    traces = [];

    for (let n = 0; n < count * 3 && traces.length < count; n++) {
      let c = Math.floor(Math.random() * cols);
      let r = Math.floor(Math.random() * rows);
      if (used.has(key(c, r))) continue;
      let dir = Math.floor(Math.random() * 4) * 2; // start orthogonal
      const cells: Pt[] = [{ x: c, y: r }];
      used.add(key(c, r));
      const target = 4 + Math.floor(Math.random() * 10);
      for (let s = 0; s < target; s++) {
        if (Math.random() < 0.28)
          dir = (dir + (Math.random() < 0.5 ? 1 : 7)) % 8;
        const nc = c + DIRS[dir].x;
        const nr = r + DIRS[dir].y;
        if (
          nc < 0 ||
          nr < 0 ||
          nc >= cols ||
          nr >= rows ||
          used.has(key(nc, nr))
        )
          break;
        c = nc;
        r = nr;
        used.add(key(c, r));
        cells.push({ x: c, y: r });
      }
      if (cells.length < 3) continue;

      // Collapse straight runs into corner points.
      const pts: Pt[] = [];
      cells.forEach((p, i) => {
        const prev = cells[i - 1];
        const next = cells[i + 1];
        const straight =
          prev &&
          next &&
          p.x - prev.x === next.x - p.x &&
          p.y - prev.y === next.y - p.y;
        if (!straight) pts.push({ x: p.x * GRID, y: p.y * GRID });
      });
      const seg: number[] = [];
      let len = 0;
      for (let i = 1; i < pts.length; i++) {
        const l = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
        seg.push(l);
        len += l;
      }
      traces.push({ pts, len, seg });
    }

    paint(dim, `rgba(${PCB}, 0.13)`, `rgba(${PCB}, 0.22)`);
    paint(bright, `rgba(${PCB}, 0.75)`, `rgba(${GOLD}, 0.9)`);
    pulses = [];
  };

  const paint = (layer: HTMLCanvasElement, line: string, pad: string) => {
    const g = layer.getContext("2d");
    if (!g) return;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, w, h);
    g.lineWidth = 1.2;
    g.lineJoin = "round";
    g.strokeStyle = line;
    for (const t of traces) {
      g.beginPath();
      g.moveTo(t.pts[0].x, t.pts[0].y);
      for (const p of t.pts.slice(1)) g.lineTo(p.x, p.y);
      g.stroke();
    }
    g.strokeStyle = pad;
    g.lineWidth = 1.2;
    for (const t of traces) {
      for (const p of [t.pts[0], t.pts[t.pts.length - 1]]) {
        g.beginPath();
        g.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
        g.stroke();
      }
    }
  };

  const pointAt = (t: Trace, d: number): Pt => {
    let rest = d;
    for (let i = 0; i < t.seg.length; i++) {
      if (rest <= t.seg[i]) {
        const a = t.pts[i];
        const b = t.pts[i + 1];
        const k = rest / t.seg[i];
        return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
      }
      rest -= t.seg[i];
    }
    return t.pts[t.pts.length - 1];
  };

  const drawStatic = () => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(dim, 0, 0);
  };

  build();
  drawStatic();

  if (prefersReducedMotion) {
    // Static circuit only — no pulses, no cursor glow.
    onResize(() => {
      build();
      drawStatic();
    });
    return;
  }

  if (finePointer) {
    window.addEventListener(
      "pointermove",
      (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
      },
      { passive: true },
    );
    document.addEventListener("pointerout", (e) => {
      if (!e.relatedTarget) mouse.active = false;
    });
  }

  const lensCtx = lens.getContext("2d");
  let last = performance.now();
  let running = true;
  let raf = 0;

  // Phones/tablets: ~30 fps is plenty for the pulses and saves battery.
  const minFrame = finePointer ? 0 : 1000 / 30 - 2;

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (now - last < minFrame) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    drawStatic();

    // Cursor lens: bright traces faded out radially around the pointer.
    if (mouse.active && lensCtx) {
      const size = lens.width;
      const sx = Math.round((mouse.x - GLOW) * dpr);
      const sy = Math.round((mouse.y - GLOW) * dpr);
      // Clamp the source rect to the layer (Safari skips out-of-bounds draws).
      const x0 = Math.max(sx, 0);
      const y0 = Math.max(sy, 0);
      const cw = Math.min(sx + size, bright.width) - x0;
      const ch = Math.min(sy + size, bright.height) - y0;
      lensCtx.globalCompositeOperation = "source-over";
      lensCtx.clearRect(0, 0, size, size);
      if (cw > 0 && ch > 0) {
        lensCtx.drawImage(bright, x0, y0, cw, ch, x0 - sx, y0 - sy, cw, ch);
      }
      lensCtx.globalCompositeOperation = "destination-in";
      const grad = lensCtx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2,
      );
      grad.addColorStop(0, "rgba(0,0,0,0.9)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      lensCtx.fillStyle = grad;
      lensCtx.fillRect(0, 0, size, size);
      ctx.drawImage(lens, sx, sy);
    }

    // Signal pulses travelling along random traces.
    const want = Math.min(28, Math.max(8, Math.round(traces.length / 9)));
    while (pulses.length < want && traces.length) {
      const t = traces[Math.floor(Math.random() * traces.length)];
      pulses.push({
        t,
        d: -Math.random() * 200,
        speed: 60 + Math.random() * 90,
        gold: Math.random() < 0.35,
      });
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    pulses = pulses.filter((p) => {
      p.d += p.speed * dt;
      if (p.d > p.t.len + 30) return false;
      if (p.d < 0) return true;
      const rgb = p.gold ? GOLD : PCB;
      const head = pointAt(p.t, Math.min(p.d, p.t.len));
      const TAIL = 28;
      const steps = 7;
      for (let i = steps; i > 0; i--) {
        const a = pointAt(p.t, Math.max(p.d - (TAIL * i) / steps, 0));
        const b = pointAt(p.t, Math.max(p.d - (TAIL * (i - 1)) / steps, 0));
        ctx.strokeStyle = `rgba(${rgb}, ${(0.55 * (1 - i / (steps + 1))).toFixed(3)})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      if (p.d <= p.t.len) {
        ctx.fillStyle = `rgba(${rgb}, 0.95)`;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      return true;
    });
  };

  const start = () => {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  onResize(build);

  raf = requestAnimationFrame(frame);
}
