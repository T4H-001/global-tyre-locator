import { useState } from "react";
import Header from "@/components/layout/Header";
import StatsCards from "@/components/dashboard/StatsCards";
import TyreRegistrationForm from "@/components/forms/TyreRegistrationForm";
import TyreTable from "@/components/tracking/TyreTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  const renderContent = () => {
    switch (currentSection) {
      case "register":
        return <TyreRegistrationForm onSubmit={handleTyreRegistration} />;
      case "tracking":
        return <TyreTable tyres={tyres} />;
      case "reports":
        return (
          <div className="space-y-6">
            <StatsCards stats={stats} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <span>Regional Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Australia</span>
                      <span className="font-medium">33.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Germany</span>
                      <span className="font-medium">33.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>United States</span>
                      <span className="font-medium">33.3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <span>Stewardship Schemes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>TSA</span>
                      <span className="font-medium">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>EPR</span>
                      <span className="font-medium">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>RMA</span>
                      <span className="font-medium">1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span>Recovery Rate</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success mb-2">66.7%</div>
                  <p className="text-sm text-muted-foreground">
                    2 of 3 tyres successfully processed
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
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
