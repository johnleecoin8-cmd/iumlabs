import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, User, Calendar, Check, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const AdminContacts = () => {
  const queryClient = useQueryClient();

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ is_read: true })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contacts'] });
      toast.success('Marked as read');
    },
  });

  const deleteContactMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contacts'] });
      toast.success('Contact deleted');
    },
  });

  const unreadCount = contacts?.filter(c => !c.is_read).length || 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contact Submissions</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread message(s)` : 'All messages read'}
          </p>
        </div>
      </div>

      {contacts?.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No contact submissions yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {contacts?.map((contact) => (
            <Card key={contact.id} className={!contact.is_read ? 'border-primary/50 bg-primary/5' : ''}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {contact.name}
                        {!contact.is_read && (
                          <Badge variant="default" className="text-xs">New</Badge>
                        )}
                      </CardTitle>
                      <a 
                        href={`mailto:${contact.email}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {contact.created_at && format(new Date(contact.created_at), 'MMM d, yyyy HH:mm')}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {contact.comments && (
                  <p className="text-foreground whitespace-pre-wrap mb-4">{contact.comments}</p>
                )}
                <div className="flex gap-2">
                  {!contact.is_read && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => markAsReadMutation.mutate(contact.id)}
                      disabled={markAsReadMutation.isPending}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Mark as Read
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this contact?')) {
                        deleteContactMutation.mutate(contact.id);
                      }
                    }}
                    disabled={deleteContactMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
