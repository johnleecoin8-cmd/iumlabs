import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, FileText, Mail, LogOut, ChevronLeft } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAdminAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Failed to sign out');
    } else {
      navigate('/ium-admin');
    }
  };

  const navItems = [
    { path: '/ium-admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/ium-admin/projects', label: 'Projects', icon: FolderKanban },
    { path: '/ium-admin/research', label: 'Research', icon: FileText },
    { path: '/ium-admin/contacts', label: 'Contacts', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#111] border-r border-white/10 z-50">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Back to site</span>
          </Link>
          
          <h1 className="text-xl font-bold text-white mb-8">Admin Panel</h1>
          
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                    ? 'bg-primary/10 text-primary'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
          <p className="text-white/40 text-xs mb-3 truncate">{user?.email}</p>
          <Button
            variant="ghost"
            className="w-full justify-start text-white/60 hover:text-white hover:bg-white/5"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
