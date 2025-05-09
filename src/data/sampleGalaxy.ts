
import { GalaxyData } from '../types/galaxy';

export const sampleGalaxyData: GalaxyData = {
  nodes: [
    {
      id: 'node1',
      type: 'axiom',
      name: 'First Principles',
      description: 'Foundational truths that cannot be deduced from other propositions or assumptions.',
      position: [-5, 2, 0],
      connections: ['node2', 'node3']
    },
    {
      id: 'node2',
      type: 'concept',
      name: 'Emergence',
      description: 'Complex systems and patterns arising from relatively simple interactions.',
      position: [0, 0, 3],
      connections: ['node4']
    },
    {
      id: 'node3',
      type: 'thinker',
      name: 'Aristotle',
      description: 'Greek philosopher and polymath during the Classical period in Ancient Greece.',
      position: [5, -2, -3],
      connections: ['node4', 'node5']
    },
    {
      id: 'node4',
      type: 'synthesis',
      name: 'Systems Thinking',
      description: 'Holistic approach to analysis that focuses on the way a system\'s constituent parts interrelate.',
      position: [4, 3, 2],
      connections: []
    },
    {
      id: 'node5',
      type: 'concept',
      name: 'Causality',
      description: 'Relationship between cause and effect, where the effect is understood as a consequence of the cause.',
      position: [-3, -4, 1],
      connections: ['node2']
    },
  ],
  connections: [
    { source: 'node1', target: 'node2', strength: 0.8 },
    { source: 'node1', target: 'node3', strength: 0.6 },
    { source: 'node2', target: 'node4', strength: 0.9 },
    { source: 'node3', target: 'node4', strength: 0.7 },
    { source: 'node3', target: 'node5', strength: 0.5 },
    { source: 'node5', target: 'node2', strength: 0.4 },
  ]
};
