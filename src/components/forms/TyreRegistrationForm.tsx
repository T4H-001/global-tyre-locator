import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { QrCode, Package } from "lucide-react";

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
}

interface TyreRegistrationFormProps {
  onSubmit: (data: TyreData) => void;
}

export default function TyreRegistrationForm({ onSubmit }: TyreRegistrationFormProps) {
  const [formData, setFormData] = useState<TyreData>({
    id: "",
    manufacturer: "",
    model: "",
    size: "",
    dotCode: "",
    country: "",
    location: "",
    status: "new",
    scheme: "",
  });

  const generateUniqueId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `TYR-${timestamp}-${random}`.toUpperCase();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.id) {
      setFormData(prev => ({ ...prev, id: generateUniqueId() }));
    }

    const dataToSubmit = {
      ...formData,
      id: formData.id || generateUniqueId(),
    };

    onSubmit(dataToSubmit);
    
    toast({
      title: "Tyre Registered Successfully",
      description: `Tyre ID: ${dataToSubmit.id} has been registered.`,
    });

    // Reset form
    setFormData({
      id: "",
      manufacturer: "",
      model: "",
      size: "",
      dotCode: "",
      country: "",
      location: "",
      status: "new",
      scheme: "",
    });
  };

  const manufacturers = [
    "Michelin", "Bridgestone", "Goodyear", "Continental", "Pirelli",
    "Yokohama", "Dunlop", "Toyo", "Hankook", "Kumho", "Other"
  ];

  const countries = [
    "Australia", "United States", "United Kingdom", "Germany", "France",
    "Japan", "China", "Canada", "Netherlands", "Belgium", "Other"
  ];

  const schemes = [
    "TSA (Australia)", "EPR (Europe)", "JATMA (Japan)", "RMA (USA)",
    "Other", "Not Applicable"
  ];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="h-5 w-5 text-primary" />
          <span>Register New Tyre</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Unique ID */}
            <div className="space-y-2">
              <Label htmlFor="id">Unique Tyre ID</Label>
              <div className="flex space-x-2">
                <Input
                  id="id"
                  value={formData.id}
                  onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
                  placeholder="Auto-generated if empty"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setFormData(prev => ({ ...prev, id: generateUniqueId() }))}
                >
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Manufacturer */}
            <div className="space-y-2">
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <Select
                value={formData.manufacturer}
                onValueChange={(value) => setFormData(prev => ({ ...prev, manufacturer: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select manufacturer" />
                </SelectTrigger>
                <SelectContent>
                  {manufacturers.map((manufacturer) => (
                    <SelectItem key={manufacturer} value={manufacturer}>
                      {manufacturer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Model */}
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                placeholder="e.g., Pilot Sport 4"
                required
              />
            </div>

            {/* Size */}
            <div className="space-y-2">
              <Label htmlFor="size">Tyre Size</Label>
              <Input
                id="size"
                value={formData.size}
                onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                placeholder="e.g., 225/45R17"
                required
              />
            </div>

            {/* DOT Code */}
            <div className="space-y-2">
              <Label htmlFor="dotCode">DOT Code</Label>
              <Input
                id="dotCode"
                value={formData.dotCode}
                onChange={(e) => setFormData(prev => ({ ...prev, dotCode: e.target.value }))}
                placeholder="e.g., DOT-4A3Y-1234-2525"
              />
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location/City</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Sydney, Melbourne"
                required
              />
            </div>

            {/* Stewardship Scheme */}
            <div className="space-y-2">
              <Label htmlFor="scheme">Stewardship Scheme</Label>
              <Select
                value={formData.scheme}
                onValueChange={(value) => setFormData(prev => ({ ...prev, scheme: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select scheme" />
                </SelectTrigger>
                <SelectContent>
                  {schemes.map((scheme) => (
                    <SelectItem key={scheme} value={scheme}>
                      {scheme}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Register Tyre
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}