
import MainLayout from "@/components/layout/MainLayout";
import CarbonCalculator from "@/components/calculator/CarbonCalculator";

const CalculatorPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Carbon Footprint Calculator</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Understanding your environmental impact is the first step towards reducing it. Use our calculator to estimate your carbon footprint.
        </p>
        
        <CarbonCalculator />
      </div>
    </MainLayout>
  );
};

export default CalculatorPage;
