import { motion } from "framer-motion";
import { Target, Eye, Heart, Users } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const values = [
  { icon: Target, title: "Excellence", desc: "We deliver nothing less than outstanding quality in every project." },
  { icon: Eye, title: "Innovation", desc: "We stay ahead with the latest technologies and creative solutions." },
  { icon: Heart, title: "Integrity", desc: "Transparency and honesty are at the core of every client relationship." },
  { icon: Users, title: "Collaboration", desc: "We work closely with clients as true partners in their success." },
];

const team = [
  { name: "Alex Thompson", role: "CEO & Founder" },
  { name: "Emily Park", role: "CTO" },
  { name: "David Kim", role: "Lead Designer" },
  { name: "Rachel Torres", role: "Project Manager" },
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
      {/* Header */}
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">About NovaTech</h1>
            <p className="text-primary-foreground/60 max-w-lg mx-auto">
              Building the future of digital, one project at a time.
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
                  Founded in 2020, NovaTech began with a simple belief: that great software should be accessible to every business. What started as a small team of passionate developers has grown into a full-service digital agency.
                </p>
                <p>
                  Today, we partner with startups, SMBs, and enterprises to design and develop digital products that make a real impact. Our team combines deep technical expertise with creative thinking to deliver solutions that exceed expectations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div {...fadeUp} className="p-8 rounded-lg bg-card border border-border shadow-card">
              <h3 className="text-xl font-semibold text-card-foreground mb-3">Our Mission</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To empower businesses with innovative, reliable, and scalable digital solutions that drive measurable growth and lasting success.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="p-8 rounded-lg bg-card border border-border shadow-card">
              <h3 className="text-xl font-semibold text-card-foreground mb-3">Our Vision</h3>
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
                className="text-center p-6 rounded-lg border border-border bg-card"
              >
                <div className="w-12 h-12 rounded-md gradient-accent flex items-center justify-center mx-auto mb-4">
                  <v.icon size={22} className="text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4">
          <SectionHeading light label="Team" title="Meet the Team" description="The people behind NovaTech's success." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <motion.div
                key={t.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 rounded-lg bg-secondary/50 border border-secondary"
              >
                <div className="w-16 h-16 rounded-full bg-accent/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-accent font-bold text-lg">{t.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <h3 className="font-semibold text-primary-foreground text-sm">{t.name}</h3>
                <p className="text-xs text-primary-foreground/50">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
