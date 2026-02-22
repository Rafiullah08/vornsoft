import { motion } from "framer-motion";
import { RefreshCw, XCircle, AlertTriangle, Clock, CheckCircle, Mail, Shield } from "lucide-react";
import Layout from "@/components/Layout";

const RefundPolicy = () => {
  const sections = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Overview",
      content: "At VornSoft, we are committed to delivering high-quality, ethical digital products. To protect our team, our clients, and our reputation, we maintain clear guidelines about project acceptance and a straightforward refund and revision policy.",
    },
    {
      icon: <XCircle className="w-6 h-6" />,
      title: "Prohibited Projects (We Will NOT Build)",
      content: "We reserve the right to decline projects that fall into these categories:",
      list: [
        "Pornographic or sexually explicit content",
        "Illegal content or services (piracy, hacking tools, illegal goods)",
        "Hate speech, violent extremist, or discriminatory content",
        "Scam, phishing, or fraudulent websites",
        "Gambling platforms (unless compliant with local laws)",
        "Copyright-infringing sites (pirated media aggregators)",
        "Adult dating or escort services"
      ],
      highlight: "If your project falls into a gray area, we'll review and inform you of our decision within 2 business days."
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Why We Refuse Certain Projects",
      content: "We decline these projects for legal, ethical, and reputational reasons. Building or hosting unlawful content exposes our team and clients to significant risk and liability. Our commitment is to create technology that makes a positive impact.",
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Revision Policy",
      list: [
        "All packages include revisions as specified in your project agreement",
        "Revisions cover scope changes: styling tweaks, content placement, minor layout adjustments",
        "Major scope changes (new pages, features) are billed separately as additional work",
        "We aim to complete revisions within 3-5 business days"
      ]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Refund Policy",
      list: [
        "Full refund: If we cannot start your project within the agreed timeframe AND you cancel before work begins",
        "Partial refund: If work has started but both parties agree to cancel (amount based on completed work)",
        "No refund: After final delivery when work matches agreed specifications"
      ]
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Conditions That May Invalidate Refunds",
      list: [
        "Client provided incorrect or illegal materials (copyrighted media without permission)",
        "Client repeatedly changes scope without agreeing to revised terms",
        "Project involves prohibited content as outlined above",
        "Client fails to provide feedback/requirements within 14 days"
      ]
    }
  ];

  return (
    <Layout>
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-accent border border-accent/20 mb-4">
              Policies
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Refund & Revision Policy</h1>
            <p className="text-primary-foreground/60 max-w-lg mx-auto">
              Last Updated: February 2026 | Fair, transparent, and client-focused
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border shadow-card"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl gradient-accent flex items-center justify-center flex-shrink-0">
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground mb-4">{section.title}</h2>
                    {section.content && (
                      <p className="text-muted-foreground mb-4">{section.content}</p>
                    )}
                    {section.list && (
                      <ul className="space-y-3">
                        {section.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <span className="text-accent mt-1.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.highlight && (
                      <div className="mt-4 p-4 bg-accent/10 rounded-xl border border-accent/20">
                        <p className="text-accent font-medium">{section.highlight}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* How to Request Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-accent/5 rounded-2xl p-8 border border-accent/20"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Mail className="text-accent" /> How to Request a Refund or Revision
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>1. Contact us via original order thread or email at <a href="mailto:vornsoft@gmail.com" className="text-accent hover:underline">vornsoft@gmail.com</a></p>
                <p>2. Provide your reason and any supporting evidence/screenshots</p>
                <p>3. We'll review your request within 3 business days and propose a solution</p>
              </div>
            </motion.div>

            {/* Additional Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-card rounded-2xl p-6 border border-border"
            >
              <h3 className="font-semibold text-foreground mb-2">Additional Notes</h3>
              <p className="text-sm text-muted-foreground">
                We may refuse or stop work if a project breaches our Acceptable Use Policy. 
                Backups of delivered work are kept for 30 days; please request final files promptly. 
                For any questions, contact us at <a href="mailto:vornsoft@gmail.com" className="text-accent hover:underline">vornsoft@gmail.com</a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RefundPolicy;  // 