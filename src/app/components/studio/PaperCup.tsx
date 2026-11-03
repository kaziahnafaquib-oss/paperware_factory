import React from "react";
import * as THREE from "three";
import type { LabelTextures } from "./LabelTexture";
import type { SurfacePreset } from "./MaterialPresets";

interface Props {
  label: LabelTextures | null;
  preset: SurfacePreset;
}

const BOTTOM_R = 0.3;
const TOP_R = 0.42;
const HEIGHT = 1.0;
const RIM_TUBE = 0.026;
const SEGMENTS = 96;

/** Side wall sampled along its length so lathe v maps linearly to height. */
function wallPoints(inset = 0): THREE.Vector2[] {
  const pts: THREE.Vector2[] = [];
  const n = 32;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    // Very slight outward belly on real cups (board tension).
    const belly = Math.sin(t * Math.PI) * 0.004;
    const r = BOTTOM_R + (TOP_R - BOTTOM_R) * t + belly - inset;
    pts.push(new THREE.Vector2(r, t * HEIGHT));
  }
  return pts;
}

/** Recessed bottom: outer lip down to the floor, then an inset disc. */
function bottomPoints(): THREE.Vector2[] {
  return [
    new THREE.Vector2(0, 0.04),
    new THREE.Vector2(BOTTOM_R - 0.035, 0.04),
    new THREE.Vector2(BOTTOM_R - 0.035, 0.0),
    new THREE.Vector2(BOTTOM_R, 0.0),
    new THREE.Vector2(BOTTOM_R + 0.002, 0.012),
  ];
}

export function PaperCup({ label, preset }: Props) {
  const wallGeo = React.useMemo(() => new THREE.LatheGeometry(wallPoints(), SEGMENTS), []);
  const innerGeo = React.useMemo(() => new THREE.LatheGeometry(wallPoints(0.012), SEGMENTS), []);
  const bottomGeo = React.useMemo(() => new THREE.LatheGeometry(bottomPoints(), SEGMENTS), []);
  const seamGeo = React.useMemo(() => new THREE.LatheGeometry(wallPoints(-0.004), 2, -0.004, 0.012), []);
  const rimGeo = React.useMemo(() => new THREE.TorusGeometry(TOP_R - RIM_TUBE * 0.4, RIM_TUBE, 24, SEGMENTS), []);

  React.useEffect(() => {
    return () => {
      wallGeo.dispose();
      innerGeo.dispose();
      bottomGeo.dispose();
      seamGeo.dispose();
      rimGeo.dispose();
    };
  }, [wallGeo, innerGeo, bottomGeo, seamGeo, rimGeo]);

  const innerColor = React.useMemo(() => new THREE.Color(preset.paperColor).lerp(new THREE.Color("#ffffff"), 0.35), [preset.paperColor]);

  return (
    // Lathe u=0 (the seam) faces +Z; turn the cup so the artwork at u=0.5 faces the camera.
    <group position={[0, -HEIGHT / 2, 0]} rotation={[0, Math.PI, 0]}>
      {/* Printed outer wall */}
      <mesh geometry={wallGeo} castShadow receiveShadow>
        <meshPhysicalMaterial
          key={`wall-${label ? "tex" : "plain"}-${label?.bump ? "bump" : "flat"}`}
          map={label?.map ?? null}
          color={label ? "#ffffff" : preset.paperColor}
          bumpMap={label?.bump ?? null}
          bumpScale={label?.bump ? preset.bumpScale : 0}
          roughness={preset.roughness}
          metalness={preset.metalness}
          clearcoat={preset.clearcoat}
          clearcoatRoughness={preset.clearcoatRoughness}
          sheen={preset.sheen}
          sheenRoughness={preset.sheenRoughness}
          side={THREE.FrontSide}
        />
      </mesh>
      {/* Inner wall (PE-lined, slightly lighter, seen through the opening) */}
      <mesh geometry={innerGeo}>
        <meshPhysicalMaterial color={innerColor} roughness={0.45} clearcoat={0.5} clearcoatRoughness={0.25} side={THREE.BackSide} />
      </mesh>
      {/* Recessed bottom */}
      <mesh geometry={bottomGeo} castShadow>
        <meshStandardMaterial color={preset.paperColor} roughness={Math.min(1, preset.roughness + 0.05)} side={THREE.DoubleSide} />
      </mesh>
      {/* Raised side seam strip */}
      <mesh geometry={seamGeo}>
        <meshStandardMaterial color={new THREE.Color(preset.paperColor).multiplyScalar(0.92)} roughness={preset.roughness} side={THREE.DoubleSide} />
      </mesh>
      {/* Rolled top rim */}
      <mesh geometry={rimGeo} position={[0, HEIGHT, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <meshPhysicalMaterial color={preset.paperColor} roughness={Math.max(0.3, preset.roughness - 0.25)} clearcoat={0.4} clearcoatRoughness={0.3} />
      </mesh>
    </group>
  );
}

export default PaperCup;
