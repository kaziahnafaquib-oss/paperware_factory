import React from "react";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import type { LabelTextures } from "./LabelTexture";
import type { SurfacePreset } from "./MaterialPresets";

interface Props {
  label: LabelTextures | null;
  preset: SurfacePreset;
}

const W = 1.25;
const D = 1.05;
const BASE_H = 0.4;
const LID_H = 0.3;
const WALL = 0.03;
const LID_OPEN = -0.3; // radians, hinge at the back edge

export function BurgerBox({ label, preset }: Props) {
  const paper = {
    color: preset.paperColor,
    roughness: preset.roughness,
    metalness: preset.metalness,
    clearcoat: preset.clearcoat * 0.5,
    clearcoatRoughness: preset.clearcoatRoughness,
    sheen: preset.sheen,
    sheenRoughness: preset.sheenRoughness,
  };
  const inner = React.useMemo(() => new THREE.Color(preset.paperColor).lerp(new THREE.Color("#ffffff"), 0.3), [preset.paperColor]);

  return (
    <group position={[0, -0.4, 0]}>
      {/* Base: hollow tray (floor + 4 walls) */}
      <RoundedBox args={[W, WALL, D]} radius={0.012} smoothness={3} position={[0, WALL / 2, 0]} receiveShadow castShadow>
        <meshPhysicalMaterial {...paper} />
      </RoundedBox>
      {[-1, 1].map((s) => (
        <RoundedBox key={`side-${s}`} args={[WALL, BASE_H, D]} radius={0.01} smoothness={3} position={[(s * (W - WALL)) / 2, BASE_H / 2, 0]} castShadow receiveShadow>
          <meshPhysicalMaterial {...paper} />
        </RoundedBox>
      ))}
      {[-1, 1].map((s) => (
        <RoundedBox key={`end-${s}`} args={[W, BASE_H, WALL]} radius={0.01} smoothness={3} position={[0, BASE_H / 2, (s * (D - WALL)) / 2]} castShadow receiveShadow>
          <meshPhysicalMaterial {...paper} />
        </RoundedBox>
      ))}
      {/* Interior floor tint */}
      <mesh position={[0, WALL + 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W - WALL * 2, D - WALL * 2]} />
        <meshStandardMaterial color={inner} roughness={0.55} />
      </mesh>
      {/* Front print strip */}
      {label && (
        <mesh position={[0, BASE_H * 0.5, D / 2 + 0.0015]}>
          <planeGeometry args={[W * 0.9, BASE_H * 0.7]} />
          <meshPhysicalMaterial map={label.map} roughness={preset.roughness} clearcoat={preset.clearcoat} clearcoatRoughness={preset.clearcoatRoughness} transparent />
        </mesh>
      )}

      {/* Lid: hinged at the back top edge, slightly open */}
      <group position={[0, BASE_H, -D / 2]} rotation={[LID_OPEN, 0, 0]}>
        <RoundedBox args={[W, WALL, D]} radius={0.012} smoothness={3} position={[0, LID_H - WALL / 2, D / 2]} castShadow receiveShadow>
          <meshPhysicalMaterial {...paper} />
        </RoundedBox>
        {[-1, 1].map((s) => (
          <RoundedBox key={`lside-${s}`} args={[WALL, LID_H, D]} radius={0.01} smoothness={3} position={[(s * (W - WALL)) / 2, LID_H / 2, D / 2]} castShadow receiveShadow>
            <meshPhysicalMaterial {...paper} />
          </RoundedBox>
        ))}
        <RoundedBox args={[W, LID_H, WALL]} radius={0.01} smoothness={3} position={[0, LID_H / 2, D - WALL / 2]} castShadow receiveShadow>
          <meshPhysicalMaterial {...paper} />
        </RoundedBox>
        {/* Lid underside tint */}
        <mesh position={[0, LID_H - WALL - 0.001, D / 2]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[W - WALL * 2, D - WALL * 2]} />
          <meshStandardMaterial color={inner} roughness={0.55} />
        </mesh>
        {/* Lid artwork */}
        {label && (
          <mesh position={[0, LID_H + 0.0015, D / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[W * 0.92, D * 0.86]} />
            <meshPhysicalMaterial
              key={label.bump ? "lid-bump" : "lid-flat"}
              map={label.map}
              bumpMap={label.bump ?? null}
              bumpScale={label.bump ? preset.bumpScale : 0}
              roughness={preset.roughness}
              clearcoat={preset.clearcoat}
              clearcoatRoughness={preset.clearcoatRoughness}
              transparent
            />
          </mesh>
        )}
      </group>
    </group>
  );
}

export default BurgerBox;
