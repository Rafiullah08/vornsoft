import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Settings,
  MessageSquare,
  LogOut,
} from "lucide-react";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/blog", icon: FileText, label: "Blog Posts" },
  { to: "/admin/portfolio", icon: FolderOpen, label: "Portfolio" },
  { to: "/admin/services", icon: Settings, label: "Services" },
  { to: "/admin/messages", icon: MessageSquare, label: "Messages" },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const { signOut, user, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  // Agar loading hai to kuch mat dikhao (AdminRoute already loading dikha raha hai)
  if (loading) return null;

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-60 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
        <div className="p-4 border-b border-sidebar-border">
          <Link to="/" className="text-lg font-bold text-sidebar-primary">
            VornSoft
          </Link>
          <p className="text-xs text-sidebar-foreground/50 mt-0.5">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.to ||
              (item.to !== "/admin" && pathname.startsWith(item.to));

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/50 truncate mb-2 px-3">
            {user?.email}
          </p>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3 py-2 w-full rounded-md text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;