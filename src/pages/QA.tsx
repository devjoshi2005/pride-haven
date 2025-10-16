import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ThumbsUp, Search, Shield } from "lucide-react";

const QA = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample questions - in a real app, these would come from a database
  const sampleQuestions = [
    {
      id: 1,
      question: "How do I come out to my parents?",
      excerpt: "I'm 16 and want to come out to my parents but I'm scared...",
      replies: 12,
      upvotes: 24,
      category: "Coming Out",
      timeAgo: "2 hours ago",
    },
    {
      id: 2,
      question: "Resources for trans youth?",
      excerpt: "Looking for resources about transitioning and finding supportive doctors...",
      replies: 8,
      upvotes: 18,
      category: "Trans Issues",
      timeAgo: "5 hours ago",
    },
    {
      id: 3,
      question: "Dealing with school bullying",
      excerpt: "I'm being bullied at school for being gay. What can I do?",
      replies: 15,
      upvotes: 31,
      category: "Support",
      timeAgo: "1 day ago",
    },
    {
      id: 4,
      question: "Finding LGBTQ+ friends",
      excerpt: "I don't know any other LGBTQ+ people my age. How can I meet people?",
      replies: 20,
      upvotes: 42,
      category: "Community",
      timeAgo: "2 days ago",
    },
  ];

  const categories = ["All", "Coming Out", "Support", "Trans Issues", "Community", "Mental Health"];

  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Anonymous Q&A
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Ask questions, share experiences, and support others in a safe, moderated space. Everything here is anonymous and confidential.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span>Your identity is protected. No personal information is collected or shared.</span>
          </div>
        </div>

        {/* New Question Card */}
        <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="text-2xl">Ask a Question</CardTitle>
            <CardDescription>
              Get support from the community. Your question will be posted anonymously.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              placeholder="Question title (e.g., 'How do I come out to my family?')" 
              className="text-lg"
            />
            <Textarea 
              placeholder="Provide more details about your question or situation..."
              className="min-h-[120px]"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <select className="flex h-10 w-full sm:w-48 rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option>Select category</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
              <Button className="bg-primary hover:bg-primary/90 sm:ml-auto">
                Post Question Anonymously
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10 hover:border-primary whitespace-nowrap"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {sampleQuestions.map((q) => (
            <Card key={q.id} className="border-2 hover:border-primary/30 transition-all cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{q.question}</CardTitle>
                    <CardDescription className="text-base">{q.excerpt}</CardDescription>
                  </div>
                  <Badge variant="secondary">{q.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{q.replies} replies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{q.upvotes} helpful</span>
                  </div>
                  <span className="ml-auto">{q.timeAgo}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guidelines */}
        <Card className="mt-12 bg-muted/50">
          <CardHeader>
            <CardTitle>Community Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Be respectful and supportive of all community members</li>
              <li>• Keep discussions focused on helping and supporting others</li>
              <li>• Report any concerning content or behavior to moderators</li>
              <li>• Remember that everyone is anonymous - focus on the message, not the person</li>
              <li>• If you're in crisis, please contact a crisis helpline immediately</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default QA;
