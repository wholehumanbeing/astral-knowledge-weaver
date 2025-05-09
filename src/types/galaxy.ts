
export type NodeType = 'axiom' | 'concept' | 'thinker' | 'synthesis';

export interface GalaxyNode {
  id: string;
  type: NodeType;
  name: string;
  description: string;
  position: [number, number, number];
  connections: string[];
}

export interface Connection {
  source: string;
  target: string;
  strength: number;
}

export interface GalaxyData {
  nodes: GalaxyNode[];
  connections: Connection[];
}
