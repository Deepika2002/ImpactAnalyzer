import React from 'react';
import { Plus, Minus, FileText, Zap } from 'lucide-react';

const CodeChangeChart = ({ data }) => {
  if (!data || !Array.isArray(data)) return <div>No data available</div>;

  const maxValue = Math.max(...data.map(item => Math.max(item.added, item.deleted)));

  const getTypeColor = (type) => {
    switch (type) {
      case 'new': return 'bg-green-500';
      case 'modified': return 'bg-blue-500';
      case 'deleted': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getComplexityColor = (complexity) => {
    if (complexity >= 80) return 'text-red-600';
    if (complexity >= 60) return 'text-orange-600';
    if (complexity >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-4">
      {/* Chart */}
      <div className="space-y-3">
        {data.map((item, index) => {
          const addedWidth = (item.added / maxValue) * 100;
          const deletedWidth = (item.deleted / maxValue) * 100;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getTypeColor(item.type)}`}></div>
                  <span className="text-sm font-medium text-gray-700 truncate max-w-[200px]" title={item.file}>
                    {item.file.split('/').pop()}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <div className={`flex items-center space-x-1 ${getComplexityColor(item.complexity)}`}>
                    <Zap className="h-3 w-3" />
                    <span>{item.complexity}</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                {/* Added lines bar */}
                <div className="flex items-center space-x-2 mb-1">
                  <Plus className="h-3 w-3 text-green-600" />
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                      style={{ width: `${addedWidth}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-green-600 font-medium w-8 text-right">{item.added}</span>
                </div>
                
                {/* Deleted lines bar */}
                <div className="flex items-center space-x-2">
                  <Minus className="h-3 w-3 text-red-600" />
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-500"
                      style={{ width: `${deletedWidth}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-red-600 font-medium w-8 text-right">{item.deleted}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="border-t pt-3 mt-4">
        <div className="flex justify-between items-center text-xs">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">New</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Modified</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Deleted</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <Zap className="h-3 w-3" />
            <span>Complexity</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeChangeChart;