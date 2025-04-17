
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  date: string;
  source: string;
  url: string;
  category: string;
}

const mockArticles: NewsArticle[] = [
  {
    id: "1",
    title: "New Study Shows Significant Ocean Warming in the Past Decade",
    summary: "Scientists have found that oceans are warming at an accelerated rate, raising concerns about marine ecosystems.",
    imageUrl: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2NlYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    date: "2024-06-15",
    source: "Environmental Science Journal",
    url: "#",
    category: "Climate"
  },
  {
    id: "2",
    title: "Renewable Energy Surpasses Coal in Power Generation",
    summary: "For the first time in history, renewable energy sources have generated more electricity than coal globally.",
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2luZCUyMHR1cmJpbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    date: "2024-06-10",
    source: "Energy Today",
    url: "#",
    category: "Energy"
  },
  {
    id: "3",
    title: "Biodiversity Loss Accelerating at Unprecedented Rate",
    summary: "A new report warns that species extinction is occurring at an alarming rate, threatening ecosystem stability worldwide.",
    imageUrl: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW1hem9uJTIwcmFpbmZvcmVzdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    date: "2024-06-05",
    source: "Wildlife Conservation Society",
    url: "#",
    category: "Biodiversity"
  },
  {
    id: "4",
    title: "Major Company Commits to Carbon Neutrality by 2025",
    summary: "Tech giant announces ambitious plan to eliminate its carbon footprint and invest in sustainable business practices.",
    imageUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c29sYXIlMjBwYW5lbHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    date: "2024-05-30",
    source: "Business Sustainability",
    url: "#",
    category: "Business"
  },
  {
    id: "5",
    title: "New Plastic-Eating Enzyme Could Revolutionize Recycling",
    summary: "Researchers develop an enzyme that can break down plastic bottles in days instead of centuries.",
    imageUrl: "https://images.unsplash.com/photo-1576062462773-57fccb35f4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVjeWNsaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    date: "2024-05-25",
    source: "Science Innovations",
    url: "#",
    category: "Innovation"
  },
  {
    id: "6",
    title: "Sustainable Cities: The Future of Urban Planning",
    summary: "How cities around the world are implementing green infrastructure for a more sustainable future.",
    imageUrl: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eSUyMHNreWxpbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    date: "2024-05-20",
    source: "Urban Planning Monthly",
    url: "#",
    category: "Urban"
  }
];

interface NewsGridProps {
  category?: string;
  limit?: number;
}

const NewsGrid = ({ category, limit = 6 }: NewsGridProps) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleArticles, setVisibleArticles] = useState(limit);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from a news API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        let filtered = [...mockArticles];
        if (category) {
          filtered = mockArticles.filter(article => article.category === category);
        }
        
        setArticles(filtered);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  const loadMore = () => {
    setVisibleArticles(prev => prev + 3);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-nature-500" />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {articles.slice(0, visibleArticles).map((article) => (
          <Card key={article.id} className="overflow-hidden flex flex-col">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
            </div>
            <CardHeader className="py-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-nature-600 font-semibold">{article.category}</span>
                <span className="text-xs text-gray-500">{article.date}</span>
              </div>
              <h3 className="font-bold text-lg leading-tight hover:text-nature-700 transition-colors">
                <a href={article.url}>{article.title}</a>
              </h3>
            </CardHeader>
            <CardContent className="py-0 flex-grow">
              <p className="text-gray-600 text-sm">{article.summary}</p>
            </CardContent>
            <CardFooter className="py-3 flex justify-between text-xs text-gray-500">
              <span>{article.source}</span>
              <a href={article.url} className="text-nature-600 hover:text-nature-800 font-medium">
                Read More
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {visibleArticles < articles.length && (
        <div className="flex justify-center mt-6">
          <Button onClick={loadMore} variant="outline">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewsGrid;
