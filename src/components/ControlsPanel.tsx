
import React from 'react';

interface ControlsPanelProps {
  onCreateNode: () => void;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({ onCreateNode }) => {
  return (
    <div className="controls-panel">
      <div className="mb-3">
        <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-2">Navigation</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
          <div>Orbit</div>
          <div className="text-gray-500">Left drag</div>
          <div>Pan</div>
          <div className="text-gray-500">Right drag</div>
          <div>Zoom</div>
          <div className="text-gray-500">Scroll</div>
        </div>
      </div>
      
      <button 
        onClick={onCreateNode}
        className="bg-white bg-opacity-10 hover:bg-opacity-20 w-full px-3 py-1.5 rounded text-sm transition-colors"
      >
        Add Node
      </button>
    </div>
  );
};

export default ControlsPanel;
