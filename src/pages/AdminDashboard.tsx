import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, Briefcase } from "lucide-react";

interface Stats {
  totalPosts: number;
  publishedPosts: number;
  totalProjects: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    publishedPosts: 0,
    totalProjects: 0,
  });

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
      return;
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      // Fetch total posts
      const { count: totalPosts } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true });

      // Fetch published posts
      const { count: publishedPosts } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true })
        .eq("status", "published");

      // Fetch total projects
      const { count: totalProjects } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true });

      setStats({
        totalPosts: totalPosts || 0,
        publishedPosts: publishedPosts || 0,
        totalProjects: totalProjects || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#0B0B0D]">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border/50 flex items-center px-6">
            <SidebarTrigger />
          </header>

          <main className="flex-1 p-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C7A7FF] to-[#6EC8FF] bg-clip-text text-transparent">
                Bem-vindo, Marcus!
              </h1>
              <p className="text-muted-foreground mt-2">
                Gerencie seu conteúdo e projetos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-background/50 border-[#C7A7FF]/30 hover:border-[#C7A7FF]/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total de Posts
                  </CardTitle>
                  <FileText className="h-4 w-4 text-[#C7A7FF]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#C7A7FF] to-[#6EC8FF] bg-clip-text text-transparent">
                    {stats.totalPosts}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Posts no sistema
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/50 border-[#6EC8FF]/30 hover:border-[#6EC8FF]/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Posts Publicados
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-[#6EC8FF]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#6EC8FF] to-[#5A9FD4] bg-clip-text text-transparent">
                    {stats.publishedPosts}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Visíveis ao público
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/50 border-[#FF6EC7]/30 hover:border-[#FF6EC7]/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Projetos
                  </CardTitle>
                  <Briefcase className="h-4 w-4 text-[#FF6EC7]" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#FF6EC7] to-[#C7A7FF] bg-clip-text text-transparent">
                    {stats.totalProjects}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Portfólio completo
                  </p>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
