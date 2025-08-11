import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Download, Eye, Edit } from "lucide-react";

interface Tyre {
  id: string;
  manufacturer: string;
  model: string;
  size: string;
  status: string;
  location: string;
  country: string;
  scheme: string;
  dateRegistered: string;
}

interface TyreTableProps {
  tyres: Tyre[];
}

export default function TyreTable({ tyres }: TyreTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-success/10 text-success hover:bg-success/20";
      case "in use":
        return "bg-primary/10 text-primary hover:bg-primary/20";
      case "collected":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "recycled":
        return "bg-success/10 text-success hover:bg-success/20";
      case "disposed":
        return "bg-muted text-muted-foreground hover:bg-muted/80";
      default:
        return "bg-muted text-muted-foreground hover:bg-muted/80";
    }
  };

  const filteredTyres = tyres.filter((tyre) => {
    const matchesSearch = 
      tyre.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tyre.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tyre.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || statusFilter === "all" || tyre.status === statusFilter;
    const matchesCountry = !countryFilter || countryFilter === "all" || tyre.country === countryFilter;

    return matchesSearch && matchesStatus && matchesCountry;
  });

  const exportToCSV = () => {
    const headers = ["ID", "Manufacturer", "Model", "Size", "Status", "Location", "Country", "Scheme", "Date Registered"];
    const csvContent = [
      headers.join(","),
      ...filteredTyres.map(tyre => [
        tyre.id,
        tyre.manufacturer,
        tyre.model,
        tyre.size,
        tyre.status,
        tyre.location,
        tyre.country,
        tyre.scheme,
        tyre.dateRegistered
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tyre-data-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const uniqueStatuses = [...new Set(tyres.map(tyre => tyre.status))];
  const uniqueCountries = [...new Set(tyres.map(tyre => tyre.country))];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Tyre Tracking Registry</span>
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </CardTitle>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID, manufacturer, or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="z-[100]">
              <SelectItem value="all">All Statuses</SelectItem>
              {uniqueStatuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by country" />
            </SelectTrigger>
            <SelectContent className="z-[100]">
              <SelectItem value="all">All Countries</SelectItem>
              {uniqueCountries.map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tyre ID</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Scheme</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTyres.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center text-muted-foreground py-8">
                    No tyres found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTyres.map((tyre) => (
                  <TableRow key={tyre.id}>
                    <TableCell className="font-mono font-medium">{tyre.id}</TableCell>
                    <TableCell>{tyre.manufacturer}</TableCell>
                    <TableCell>{tyre.model}</TableCell>
                    <TableCell className="font-mono">{tyre.size}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(tyre.status)} variant="secondary">
                        {tyre.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{tyre.location}</TableCell>
                    <TableCell>{tyre.country}</TableCell>
                    <TableCell className="text-sm">{tyre.scheme}</TableCell>
                    <TableCell className="text-sm">{tyre.dateRegistered}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredTyres.length} of {tyres.length} tyres
        </div>
      </CardContent>
    </Card>
  );
}