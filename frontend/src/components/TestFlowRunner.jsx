import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Play, 
  Square, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Loader2,
  AlertCircle,
  BarChart3
} from 'lucide-react';

const TestFlowRunner = ({ testFlows, onRunTest, runningTests, setRunningTests }) => {
  const [testResults, setTestResults] = useState({});

  const getStatusIcon = (status, isRunning) => {
    if (isRunning) return <Loader2 className="h-4 w-4 animate-spin" />;
    
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'running': return <Loader2 className="h-4 w-4 animate-spin text-blue-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status, isRunning) => {
    if (isRunning) return 'text-blue-600 bg-blue-50';
    
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'running': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const runTest = async (testFlow) => {
    onRunTest(testFlow);
    setRunningTests(prev => new Set([...prev, testFlow.id]));
    
    // Simulate test execution
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate
      const newResult = {
        status: success ? 'completed' : 'failed',
        duration: `${(Math.random() * 5 + 1).toFixed(1)}s`,
        coverage: success ? Math.min(100, testFlow.coverage + Math.random() * 10) : testFlow.coverage - Math.random() * 20,
        timestamp: new Date().toISOString()
      };
      
      setTestResults(prev => ({
        ...prev,
        [testFlow.id]: newResult
      }));
      
      setRunningTests(prev => {
        const newSet = new Set(prev);
        newSet.delete(testFlow.id);
        return newSet;
      });
    }, Math.random() * 3000 + 2000); // 2-5 seconds
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {testFlows.map((testFlow) => {
        const isRunning = runningTests.has(testFlow.id);
        const result = testResults[testFlow.id];
        const currentStatus = result ? result.status : testFlow.status;
        const currentCoverage = result ? result.coverage : testFlow.coverage;
        const currentDuration = result ? result.duration : testFlow.duration;

        return (
          <Card key={testFlow.id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-medium text-gray-700 flex items-center gap-2">
                    {getStatusIcon(currentStatus, isRunning)}
                    {testFlow.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {testFlow.description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(testFlow.priority)}`}></div>
                  <Badge variant="outline" className="text-xs">
                    {testFlow.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Status and Metrics */}
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-500">Status</div>
                  <Badge className={`${getStatusColor(currentStatus, isRunning)} mt-1`}>
                    {isRunning ? 'Running' : currentStatus}
                  </Badge>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-500">Duration</div>
                  <div className="font-bold text-gray-700 mt-1">{currentDuration}</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-500">Steps</div>
                  <div className="font-bold text-gray-700 mt-1">{testFlow.steps}</div>
                </div>
              </div>

              {/* Coverage Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    Test Coverage
                  </span>
                  <span className="font-medium text-gray-700">
                    {currentCoverage.toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={currentCoverage} 
                  className="h-2"
                />
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Button
                  onClick={() => runTest(testFlow)}
                  disabled={isRunning}
                  className="w-full"
                  variant={currentStatus === 'failed' ? 'destructive' : 'default'}
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Running Test...
                    </>
                  ) : currentStatus === 'failed' ? (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Retry Test
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Run Test
                    </>
                  )}
                </Button>
              </div>

              {/* Result Timestamp */}
              {result && (
                <div className="text-xs text-gray-500 pt-2 border-t">
                  Last run: {new Date(result.timestamp).toLocaleString()}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TestFlowRunner;