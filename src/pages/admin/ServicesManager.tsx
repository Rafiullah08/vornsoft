import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  features: string[];
  published: boolean;
  display_order: number;
}

const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", icon: "", features: "", published: true, display_order: 0 });
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("services").select("*").order("display_order");
    setServices((data as Service[]) || []);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ title: "", description: "", icon: "", features: "", published: true, display_order: 0 }); setEditing(null); setShowForm(false); };

  const handleSave = async () => {
    if (!form.title) { toast({ title: "Title required", variant: "destructive" }); return; }
    const feats = form.features.split(",").map((f) => f.trim()).filter(Boolean);
    const payload = { title: form.title, description: form.description || null, icon: form.icon || null, features: feats, published: form.published, display_order: form.display_order };
    if (editing) {
      const { error } = await supabase.from("services").update(payload).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Service updated" });
    } else {
      const { error } = await supabase.from("services").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Service created" });
    }
    resetForm(); load();
  };

  const handleEdit = (s: Service) => {
    setForm({ title: s.title, description: s.description || "", icon: s.icon || "", features: (s.features || []).join(", "), published: s.published, display_order: s.display_order });
    setEditing(s); setShowForm(true);
  };

  const handleDelete = async (id: string) => { await supabase.from("services").delete().eq("id", id); toast({ title: "Service deleted" }); load(); };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Services</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md gradient-accent text-accent-foreground text-sm font-medium"><Plus size={16} /> New Service</button>
      </div>
      {showForm && (
        <div className="bg-card border border-border rounded-lg p-5 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Icon (lucide name)</label>
              <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Description</label>
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:outline-none resize-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Features (comma-separated)</label>
              <input value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Display Order</label>
              <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="rounded border-border" />
            <span className="text-sm text-foreground">Published</span>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-2 rounded-md gradient-accent text-accent-foreground text-sm font-medium">{editing ? "Update" : "Create"}</button>
            <button onClick={resetForm} className="px-4 py-2 rounded-md border border-border text-foreground text-sm">Cancel</button>
          </div>
        </div>
      )}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border bg-muted/50">
            <th className="text-left p-3 font-medium text-muted-foreground">Title</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Order</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
            <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-0">
                <td className="p-3 text-foreground font-medium">{s.title}</td>
                <td className="p-3 text-muted-foreground">{s.display_order}</td>
                <td className="p-3"><span className={`text-xs ${s.published ? "text-green-600" : "text-muted-foreground"}`}>{s.published ? "Published" : "Draft"}</span></td>
                <td className="p-3 text-right space-x-1">
                  <button onClick={() => handleEdit(s)} className="p-1.5 rounded hover:bg-muted"><Pencil size={14} className="text-muted-foreground" /></button>
                  <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 size={14} className="text-destructive" /></button>
                </td>
              </tr>
            ))}
            {services.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No services yet</td></tr>}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ServicesManager;
