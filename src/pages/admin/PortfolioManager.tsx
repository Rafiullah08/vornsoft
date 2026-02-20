import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, EyeOff, GripVertical, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  technologies: string[];
  live_url: string | null;
  published: boolean;
  display_order: number;
}

const PortfolioManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    technologies: "",
    live_url: "",
    published: false,
    display_order: 0,
  });
  
  const { toast } = useToast();

  const load = async () => {
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .order("display_order");
    
    if (error) {
      toast({ title: "Error loading projects", description: error.message, variant: "destructive" });
      return;
    }
    
    setProjects((data as Project[]) || []);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      description: "",
      technologies: "",
      live_url: "",
      published: false,
      display_order: 0,
    });
    setEditing(null);
    setShowForm(false);
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast({ title: "Title and slug required", variant: "destructive" });
      return;
    }

    const technologiesArray = form.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: form.title,
      slug: form.slug,
      description: form.description || null,
      technologies: technologiesArray,
      live_url: form.live_url || null,
      published: form.published,
      display_order: editing ? form.display_order : projects.length,
    };

    if (editing) {
      const { error } = await supabase
        .from("portfolio_projects")
        .update(payload)
        .eq("id", editing.id);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Project updated" });
    } else {
      const { error } = await supabase
        .from("portfolio_projects")
        .insert(payload);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Project created" });
    }

    resetForm();
    load();
  };

  const handleEdit = (p: Project) => {
    setForm({
      title: p.title,
      slug: p.slug,
      description: p.description || "",
      technologies: (p.technologies || []).join(", "),
      live_url: p.live_url || "",
      published: p.published,
      display_order: p.display_order,
    });
    setEditing(p);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    const { error } = await supabase
      .from("portfolio_projects")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    
    toast({ title: "Project deleted" });
    load();
  };

  const togglePublished = async (project: Project) => {
    const { error } = await supabase
      .from("portfolio_projects")
      .update({ published: !project.published })
      .eq("id", project.id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    
    toast({ title: project.published ? "Project unpublished" : "Project published" });
    load();
  };

  return (
   <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Portfolio Projects</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md gradient-accent text-accent-foreground text-sm font-medium"
        >
          <Plus size={16} /> New Project
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-5 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">
                Title <span className="text-destructive">*</span>
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm({
                  ...form,
                  title: e.target.value,
                  slug: editing ? form.slug : generateSlug(e.target.value),
                })}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:outline-none"
                placeholder="E-Commerce Platform"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">
                Slug <span className="text-destructive">*</span>
              </label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:outline-none"
                placeholder="e-commerce-platform"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:outline-none resize-none"
              placeholder="Describe your project..."
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">
                Technologies (comma-separated)
              </label>
              <input
                value={form.technologies}
                onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:outline-none"
                placeholder="React, TypeScript, Tailwind"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">
                Live URL
              </label>
              <input
                value={form.live_url}
                onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:outline-none"
                placeholder="https://example.com"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="rounded border-border"
            />
            <label htmlFor="published" className="text-sm text-foreground">
              Published
            </label>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-md gradient-accent text-accent-foreground text-sm font-medium"
            >
              {editing ? "Update" : "Create"}
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 rounded-md border border-border text-foreground text-sm hover:bg-muted"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-medium text-muted-foreground">Title</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Technologies</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
              <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="p-3">
                  <div>
                    <p className="text-foreground font-medium">{p.title}</p>
                    {p.live_url && (
                      <a
                        href={p.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent hover:underline inline-flex items-center gap-1 mt-1"
                      >
                        Live Demo <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {(p.technologies || []).map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-muted rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3">
                  <span className={`text-xs ${p.published ? "text-green-600" : "text-muted-foreground"}`}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-3 text-right space-x-1">
                  <button
                    onClick={() => togglePublished(p)}
                    className="p-1.5 rounded hover:bg-muted"
                  >
                    {p.published ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button
                    onClick={() => handleEdit(p)}
                    className="p-1.5 rounded hover:bg-muted"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-1.5 rounded hover:bg-destructive/10"
                  >
                    <Trash2 size={14} className="text-destructive" />
                  </button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-muted-foreground">
                  No projects yet. Create your first project!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PortfolioManager;