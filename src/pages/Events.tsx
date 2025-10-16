import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";

type EventItem = {
  id: string;
  name: string;
  date: string; // ISO string or friendly
  time: string; // friendly time
  location: string;
  description: string;
  attendees: number;
  link?: string;
  tags: string[];
};

const mockEvents: EventItem[] = [
  {
    id: "1",
    name: "Community Pride Meetup",
    date: "2025-10-20",
    time: "6:00 PM",
    location: "Downtown Community Center",
    description: "A casual meetup for LGBTQ+ folks and allies to connect, share stories, and plan upcoming activities.",
    attendees: 42,
    link: "https://example.org/events/pride-meetup",
    tags: ["meetup", "community", "all-ages"],
  },
  {
    id: "2",
    name: "Trans Wellness Workshop",
    date: "2025-10-22",
    time: "5:30 PM",
    location: "Riverfront Health Clinic",
    description: "Learn practical self-advocacy, navigating healthcare systems, and mental wellness strategies.",
    attendees: 28,
    link: "https://example.org/events/trans-wellness",
    tags: ["workshop", "health", "support"],
  },
  {
    id: "3",
    name: "Queer Film Night",
    date: "2025-10-25",
    time: "7:30 PM",
    location: "Sunset Arts Theater",
    description: "Screening of contemporary queer short films followed by a panel discussion with local creators.",
    attendees: 95,
    link: "https://example.org/events/queer-film-night",
    tags: ["film", "arts", "discussion"],
  },
];

const Events = () => {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Local LGBTQ+ Events</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover what's happening around you. These are mock events for demo purposes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {mockEvents.map((evt) => (
            <Card key={evt.id} className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <CardTitle className="text-2xl mb-1">{evt.name}</CardTitle>
                <CardDescription className="flex flex-wrap items-center gap-4 text-base">
                  <span className="inline-flex items-center gap-2"><Calendar className="w-4 h-4" />{new Date(evt.date).toLocaleDateString()} • {evt.time}</span>
                  <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" />{evt.location}</span>
                  <span className="inline-flex items-center gap-2"><Users className="w-4 h-4" />{evt.attendees} attending</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">{evt.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {evt.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{tag}</span>
                  ))}
                </div>
                {evt.link && (
                  <Button asChild>
                    <a href={evt.link} target="_blank" rel="noopener noreferrer" aria-label={`${evt.name} details`}>
                      View details
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Events;


