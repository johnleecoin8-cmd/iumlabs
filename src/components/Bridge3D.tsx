import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// Chrome/Silver Sphere Component
const ChromeSphere = ({ position, scale }: { position: [number, number, number]; scale: number }) => {
  return (
    <mesh position={position} scale={[scale, scale, scale]}>
      <sphereGeometry args={[1, 128, 128]} />
      <meshStandardMaterial
        color="#E8E8E8"
        metalness={1}
        roughness={0.05}
        envMapIntensity={1.5}
      />
    </mesh>
  );
};

interface Bridge3DProps {
  className?: string;
}

const Bridge3D = ({ className = '' }: Bridge3DProps) => {
  return (
    <div className={`pointer-events-none ${className}`} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
      >
        {/* HDRI Environment for realistic reflections */}
        <Environment preset="studio" />
        
        {/* 3-point lighting system */}
        <spotLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <spotLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        <ambientLight intensity={0.4} />
        
        {/* Floating Chrome Sphere 1 - Left/Top */}
        <Float 
          speed={1.5} 
          rotationIntensity={0.3} 
          floatIntensity={0.6}
        >
          <ChromeSphere position={[-2, 1, 0]} scale={1.8} />
        </Float>
        
        {/* Floating Chrome Sphere 2 - Right/Bottom (larger) */}
        <Float 
          speed={2} 
          rotationIntensity={0.4} 
          floatIntensity={0.8}
        >
          <ChromeSphere position={[2.5, -0.5, 0]} scale={2.5} />
        </Float>
      </Canvas>
    </div>
  );
};

export default Bridge3D;
