import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Layout from "@/components/Layout";

const blogData: Record<string, { title: string; date: string; author: string; category: string; content: string[] }> = {
  "future-of-web-development": {
    title: "The Future of Web Development in 2026",
    date: "Feb 10, 2026",
    author: "Alex Thompson",
    category: "Technology",
    content: [
      "The web development landscape continues to evolve at a rapid pace. In 2026, we're seeing transformative shifts in how applications are built, deployed, and experienced by users.",
      "AI-powered development tools are no longer just assistants — they're becoming integral parts of the development workflow. From code generation to automated testing, AI is accelerating the development cycle significantly.",
      "Edge computing is reshaping application architecture. By processing data closer to the user, applications are achieving unprecedented levels of performance and responsiveness.",
      "WebAssembly continues to mature, enabling near-native performance in the browser. This opens doors for complex applications that were previously only possible as desktop software.",
      "The rise of server components and streaming architectures is changing how we think about rendering strategies, offering the best of both server-side and client-side rendering.",
    ],
  },
  "building-scalable-apps": {
    title: "Building Scalable Applications from Day One",
    date: "Jan 28, 2026",
    author: "Emily Park",
    category: "Engineering",
    content: [
      "Scalability isn't something you bolt on later — it's a mindset that should inform your architecture from the very first line of code.",
      "Start with a clean separation of concerns. Your data layer, business logic, and presentation layer should be clearly delineated, making it easier to scale each independently.",
      "Embrace event-driven architecture early. Message queues and event buses might seem like overkill for a small application, but they provide the foundation for horizontal scaling.",
      "Database design is crucial. Choose the right database for your use case, design your schemas thoughtfully, and plan for data growth from the beginning.",
      "Monitoring and observability aren't optional. Instrument your application from day one so you can identify bottlenecks before they become critical issues.",
    ],
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? blogData[slug] : null;

  if (!post) {
    return (
      <Layout>
        <div className="py-32 text-center bg-background">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-accent hover:underline text-sm">← Back to Blog</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-accent text-xs font-semibold uppercase tracking-wider">{post.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mt-3 mb-4 max-w-3xl mx-auto text-balance">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-primary-foreground/50">
              <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <article className="max-w-2xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-accent hover:underline mb-8">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            <div className="prose prose-sm max-w-none">
              {post.content.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-muted-foreground leading-relaxed mb-5"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </article>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
