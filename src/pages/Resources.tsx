import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, MessageSquare, Heart, BookOpen, Video, Users } from "lucide-react";

const Resources = () => {
  const crisisResources = [
    {
      name: "988 Suicide & Crisis Lifeline",
      description: "Free, confidential support 24/7 for people in distress",
      contact: "Call or text 988",
      link: "tel:988",
      icon: Phone,
    },
    {
      name: "The Trevor Project",
      description: "Crisis support for LGBTQ+ young people",
      contact: "Call 1-866-488-7386 or visit for chat/text",
      link: "https://www.thetrevorproject.org/get-help/",
      icon: Phone,
    },
    {
      name: "Crisis Text Line",
      description: "Text-based crisis support",
      contact: "Text HOME to 741741",
      link: "https://www.crisistextline.org/",
      icon: MessageSquare,
    },
    {
      name: "Trans Lifeline",
      description: "Support for trans and questioning individuals",
      contact: "1-877-565-8860",
      link: "tel:1-877-565-8860",
      icon: Phone,
    },
  ];

  const supportResources = [
    {
      title: "Coming Out Resources",
      description: "Guides and support for coming out to family, friends, and yourself",
      icon: Heart,
      links: [
        { label: "PFLAG: Coming Out", url: "https://pflag.org/resource/coming-out/" },
        { label: "HRC: Coming Out Guide", url: "https://www.hrc.org/resources/resource-guide-to-coming-out" },
        { label: "Trevor Project: Coming Out Handbook", url: "https://www.thetrevorproject.org/resources/guide/the-coming-out-handbook/" },
        { label: "The Gender Unicorn (education)", url: "https://www.transstudent.org/gender/" },
      ],
    },
    {
      title: "Mental Health Support",
      description: "Resources for managing anxiety, depression, and other mental health challenges",
      icon: BookOpen,
      links: [
        { label: "NAMI Help & Support", url: "https://www.nami.org/help" },
        { label: "APA Psychologist Locator", url: "https://locator.apa.org/" },
        { label: "MentalHealth.gov", url: "https://www.mentalhealth.gov/" },
        { label: "HelpGuide: LGBTQ+ Mental Health", url: "https://www.helpguide.org/articles/abuse/lgbtq-issues.htm" },
      ],
    },
    {
      title: "Educational Content",
      description: "Learn about LGBTQ+ identities, rights, and history",
      icon: Video,
      links: [
        { label: "GLSEN: Educator Resources", url: "https://www.glsen.org/resources" },
        { label: "GLAAD: Media Reference Guide", url: "https://www.glaad.org/reference" },
        { label: "HRC: LGBTQ+ Definitions", url: "https://www.hrc.org/resources/terminology" },
        { label: "Planned Parenthood: Sexual Orientation & Gender", url: "https://www.plannedparenthood.org/learn/sexual-orientation-gender" },
      ],
    },
    {
      title: "Community Building",
      description: "Find local and online LGBTQ+ communities and support groups",
      icon: Users,
      links: [
        { label: "PFLAG Chapter Finder", url: "https://pflag.org/find/" },
        { label: "TrevorSpace (13–24)", url: "https://www.trevorspace.org/" },
        { label: "Q Chat Space (13–19)", url: "https://www.qchatspace.org/" },
        { label: "Reddit: r/lgbt", url: "https://www.reddit.com/r/lgbt/" },
      ],
    },
  ];

  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Resources & Support
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you need immediate help or just want to learn more, we've gathered the best resources to support you.
          </p>
        </div>

        {/* Crisis Resources */}
        <section className="mb-20">
          <div className="bg-destructive/10 border-2 border-destructive/30 rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold mb-2 text-destructive">Need Immediate Help?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              If you're in crisis or thinking about harming yourself, please reach out now. These services are free, confidential, and available 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {crisisResources.map((resource, index) => (
              <Card key={index} className="border-2 hover:border-destructive/50 transition-all">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-destructive/10 rounded-full">
                      <resource.icon className="w-6 h-6 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{resource.name}</CardTitle>
                      <CardDescription className="text-base">{resource.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-destructive hover:bg-destructive/90"
                    asChild
                  >
                    <a href={resource.link} target="_blank" rel="noopener noreferrer" aria-label={`${resource.name} - ${resource.contact}`}>
                      {resource.contact}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Support Resources */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Additional Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of resources covering various aspects of LGBTQ+ life and wellbeing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {supportResources.map((resource, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <resource.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                      <CardDescription className="text-base mb-4">{resource.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-muted-foreground">Recommended links:</p>
                    <div className="flex flex-wrap gap-2">
                      {resource.links.map((link, idx) => (
                        <Button key={idx} variant="outline" asChild>
                          <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${resource.title} - ${link.label}`}>
                            {link.label}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-20">
          <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Can't Find What You Need?</h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our anonymous Q&A community is here to help. Ask questions and get support from peers who understand.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link to="/qa" aria-label="Visit Q&A Community">Visit Q&A Community</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default Resources;
