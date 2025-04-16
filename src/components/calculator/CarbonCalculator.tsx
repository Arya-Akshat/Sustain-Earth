
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Car, Home, HelpCircle, Plane, ShoppingBag } from "lucide-react";

const CarbonCalculator = () => {
  const [activeTab, setActiveTab] = useState("transportation");
  const [result, setResult] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    transportation: {
      carType: "gasoline",
      carMileage: 25,
      milesDriven: 10000,
      publicTransport: 1000,
      flights: {
        short: 0,
        medium: 0,
        long: 0,
      },
    },
    home: {
      energySource: "grid",
      homeSize: "medium",
      peopleInHousehold: 2,
      monthlyElectricity: 500,
      monthlyGas: 50,
    },
    lifestyle: {
      dietType: "omnivore",
      shoppingHabits: "average",
      wasteRecycling: 50,
    },
  });

  const handleInputChange = (
    category: "transportation" | "home" | "lifestyle",
    field: string,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const handleFlightChange = (type: "short" | "medium" | "long", value: number) => {
    setFormData((prev) => ({
      ...prev,
      transportation: {
        ...prev.transportation,
        flights: {
          ...prev.transportation.flights,
          [type]: value,
        },
      },
    }));
  };

  const calculateFootprint = () => {
    // This is a simplified calculation for demonstration
    // In a real app, more complex formulas would be used
    
    // Transportation calculation
    const carEmissions = 
      formData.transportation.carType === "electric" 
        ? formData.transportation.milesDriven * 0.1 
        : formData.transportation.carType === "hybrid"
          ? formData.transportation.milesDriven * 0.2
          : formData.transportation.milesDriven * (0.4);
          
    const publicTransportEmissions = formData.transportation.publicTransport * 0.15;
    
    const flightEmissions = 
      formData.transportation.flights.short * 500 + 
      formData.transportation.flights.medium * 1500 + 
      formData.transportation.flights.long * 4000;
    
    // Home calculation
    let electricityFactor = 0.5;
    if (formData.home.energySource === "renewable") electricityFactor = 0.1;
    else if (formData.home.energySource === "mixed") electricityFactor = 0.3;
    
    const electricityEmissions = formData.home.monthlyElectricity * electricityFactor * 12;
    const gasEmissions = formData.home.monthlyGas * 5 * 12;
    
    // Home size factor
    const homeSizeFactor = 
      formData.home.homeSize === "small" ? 0.7 :
      formData.home.homeSize === "medium" ? 1 : 1.5;
    
    const homeEmissions = (electricityEmissions + gasEmissions) * 
      homeSizeFactor / formData.home.peopleInHousehold;
    
    // Lifestyle calculation
    const dietFactors = {
      vegan: 0.5,
      vegetarian: 0.8,
      pescatarian: 1.1,
      omnivore: 1.5,
    };
    
    const shoppingFactors = {
      minimal: 0.6,
      average: 1,
      frequent: 1.5,
    };
    
    const lifestyleEmissions = 
      1000 * dietFactors[formData.lifestyle.dietType as keyof typeof dietFactors] * 
      shoppingFactors[formData.lifestyle.shoppingHabits as keyof typeof shoppingFactors] * 
      (1 - formData.lifestyle.wasteRecycling / 100 * 0.3);
    
    // Total calculation
    const totalEmissions = Math.round(carEmissions + publicTransportEmissions + flightEmissions + homeEmissions + lifestyleEmissions);
    
    setResult(totalEmissions);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <span>Carbon Footprint Calculator</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-6">
            Estimate your annual carbon footprint by providing information about your lifestyle habits.
            This is a simplified model for demonstration purposes.
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="transportation" className="flex items-center">
                <Car className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Transportation</span>
              </TabsTrigger>
              <TabsTrigger value="home" className="flex items-center">
                <Home className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Home</span>
              </TabsTrigger>
              <TabsTrigger value="lifestyle" className="flex items-center">
                <ShoppingBag className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Lifestyle</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transportation" className="mt-4">
              <div className="space-y-6">
                <div>
                  <Label>Primary vehicle type</Label>
                  <RadioGroup
                    value={formData.transportation.carType}
                    onValueChange={(value) => handleInputChange("transportation", "carType", value)}
                    className="flex flex-col space-y-1 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gasoline" id="gasoline" />
                      <Label htmlFor="gasoline">Gasoline</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hybrid" id="hybrid" />
                      <Label htmlFor="hybrid">Hybrid</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="electric" id="electric" />
                      <Label htmlFor="electric">Electric</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="milesDriven">
                      Annual miles driven
                    </Label>
                    <Input
                      id="milesDriven"
                      type="number"
                      value={formData.transportation.milesDriven}
                      onChange={(e) =>
                        handleInputChange("transportation", "milesDriven", Number(e.target.value))
                      }
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="publicTransport">
                      Annual miles on public transportation
                    </Label>
                    <Input
                      id="publicTransport"
                      type="number"
                      value={formData.transportation.publicTransport}
                      onChange={(e) =>
                        handleInputChange("transportation", "publicTransport", Number(e.target.value))
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Flights per year</h4>
                  <div className="grid gap-4">
                    <div>
                      <div className="flex justify-between">
                        <Label>Short flights (&lt;3 hours)</Label>
                        <span>{formData.transportation.flights.short}</span>
                      </div>
                      <Slider
                        value={[formData.transportation.flights.short]}
                        min={0}
                        max={20}
                        step={1}
                        onValueChange={(value) => handleFlightChange("short", value[0])}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <Label>Medium flights (3-6 hours)</Label>
                        <span>{formData.transportation.flights.medium}</span>
                      </div>
                      <Slider
                        value={[formData.transportation.flights.medium]}
                        min={0}
                        max={20}
                        step={1}
                        onValueChange={(value) => handleFlightChange("medium", value[0])}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <Label>Long flights (&gt;6 hours)</Label>
                        <span>{formData.transportation.flights.long}</span>
                      </div>
                      <Slider
                        value={[formData.transportation.flights.long]}
                        min={0}
                        max={20}
                        step={1}
                        onValueChange={(value) => handleFlightChange("long", value[0])}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="home" className="mt-4">
              <div className="space-y-6">
                <div>
                  <Label>Home energy source</Label>
                  <Select
                    value={formData.home.energySource}
                    onValueChange={(value) => handleInputChange("home", "energySource", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select energy source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Standard Grid</SelectItem>
                      <SelectItem value="mixed">Mixed (Some Renewable)</SelectItem>
                      <SelectItem value="renewable">Fully Renewable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Home size</Label>
                  <Select
                    value={formData.home.homeSize}
                    onValueChange={(value) => handleInputChange("home", "homeSize", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select home size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (Apartment/Small House)</SelectItem>
                      <SelectItem value="medium">Medium (Average House)</SelectItem>
                      <SelectItem value="large">Large (Large House)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="peopleInHousehold">People in household</Label>
                  <Input
                    id="peopleInHousehold"
                    type="number"
                    value={formData.home.peopleInHousehold}
                    onChange={(e) =>
                      handleInputChange("home", "peopleInHousehold", Number(e.target.value))
                    }
                    min={1}
                    className="mt-1"
                  />
                </div>
                
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="monthlyElectricity">Monthly electricity usage (kWh)</Label>
                    <Input
                      id="monthlyElectricity"
                      type="number"
                      value={formData.home.monthlyElectricity}
                      onChange={(e) =>
                        handleInputChange("home", "monthlyElectricity", Number(e.target.value))
                      }
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="monthlyGas">Monthly gas usage (therms)</Label>
                    <Input
                      id="monthlyGas"
                      type="number"
                      value={formData.home.monthlyGas}
                      onChange={(e) =>
                        handleInputChange("home", "monthlyGas", Number(e.target.value))
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="lifestyle" className="mt-4">
              <div className="space-y-6">
                <div>
                  <Label>Diet type</Label>
                  <Select
                    value={formData.lifestyle.dietType}
                    onValueChange={(value) => handleInputChange("lifestyle", "dietType", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select diet type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="pescatarian">Pescatarian</SelectItem>
                      <SelectItem value="omnivore">Omnivore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Shopping habits</Label>
                  <Select
                    value={formData.lifestyle.shoppingHabits}
                    onValueChange={(value) => handleInputChange("lifestyle", "shoppingHabits", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select shopping frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal (Mostly Essentials)</SelectItem>
                      <SelectItem value="average">Average Consumer</SelectItem>
                      <SelectItem value="frequent">Frequent Shopper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <Label>Waste recycling percentage</Label>
                    <span>{formData.lifestyle.wasteRecycling}%</span>
                  </div>
                  <Slider
                    value={[formData.lifestyle.wasteRecycling]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => 
                      handleInputChange("lifestyle", "wasteRecycling", value[0])
                    }
                    className="mt-2"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center mt-4">
            <Button
              onClick={calculateFootprint}
              className="bg-nature-600 hover:bg-nature-700"
              size="lg"
            >
              Calculate My Footprint
            </Button>
          </div>

          {result !== null && (
            <div className="mt-8 bg-muted/50 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Your Estimated Carbon Footprint</h3>
              <p className="text-4xl font-bold text-nature-600 mb-2">{result} kg CO₂e</p>
              <p className="text-sm text-gray-500 mb-4">
                This is approximately your annual carbon emissions based on the information provided.
              </p>
              
              <div className="flex items-center justify-center text-sm text-gray-600">
                <HelpCircle className="h-4 w-4 mr-2" />
                <span>The average person produces about 8,000 kg CO₂e per year.</span>
              </div>
              
              {result > 10000 ? (
                <p className="mt-4 text-amber-600">Your footprint is higher than average. Consider ways to reduce your impact.</p>
              ) : result > 5000 ? (
                <p className="mt-4 text-amber-500">Your footprint is around average. There's room for improvement!</p>
              ) : (
                <p className="mt-4 text-green-600">Your footprint is lower than average. Great job!</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CarbonCalculator;
