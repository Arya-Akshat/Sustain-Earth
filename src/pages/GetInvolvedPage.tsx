
import MainLayout from "@/components/layout/MainLayout";
import GetInvolved from "@/components/get-involved/GetInvolved";

const GetInvolvedPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Get Involved</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          There are many ways to contribute to environmental conservation. Whether you can volunteer your time or provide financial support, every action counts.
        </p>
        
        <GetInvolved />
      </div>
    </MainLayout>
  );
};

export default GetInvolvedPage;
