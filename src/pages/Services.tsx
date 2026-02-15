import { motion } from "framer-motion";
import { Code, Smartphone, Palette, TrendingUp, Shield, Settings } from "lucide-react";
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
      {/* Header */}
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Our Services</h1>
            <p className="text-primary-foreground/60 max-w-lg mx-auto">
              Comprehensive digital solutions to take your business to the next level.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-8 rounded-lg border border-border bg-card shadow-card hover:shadow-card-hover transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-md gradient-accent flex items-center justify-center flex-shrink-0">
                    <s.icon size={22} className="text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                    <ul className="flex flex-wrap gap-2">
                      {s.features.map((f) => (
                        <li key={f} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
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
    </Layout>
  );
};

export default Services;
