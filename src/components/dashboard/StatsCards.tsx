import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Package, RefreshCw, AlertTriangle } from "lucide-react";

interface StatsCardsProps {
  stats: {
    totalTyres: number;
    activeTracking: number;
    recycled: number;
    pending: number;
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Tyres Registered",
      value: stats.totalTyres.toLocaleString(),
      icon: Package,
      color: "text-primary",
      bgColor: "bg-accent",
    },
    {
      title: "Active Tracking",
      value: stats.activeTracking.toLocaleString(),
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Successfully Recycled",
      value: stats.recycled.toLocaleString(),
      icon: RefreshCw,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Pending Collection",
      value: stats.pending.toLocaleString(),
      icon: AlertTriangle,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}