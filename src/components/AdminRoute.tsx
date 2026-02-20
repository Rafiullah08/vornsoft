import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AdminLayout from "@/components/AdminLayout";
import { useEffect, useState } from "react";

const AdminRoute = () => {
  const { user, loading } = useAuth();
  const [directCheck, setDirectCheck] = useState(false);
  
  // DIRECT EMAIL CHECK - Database par depend nahi karta
  const isAdminByEmail = user?.email === 'vornsoft@gmail.com';
  
  useEffect(() => {
    // 2 seconds ke baad force render
    const timer = setTimeout(() => {
      setDirectCheck(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  console.log("AdminRoute - loading:", loading);
  console.log("AdminRoute - user:", user);
  console.log("AdminRoute - isAdminByEmail:", isAdminByEmail);
  console.log("AdminRoute - directCheck:", directCheck);

  // Agar loading 3 seconds se zyada ho to force render
  if (loading && !directCheck) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    console.log("No user found, redirecting to login");
    return <Navigate to="/admin/login" replace />;
  }

  // EMAIL-BASED ADMIN CHECK - Database check bypass
  if (!isAdminByEmail) {
    console.log("User is not admin by email, redirecting to home");
    return <Navigate to="/" replace />;
  }

  // Render admin layout
  console.log("Admin access granted!");
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminRoute;