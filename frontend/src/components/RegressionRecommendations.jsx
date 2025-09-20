import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Lightbulb,
  Clock,
  AlertTriangle,
  Users,
  PlayCircle,
  Target
} from 'lucide-react';

const RegressionRecommendations = ({ recommendations }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'high': return <Target className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Lightbulb className="h-6 w-6 text-yellow-600" />
        <h2 className="text-2xl font-semibold text-gray-800">Regression Testing Recommendations</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/90 backdrop-blur-sm group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg font-medium text-gray-700 flex items-center gap-2">
                    {getPriorityIcon(rec.priority)}
                    {rec.name}
                  </CardTitle>
                  <Badge className={`${getPriorityColor(rec.priority)} text-xs w-fit`}>
                    {rec.priority} priority
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Reason */}
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <p className="text-sm text-blue-800 font-medium">Why test this?</p>
                <p className="text-sm text-blue-700 mt-1">{rec.reason}</p>
              </div>

              {/* Time Estimate */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Estimated Time</span>
                </div>
                <span className="font-medium text-gray-700">{rec.estimatedTime}</span>
              </div>

              {/* Developer Changes */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>Developer Changes</span>
                </div>
                <Badge variant="secondary" className="font-medium">
                  {rec.developerChanges} changes
                </Badge>
              </div>

              {/* Components */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Affected Components:</p>
                <div className="flex flex-wrap gap-1">
                  {rec.components.map((component, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {component}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full mt-4 group-hover:shadow-md transition-all duration-200"
                variant={rec.priority === 'critical' ? 'destructive' : 'default'}
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Start Testing
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Alert */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900">Regression Testing Alert</h3>
              <p className="text-amber-800 mt-1">
                Based on yesterday's code changes, <strong>{recommendations.length} test flows</strong> require immediate attention. 
                These tests are critical for ensuring system stability after recent modifications to core components.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="bg-amber-100 text-amber-800">High Impact Changes Detected</Badge>
                <Badge className="bg-amber-100 text-amber-800">12 Components Affected</Badge>
                <Badge className="bg-amber-100 text-amber-800">Estimated: 3.2h total testing</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegressionRecommendations;