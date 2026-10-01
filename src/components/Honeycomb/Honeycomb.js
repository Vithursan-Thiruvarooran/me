import React, { useEffect, useRef } from "react";
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, BufferGeometry, BufferAttribute, CanvasTexture,
  Mesh, MeshBasicMaterial, LineSegments, LineBasicMaterial, Points, PointsMaterial, Color, DoubleSide, MathUtils,
} from "three";

// Hex lattice hero background. Tiles flip over under the cursor, a click sends a wave of flips,
// and the 19 hexes of a Catan board sit in the grid a shade darker than the rest.

const SQ3 = Math.sqrt(3);
const CORNER = [...Array(6)].map((_, k) => [Math.cos(Math.PI / 180 * (60 * k + 30)), Math.sin(Math.PI / 180 * (60 * k + 30))]);
const hexDist = (dq, dr) => (Math.abs(dq) + Math.abs(dr) + Math.abs(dq + dr)) / 2;
const smooth = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

const FLIP = 620, HOLD = 450, FADE = 1100, LIFE = FLIP + HOLD + FADE;
const MAXP = 1600, MAXL = 4000, MAXF = 700;

const Honeycomb = ({ colors }) => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(colors);
  const retheme = useRef(() => {});

  useEffect(() => {
    colorsRef.current = colors;
    retheme.current();
  }, [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas.parentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer;
    try {
      renderer = new WebGLRenderer({ canvas, antialias: true });
    } catch (e) {
      canvas.style.display = "none";
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new Scene();
    const camera = new PerspectiveCamera(50, 1, 1, 2000);
    camera.position.z = 400;
    const group = new Group();
    scene.add(group);

    // Vertex-coloured buffers; colours fade by mixing toward the page background.
    const pPos = new Float32Array(MAXP * 3), pCol = new Float32Array(MAXP * 3);
    const lPos = new Float32Array(MAXL * 6), lCol = new Float32Array(MAXL * 6);
    const fPos = new Float32Array(MAXF * 54), fCol = new Float32Array(MAXF * 54);
    const makeGeo = (p, c) => {
      const g = new BufferGeometry();
      g.setAttribute("position", new BufferAttribute(p, 3));
      g.setAttribute("color", new BufferAttribute(c, 3));
      return g;
    };
    const pGeo = makeGeo(pPos, pCol), lGeo = makeGeo(lPos, lCol), fGeo = makeGeo(fPos, fCol);
    const dotCanvas = document.createElement("canvas");
    dotCanvas.width = dotCanvas.height = 64;
    const dctx = dotCanvas.getContext("2d");
    dctx.beginPath(); dctx.arc(32, 32, 28, 0, Math.PI * 2); dctx.fillStyle = "#fff"; dctx.fill();
    const dotTex = new CanvasTexture(dotCanvas);
    const fMat = new MeshBasicMaterial({ vertexColors: true, side: DoubleSide, depthTest: false });
    const lMat = new LineBasicMaterial({ vertexColors: true, depthTest: false });
    const pMat = new PointsMaterial({ size: 3.6, map: dotTex, vertexColors: true, alphaTest: 0.5, depthTest: false });
    const fills = new Mesh(fGeo, fMat), lines = new LineSegments(lGeo, lMat), dots = new Points(pGeo, pMat);
    fills.renderOrder = 0; lines.renderOrder = 1; dots.renderOrder = 2;
    group.add(fills, lines, dots);

    const bg = new Color(), lineC = new Color(), dotC = new Color(), fillC = new Color(), tmp = new Color();
    let np = 0, nl = 0, nf = 0;
    const mix = (c, t) => tmp.setRGB(bg.r + (c.r - bg.r) * t, bg.g + (c.g - bg.g) * t, bg.b + (c.b - bg.b) * t);
    const point = (x, y, z, t, c) => {
      if (np >= MAXP) return;
      const o = np++ * 3, k = mix(c, t);
      pPos[o] = x; pPos[o + 1] = y; pPos[o + 2] = z;
      pCol[o] = k.r; pCol[o + 1] = k.g; pCol[o + 2] = k.b;
    };
    const line = (a, b, t, c) => {
      if (nl >= MAXL || t <= 0.01) return;
      const o = nl++ * 6, k = mix(c, t);
      lPos[o] = a[0]; lPos[o + 1] = a[1]; lPos[o + 2] = a[2];
      lPos[o + 3] = b[0]; lPos[o + 4] = b[1]; lPos[o + 5] = b[2];
      lCol[o] = lCol[o + 3] = k.r; lCol[o + 1] = lCol[o + 4] = k.g; lCol[o + 2] = lCol[o + 5] = k.b;
    };
    const fill = (center, ring, t, c) => { // filled hexagon as a 6-triangle fan
      if (nf >= MAXF) return;
      const k = mix(c, t);
      let o = nf++ * 54;
      for (let i = 0; i < 6; i++) {
        for (const v of [center, ring[i], ring[(i + 1) % 6]]) {
          fPos[o] = v[0]; fPos[o + 1] = v[1]; fPos[o + 2] = v[2];
          fCol[o] = k.r; fCol[o + 1] = k.g; fCol[o + 2] = k.b;
          o += 3;
        }
      }
    };

    // Lattice of pointy-top hexes in axial coords, rebuilt on resize.
    let W = 600, H = 373, s = 30, cells = [], byKey = new Map(), verts = [], edges = [];
    const size = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      H = 2 * 400 * Math.tan(MathUtils.degToRad(25));
      W = H * camera.aspect;
      const wide = w / h > 1.25;
      const hs = wide ? 30 : 24;
      const newCells = [], newByKey = new Map(), newVerts = [], newEdges = [];
      const vk = new Map(), ek = new Map();
      const vid = (x, y) => {
        const key = Math.round(x * 4) + "," + Math.round(y * 4);
        if (!vk.has(key)) { vk.set(key, newVerts.length); newVerts.push([x, y]); }
        return vk.get(key);
      };
      // Board centre: right of the text on wide screens, below it on narrow ones.
      const bq = wide ? Math.round(W * 0.26 / (hs * SQ3)) : 0;
      const br = wide ? 0 : Math.round(H * 0.22 / (1.5 * hs));
      const rMax = Math.ceil(H / 2 / (1.5 * hs)) + 1, qSpan = Math.ceil(W / 2 / (hs * SQ3)) + 2;
      for (let r = -rMax; r <= rMax; r++) {
        const q0 = -Math.round(r / 2);
        for (let q = q0 - qSpan; q <= q0 + qSpan; q++) {
          const cx = hs * SQ3 * (q + r / 2), cy = -1.5 * hs * r;
          const cell = { q, r, cx, cy, board: hexDist(q - bq, r - br) <= 2, t0: -1e9, ux: 1, uy: 0 };
          const ids = CORNER.map(([c, d]) => vid(cx + hs * c, cy + hs * d));
          ids.forEach((a, k) => {
            const b = ids[(k + 1) % 6], key = a < b ? a + "," + b : b + "," + a;
            if (!ek.has(key)) { ek.set(key, newEdges.length); newEdges.push({ a, b, board: false }); }
            if (cell.board) newEdges[ek.get(key)].board = true;
          });
          newByKey.set(q + "," + r, cell);
          newCells.push(cell);
        }
      }
      s = hs; cells = newCells; byKey = newByKey; verts = newVerts; edges = newEdges;
    };
    const cellAt = (x, y) => {
      const rf = -y / (1.5 * s), qf = x / (s * SQ3) - rf / 2, sf = -qf - rf;
      let q = Math.round(qf), r = Math.round(rf);
      const sr = Math.round(sf);
      const dq = Math.abs(q - qf), dr = Math.abs(r - rf), ds = Math.abs(sr - sf);
      if (dq > dr && dq > ds) q = -r - sr;
      else if (dr > ds) r = -q - sr;
      return byKey.get(q + "," + r);
    };

    const applyColors = () => {
      const c = colorsRef.current;
      bg.set(c.background); lineC.set(c.line); dotC.set(c.dot); fillC.set(c.fill);
      renderer.setClearColor(bg, 1);
    };

    // A tile lifts out of the grid, turns over to its filled side, then melts back in.
    const flip = (cell, now, ux, uy) => {
      if (!cell || now - cell.t0 < LIFE) return;
      const m = Math.hypot(ux, uy) || 1;
      cell.t0 = now; cell.ux = ux / m; cell.uy = uy / m;
    };
    const wave = (origin, now) => {
      if (!origin) return;
      for (const c of cells) {
        const d = hexDist(c.q - origin.q, c.r - origin.r);
        if (d > 7) continue;
        c.t0 = -1e9;
        flip(c, now + d * 70, -(c.cy - origin.cy) || 1, c.cx - origin.cx); // axis tangent to the ring, so tiles tip outward
      }
    };

    const mouse = { x: 0, y: 0, on: false, tx: 0, ty: 0, px: null, py: null };
    const toNdc = (e) => {
      const r = canvas.getBoundingClientRect();
      return [(e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height * 2 - 1)];
    };
    const onMove = (e) => {
      const [nx, ny] = toNdc(e), x = nx * W / 2, y = ny * H / 2;
      if (mouse.px !== null) {
        const vx = x - mouse.px, vy = y - mouse.py;
        if (Math.hypot(vx, vy) > 1.5) flip(cellAt(x, y), performance.now(), -vy, vx); // tip over in the direction of travel
      }
      Object.assign(mouse, { x, y, px: x, py: y, tx: nx, ty: ny, on: true });
    };
    const onLeave = () => { mouse.on = false; mouse.px = mouse.py = null; mouse.tx = mouse.ty = 0; };
    const onClick = (e) => {
      if (e.target.closest("a,button")) return;
      const [nx, ny] = toNdc(e);
      wave(cellAt(nx * W / 2, ny * H / 2), performance.now());
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("click", onClick);

    let nextAmbient = 0;
    const ringPts = [...Array(6)].map(() => [0, 0, 0]), ctr = [0, 0, 0];
    const draw = (step) => {
      if (!cells.length) return;
      np = nl = nf = 0;
      const now = performance.now();
      if (step) {
        if (now > nextAmbient) {
          const a = Math.random() * Math.PI * 2;
          flip(cells[Math.floor(Math.random() * cells.length)], now, Math.cos(a), Math.sin(a));
          nextAmbient = now + 900;
        }
        if (!reduced) {
          group.rotation.y += (mouse.tx * 0.1 - group.rotation.y) * 0.04;
          group.rotation.x += (-mouse.ty * 0.06 - group.rotation.x) * 0.04;
        }
      }
      const glow = (p) => (mouse.on ? smooth(1 - Math.hypot(p[0] - mouse.x, p[1] - mouse.y) / 120) : 0);
      const jitter = step && !reduced ? 1.4 : 0;
      const V = verts.map(([x, y], i) => [x + Math.sin(now * 0.0009 + i * 1.7) * jitter, y + Math.cos(now * 0.0011 + i * 2.3) * jitter, 0]);
      for (const e of edges) {
        const a = V[e.a], b = V[e.b];
        line(a, b, (e.board ? 0.27 : 0.13) + (glow(a) + glow(b)) * 0.2, lineC);
      }
      V.forEach((v) => point(v[0], v[1], 0, 0.22 + glow(v) * 0.6, dotC));

      const cs = s;
      for (const c of cells) {
        const age = now - c.t0;
        if (age < 0 || age >= LIFE) continue;
        const k = Math.min(1, age / FLIP), e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
        // With reduced motion the tile stays flat and its fill fades in and out instead of flipping.
        const th = reduced ? 0 : Math.PI * e, cos = Math.cos(th), sin = Math.sin(th);
        const fade = age < FLIP + HOLD ? (reduced ? e : 1) : 1 - (age - FLIP - HOLD) / FADE;
        const lift = sin * cs * 0.55;
        const wx = -c.uy, wy = c.ux; // in-plane perpendicular to the flip axis
        ctr[0] = c.cx; ctr[1] = c.cy; ctr[2] = lift;
        CORNER.forEach(([cx, cy], i) => {
          const ox = cx * cs * 0.97, oy = cy * cs * 0.97, au = ox * c.ux + oy * c.uy, aw = ox * wx + oy * wy;
          ringPts[i][0] = c.cx + c.ux * au + wx * aw * cos;
          ringPts[i][1] = c.cy + c.uy * au + wy * aw * cos;
          ringPts[i][2] = aw * sin + lift;
        });
        const back = reduced || cos < 0;
        fill(ctr, ringPts, (back ? 0.75 : 0.1) * fade, back ? fillC : lineC);
        for (let i = 0; i < 6; i++) line(ringPts[i], ringPts[(i + 1) % 6], 0.85 * fade, lineC);
      }

      pGeo.setDrawRange(0, np); lGeo.setDrawRange(0, nl * 2); fGeo.setDrawRange(0, nf * 18);
      for (const g of [pGeo, lGeo, fGeo]) g.attributes.position.needsUpdate = g.attributes.color.needsUpdate = true;
      renderer.render(scene, camera);
    };

    // Only animate while the hero is on screen and the tab is visible.
    let visible = true, raf = 0;
    const loop = () => {
      raf = 0;
      if (!visible || document.hidden) return;
      draw(true);
      raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; kick(); });
    io.observe(host);
    const ro = new ResizeObserver(() => { size(); draw(false); });
    ro.observe(canvas);
    document.addEventListener("visibilitychange", kick);
    retheme.current = () => { applyColors(); draw(false); };

    size(); applyColors(); draw(false); kick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      document.removeEventListener("visibilitychange", kick);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("click", onClick);
      retheme.current = () => {};
      [pGeo, lGeo, fGeo, fMat, lMat, pMat, dotTex].forEach((x) => x.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", touchAction: "pan-y" }}
    />
  );
};

export default Honeycomb;
