import { motion } from "framer-motion";
import { Code, Smartphone, Palette, TrendingUp, Shield, Settings, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const services = [
  {
    icon: Code,
    title: "Web Development",
    desc: "We build fast, scalable web applications using React, TypeScript, and modern frameworks. From SPAs to complex platforms.",
    features: ["React & Next.js", "TypeScript", "Performance Optimization", "Progressive Web Apps"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile apps for iOS and Android that deliver seamless user experiences.",
    features: ["React Native", "iOS & Android", "App Store Optimization", "Push Notifications"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "User-centered design methodology that creates intuitive, beautiful interfaces driving engagement and conversions.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    icon: TrendingUp,
    title: "SEO & Digital Marketing",
    desc: "Data-driven marketing strategies and technical SEO to increase your visibility, traffic, and conversions.",
    features: ["Technical SEO", "Content Strategy", "Analytics", "Conversion Optimization"],
  },
  {
    icon: Shield,
    title: "Custom Software Solutions",
    desc: "Enterprise-grade custom software tailored to your unique business processes and requirements.",
    features: ["Requirements Analysis", "Architecture Design", "Integration", "Maintenance"],
  },
  {
    icon: Settings,
    title: "Cloud & DevOps",
    desc: "Scalable cloud infrastructure, CI/CD pipelines, and DevOps practices for reliable deployments.",
    features: ["AWS / GCP / Azure", "Docker & Kubernetes", "CI/CD Pipelines", "Monitoring"],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const Services = () => {
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
From web and mobile development to branding, marketing, and eCommerce — Vornsoft delivers tailored services designed to help your business grow in the digital world.            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-8 rounded-2xl border border-border bg-card hover:shadow-card-hover hover:border-accent/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                    <s.icon size={24} className="text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                    <ul className="flex flex-wrap gap-2">
                      {s.features.map((f) => (
                        <li key={f} className="text-xs px-3 py-1.5 rounded-full bg-accent/10 text-accent font-medium border border-accent/10">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              Contact Us <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
