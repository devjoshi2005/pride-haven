import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Users, MessageCircle, BookOpen, Phone } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import mentalHealthImage from "@/assets/mental-health.jpg";
import communityImage from "@/assets/community.jpg";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Safe & Anonymous",
      description: "Your privacy is protected. Share freely without fear of judgment or exposure.",
    },
    {
      icon: Users,
      title: "Supportive Community",
      description: "Connect with peers who understand your journey and experiences.",
    },
    {
      icon: MessageCircle,
      title: "Anonymous Q&A",
      description: "Ask questions and get support from the community, completely anonymously.",
    },
    {
      icon: BookOpen,
      title: "Mental Health Resources",
      description: "Access curated resources, articles, and professional support information.",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                You're Not Alone.{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  You're Valued.
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                A safe, supportive space for LGBTQ+ youth to connect, share, and find the help they need. Anonymous, judgment-free, and always here for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg" asChild>
                  <Link to="/resources">Explore Resources</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg" asChild>
                  <Link to="/qa">Join Q&A Community</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <img 
                src={heroImage} 
                alt="Supportive community illustration" 
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-6 bg-destructive/10 border-y border-destructive/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <Phone className="w-6 h-6 text-destructive" />
            <p className="text-lg">
              <span className="font-semibold">In immediate crisis?</span> Call or text{" "}
              <a href="tel:988" className="font-bold text-destructive underline hover:no-underline">
                988
              </a>{" "}
              for free, confidential support 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How We Support You</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to feel supported, safe, and understood.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <img 
                src={mentalHealthImage} 
                alt="Mental health resources" 
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Mental Health Resources</h2>
              <p className="text-lg text-muted-foreground">
                Access a comprehensive library of mental health resources, crisis support contacts, and evidence-based self-care strategies. Our curated collection is designed specifically for LGBTQ+ youth navigating unique challenges.
              </p>
              <Button size="lg" asChild>
                <Link to="/resources">Browse Resources</Link>
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 lg:order-2">
              <h2 className="text-4xl font-bold">Anonymous Community Q&A</h2>
              <p className="text-lg text-muted-foreground">
                Ask questions, share experiences, and support others—all while staying completely anonymous. Our moderated community ensures a safe, respectful space for everyone.
              </p>
              <Button size="lg" asChild>
                <Link to="/qa">Join the Conversation</Link>
              </Button>
            </div>
            <div className="lg:order-1">
              <img 
                src={communityImage} 
                alt="Community support" 
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2">
            <CardContent className="p-12 text-center">
              <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">You Deserve Support</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Whether you're struggling today or just need someone who understands, SafeSpace is here for you. Take the first step toward feeling better.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <Link to="/resources">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Index;
