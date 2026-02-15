import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const posts = [
  {
    slug: "future-of-web-development",
    title: "The Future of Web Development in 2026",
    excerpt: "Explore the latest trends shaping the web development landscape, from AI-powered tools to edge computing.",
    date: "Feb 10, 2026",
    category: "Technology",
  },
  {
    slug: "building-scalable-apps",
    title: "Building Scalable Applications from Day One",
    excerpt: "Learn the architectural patterns and best practices for building apps that grow with your business.",
    date: "Jan 28, 2026",
    category: "Engineering",
  },
  {
    slug: "ui-ux-trends",
    title: "UI/UX Design Trends to Watch",
    excerpt: "The design patterns and principles that are defining modern user experiences this year.",
    date: "Jan 15, 2026",
    category: "Design",
  },
  {
    slug: "mobile-first-strategy",
    title: "Why Mobile-First is Still King",
    excerpt: "A deep dive into why mobile-first development remains critical for business success.",
    date: "Jan 5, 2026",
    category: "Strategy",
  },
  {
    slug: "cloud-architecture-guide",
    title: "Cloud Architecture: A Practical Guide",
    excerpt: "From monoliths to microservices — practical advice on choosing the right cloud architecture.",
    date: "Dec 20, 2025",
    category: "DevOps",
  },
  {
    slug: "seo-technical-checklist",
    title: "The Technical SEO Checklist for 2026",
    excerpt: "Everything you need to ensure your web application ranks well in search engines.",
    date: "Dec 10, 2025",
    category: "SEO",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const Blog = () => {
  return (
    <Layout>
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Blog</h1>
            <p className="text-primary-foreground/60 max-w-lg mx-auto">
              Insights, tutorials, and industry perspectives from our team.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-lg border border-border bg-card shadow-card hover:shadow-card-hover transition-all overflow-hidden"
              >
                <div className="h-44 bg-gradient-to-br from-accent/10 to-secondary/20 flex items-center justify-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">{post.category}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <Calendar size={12} /> {post.date}
                  </div>
                  <h2 className="font-semibold text-lg text-card-foreground mb-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                  >
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
