
import MainLayout from "@/components/layout/MainLayout";
import EcoTipCard from "@/components/widgets/EcoTipCard";
import WeatherWidget from "@/components/widgets/WeatherWidget";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Globe, Wind, BarChart3 } from "lucide-react";
import NewsGrid from "@/components/news/NewsGrid";

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-nature-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Creating a <span className="text-nature-600">Sustainable</span> Future Together
              </h1>
              <p className="text-lg text-gray-600">
                Join our mission to protect the environment, address climate change, and build a 
                greener world for future generations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-nature-600 hover:bg-nature-700">
                  <Link to="/get-involved">Get Involved</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/calculator">Calculate Your Footprint</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1623011188524-2f595e0c9be1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
                alt="Sustainable Earth"
                className="rounded-lg shadow-lg w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Info Widgets Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EcoTipCard />
            <WeatherWidget />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Take Action Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Wind className="h-10 w-10 text-water-500" />}
              title="Air Quality Index"
              description="Check the real-time air quality in your area and make informed decisions."
              link="/aqi"
            />
            <FeatureCard 
              icon={<Globe className="h-10 w-10 text-nature-500" />}
              title="Join Campaigns"
              description="Participate in environmental campaigns making a real difference."
              link="/campaigns"
            />
            <FeatureCard 
              icon={<BarChart3 className="h-10 w-10 text-energy-500" />}
              title="Carbon Footprint"
              description="Calculate your carbon footprint and find ways to reduce it."
              link="/calculator"
            />
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest Environmental News</h2>
            <Button asChild variant="ghost" className="text-nature-700 hover:text-nature-800">
              <Link to="/news" className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <NewsGrid limit={3} />
        </div>
      </section>
    </MainLayout>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const FeatureCard = ({ icon, title, description, link }: FeatureCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button asChild variant="link" className="mt-auto">
        <Link to={link} className="flex items-center">
          Learn More <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default Index;
