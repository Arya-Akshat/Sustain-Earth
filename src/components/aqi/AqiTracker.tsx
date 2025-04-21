
import { useState } from "react";
import { Search, Wind, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import axios from 'axios'

interface AqiData {
  healthImpactClass: string
  location: string;
  aqi: number;
  category: string;
  pollutants: {
    pm25: number;
    pm10: number;
    temperature: number;
    humidity: number;
  };
}

const AqiTracker = () => {
  const [location, setLocation] = useState("");
  const [aqiData, setAqiData] = useState<AqiData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location.trim()) {
      setError("Please enter a location");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would fetch from an AQI API
      // For now, we'll simulate a response based on the location
      // await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await axios.get('http://localhost:5000?city='+location);
      
      // Mock data for demonstration
      let mockData: AqiData = response.data;
      console.log(mockData);
      
      // Set category based on AQI value
      if (mockData.aqi <= 50) mockData.category = "Good";
      else if (mockData.aqi <= 100) mockData.category = "Moderate";
      else if (mockData.aqi <= 150) mockData.category = "Unhealthy for Sensitive Groups";
      else if (mockData.aqi <= 200) mockData.category = "Unhealthy";
      else if (mockData.aqi <= 300) mockData.category = "Very Unhealthy";
      else mockData.category = "Hazardous";
      
      setAqiData(mockData);
    } catch (err) {
      setError("Failed to fetch air quality data");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return "bg-green-500";
    if (aqi <= 100) return "bg-yellow-500";
    if (aqi <= 150) return "bg-orange-500";
    if (aqi <= 200) return "bg-red-500";
    if (aqi <= 300) return "bg-purple-500";
    return "bg-red-900";
  };

  const getAqiAdvice = (category: string) => {
    switch (category) {
      case "Good":
        return "Air quality is considered satisfactory and air pollution poses little or no risk.";
      case "Moderate":
        return "Air quality is acceptable; however, some pollutants may be a concern for a small number of people who are sensitive to air pollution.";
      case "Unhealthy for Sensitive Groups":
        return "Members of sensitive groups may experience health effects. The general public is not likely to be affected.";
      case "Unhealthy":
        return "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
      case "Very Unhealthy":
        return "Health warnings of emergency conditions. The entire population is more likely to be affected.";
      case "Hazardous":
        return "Health alert: everyone may experience more serious health effects.";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wind className="mr-2 h-5 w-5" />
            Air Quality Index Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Enter city or location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
              {!loading && <Search className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          {error && (
            <div className="text-destructive flex items-center mb-4">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span>{error}</span>
            </div>
          )}

          {aqiData && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Air Quality in {aqiData.location}</h3>
              
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">AQI: {aqiData.aqi}</span>
                  <span className="font-medium">{aqiData.category}</span>
                </div>
                <Progress
                  value={(aqiData.aqi / 500) * 100}
                  className={`h-3 ${getAqiColor(aqiData.aqi)}`}
                />
              </div>
              
              <p className="text-sm mb-4">{getAqiAdvice(aqiData.category)}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-500">PM2.5</p>
                  <p className="font-medium">{aqiData.pollutants.pm25} µg/m³</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-500">PM10</p>
                  <p className="font-medium">{aqiData.pollutants.pm10} µg/m³</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-500">Temperatue (in Celcius)</p>
                  <p className="font-medium">{aqiData.pollutants.temperature} Celcius</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-500">Humidity</p>
                  <p className="font-medium">{aqiData.pollutants.humidity} %</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        {aqiData && (
          <CardFooter className="text-sm text-black-500 border-t pt-4">
          <p>{aqiData.healthImpactClass} :  </p>
          <br /> {/* Line break between two paragraphs */}
          <p>
                
            {aqiData.healthImpactClass === "High Impact Risk" && "Lung Cancer, Ischemic Stroke, Acute Myocardial Infarction (Heart Attack)"}
            {aqiData.healthImpactClass === "Very High Impact Risk" && "Chronic Obstructive Pulmonary Disease (COPD),Emphysema,Chronic Bronchitis"}
            {aqiData.healthImpactClass === "Moderate Impact Risk" && "Hypertension (High Blood Pressure), Atherosclerosis, Ischemic Heart Disease."}
            {aqiData.healthImpactClass === "Low Impact Risk" && "Chronic Bronchitis, Persistent Asthma, Bronchiolitis Obliterans"}
            {aqiData.healthImpactClass === "Very Low Impact Risk" && "Allergic Rhinitis,Acute Pharyngitis,Conjunctivitis"}
          </p>        
        </CardFooter>
        
        )}
      </Card>
    </div>
  );
};

export default AqiTracker;
