import { useState } from "react";
import Header from "@/components/layout/Header";
import StatsCards from "@/components/dashboard/StatsCards";
import TyreRegistrationForm from "@/components/forms/TyreRegistrationForm";
import TyreTable from "@/components/tracking/TyreTable";
import RecoveryDashboard from "@/components/dashboard/RecoveryDashboard";
import LifecycleFlowDashboard from "@/components/dashboard/LifecycleFlowDashboard";
import ComplianceReports from "@/components/reports/ComplianceReports";
import PredictiveInsights from "@/components/insights/PredictiveInsights";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Globe, Target } from "lucide-react";

interface TyreData {
  id: string;
  manufacturer: string;
  model: string;
  size: string;
  dotCode: string;
  country: string;
  location: string;
  status: string;
  scheme: string;
  dateRegistered: string;
}

const Index = () => {
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [tyres, setTyres] = useState<TyreData[]>([
    {
      id: "TYR-1M9X2-ABC12",
      manufacturer: "Michelin",
      model: "Pilot Sport 4",
      size: "225/45R17",
      dotCode: "DOT-4A3Y-1234-2525",
      country: "Australia",
      location: "Sydney",
      status: "In Use",
      scheme: "TSA (Australia)",
      dateRegistered: "2025-01-15"
    },
    {
      id: "TYR-1M9X3-DEF34",
      manufacturer: "Bridgestone",
      model: "Turanza T005",
      size: "205/55R16",
      dotCode: "DOT-6B8Z-5678-3025",
      country: "Germany",
      location: "Berlin",
      status: "Collected",
      scheme: "EPR (Europe)",
      dateRegistered: "2025-01-10"
    },
    {
      id: "TYR-1M9X4-GHI56",
      manufacturer: "Continental",
      model: "PremiumContact 6",
      size: "195/65R15",
      dotCode: "DOT-2C7Y-9012-4025",
      country: "United States",
      location: "Los Angeles",
      status: "Recycled",
      scheme: "RMA (USA)",
      dateRegistered: "2025-01-08"
    }
  ]);

  const stats = {
    totalTyres: tyres.length,
    activeTracking: tyres.filter(t => t.status === "In Use" || t.status === "Collected").length,
    recycled: tyres.filter(t => t.status === "Recycled").length,
    pending: tyres.filter(t => t.status === "New" || t.status === "Collected").length,
  };

  const handleTyreRegistration = (data: TyreData) => {
    const newTyre = {
      ...data,
      dateRegistered: new Date().toISOString().split('T')[0]
    };
    setTyres(prev => [newTyre, ...prev]);
  };

  // Sample data for enhanced dashboards
  const dashboardData = {
    recovery: {
      nationalRecoveryRate: 66,
      stateRecoveryRates: [
        { state: "NSW", rate: 68, trend: "up" as const, tyreCount: 150000, issues: ["OTR dumping"] },
        { state: "VIC", rate: 72, trend: "up" as const, tyreCount: 120000, issues: [] },
        { state: "QLD", rate: 58, trend: "down" as const, tyreCount: 180000, issues: ["Mining OTR", "Remote dumping"] },
        { state: "WA", rate: 65, trend: "stable" as const, tyreCount: 95000, issues: ["Collection gaps"] },
        { state: "SA", rate: 70, trend: "up" as const, tyreCount: 75000, issues: [] },
        { state: "TAS", rate: 75, trend: "up" as const, tyreCount: 25000, issues: [] }
      ],
      dumpingAlerts: [
        { location: "Springbrook National Park, QLD", count: 550, severity: "high" as const, lastIncident: "2025-01-10" },
        { location: "Blue Mountains, NSW", count: 200, severity: "medium" as const, lastIncident: "2025-01-08" },
        { location: "Grampians, VIC", count: 85, severity: "low" as const, lastIncident: "2025-01-05" }
      ],
      tyreTypes: [
        { type: "Passenger", recovered: 280000, total: 350000, rate: 80 },
        { type: "Light Truck", recovered: 95000, total: 120000, rate: 79 },
        { type: "Mining OTR", recovered: 15000, total: 100000, rate: 15 },
        { type: "Agricultural", recovered: 12000, total: 18000, rate: 67 }
      ]
    },
    lifecycle: {
      flowStages: [
        { stage: "New", count: 15, percentage: 25, icon: "store", color: "bg-primary/20 text-primary" },
        { stage: "In Use", count: 25, percentage: 42, icon: "car", color: "bg-warning/20 text-warning" },
        { stage: "Collected", count: 12, percentage: 20, icon: "wrench", color: "bg-secondary/20 text-secondary-foreground" },
        { stage: "Recycled", count: 8, percentage: 13, icon: "recycle", color: "bg-success/20 text-success" }
      ],
      recentTransitions: [
        { tyreId: "TYR-1M9X2-ABC12", fromStage: "In Use", toStage: "Collected", timestamp: "2 hours ago", location: "Sydney, NSW", vehicleInfo: "Toyota HiLux ABC123", stakeholder: "JAX Tyres" },
        { tyreId: "TYR-1M9X3-DEF34", fromStage: "Collected", toStage: "Recycled", timestamp: "4 hours ago", location: "Melbourne, VIC", stakeholder: "Green Tyre Recycling" },
        { tyreId: "TYR-1M9X4-GHI56", fromStage: "New", toStage: "In Use", timestamp: "6 hours ago", location: "Brisbane, QLD", vehicleInfo: "Ford Ranger DEF456", stakeholder: "Tyrepower" }
      ],
      stakeholderActivity: [
        { type: "Retailer", name: "JAX Tyres Sydney", tyresProcessed: 1250, avgProcessingTime: "2.5 days", compliance: 95 },
        { type: "Mechanic", name: "City Auto Repairs", tyresProcessed: 450, avgProcessingTime: "1.2 days", compliance: 88 },
        { type: "Recycler", name: "Green Tyre Solutions", tyresProcessed: 3200, avgProcessingTime: "7.8 days", compliance: 92 }
      ]
    }
  };

  const reportsData = {
    annualSummary: {
      totalTyresRegistered: 2450000,
      recoveredTyres: 1617000,
      recoveryRate: 66,
      environmentalImpact: {
        co2Saved: 15000,
        crumbRubberProduced: 45000,
        roadsBuilt: 850
      }
    },
    stateCompliance: [
      { state: "NSW", regulation: "Waste Avoidance & Resource Recovery Act", status: "compliant" as const, fineRisk: 2000, lastAudit: "Dec 2024", nextDeadline: "Jun 2025" },
      { state: "QLD", regulation: "Waste Reduction & Recycling Act", status: "warning" as const, fineRisk: 12000, lastAudit: "Oct 2024", nextDeadline: "Mar 2025" },
      { state: "VIC", regulation: "Environment Protection Act", status: "compliant" as const, fineRisk: 1000, lastAudit: "Nov 2024", nextDeadline: "May 2025" }
    ],
    brandPerformance: [
      { brand: "Michelin", tyresSold: 450000, tyresRecovered: 315000, recoveryRate: 70, feesPaid: 180000, complianceScore: 92 },
      { brand: "Bridgestone", tyresSold: 520000, tyresRecovered: 338000, recoveryRate: 65, feesPaid: 208000, complianceScore: 88 },
      { brand: "Continental", tyresSold: 380000, tyresRecovered: 266000, recoveryRate: 70, feesPaid: 152000, complianceScore: 91 }
    ],
    dumpingIncidents: [
      { location: "Springbrook National Park", tyreCount: 550, estimatedFine: 66000, status: "investigating" as const, reportDate: "Jan 10, 2025" },
      { location: "Blue Mountains", tyreCount: 200, estimatedFine: 24000, status: "resolved" as const, reportDate: "Jan 8, 2025" }
    ]
  };

  const insightsData = {
    recoveryPredictions: {
      currentRate: 66,
      projectedRate: 72,
      confidence: 85,
      factors: ["Increased RFID adoption", "New collection points", "EV market growth"]
    },
    dumpingRiskAlerts: [
      { location: "Remote QLD mining sites", riskLevel: "high" as const, predictedIncidents: 3, preventionActions: ["Increase patrols", "Mobile collection units", "Stakeholder engagement"] },
      { location: "NSW national parks", riskLevel: "medium" as const, predictedIncidents: 1, preventionActions: ["Signage campaigns", "Regular monitoring"] }
    ],
    optimizationSuggestions: [
      { category: "Collection", suggestion: "Deploy mobile RFID scanners to fleet operators", impact: "15% increase in tracking", implementationCost: "$50K", roi: "250%" },
      { category: "Processing", suggestion: "Partner with local councils for tire-derived fuel", impact: "20% cost reduction", implementationCost: "$75K", roi: "180%" }
    ],
    marketTrends: [
      { trend: "Electric vehicle tire demand surge", impact: "positive" as const, timeframe: "2025-2027", recommendation: "Develop EV-specific tracking protocols" },
      { trend: "Mining tire burial regulations tightening", impact: "neutral" as const, timeframe: "2025", recommendation: "Increase OTR recycling capacity" }
    ]
  };

  const renderContent = () => {
    switch (currentSection) {
      case "register":
        return <TyreRegistrationForm onSubmit={handleTyreRegistration} />;
      case "tracking":
        return <TyreTable tyres={tyres} />;
      case "reports":
        return (
          <Tabs defaultValue="compliance" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="recovery">Recovery</TabsTrigger>
              <TabsTrigger value="lifecycle">Lifecycle</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="compliance" className="space-y-6">
              <ComplianceReports data={reportsData} />
            </TabsContent>
            
            <TabsContent value="recovery" className="space-y-6">
              <RecoveryDashboard data={dashboardData.recovery} />
            </TabsContent>
            
            <TabsContent value="lifecycle" className="space-y-6">
              <LifecycleFlowDashboard data={dashboardData.lifecycle} />
            </TabsContent>
            
            <TabsContent value="insights" className="space-y-6">
              <PredictiveInsights data={insightsData} />
            </TabsContent>
          </Tabs>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Tyre Lifecycle Registration System
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Track tyres from manufacturing to responsible disposal. 
                Addressing illegal dumping through global stewardship compliance.
              </p>
            </div>
            <StatsCards stats={stats} />
            <TyreTable tyres={tyres} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={setCurrentSection} currentSection={currentSection} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
