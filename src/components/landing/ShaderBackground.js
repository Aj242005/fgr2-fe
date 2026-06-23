"use client";
import { useEffect, useRef } from "react";

const VERTEX_SHADER = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_nav_width;
uniform float u_nav_y;
uniform float u_nav_height;

varying vec2 v_texCoord;

float hash(float n) {
    return fract(sin(n) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i.x + i.y * 57.0);
    float b = hash(i.x + 1.0 + i.y * 57.0);
    float c = hash(i.x + (i.y + 1.0) * 57.0);
    float d = hash(i.x + 1.0 + (i.y + 1.0) * 57.0);
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
    vec2 uv = v_texCoord;
    float aspect = u_resolution.x / u_resolution.y;
    
    vec2 refractedUV = uv;
    
    float navX = 0.5;
    vec2 navDist = abs(uv - vec2(navX, u_nav_y));
    float navArea = smoothstep(u_nav_width, u_nav_width - 0.05, navDist.x) * 
                    smoothstep(u_nav_height, u_nav_height - 0.02, navDist.y);
    
    if (navArea > 0.0) {
        refractedUV += (uv - vec2(navX, u_nav_y)) * 0.05 * navArea;
    }

    vec3 finalColor = vec3(0.005, 0.005, 0.01);

    vec3 beamBaseColor = vec3(0.937, 0.267, 0.267);
    vec3 glowColor = vec3(1.0, 0.4, 0.4);

    const int NUM_PATHS = 40;
    
    for (int i = 0; i < NUM_PATHS; i++) {
        float fi = float(i);
        float seed = fi * 123.456;
        
        float xOffset = hash(seed) * aspect;
        float speed = 0.15 + hash(seed + 1.0) * 0.35;
        float width = 0.0012 + hash(seed + 2.0) * 0.0008;
        float opacityBase = 0.04 + hash(seed + 3.0) * 0.12;
        
        float curveX = refractedUV.x * aspect;
        float wave = sin(curveX * 1.8 + seed + u_time * 0.1) * 0.12;
        float pathY = fract(xOffset + curveX * 0.4 + wave);
        
        float dist = abs(refractedUV.y - pathY);
        float line = smoothstep(width, 0.0, dist);
        
        finalColor += beamBaseColor * line * opacityBase;
        
        float pulsePos = fract(u_time * speed + hash(seed + 4.0));
        float pulseLength = 0.2;
        float pulseDist = abs(refractedUV.x - pulsePos);
        float pulse = smoothstep(pulseLength, 0.0, pulseDist) * line;
        
        finalColor += glowColor * pulse * 1.2;
        finalColor += beamBaseColor * smoothstep(width * 8.0, 0.0, dist) * pulse * 0.6;
    }

    float vignette = smoothstep(1.6, 0.4, length(uv - 0.5));
    finalColor *= vignette;

    gl_FragColor = vec4(finalColor, 1.0);
}`;

export default function ShaderBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 640, y: 360 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return; // Graceful fallback — CSS gradient will show

    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(canvas);
    syncSize();

    function createShader(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, createShader(gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(prog, createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uNavWidth = gl.getUniformLocation(prog, "u_nav_width");
    const uNavY = gl.getUniformLocation(prog, "u_nav_y");
    const uNavHeight = gl.getUniformLocation(prog, "u_nav_height");

    function onMouseMove(event) {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouseRef.current = { x: nx * canvas.width, y: ny * canvas.height };
      }
    }
    window.addEventListener("mousemove", onMouseMove);

    function render(t) {
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);

      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / 100, 1.0);
      const currentNavWidth = 0.5 - 0.3 * progress;
      const currentNavY = 0.96 - 0.03 * progress;
      const currentNavHeight = 0.05;

      if (uNavWidth) gl.uniform1f(uNavWidth, currentNavWidth);
      if (uNavY) gl.uniform1f(uNavY, currentNavY);
      if (uNavHeight) gl.uniform1f(uNavHeight, currentNavHeight);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animFrameRef.current = requestAnimationFrame(render);
    }
    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none" style={{ background: "linear-gradient(180deg, #0a0a0f 0%, #000000 100%)" }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
