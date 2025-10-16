import { Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmergencyBanner = () => {
  return (
    <div className="bg-destructive text-destructive-foreground py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
          <span className="font-semibold">In Crisis? You're Not Alone.</span>
          <div className="flex gap-3">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white text-destructive hover:bg-white/90"
              asChild
            >
              <a href="tel:988" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call 988
              </a>
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white text-destructive hover:bg-white/90"
              asChild
            >
              <a href="https://988lifeline.org/chat/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Chat Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyBanner;
