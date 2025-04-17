
import { Heart, DollarSign, Share2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GetInvolved = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="volunteer" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="volunteer" className="flex items-center">
            <Heart className="mr-2 h-4 w-4" />
            Volunteer
          </TabsTrigger>
          <TabsTrigger value="donate" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            Donate
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="volunteer" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Volunteer with SustainEarth</CardTitle>
              <CardDescription>
                Join our global community of volunteers making a real difference for our planet.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Why Volunteer?</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Make a tangible impact on environmental issues</li>
                  <li>Connect with like-minded individuals in your community</li>
                  <li>Learn new skills and gain valuable experience</li>
                  <li>Be part of global solutions to climate change</li>
                  <li>Have fun while making a difference</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-2">Volunteer Opportunities</h3>
                <div className="grid gap-4">
                  <VolunteerOption 
                    title="Event Volunteer" 
                    description="Help organize and run our environmental events, from cleanups to workshops."
                    time="Flexible, 4-8 hours per event"
                  />
                  <VolunteerOption 
                    title="Community Educator" 
                    description="Share environmental knowledge with schools, community centers, and at public events."
                    time="2-4 hours per week"
                  />
                  <VolunteerOption 
                    title="Restoration Volunteer" 
                    description="Get your hands dirty restoring habitats, planting trees, and cleaning waterways."
                    time="Weekend projects, 3-6 hours"
                  />
                  <VolunteerOption 
                    title="Digital Volunteer" 
                    description="Support our online presence through content creation, research, and social media."
                    time="Flexible, remote work"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-nature-600 hover:bg-nature-700">
                Sign Up to Volunteer
              </Button>
              
              <div className="flex justify-center w-full">
                <Button variant="outline" className="flex items-center">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Opportunities
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="donate" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Support Our Mission</CardTitle>
              <CardDescription>
                Your donation helps us continue our work protecting the environment for future generations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Where Your Money Goes</h3>
                <div className="space-y-4">
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="font-medium">Conservation Projects</h4>
                    <p className="text-sm text-gray-600">40% of donations fund direct environmental restoration and protection projects.</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="font-medium">Education & Outreach</h4>
                    <p className="text-sm text-gray-600">30% supports our educational programs and community outreach initiatives.</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="font-medium">Advocacy</h4>
                    <p className="text-sm text-gray-600">20% powers our advocacy work for environmental policy changes.</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="font-medium">Operations</h4>
                    <p className="text-sm text-gray-600">10% covers essential administrative costs to keep our organization running.</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Ways to Donate</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="bg-nature-600 hover:bg-nature-700 h-auto py-6 flex flex-col">
                    <span className="text-lg font-medium">One-time Donation</span>
                    <span className="text-xs mt-1">Support our work with a single contribution</span>
                  </Button>
                  <Button className="bg-water-600 hover:bg-water-700 h-auto py-6 flex flex-col">
                    <span className="text-lg font-medium">Monthly Giving</span>
                    <span className="text-xs mt-1">Provide sustained support as a monthly donor</span>
                  </Button>
                </div>
              </div>
            </CardContent>
            
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface VolunteerOptionProps {
  title: string;
  description: string;
  time: string;
}

const VolunteerOption = ({ title, description, time }: VolunteerOptionProps) => {
  return (
    <div className="bg-muted rounded-lg p-4">
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="flex items-center text-xs text-gray-500">
        <Clock className="h-3 w-3 mr-1" />
        <span>{time}</span>
      </div>
    </div>
  );
};

export default GetInvolved;
