import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, X } from "lucide-react";
import { RichTextEditor } from "@/components/RichTextEditor";

const CATEGORIES = [
  "Automação",
  "IA",
  "Tech",
  "Negócios",
  "Tutoriais",
];

const AdminBlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    content: "",
    featured_image: "",
    status: "draft",
  });
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    checkAuth();
    if (isEdit) {
      fetchPost();
    }
  }, [id]);

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

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setFormData({
        title: data.title,
        slug: data.slug,
        category: data.category || "",
        excerpt: data.excerpt || "",
        content: data.content || "",
        featured_image: data.featured_image || "",
        status: data.status,
      });
      setIsPublished(data.status === "published");
      setImagePreview(data.featured_image || "");
    } catch (error) {
      toast({
        title: "Erro ao carregar post",
        description: "Não foi possível carregar os dados do post.",
        variant: "destructive",
      });
      navigate("/admin/blog");
    } finally {
      setInitialLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Tipo de arquivo inválido",
        description: "Apenas JPG, PNG, WEBP e GIF são aceitos.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo é 5MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      // Update form data
      setFormData((prev) => ({
        ...prev,
        featured_image: publicUrl,
      }));
      setImagePreview(publicUrl);

      toast({
        title: "Imagem enviada",
        description: "A imagem foi carregada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar imagem",
        description: "Não foi possível fazer upload da imagem.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      featured_image: "",
    }));
    setImagePreview("");
  };

  const getUniqueSlug = async (baseSlug: string, currentPostId?: string): Promise<string> => {
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const query = supabase
        .from("blog_posts")
        .select("id")
        .eq("slug", slug);

      // Exclude current post when editing
      if (currentPostId) {
        query.neq("id", currentPostId);
      }

      const { data } = await query.maybeSingle();

      if (!data) {
        return slug;
      }

      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.slug.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Título e slug são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const status = isPublished ? "published" : "draft";
      
      // Get unique slug for new posts
      const finalSlug = isEdit 
        ? await getUniqueSlug(formData.slug, id) 
        : await getUniqueSlug(formData.slug);

      const postData = {
        ...formData,
        slug: finalSlug,
        status,
        published_at: isPublished && formData.status === "draft" ? new Date().toISOString() : undefined,
      };

      if (isEdit) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", id);

        if (error) throw error;

        toast({
          title: "Post atualizado",
          description: "As alterações foram salvas com sucesso.",
        });
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert([postData]);

        if (error) throw error;

        toast({
          title: "Post criado",
          description: "O novo post foi criado com sucesso.",
        });
      }

      navigate("/admin/blog");
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message || "Não foi possível salvar o post.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-[#0B0B0D]">
          <AdminSidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-muted-foreground">Carregando...</div>
          </div>
        </div>
      </SidebarProvider>
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

          <main className="flex-1 p-6 max-w-4xl w-full mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/admin/blog")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C7A7FF] to-[#6EC8FF] bg-clip-text text-transparent">
                  {isEdit ? "Editar Post" : "Novo Post"}
                </h1>
                <p className="text-muted-foreground mt-2">
                  Preencha os campos abaixo
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Digite o título do post"
                    required
                    className="bg-background/50 border-border/50"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="url-amigavel-do-post"
                    required
                    className="bg-background/50 border-border/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger className="bg-background/50 border-border/50">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border/50 z-50">
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4 md:col-span-2">
                  <Label>Imagem Destacada</Label>
                  
                  {imagePreview && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("image-upload")?.click()}
                        disabled={uploading}
                        className="w-full bg-gradient-to-r from-lavender-ice to-boreal-blue text-white border-0 hover:opacity-90"
                      >
                        {uploading ? (
                          <>Enviando...</>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload de Imagem
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="featured_image" className="text-muted-foreground text-sm">
                      Ou insira URL manualmente
                    </Label>
                    <Input
                      id="featured_image"
                      value={formData.featured_image}
                      onChange={(e) => {
                        setFormData({ ...formData, featured_image: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      placeholder="https://exemplo.com/imagem.jpg"
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="excerpt">Resumo</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    placeholder="Breve descrição do post (2-3 linhas)"
                    rows={3}
                    className="bg-background/50 border-border/50"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="content">Conteúdo</Label>
                  <RichTextEditor
                    content={formData.content}
                    onChange={(content) =>
                      setFormData({ ...formData, content })
                    }
                  />
                </div>

                <div className="flex items-center space-x-2 md:col-span-2">
                  <Switch
                    id="published"
                    checked={isPublished}
                    onCheckedChange={setIsPublished}
                  />
                  <Label htmlFor="published" className="cursor-pointer">
                    {isPublished ? "Publicado" : "Rascunho"}
                  </Label>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-[#C7A7FF] to-[#6EC8FF] hover:opacity-90 text-background font-semibold"
                >
                  {loading ? "Salvando..." : "Salvar"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/blog")}
                  disabled={loading}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminBlogForm;
