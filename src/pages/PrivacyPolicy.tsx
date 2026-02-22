import { motion } from "framer-motion";
import { Shield, Lock, Eye, Mail, Cookie, FileText } from "lucide-react";
import Layout from "@/components/Layout";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Who We Are",
      content: "At VornSoft, your privacy is our priority. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or use our services. By accessing our platform, you consent to the practices described in this policy.",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Information We Collect",
      content: "We may collect the following types of information:",
      list: [
        "Personal Information: Name, email address, phone number, company name, billing details",
        "Usage Data: IP address, browser type, device information, pages visited, time spent",
        "Cookies & Tracking: To enhance your browsing experience and analyze site performance"
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: "Your data helps us deliver better services:",
      list: [
        "Provide and manage our services effectively",
        "Respond to your inquiries and offer customer support",
        "Improve website functionality and user experience",
        "Send updates, newsletters (only if you opt-in)",
        "Analyze user behavior for performance optimization"
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Information Sharing",
      content: "We value your trust. We do not sell, rent, or trade your personal data. Limited sharing occurs only with:",
      list: [
        "Trusted third-party service providers (hosting, email, analytics)",
        "Legal authorities when required by applicable law",
        "Business partners with your explicit consent"
      ]
    },
    {
      icon: <Cookie className="w-6 h-6" />,
      title: "Cookies Policy",
      content: "Cookies help us provide a personalized experience. We use them to:",
      list: [
        "Keep you securely logged in",
        "Remember your preferences and settings",
        "Analyze traffic via Google Analytics",
        "You can disable cookies through browser settings"
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Your Data Protection Rights",
      content: "Depending on your location, you may have the right to:",
      list: [
        "Access your personal data we hold",
        "Request correction or deletion",
        "Object to processing or request portability",
        "Withdraw consent at any time"
      ]
    }
  ];

  return (
    <Layout>
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-accent border border-accent/20 mb-4">
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Privacy Policy</h1>
            <p className="text-primary-foreground/60 max-w-lg mx-auto">
              Last Updated: February 2026 | Your trust is our foundation
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-10">
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
                    <p className="text-muted-foreground mb-3">{section.content}</p>
                    {section.list && (
                      <ul className="space-y-2">
                        {section.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <span className="text-accent mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-accent/5 rounded-2xl p-8 border border-accent/20"
            >
              <div className="flex items-center gap-4">
                <Mail className="w-8 h-8 text-accent" />
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Questions About Your Privacy?</h3>
                  <p className="text-muted-foreground">
                    We're here to help. Contact us at{" "}
                    <a href="mailto:vornsoft@gmail.com" className="text-accent hover:underline">
                      vornsoft@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;  // ✅ 