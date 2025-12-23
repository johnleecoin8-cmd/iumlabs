import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, FolderKanban, Users, FileText } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

export default function AdminDashboard() {
  const { data: projectCount } = useQuery({
    queryKey: ['admin-project-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    },
  });

  const { data: contactCount } = useQuery({
    queryKey: ['admin-contact-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    },
  });

  const { data: subscriberCount } = useQuery({
    queryKey: ['admin-subscriber-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    },
  });

  const stats = [
    { label: 'Projects', value: projectCount ?? 0, icon: FolderKanban, href: '/ium-admin/projects' },
    { label: 'Contacts', value: contactCount ?? 0, icon: FileText, href: '#' },
    { label: 'Subscribers', value: subscriberCount ?? 0, icon: Users, href: '#' },
  ];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-white/50 mt-1">Overview of your admin panel</p>
            </div>
            <Link to="/ium-admin/projects/new">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <Link
                key={stat.label}
                to={stat.href}
                className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-white/50 text-sm">{stat.label}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-[#111] border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/ium-admin/projects/new"
                className="flex items-center gap-3 p-4 bg-[#0A0A0A] rounded-lg hover:bg-white/5 transition-colors"
              >
                <Plus className="w-5 h-5 text-primary" />
                <span className="text-white">Create New Project</span>
              </Link>
              <Link
                to="/ium-admin/projects"
                className="flex items-center gap-3 p-4 bg-[#0A0A0A] rounded-lg hover:bg-white/5 transition-colors"
              >
                <FolderKanban className="w-5 h-5 text-primary" />
                <span className="text-white">Manage Projects</span>
              </Link>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
