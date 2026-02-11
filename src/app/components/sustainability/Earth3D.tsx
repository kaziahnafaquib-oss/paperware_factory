import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Earth = () => {
  const texture = useTexture('https://images.unsplash.com/photo-1614730341194-75c60740a087?auto=format&fit=crop&q=80&w=2000');
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005; // Very slow auto rotation
    }
  });

  return (
    <Sphere args={[2.8, 64, 64]} ref={meshRef}>
      <meshStandardMaterial map={texture} roughness={0.6} metalness={0.2} />
    </Sphere>
  );
};

const FallbackGlobe = () => {
  return (
    <mesh>
      <sphereGeometry args={[2.8, 32, 32]} />
      <meshStandardMaterial color="#2d5a27" wireframe />
    </mesh>
  );
}

export const Earth3D = () => {
  return (
    <div className="w-full h-full min-h-[300px] lg:min-h-[512px] relative z-10 cursor-move">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#ffffff" />
        <Suspense fallback={<FallbackGlobe />}>
          <Earth />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          rotateSpeed={0.5} 
          autoRotate={false}
          enableDamping={true}
        />
      </Canvas>
    </div>
  );
};
