import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import { Cell, posterFor } from "./heroData";
import { GridTextureManager } from "./gridTextures";

// Image-only grid in the hero (mobile video decode is intentionally avoided on
// this site). Keep the manager but never spin up video elements.
const MAX_VIDEOS = 0;

const isCoarse = () =>
  typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches;

const CARD_SCALE = 1.5; // single knob for card size
const CELL = 1.7 * CARD_SCALE;
const GAP = 0.14 * CARD_SCALE;
const STEP = CELL + GAP;
const COLS = 11; // lattice columns before wrap

// spherical-bowl curvature (phantom.land signature): tiles recede + tilt toward
// the viewport centre as they move outward, anchored to the viewport not content.
const CURVE = 0.05; // z = -CURVE * (px^2 + py^2)
const MAX_TILT = 0.46; // clamp tile tilt (radians)
const FADE_START = STEP * 1.7; // radial distance where edge fade begins
const FADE_END = STEP * 3.2; // fully faded
const DEPTH_SHADE = 0.17; // how much receding cards darken (depth cue)

// gentle idle float so the hero feels alive without interaction
const DRIFT_X = 0.0016;
const DRIFT_Y = 0.0009;

type Props = {
  cells: Cell[];
  onHover: (cell: Cell | null) => void;
  onSelect: (cell: Cell) => void;
};

// wrap a lattice (col,row) to a cell index in [0,n)
function cellIndex(col: number, row: number, n: number) {
  let lin = (row * COLS + col) % n;
  if (lin < 0) lin += n;
  return lin;
}

