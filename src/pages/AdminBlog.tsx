import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  blog_categories: { name: string } | null;
  status: string;
  created_at: string;
  views_count: number;
}

const AdminBlog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/admin/login");
      return;
    }

    // Verify admin role
    const { data: isAdmin } = await supabase.rpc('has_role', {
      _user_id: session.user.id,
      _role: 'admin'
    });

    if (!isAdmin) {
      navigate("/");
    }
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, status, created_at, views_count, blog_categories(name)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      toast({
        title: "Erro ao carregar posts",
        description: "Não foi possível carregar os posts.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      setPosts(posts.filter((p) => p.id !== deleteId));
      toast({
        title: "Post deletado",
        description: "O post foi removido com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao deletar",
        description: "Não foi possível deletar o post.",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#0B0B0D]">
        <AdminSidebar />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border/50 flex items-center px-6">
            <SidebarTrigger />
          </header>

          <main className="flex-1 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C7A7FF] to-[#6EC8FF] bg-clip-text text-transparent">
                  Gerenciar Posts
                </h1>
                <p className="text-muted-foreground mt-2">
                  Crie e edite posts do blog
                </p>
              </div>
              <Button
                onClick={() => navigate("/admin/blog/new")}
                className="bg-gradient-to-r from-[#C7A7FF] to-[#6EC8FF] hover:opacity-90 text-background font-semibold"
              >
                <Plus className="mr-2 h-4 w-4" />
                Novo Post
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                Carregando posts...
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Nenhum post criado ainda
                </p>
                <Button
                  onClick={() => navigate("/admin/blog/new")}
                  variant="outline"
                >
                  Criar primeiro post
                </Button>
              </div>
            ) : (
              <div className="border border-border/50 rounded-lg overflow-hidden bg-background/50">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border/50">
                      <TableHead>Título</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Visualizações</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow
                        key={post.id}
                        className="border-border/50 hover:bg-muted/20"
                      >
                        <TableCell className="font-medium">
                          {post.title}
                        </TableCell>
                        <TableCell>
                          {post.blog_categories?.name || (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              post.status === "published"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              post.status === "published"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                            }
                          >
                            {post.status === "published"
                              ? "Publicado"
                              : "Rascunho"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground">
                            👁️ {post.views_count.toLocaleString('pt-BR')}
                          </span>
                        </TableCell>
                        <TableCell>
                          {format(new Date(post.created_at), "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                navigate(`/admin/blog/edit/${post.id}`)
                              }
                              className="hover:bg-[#C7A7FF]/10 hover:text-[#C7A7FF]"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeleteId(post.id)}
                              className="hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </main>
        </div>
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-background border-border/50">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este post? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
};

export default AdminBlog;
