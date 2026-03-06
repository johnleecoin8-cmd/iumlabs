import '@react-three/fiber';

declare module '@react-three/fiber' {
  interface ThreeElements {
    lineBasicMaterial: any;
    meshBasicMaterial: any;
    meshStandardMaterial: any;
    meshPhongMaterial: any;
    meshPhysicalMaterial: any;
    pointsMaterial: any;
    bufferAttribute: any;
  }
}

declare module '@react-three/drei' {
  export interface MeshDistortMaterialProps {
    color?: string;
    emissive?: string;
    emissiveIntensity?: number;
    distort?: number;
    speed?: number;
    roughness?: number;
    metalness?: number;
    transparent?: boolean;
    opacity?: number;
    side?: any;
    [key: string]: any;
  }
}