export default function Workgrid({ cells, onHover, onSelect }: Props) {
  const { camera, gl, size } = useThree();
  const n = cells.length;
  const posters = useMemo(() => cells.map(posterFor), [cells]);
  const mgr = useMemo(
    () => new GridTextureManager(cells, posters, MAX_VIDEOS),
    [cells, posters]
  );
  useEffect(() => () => mgr.dispose(), [mgr]);

  const coarse = useMemo(() => isCoarse(), []);

  // drag / inertia state
  const offset = useRef(new THREE.Vector2(0, 0));
  const vel = useRef(new THREE.Vector2(0, 0));
  const dragging = useRef(false);
  const last = useRef(new THREE.Vector2());
  const moved = useRef(0);
  const hoverIndex = useRef<number | null>(null);

  const group = useRef<THREE.Group>(null!);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const pointerNDC = useRef(new THREE.Vector2(2, 2)); // offscreen by default

  const halfW = useRef(0);
  const halfH = useRef(0);
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const dist = cam.position.z;
    const vH = 2 * Math.tan((cam.fov * Math.PI) / 180 / 2) * dist;
    halfH.current = vH / 2;
    halfW.current = (vH * cam.aspect) / 2;
  }, [camera, size]);

  // fixed pool large enough for viewport + margin
  const pool = useMemo(() => {
    const visCols = Math.ceil((halfW.current * 2) / STEP) + 4 || 16;
    const visRows = Math.ceil((halfH.current * 2) / STEP) + 4 || 12;
    const count = Math.max(visCols * visRows, 240);
    return Array.from({ length: count }, () => ({ col: 0, row: 0, assigned: -1 }));
  }, [size]);

  // raycast at a given NDC point → selected cell (used for taps/clicks)
  const selectAt = (ndc: THREE.Vector2) => {
    raycaster.setFromCamera(ndc, camera);
    const meshes = group.current.children as THREE.Mesh[];
    const hit = raycaster.intersectObjects(
      meshes.filter((m) => m.visible),
      false
    )[0];
    if (!hit) return;
    const idx = pool[meshes.indexOf(hit.object as THREE.Mesh)]?.assigned ?? null;
    if (idx !== null) onSelect(cells[idx]);
  };

  // pointer handlers on the canvas
  useEffect(() => {
    const el = gl.domElement;
    const ndcOf = (e: PointerEvent | MouseEvent) => {
      const rect = el.getBoundingClientRect();
      return new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
    };

    // touch: let the page scroll vertically, open tiles via click
    if (coarse) {
      const onClick = (e: MouseEvent) => selectAt(ndcOf(e));
      el.addEventListener("click", onClick);
      return () => el.removeEventListener("click", onClick);
    }

    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      moved.current = 0;
      last.current.set(e.clientX, e.clientY);
      vel.current.set(0, 0);
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pointerNDC.current.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      if (!dragging.current) return;
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      last.current.set(e.clientX, e.clientY);
      moved.current += Math.abs(dx) + Math.abs(dy);
      const wx = (dx / rect.width) * halfW.current * 2;
      const wy = (dy / rect.height) * halfH.current * 2;
      offset.current.x -= wx;
      offset.current.y += wy;
      vel.current.set(-wx, wy);
    };
    const onUp = (e: PointerEvent) => {
      if (dragging.current && moved.current < 6 && hoverIndex.current !== null) {
        onSelect(cells[hoverIndex.current]);
      }
      dragging.current = false;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
    };
    const onLeave = () => {
      pointerNDC.current.set(2, 2);
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointerleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, cells, onSelect, coarse]);

  useFrame(() => {
    // motion: drag inertia, else gentle idle drift
    if (!dragging.current) {
      if (vel.current.lengthSq() < 1e-5) {
        offset.current.x += DRIFT_X;
        offset.current.y += DRIFT_Y;
      } else {
        offset.current.x += vel.current.x;
        offset.current.y += vel.current.y;
        vel.current.multiplyScalar(0.92);
        if (vel.current.lengthSq() < 1e-6) vel.current.set(0, 0);
      }
    }

    const ox = offset.current.x;
    const oy = offset.current.y;

    const minCol = Math.floor((ox - halfW.current) / STEP) - 1;
    const maxCol = Math.ceil((ox + halfW.current) / STEP) + 1;
    const minRow = Math.floor((oy - halfH.current) / STEP) - 1;
    const maxRow = Math.ceil((oy + halfH.current) / STEP) + 1;

    const meshes = group.current.children as THREE.Mesh[];
    let k = 0;

    for (let row = minRow; row <= maxRow; row++) {
      for (let col = minCol; col <= maxCol; col++) {
        if (k >= meshes.length) break;
        const mesh = meshes[k];
        const px = col * STEP - ox;
        const py = row * STEP - oy;
        const z = -CURVE * (px * px + py * py);
        mesh.position.set(px, py, z);
        mesh.rotation.y = Math.max(-MAX_TILT, Math.min(MAX_TILT, Math.atan(2 * CURVE * px)));
        mesh.rotation.x = Math.max(-MAX_TILT, Math.min(MAX_TILT, -Math.atan(2 * CURVE * py)));
        const r = Math.sqrt(px * px + py * py);
        const fade =
          r <= FADE_START ? 1 : r >= FADE_END ? 0 : 1 - (r - FADE_START) / (FADE_END - FADE_START);
        const matF = mesh.material as THREE.MeshBasicMaterial;
        matF.opacity = fade * fade;
        const isHover = pool[k].assigned === hoverIndex.current;
        matF.color.setScalar(isHover ? 1 : Math.max(0.52, 1 + z * DEPTH_SHADE));
        mesh.visible = fade > 0.01;
        const idx = cellIndex(col, row, n);
        const slot = pool[k];
        if (slot.assigned !== idx) {
          slot.assigned = idx;
          matF.map = mgr.textureFor(idx);
          matF.needsUpdate = true;
        }
        k++;
      }
    }
    for (; k < meshes.length; k++) meshes[k].visible = false;

    // hover raycast (fine pointers only)
    if (!coarse && pointerNDC.current.x <= 1 && pointerNDC.current.x >= -1) {
      raycaster.setFromCamera(pointerNDC.current, camera);
      const hit = raycaster.intersectObjects(
        meshes.filter((m) => m.visible),
        false
      )[0];
      if (hit) {
        const idx = pool[meshes.indexOf(hit.object as THREE.Mesh)]?.assigned ?? null;
        if (idx !== hoverIndex.current) {
          hoverIndex.current = idx;
          onHover(idx !== null ? cells[idx] : null);
        }
      } else if (hoverIndex.current !== null) {
        hoverIndex.current = null;
        onHover(null);
      }
    }

    // subtle hover scale
    for (let i = 0; i < meshes.length; i++) {
      const target = pool[i].assigned === hoverIndex.current && meshes[i].visible ? 1.04 : 1;
      const s = meshes[i].scale.x + (target - meshes[i].scale.x) * 0.18;
      meshes[i].scale.setScalar(s);
    }
  });

  const geo = useMemo(() => roundedPlane(CELL, CELL, 0.09 * CARD_SCALE), []);

  return (
    <group ref={group}>
      {pool.map((_, i) => (
        <mesh key={i} geometry={geo}>
          <meshBasicMaterial toneMapped={false} transparent depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

// rounded-rectangle plane with normalised UVs so the texture maps 0..1
function roundedPlane(w: number, h: number, radius: number) {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  const r = Math.min(radius, w / 2, h / 2);
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  const geo = new THREE.ShapeGeometry(shape, 12);
  const pos = geo.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (pos.getX(i) + w / 2) / w;
    uv[i * 2 + 1] = (pos.getY(i) + h / 2) / h;
  }
  geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return geo;
}
