import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  Activity, 
  AlertTriangle, 
  Play, 
  Zap,
  TrendingUp,
  TrendingDown,
  FileText,
  GitCommit,
  TestTube,
  Target,
  BarChart3,
  Layers
} from 'lucide-react';
import { mockData } from '../mock';
import ImpactHeatmap from './ImpactHeatmap';
import CodeChangeChart from './CodeChangeChart';
import TestFlowRunner from './TestFlowRunner';
import CoverageImpactChart from './CoverageImpactChart';

const DevPage = () => {
  const { devStats } = mockData;
  const [selectedTestFlow, setSelectedTestFlow] = useState(null);
  const [runningTests, setRunningTests] = useState(new Set());

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'running': return 'text-blue-600 bg-blue-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Development Analytics
          </h1>
          <p className="text-lg text-gray-600">
            Impact analysis, code changes, and test execution
          </p>
        </div>

        {/* Impact Map Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-red-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Impact Map with Severity Score</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-700 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  Impact Heatmap
                </CardTitle>
                <CardDescription>Component impact visualization by severity</CardDescription>
              </CardHeader>
              <CardContent>
                <ImpactHeatmap data={devStats.impactMap} />
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium text-gray-700 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-indigo-600" />
                  Components
                </CardTitle>
                <CardDescription>Impact severity breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {devStats.impactMap.components.map((component) => (
                    <div key={component.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getSeverityColor(component.severity)}`} />
                        <div>
                          <div className="font-medium text-sm text-gray-700">{component.name}</div>
                          <div className="text-xs text-gray-500">{component.files} files, {component.lines} lines</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="font-bold">
                        {component.impact}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Code Changes Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <GitCommit className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Code Change Details</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Change Summary
                </CardTitle>
                <CardDescription>Overview of code modifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{devStats.codeChanges.summary.totalFiles}</div>
                    <div className="text-sm text-gray-600">Files Modified</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">+{devStats.codeChanges.summary.linesAdded}</div>
                    <div className="text-sm text-gray-600">Lines Added</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">-{devStats.codeChanges.summary.linesDeleted}</div>
                    <div className="text-sm text-gray-600">Lines Deleted</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{devStats.codeChanges.summary.complexity}</div>
                    <div className="text-sm text-gray-600">Complexity Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-700">
                  File Changes Chart
                </CardTitle>
                <CardDescription>Visual breakdown of code changes</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeChangeChart data={devStats.codeChanges.fileChanges} />
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Test Flows Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <TestTube className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Test Flows</h2>
          </div>
          
          <TestFlowRunner 
            testFlows={devStats.testFlows}
            onRunTest={setSelectedTestFlow}
            runningTests={runningTests}
            setRunningTests={setRunningTests}
          />
        </div>

        <Separator />

        {/* Coverage Impact Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Code Coverage Impact</h2>
          </div>
          
          <CoverageImpactChart data={devStats.coverageImpact} />
        </div>
      </div>
    </div>
  );
};

export default DevPage;