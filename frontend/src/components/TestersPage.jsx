import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  Calendar as CalendarIcon,
  TestTube,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Target,
  TrendingUp,
  TrendingDown,
  Activity,
  Lightbulb,
  PlayCircle
} from 'lucide-react';
import { mockData } from '../mock';
import RegressionRecommendations from './RegressionRecommendations';
import DeveloperRegressionChart from './DeveloperRegressionChart';

const TestersPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { testersStats } = mockData;
  
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const selectedDateData = testersStats.testCalendarData[formatDate(selectedDate)] || {
    totalTests: 0,
    passed: 0,
    failed: 0,
    pending: 0,
    flows: []
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <TestTube className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Testing Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Regression testing insights and calendar-based test tracking
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Flows</p>
                    <p className="text-2xl font-bold text-gray-900">{testersStats.regressionSummary.totalFlows}</p>
                  </div>
                  <TestTube className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Passed</p>
                    <p className="text-2xl font-bold text-green-600">{testersStats.regressionSummary.passed}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Failed</p>
                    <p className="text-2xl font-bold text-red-600">{testersStats.regressionSummary.failed}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Need Retesting</p>
                    <p className="text-2xl font-bold text-orange-600">{testersStats.regressionSummary.needRetesting}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar and Test Flows Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-700 flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-indigo-600" />
                  Test Calendar
                </CardTitle>
                <CardDescription>Select date to view test results</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                  <div className="text-sm font-medium text-indigo-900 mb-2">
                    {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-bold text-green-600">{selectedDateData.passed}</div>
                      <div className="text-gray-600">Passed</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-red-600">{selectedDateData.failed}</div>
                      <div className="text-gray-600">Failed</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-yellow-600">{selectedDateData.pending}</div>
                      <div className="text-gray-600">Pending</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Date Test Flows */}
            <Card className="lg:col-span-2 hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-700 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-600" />
                  Test Flows - {selectedDate.toLocaleDateString()}
                </CardTitle>
                <CardDescription>Detailed results for selected date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedDateData.flows.length > 0 ? (
                    selectedDateData.flows.map((flow) => (
                      <div key={flow.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(flow.status)}
                          <div>
                            <div className="font-medium text-gray-700">{flow.name}</div>
                            <div className="text-sm text-gray-500">Duration: {flow.duration}</div>
                          </div>
                          {flow.impacted && (
                            <Badge variant="destructive" className="text-xs">
                              Impacted by Changes
                            </Badge>
                          )}
                        </div>
                        <Badge className={`${getPriorityColor(flow.priority)} text-xs`}>
                          {flow.priority}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <TestTube className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No test data available for this date</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Regression Recommendations */}
          <RegressionRecommendations recommendations={testersStats.recommendedTests} />

          <Separator />

          {/* Developer Regression Analysis */}
          <DeveloperRegressionChart 
            developerData={testersStats.developerRegressions}
            trends={testersStats.testTrends}
          />
        </div>
      </div>
    </div>
  );
};

export default TestersPage;