// Minimal WebGL2 renderer: one additive point sprite per particle.

const VERT = `#version 300 es
in vec2 aPos;
in float aDepth;
in float aAlpha;
in float aSeed;
uniform vec2 uRes;
uniform float uDpr;
out float vAlpha;
out float vSeed;
void main() {
  vec2 clip = (aPos / uRes) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = (1.1 + aDepth * 1.9 + aSeed * 0.8) * uDpr;
  vAlpha = aAlpha;
  vSeed = aSeed;
}`;

const FRAG = `#version 300 es
precision mediump float;
in float vAlpha;
in float vSeed;
out vec4 outColor;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float disc = smoothstep(0.5, 0.18, d);
  vec3 amber = vec3(0.941, 0.718, 0.137);
  vec3 warm = vec3(1.0, 0.93, 0.78);
  vec3 col = mix(amber, warm, step(0.82, vSeed) * 0.85);
  outColor = vec4(col * disc * vAlpha, disc * vAlpha);
}`;

export class PointsGL {
  gl: WebGL2RenderingContext;
  prog: WebGLProgram;
  bufPos: WebGLBuffer;
  bufDepth: WebGLBuffer;
  bufAlpha: WebGLBuffer;
  bufSeed: WebGLBuffer;
  pos: Float32Array;
  uRes: WebGLUniformLocation;
  uDpr: WebGLUniformLocation;
  n: number;

  constructor(canvas: HTMLCanvasElement, n: number, seed: Float32Array) {
    const gl = canvas.getContext("webgl2", { premultipliedAlpha: true, antialias: false, alpha: true });
    if (!gl) throw new Error("webgl2 unavailable");
    this.gl = gl;
    this.n = n;
    this.prog = link(gl, VERT, FRAG);
    gl.useProgram(this.prog);
    this.uRes = gl.getUniformLocation(this.prog, "uRes")!;
    this.uDpr = gl.getUniformLocation(this.prog, "uDpr")!;
    this.pos = new Float32Array(n * 2);
    this.bufPos = attr(gl, this.prog, "aPos", 2, this.pos);
    this.bufDepth = attr(gl, this.prog, "aDepth", 1, new Float32Array(n));
    this.bufAlpha = attr(gl, this.prog, "aAlpha", 1, new Float32Array(n));
    this.bufSeed = attr(gl, this.prog, "aSeed", 1, seed);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
  }

  draw(px: Float32Array, py: Float32Array, depth: Float32Array, alpha: Float32Array, w: number, h: number, dpr: number) {
    const { gl, pos, n } = this;
    for (let i = 0; i < n; i++) {
      pos[i * 2] = px[i];
      pos[i * 2 + 1] = py[i];
    }
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(this.uRes, w, h);
    gl.uniform1f(this.uDpr, dpr);
    upload(gl, this.bufPos, pos);
    upload(gl, this.bufDepth, depth);
    upload(gl, this.bufAlpha, alpha);
    gl.drawArrays(gl.POINTS, 0, n);
  }
}

function upload(gl: WebGL2RenderingContext, buf: WebGLBuffer, data: Float32Array) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);
}

function attr(gl: WebGL2RenderingContext, prog: WebGLProgram, name: string, size: number, data: Float32Array) {
  const buf = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
  const loc = gl.getAttribLocation(prog, name);
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
  return buf;
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
