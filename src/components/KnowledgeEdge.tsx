
import { useRef, useMemo } from 'react';
import { CatmullRomCurve3, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface KnowledgeEdgeProps {
  start: [number, number, number];
  end: [number, number, number];
  strength: number;
  sourceType: string;
  targetType: string;
}

const getEdgeColor = (sourceType: string, targetType: string): string => {
  // Blend source and target colors
  switch (`${sourceType}-${targetType}`) {
    case 'axiom-concept': return '#DBC7DF';
    case 'concept-axiom': return '#DBC7DF';
    case 'axiom-thinker': return '#8A95A9';
    case 'thinker-axiom': return '#8A95A9';
    case 'concept-thinker': return '#847FBF';
    case 'thinker-concept': return '#847FBF';
    case 'thinker-synthesis': return '#3F7FAA';
    case 'concept-synthesis': return '#8DB4C1';
    case 'axiom-synthesis': return '#95BFB8';
    default: return '#777777';
  }
};

const KnowledgeEdge: React.FC<KnowledgeEdgeProps> = ({ 
  start, 
  end, 
  strength, 
  sourceType, 
  targetType 
}) => {
  const lineRef = useRef<THREE.Mesh>(null);
  const arrowRef = useRef<THREE.Mesh>(null);
  
  // Create a curved path between nodes
  const curve = useMemo(() => {
    const startVec = new Vector3(start[0], start[1], start[2]);
    const endVec = new Vector3(end[0], end[1], end[2]);
    
    // Find middle point with slight offset for curve
    const midPoint = new Vector3().lerpVectors(startVec, endVec, 0.5);
    midPoint.y += 0.8; // Add some curvature

    return new CatmullRomCurve3([
      startVec,
      midPoint,
      endVec
    ]);
  }, [start, end]);
  
  const points = useMemo(() => curve.getPoints(50), [curve]);
  const color = getEdgeColor(sourceType, targetType);
  const thickness = 0.03 + (strength * 0.07); // Adjust thickness based on strength

  // Animate arrow along path
  useFrame(({ clock }) => {
    if (arrowRef.current) {
      const time = clock.getElapsedTime() * 0.2 % 1; // Loop from 0 to 1
      const position = curve.getPointAt(time);
      arrowRef.current.position.copy(position);
      
      // Calculate tangent for arrow direction
      const tangent = curve.getTangentAt(time);
      arrowRef.current.lookAt(
        position.x + tangent.x,
        position.y + tangent.y, 
        position.z + tangent.z
      );
    }
  });

  return (
    <group>
      {/* Edge tube */}
      <mesh>
        <tubeGeometry args={[curve, 50, thickness, 8, false]} />
        <meshStandardMaterial 
          color={color} 
          transparent={true} 
          opacity={0.4 + (strength * 0.3)}
          emissive={color} 
          emissiveIntensity={0.2} 
        />
      </mesh>
      
      {/* Arrow indicator */}
      <mesh ref={arrowRef} scale={[0.1, 0.1, 0.1]}>
        <coneGeometry args={[1, 3, 8]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.5} 
        />
      </mesh>
    </group>
  );
};

export default KnowledgeEdge;
