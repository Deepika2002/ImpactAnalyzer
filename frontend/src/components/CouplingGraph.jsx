import React, { useEffect, useRef } from 'react';

const CouplingGraph = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const svg = svgRef.current;
    const width = svg.clientWidth;
    const height = 300;

    // Clear previous content
    svg.innerHTML = '';

    const { nodes, edges } = data;

    // Simple force-directed layout simulation
    const nodePositions = {};
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.3;

    // Position nodes in a circle
    nodes.forEach((node, index) => {
      const angle = (index / nodes.length) * 2 * Math.PI;
      nodePositions[node.id] = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        ...node
      };
    });

    // Create SVG elements
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    svg.appendChild(svgElement);

    // Draw edges
    edges.forEach(edge => {
      const source = nodePositions[edge.source];
      const target = nodePositions[edge.target];
      
      if (source && target) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', source.x);
        line.setAttribute('y1', source.y);
        line.setAttribute('x2', target.x);
        line.setAttribute('y2', target.y);
        line.setAttribute('stroke', '#e2e8f0');
        line.setAttribute('stroke-width', Math.max(1, edge.strength * 3));
        line.setAttribute('opacity', edge.strength);
        svgElement.appendChild(line);
      }
    });

    // Draw nodes
    Object.values(nodePositions).forEach(node => {
      // Node circle
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', node.x);
      circle.setAttribute('cy', node.y);
      circle.setAttribute('r', Math.max(8, node.size * 0.8));
      circle.setAttribute('fill', '#6366f1');
      circle.setAttribute('stroke', '#4f46e5');
      circle.setAttribute('stroke-width', '2');
      circle.setAttribute('class', 'transition-all duration-300 hover:scale-110 cursor-pointer');
      svgElement.appendChild(circle);

      // Node label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', node.x);
      text.setAttribute('y', node.y + node.size * 0.8 + 15);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('class', 'text-xs fill-gray-600 font-medium');
      text.textContent = node.label;
      svgElement.appendChild(text);

      // Connection count badge
      const badge = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      badge.setAttribute('cx', node.x + node.size * 0.6);
      badge.setAttribute('cy', node.y - node.size * 0.6);
      badge.setAttribute('r', 8);
      badge.setAttribute('fill', '#f59e0b');
      badge.setAttribute('stroke', '#ffffff');
      badge.setAttribute('stroke-width', '2');
      svgElement.appendChild(badge);

      const badgeText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      badgeText.setAttribute('x', node.x + node.size * 0.6);
      badgeText.setAttribute('y', node.y - node.size * 0.6 + 1);
      badgeText.setAttribute('text-anchor', 'middle');
      badgeText.setAttribute('class', 'text-xs fill-white font-bold');
      badgeText.textContent = node.connections;
      svgElement.appendChild(badgeText);
    });

  }, [data]);

  return (
    <div className="w-full h-80 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4">
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox={`0 0 ${svgRef.current?.clientWidth || 400} 300`}
        preserveAspectRatio="xMidYMid meet"
      >
      </svg>
      <div className="flex justify-center mt-2 space-x-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
          <span>Components</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
          <span>Connections</span>
        </div>
      </div>
    </div>
  );
};

export default CouplingGraph;