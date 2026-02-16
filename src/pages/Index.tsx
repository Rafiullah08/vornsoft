import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Smartphone,
  Palette,
  TrendingUp,
  Shield,
  Zap,
  Quote,
  CheckCircle2,
  Users,
  Award,
  Clock,
} from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import heroBg from "@/assets/hero-bg.jpg";

const services = [
  { icon: Code, title: "Web Development", desc: "High-performance web applications built with cutting-edge technologies for speed and scalability." },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native and cross-platform mobile solutions that deliver seamless experiences on iOS and Android." },
  { icon: Palette, title: "UI/UX Design", desc: "User-centered design crafted to maximize engagement and deliver exceptional digital experiences." },
  { icon: TrendingUp, title: "SEO & Marketing", desc: "Data-driven strategies that boost visibility, drive traffic, and accelerate your business growth." },
  { icon: Shield, title: "Custom Software", desc: "Tailor-made enterprise solutions engineered to streamline your operations and cut costs." },
  { icon: Zap, title: "Cloud Solutions", desc: "Scalable cloud infrastructure and DevOps services that grow with your business demands." },
];

const projects = [
  { title: "FinTech Dashboard", category: "Web Application", desc: "Real-time analytics platform for financial data visualization and portfolio management." },
  { title: "Health & Wellness App", category: "Mobile App", desc: "Cross-platform wellness tracker with AI-powered health insights and coaching." },
  { title: "E-Commerce Platform", category: "Full Stack", desc: "High-conversion marketplace with integrated payments, inventory, and logistics." },
];

const testimonials = [
  { name: "Sarah Chen", role: "CEO, TechFlow", text: "NovaTech transformed our digital presence entirely. Their team delivered beyond expectations with remarkable attention to detail." },
  { name: "James Miller", role: "CTO, DataCore", text: "Exceptional engineering quality. They built a system that scales seamlessly with our growth — zero downtime since launch." },
  { name: "Maria Rodriguez", role: "Founder, GreenLeaf", text: "Professional, responsive, and incredibly talented. Our app launch was a massive success thanks to NovaTech's expertise." },
];

const stats = [
  { num: "50+", label: "Projects Delivered", icon: Award },
  { num: "98%", label: "Client Satisfaction", icon: Users },
  { num: "15+", label: "Team Members", icon: CheckCircle2 },
  { num: "5+", label: "Years Experience", icon: Clock },
];

const processSteps = [
  { step: "01", title: "Discovery", desc: "We deep-dive into your vision, goals, and target audience to build a solid project foundation." },
  { step: "02", title: "Strategy & Design", desc: "Wireframes, prototypes, and a clear roadmap — designed for maximum impact and usability." },
  { step: "03", title: "Development", desc: "Agile engineering with regular demos so you're always in the loop and in control." },
  { step: "04", title: "Launch & Support", desc: "Seamless deployment with ongoing optimization, monitoring, and dedicated support." },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, margin: "-50px" },
};

const staggerItem = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Index = () => {
  return (
    <Layout>
      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />

        <div className="relative z-10 container mx-auto px-4 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <span className="inline-block px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent/10 text-accent border border-accent/20 mb-8 backdrop-blur-sm">
              Software Development Company
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-[1.1] text-balance">
              We Build Digital
              <br />
              <span className="text-accent">Products</span> That
              <br />
              Drive Growth
            </h1>
            <p className="max-w-2xl mx-auto text-primary-foreground/60 text-lg md:text-xl mb-12 leading-relaxed">
              From concept to launch, we craft high-performance software, web, and mobile
              applications that deliver measurable results and exceptional user experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md gradient-accent text-accent-foreground font-semibold shadow-accent-glow transition-transform hover:scale-105 text-base"
              >
                Start Your Project <ArrowRight size={18} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md border border-primary-foreground/20 text-primary-foreground font-medium hover:bg-primary-foreground/5 transition-colors text-base"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/20 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-accent"
            />
          </div>
        </motion.div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="relative -mt-16 z-20 pb-8">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 bg-card rounded-xl shadow-card-hover border border-border p-6 md:p-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon size={20} className="text-accent mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{stat.num}</div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="What We Do"
            title="Services We Offer"
            description="End-to-end digital solutions tailored to your unique business needs."
          />
          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((s) => (
              <motion.div
                key={s.title}
                {...staggerItem}
                className="group relative p-7 rounded-xl border border-border bg-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center mb-5 shadow-sm">
                    <s.icon size={22} className="text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-card-foreground group-hover:text-accent transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Process ─── */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="How We Work"
            title="Our Process"
            description="A proven methodology that delivers results on time and on budget."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((p, i) => (
              <motion.div
                key={p.step}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative p-6 rounded-xl bg-card border border-border"
              >
                <span className="text-5xl font-black text-accent/10 absolute top-4 right-5 select-none">
                  {p.step}
                </span>
                <div className="relative">
                  <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center text-accent-foreground text-xs font-bold mb-4">
                    {p.step}
                  </div>
                  <h3 className="font-semibold text-base mb-2 text-card-foreground">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Projects ─── */}
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4">
          <SectionHeading
            light
            label="Portfolio"
            title="Featured Projects"
            description="A selection of our recent work across diverse industries."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-xl overflow-hidden bg-secondary/60 border border-secondary hover:border-accent/30 transition-all duration-300 cursor-pointer"
              >
                <div className="p-7">
                  <span className="text-accent text-xs font-semibold uppercase tracking-wider">
                    {p.category}
                  </span>
                  <h3 className="text-xl font-bold text-primary-foreground mt-2 mb-3 group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-primary-foreground/50 leading-relaxed">{p.desc}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading label="Testimonials" title="What Our Clients Say" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-7 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <Quote size={28} className="text-accent/20 mb-4" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-accent-foreground text-sm font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-28 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.08)_0%,transparent_70%)]" />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div {...fadeUp}>
            <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-accent border border-accent/20 mb-6">
              Let's Talk
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-5 leading-tight">
              Ready to Build Something
              <br />
              <span className="text-accent">Extraordinary?</span>
            </h2>
            <p className="text-primary-foreground/50 mb-10 max-w-lg mx-auto text-lg">
              Let's discuss your next project and bring your vision to life with technology that scales.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md gradient-accent text-accent-foreground font-semibold shadow-accent-glow hover:scale-105 transition-transform text-base"
            >
              Get Started Today <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
