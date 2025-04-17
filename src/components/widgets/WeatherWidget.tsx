
import { useEffect, useState } from "react";
import { Cloud, CloudRain, CloudSnow, Loader2, Sun, CloudLightning } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to weather service
    const fetchWeather = async () => {
      try {
        setLoading(true);
        
        // In a real app, you'd fetch from a weather API
        // For now, we'll simulate a response
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockWeather: WeatherData = {
          location: "Bengaluru, India",
          temperature: 22,
          condition: "Sunny",
          humidity: 60
        };
        
        setWeather(mockWeather);
      } catch (err) {
        setError("Failed to load weather data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-12 w-12 text-energy-400" />;
      case "cloudy":
        return <Cloud className="h-12 w-12 text-gray-400" />;
      case "rainy":
        return <CloudRain className="h-12 w-12 text-water-400" />;
      case "thunderstorm":
        return <CloudLightning className="h-12 w-12 text-gray-600" />;
      case "snowy":
        return <CloudSnow className="h-12 w-12 text-blue-200" />;
      default:
        return <Sun className="h-12 w-12 text-energy-400" />;
    }
  };

  if (loading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Local Weather</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-nature-500" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Local Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Local Weather</CardTitle>
      </CardHeader>
      {weather && (
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">{weather.temperature}°C</p>
              <p className="text-sm text-gray-500">{weather.location}</p>
              <p className="text-sm text-gray-500">Humidity: {weather.humidity}%</p>
            </div>
            <div className="flex items-center">
              {getWeatherIcon(weather.condition)}
              <span className="ml-2">{weather.condition}</span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default WeatherWidget;
