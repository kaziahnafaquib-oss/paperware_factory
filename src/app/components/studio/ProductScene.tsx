import React from "react";
import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { PaperCup } from "./PaperCup";
import { BurgerBox } from "./BurgerBox";
import { createLabelTextures, type LabelTextures } from "./LabelTexture";
import { getSurfacePreset } from "./MaterialPresets";

export interface ProductSceneProps {
  itemType: string;
  color: string;
  logo: string | null;
  logoScale: number;
  text: string;
  fontFamily: string;
  finish: string;
  material: string;
  lighting: string;
  rotation: number;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(() => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false));
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

/** Builds + disposes label textures whenever the artwork inputs change. */
function useLabelTextures(props: ProductSceneProps, paperColor: string, kind: "cup" | "box") {
  const [label, setLabel] = React.useState<LabelTextures | null>(null);
  const invalidate = useThree((s) => s.invalidate);
  React.useEffect(() => {
    let alive = true;
    let current: LabelTextures | null = null;
    createLabelTextures({
      logo: props.logo,
      logoScale: props.logoScale,
      text: props.text,
      fontFamily: props.fontFamily,
      finish: props.finish,
      paperColor,
      kind,
    }).then((tex) => {
      if (!alive) {
        tex.dispose();
        return;
      }
      current = tex;
      setLabel(tex);
      invalidate();
    });
    return () => {
      alive = false;
      current?.dispose();
    };
  }, [props.logo, props.logoScale, props.text, props.fontFamily, props.finish, paperColor, kind, invalidate]);
  return label;
}

function Product({ props, reduced }: { props: ProductSceneProps; reduced: boolean }) {
  const kind: "cup" | "box" = props.itemType === "box" ? "box" : "cup";
  const preset = React.useMemo(() => getSurfacePreset(props.color, props.material, props.finish), [props.color, props.material, props.finish]);
  const label = useLabelTextures(props, preset.paperColor, kind);
  const group = React.useRef<THREE.Group>(null);
  const invalidate = useThree((s) => s.invalidate);

  // Slider rotation maps to the model's own Y spin; orbit stays on the camera.
  React.useEffect(() => {
    if (group.current) group.current.rotation.y = THREE.MathUtils.degToRad(props.rotation);
    invalidate();
  }, [props.rotation, invalidate]);

  // Idle breathing (disabled under reduced motion).
  useFrame((state) => {
    if (reduced || !group.current) return;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.012;
  });

  return (
    <group ref={group}>
      {kind === "box" ? <BurgerBox label={label} preset={preset} /> : <PaperCup label={label} preset={preset} />}
    </group>
  );
}

function Rig({ lighting, reduced }: { lighting: string; reduced: boolean }) {
  const night = lighting === "night";
  const controls = React.useRef<any>(null);
  const [dragging, setDragging] = React.useState(false);
  const invalidate = useThree((s) => s.invalidate);
  const autoRotate = !reduced && !dragging;

  // Demand frameloop: keep ticking only while auto-rotating or damping.
  useFrame(() => {
    if (autoRotate) invalidate();
  });

  // Pull the camera back on narrow viewports so the product stays fully in frame.
  const size = useThree((s) => s.size);
  const camera = useThree((s) => s.camera);
  React.useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const dist = 3.4 / Math.min(1, aspect / 1.15);
    camera.position.set(0, 0.95, dist);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    invalidate();
  }, [size.width, size.height, camera, invalidate]);

  React.useEffect(() => {
    invalidate();
  }, [lighting, invalidate]);

  return (
    <>
      {/* Studio 3-point rig */}
      <ambientLight intensity={night ? 0.22 : 0.55} />
      <directionalLight
        position={[3.2, 4.5, 3.5]}
        intensity={night ? 1.6 : 2.4}
        color={night ? "#dfe8ff" : "#fff6e8"}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-camera-near={0.5}
        shadow-camera-far={15}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
      />
      <directionalLight position={[-4, 2, 2]} intensity={night ? 0.35 : 0.9} color={night ? "#6b7cff" : "#e8f0ff"} />
      <spotLight position={[-1.5, 3.5, -4]} angle={0.5} penumbra={0.8} intensity={night ? 4 : 2.2} color={night ? "#fabf37" : "#ffffff"} />
      {/* Soft contact shadow (procedural, no assets) */}
      <ContactShadows position={[0, -0.52, 0]} opacity={night ? 0.7 : 0.45} scale={5} blur={2.4} far={1.6} resolution={512} frames={1} />
      <OrbitControls
        ref={controls}
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        autoRotate={autoRotate}
        autoRotateSpeed={0.9}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.62}
        onStart={() => setDragging(true)}
        onEnd={() => setDragging(false)}
        onChange={() => invalidate()}
        makeDefault
      />
    </>
  );
}

export function ProductScene(props: ProductSceneProps) {
  const reduced = usePrefersReducedMotion();
  const productName = props.itemType === "box" ? "burger box" : "paper cup";
  const describedBy = React.useId();
  const [canvasEl, setCanvasEl] = React.useState<HTMLCanvasElement | null>(null);

  // R3F does not forward ARIA props to the <canvas>; set them on the element directly.
  React.useEffect(() => {
    if (!canvasEl) return;
    canvasEl.setAttribute("role", "img");
    canvasEl.setAttribute("aria-label", `3D preview of a ${productName}`);
    canvasEl.setAttribute("aria-describedby", describedBy);
  }, [canvasEl, productName, describedBy]);

  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        frameloop="demand"
        camera={{ position: [0, 0.95, 3.4], fov: 30, near: 0.1, far: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          setCanvasEl(gl.domElement);
        }}
      >
        <Rig lighting={props.lighting} reduced={reduced} />
        <Product props={props} reduced={reduced} />
      </Canvas>
      <p id={describedBy} className="sr-only">
        Interactive 3D preview of a {productName} in {props.material} board, colour {props.color}, {props.finish === "none" ? "no" : props.finish} finish, printed with {props.text ? `the text "${props.text}"` : "no text"}
        {props.logo ? " and the uploaded logo" : ""}. Drag to orbit.
      </p>
    </div>
  );
}

export default ProductScene;
