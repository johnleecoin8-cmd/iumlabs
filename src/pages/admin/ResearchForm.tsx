import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Upload, X, Image as ImageIcon } from 'lucide-react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ResearchFormData>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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
      if (existingPost.image) {
        setImagePreview(existingPost.image);
      }
    }
  }, [existingPost]);

  const handleImageFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }, []);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    // Skip if pasting in content textarea
    if (e.target instanceof HTMLTextAreaElement) return;
    
    const items = e.clipboardData.items;
    for (const item of Array.from(items)) {
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          handleImageFile(file);
        }
        break;
      }
    }
  }, [handleImageFile]);

  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  const uploadContentImage = useCallback(async (file: File, cursorPosition?: number) => {
    const placeholderId = `uploading-${Date.now()}`;
    const placeholder = `![Uploading...](${placeholderId})`;
    
    // Insert at cursor position or end
    setFormData(prev => {
      const pos = cursorPosition ?? prev.content.length;
      const before = prev.content.slice(0, pos);
      const after = prev.content.slice(pos);
      return { ...prev, content: before + '\n' + placeholder + '\n' + after };
    });
    
    toast.info('이미지 업로드 중...');
    
    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const fileName = `research/inline-${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from('project-images')
        .upload(fileName, file);
      
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName);
      
      setFormData(prev => ({
        ...prev,
        content: prev.content.replace(`![Uploading...](${placeholderId})`, `![image](${publicUrl})`)
      }));
      
      toast.success('이미지 업로드 완료!');
    } catch (error) {
      console.error('Upload error:', error);
      setFormData(prev => ({
        ...prev,
        content: prev.content.replace(`![Uploading...](${placeholderId})`, '[이미지 업로드 실패]')
      }));
      toast.error('이미지 업로드 실패');
    }
  }, []);

  const importRemoteImage = useCallback(async (imageUrl: string, cursorPosition?: number): Promise<string | null> => {
    try {
      const { data, error } = await supabase.functions.invoke('import-remote-image', {
        body: { url: imageUrl },
      });
      
      if (error || !data?.publicUrl) {
        console.error('Remote import error:', error);
        return null;
      }
      
      return data.publicUrl;
    } catch (error) {
      console.error('Remote import error:', error);
      return null;
    }
  }, []);

  const handleContentPaste = useCallback(async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData.items;
    const cursorPosition = e.currentTarget.selectionStart;
    
    // Check for direct image files first (screenshots, copied images)
    const imageFiles: File[] = [];
    for (const item of Array.from(items)) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) imageFiles.push(file);
      }
    }
    
    if (imageFiles.length > 0) {
      e.preventDefault();
      for (const file of imageFiles) {
        await uploadContentImage(file, cursorPosition);
      }
      return;
    }
    
    // Check for HTML content (copied from web pages)
    const html = e.clipboardData.getData('text/html');
    if (html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const imgElements = doc.querySelectorAll('img');
      
      if (imgElements.length === 0) return; // No images, let default paste happen
      
      e.preventDefault();
      
      // Also get plain text to preserve
      const plainText = e.clipboardData.getData('text/plain');
      
      toast.info(`이미지 ${imgElements.length}개 가져오는 중...`);
      
      let insertedContent = plainText || '';
      let successCount = 0;
      let failCount = 0;
      
      for (const img of Array.from(imgElements)) {
        const src = img.getAttribute('src') || img.getAttribute('data-src') || '';
        
        if (!src) continue;
        
        // Handle data URLs (base64 images)
        if (src.startsWith('data:image/')) {
          try {
            const response = await fetch(src);
            const blob = await response.blob();
            const file = new File([blob], `pasted-${Date.now()}.png`, { type: blob.type });
            await uploadContentImage(file, cursorPosition);
            successCount++;
          } catch (err) {
            console.error('Failed to process data URL:', err);
            failCount++;
          }
          continue;
        }
        
        // Handle remote URLs
        if (src.startsWith('http://') || src.startsWith('https://')) {
          const publicUrl = await importRemoteImage(src);
          if (publicUrl) {
            insertedContent += `\n![image](${publicUrl})\n`;
            successCount++;
          } else {
            // Fallback: use original URL (hotlink)
            insertedContent += `\n![image](${src})\n`;
            failCount++;
          }
        }
      }
      
      // Insert the content at cursor position
      if (insertedContent) {
        setFormData(prev => {
          const before = prev.content.slice(0, cursorPosition);
          const after = prev.content.slice(cursorPosition);
          return { ...prev, content: before + insertedContent + after };
        });
      }
      
      if (successCount > 0) {
        toast.success(`이미지 ${successCount}개 업로드 완료!`);
      }
      if (failCount > 0) {
        toast.warning(`${failCount}개 이미지는 원본 URL로 삽입됨`);
      }
    }
  }, [uploadContentImage, importRemoteImage]);

  const [isContentDragging, setIsContentDragging] = useState(false);

  const handleContentDrop = useCallback(async (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsContentDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const images = files.filter(file => file.type.startsWith('image/'));
    
    for (const file of images) {
      await uploadContentImage(file);
    }
  }, [uploadContentImage]);

  const handleContentDragOver = useCallback((e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsContentDragging(true);
  }, []);

  const handleContentDragLeave = useCallback((e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsContentDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageFile(file);
    }
  }, [handleImageFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData({ ...formData, image: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return formData.image || null;

    setIsUploading(true);
    try {
      const fileExt = imageFile.name.split('.').pop() || 'jpg';
      const slug = formData.slug || 'research';
      const fileName = `research/${slug}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const saveMutation = useMutation({
    mutationFn: async (data: ResearchFormData) => {
      const imageUrl = await uploadImage();

      const postData = {
        title: data.title,
        slug: data.slug,
        image: imageUrl,
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
        <div className="p-8 max-w-4xl" onPaste={handlePaste}>
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
                <Label className="text-white">Date</Label>
                <Input
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-[#111] border-white/10 text-white mt-1"
                  placeholder="e.g., Dec 11, 2024"
                />
              </div>

              {/* Image Upload Section */}
              <div className="col-span-2">
                <Label className="text-white mb-2 block">Cover Image</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {imagePreview ? (
                  <div className="relative rounded-lg overflow-hidden border border-white/10 bg-[#111]">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2 text-xs text-white/60">
                      {imageFile ? imageFile.name : 'Current image'}
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`
                      flex flex-col items-center justify-center gap-3 p-8
                      border-2 border-dashed rounded-lg cursor-pointer
                      transition-all duration-200
                      ${isDragging 
                        ? 'border-primary bg-primary/10' 
                        : 'border-white/20 hover:border-white/40 bg-[#111]'
                      }
                    `}
                  >
                    <div className={`p-3 rounded-full ${isDragging ? 'bg-primary/20' : 'bg-white/5'}`}>
                      {isDragging ? (
                        <Upload className="w-6 h-6 text-primary" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-white/40" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-white/80 font-medium">
                        {isDragging ? 'Drop image here' : 'Click to upload or drag & drop'}
                      </p>
                      <p className="text-white/40 text-sm mt-1">
                        Or paste from clipboard (Ctrl/Cmd + V)
                      </p>
                      <p className="text-white/30 text-xs mt-2">
                        PNG, JPG, WEBP up to 5MB
                      </p>
                    </div>
                  </div>
                )}
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
                <Label className="text-white">Read Time</Label>
                <Input
                  value={formData.read_time}
                  onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                  className="bg-[#111] border-white/10 text-white mt-1"
                  placeholder="e.g., 10 min read"
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
                <p className="text-white/40 text-xs mt-1 mb-2">
                  💡 이미지를 복사(Ctrl/Cmd+V) 또는 드래그 앤 드롭하면 자동 업로드됩니다
                </p>
                <div className="relative">
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    onPaste={handleContentPaste}
                    onDrop={handleContentDrop}
                    onDragOver={handleContentDragOver}
                    onDragLeave={handleContentDragLeave}
                    className={`bg-[#111] border-white/10 text-white mt-1 font-mono transition-colors ${
                      isContentDragging ? 'border-primary border-2 bg-primary/5' : ''
                    }`}
                    placeholder="Write your content in Markdown..."
                    rows={20}
                  />
                  {isContentDragging && (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/10 border-2 border-dashed border-primary rounded-md pointer-events-none">
                      <p className="text-primary font-medium">이미지를 여기에 드롭하세요</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2">
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
                disabled={saveMutation.isPending || isUploading}
              >
                <Save className="w-4 h-4 mr-2" />
                {saveMutation.isPending || isUploading ? 'Saving...' : 'Save Post'}
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
