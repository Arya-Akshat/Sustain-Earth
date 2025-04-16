
import MainLayout from "@/components/layout/MainLayout";
import NewsGrid from "@/components/news/NewsGrid";

const NewsPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Environmental News</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Stay informed about the latest environmental news, scientific discoveries, and sustainability initiatives from around the world.
        </p>
        
        <NewsGrid />
      </div>
    </MainLayout>
  );
};

export default NewsPage;
