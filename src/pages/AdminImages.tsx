import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash2, Search, Copy, ExternalLink, Image as ImageIcon } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface StorageImage {
  name: string;
  url: string;
  created_at: string;
  size: number;
  usedIn: string[];
}

export default function AdminImages() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<StorageImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<StorageImage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteImage, setDeleteImage] = useState<StorageImage | null>(null);
  const [selectedImage, setSelectedImage] = useState<StorageImage | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchImages();
  }, []);

  useEffect(() => {
    const filtered = images.filter(img => 
      img.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredImages(filtered);
  }, [searchQuery, images]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/admin/login");
      return;
    }

    const { data: hasRole, error } = await supabase.rpc('has_role', {
      _user_id: session.user.id,
      _role: 'admin'
    });

    if (error || !hasRole) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para acessar esta página.",
        variant: "destructive",
      });
      navigate("/");
    }
  };

  const fetchImages = async () => {
    try {
      setLoading(true);

      // Fetch all images from storage
      const { data: fileList, error: storageError } = await supabase
        .storage
        .from('blog-images')
        .list();

      if (storageError) throw storageError;

      // Fetch all blog posts to check image usage
      const { data: posts, error: postsError } = await supabase
        .from('blog_posts')
        .select('id, title, featured_image, content');

      if (postsError) throw postsError;

      // Map images with usage information
      const imagesWithUsage: StorageImage[] = await Promise.all(
        (fileList || []).map(async (file) => {
          const { data } = supabase.storage
            .from('blog-images')
            .getPublicUrl(file.name);

          // Check which posts use this image
          const usedIn = (posts || [])
            .filter(post => 
              post.featured_image?.includes(file.name) || 
              post.content?.includes(file.name)
            )
            .map(post => post.title);

          return {
            name: file.name,
            url: data.publicUrl,
            created_at: file.created_at || '',
            size: file.metadata?.size || 0,
            usedIn,
          };
        })
      );

      // Sort by creation date (newest first)
      imagesWithUsage.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setImages(imagesWithUsage);
      setFilteredImages(imagesWithUsage);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar imagens",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

        const { error } = await supabase.storage
          .from('blog-images')
          .upload(fileName, file);

        if (error) throw error;
      });

      await Promise.all(uploadPromises);

      toast({
        title: "Upload concluído",
        description: `${files.length} imagem(ns) enviada(s) com sucesso!`,
      });

      fetchImages();
    } catch (error: any) {
      toast({
        title: "Erro no upload",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async () => {
    if (!deleteImage) return;

    if (deleteImage.usedIn.length > 0) {
      toast({
        title: "Não é possível deletar",
        description: "Esta imagem está sendo usada em posts. Remova-a dos posts primeiro.",
        variant: "destructive",
      });
      setDeleteImage(null);
      return;
    }

    try {
      const { error } = await supabase.storage
        .from('blog-images')
        .remove([deleteImage.name]);

      if (error) throw error;

      toast({
        title: "Imagem deletada",
        description: "A imagem foi removida com sucesso.",
      });

      fetchImages();
    } catch (error: any) {
      toast({
        title: "Erro ao deletar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeleteImage(null);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copiada",
      description: "Link da imagem copiado para a área de transferência.",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#0B0B0D]">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C7A7FF] to-[#6EC8FF] bg-clip-text text-transparent">
                Galeria de Imagens
              </h1>
              <label htmlFor="image-upload">
                <Button disabled={uploading} asChild>
                  <span className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    {uploading ? "Enviando..." : "Upload de Imagens"}
                  </span>
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por nome de arquivo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#1A1A1F] border-border/50"
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Carregando imagens...</p>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {searchQuery ? "Nenhuma imagem encontrada" : "Nenhuma imagem no bucket"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredImages.map((image) => (
                  <div
                    key={image.name}
                    className="group relative bg-[#1A1A1F] border border-border/50 rounded-lg overflow-hidden hover:border-[#C7A7FF]/50 transition-all"
                  >
                    <div
                      className="aspect-video bg-muted cursor-pointer overflow-hidden"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div>
                        <p className="text-sm font-medium truncate" title={image.name}>
                          {image.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(image.size)}
                        </p>
                      </div>

                      {image.usedIn.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {image.usedIn.map((postTitle, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {postTitle.length > 20 ? postTitle.substring(0, 20) + '...' : postTitle}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => copyUrl(image.url)}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copiar URL
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(image.url, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setDeleteImage(image)}
                          disabled={image.usedIn.length > 0}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <AlertDialog open={!!deleteImage} onOpenChange={() => setDeleteImage(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja deletar a imagem "{deleteImage?.name}"? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                  Deletar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{selectedImage?.name}</DialogTitle>
                <DialogDescription>
                  {selectedImage?.usedIn.length === 0 ? (
                    "Esta imagem não está sendo usada em nenhum post."
                  ) : (
                    `Usada em ${selectedImage?.usedIn.length} post(s): ${selectedImage?.usedIn.join(', ')}`
                  )}
                </DialogDescription>
              </DialogHeader>
              {selectedImage && (
                <div className="space-y-4">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.name}
                    className="w-full rounded-lg"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => copyUrl(selectedImage.url)}
                      className="flex-1"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar URL
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(selectedImage.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Abrir em nova aba
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </SidebarProvider>
  );
}
