import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Users, Target } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion First",
      description: "Every interaction is guided by empathy and understanding. You deserve to be heard and supported.",
    },
    {
      icon: Shield,
      title: "Safety & Privacy",
      description: "Your anonymity is paramount. We use industry-leading security to protect your identity.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by and for LGBTQ+ youth, with input from mental health professionals and advocates.",
    },
    {
      icon: Target,
      title: "Accessible Support",
      description: "Free, 24/7 access to resources and community support. Help when you need it, where you need it.",
    },
  ];

  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Our Mission
          </h1>
          <p className="text-2xl text-muted-foreground leading-relaxed">
            To provide a safe, supportive, and anonymous space where LGBTQ+ youth can connect, find resources, and know they're never alone.
          </p>
        </div>

        {/* Story Section */}
        <Card className="mb-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-2">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">Why SafeSpace Exists</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                LGBTQ+ youth face unique challenges—from social isolation and family rejection to discrimination and mental health struggles. According to The Trevor Project, LGBTQ+ young people are more than four times as likely to attempt suicide than their peers.
              </p>
              <p>
                SafeSpace was created to address this crisis. We believe every young person deserves a place where they can:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Express themselves without fear of judgment</li>
                <li>Access mental health resources tailored to their needs</li>
                <li>Connect with peers who understand their experiences</li>
                <li>Find immediate help during times of crisis</li>
              </ul>
              <p>
                This platform is more than a website—it's a lifeline, a community, and a reminder that you matter.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Values Grid */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Privacy Section */}
        <Card className="mb-12 border-2 border-primary/20">
          <CardContent className="p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-4">Your Privacy & Safety</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We take your privacy seriously. Here's how we protect you:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>No personal information required:</strong> You can use SafeSpace completely anonymously</li>
                    <li><strong>Encrypted connections:</strong> All data is transmitted securely</li>
                    <li><strong>No tracking:</strong> We don't track your browsing or sell your data</li>
                    <li><strong>Moderated content:</strong> Our team reviews content to ensure a safe environment</li>
                    <li><strong>Report features:</strong> Easy tools to report concerning content or behavior</li>
                  </ul>
                  <p className="text-sm italic mt-6">
                    Note: In cases of imminent danger or legal requirements, we may need to contact emergency services to ensure safety.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Get Involved */}
        <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              SafeSpace is a community effort. Whether you're a mental health professional, advocate, or someone who wants to help, there are ways to contribute.
            </p>
            <p className="text-muted-foreground">
              Interested in volunteering or partnering with us? Contact us at{" "}
              <a href="mailto:support@safespace.org" className="text-primary hover:underline font-semibold">
                support@safespace.org
              </a>
            </p>
          </CardContent>
        </Card>

        {/* Statistics */}
        <section className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-4">Sources & Statistics</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-bold text-primary mb-2">4x</p>
              <p className="text-sm text-muted-foreground">Higher suicide attempt rate among LGBTQ+ youth</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">45%</p>
              <p className="text-sm text-muted-foreground">Seriously considered suicide in the past year</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">73%</p>
              <p className="text-sm text-muted-foreground">Experienced symptoms of anxiety</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-6 italic">
            Source: The Trevor Project National Survey 2023
          </p>
        </section>
      </div>
    </main>
  );
};

export default About;
