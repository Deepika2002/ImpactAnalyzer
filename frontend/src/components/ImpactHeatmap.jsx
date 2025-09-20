import React from 'react';

const ImpactHeatmap = ({ data }) => {
  if (!data || !data.components) return <div>No data available</div>;

  const { components } = data;
  
  const getSeverityColor = (severity, opacity = 1) => {
    const colors = {
      critical: `rgba(239, 68, 68, ${opacity})`,
      high: `rgba(245, 158, 11, ${opacity})`,
      medium: `rgba(234, 179, 8, ${opacity})`,
      low: `rgba(34, 197, 94, ${opacity})`
    };
    return colors[severity] || `rgba(107, 114, 128, ${opacity})`;
  };

  const getIntensity = (impact) => {
    return Math.max(0.3, Math.min(1, impact / 100));
  };

  return (
    <div className="w-full space-y-4">
      {/* Heatmap Grid */}
      <div className="grid grid-cols-3 gap-3 p-4 bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg">
        {components.map((component, index) => {
          const intensity = getIntensity(component.impact);
          return (
            <div
              key={component.id}
              className="relative group cursor-pointer transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: getSeverityColor(component.severity, intensity),
                minHeight: '80px',
                borderRadius: '8px',
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <div className="p-3 h-full flex flex-col justify-between">
                <div className="text-xs font-medium text-white bg-black bg-opacity-30 px-2 py-1 rounded">
                  {component.severity.toUpperCase()}
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white drop-shadow-md">
                    {component.impact}%
                  </div>
                  <div className="text-xs text-white bg-black bg-opacity-30 px-2 py-1 rounded mt-1">
                    {component.name}
                  </div>
                </div>
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap">
                <div className="font-medium">{component.name}</div>
                <div>Impact: {component.impact}%</div>
                <div>Files: {component.files}</div>
                <div>Lines: {component.lines}</div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: getSeverityColor('critical') }}></div>
          <span className="text-gray-600">Critical</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: getSeverityColor('high') }}></div>
          <span className="text-gray-600">High</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: getSeverityColor('medium') }}></div>
          <span className="text-gray-600">Medium</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: getSeverityColor('low') }}></div>
          <span className="text-gray-600">Low</span>
        </div>
      </div>

      {/* Impact Scale */}
      <div className="bg-white p-3 rounded-lg border">
        <div className="text-sm font-medium text-gray-700 mb-2">Impact Scale</div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">0%</span>
          <div className="flex-1 h-2 bg-gradient-to-r from-green-200 via-yellow-300 via-orange-400 to-red-500 rounded-full"></div>
          <span className="text-xs text-gray-500">100%</span>
        </div>
      </div>
    </div>
  );
};

export default ImpactHeatmap;