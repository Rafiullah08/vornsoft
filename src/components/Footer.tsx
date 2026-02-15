import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Nova<span className="text-accent">Tech</span>
            </h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              We build world-class digital solutions that drive growth and transform businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/80">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Services", "About", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-sm text-primary-foreground/60 hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/80">Services</h4>
            <ul className="space-y-2">
              {["Web Development", "Mobile Apps", "UI/UX Design", "SEO & Marketing", "Custom Software"].map((s) => (
                <li key={s}>
                  <span className="text-sm text-primary-foreground/60">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/80">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <Mail size={14} className="text-accent" /> hello@novatech.dev
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <Phone size={14} className="text-accent" /> +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <MapPin size={14} className="text-accent" /> San Francisco, CA
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary mt-12 pt-8 text-center">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} NovaTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
