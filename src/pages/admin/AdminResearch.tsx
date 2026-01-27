import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function AdminResearch() {
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['admin-research-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('research_posts')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('research_posts')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-research-posts'] });
      toast.success('Blog post deleted');
    },
    onError: () => {
      toast.error('Failed to delete post');
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, is_published }: { id: string; is_published: boolean }) => {
      const { error } = await supabase
        .from('research_posts')
        .update({ is_published: !is_published })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-research-posts'] });
      toast.success('Post status updated');
    },
  });

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
              <p className="text-white/60 mt-1">Manage your blog articles and insights</p>
            </div>
            <Link to="/ium-admin/blog/new">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="text-white/60">Loading...</div>
          ) : posts && posts.length > 0 ? (
            <div className="bg-[#111] rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Order</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Author</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-white/60">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <GripVertical className="w-4 h-4 text-white/40" />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{post.title}</p>
                          <p className="text-white/40 text-sm">{post.slug}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white/60">{post.author}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => togglePublishMutation.mutate({ id: post.id, is_published: post.is_published ?? true })}
                          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                            post.is_published
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {post.is_published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          {post.is_published ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Link to={`/ium-admin/blog/${post.id}/edit`}>
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            onClick={() => handleDelete(post.id, post.title)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-[#111] rounded-xl border border-white/10 p-12 text-center">
              <p className="text-white/60 mb-4">No blog posts yet</p>
              <Link to="/ium-admin/blog/new">
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Post
                </Button>
              </Link>
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
