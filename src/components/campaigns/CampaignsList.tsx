
import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Campaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  location: string;
  participants: number;
  maxParticipants: number | null;
  category: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Community Tree Planting Day",
    description: "Join us for a day of tree planting in the city park. Help us improve air quality and beautify our community. All materials will be provided. Please bring water and wear appropriate clothing.",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80",
    date: "2025-10-15T09:00:00",
    location: "Central Park, Delhi",
    participants: 28,
    maxParticipants: 50,
    category: "Reforestation"
  },
  {
    id: "2",
    title: "Beach Cleanup Initiative",
    description: "Help clean up our local beaches from plastic and other waste. This event is suitable for all ages. Gloves, bags, and trash pickers will be provided.",
    imageUrl: "https://images.unsplash.com/photo-1618477462146-050d2757350d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    date: "2025-10-22T10:00:00",
    location: "Thorn Beach, Goa",
    participants: 45,
    maxParticipants: 100,
    category: "Cleanup"
  },
  {
    id: "3",
    title: "Urban Garden Workshop",
    description: "Learn how to start your own urban garden even in small spaces. Includes a seed exchange and information on sustainable gardening practices.",
    imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    date: "2025-11-05T14:00:00",
    location: "Community Center, Mumbai",
    participants: 18,
    maxParticipants: 30,
    category: "Education"
  },
  {
    id: "4",
    title: "River Restoration Project",
    description: "Join this multi-day project to help restore our local river ecosystem. Activities include debris removal, native plant planting, and water quality testing.",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    date: "2025-11-18T08:00:00",
    location: "Ganga River, Uttar Pradesh",
    participants: 12,
    maxParticipants: 40,
    category: "Restoration"
  }
];

const CampaignsList = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockCampaigns.map((campaign) => (
        <Card key={campaign.id} className="overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={campaign.imageUrl}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{campaign.title}</CardTitle>
              <Badge variant="outline" className="bg-nature-50 text-nature-700 border-nature-200">
                {campaign.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{campaign.description}</p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(campaign.date)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{campaign.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-2" />
                <span>
                  {campaign.participants} joined
                  {campaign.maxParticipants && ` (${campaign.maxParticipants - campaign.participants} spots left)`}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-nature-600 hover:bg-nature-700 w-full">
              Register to Volunteer
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CampaignsList;
