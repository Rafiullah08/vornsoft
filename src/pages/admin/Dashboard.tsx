import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, FolderOpen, MessageSquare, Settings } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    posts: 0,
    projects: 0,
    services: 0,
    messages: 0,
    unread: 0,
  });

  useEffect(() => {
    const load = async () => {
      const [posts, projects, services, messages] = await Promise.all([
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("portfolio_projects").select("id", { count: "exact", head: true }),
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id, read", { count: "exact" }),
      ]);

      const unread = (messages.data || []).filter((m: any) => !m.read).length;

      setStats({
        posts: posts.count || 0,
        projects: projects.count || 0,
        services: services.count || 0,
        messages: messages.count || 0,
        unread,
      });
    };

    load();
  }, []);

  const cards = [
    { label: "Blog Posts", value: stats.posts, icon: FileText },
    { label: "Portfolio", value: stats.projects, icon: FolderOpen },
    { label: "Services", value: stats.services, icon: Settings },
    {
      label: "Messages",
      value: `${stats.messages} (${stats.unread} new)`,
      icon: MessageSquare,
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-card rounded-lg border p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{c.label}</span>
              <c.icon size={18} />
            </div>
            <div className="text-2xl font-bold">{c.value}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;