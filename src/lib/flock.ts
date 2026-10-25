// Particle engine for the homepage murmuration.
// Every particle chases a per-mode target with its own stiffness, so the
// flock lags, folds and ripples instead of moving as one rigid shape.

export type Mode = "form" | "flock" | "inhale" | "burst";

const TAU = Math.PI * 2;

export class Flock {
  n: number;
  w = 1;
  h = 1;
  mode: Mode = "form";
  modeAt = 0;

  px: Float32Array;
  py: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  // Home position inside the 3D murmuration blob.
  hx: Float32Array;
  hy: Float32Array;
  hz: Float32Array;
  // Per-particle character.
  k: Float32Array;
  seed: Float32Array;
  // Shape targets (bird mark, headline text).
  sx: Float32Array;
  sy: Float32Array;
  sOn: Uint8Array;
  // Render outputs.
  depth: Float32Array;
  alpha: Float32Array;

  sink = { x: 0, y: 0 };
  level = 0;
  hawk = { x: -1e4, y: -1e4, on: false };

  constructor(n: number) {
    this.n = n;
    const f = () => new Float32Array(n);
    this.px = f();
    this.py = f();
    this.vx = f();
    this.vy = f();
    this.hx = f();
    this.hy = f();
    this.hz = f();
    this.k = f();
    this.seed = f();
    this.sx = f();
    this.sy = f();
    this.sOn = new Uint8Array(n);
    this.depth = f();
    this.alpha = f();
    for (let i = 0; i < n; i++) {
      // A ribbon: starling flocks are thin folding sheets, not balls.
      const u = Math.random() * 2 - 1;
      const taper = Math.sqrt(Math.max(0, 1 - u * u));
      const v = (Math.random() * 2 - 1) * taper;
      const g = (Math.random() + Math.random() + Math.random() - 1.5) * 0.05;
      this.hx[i] = u * 1.5;
      this.hy[i] = v * 0.42;
      this.hz[i] = g;
      this.k[i] = 0.018 + Math.random() * 0.05;
      this.seed[i] = Math.random();
      this.alpha[i] = 0;
    }
  }

  resize(w: number, h: number) {
    this.w = w;
    this.h = h;
  }

  scatter() {
    for (let i = 0; i < this.n; i++) {
      this.px[i] = Math.random() * this.w;
      this.py[i] = Math.random() * this.h;
    }
  }

  /** Assign shape points (screen px) to particles; extras keep flocking. */
  setShape(points: Float32Array) {
    const count = points.length / 2;
    const order = shuffled(this.n);
    this.sOn.fill(0);
    for (let j = 0; j < this.n; j++) {
      const i = order[j];
      if (j < count) {
        this.sx[i] = points[j * 2];
        this.sy[i] = points[j * 2 + 1];
        this.sOn[i] = 1;
      }
    }
  }

  setMode(mode: Mode, t: number) {
    this.mode = mode;
    this.modeAt = t;
    if (mode === "burst") {
      for (let i = 0; i < this.n; i++) {
        const a = Math.random() * TAU;
        const s = 6 + Math.random() * 22;
        this.px[i] = this.sink.x + Math.cos(a) * 4;
        this.py[i] = this.sink.y + Math.sin(a) * 4;
        this.vx[i] = Math.cos(a) * s;
        this.vy[i] = Math.sin(a) * s - 6;
      }
    }
  }

  step(t: number, dt: number) {
    const { n, w, h } = this;
    const since = t - this.modeAt;
    const R = Math.min(w * 0.3, h * 0.5);

    // Murmuration frame: the blob tumbles in 3D and wanders the viewport.
    const yaw = t * 0.11 + Math.sin(t * 0.053) * 1.6;
    const pitch = Math.sin(t * 0.087) * 0.95;
    const roll = Math.sin(t * 0.041) * 0.35;
    const cy1 = Math.cos(yaw), sy1 = Math.sin(yaw);
    const cp = Math.cos(pitch), sp = Math.sin(pitch);
    const cr = Math.cos(roll), sr = Math.sin(roll);
    const cx = w * (0.5 + 0.17 * Math.sin(t * 0.13) + 0.06 * Math.sin(t * 0.31));
    const cyc = h * (0.44 + 0.1 * Math.sin(t * 0.17 + 1.1));
    const focal = 2.4;

    const hawk = this.hawk;
    const damp = Math.pow(0.86, dt);

    for (let i = 0; i < n; i++) {
      let x = this.hx[i], y = this.hy[i], z = this.hz[i];

      // The sheet bends and folds; a compression wave sweeps along it.
      z += 0.55 * Math.sin(x * 1.7 + t * 0.55) + 0.22 * Math.sin(y * 4.0 + t * 0.9);
      y += 0.28 * Math.sin(x * 2.1 - t * 0.47) + 0.05 * Math.sin(x * 9 + t * 2.1);
      x += 0.09 * Math.sin(x * 3.2 - t * 1.6);

      // Rotate (yaw, pitch, roll) and project.
      let x1 = x * cy1 + z * sy1;
      let z1 = -x * sy1 + z * cy1;
      let y1 = y * cp - z1 * sp;
      z1 = y * sp + z1 * cp;
      const x2 = x1 * cr - y1 * sr;
      y1 = x1 * sr + y1 * cr;
      x1 = x2;
      const persp = focal / (focal + z1);
      let tx = cx + x1 * R * persp;
      let ty = cyc + y1 * R * persp;
      let d = persp;
      let k = this.k[i];
      let a = 0.35 + 0.65 * Math.min(1, Math.max(0, (persp - 0.7) * 1.6));

      const mode = this.mode;
      if (mode === "form" || (mode === "burst" && this.sOn[i])) {
        if (this.sOn[i]) {
          const delay = mode === "burst" ? 0.05 + this.seed[i] * 0.35 : this.seed[i] * 0.6;
          if (since > delay) {
            tx = this.sx[i] + Math.sin(t * 1.3 + this.seed[i] * 40) * 0.6;
            ty = this.sy[i] + Math.cos(t * 1.1 + this.seed[i] * 40) * 0.6;
            k = 0.05 + this.k[i] * 0.9;
            d = 1;
            a = 0.95;
          } else if (mode === "burst") {
            k = 0.002;
          }
        } else {
          a *= 0.35;
        }
      } else if (mode === "burst") {
        a *= 0.3;
      } else if (mode === "inhale") {
        // A vortex into the pill. Each particle leaves on its own beat.
        const delay = this.seed[i] * 1.1;
        const p = Math.min(1, Math.max(0, (since - delay) / 0.9));
        if (p > 0) {
          const ang = this.seed[i] * TAU * 7 + since * (3 + p * 6);
          // Absorbed particles keep orbiting the pill as a halo that breathes with the voice.
          const halo = (46 + this.seed[i] * 30) * (1 + this.level * 0.45 * Math.sin(this.seed[i] * 50 + since * 9));
          const rad = (1 - p) * (40 + this.seed[i] * R * 1.1) + p * halo;
          const blend = p * p;
          tx = tx * (1 - blend) + (this.sink.x + Math.cos(ang) * rad) * blend;
          ty = ty * (1 - blend) + (this.sink.y + Math.sin(ang) * rad * 0.55) * blend;
          k = 0.04 + p * 0.18;
          a = a * (1 - p) + (0.25 + this.level * 0.5) * p;
        }
      }

      let ax = (tx - this.px[i]) * k;
      let ay = (ty - this.py[i]) * k;

      // The cursor is a hawk.
      if (hawk.on) {
        const dx = this.px[i] - hawk.x;
        const dy = this.py[i] - hawk.y;
        const d2 = dx * dx + dy * dy;
        const rr = 130 * 130;
        if (d2 < rr && d2 > 0.01) {
          const dd = Math.sqrt(d2);
          const f = (1 - dd / 130) * 4.2;
          ax += (dx / dd) * f;
          ay += (dy / dd) * f;
        }
      }

      this.vx[i] = (this.vx[i] + ax * dt) * damp;
      this.vy[i] = (this.vy[i] + ay * dt) * damp;
      this.px[i] += this.vx[i] * dt;
      this.py[i] += this.vy[i] * dt;
      this.depth[i] = d;
      // Ease alpha so particles never pop.
      this.alpha[i] += (a - this.alpha[i]) * Math.min(1, 0.12 * dt);
    }
  }
}

function shuffled(n: number) {
  const a = new Uint32Array(n);
  for (let i = 0; i < n; i++) a[i] = i;
  for (let i = n - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
}

/** Sample filled pixels of something drawn on a canvas into ~count points. */
export function samplePoints(
  w: number,
  h: number,
  count: number,
  draw: (ctx: CanvasRenderingContext2D) => void,
): Float32Array {
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.floor(w));
  c.height = Math.max(1, Math.floor(h));
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = "#fff";
  draw(ctx);
  const data = ctx.getImageData(0, 0, c.width, c.height).data;
  let filled = 0;
  for (let i = 3; i < data.length; i += 16) if (data[i] > 128) filled++;
  const area = filled * 4;
  const step = Math.max(1, Math.sqrt(area / count));
  const out: number[] = [];
  for (let y = 0; y < c.height; y += step) {
    for (let x = 0; x < c.width; x += step) {
      const jx = x + (Math.random() - 0.5) * step * 0.6;
      const jy = y + (Math.random() - 0.5) * step * 0.6;
      const ix = Math.min(c.width - 1, Math.max(0, jx | 0));
      const iy = Math.min(c.height - 1, Math.max(0, jy | 0));
      if (data[(iy * c.width + ix) * 4 + 3] > 128) out.push(jx, jy);
    }
  }
  // Trim to count.
  while (out.length / 2 > count) {
    const i = ((Math.random() * (out.length / 2)) | 0) * 2;
    out[i] = out[out.length - 2];
    out[i + 1] = out[out.length - 1];
    out.length -= 2;
  }
  return new Float32Array(out);
}
