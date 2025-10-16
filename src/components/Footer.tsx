import { Heart, Mail, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SafeSpace
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              A safe, supportive community for LGBTQ+ youth. You matter, and you're not alone.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/resources" className="hover:text-primary transition-colors">Resources</Link></li>
              <li><Link to="/qa" className="hover:text-primary transition-colors">Q&A</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Crisis Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="tel:988" className="hover:text-primary transition-colors">988 Suicide & Crisis Lifeline</a></li>
              <li><a href="tel:1-866-488-7386" className="hover:text-primary transition-colors">Trevor Project: 1-866-488-7386</a></li>
              <li><a href="sms:678678" className="hover:text-primary transition-colors">Crisis Text Line: Text HOME to 678678</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Your Privacy
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your anonymity and safety are our top priorities. All conversations are confidential.
            </p>
            <a href="mailto:support@safespace.org" className="text-sm text-primary hover:underline flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact Us
            </a>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SafeSpace. All rights reserved. | Made with care for LGBTQ+ youth.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
