import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Code, Smartphone, Palette, TrendingUp, Shield, Zap, Quote } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import heroBg from "@/assets/hero-bg.jpg";

const services = [
  { icon: Code, title: "Web Development", desc: "High-performance web applications built with cutting-edge technologies." },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native and cross-platform mobile solutions for iOS and Android." },
  { icon: Palette, title: "UI/UX Design", desc: "User-centered design that delivers exceptional digital experiences." },
  { icon: TrendingUp, title: "SEO & Marketing", desc: "Data-driven strategies to boost your online visibility and growth." },
  { icon: Shield, title: "Custom Software", desc: "Tailor-made enterprise solutions to streamline your operations." },
  { icon: Zap, title: "Cloud Solutions", desc: "Scalable cloud infrastructure and DevOps for your business." },
];

const projects = [
  { title: "FinTech Dashboard", category: "Web Application", color: "from-accent/20 to-accent/5" },
  { title: "Health & Wellness App", category: "Mobile App", color: "from-secondary/40 to-secondary/10" },
  { title: "E-Commerce Platform", category: "Full Stack", color: "from-accent/15 to-primary/10" },
];

const testimonials = [
  { name: "Sarah Chen", role: "CEO, TechFlow", text: "NovaTech transformed our digital presence entirely. Their team delivered beyond expectations." },
  { name: "James Miller", role: "CTO, DataCore", text: "Exceptional engineering quality. They built a system that scales seamlessly with our growth." },
  { name: "Maria Rodriguez", role: "Founder, GreenLeaf", text: "Professional, responsive, and incredibly talented. Our app launch was a massive success." },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent/10 text-accent border border-accent/20 mb-6">
              Software Development Company
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight text-balance">
              Building Digital
              <br />
              <span className="text-accent">Solutions</span> That Matter
            </h1>
            <p className="max-w-xl mx-auto text-primary-foreground/60 text-lg mb-10">
              We craft high-performance software, web, and mobile applications that drive business growth and deliver exceptional user experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-md gradient-accent text-accent-foreground font-medium shadow-accent-glow transition-transform hover:scale-105"
              >
                Start a Project <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-md border border-primary-foreground/20 text-primary-foreground font-medium hover:bg-primary-foreground/5 transition-colors"
              >
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading label="What We Do" title="Services We Offer" description="End-to-end digital solutions tailored to your business needs." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-6 rounded-lg border border-border bg-card shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-md gradient-accent flex items-center justify-center mb-4">
                  <s.icon size={20} className="text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-card-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4">
          <SectionHeading light label="Portfolio" title="Featured Projects" description="A selection of our recent work across industries." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative rounded-lg overflow-hidden bg-gradient-to-br ${p.color} aspect-[4/3] flex items-end p-6 cursor-pointer hover:scale-[1.02] transition-transform duration-300`}
              >
                <div>
                  <span className="text-accent text-xs font-semibold uppercase tracking-wider">{p.category}</span>
                  <h3 className="text-xl font-bold text-primary-foreground mt-1">{p.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading label="Why Us" title="Why Choose NovaTech" description="We combine technical excellence with business insight." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "50+", label: "Projects Delivered" },
              { num: "98%", label: "Client Satisfaction" },
              { num: "15+", label: "Team Members" },
              { num: "5+", label: "Years Experience" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-8 rounded-lg border border-border bg-card"
              >
                <div className="text-4xl font-bold text-accent mb-2">{stat.num}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeading label="Testimonials" title="What Our Clients Say" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-lg bg-card border border-border shadow-card"
              >
                <Quote size={24} className="text-accent/30 mb-4" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t.text}</p>
                <div>
                  <div className="font-semibold text-card-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Build Something Great?
            </h2>
            <p className="text-primary-foreground/60 mb-8 max-w-lg mx-auto">
              Let's discuss your next project and bring your vision to life.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-md gradient-accent text-accent-foreground font-medium shadow-accent-glow hover:scale-105 transition-transform"
            >
              Get Started <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
