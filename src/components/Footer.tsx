import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Facebook, Instagram, Globe } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github size={18} />, href: "https://github.com/vornsoft", label: "GitHub" },
    { icon: <Linkedin size={18} />, href: "https://linkedin.com/company/vornsoft", label: "LinkedIn" },
    { icon: <Twitter size={18} />, href: "https://twitter.com/vornsoft", label: "Twitter" },
    { icon: <Facebook size={18} />, href: "https://www.facebook.com/profile.php?id=61579079308083", label: "Facebook" },
    { icon: <Instagram size={18} />, href: "https://instagram.com/vornsoft", label: "Instagram" },
  ];

  const quickLinks = [
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Refund Policy", path: "/refund-policy" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    "Web Development",
    "Mobile Apps", 
    "UI/UX Design",
    "SEO & Marketing",
    "Custom Software",
    "Cloud Solutions"
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-lg">
                <span className="text-accent-foreground font-black text-lg">V</span>
              </div>
              <h3 className="text-2xl font-bold">
                Vorn<span className="text-accent">Soft</span>
              </h3>
            </div>
            
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
            We build world-class digital solutions that drive growth and transform businesses.
            Every line of code is crafted with purpose, every design with intention.
            We're not just developers — we're your partners in digital success.
            </p>

            {/* Social Links - نئے انداز میں */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-primary-foreground/5 hover:bg-accent/20 border border-primary-foreground/10 flex items-center justify-center text-primary-foreground/60 hover:text-accent transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-primary-foreground/80 border-b border-primary-foreground/10 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-primary-foreground/60 hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent/60 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-primary-foreground/80 border-b border-primary-foreground/10 pb-2">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-primary-foreground/60 hover:text-accent transition-colors cursor-default flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent/60"></span>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-primary-foreground/80 border-b border-primary-foreground/10 pb-2">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/60 group">
                <Mail size={16} className="text-accent mt-0.5 group-hover:scale-110 transition-transform" />
                <a href="mailto:info@vornsoft.com" className="hover:text-accent transition-colors">
                  info@vornsoft.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/60 group">
                <Phone size={16} className="text-accent mt-0.5 group-hover:scale-110 transition-transform" />
                <a href="tel:+92263948677" className="hover:text-accent transition-colors">
                  +92 263948677
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/60 group">
                <MapPin size={16} className="text-accent mt-0.5 group-hover:scale-110 transition-transform" />
                <span>San Francisco, CA</span>
              </li>
            </ul>

            {/* Newsletter (Optional) */}
            <div className="mt-6">
              <p className="text-xs text-primary-foreground/40 mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-xs rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent/50"
                />
                <button className="px-3 py-2 rounded-lg gradient-accent text-accent-foreground text-xs font-medium hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-primary-foreground/40">
              © {currentYear} VornSoft. All rights reserved. | 
              <Link to="/privacy" className="hover:text-accent transition-colors ml-1">Privacy</Link> | 
              <Link to="/refund-policy" className="hover:text-accent transition-colors ml-1">Refund Policy</Link>
            </p>
            
            {/* Social Links - Mobile view mein neeche بھی */}
            <div className="flex items-center gap-3 md:hidden">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-primary-foreground/5 hover:bg-accent/20 flex items-center justify-center text-primary-foreground/60 hover:text-accent transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <p className="text-xs text-primary-foreground/40">
              Designed with ❤️ by VornSoft
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;