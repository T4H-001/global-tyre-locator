import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Download, 
  AlertTriangle, 
  CheckCircle, 
  Shield,
  Target,
  Calendar,
  DollarSign
} from "lucide-react";

interface ComplianceReportsProps {
  data: {
    annualSummary: {
      totalTyresRegistered: number;
      recoveredTyres: number;
      recoveryRate: number;
      environmentalImpact: {
        co2Saved: number;
        crumbRubberProduced: number;
        roadsBuilt: number;
      };
    };
    stateCompliance: Array<{
      state: string;
      regulation: string;
      status: 'compliant' | 'warning' | 'non-compliant';
      fineRisk: number;
      lastAudit: string;
      nextDeadline: string;
    }>;
    brandPerformance: Array<{
      brand: string;
      tyresSold: number;
      tyresRecovered: number;
      recoveryRate: number;
      feesPaid: number;
      complianceScore: number;
    }>;
    dumpingIncidents: Array<{
      location: string;
      tyreCount: number;
      estimatedFine: number;
      status: 'investigating' | 'resolved' | 'pending';
      reportDate: string;
    }>;
  };
}

export default function ComplianceReports({ data }: ComplianceReportsProps) {
  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'success';
      case 'warning': return 'warning';
      case 'non-compliant': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'non-compliant': return <AlertTriangle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Annual Recovery Report */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>2024/25 Annual Recovery Report</span>
            </CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {data.annualSummary.totalTyresRegistered.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Total Tyres Registered</p>
              <Badge variant="outline" className="mt-1">+12% vs 2023/24</Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success">
                {data.annualSummary.recoveredTyres.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Successfully Recovered</p>
              <Progress value={data.annualSummary.recoveryRate} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {data.annualSummary.recoveryRate}%
              </div>
              <p className="text-sm text-muted-foreground">Recovery Rate</p>
              <Badge variant={data.annualSummary.recoveryRate >= 66 ? "default" : "destructive"} className="mt-1">
                {data.annualSummary.recoveryRate >= 66 ? 'Above' : 'Below'} TSA Target
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success">
                {data.annualSummary.environmentalImpact.co2Saved}
              </div>
              <p className="text-sm text-muted-foreground">Tonnes CO₂ Saved</p>
              <p className="text-xs text-muted-foreground mt-1">
                {data.annualSummary.environmentalImpact.roadsBuilt}km roads built
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* State Compliance Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>State-Based Compliance Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">State/Territory</th>
                  <th className="text-left p-2">Regulation</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Fine Risk</th>
                  <th className="text-left p-2">Last Audit</th>
                  <th className="text-left p-2">Next Deadline</th>
                </tr>
              </thead>
              <tbody>
                {data.stateCompliance.map((state, index) => (
                  <tr key={index} className="border-b hover:bg-accent">
                    <td className="p-2 font-medium">{state.state}</td>
                    <td className="p-2 text-sm text-muted-foreground">{state.regulation}</td>
                    <td className="p-2">
                      <Badge variant={getComplianceColor(state.status) as any} className="flex items-center space-x-1 w-fit">
                        {getStatusIcon(state.status)}
                        <span>{state.status.replace('-', ' ')}</span>
                      </Badge>
                    </td>
                    <td className="p-2">
                      <span className={`font-medium ${
                        state.fineRisk > 10000 ? 'text-destructive' : 
                        state.fineRisk > 5000 ? 'text-warning' : 'text-success'
                      }`}>
                        ${state.fineRisk.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-2 text-sm text-muted-foreground">{state.lastAudit}</td>
                    <td className="p-2 text-sm">
                      <Badge variant="outline" className="text-xs">
                        {state.nextDeadline}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Brand Performance Report */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Brand Performance Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.brandPerformance.map((brand, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{brand.brand}</span>
                    <Badge variant={brand.complianceScore >= 90 ? "default" : brand.complianceScore >= 70 ? "secondary" : "destructive"}>
                      {brand.complianceScore}% Compliance
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Tyres Sold:</span>
                      <span className="ml-2 font-medium">{brand.tyresSold.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Recovered:</span>
                      <span className="ml-2 font-medium">{brand.tyresRecovered.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Recovery Rate:</span>
                      <span className={`ml-2 font-medium ${
                        brand.recoveryRate >= 66 ? 'text-success' : 'text-destructive'
                      }`}>
                        {brand.recoveryRate}%
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fees Paid:</span>
                      <span className="ml-2 font-medium">${brand.feesPaid.toLocaleString()}</span>
                    </div>
                  </div>
                  <Progress value={brand.recoveryRate} className="mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dumping Incidents Report */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span>Dumping Incident Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.dumpingIncidents.map((incident, index) => (
                <div key={index} className="p-3 rounded-lg border hover:bg-accent transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{incident.location}</span>
                    <Badge variant={
                      incident.status === 'resolved' ? 'default' : 
                      incident.status === 'investigating' ? 'secondary' : 'destructive'
                    }>
                      {incident.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Tyres:</span>
                      <span className="ml-2 font-medium">{incident.tyreCount}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Est. Fine:</span>
                      <span className="ml-2 font-medium text-destructive">
                        ${incident.estimatedFine.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Reported: {incident.reportDate}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-destructive/10 rounded-lg">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium">Total Estimated Fines:</span>
                <span className="text-sm font-bold text-destructive">
                  ${data.dumpingIncidents.reduce((sum, incident) => sum + incident.estimatedFine, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}