
import React from 'react';
import { GalaxyNode } from '../types/galaxy';
import { X } from 'lucide-react';

interface NodeInfoPanelProps {
  node: GalaxyNode | null;
  onClose: () => void;
}

const getTypeIcon = (type: string): string => {
  switch (type) {
    case 'axiom': return '🔰';
    case 'concept': return '💡';
    case 'thinker': return '🧠';
    case 'synthesis': return '✨';
    default: return '•';
  }
};

const NodeInfoPanel: React.FC<NodeInfoPanelProps> = ({ node, onClose }) => {
  if (!node) return null;
  
  return (
    <div className="node-info-panel animate-fade-in">
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm text-gray-400 uppercase tracking-wider">
          {node.type}
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
      
      <h3 className="text-xl font-medium mb-2 flex items-center gap-2">
        <span>{getTypeIcon(node.type)}</span>
        {node.name}
      </h3>
      
      <p className="text-gray-300 text-sm mb-4">
        {node.description}
      </p>
      
      <div className="flex gap-2">
        <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-xs">
          Explore
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-xs">
          Edit
        </button>
      </div>
    </div>
  );
};

export default NodeInfoPanel;
