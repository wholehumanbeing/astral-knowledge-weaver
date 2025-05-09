
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { NodeType } from '../types/galaxy';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface KnowledgeNodeProps {
  position: [number, number, number];
  type: NodeType;
  name: string;
  id: string;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const getNodeColor = (type: NodeType): string => {
  switch (type) {
    case 'axiom': return '#E6D2A8';
    case 'concept': return '#D6BCFA';
    case 'thinker': return '#345995';
    case 'synthesis': return '#44ADB9';
    default: return '#ffffff';
  }
};

const KnowledgeNode: React.FC<KnowledgeNodeProps> = ({ 
  position, 
  type, 
  name, 
  id, 
  isSelected, 
  onClick 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Subtle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.0005;
    }
  });

  return (
    <group position={position}>
      {/* Main sphere */}
      <mesh 
        ref={meshRef}
        onClick={() => onClick(id)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial 
          color={getNodeColor(type)} 
          roughness={0.7} 
          metalness={0.3} 
          emissive={getNodeColor(type)} 
          emissiveIntensity={hovered ? 0.4 : 0.2} 
        />
      </mesh>
      
      {/* Selection indicator ring */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.9, 0.05, 16, 100]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff" 
            emissiveIntensity={0.8} 
            transparent={true} 
            opacity={0.7} 
          />
        </mesh>
      )}

      {/* Node label */}
      <Html
        position={[0, 0.9, 0]}
        center
        distanceFactor={15}
        occlude
      >
        <div className={`bg-black bg-opacity-50 px-2 py-1 rounded text-xs whitespace-nowrap ${hovered ? 'text-white' : 'text-gray-300'}`}>
          {name}
        </div>
      </Html>
    </group>
  );
};

export default KnowledgeNode;
