import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, MailOpen, Trash2 } from "lucide-react";

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
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    setMessages((data as Submission[]) || []);
  };

  useEffect(() => { load(); }, []);

  const markRead = async (msg: Submission) => {
    if (!msg.read) {
      await supabase.from("contact_submissions").update({ read: true }).eq("id", msg.id);
    }
    setSelected(msg);
    load();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("contact_submissions").delete().eq("id", id);
    if (selected?.id === id) setSelected(null);
    toast({ title: "Message deleted" });
    load();
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-foreground mb-6">Contact Messages</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 bg-card border border-border rounded-lg overflow-hidden">
          <div className="divide-y divide-border max-h-[600px] overflow-auto">
            {messages.map((m) => (
              <button
                key={m.id}
                onClick={() => markRead(m)}
                className={`w-full text-left p-3 hover:bg-muted/50 transition-colors ${selected?.id === m.id ? "bg-muted/50" : ""}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {m.read ? <MailOpen size={14} className="text-muted-foreground" /> : <Mail size={14} className="text-accent" />}
                  <span className={`text-sm ${m.read ? "text-foreground" : "font-semibold text-foreground"}`}>{m.name}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{m.message}</p>
                <p className="text-xs text-muted-foreground/50 mt-1">{new Date(m.created_at).toLocaleDateString()}</p>
              </button>
            ))}
            {messages.length === 0 && <p className="p-6 text-center text-muted-foreground text-sm">No messages yet</p>}
          </div>
        </div>

        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
          {selected ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{selected.name}</h2>
                  <p className="text-sm text-muted-foreground">{selected.email}</p>
                </div>
                <button onClick={() => handleDelete(selected.id)} className="p-2 rounded hover:bg-destructive/10">
                  <Trash2 size={16} className="text-destructive" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-4">{new Date(selected.created_at).toLocaleString()}</p>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
              Select a message to read
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default MessagesManager;
