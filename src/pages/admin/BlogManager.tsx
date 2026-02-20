import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, EyeOff, Image as ImageIcon } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from 'lowlight';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon2,
  Highlighter,
  Palette,
  Pilcrow,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  published: boolean;
  created_at: string;
}

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    published: false,
  });

  const { user } = useAuth();
  const { toast } = useToast();

  const lowlight = createLowlight();
  lowlight.register('js', js);
  lowlight.register('ts', ts);
  lowlight.register('html', html);
  lowlight.register('css', css);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        codeBlock: false,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Highlight.configure({ 
        multicolor: true,
      }),
      Typography,
      Placeholder.configure({
        placeholder: 'Start writing your blog post...',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-accent underline underline-offset-2',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full mx-auto',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'rounded-lg bg-muted p-4 font-mono text-sm',
        },
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  const load = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    setPosts((data as BlogPost[]) || []);
  };

  useEffect(() => {
    load();
  }, []);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const uploadImage = async () => {
    if (!imageFile) return null;

    setUploading(true);
    const fileName = `${Date.now()}-${imageFile.name}`;

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, imageFile);

    if (error) {
      toast({ title: "Image upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return null;
    }

    const { data } = supabase.storage
      .from("blog-images")
      .getPublicUrl(fileName);

    setUploading(false);
    return data.publicUrl;
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast({ title: "Title and slug required", variant: "destructive" });
      return;
    }

    const uploadedImage = imageFile ? await uploadImage() : imageUrl;

    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt || null,
      content: editor?.getHTML() || null,
      featured_image: uploadedImage,
      published: form.published,
      published_at: form.published ? new Date().toISOString() : null,
      author_id: user?.id,
    };

    if (editing) {
      const { error } = await supabase.from("blog_posts").update(payload).eq("id", editing.id);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Post updated" });
    } else {
      const { error } = await supabase.from("blog_posts").insert(payload);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Post created" });
    }

    resetForm();
    load();
  };

  const resetForm = () => {
    setForm({ title: "", slug: "", excerpt: "", published: false });
    editor?.commands.setContent("");
    setImageFile(null);
    setImageUrl(null);
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (post: BlogPost) => {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      published: post.published,
    });

    editor?.commands.setContent(post.content || "");
    setImageUrl(post.featured_image);
    setEditing(post);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Post deleted" });
    load();
  };

  const togglePublished = async (post: BlogPost) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({ 
        published: !post.published,
        published_at: !post.published ? new Date().toISOString() : null
      })
      .eq("id", post.id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: post.published ? "Post unpublished" : "Post published" });
    load();
  };

  const MenuBar = () => {
    if (!editor) return null;

    const addImage = () => {
      const url = window.prompt('Enter image URL:');
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    };

    const addLink = () => {
      const url = window.prompt('Enter URL:');
      if (url) {
        editor.chain().focus().setLink({ href: url }).run();
      }
    };

    return (
      <div className="border-b border-border p-2 flex flex-wrap gap-1 bg-muted/30">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-muted ${editor.isActive('bold') ? 'bg-accent text-accent-foreground' : ''}`}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-muted ${editor.isActive('italic') ? 'bg-accent text-accent-foreground' : ''}`}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-muted ${editor.isActive('underline') ? 'bg-accent text-accent-foreground' : ''}`}
          title="Underline"
        >
          <UnderlineIcon size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-muted ${editor.isActive('strike') ? 'bg-accent text-accent-foreground' : ''}`}
          title="Strikethrough"
        >
          <Strikethrough size={16} />
        </button>
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-muted ${editor.isActive('heading', { level: 1 }) ? 'bg-accent text-accent-foreground' : ''}`}
          title="Heading 1"
        >
          <Heading1 size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-muted ${editor.isActive('heading', { level: 2 }) ? 'bg-accent text-accent-foreground' : ''}`}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-muted ${editor.isActive('heading', { level: 3 }) ? 'bg-accent text-accent-foreground' : ''}`}
          title="Heading 3"
        >
          <Heading3 size={16} />
        </button>
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-muted ${editor.isActive({ textAlign: 'left' }) ? 'bg-accent text-accent-foreground' : ''}`}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-muted ${editor.isActive({ textAlign: 'center' }) ? 'bg-accent text-accent-foreground' : ''}`}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-muted ${editor.isActive({ textAlign: 'right' }) ? 'bg-accent text-accent-foreground' : ''}`}
          title="Align Right"
        >
          <AlignRight size={16} />
        </button>
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-muted ${editor.isActive('bulletList') ? 'bg-accent text-accent-foreground' : ''}`}
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-muted ${editor.isActive('orderedList') ? 'bg-accent text-accent-foreground' : ''}`}
          title="Ordered List"
        >
          <ListOrdered size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-muted ${editor.isActive('blockquote') ? 'bg-accent text-accent-foreground' : ''}`}
          title="Quote"
        >
          <Quote size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-muted ${editor.isActive('codeBlock') ? 'bg-accent text-accent-foreground' : ''}`}
          title="Code Block"
        >
          <Code size={16} />
        </button>
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <button
          onClick={addLink}
          className={`p-2 rounded hover:bg-muted ${editor.isActive('link') ? 'bg-accent text-accent-foreground' : ''}`}
          title="Add Link"
        >
          <LinkIcon size={16} />
        </button>
        <button
          onClick={addImage}
          className="p-2 rounded hover:bg-muted"
          title="Add Image"
        >
          <ImageIcon2 size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`p-2 rounded hover:bg-muted ${editor.isActive('highlight') ? 'bg-accent text-accent-foreground' : ''}`}
          title="Highlight"
        >
          <Highlighter size={16} />
        </button>
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded hover:bg-muted"
          title="Undo"
        >
          <Undo size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded hover:bg-muted"
          title="Redo"
        >
          <Redo size={16} />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 gradient-accent rounded-md text-sm inline-flex items-center gap-2"
        >
          <Plus size={16} /> New Post
        </button>
      </div>

      {showForm && (
        <div className="bg-card p-6 rounded-lg border mb-6 space-y-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium mb-2 block">Title</label>
            <input
              placeholder="Enter post title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                  slug: editing ? form.slug : generateSlug(e.target.value),
                })
              }
              className="w-full border p-2 rounded bg-background"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="text-sm font-medium mb-2 block">Slug</label>
            <input
              placeholder="enter-post-slug"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full border p-2 rounded bg-background"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="text-sm font-medium mb-2 block">Excerpt</label>
            <textarea
              placeholder="Short excerpt for blog listing"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={3}
              className="w-full border p-2 rounded bg-background resize-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Featured Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(e.target.files ? e.target.files[0] : null)
              }
              className="w-full"
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Featured"
                className="mt-3 rounded-md max-h-40 object-cover"
              />
            )}
          </div>

          {/* Rich Text Editor */}
          <div>
            <label className="text-sm font-medium block mb-2">Content</label>
            <div className="border rounded-md overflow-hidden bg-background">
              <MenuBar />
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* Publish */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={form.published}
              onChange={(e) =>
                setForm({ ...form, published: e.target.checked })
              }
              className="rounded border-border"
            />
            <label htmlFor="published" className="text-sm">
              Published
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={uploading}
              className="px-4 py-2 gradient-accent rounded-md disabled:opacity-50"
            >
              {uploading ? "Uploading..." : editing ? "Update" : "Create"}
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 border rounded-md hover:bg-muted"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 text-sm font-medium">Title</th>
              <th className="text-left p-3 text-sm font-medium">Slug</th>
              <th className="text-left p-3 text-sm font-medium">Status</th>
              <th className="text-right p-3 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(p.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </td>
                <td className="p-3 text-sm text-muted-foreground">{p.slug}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    p.published 
                      ? 'bg-green-500/10 text-green-600' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => togglePublished(p)}
                    className="p-1.5 rounded hover:bg-muted"
                    title={p.published ? 'Unpublish' : 'Publish'}
                  >
                    {p.published ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    onClick={() => handleEdit(p)}
                    className="p-1.5 rounded hover:bg-muted"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-1.5 rounded hover:bg-destructive/10 text-destructive"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-muted-foreground">
                  No blog posts yet. Create your first post!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BlogManager;