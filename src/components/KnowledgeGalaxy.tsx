
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { GalaxyData, GalaxyNode } from '../types/galaxy';
import KnowledgeNode from './KnowledgeNode';
import KnowledgeEdge from './KnowledgeEdge';
import NodeInfoPanel from './NodeInfoPanel';
import ControlsPanel from './ControlsPanel';
import * as THREE from 'three';

interface KnowledgeGalaxyProps {
  data: GalaxyData;
}

const KnowledgeGalaxy: React.FC<KnowledgeGalaxyProps> = ({ data }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  const selectedNode = selectedNodeId ? 
    data.nodes.find(node => node.id === selectedNodeId) || null : null;
  
  const handleNodeClick = (id: string) => {
    setSelectedNodeId(prevId => prevId === id ? null : id);
  };
  
  const handleCreateNode = () => {
    console.log('Create node functionality will be implemented in the next iteration');
  };

  return (
    <div className="knowledge-galaxy">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        {/* Ambient lighting */}
        <ambientLight intensity={0.2} />
        
        {/* Soft directional lights */}
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.2} color="#6366f1" />
        
        {/* Background stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Subtle fog for depth */}
        <fog attach="fog" args={['#030303', 15, 50]} />
        
        {/* Connections/Edges first (so they render behind nodes) */}
        {data.connections.map((connection) => {
          const sourceNode = data.nodes.find(n => n.id === connection.source);
          const targetNode = data.nodes.find(n => n.id === connection.target);
          
          if (sourceNode && targetNode) {
            return (
              <KnowledgeEdge 
                key={`${connection.source}-${connection.target}`}
                start={sourceNode.position}
                end={targetNode.position}
                strength={connection.strength}
                sourceType={sourceNode.type}
                targetType={targetNode.type}
              />
            );
          }
          return null;
        })}
        
        {/* Knowledge Nodes */}
        {data.nodes.map((node) => (
          <KnowledgeNode 
            key={node.id}
            id={node.id}
            position={node.position}
            type={node.type}
            name={node.name}
            isSelected={node.id === selectedNodeId}
            onClick={handleNodeClick}
          />
        ))}
        
        {/* Camera Controls */}
        <OrbitControls 
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
          minDistance={3}
          maxDistance={30}
        />
      </Canvas>
      
      {/* UI Elements */}
      {selectedNode && (
        <NodeInfoPanel 
          node={selectedNode} 
          onClose={() => setSelectedNodeId(null)} 
        />
      )}
      
      <ControlsPanel onCreateNode={handleCreateNode} />
    </div>
  );
};

export default KnowledgeGalaxy;
