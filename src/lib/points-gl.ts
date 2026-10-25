// WebGL2 renderer: each particle is a point sprite drawn as a flapping
// chevron (a bird) in flight, or a soft dot once it settles into a letter.

const VERT = `#version 300 es
in vec2 aPos;
in float aDepth;
in float aAlpha;
in float aSeed;
in float aAngle;
in float aBird;
in float aTone;
uniform vec2 uRes;
uniform float uDpr;
uniform float uScale;
out float vAlpha;
out float vSeed;
out float vAngle;
out float vBird;
out float vTone;
void main() {
  vec2 clip = (aPos / uRes) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  float dotSize = 1.6 + aDepth * 1.4 + aSeed * 0.6;
  float birdSize = 3.5 + aDepth * 3.0 + aSeed * 1.0;
  gl_PointSize = mix(dotSize, birdSize, aBird) * uDpr * uScale;
  vAlpha = aAlpha;
  vSeed = aSeed;
  vAngle = aAngle;
  vBird = aBird;
  vTone = aTone;
}`;

const FRAG = `#version 300 es
precision mediump float;
in float vAlpha;
in float vSeed;
in float vAngle;
in float vBird;
in float vTone;
uniform float uTime;
uniform vec3 uColor;
out vec4 outColor;

float seg(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  vec2 p = gl_PointCoord - 0.5;
  float c = cos(vAngle), s = sin(vAngle);
  vec2 q = vec2(c * p.x + s * p.y, -s * p.x + c * p.y);
  // Seen from below: a short body and two swept wings that beat.
  float flap = sin(uTime * 11.0 + vSeed * 60.0);
  float tipX = -0.06 - 0.1 * flap;
  float span = 0.36 + 0.06 * flap;
  float d = seg(q, vec2(0.16, 0.0), vec2(-0.16, 0.0));
  d = min(d, seg(q, vec2(0.04, 0.0), vec2(tipX, span)));
  d = min(d, seg(q, vec2(0.04, 0.0), vec2(tipX, -span)));
  float birdA = smoothstep(0.075, 0.03, d);
  float dotA = smoothstep(0.5, 0.18, length(p));
  float a = mix(dotA, birdA, vBird) * vAlpha;
  vec3 col = mix(uColor, vec3(0.6, 0.58, 0.55), vTone);
  outColor = vec4(col * a, a);
}`;

type Attr = { buf: WebGLBuffer; data: Float32Array };

export class PointsGL {
  gl: WebGL2RenderingContext;
  n: number;
  pos: Float32Array;
  attrs: Record<string, Attr> = {};
  uRes: WebGLUniformLocation;
  uDpr: WebGLUniformLocation;
  uTime: WebGLUniformLocation;
  uColor: WebGLUniformLocation;
  uScale: WebGLUniformLocation;
  scale = 1;
  color: [number, number, number] = [0.16, 0.16, 0.16];

  constructor(canvas: HTMLCanvasElement, n: number, seed: Float32Array) {
    const gl = canvas.getContext("webgl2", { premultipliedAlpha: true, antialias: false, alpha: true });
    if (!gl) throw new Error("webgl2 unavailable");
    this.gl = gl;
    this.n = n;
    const prog = link(gl, VERT, FRAG);
    gl.useProgram(prog);
    this.uRes = gl.getUniformLocation(prog, "uRes")!;
    this.uDpr = gl.getUniformLocation(prog, "uDpr")!;
    this.uTime = gl.getUniformLocation(prog, "uTime")!;
    this.uColor = gl.getUniformLocation(prog, "uColor")!;
    this.uScale = gl.getUniformLocation(prog, "uScale")!;
    this.pos = new Float32Array(n * 2);
    this.attrs.aPos = attr(gl, prog, "aPos", 2, this.pos);
    for (const name of ["aDepth", "aAlpha", "aAngle", "aBird", "aTone"]) {
      this.attrs[name] = attr(gl, prog, name, 1, new Float32Array(n));
    }
    attr(gl, prog, "aSeed", 1, seed);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  }

  draw(
    f: {
      px: Float32Array;
      py: Float32Array;
      depth: Float32Array;
      alpha: Float32Array;
      angle: Float32Array;
      bird: Float32Array;
      tone: Float32Array;
    },
    w: number,
    h: number,
    dpr: number,
    t: number,
  ) {
    const { gl, pos, n } = this;
    for (let i = 0; i < n; i++) {
      pos[i * 2] = f.px[i];
      pos[i * 2 + 1] = f.py[i];
    }
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(this.uRes, w, h);
    gl.uniform1f(this.uDpr, dpr);
    gl.uniform1f(this.uTime, t);
    gl.uniform3f(this.uColor, ...this.color);
    gl.uniform1f(this.uScale, this.scale);
    upload(gl, this.attrs.aPos.buf, pos);
    upload(gl, this.attrs.aDepth.buf, f.depth);
    upload(gl, this.attrs.aAlpha.buf, f.alpha);
    upload(gl, this.attrs.aAngle.buf, f.angle);
    upload(gl, this.attrs.aBird.buf, f.bird);
    upload(gl, this.attrs.aTone.buf, f.tone);
    gl.drawArrays(gl.POINTS, 0, n);
  }
}

function upload(gl: WebGL2RenderingContext, buf: WebGLBuffer, data: Float32Array) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);
}

function attr(gl: WebGL2RenderingContext, prog: WebGLProgram, name: string, size: number, data: Float32Array): Attr {
  const buf = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
  const loc = gl.getAttribLocation(prog, name);
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
  return { buf, data };
}

function link(gl: WebGL2RenderingContext, vs: string, fs: string) {
  const p = gl.createProgram()!;
  for (const [type, src] of [
    [gl.VERTEX_SHADER, vs],
    [gl.FRAGMENT_SHADER, fs],
  ] as const) {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
    gl.attachShader(p, s);
  }
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) ?? "link");
  return p;
}
