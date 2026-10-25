// The homepage murmuration.
//
// Birds fly, they don't spring: every bird has a velocity, a top speed and a
// limited turning force, so it always moves in arcs. In the flock, each bird
// follows its own point on a twisting loop that the flock circulates around
// (so every bird has a heading); it can be scheduled to land in a shape
// (letters, the mark), to pour into a sink (the text cursor), or to take off
// back into the flock.

export const FLOCK = 0;
export const SHAPE = 1;
export const SINK = 2;
export const HIDDEN = 3;
const NONE = 255;

const TAU = Math.PI * 2;

function gauss() {
  return (Math.random() + Math.random() + Math.random() + Math.random() - 2) / 2;
}

export class Flock {
  n: number;
  w = 1;
  h = 1;

  px: Float32Array;
  py: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  /** Previous flock target, for the target's own velocity. */
  fx: Float32Array;
  fy: Float32Array;
  hasTarget = false;

  // Where each bird sits on the loop.
  theta: Float32Array;
  band: Float32Array;
  thick: Float32Array;
  pace: Float32Array;
  seed: Float32Array;
  top: Float32Array;
  agility: Float32Array;

  sx: Float32Array;
  sy: Float32Array;
  state: Uint8Array;
  next: Uint8Array;
  at: Float32Array;
  lift: Uint8Array;
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
  /** Where the flock circles, as fractions of the canvas; and its size. */
  centerY = 0.5;
  spread = 1;
  wander = 1;
  /** How wide the band of the loop is; above 1 reads as a fuller flock. */
  thickness = 1;
  /** Above 0, the loop circles the middle of the sky instead of hovering in it,
   *  lingering on the sides so it flies around whatever sits in the centre. */
  orbit = 0;
  /** A rounded box (centre and half-size, px) the loop bends around, so text stays clear. */
  avoid: { x: number; y: number; rx: number; ry: number } | null = null;
  /** Which side birds re-enter from after pouring into the cursor. */
  entrySide = -1;

  constructor(n: number) {
    this.n = n;
    const f = () => new Float32Array(n);
    this.px = f();
    this.py = f();
    this.vx = f();
    this.vy = f();
    this.fx = f();
    this.fy = f();
    this.theta = f();
    this.band = f();
    this.thick = f();
    this.pace = f();
    this.seed = f();
    this.top = f();
    this.agility = f();
    this.sx = f();
    this.sy = f();
    this.state = new Uint8Array(n);
    this.next = new Uint8Array(n).fill(NONE);
    this.at = f();
    this.lift = new Uint8Array(n);
    this.tone = f();
    this.toneTarget = f();
    this.shapeA = new Float32Array(n).fill(0.95);
    this.depth = new Float32Array(n).fill(1);
    this.alpha = f();
    this.angle = f();
    this.bird = new Float32Array(n).fill(1);
    for (let i = 0; i < n; i++) {
      this.theta[i] = Math.random() * TAU;
      this.band[i] = Math.max(-1, Math.min(1, gauss() * 1.2));
      this.thick[i] = gauss();
      this.pace[i] = 0.88 + Math.random() * 0.24;
      this.seed[i] = Math.random();
      this.top[i] = 5.5 + Math.random() * 2.5;
      this.agility[i] = 0.2 + Math.random() * 0.12;
    }
  }

  resize(w: number, h: number) {
    this.w = w;
    this.h = h;
  }

  /** Line every bird up off-screen on one side, spread out so they arrive as a stream. */
  enter(side: -1 | 1) {
    for (let i = 0; i < this.n; i++) this.place(i, side, this.w * 0.55);
    this.hasTarget = false;
  }

  private place(i: number, side: number, spread: number) {
    const { w, h } = this;
    const lag = Math.random() * spread;
    this.px[i] = side < 0 ? -30 - lag : w + 30 + lag;
    this.py[i] = h * 0.42 + gauss() * h * 0.12 - lag * 0.15;
    this.vx[i] = -side * (this.top[i] * 0.85);
    this.vy[i] = gauss() * 0.6;
    this.angle[i] = Math.atan2(this.vy[i], this.vx[i]);
  }

  /** Switch bird i to `state` at time `at`. `lift` makes it take off upward first. */
  schedule(i: number, state: number, at: number, lift = false) {
    this.next[i] = state;
    this.at[i] = at;
    this.lift[i] = lift ? 1 : 0;
  }

  step(t: number, dt: number) {
    const { n, w, h } = this;
    const T = t * 0.7;
    const R = Math.min(w * 0.27, h * 0.36) * this.spread;

    // The loop tumbles slowly in 3D and drifts around the sky.
    const yaw = T * 0.09 + Math.sin(T * 0.05) * 1.4;
    const pitch = 0.35 + Math.sin(T * 0.083) * 0.75;
    const roll = Math.sin(T * 0.041) * 0.3;
    const cy1 = Math.cos(yaw), sy1 = Math.sin(yaw);
    const cp = Math.cos(pitch), sp = Math.sin(pitch);
    const cr = Math.cos(roll), sr = Math.sin(roll);
    const oa = T * 0.11;
    const ox = Math.sign(Math.cos(oa)) * Math.abs(Math.cos(oa)) ** 0.55;
    const cx = w * (0.5 + this.orbit * 0.31 * ox + this.wander * (0.15 * Math.sin(T * 0.13) + 0.05 * Math.sin(T * 0.31)));
    const cy = h * (this.centerY + this.orbit * 0.27 * Math.sin(oa) + 0.05 * Math.sin(T * 0.17 + 1.1));
    const focal = 2.6;

    const hawk = this.hawk;
    this.dim += (this.dimTarget - this.dim) * Math.min(1, 0.05 * dt);
    const fresh = !this.hasTarget;
    this.hasTarget = true;

    for (let i = 0; i < n; i++) {
      if (this.next[i] !== NONE && t >= this.at[i]) {
        const s = this.next[i];
        this.next[i] = NONE;
        if (s === FLOCK && this.state[i] === HIDDEN) this.place(i, this.entrySide, w * 0.25);
        if (this.lift[i]) {
          // Take off: a hop up and out before turning for the flock.
          this.vx[i] = gauss() * 1.6;
          this.vy[i] = -2.2 - Math.random() * 1.6;
        }
        if (s === FLOCK) this.toneTarget[i] = 0;
        if (s === SHAPE) this.shapeA[i] = 0.95;
        this.state[i] = s;
      }

      // This bird's point on the loop, always computed so its velocity is known.
      let th = this.theta[i] + T * 0.24 * this.pace[i];
      th += 0.12 * Math.sin(2 * th - T * 1.2);
      const scale = 1 + this.band[i] * 0.17 * this.thickness + 0.12 * Math.sin(2 * th - T * 0.5);
      const x = Math.cos(th) * 1.3 * scale;
      const y = Math.sin(th) * 0.5 * scale + 0.15 * Math.sin(3 * th - T * 0.4);
      const z = 0.5 * Math.sin(2 * th + T * 0.35) + this.thick[i] * 0.045 * this.thickness + this.band[i] * 0.08 * this.thickness;
      let x1 = x * cy1 + z * sy1;
      let z1 = -x * sy1 + z * cy1;
      let y1 = y * cp - z1 * sp;
      z1 = y * sp + z1 * cp;
      const x2 = x1 * cr - y1 * sr;
      y1 = x1 * sr + y1 * cr;
      x1 = x2;
      const persp = focal / (focal + z1);
      let ftx = cx + x1 * R * persp;
      let fty = cy + y1 * R * persp;
      const av = this.avoid;
      if (av) {
        // Squash anything inside the box into a thin ring just outside it.
        const ux = (ftx - av.x) / av.rx;
        const uy = (fty - av.y) / av.ry;
        const r = Math.sqrt(Math.sqrt(ux ** 4 + uy ** 4));
        if (r < 1.3 && r > 1e-4) {
          const k = (1 + r * 0.23) / r;
          ftx = av.x + ux * k * av.rx;
          fty = av.y + uy * k * av.ry;
        }
      }
      const tvx = fresh ? 0 : (ftx - this.fx[i]) / Math.max(dt, 0.001);
      const tvy = fresh ? 0 : (fty - this.fy[i]) / Math.max(dt, 0.001);
      this.fx[i] = ftx;
      this.fy[i] = fty;

      const st = this.state[i];
      const px = this.px[i], py = this.py[i];
      let dvx = 0, dvy = 0;
      let accel = this.agility[i];
      let a = 0;
      let d = 1;

      if (st === FLOCK) {
        // Match the loop's motion and close the gap, never faster than top speed.
        dvx = tvx + (ftx - px) * 0.03;
        dvy = tvy + (fty - py) * 0.03;
        const sp2 = Math.hypot(dvx, dvy);
        if (sp2 > this.top[i]) {
          dvx *= this.top[i] / sp2;
          dvy *= this.top[i] / sp2;
        }
        d = persp;
        a = (0.32 + 0.4 * Math.min(1, Math.max(0, (persp - 0.75) * 1.8))) * this.dim;
      } else if (st === SHAPE || st === SINK) {
        const tx = st === SHAPE ? this.sx[i] : this.sink.x;
        const ty = st === SHAPE ? this.sy[i] : this.sink.y;
        const dx = tx - px;
        const dy = ty - py;
        const dist = Math.hypot(dx, dy);
        // Arrive: brake so it can always stop in time (v = sqrt(2 a d)).
        const brake = st === SHAPE ? 0.42 : 0.6;
        const want = Math.min(this.top[i] + 1.5, Math.sqrt(2 * brake * dist) * 0.92);
        if (dist > 0.01) {
          dvx = (dx / dist) * want;
          dvy = (dy / dist) * want;
        }
        if (st === SINK) {
          // A slight weave, so the stream reads as birds and not a line.
          const weave = Math.sin(t * 5 + this.seed[i] * 30) * Math.min(1.2, dist * 0.01);
          dvx += (-dy / (dist + 1)) * weave;
          dvy += (dx / (dist + 1)) * weave;
        }
        accel = st === SHAPE ? (dist < 60 ? 0.6 : 0.34) : 0.5;
        a = st === SHAPE ? this.shapeA[i] : 0.9;
        if (st === SINK && dist < 12) {
          this.state[i] = HIDDEN;
          this.alpha[i] = 0;
          this.schedule(i, FLOCK, t + 0.8 + Math.random() * 1.6);
          continue;
        }
      } else {
        this.alpha[i] = 0;
        continue;
      }

      // Steer: change velocity toward the desired one, limited by agility.
      let ax = dvx - this.vx[i];
      let ay = dvy - this.vy[i];
      const am = Math.hypot(ax, ay);
      const lim = accel * dt;
      if (am > lim) {
        ax *= lim / am;
        ay *= lim / am;
      }

      // The cursor is a hawk: birds near it break away hard.
      if (hawk.on) {
        const hx = px - hawk.x;
        const hy = py - hawk.y;
        const d2 = hx * hx + hy * hy;
        if (d2 < 140 * 140 && d2 > 0.01) {
          const dd = Math.sqrt(d2);
          const f = (1 - dd / 140) * 1.4 * dt;
          ax += (hx / dd) * f;
          ay += (hy / dd) * f;
        }
      }

      this.vx[i] += ax;
      this.vy[i] += ay;
      this.px[i] += this.vx[i] * dt;
      this.py[i] += this.vy[i] * dt;

      const speed = Math.hypot(this.vx[i], this.vy[i]);
      if (st === SHAPE && !hawk.on) {
        const dx = this.sx[i] - this.px[i];
        const dy = this.sy[i] - this.py[i];
        if (dx * dx + dy * dy < 0.8 && speed < 0.9) {
          this.px[i] = this.sx[i];
          this.py[i] = this.sy[i];
          this.vx[i] = 0;
          this.vy[i] = 0;
        }
      }
      if (speed > 0.25) {
        const target = Math.atan2(this.vy[i], this.vx[i]);
        let diff = target - this.angle[i];
        diff -= Math.round(diff / TAU) * TAU;
        this.angle[i] += diff * Math.min(1, 0.3 * dt);
      }
      // Birds in flight; dots once they settle into a shape.
      const birdTarget = st === SHAPE ? Math.min(1, Math.max(0, (speed - 0.8) / 3)) : 1;
      this.bird[i] += (birdTarget - this.bird[i]) * Math.min(1, 0.15 * dt);
      this.tone[i] += (this.toneTarget[i] - this.tone[i]) * Math.min(1, 0.1 * dt);
      this.depth[i] += (d - this.depth[i]) * Math.min(1, 0.2 * dt);
      this.alpha[i] += (a - this.alpha[i]) * Math.min(1, 0.1 * dt);
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
