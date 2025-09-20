import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Users,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  BarChart3
} from 'lucide-react';

const DeveloperRegressionChart = ({ developerData, trends }) => {
  const totalDevelopers = Object.keys(developerData).length;
  const totalTests = Object.values(developerData).reduce((sum, dev) => sum + dev.total, 0);
  const totalPassed = Object.values(developerData).reduce((sum, dev) => sum + dev.passed, 0);
  const totalFailed = Object.values(developerData).reduce((sum, dev) => sum + dev.failed, 0);

  const getSuccessRate = (passed, total) => {
    return total > 0 ? ((passed / total) * 100).toFixed(1) : 0;
  };

  const getPerformanceColor = (rate) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceIcon = (rate) => {
    if (rate >= 90) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (rate >= 70) return <TrendingUp className="h-4 w-4 text-yellow-600" />;
    return <XCircle className="h-4 w-4 text-red-600" />;
  };

  const getTrendPath = (trends) => {
    if (!trends || trends.length === 0) return '';
    
    const width = 200;
    const height = 60;
    const maxValue = Math.max(...trends.map(t => t.passed + t.failed));
    const minValue = Math.min(...trends.map(t => t.passed + t.failed));
    const range = maxValue - minValue || 1;
    
    const passedPoints = trends.map((trend, index) => {
      const x = (index / (trends.length - 1)) * width;
      const y = height - ((trend.passed - Math.min(...trends.map(t => t.passed))) / 
        (Math.max(...trends.map(t => t.passed)) - Math.min(...trends.map(t => t.passed)) || 1)) * height;
      return `${x},${y}`;
    });
    
    const failedPoints = trends.map((trend, index) => {
      const x = (index / (trends.length - 1)) * width;
      const y = height - ((trend.failed - Math.min(...trends.map(t => t.failed))) / 
        (Math.max(...trends.map(t => t.failed)) - Math.min(...trends.map(t => t.failed)) || 1)) * height;
      return `${x},${y}`;
    });
    
    return {
      passed: `M ${passedPoints.join(' L ')}`,
      failed: `M ${failedPoints.join(' L ')}`
    };
  };

  const trendPaths = getTrendPath(trends);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-6 w-6 text-indigo-600" />
        <h2 className="text-2xl font-semibold text-gray-800">Developer Regression Analysis</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Stats */}
        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium text-gray-700 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
              Overall Performance
            </CardTitle>
            <CardDescription>Team regression testing results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{totalPassed}</div>
                <div className="text-sm text-gray-600">Passed</div>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{totalFailed}</div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-medium text-gray-700">
                  {getSuccessRate(totalPassed, totalTests)}%
                </span>
              </div>
              <Progress value={getSuccessRate(totalPassed, totalTests)} className="h-2" />
            </div>

            <div className="text-center pt-2">
              <div className="text-sm text-gray-600">
                {totalDevelopers} developers, {totalTests} total tests
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Trends */}
        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium text-gray-700 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Test Trends
            </CardTitle>
            <CardDescription>7-day testing trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg">
              <svg width="100%" height="80" viewBox="0 0 200 60" className="overflow-visible">
                <defs>
                  <linearGradient id="passedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981"/>
                    <stop offset="100%" stopColor="#059669"/>
                  </linearGradient>
                  <linearGradient id="failedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444"/>
                    <stop offset="100%" stopColor="#dc2626"/>
                  </linearGradient>
                </defs>
                
                {trendPaths.passed && (
                  <path
                    d={trendPaths.passed}
                    stroke="url(#passedGradient)"
                    strokeWidth="2"
                    fill="none"
                    className="drop-shadow-sm"
                  />
                )}
                
                {trendPaths.failed && (
                  <path
                    d={trendPaths.failed}
                    stroke="url(#failedGradient)"
                    strokeWidth="2"
                    fill="none"
                    className="drop-shadow-sm"
                  />
                )}
                
                {trends.map((trend, index) => (
                  <g key={index}>
                    <circle
                      cx={(index / (trends.length - 1)) * 200}
                      cy={60 - ((trend.passed - Math.min(...trends.map(t => t.passed))) / 
                        (Math.max(...trends.map(t => t.passed)) - Math.min(...trends.map(t => t.passed)) || 1)) * 60}
                      r="3"
                      fill="#10b981"
                      className="drop-shadow-sm"
                    />
                    <circle
                      cx={(index / (trends.length - 1)) * 200}
                      cy={60 - ((trend.failed - Math.min(...trends.map(t => t.failed))) / 
                        (Math.max(...trends.map(t => t.failed)) - Math.min(...trends.map(t => t.failed)) || 1)) * 60}
                      r="3"
                      fill="#ef4444"
                      className="drop-shadow-sm"
                    />
                  </g>
                ))}
              </svg>
              
              <div className="flex justify-center space-x-6 mt-3 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Passed</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">Failed</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Developer Performance */}
        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium text-gray-700 flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-600" />
              Top Performers
            </CardTitle>
            <CardDescription>Highest success rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(developerData)
                .sort((a, b) => getSuccessRate(b[1].passed, b[1].total) - getSuccessRate(a[1].passed, a[1].total))
                .slice(0, 5)
                .map(([name, data]) => {
                  const successRate = getSuccessRate(data.passed, data.total);
                  return (
                    <div key={name} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        {getPerformanceIcon(successRate)}
                        <span className="text-sm font-medium text-gray-700">{name}</span>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${getPerformanceColor(successRate)}`}>
                          {successRate}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {data.passed}/{data.total}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Developer Breakdown */}
      <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-gray-700">Developer Regression Breakdown</CardTitle>
          <CardDescription>Individual performance metrics for all team members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(developerData).map(([name, data]) => {
              const successRate = getSuccessRate(data.passed, data.total);
              return (
                <div key={name} className="p-4 border rounded-lg bg-gradient-to-br from-gray-50 to-white">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-700">{name}</h4>
                    {getPerformanceIcon(successRate)}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Success Rate</span>
                      <span className={`font-medium ${getPerformanceColor(successRate)}`}>
                        {successRate}%
                      </span>
                    </div>
                    <Progress value={successRate} className="h-2" />
                    
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Passed: {data.passed}</span>
                      <span>Failed: {data.failed}</span>
                      <span>Total: {data.total}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeveloperRegressionChart;