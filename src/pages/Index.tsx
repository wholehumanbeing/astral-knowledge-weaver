
import { useState } from 'react';
import KnowledgeGalaxy from '../components/KnowledgeGalaxy';
import { sampleGalaxyData } from '../data/sampleGalaxy';

const Index = () => {
  const [galaxyData] = useState(sampleGalaxyData);

  return (
    <div className="min-h-screen">
      <KnowledgeGalaxy data={galaxyData} />
    </div>
  );
};

export default Index;
