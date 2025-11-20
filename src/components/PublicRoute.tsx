import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSiteStatus, type SiteStatus } from "@/services/siteSettings";
import { supabase } from "@/integrations/supabase/client";
import MaintenancePage from "@/pages/MaintenancePage";
import DevelopmentPage from "@/pages/DevelopmentPage";

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const [status, setStatus] = useState<SiteStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setIsAdmin(false);
        return;
      }

      const { data, error } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });

      if (error) {
        console.error("Error checking admin role", error);
        setIsAdmin(false);
        return;
      }

      setIsAdmin(Boolean(data));
    };
    const loadStatus = async () => {
      await checkAdminStatus();
      const currentStatus = await getSiteStatus();
      setStatus(currentStatus);
      setLoading(false);
    };

    loadStatus();

    // Check status every 30 seconds to pick up changes
    const interval = setInterval(loadStatus, 30000);
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadStatus();
    });

    return () => {
      clearInterval(interval);
      subscription.unsubscribe();
    };
  }, []);

  const isAdminRoute = location.pathname.startsWith("/admin");

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Only /admin routes bypass maintenance/development restrictions
  // Public routes show maintenance/dev pages regardless of user role
  if (isAdminRoute) {
    return <>{children}</>;
  }
  if (status === 'manutencao') {
    return <MaintenancePage />;
  }

  if (status === 'desenvolvimento') {
    return <DevelopmentPage />;
  }

  return <>{children}</>;
}
