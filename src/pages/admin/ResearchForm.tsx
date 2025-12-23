import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ResearchFormData {
  title: string;
  slug: string;
  image: string;
  date: string;
  read_time: string;
  category: string;
  author: string;
  author_role: string;
  excerpt: string;
  tags: string;
  content: string;
  is_published: boolean;
  display_order: number;
}

const initialFormData: ResearchFormData = {
  title: '',
  slug: '',
  image: '',
  date: '',
  read_time: '',
  category: '',
  author: '',
  author_role: '',
  excerpt: '',
  tags: '',
  content: '',
  is_published: true,
  display_order: 0,
};

export default function ResearchForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<ResearchFormData>(initialFormData);

  const { data: existingPost, isLoading } = useQuery({
    queryKey: ['research-post', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('research_posts')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: isEditing,
  });

  useEffect(() => {
    if (existingPost) {
      setFormData({
        title: existingPost.title || '',
        slug: existingPost.slug || '',
        image: existingPost.image || '',
        date: existingPost.date || '',
        read_time: existingPost.read_time || '',
        category: existingPost.category || '',
        author: existingPost.author || '',
        author_role: existingPost.author_role || '',
        excerpt: existingPost.excerpt || '',
        tags: existingPost.tags?.join(', ') || '',
        content: existingPost.content || '',
        is_published: existingPost.is_published ?? true,
        display_order: existingPost.display_order ?? 0,
      });
    }
  }, [existingPost]);

  const saveMutation = useMutation({
    mutationFn: async (data: ResearchFormData) => {
      const postData = {
        title: data.title,
        slug: data.slug,
        image: data.image || null,
        date: data.date || null,
        read_time: data.read_time || null,
        category: data.category || null,
        author: data.author || null,
        author_role: data.author_role || null,
        excerpt: data.excerpt || null,
        tags: data.tags ? data.tags.split(',').map(t => t.trim()) : [],
        content: data.content || null,
        is_published: data.is_published,
        display_order: data.display_order,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('research_posts')
          .update(postData)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('research_posts')
          .insert(postData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-research-posts'] });
      toast.success(isEditing ? 'Post updated!' : 'Post created!');
      navigate('/ium-admin/research');
    },
    onError: (error) => {
      toast.error('Failed to save post');
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      toast.error('Title and slug are required');
      return;
    }
    saveMutation.mutate(formData);
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData({ ...formData, slug });
  };

  if (isEditing && isLoading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="p-8 text-white">Loading...</div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="p-8 max-w-4xl">
          <button
            onClick={() => navigate('/ium-admin/research')}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Research
          </button>

          <h1 className="text-3xl font-bold text-white mb-8">
            {isEditing ? 'Edit Research Post' : 'New Research Post'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <Label className="text-white">Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-[#111] border-white/10 text-white mt-1"
                  placeholder="Enter post title"
                />
              </div>

              <div className="col-span-2">
                <Label className="text-white">Slug *</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="bg-[#111] border-white/10 text-white"
                    placeholder="url-friendly-slug"
                  />
                  <Button type="button" variant="outline" onClick={generateSlug}>
                    Generate
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-white">Category</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-[#111] border-white/10 text-white mt-1"
                  placeholder="e.g., Market Research, DeFi"
                />
              </div>

              <div>
                <Label className="text-white">Image URL</Label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="bg-[#111] border-white/10 text-white mt-1"
                  placeholder="https://..."
                />
              </div>

              <div>
                <Label className="text-white">Author</Label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="bg-[#111] border-white/10 text-white mt-1"
                  placeholder="Author name"
                />
              </div>

              <div>
                <Label className="text-white">Author Role</Label>
                <Input
                  value={formData.author_role}
                  onChange={(e) => setFormData({ ...formData, author_role: e.target.value })}
                  className="bg-[#111] border-white/10 text-white mt-1"
                  placeholder="e.g., Co-Founder"
                />
              </div>

              <div>
                <Label className="text-white">Date</Label>
                <Input
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-[#111] border-white/10 text-white mt-1"
                  placeholder="e.g., Dec 11, 2024"
                />
              </div>

              <div>
                <Label className="text-white">Read Time</Label>
                <Input
                  value={formData.read_time}
                  onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                  className="bg-[#111] border-white/10 text-white mt-1"
                  placeholder="e.g., 10 min read"
                />
              </div>

              <div className="col-span-2">
                <Label className="text-white">Tags (comma separated)</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="bg-[#111] border-white/10 text-white mt-1"
                  placeholder="DeFi, AI, Korea, 2025"
                />
              </div>

              <div className="col-span-2">
                <Label className="text-white">Excerpt</Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="bg-[#111] border-white/10 text-white mt-1"
                  placeholder="Short description of the post"
                  rows={3}
                />
              </div>

              <div className="col-span-2">
                <Label className="text-white">Content (Markdown)</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="bg-[#111] border-white/10 text-white mt-1 font-mono"
                  placeholder="Write your content in Markdown..."
                  rows={20}
                />
              </div>

              <div>
                <Label className="text-white">Display Order</Label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  className="bg-[#111] border-white/10 text-white mt-1"
                />
              </div>

              <div className="flex items-center gap-3 pt-6">
                <Switch
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <Label className="text-white">Published</Label>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={saveMutation.isPending}
              >
                <Save className="w-4 h-4 mr-2" />
                {saveMutation.isPending ? 'Saving...' : 'Save Post'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/ium-admin/research')}
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
