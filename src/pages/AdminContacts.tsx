import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";
import { Trash2, Eye, Mail, Phone, MessageCircle, Loader2, Circle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string | null;
  message: string;
  created_at: string;
  is_read: boolean;
}

const AdminContacts = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactRequest | null>(null);
  const [contactToDelete, setContactToDelete] = useState<ContactRequest | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin/login");
        return;
      }

      const { data: hasRole } = await supabase.rpc('has_role', {
        _user_id: session.user.id,
        _role: 'admin'
      });

      if (!hasRole) {
        toast.error("Acesso negado");
        navigate("/admin/login");
        return;
      }

      setIsAdmin(true);
      fetchContacts();
    };

    checkAuth();
  }, [navigate]);

  const fetchContacts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("contact_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Erro ao carregar mensagens");
    } else {
      setContacts(data || []);
    }
    setIsLoading(false);
  };

  const handleViewContact = async (contact: ContactRequest) => {
    setSelectedContact(contact);
    
    // Mark as read if not already
    if (!contact.is_read) {
      const { error } = await supabase
        .from("contact_requests")
        .update({ is_read: true })
        .eq("id", contact.id);

      if (!error) {
        setContacts(contacts.map(c => 
          c.id === contact.id ? { ...c, is_read: true } : c
        ));
      }
    }
  };

  const handleDelete = async () => {
    if (!contactToDelete) return;

    setIsDeleting(true);
    const { error } = await supabase
      .from("contact_requests")
      .delete()
      .eq("id", contactToDelete.id);

    if (error) {
      console.error("Error deleting contact:", error);
      toast.error("Erro ao excluir mensagem");
    } else {
      toast.success("Mensagem excluída");
      setContacts(contacts.filter(c => c.id !== contactToDelete.id));
    }

    setIsDeleting(false);
    setContactToDelete(null);
  };

  const handleMarkAllAsRead = async () => {
    const unreadIds = contacts.filter(c => !c.is_read).map(c => c.id);
    if (unreadIds.length === 0) return;

    const { error } = await supabase
      .from("contact_requests")
      .update({ is_read: true })
      .in("id", unreadIds);

    if (error) {
      toast.error("Erro ao marcar como lidas");
    } else {
      setContacts(contacts.map(c => ({ ...c, is_read: true })));
      toast.success("Todas as mensagens marcadas como lidas");
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  };

  const unreadCount = contacts.filter(c => !c.is_read).length;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Mensagens de Contato</h1>
                <p className="text-muted-foreground mt-1">
                  {contacts.length} {contacts.length === 1 ? 'mensagem recebida' : 'mensagens recebidas'}
                  {unreadCount > 0 && (
                    <span className="text-primary ml-2">
                      ({unreadCount} {unreadCount === 1 ? 'não lida' : 'não lidas'})
                    </span>
                  )}
                </p>
              </div>
              {unreadCount > 0 && (
                <Button variant="outline" onClick={handleMarkAllAsRead}>
                  Marcar todas como lidas
                </Button>
              )}
            </div>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="text-lg">Todas as Mensagens</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : contacts.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma mensagem recebida ainda.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-8"></TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Assunto</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact) => (
                        <TableRow 
                          key={contact.id}
                          className={!contact.is_read ? "bg-primary/5" : ""}
                        >
                          <TableCell>
                            {!contact.is_read && (
                              <Circle className="h-2 w-2 fill-primary text-primary" />
                            )}
                          </TableCell>
                          <TableCell className={`font-medium ${!contact.is_read ? "text-foreground" : ""}`}>
                            {contact.name}
                          </TableCell>
                          <TableCell>
                            <a 
                              href={`mailto:${contact.email}`} 
                              className="text-primary hover:underline"
                            >
                              {contact.email}
                            </a>
                          </TableCell>
                          <TableCell>
                            <a 
                              href={`https://wa.me/55${contact.phone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {contact.phone}
                            </a>
                          </TableCell>
                          <TableCell className="max-w-[150px] truncate">
                            {contact.subject || "-"}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {formatDate(contact.created_at)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewContact(contact)}
                                title="Ver mensagem"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setContactToDelete(contact)}
                                className="hover:text-destructive"
                                title="Excluir"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* View Contact Dialog */}
      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Mensagem de {selectedContact?.name}</DialogTitle>
            <DialogDescription>
              Recebida em {selectedContact && formatDate(selectedContact.created_at)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a 
                    href={`mailto:${selectedContact.email}`}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {selectedContact.email}
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <a 
                    href={`https://wa.me/55${selectedContact.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    {selectedContact.phone}
                  </a>
                </div>
              </div>

              {selectedContact.subject && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Assunto</p>
                  <p className="font-medium">{selectedContact.subject}</p>
                </div>
              )}

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Mensagem</p>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button asChild className="flex-1">
                  <a href={`mailto:${selectedContact.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Responder por Email
                  </a>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <a 
                    href={`https://wa.me/55${selectedContact.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!contactToDelete} onOpenChange={() => setContactToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir mensagem?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A mensagem de {contactToDelete?.name} será permanentemente excluída.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Excluir"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
};

export default AdminContacts;
