import React, { useEffect, useRef, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { generateLinks } from './utils/generateLinks';
import Sidebar from './components/Sidebar';
import NodeForm from './components/NodeForm';

const App = () => {
  const fgRef = useRef();
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        data.links = generateLinks(data.nodes); // auto-generate links
        setGraphData(data);
      });
  }, []);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    const dist = 60;
    const distRatio = 1 + dist / Math.hypot(node.x, node.y, node.z);
    fgRef.current.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
      node,
      3000
    );
  };

  return (
    <>
      <h1 class="fixed inset-0 flex items-center justify-center text-3xl font-bold text-white z-50">
        SYDE WEBRING
        </h1>
      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        nodeAutoColorBy="year"
        nodeLabel="fullName"
        onNodeClick={handleNodeClick}
      />
      {selectedNode && <Sidebar node={selectedNode} />}
      <NodeForm onNewNode={(newNode) => {
        const updatedNodes = [...graphData.nodes, newNode];
        const updatedLinks = generateLinks(updatedNodes);
        setGraphData({ nodes: updatedNodes, links: updatedLinks });
      }} 
      />
    </>
  );
};

export default App;
