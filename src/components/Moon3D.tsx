import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Moon Sphere with crater-like texture
const MoonSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.y += 0.002;
    }
  });

  // Create crater-like bump map procedurally
  const bumpTexture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    
    // Base gray
    ctx.fillStyle = '#666666';
    ctx.fillRect(0, 0, size, size);
    
    // Add craters
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const radius = Math.random() * 30 + 5;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, '#333333');
      gradient.addColorStop(0.7, '#555555');
      gradient.addColorStop(1, '#666666');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={2.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#4040ff"
        metalness={0.1}
        roughness={0.8}
        bumpMap={bumpTexture}
        bumpScale={0.05}
      />
    </mesh>
  );
};

interface Moon3DProps {
  className?: string;
}

const Moon3D = ({ className = '' }: Moon3DProps) => {
  return (
    <div className={`pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} />
        <directionalLight position={[-3, -2, -3]} intensity={0.3} color="#0066ff" />
        <MoonSphere />
      </Canvas>
    </div>
  );
};

export default Moon3D;
