import { useEffect, useState } from "react";
import { getSiteStatus, type SiteStatus } from "@/services/siteSettings";
import MaintenancePage from "@/pages/MaintenancePage";
import DevelopmentPage from "@/pages/DevelopmentPage";

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const [status, setStatus] = useState<SiteStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStatus = async () => {
      const currentStatus = await getSiteStatus();
      setStatus(currentStatus);
      setLoading(false);
    };

    loadStatus();

    // Check status every 30 seconds to pick up changes
    const interval = setInterval(loadStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (status === 'manutencao') {
    return <MaintenancePage />;
  }

  if (status === 'desenvolvimento') {
    return <DevelopmentPage />;
  }

  return <>{children}</>;
}
