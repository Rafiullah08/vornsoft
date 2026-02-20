import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { supabase } from "@/integrations/supabase/client";

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  features: string[];
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("published", true)
        .order("display_order");

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error loading services:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName: string | null) => {
    if (!iconName) return Icons.Code;
    return (Icons as any)[iconName] || Icons.Code;
  };

  return (
    <Layout>
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-accent border border-accent/20 mb-4">
              What We Do
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Our Services</h1>
            <h3 className="text-xl text-primary-foreground/80 mb-3">We provide a wide range of Services</h3>
            <p className="text-primary-foreground/60 max-w-lg mx-auto">
              From web and mobile development to branding, marketing, and eCommerce — Vornsoft delivers tailored services designed to help your business grow in the digital world.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((s, i) => {
                const Icon = getIcon(s.icon);
                return (
                  <motion.div
                    key={s.id}
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="group p-8 rounded-2xl border border-border bg-card hover:shadow-card-hover hover:border-accent/20 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                        <Icon size={24} className="text-accent-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                          {s.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {s.description}
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {s.features.map((f) => (
                            <li
                              key={f}
                              className="text-xs px-3 py-1.5 rounded-full bg-accent/10 text-accent font-medium border border-accent/10"
                            >
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {services.length === 0 && !loading && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No services available yet.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Get Started?</h2>
            <p className="text-primary-foreground/50 mb-8 max-w-md mx-auto">Let's discuss how we can help transform your business.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg gradient-accent text-accent-foreground font-semibold shadow-accent-glow hover:scale-105 transition-transform"
            >
              Contact Us <Icons.ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;