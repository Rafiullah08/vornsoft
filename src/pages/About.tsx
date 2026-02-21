import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, ArrowRight, Star, Headphones, Zap, Shield, DollarSign, Brain, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const values = [
  { icon: Target, title: "Excellence", desc: "We deliver nothing less than outstanding quality in every project." },
  { icon: Eye, title: "Innovation", desc: "We stay ahead with the latest technologies and creative solutions." },
  { icon: Heart, title: "Integrity", desc: "Transparency and honesty are at the core of every client relationship." },
  { icon: Users, title: "Collaboration", desc: "We work closely with clients as true partners in their success." },
];

const team = [
  { name: "Rafi Ullah", role: "CEO & Founder" },
  { name: " M Huzaifa", role: "CTO" },
  { name: "Azhar Uddin", role: "Lead Designer" },
  { name: "Talha khan", role: "Project Manager" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const About = () => {
  return (
    <Layout>
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-accent border border-accent/20 mb-4">
              Who We Are
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">About VornSoft</h1>
            <p className="text-primary-foreground/60 max-w-lg mx-auto">
             We are a team of creative minds and tech experts committed to delivering innovative digital solutions. From web and app development to branding and marketing, we help businesses grow and thrive in the digital world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp}>
              <SectionHeading label="Our Story" title="From Vision to Reality" />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
Founded in 2023, VornSoft emerged with a clear mission: to make world-class software development accessible to businesses of every scale. What began as a compact team of passionate engineers has rapidly evolved into a comprehensive digital innovation partner.                </p>
                <p>
Today, we collaborate with forward-thinking startups, dynamic SMBs, and established enterprises to architect and build digital products that drive tangible results. Our team unites deep technical mastery with creative problem-solving, delivering solutions that don't just meet expectations—they redefine them.                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div {...fadeUp} className="group p-8 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover hover:border-accent/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent rounded-l-2xl" />
              <h3 className="text-xl font-bold text-card-foreground mb-3">Our Mission</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To empower businesses with innovative, reliable, and scalable digital solutions that drive measurable growth and lasting success.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="group p-8 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover hover:border-accent/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent rounded-l-2xl" />
              <h3 className="text-xl font-bold text-card-foreground mb-3">Our Vision</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To be the most trusted technology partner for businesses worldwide, known for our commitment to quality, innovation, and client success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading label="Our Values" title="What Drives Us" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group text-center p-8 rounded-2xl border border-border bg-card hover:shadow-card-hover hover:border-accent/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-110 transition-transform">
                  <v.icon size={24} className="text-accent-foreground" />
                </div>
                <h3 className="font-bold text-card-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4">
          <SectionHeading light label="Team" title="Meet the Team" description="The people behind VornSoft's success." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <motion.div
                key={t.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group text-center p-8 rounded-2xl bg-secondary/50 border border-secondary hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-18 h-18 w-[72px] h-[72px] rounded-full bg-accent/15 mx-auto mb-5 flex items-center justify-center border-2 border-accent/20 group-hover:border-accent/40 transition-colors">
                  <span className="text-accent font-bold text-xl">{t.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <h3 className="font-bold text-primary-foreground text-sm mb-1">{t.name}</h3>
                <p className="text-xs text-primary-foreground/50">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading label="Why Us" title="Why Choose Us?" />
          <div className="max-w-3xl mx-auto mb-12">
            <motion.p {...fadeUp} className="text-center text-muted-foreground leading-relaxed">
              At Vornsoft, we combine creativity, technology, and strategy to deliver results that matter. With a focus on quality, transparency, and client satisfaction, we ensure every project is handled with care and expertise — helping you grow with confidence in the digital world.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Star, title: "Best Quality Designs", desc: "Pixel-perfect, modern designs crafted to impress and convert." },
              { icon: Headphones, title: "24x7 Live Support", desc: "Round-the-clock assistance whenever you need us, no delays." },
              { icon: Zap, title: "Fast Delivery", desc: "On-time project delivery without compromising on quality." },
              { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security and 99.9% uptime guaranteed." },
              { icon: DollarSign, title: "Affordable Pricing", desc: "Premium solutions at competitive prices that fit your budget." },
              { icon: Brain, title: "Skilled Minds, Proven Results", desc: "Expert team with years of experience delivering success." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex items-start gap-4 p-6 rounded-2xl border border-border bg-card hover:shadow-card-hover hover:border-accent/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <item.icon size={20} className="text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-card-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Want to Work With Us?</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">We'd love to hear about your next project.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg gradient-accent text-accent-foreground font-semibold shadow-accent-glow hover:scale-105 transition-transform"
            >
              Get in Touch <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
