import { useEffect, useState } from "react";
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

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();
        
        setIsAdmin(!!roleData);
      } else {
        setIsAdmin(false);
      }
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Admins bypass maintenance/development restrictions
  if (isAdmin) {
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
