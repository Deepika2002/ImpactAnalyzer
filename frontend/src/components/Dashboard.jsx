import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  GitPullRequest, 
  TestTube, 
  Network, 
  TrendingUp,
  Calendar,
  Users,
  Activity,
  CheckCircle,
  Sparkles,
  Zap
} from 'lucide-react';
import { mockData } from '../mock';
import CouplingGraph from './CouplingGraph';

const Dashboard = () => {
  const { yesterdayStats, currentStats } = mockData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-indigo-50 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-gradient-to-br from-purple-300/15 to-pink-300/15 rounded-full blur-2xl animate-pulse delay-2000"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-40 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-1000"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Enhanced Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-indigo-600 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent tracking-tight">
                Impact Analysis Dashboard
              </h1>
              <div className="relative">
                <Zap className="h-8 w-8 text-yellow-500 animate-pulse delay-500" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-400 rounded-full animate-ping delay-300"></div>
              </div>
            </div>
            <p className="text-xl text-gray-600 font-medium">
              Comprehensive codebase insights and real-time metrics
            </p>
          </div>

          {/* Yesterday Statistics Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Calendar className="h-7 w-7 text-blue-600" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Yesterday's Statistics
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Total MRs Card - Enhanced */}
              <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-500 border-0 shadow-lg bg-white/90 backdrop-blur-sm group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
                      Merge Requests
                    </CardTitle>
                    <div className="relative">
                      <GitPullRequest className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600">Total MRs merged yesterday</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-4xl font-bold text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {yesterdayStats.totalMRs}
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-gray-600 mb-3">Recent MRs:</div>
                    {yesterdayStats.mrDetails.slice(0, 3).map((mr) => (
                      <div key={mr.id} className="flex items-center justify-between text-sm p-2 bg-white/60 rounded-lg hover:bg-white/80 transition-colors">
                        <span className="truncate pr-2 font-medium">{mr.title}</span>
                        <Badge variant="secondary" className="shrink-0 font-bold">
                          {mr.coverage}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Yesterday's Unit Test Coverage - Enhanced */}
              <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-500 border-0 shadow-lg bg-white/90 backdrop-blur-sm group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-gray-700 group-hover:text-orange-700 transition-colors">
                      Unit Test Coverage
                    </CardTitle>
                    <div className="relative">
                      <TestTube className="h-6 w-6 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600">Average coverage for yesterday's MRs</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-4xl font-bold text-orange-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {yesterdayStats.unitTestCoverage}%
                  </div>
                  <Progress value={yesterdayStats.unitTestCoverage} className="mb-6 h-3 group-hover:h-4 transition-all duration-300" />
                  <div className="flex items-center gap-3 text-sm">
                    <TrendingUp className="h-5 w-5 text-green-600 animate-bounce" />
                    <span className="text-green-600 font-semibold">+5.2% from previous day</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator className="my-8 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          {/* Current Statistics Section - Enhanced */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Activity className="h-7 w-7 text-green-600" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Current Project Statistics
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Coupling Graph - Enhanced */}
              <Card className="lg:col-span-2 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 border-0 shadow-lg bg-white/90 backdrop-blur-sm group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-gray-700 group-hover:text-purple-700 transition-colors">
                      Coupling Graph
                    </CardTitle>
                    <div className="relative">
                      <Network className="h-6 w-6 text-purple-600 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600">Component dependencies and relationships</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CouplingGraph data={currentStats.couplingData} />
                </CardContent>
              </Card>

              {/* Overall Unit Test Coverage - Enhanced */}
              <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-500 border-0 shadow-lg bg-white/90 backdrop-blur-sm group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-gray-700 group-hover:text-green-700 transition-colors">
                      Project Coverage
                    </CardTitle>
                    <div className="relative">
                      <CheckCircle className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600">Overall unit test coverage</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-4xl font-bold text-green-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {currentStats.overallCoverage}%
                  </div>
                  <Progress 
                    value={currentStats.overallCoverage} 
                    className="mb-6 h-3 group-hover:h-4 transition-all duration-300"
                  />
                  
                  <div className="space-y-4">
                    <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Breakdown:
                    </div>
                    {Object.entries(currentStats.coverageBreakdown).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-2 bg-green-50/60 rounded-lg hover:bg-green-50 transition-colors">
                        <span className="text-sm text-gray-700 capitalize font-medium">{key}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-1000 ease-out"
                              style={{ width: `${value}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-green-600 w-12 text-right">{value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Pulse Effect for Bottom */}
          <div className="flex justify-center pt-8">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;