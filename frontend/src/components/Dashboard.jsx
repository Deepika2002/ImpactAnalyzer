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
  CheckCircle
} from 'lucide-react';
import { mockData } from '../mock';
import CouplingGraph from './CouplingGraph';

const Dashboard = () => {
  const { yesterdayStats, currentStats } = mockData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Impact Analysis Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive codebase insights and metrics
          </p>
        </div>

        {/* Yesterday Statistics Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Yesterday's Statistics</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total MRs Card */}
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium text-gray-700">
                    Merge Requests
                  </CardTitle>
                  <GitPullRequest className="h-5 w-5 text-blue-600" />
                </div>
                <CardDescription>Total MRs merged yesterday</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  {yesterdayStats.totalMRs}
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Recent MRs:</div>
                  {yesterdayStats.mrDetails.slice(0, 3).map((mr) => (
                    <div key={mr.id} className="flex items-center justify-between text-sm">
                      <span className="truncate pr-2">{mr.title}</span>
                      <Badge variant="secondary" className="shrink-0">
                        {mr.coverage}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Yesterday's Unit Test Coverage */}
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium text-gray-700">
                    Unit Test Coverage
                  </CardTitle>
                  <TestTube className="h-5 w-5 text-orange-600" />
                </div>
                <CardDescription>Average coverage for yesterday's MRs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600 mb-4">
                  {yesterdayStats.unitTestCoverage}%
                </div>
                <Progress value={yesterdayStats.unitTestCoverage} className="mb-4" />
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>+5.2% from previous day</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Current Statistics Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Current Project Statistics</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coupling Graph */}
            <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium text-gray-700">
                    Coupling Graph
                  </CardTitle>
                  <Network className="h-5 w-5 text-purple-600" />
                </div>
                <CardDescription>Component dependencies and relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <CouplingGraph data={currentStats.couplingData} />
              </CardContent>
            </Card>

            {/* Overall Unit Test Coverage */}
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium text-gray-700">
                    Project Coverage
                  </CardTitle>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <CardDescription>Overall unit test coverage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-4">
                  {currentStats.overallCoverage}%
                </div>
                <Progress 
                  value={currentStats.overallCoverage} 
                  className="mb-4"
                  style={{
                    '--progress-background': 'rgb(34 197 94)',
                  }}
                />
                
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-700 mb-2">Breakdown:</div>
                  {Object.entries(currentStats.coverageBreakdown).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 capitalize">{key}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 transition-all duration-500"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-green-600">{value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;