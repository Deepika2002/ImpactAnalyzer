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
  Layers,
  Sparkles,
  Code2
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-indigo-50 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-400/10 to-red-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Code-themed floating elements */}
        <div className="absolute top-20 left-20 text-indigo-400/30 animate-bounce delay-300">
          <Code2 className="h-6 w-6" />
        </div>
        <div className="absolute top-40 right-40 text-purple-400/30 animate-bounce delay-700">
          <GitCommit className="h-5 w-5" />
        </div>
        <div className="absolute bottom-40 left-1/3 text-emerald-400/30 animate-bounce delay-1000">
          <TestTube className="h-4 w-4" />
        </div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Enhanced Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-purple-600 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-800 bg-clip-text text-transparent tracking-tight">
                Development Analytics
              </h1>
              <div className="relative">
                <Zap className="h-8 w-8 text-yellow-500 animate-pulse delay-500" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-ping delay-300"></div>
              </div>
            </div>
            <p className="text-xl text-gray-600 font-medium">
              Impact analysis, code changes, and test execution insights
            </p>
          </div>

          {/* Impact Map Section - Enhanced */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Target className="h-7 w-7 text-red-600" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Impact Map with Severity Score
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 border-0 shadow-lg bg-white/90 backdrop-blur-sm group">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-700 flex items-center gap-2 group-hover:text-purple-700 transition-colors">
                    <BarChart3 className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                    Impact Heatmap
                  </CardTitle>
                  <CardDescription>Component impact visualization by severity</CardDescription>
                </CardHeader>
                <CardContent>
                  <ImpactHeatmap data={devStats.impactMap} />
                </CardContent>
              </Card>

              <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-500 border-0 shadow-lg bg-white/90 backdrop-blur-sm group">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-semibold text-gray-700 flex items-center gap-2 group-hover:text-indigo-700 transition-colors">
                    <Layers className="h-6 w-6 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
                    Components
                  </CardTitle>
                  <CardDescription>Impact severity breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {devStats.impactMap.components.map((component) => (
                      <div key={component.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getSeverityColor(component.severity)} animate-pulse`} />
                          <div>
                            <div className="font-medium text-sm text-gray-700">{component.name}</div>
                            <div className="text-xs text-gray-500">{component.files} files, {component.lines} lines</div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="font-bold hover:scale-110 transition-transform duration-200">
                          {component.impact}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator className="my-8 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          {/* Code Changes Section - Enhanced */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <GitCommit className="h-7 w-7 text-green-600" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Code Change Details
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-500 border-0 shadow-lg bg-white/90 backdrop-blur-sm group">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-700 flex items-center gap-2 group-hover:text-green-700 transition-colors">
                    <FileText className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                    Change Summary
                  </CardTitle>
                  <CardDescription>Overview of code modifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group-hover:scale-105 duration-300">
                      <div className="text-2xl font-bold text-green-600">{devStats.codeChanges.summary.totalFiles}</div>
                      <div className="text-sm text-gray-600">Files Modified</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group-hover:scale-105 duration-300">
                      <div className="text-2xl font-bold text-blue-600">+{devStats.codeChanges.summary.linesAdded}</div>
                      <div className="text-sm text-gray-600">Lines Added</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group-hover:scale-105 duration-300">
                      <div className="text-2xl font-bold text-red-600">-{devStats.codeChanges.summary.linesDeleted}</div>
                      <div className="text-sm text-gray-600">Lines Deleted</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group-hover:scale-105 duration-300">
                      <div className="text-2xl font-bold text-purple-600">{devStats.codeChanges.summary.complexity}</div>
                      <div className="text-sm text-gray-600">Complexity Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-500 border-0 shadow-lg bg-white/90 backdrop-blur-sm group">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-700 group-hover:text-indigo-700 transition-colors">
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

          <Separator className="my-8 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          {/* Test Flows Section - Enhanced */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <TestTube className="h-7 w-7 text-blue-600" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Test Flows
              </h2>
            </div>
            
            <TestFlowRunner 
              testFlows={devStats.testFlows}
              onRunTest={setSelectedTestFlow}
              runningTests={runningTests}
              setRunningTests={setRunningTests}
            />
          </div>

          <Separator className="my-8 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          {/* Coverage Impact Section - Enhanced */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Activity className="h-7 w-7 text-purple-600" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Code Coverage Impact
              </h2>
            </div>
            
            <CoverageImpactChart data={devStats.coverageImpact} />
          </div>

          {/* Pulse Effect for Bottom */}
          <div className="flex justify-center pt-8">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevPage;