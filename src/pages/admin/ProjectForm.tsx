import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

const projectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  slug: z.string().min(1, 'Slug is required').max(100).regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().max(1000).optional(),
  result: z.string().max(100).optional(),
  category: z.string().max(50).optional(),
  glow_color: z.string().max(20).optional(),
});

interface ProjectFormData {
  name: string;
  slug: string;
  description: string;
  result: string;
  category: string;
  glow_color: string;
  logo_url: string;
  background_url: string;
  is_published: boolean;
  display_order: number;
}

export default function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    slug: '',
    description: '',
    result: '',
    category: '',
    glow_color: '#00D4FF',
    logo_url: '',
    background_url: '',
    is_published: true,
    display_order: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bgFile, setBgFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [bgPreview, setBgPreview] = useState<string>('');

  // Fetch existing project data if editing
  const { data: existingProject, isLoading: isLoadingProject } = useQuery({
    queryKey: ['admin-project', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: isEditing,
  });

  useEffect(() => {
    if (existingProject) {
      setFormData({
        name: existingProject.name || '',
        slug: existingProject.slug || '',
        description: existingProject.description || '',
        result: existingProject.result || '',
        category: existingProject.category || '',
        glow_color: existingProject.glow_color || '#00D4FF',
        logo_url: existingProject.logo_url || '',
        background_url: existingProject.background_url || '',
        is_published: existingProject.is_published ?? true,
        display_order: existingProject.display_order || 0,
      });
      if (existingProject.logo_url) setLogoPreview(existingProject.logo_url);
      if (existingProject.background_url) setBgPreview(existingProject.background_url);
    }
  }, [existingProject]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'background') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    if (type === 'logo') {
      setLogoFile(file);
      setLogoPreview(preview);
    } else {
      setBgFile(file);
      setBgPreview(preview);
    }
  };

  const uploadFile = async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from('project-images')
      .upload(path, file, { upsert: true });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(path);

    return publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      // Validate
      const result = projectSchema.safeParse(formData);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          fieldErrors[err.path[0] as string] = err.message;
        });
        setErrors(fieldErrors);
        throw new Error('Validation failed');
      }

      let logoUrl = formData.logo_url;
      let bgUrl = formData.background_url;

      // Upload files if changed
      if (logoFile) {
        const path = `logos/${formData.slug}-${Date.now()}.${logoFile.name.split('.').pop()}`;
        logoUrl = await uploadFile(logoFile, path);
      }

      if (bgFile) {
        const path = `backgrounds/${formData.slug}-${Date.now()}.${bgFile.name.split('.').pop()}`;
        bgUrl = await uploadFile(bgFile, path);
      }

      const projectData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description || null,
        result: formData.result || null,
        category: formData.category || null,
        glow_color: formData.glow_color || '#00D4FF',
        logo_url: logoUrl || null,
        background_url: bgUrl || null,
        is_published: formData.is_published,
        display_order: formData.display_order,
      };

      if (isEditing && id) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('projects').insert(projectData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success(isEditing ? 'Project updated' : 'Project created');
      navigate('/ium-admin/projects');
    },
    onError: (error) => {
      if (error.message !== 'Validation failed') {
        toast.error('Failed to save project');
      }
    },
  });

  const generateSlug = () => {
    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setFormData((prev) => ({ ...prev, slug }));
  };

  if (isEditing && isLoadingProject) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex items-center justify-center h-screen">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="p-8 max-w-4xl">
          <button
            onClick={() => navigate('/ium-admin/projects')}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>

          <h1 className="text-3xl font-bold text-white mb-8">
            {isEditing ? 'Edit Project' : 'New Project'}
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveMutation.mutate();
            }}
            className="space-y-8"
          >
            {/* Basic Info */}
            <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-6">
              <h2 className="text-lg font-semibold text-white">Basic Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/80">Project Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    onBlur={() => !formData.slug && generateSlug()}
                    className="bg-[#0A0A0A] border-white/10 text-white"
                    placeholder="e.g. BNB Chain"
                  />
                  {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-white/80">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    className="bg-[#0A0A0A] border-white/10 text-white"
                    placeholder="e.g. bnb-chain"
                  />
                  {errors.slug && <p className="text-red-400 text-sm">{errors.slug}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white/80">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    className="bg-[#0A0A0A] border-white/10 text-white"
                    placeholder="e.g. Infrastructure"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="result" className="text-white/80">Result / Highlight</Label>
                  <Input
                    id="result"
                    value={formData.result}
                    onChange={(e) => setFormData((prev) => ({ ...prev, result: e.target.value }))}
                    className="bg-[#0A0A0A] border-white/10 text-white"
                    placeholder="e.g. +340% Korean Trading Volume"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white/80">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="bg-[#0A0A0A] border-white/10 text-white min-h-[100px]"
                  placeholder="Brief description of the project..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="glow_color" className="text-white/80">Glow Color</Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      id="glow_color"
                      value={formData.glow_color}
                      onChange={(e) => setFormData((prev) => ({ ...prev, glow_color: e.target.value }))}
                      className="w-10 h-10 rounded border border-white/10 cursor-pointer"
                    />
                    <Input
                      value={formData.glow_color}
                      onChange={(e) => setFormData((prev) => ({ ...prev, glow_color: e.target.value }))}
                      className="bg-[#0A0A0A] border-white/10 text-white flex-1"
                      placeholder="#00D4FF"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="display_order" className="text-white/80">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData((prev) => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                    className="bg-[#0A0A0A] border-white/10 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-6">
              <h2 className="text-lg font-semibold text-white">Images</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo */}
                <div className="space-y-2">
                  <Label className="text-white/80">Logo</Label>
                  <div className="border-2 border-dashed border-white/10 rounded-lg p-4 text-center">
                    {logoPreview ? (
                      <div className="relative inline-block">
                        <img src={logoPreview} alt="Logo" className="h-20 object-contain" />
                        <button
                          type="button"
                          onClick={() => {
                            setLogoFile(null);
                            setLogoPreview('');
                            setFormData((prev) => ({ ...prev, logo_url: '' }));
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <div className="flex flex-col items-center gap-2 text-white/40 hover:text-white/60 transition-colors">
                          <Upload className="w-8 h-8" />
                          <span className="text-sm">Upload Logo</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, 'logo')}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Background */}
                <div className="space-y-2">
                  <Label className="text-white/80">Background Image</Label>
                  <div className="border-2 border-dashed border-white/10 rounded-lg p-4 text-center">
                    {bgPreview ? (
                      <div className="relative inline-block">
                        <img src={bgPreview} alt="Background" className="h-20 object-cover rounded" />
                        <button
                          type="button"
                          onClick={() => {
                            setBgFile(null);
                            setBgPreview('');
                            setFormData((prev) => ({ ...prev, background_url: '' }));
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <div className="flex flex-col items-center gap-2 text-white/40 hover:text-white/60 transition-colors">
                          <Upload className="w-8 h-8" />
                          <span className="text-sm">Upload Background</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, 'background')}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-[#111] border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Published</h3>
                  <p className="text-white/50 text-sm">Make this project visible on the website</p>
                </div>
                <Switch
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_published: checked }))}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={saveMutation.isPending}
              >
                {saveMutation.isPending ? 'Saving...' : isEditing ? 'Update Project' : 'Create Project'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/ium-admin/projects')}
                className="border-white/10 text-white hover:bg-white/5"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
