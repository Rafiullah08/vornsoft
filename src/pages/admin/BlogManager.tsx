import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  published: boolean;
  created_at: string;
}

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", published: false });
  const { user } = useAuth();
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts((data as BlogPost[]) || []);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ title: "", slug: "", excerpt: "", content: "", published: false });
    setEditing(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast({ title: "Title and slug are required", variant: "destructive" });
      return;
    }
    if (editing) {
      const { error } = await supabase.from("blog_posts").update({
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt || null,
        content: form.content || null,
        published: form.published,
        published_at: form.published ? new Date().toISOString() : null,
      }).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Post updated" });
    } else {
      const { error } = await supabase.from("blog_posts").insert({
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt || null,
        content: form.content || null,
        published: form.published,
        published_at: form.published ? new Date().toISOString() : null,
        author_id: user?.id,
      });
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Post created" });
    }
    resetForm();
    load();
  };

  const handleEdit = (post: BlogPost) => {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content || "",
      published: post.published,
    });
    setEditing(post);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("blog_posts").delete().eq("id", id);
    toast({ title: "Post deleted" });
    load();
  };

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Blog Posts</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md gradient-accent text-accent-foreground text-sm font-medium"
        >
          <Plus size={16} /> New Post
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-5 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Title</label>
              <input
                value={form.title}
                onChange={(e) => {
                  setForm({ ...form, title: e.target.value, slug: editing ? form.slug : generateSlug(e.target.value) });
                }}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Slug</label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Excerpt</label>
            <input
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Content</label>
            <textarea
              rows={8}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:outline-none resize-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="rounded border-border"
            />
            <span className="text-sm text-foreground">Published</span>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-2 rounded-md gradient-accent text-accent-foreground text-sm font-medium">
              {editing ? "Update" : "Create"}
            </button>
            <button onClick={resetForm} className="px-4 py-2 rounded-md border border-border text-foreground text-sm">
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
              <th className="text-left p-3 font-medium text-muted-foreground">Slug</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
              <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="p-3 text-foreground font-medium">{p.title}</td>
                <td className="p-3 text-muted-foreground">{p.slug}</td>
                <td className="p-3">
                  {p.published ? (
                    <span className="inline-flex items-center gap-1 text-xs text-green-600"><Eye size={12} /> Published</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><EyeOff size={12} /> Draft</span>
                  )}
                </td>
                <td className="p-3 text-right space-x-1">
                  <button onClick={() => handleEdit(p)} className="p-1.5 rounded hover:bg-muted transition-colors">
                    <Pencil size={14} className="text-muted-foreground" />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded hover:bg-destructive/10 transition-colors">
                    <Trash2 size={14} className="text-destructive" />
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No blog posts yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default BlogManager;
