
import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ecoTips = [
  "Use reusable bags when shopping to reduce plastic waste.",
  "Turn off lights when leaving a room to save energy.",
  "Choose to walk or bike for short trips instead of driving.",
  "Eat less meat to reduce your carbon footprint.",
  "Use a reusable water bottle instead of buying plastic ones.",
  "Take shorter showers to conserve water.",
  "Plant native species in your garden to support local ecosystems.",
  "Compost food scraps to reduce waste and create nutrient-rich soil.",
  "Wash clothes in cold water to save energy.",
  "Use a programmable thermostat to reduce heating and cooling costs.",
  "Support local farmers and businesses to reduce transportation emissions.",
  "Invest in energy-efficient appliances for your home.",
  "Reduce paper usage by going digital when possible.",
  "Fix leaky faucets to prevent water waste.",
  "Use natural cleaning products to reduce water pollution.",
];

const EcoTipCard = () => {
  const [tip, setTip] = useState("");

  useEffect(() => {
    // Get a random tip when the component mounts
    const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
    setTip(randomTip);
  }, []);

  return (
    <Card className="bg-nature-50 border-nature-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-energy-500" />
          Eco Tip of the Day
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{tip}</p>
      </CardContent>
    </Card>
  );
};

export default EcoTipCard;
