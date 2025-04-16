
import MainLayout from "@/components/layout/MainLayout";
import CampaignsList from "@/components/campaigns/CampaignsList";

const CampaignsPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Upcoming Campaigns</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Join our environmental campaigns and make a hands-on difference. From tree planting to beach cleanups, your participation matters.
        </p>
        
        <CampaignsList />
      </div>
    </MainLayout>
  );
};

export default CampaignsPage;
