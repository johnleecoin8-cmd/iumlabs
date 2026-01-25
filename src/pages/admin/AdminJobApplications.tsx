import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, Calendar, Check, Briefcase, Mail, Phone, 
  ExternalLink, FileText, MessageSquare, Linkedin
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";

const AdminJobApplications = () => {
  const queryClient = useQueryClient();

  const { data: applications, isLoading } = useQuery({
    queryKey: ['admin-job-applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('job_applications')
        .update({ is_read: true })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-job-applications'] });
      toast.success('Marked as read');
    },
  });

  const unreadCount = applications?.filter(a => !a.is_read).length || 0;

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="p-8">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Job Applications</h1>
              <p className="text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} new application(s)` : 'All applications reviewed'}
              </p>
            </div>
          </div>

          {applications?.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No job applications yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {applications?.map((application) => (
                <Card key={application.id} className={!application.is_read ? 'border-primary/50 bg-primary/5' : ''}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {application.name}
                            {!application.is_read && (
                              <Badge variant="default" className="text-xs">New</Badge>
                            )}
                          </CardTitle>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Briefcase className="h-3 w-3" />
                            <span className="font-medium text-foreground/80">{application.position}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {application.created_at && format(new Date(application.created_at), 'MMM d, yyyy HH:mm')}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Contact Info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      <a 
                        href={`mailto:${application.email}`}
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <Mail className="h-4 w-4" />
                        {application.email}
                      </a>
                      {application.phone && (
                        <a 
                          href={`tel:${application.phone}`}
                          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                        >
                          <Phone className="h-4 w-4" />
                          {application.phone}
                        </a>
                      )}
                      {application.telegram && (
                        <a 
                          href={`https://t.me/${application.telegram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                        >
                          <MessageSquare className="h-4 w-4" />
                          {application.telegram}
                        </a>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      {application.portfolio_url && (
                        <a 
                          href={application.portfolio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Portfolio
                        </a>
                      )}
                      {application.linkedin_url && (
                        <a 
                          href={application.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </a>
                      )}
                      {application.resume_url && (
                        <a 
                          href={application.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          <FileText className="h-4 w-4" />
                          Resume
                        </a>
                      )}
                    </div>

                    {/* Cover Letter */}
                    {application.cover_letter && (
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-1">Cover Letter</p>
                        <p className="text-foreground/80 whitespace-pre-wrap text-sm bg-muted/30 p-3 rounded-lg">
                          {application.cover_letter}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      {!application.is_read && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAsReadMutation.mutate(application.id)}
                          disabled={markAsReadMutation.isPending}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Mark as Reviewed
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminJobApplications;