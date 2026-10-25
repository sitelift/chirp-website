import { useEffect, useRef } from "react";
import { Flock } from "../lib/flock";
import { PointsGL } from "../lib/points-gl";

// A murmuration drawn in ink, used as art behind product windows.
// It only runs while on screen; the cursor is a hawk.
export default function Murmuration({
  count = 700,
  color = [0.16, 0.16, 0.16],
  centerY = 0.5,
  spread = 1,
  size = 1,
  wander = 1,
}: {
  count?: number;
  color?: [number, number, number];
  centerY?: number;
  spread?: number;
  size?: number;
  wander?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = innerWidth < 720 ? Math.round(count * 0.6) : count;
    const flock = new Flock(n);
    let gl: PointsGL;
    try {
      gl = new PointsGL(canvas, n, flock.seed);
    } catch {
      return;
    }
    gl.color = color;
    flock.centerY = centerY;
    flock.spread = spread;
    gl.scale = size;
    flock.wander = wander;

    let w = 1;
    let h = 1;
    let dpr = 1;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      dpr = Math.min(2, devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      flock.resize(w, h);
    };
    resize();
    flock.enter(-1);

    let clock = 0;
    let last = performance.now();
    let visible = false;
    let raf = 0;
    const frame = (ms: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(3, (ms - last) / 16.667);
      last = ms;
      if (!visible) return;
      clock += (dt / 60) * (reduced ? 0.3 : 1);
      flock.step(clock, dt * (reduced ? 0.3 : 1));
      gl.draw(flock, w, h, dpr, clock);
    };
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const host = canvas.parentElement!;
    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      flock.hawk.x = e.clientX - r.left;
      flock.hawk.y = e.clientY - r.top;
      flock.hawk.on = e.pointerType === "mouse";
    };
    const leave = () => (flock.hawk.on = false);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [count]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
