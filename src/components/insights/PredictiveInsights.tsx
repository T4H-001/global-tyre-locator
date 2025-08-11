import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Brain, 
  Zap, 
  Target, 
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Activity
} from "lucide-react";

interface PredictiveInsightsProps {
  data: {
    recoveryPredictions: {
      currentRate: number;
      projectedRate: number;
      confidence: number;
      factors: string[];
    };
    dumpingRiskAlerts: Array<{
      location: string;
      riskLevel: 'high' | 'medium' | 'low';
      predictedIncidents: number;
      preventionActions: string[];
    }>;
    optimizationSuggestions: Array<{
      category: string;
      suggestion: string;
      impact: string;
      implementationCost: string;
      roi: string;
    }>;
    marketTrends: Array<{
      trend: string;
      impact: 'positive' | 'negative' | 'neutral';
      timeframe: string;
      recommendation: string;
    }>;
  };
}

export default function PredictiveInsights({ data }: PredictiveInsightsProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'success';
      case 'negative': return 'destructive';
      case 'neutral': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Recovery Rate Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Recovery Rate Predictions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Rate</span>
                <span className="text-2xl font-bold text-foreground">
                  {data.recoveryPredictions.currentRate}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Projected (6 months)</span>
                <span className="text-2xl font-bold text-primary">
                  {data.recoveryPredictions.projectedRate}%
                </span>
              </div>
              
              <Progress value={data.recoveryPredictions.projectedRate} className="mt-2" />
              
              <div className="flex items-center space-x-2">
                <Brain className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Confidence: {data.recoveryPredictions.confidence}%
                </span>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm font-medium">Key Factors:</span>
                <div className="flex flex-wrap gap-1">
                  {data.recoveryPredictions.factors.map((factor, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI-Powered Risk Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>AI Dumping Risk Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.dumpingRiskAlerts.map((alert, index) => (
                <div key={index} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{alert.location}</span>
                    <Badge variant={getRiskColor(alert.riskLevel) as any}>
                      {alert.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Predicted incidents: <span className="font-medium">{alert.predictedIncidents}</span> in next 30 days
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium">Prevention Actions:</span>
                    {alert.preventionActions.map((action, i) => (
                      <div key={i} className="text-xs text-muted-foreground flex items-center">
                        <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                        {action}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Optimization Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <span>Lifecycle Optimization Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {data.optimizationSuggestions.map((suggestion, index) => (
              <div key={index} className="p-4 rounded-lg border hover:bg-accent transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{suggestion.category}</Badge>
                  <span className="text-sm font-medium text-success">{suggestion.roi} ROI</span>
                </div>
                <h4 className="font-medium mb-2">{suggestion.suggestion}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Impact:</span>
                    <span className="font-medium">{suggestion.impact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cost:</span>
                    <span className="font-medium">{suggestion.implementationCost}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Trends & Environmental Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Market Trend Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.marketTrends.map((trend, index) => (
                <div key={index} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{trend.trend}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getImpactColor(trend.impact) as any} className="text-xs">
                        {trend.impact}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {trend.timeframe}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{trend.recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Environmental Impact Projections */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-success" />
              <span>Environmental Impact Projections</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-success/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">CO₂ Reduction (Annual)</span>
                  <span className="text-lg font-bold text-success">15,000 tonnes</span>
                </div>
                <Progress value={78} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">78% of 2030 target achieved</p>
              </div>
              
              <div className="p-3 rounded-lg bg-primary/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Crumb Rubber Production</span>
                  <span className="text-lg font-bold text-primary">45,000 tonnes</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Enough for 850km of roads</p>
              </div>
              
              <div className="p-3 rounded-lg bg-warning/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Energy Recovery</span>
                  <span className="text-lg font-bold text-warning">120 GWh</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Powers 25,000 homes annually</p>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-accent rounded-lg">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  Contributing to Australia's circular economy targets
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}