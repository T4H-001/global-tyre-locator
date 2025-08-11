import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  MapPin,
  Target,
  Truck
} from "lucide-react";

interface RecoveryDashboardProps {
  data: {
    nationalRecoveryRate: number;
    stateRecoveryRates: Array<{
      state: string;
      rate: number;
      trend: 'up' | 'down' | 'stable';
      tyreCount: number;
      issues?: string[];
    }>;
    dumpingAlerts: Array<{
      location: string;
      count: number;
      severity: 'high' | 'medium' | 'low';
      lastIncident: string;
    }>;
    tyreTypes: Array<{
      type: string;
      recovered: number;
      total: number;
      rate: number;
    }>;
  };
}

export default function RecoveryDashboard({ data }: RecoveryDashboardProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-success" />;
      case 'down': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <Target className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* National Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              National Recovery Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-3xl font-bold text-success">
                {data.nationalRecoveryRate}%
              </div>
              <Badge variant="outline" className="text-success border-success">
                TSA Target: 70%
              </Badge>
            </div>
            <Progress value={data.nationalRecoveryRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {data.nationalRecoveryRate >= 66 ? 'Above' : 'Below'} TSA 2023/24 benchmark
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Daily Tyre Generation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">180,000</div>
            <p className="text-sm text-muted-foreground">
              Passenger tyre equivalents/day
            </p>
            <div className="flex items-center mt-2">
              <Truck className="h-4 w-4 text-warning mr-1" />
              <span className="text-xs text-warning">537,000 tonnes annually</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Dumping Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {data.dumpingAlerts.length}
            </div>
            <p className="text-sm text-muted-foreground">Active alerts</p>
            <div className="flex items-center mt-2">
              <AlertTriangle className="h-4 w-4 text-destructive mr-1" />
              <span className="text-xs text-destructive">
                {data.dumpingAlerts.filter(a => a.severity === 'high').length} high priority
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              OTR Mining Tyres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">100,000</div>
            <p className="text-sm text-muted-foreground">Tonnes buried annually</p>
            <div className="flex items-center mt-2">
              <MapPin className="h-4 w-4 text-warning mr-1" />
              <span className="text-xs text-warning">Mainly Queensland mining</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* State-Based Recovery Rates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>State-Based Recovery Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.stateRecoveryRates.map((state, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{state.state}</span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(state.trend)}
                    <span className="font-bold">{state.rate}%</span>
                  </div>
                </div>
                <Progress value={state.rate} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{state.tyreCount.toLocaleString()} tyres</span>
                  <span>
                    {state.rate >= 66 ? '+' : ''}{(state.rate - 66).toFixed(1)}% vs national
                  </span>
                </div>
                {state.issues && state.issues.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {state.issues.map((issue, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {issue}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tyre Type Recovery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span>Recovery by Tyre Type</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.tyreTypes.map((type, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{type.type}</span>
                    <span className="text-sm font-bold">
                      {type.recovered.toLocaleString()} / {type.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={type.rate} className="flex-1" />
                    <span className="text-sm font-medium w-12">{type.rate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dumping Alert Hotspots */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span>Dumping Alert Hotspots</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.dumpingAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Badge variant={getSeverityColor(alert.severity) as any}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <span className="font-medium">{alert.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {alert.count} tyres reported • Last: {alert.lastIncident}
                    </p>
                  </div>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}