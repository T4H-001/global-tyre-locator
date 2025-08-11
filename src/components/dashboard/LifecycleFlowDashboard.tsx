import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Car, 
  Store, 
  Wrench, 
  Recycle, 
  Trash2,
  Zap,
  Timer,
  MapPin
} from "lucide-react";

interface LifecycleFlowDashboardProps {
  data: {
    flowStages: Array<{
      stage: string;
      count: number;
      percentage: number;
      icon: string;
      color: string;
    }>;
    recentTransitions: Array<{
      tyreId: string;
      fromStage: string;
      toStage: string;
      timestamp: string;
      location: string;
      vehicleInfo?: string;
      stakeholder: string;
    }>;
    stakeholderActivity: Array<{
      type: string;
      name: string;
      tyresProcessed: number;
      avgProcessingTime: string;
      compliance: number;
    }>;
  };
}

export default function LifecycleFlowDashboard({ data }: LifecycleFlowDashboardProps) {
  const getStageIcon = (iconType: string) => {
    switch (iconType) {
      case 'store': return <Store className="h-6 w-6" />;
      case 'car': return <Car className="h-6 w-6" />;
      case 'wrench': return <Wrench className="h-6 w-6" />;
      case 'recycle': return <Recycle className="h-6 w-6" />;
      case 'trash': return <Trash2 className="h-6 w-6" />;
      default: return <Timer className="h-6 w-6" />;
    }
  };

  const getStakeholderIcon = (type: string) => {
    switch (type) {
      case 'Retailer': return <Store className="h-4 w-4" />;
      case 'Mechanic': return <Wrench className="h-4 w-4" />;
      case 'Recycler': return <Recycle className="h-4 w-4" />;
      case 'Fleet': return <Car className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Lifecycle Flow Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowRight className="h-5 w-5 text-primary" />
            <span>Tyre Lifecycle Flow</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-center gap-4 p-4">
            {data.flowStages.map((stage, index) => (
              <div key={index} className="flex items-center">
                <div className="text-center">
                  <div className={`p-4 rounded-full ${stage.color} mb-2 mx-auto`}>
                    {getStageIcon(stage.icon)}
                  </div>
                  <h3 className="font-medium text-sm">{stage.stage}</h3>
                  <p className="text-2xl font-bold text-foreground">{stage.count}</p>
                  <p className="text-xs text-muted-foreground">{stage.percentage}%</p>
                </div>
                {index < data.flowStages.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-muted-foreground mx-4" />
                )}
              </div>
            ))}
          </div>
          
          {/* Flow Efficiency Metrics */}
          <div className="mt-6 p-4 bg-accent rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">95%</div>
                <p className="text-sm text-muted-foreground">Retailer → In Use</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">72%</div>
                <p className="text-sm text-muted-foreground">In Use → Collection</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">88%</div>
                <p className="text-sm text-muted-foreground">Collection → Recycling</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transitions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>Real-Time Transitions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {data.recentTransitions.map((transition, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <div className="flex-shrink-0">
                    <Badge variant="outline" className="text-xs">
                      {transition.tyreId}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-muted-foreground">{transition.fromStage}</span>
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <span className="font-medium">{transition.toStage}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{transition.location}</span>
                      {transition.vehicleInfo && (
                        <>
                          <Car className="h-3 w-3" />
                          <span>{transition.vehicleInfo}</span>
                        </>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {transition.stakeholder} • {transition.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stakeholder Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Timer className="h-5 w-5 text-primary" />
              <span>Stakeholder Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.stakeholderActivity.map((stakeholder, index) => (
                <div key={index} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStakeholderIcon(stakeholder.type)}
                      <span className="font-medium">{stakeholder.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {stakeholder.type}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{stakeholder.tyresProcessed}</div>
                      <div className="text-xs text-muted-foreground">tyres</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Avg. Processing:</span>
                      <span className="ml-1 font-medium">{stakeholder.avgProcessingTime}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Compliance:</span>
                      <span className={`ml-1 font-medium ${
                        stakeholder.compliance >= 90 ? 'text-success' : 
                        stakeholder.compliance >= 70 ? 'text-warning' : 'text-destructive'
                      }`}>
                        {stakeholder.compliance}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RFID Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <span>RFID Integration Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-success/10">
              <div className="text-2xl font-bold text-success">85%</div>
              <p className="text-sm text-muted-foreground">Tyres RFID-enabled</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-primary/10">
              <div className="text-2xl font-bold text-primary">24</div>
              <p className="text-sm text-muted-foreground">Active scanners</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-warning/10">
              <div className="text-2xl font-bold text-warning">1,247</div>
              <p className="text-sm text-muted-foreground">Scans today</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-accent">
              <Button variant="outline" size="sm" className="w-full">
                View Scanner Map
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}