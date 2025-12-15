import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Large Realistic Moon/Planet Sphere
const MoonSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Create procedural bump/crater texture
  const bumpTexture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    
    // Base gray
    ctx.fillStyle = '#8090A0';
    ctx.fillRect(0, 0, size, size);
    
    // Add craters
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const radius = Math.random() * 30 + 5;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, 'rgba(60, 80, 100, 0.8)');
      gradient.addColorStop(0.7, 'rgba(90, 110, 130, 0.5)');
      gradient.addColorStop(1, 'rgba(128, 144, 160, 0)');
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    // Add smaller details
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const radius = Math.random() * 8 + 2;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${70 + Math.random() * 40}, ${90 + Math.random() * 40}, ${110 + Math.random() * 40}, 0.6)`;
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={[2.5, 0, 0]} scale={[3.5, 3.5, 3.5]}>
      <sphereGeometry args={[1, 128, 128]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#7090C0"
        metalness={0.1}
        roughness={0.8}
        map={bumpTexture}
        bumpMap={bumpTexture}
        bumpScale={0.02}
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
        {/* Key light - main illumination from top-left */}
        <directionalLight 
          position={[-5, 5, 5]} 
          intensity={2} 
          color="#ffffff"
        />
        
        {/* Fill light - softer from opposite side */}
        <directionalLight 
          position={[5, -2, 3]} 
          intensity={0.3} 
          color="#4060ff"
        />
        
        {/* Ambient for overall visibility */}
        <ambientLight intensity={0.2} />
        
        {/* Rim light for edge definition */}
        <pointLight position={[5, 0, -5]} intensity={0.5} color="#6080ff" />
        
        <MoonSphere />
      </Canvas>
    </div>
  );
};

export default Bridge3D;