import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, EyeOff, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  features: string[];
  published: boolean;
  display_order: number;
}

const SortableItem = ({ service, onEdit, onDelete, onToggle }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: service.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr ref={setNodeRef} style={style} className="border-b border-border last:border-0">
      <td className="p-3">
        <button className="cursor-grab" {...attributes} {...listeners}>
          <GripVertical size={16} className="text-muted-foreground" />
        </button>
      </td>
      <td className="p-3 text-foreground font-medium">{service.title}</td>
      <td className="p-3 text-muted-foreground">
        <div className="flex flex-wrap gap-1">
          {(service.features || []).slice(0, 2).map((f, i) => (
            <span key={i} className="text-xs px-2 py-1 bg-muted rounded-full">
              {f}
            </span>
          ))}
          {(service.features || []).length > 2 && (
            <span className="text-xs px-2 py-1 bg-muted rounded-full">
              +{(service.features || []).length - 2}
            </span>
          )}
        </div>
      </td>
      <td className="p-3">
        <span className={`text-xs ${service.published ? "text-green-600" : "text-muted-foreground"}`}>
          {service.published ? "Published" : "Draft"}
        </span>
      </td>
      <td className="p-3 text-right space-x-1">
        <button onClick={() => onToggle(service)} className="p-1.5 rounded hover:bg-muted">
          {service.published ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
        <button onClick={() => onEdit(service)} className="p-1.5 rounded hover:bg-muted">
          <Pencil size={14} />
        </button>
        <button onClick={() => onDelete(service.id)} className="p-1.5 rounded hover:bg-destructive/10">
          <Trash2 size={14} className="text-destructive" />
        </button>
      </td>
    </tr>
  );
};

const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "",
    features: "",
    published: true,
    display_order: 0,
  });
  
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const load = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("display_order");
    
    if (error) {
      toast({ title: "Error loading services", description: error.message, variant: "destructive" });
      return;
    }
    
    setServices((data as Service[]) || []);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ title: "", description: "", icon: "", features: "", published: true, display_order: 0 });
    setEditing(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    if (!form.title) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }

    const featuresArray = form.features
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      title: form.title,
      description: form.description || null,
      icon: form.icon || null,
      features: featuresArray,
      published: form.published,
      display_order: editing ? form.display_order : services.length,
    };

    if (editing) {
      const { error } = await supabase
        .from("services")
        .update(payload)
        .eq("id", editing.id);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Service updated" });
    } else {
      const { error } = await supabase
        .from("services")
        .insert(payload);
      
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Service created" });
    }

    resetForm();
    load();
  };

  const handleEdit = (s: Service) => {
    setForm({
      title: s.title,
      description: s.description || "",
      icon: s.icon || "",
      features: (s.features || []).join(", "),
      published: s.published,
      display_order: s.display_order,
    });
    setEditing(s);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    
    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    
    toast({ title: "Service deleted" });
    load();
  };

  const togglePublished = async (service: Service) => {
    const { error } = await supabase
      .from("services")
      .update({ published: !service.published })
      .eq("id", service.id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    
    toast({ title: service.published ? "Service unpublished" : "Service published" });
    load();
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = services.findIndex((s) => s.id === active.id);
      const newIndex = services.findIndex((s) => s.id === over.id);
      
      const newServices = arrayMove(services, oldIndex, newIndex);
      setServices(newServices);
      
      // Update display_order in database
      const updates = newServices.map((s, index) => ({
        ...s,
        display_order: index,
      }));
      
      for (const service of updates) {
        await supabase
          .from("services")
          .update({ display_order: service.display_order })
          .eq("id", service.id);
      }
    }
  };

  return (
     <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Services</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md gradient-accent text-accent-foreground text-sm font-medium"
        >
          <Plus size={16} /> New Service
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
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:outline-none"
                placeholder="Web Development"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">
                Icon (Lucide name)
              </label>
              <input
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:outline-none"
                placeholder="Code, Smartphone, Palette, etc."
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
              placeholder="Describe your service..."
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">
                Features (comma-separated)
              </label>
              <input
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:outline-none"
                placeholder="React, TypeScript, Node.js"
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="w-10 p-3"></th>
                <th className="text-left p-3 font-medium text-muted-foreground">Title</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Features</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              <SortableContext
                items={services.map(s => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {services.map((s) => (
                  <SortableItem
                    key={s.id}
                    service={s}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggle={togglePublished}
                  />
                ))}
              </SortableContext>
              {services.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-muted-foreground">
                    No services yet. Create your first service!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </DndContext>
      </div>
  </>
  );
};

export default ServicesManager;