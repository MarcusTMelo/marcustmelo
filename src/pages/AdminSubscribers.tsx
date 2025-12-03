import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trash2, Search, Mail } from "lucide-react";
import { format } from "date-fns";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { toast } from "@/hooks/use-toast";

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  source: string | null;
  created_at: string;
  consent: boolean;
}

const AdminSubscribers = () => {
  const navigate = useNavigate();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    checkAuth();
    fetchSubscribers();
  }, []);

  useEffect(() => {
    filterSubscribers();
  }, [searchTerm, subscribers]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/admin/login");
      return;
    }

    const { data: hasAdminRole } = await supabase.rpc("has_role", {
      _user_id: session.user.id,
      _role: "admin",
    });

    if (!hasAdminRole) {
      navigate("/");
    }
  };

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
      setFilteredSubscribers(data || []);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      toast({
        title: "Erro ao carregar",
        description: "Não foi possível carregar os inscritos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterSubscribers = () => {
    if (!searchTerm.trim()) {
      setFilteredSubscribers(subscribers);
      setCurrentPage(1);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = subscribers.filter(
      (sub) =>
        sub.email.toLowerCase().includes(term) ||
        (sub.name && sub.name.toLowerCase().includes(term))
    );
    setFilteredSubscribers(filtered);
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      toast({
        title: "Inscrito removido",
        description: "O inscrito foi removido com sucesso.",
      });

      fetchSubscribers();
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      toast({
        title: "Erro ao remover",
        description: "Não foi possível remover o inscrito.",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  const getSourceBadge = (source: string | null) => {
    if (source === "footer") {
      return <Badge variant="secondary">Footer</Badge>;
    } else if (source === "blog_post") {
      return <Badge variant="outline">Blog Post</Badge>;
    }
    return <Badge variant="outline">-</Badge>;
  };

  // Paginação
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubscribers = filteredSubscribers.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-[#6EC8FF] bg-clip-text text-transparent">
                  Newsletter Subscribers
                </h1>
                <p className="text-muted-foreground mt-2">
                  Gerencie os inscritos da sua newsletter
                </p>
              </div>

              {/* Search */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome ou e-mail..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-card border border-border">
                  <p className="text-sm text-muted-foreground">Total de Inscritos</p>
                  <p className="text-2xl font-bold text-foreground">{subscribers.length}</p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <p className="text-sm text-muted-foreground">Do Footer</p>
                  <p className="text-2xl font-bold text-foreground">
                    {subscribers.filter((s) => s.source === "footer").length}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <p className="text-sm text-muted-foreground">Do Blog Post</p>
                  <p className="text-2xl font-bold text-foreground">
                    {subscribers.filter((s) => s.source === "blog_post").length}
                  </p>
                </div>
              </div>

              {/* Table */}
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Origem</TableHead>
                      <TableHead>Data de Inscrição</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentSubscribers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          {searchTerm ? "Nenhum inscrito encontrado." : "Nenhum inscrito ainda."}
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentSubscribers.map((subscriber) => (
                        <TableRow key={subscriber.id}>
                          <TableCell className="font-medium">
                            {subscriber.name || <span className="text-muted-foreground">-</span>}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              {subscriber.email}
                            </div>
                          </TableCell>
                          <TableCell>{getSourceBadge(subscriber.source)}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {format(new Date(subscriber.created_at), "dd/MM/yyyy 'às' HH:mm")}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteId(subscriber.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  >
                    Anterior
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Página {currentPage} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  >
                    Próxima
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover inscrito?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover este subscriber? Essa ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
};

export default AdminSubscribers;