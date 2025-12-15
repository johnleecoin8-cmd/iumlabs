import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

// Silver Spheres Component
const SilverSpheres = () => {
  const leftRef = useRef<THREE.Mesh>(null);
  const rightRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (leftRef.current) {
      leftRef.current.position.y = Math.sin(time * 0.8) * 0.2;
      leftRef.current.rotation.y += 0.005;
    }
    
    if (rightRef.current) {
      rightRef.current.position.y = Math.sin(time * 0.8 + Math.PI) * 0.2;
      rightRef.current.rotation.y -= 0.005;
    }
  });

  return (
    <group>
      {/* Left Silver Sphere */}
      <mesh ref={leftRef} position={[-1.5, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#C0C0C0"
          metalness={1}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      {/* Right Silver Sphere */}
      <mesh ref={rightRef} position={[1.5, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#C0C0C0"
          metalness={1}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>
    </group>
  );
};

interface Bridge3DProps {
  className?: string;
}

const Bridge3D = ({ className = '' }: Bridge3DProps) => {
  return (
    <div className={`pointer-events-none ${className}`} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} />
        <pointLight position={[0, 0, 5]} intensity={1} />
        <SilverSpheres />
      </Canvas>
    </div>
  );
};

export default Bridge3D;
