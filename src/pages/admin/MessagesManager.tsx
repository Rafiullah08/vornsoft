import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, MailOpen, Trash2, RefreshCw, User, Calendar } from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

const MessagesManager = () => {
  const [messages, setMessages] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages((data as Submission[]) || []);
    } catch (error: any) {
      toast({ 
        title: "Error loading messages", 
        description: error.message, 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const markRead = async (msg: Submission) => {
    if (!msg.read) {
      try {
        const { error } = await supabase
          .from("contact_submissions")
          .update({ read: true })
          .eq("id", msg.id);

        if (error) throw error;
        
        // Update local state
        setMessages(prev => 
          prev.map(m => m.id === msg.id ? { ...m, read: true } : m)
        );
      } catch (error: any) {
        toast({ 
          title: "Error updating message", 
          description: error.message, 
          variant: "destructive" 
        });
      }
    }
    setSelected(msg);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const { error } = await supabase
        .from("contact_submissions")
        .delete()
        .eq("id", id);

      if (error) throw error;

      if (selected?.id === id) setSelected(null);
      toast({ title: "Message deleted successfully" });
      load();
    } catch (error: any) {
      toast({ 
        title: "Error deleting message", 
        description: error.message, 
        variant: "destructive" 
      });
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Contact Messages</h1>
        <button
          onClick={load}
          className="p-2 rounded-md hover:bg-muted transition-colors"
          title="Refresh"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-card border border-border rounded-lg overflow-hidden flex flex-col">
          <div className="p-3 border-b border-border bg-muted/30">
            <p className="text-sm font-medium">
              {messages.filter(m => !m.read).length} unread / {messages.length} total
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {loading && messages.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              messages.map((m) => (
                <button
                  key={m.id}
                  onClick={() => markRead(m)}
                  className={`w-full text-left p-4 hover:bg-muted/50 transition-colors ${
                    selected?.id === m.id ? "bg-muted/50" : ""
                  } ${!m.read ? "bg-accent/5" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {m.read ? (
                        <MailOpen size={16} className="text-muted-foreground" />
                      ) : (
                        <Mail size={16} className="text-accent" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm truncate ${!m.read ? "font-semibold text-foreground" : "text-foreground"}`}>
                          {m.name}
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {formatDate(m.created_at)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mb-1">{m.email}</p>
                      <p className="text-xs text-muted-foreground/70 truncate">{m.message}</p>
                    </div>
                  </div>
                </button>
              ))
            )}
            
            {!loading && messages.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                <Mail size={32} className="mx-auto mb-3 text-muted-foreground/30" />
                <p className="text-sm">No messages yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg overflow-hidden flex flex-col">
          {selected ? (
            <>
              <div className="p-6 border-b border-border bg-muted/30">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-1">{selected.name}</h2>
                    <a 
                      href={`mailto:${selected.email}`}
                      className="text-sm text-accent hover:underline"
                    >
                      {selected.email}
                    </a>
                  </div>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 size={18} className="text-destructive" />
                  </button>
                </div>
                
                <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(selected.created_at).toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={12} />
                    {selected.read ? "Read" : "Unread"}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>
              
              <div className="p-4 border-t border-border bg-muted/30">
                <a
                  href={`mailto:${selected.email}?subject=Re: Your message to Vornsoft&body=Hi ${selected.name},%0D%0A%0D%0AThanks for reaching out. %0D%0A%0D%0ABest regards,%0D%0AVornsoft Team`}
                  className="inline-flex items-center gap-2 px-4 py-2 gradient-accent rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Reply via Email
                </a>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <Mail size={48} className="mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-muted-foreground">
                  Select a message to read
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MessagesManager;