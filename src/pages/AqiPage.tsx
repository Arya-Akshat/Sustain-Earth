
import MainLayout from "@/components/layout/MainLayout";
import AqiTracker from "@/components/aqi/AqiTracker";

const AqiPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Air Quality Index Tracker</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Monitor the air quality in your area to make informed decisions about outdoor activities
          and understand the environmental impact of air pollution.
        </p>
        
        <AqiTracker />
      </div>
    </MainLayout>
  );
};

export default AqiPage;
