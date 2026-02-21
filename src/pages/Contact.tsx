import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!form.name.trim()) {
      toast({ title: "Name required", description: "Please enter your name", variant: "destructive" });
      return;
    }
    
    if (!validateEmail(form.email)) {
      toast({ title: "Valid email required", description: "Please enter a valid email address", variant: "destructive" });
      return;
    }
    
    if (!form.message.trim()) {
      toast({ title: "Message required", description: "Please enter your message", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    setSuccess(false);

    try {
      const { error } = await supabase
        .from("contact_submissions")
        .insert([{
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          message: form.message.trim(),
          read: false,
          created_at: new Date().toISOString(),
        }]);

      if (error) throw error;

      // Success
      setSuccess(true);
      toast({ 
        title: "Message sent! 🎉", 
        description: "We'll get back to you within 24 hours." 
      });
      
      setForm({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
      
    } catch (error: any) {
      console.error("Contact form error:", error);
      toast({ 
        title: "Error sending message", 
        description: error.message || "Something went wrong. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-accent border border-accent/20 mb-4">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Get in Touch</h1>
            <p className="text-primary-foreground/60 max-w-lg mx-auto">
              We're here to answer your questions, discuss your ideas, and provide the right digital solutions for your business.
              Reach out to us today — let's build something great together.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                <div className="space-y-5">
                  {[
                    { icon: Mail, label: "Email", value: "Info@vornsoft.com", link: "mailto:Info@vornsoft.com" },
                    { icon: Phone, label: "Phone", value: "+92 263948677", link: "tel:+92263948677" },
                    { icon: MapPin, label: "Location", value: "San Francisco, CA", link: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-2xl gradient-accent flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                        <item.icon size={18} className="text-accent-foreground" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{item.label}</div>
                        {item.link ? (
                          <a 
                            href={item.link}
                            className="text-sm font-semibold text-foreground hover:text-accent transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-sm font-semibold text-foreground">{item.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="p-8 rounded-2xl bg-card border border-border shadow-card">
                {success && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3"
                  >
                    <CheckCircle size={20} className="text-green-600" />
                    <p className="text-sm text-green-600">Message sent successfully! We'll reply within 24 hours.</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="text-sm font-semibold text-foreground mb-2 block">
                      Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                      placeholder="John Doe"
                      disabled={submitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="text-sm font-semibold text-foreground mb-2 block">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                      placeholder="john@example.com"
                      disabled={submitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="text-sm font-semibold text-foreground mb-2 block">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent resize-none transition-all"
                      placeholder="Tell us about your project..."
                      disabled={submitting}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl gradient-accent text-accent-foreground font-semibold shadow-accent-glow hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 w-full sm:w-auto justify-center"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-80 bg-muted flex items-center justify-center">
        <div className="text-center">
          <MapPin size={32} className="text-muted-foreground/30 mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">Google Maps integration available with API key</p>
          <p className="text-xs text-muted-foreground/50 mt-1">Gurumandir Jamshaid Road</p>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;