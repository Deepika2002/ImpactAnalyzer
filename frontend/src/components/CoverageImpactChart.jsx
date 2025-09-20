import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { TrendingUp, TrendingDown, Minus, Activity, BarChart3 } from 'lucide-react';

const CoverageImpactChart = ({ data }) => {
  if (!data) return <div>No data available</div>;

  const { overall, byComponent, trends } = data;

  const getImpactIcon = (impact) => {
    const numericImpact = parseFloat(impact);
    if (numericImpact > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (numericImpact < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getImpactColor = (impact) => {
    const numericImpact = parseFloat(impact);
    if (numericImpact > 0) return 'text-green-600 bg-green-50';
    if (numericImpact < 0) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getTrendPath = (trends) => {
    if (!trends || trends.length === 0) return '';
    
    const width = 200;
    const height = 60;
    const maxValue = Math.max(...trends.map(t => t.coverage));
    const minValue = Math.min(...trends.map(t => t.coverage));
    const range = maxValue - minValue || 1;
    
    const points = trends.map((trend, index) => {
      const x = (index / (trends.length - 1)) * width;
      const y = height - ((trend.coverage - minValue) / range) * height;
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Overall Coverage */}
      <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium text-gray-700 flex items-center gap-2">
            <Activity className="h-5 w-5 text-purple-600" />
            Overall Coverage
          </CardTitle>
          <CardDescription>Current project coverage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-600 mb-4">
            {overall}%
          </div>
          <Progress value={overall} className="mb-4" />
          
          {/* Trend Chart */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-lg">
            <div className="text-sm font-medium text-gray-700 mb-2">7-Day Trend</div>
            <svg width="100%" height="60" viewBox="0 0 200 60" className="overflow-visible">
              <defs>
                <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6"/>
                  <stop offset="100%" stopColor="#6366f1"/>
                </linearGradient>
              </defs>
              <path
                d={getTrendPath(trends)}
                stroke="url(#trendGradient)"
                strokeWidth="2"
                fill="none"
                className="drop-shadow-sm"
              />
              {trends.map((trend, index) => (
                <circle
                  key={index}
                  cx={(index / (trends.length - 1)) * 200}
                  cy={60 - ((trend.coverage - Math.min(...trends.map(t => t.coverage))) / 
                    (Math.max(...trends.map(t => t.coverage)) - Math.min(...trends.map(t => t.coverage)) || 1)) * 60}
                  r="3"
                  fill="#8b5cf6"
                  className="drop-shadow-sm"
                />
              ))}
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Component Impact */}
      <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium text-gray-700 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-indigo-600" />
            Component Impact
          </CardTitle>
          <CardDescription>Coverage changes by component</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {byComponent.map((component, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {component.component.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700">{component.component}</div>
                    <div className="text-sm text-gray-500">
                      {component.before}% → {component.after}%
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-700">
                      {component.after}%
                    </div>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
                        style={{ width: `${component.after}%` }}
                      />
                    </div>
                  </div>
                  
                  <Badge className={`${getImpactColor(component.impact)} font-medium flex items-center gap-1`}>
                    {getImpactIcon(component.impact)}
                    {component.impact}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoverageImpactChart;