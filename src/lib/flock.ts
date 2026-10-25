// Particle engine for the homepage murmuration.
// Each particle is a bird with its own state. Birds in the flock follow a
// folding 3D ribbon; birds can be scheduled to form a shape (letters, the
// mark), to stream into a sink (the text cursor), or to flee back to the flock.

export const FLOCK = 0;
export const SHAPE = 1;
export const SINK = 2;
export const HIDDEN = 3;
const NONE = 255;

const TAU = Math.PI * 2;

export class Flock {
  n: number;
  w = 1;
  h = 1;

  px: Float32Array;
  py: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  hx: Float32Array;
  hy: Float32Array;
  hz: Float32Array;
  k: Float32Array;
  seed: Float32Array;

  sx: Float32Array;
  sy: Float32Array;
  state: Uint8Array;
  next: Uint8Array;
  at: Float32Array;
  kick: Uint8Array;
  tone: Float32Array;
  toneTarget: Float32Array;
  /** Opacity of a bird once it sits in a shape; dimmed when crisp type takes over. */
  shapeA: Float32Array;

  // Render outputs.
  depth: Float32Array;
  alpha: Float32Array;
  angle: Float32Array;
  bird: Float32Array;

  sink = { x: 0, y: 0 };
  hawk = { x: -1e4, y: -1e4, on: false };
  dim = 1;
  dimTarget = 1;

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
    this.state = new Uint8Array(n);
    this.next = new Uint8Array(n).fill(NONE);
    this.at = f();
    this.kick = new Uint8Array(n);
    this.tone = f();
    this.toneTarget = f();
    this.shapeA = new Float32Array(n).fill(0.95);
    this.depth = f();
    this.alpha = f();
    this.angle = f();
    this.bird = new Float32Array(n).fill(1);
    for (let i = 0; i < n; i++) {
      // A ribbon: starling flocks are thin folding sheets, not balls.
      const u = Math.random() * 2 - 1;
      const taper = Math.sqrt(Math.max(0, 1 - u * u));
      const v = (Math.random() * 2 - 1) * taper;
      this.hx[i] = u * 1.5;
      this.hy[i] = v * 0.42;
      this.hz[i] = (Math.random() + Math.random() + Math.random() - 1.5) * 0.05;
      this.k[i] = 0.018 + Math.random() * 0.05;
      this.seed[i] = Math.random();
    }
  }

  resize(w: number, h: number) {
    this.w = w;
    this.h = h;
  }

  scatter() {
    for (let i = 0; i < this.n; i++) {
      const a = Math.random() * TAU;
      const r = Math.hypot(this.w, this.h) * (0.6 + Math.random() * 0.3);
      this.px[i] = this.w / 2 + Math.cos(a) * r;
      this.py[i] = this.h / 2 + Math.sin(a) * r;
    }
  }

  /** Switch particle i to `state` at time `at`. */
  schedule(i: number, state: number, at: number, kick = false) {
    this.next[i] = state;
    this.at[i] = at;
    this.kick[i] = kick ? 1 : 0;
  }

  step(t: number, dt: number) {
    const { n, w, h } = this;
    const R = Math.min(w * 0.26, h * 0.3);

    // Murmuration frame: the ribbon tumbles in 3D and wanders the sky.
    const T = t * 0.7;
    const yaw = T * 0.11 + Math.sin(T * 0.053) * 1.6;
    const pitch = Math.sin(T * 0.087) * 0.8;
    const roll = Math.sin(T * 0.041) * 0.3;
    const cy1 = Math.cos(yaw), sy1 = Math.sin(yaw);
    const cp = Math.cos(pitch), sp = Math.sin(pitch);
    const cr = Math.cos(roll), sr = Math.sin(roll);
    const cx = w * (0.5 + 0.16 * Math.sin(T * 0.13) + 0.05 * Math.sin(T * 0.31));
    const cyc = h * (0.5 + 0.06 * Math.sin(T * 0.17 + 1.1));
    const focal = 2.4;

    const hawk = this.hawk;
    this.dim += (this.dimTarget - this.dim) * Math.min(1, 0.05 * dt);

    for (let i = 0; i < n; i++) {
      if (this.next[i] !== NONE && t >= this.at[i]) {
        const s = this.next[i];
        this.next[i] = NONE;
        if (s === FLOCK && this.state[i] === HIDDEN) {
          // Re-enter from above the viewport.
          this.px[i] = Math.random() * w;
          this.py[i] = -40 - Math.random() * 120;
          this.vx[i] = (Math.random() - 0.5) * 4;
          this.vy[i] = 2 + Math.random() * 3;
        }
        if (this.kick[i]) {
          this.vx[i] += (Math.random() - 0.5) * 7;
          this.vy[i] -= 3 + Math.random() * 4;
        }
        if (s === FLOCK) this.toneTarget[i] = 0;
        if (s === SHAPE) this.shapeA[i] = 0.95;
        this.state[i] = s;
      }

      const st = this.state[i];
      let x = this.hx[i], y = this.hy[i], z = this.hz[i];
      z += 0.55 * Math.sin(x * 1.7 + T * 0.55) + 0.22 * Math.sin(y * 4.0 + T * 0.9);
      y += 0.28 * Math.sin(x * 2.1 - T * 0.47) + 0.05 * Math.sin(x * 9 + T * 2.1);
      x += 0.09 * Math.sin(x * 3.2 - T * 1.6);
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
      let k = this.k[i];
      let damp = 0.86;
      let d = persp;
      let a = (0.3 + 0.4 * Math.min(1, Math.max(0, (persp - 0.7) * 1.6))) * this.dim;

      if (st === SHAPE) {
        tx = this.sx[i];
        ty = this.sy[i];
        d = 1;
        a = this.shapeA[i];
      } else if (st === SINK) {
        // A ribbon of birds pouring into the cursor.
        const dx = this.sink.x - this.px[i];
        const dy = this.sink.y - this.py[i];
        const dist = Math.hypot(dx, dy);
        const wob = Math.sin(t * 6 + this.seed[i] * 30) * Math.min(24, dist * 0.1);
        tx = this.sink.x - (dy / (dist + 1)) * wob;
        ty = this.sink.y + (dx / (dist + 1)) * wob;
        // Pull harder the closer they get, so they dive in instead of orbiting.
        k = 0.03 + this.seed[i] * 0.02 + Math.max(0, 0.12 * (1 - dist / 220));
        damp = 0.82;
        d = 1;
        a = 0.95;
        if (dist < 22) {
          this.state[i] = HIDDEN;
          this.schedule(i, FLOCK, t + 0.6 + Math.random() * 1.2);
        }
      } else if (st === HIDDEN) {
        a = 0;
        k = 0;
        this.alpha[i] = 0;
      }

      let ax = (tx - this.px[i]) * k;
      let ay = (ty - this.py[i]) * k;

      if (hawk.on && st !== HIDDEN) {
        const dx = this.px[i] - hawk.x;
        const dy = this.py[i] - hawk.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 130 * 130 && d2 > 0.01) {
          const dd = Math.sqrt(d2);
          const f = (1 - dd / 130) * 4.2;
          ax += (dx / dd) * f;
          ay += (dy / dd) * f;
        }
      }

      if (st === SHAPE) {
        // Arrive: fly straight in, slow down on approach, never overshoot.
        const dx = tx - this.px[i];
        const dy = ty - this.py[i];
        const dist = Math.hypot(dx, dy);
        const want = Math.min(9 + this.seed[i] * 5, dist * 0.09);
        const dvx = dist > 0.01 ? (dx / dist) * want : 0;
        const dvy = dist > 0.01 ? (dy / dist) * want : 0;
        const steer = Math.min(1, (0.08 + this.k[i]) * dt);
        this.vx[i] += (dvx - this.vx[i]) * steer + (ax - (tx - this.px[i]) * k) * dt;
        this.vy[i] += (dvy - this.vy[i]) * steer + (ay - (ty - this.py[i]) * k) * dt;
        this.px[i] += this.vx[i] * dt;
        this.py[i] += this.vy[i] * dt;
        if (dist < 1.5 && !hawk.on) {
          this.px[i] = tx;
          this.py[i] = ty;
        }
      } else {
        const dmp = Math.pow(damp, dt);
        this.vx[i] = (this.vx[i] + ax * dt) * dmp;
        this.vy[i] = (this.vy[i] + ay * dt) * dmp;
        this.px[i] += this.vx[i] * dt;
        this.py[i] += this.vy[i] * dt;
      }

      const speed = Math.hypot(this.vx[i], this.vy[i]);
      if (speed > 0.15) {
        const target = Math.atan2(this.vy[i], this.vx[i]);
        let diff = target - this.angle[i];
        diff -= Math.round(diff / TAU) * TAU;
        this.angle[i] += diff * Math.min(1, 0.25 * dt);
      }
      // Birds in flight, dots when they settle into letters.
      const birdTarget = st === SHAPE ? Math.min(1, Math.max(0, (speed - 1) / 4)) : 1;
      this.bird[i] += (birdTarget - this.bird[i]) * Math.min(1, 0.15 * dt);
      this.tone[i] += (this.toneTarget[i] - this.tone[i]) * Math.min(1, 0.1 * dt);
      this.depth[i] = d;
      if (st !== HIDDEN) this.alpha[i] += (a - this.alpha[i]) * Math.min(1, 0.12 * dt);
    }
  }
}

export function shuffled(list: number[]) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [a[i], a[j]] = [a[j], a[i]];
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
  const step = Math.max(1, Math.sqrt((filled * 4) / Math.max(1, count)));
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
  while (out.length / 2 > count) {
    const i = ((Math.random() * (out.length / 2)) | 0) * 2;
    out[i] = out[out.length - 2];
    out[i + 1] = out[out.length - 1];
    out.length -= 2;
  }
  return new Float32Array(out);
}
