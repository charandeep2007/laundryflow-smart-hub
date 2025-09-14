import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface Complaint {
  id: string;
  subject: string;
  description: string;
  status: string;
  date: string;
}

export default function StudentComplaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: "C001",
      subject: "Delayed delivery",
      description: "My order was supposed to be delivered yesterday but hasn't arrived yet.",
      status: "Pending",
      date: "2025-01-13",
    },
    {
      id: "C002",
      subject: "Stain not removed",
      description: "There was a stain on my shirt that wasn't properly cleaned.",
      status: "Resolved",
      date: "2025-01-10",
    },
  ]);

  const [newComplaint, setNewComplaint] = useState({
    subject: "",
    description: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmitComplaint = () => {
    if (!newComplaint.subject.trim() || !newComplaint.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const complaint: Complaint = {
      id: `C${String(complaints.length + 1).padStart(3, '0')}`,
      subject: newComplaint.subject,
      description: newComplaint.description,
      status: "Pending",
      date: new Date().toISOString().split('T')[0],
    };

    setComplaints([complaint, ...complaints]);
    setNewComplaint({ subject: "", description: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Complaint Submitted",
      description: `Complaint #${complaint.id} has been submitted successfully`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <span className="status-pending">Pending</span>;
      case 'resolved':
        return <span className="status-resolved">Resolved</span>;
      default:
        return <span className="status-pending">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation userType="student" />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Complaints</h1>
            <p className="text-muted-foreground">Submit and track your complaints and feedback</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-gradient flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Complaint
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Submit New Complaint</DialogTitle>
                <DialogDescription>
                  Tell us about any issues or feedback you have
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="complaint-subject">Complaint Subject</Label>
                  <Input
                    id="complaint-subject"
                    value={newComplaint.subject}
                    onChange={(e) => setNewComplaint({...newComplaint, subject: e.target.value})}
                    placeholder="Brief description of the issue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complaint-description">Description</Label>
                  <Textarea
                    id="complaint-description"
                    value={newComplaint.description}
                    onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
                    placeholder="Provide detailed information about your complaint"
                    rows={4}
                  />
                </div>

                <Button className="w-full btn-gradient" onClick={handleSubmitComplaint}>
                  Submit Complaint
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {complaints.map((complaint, index) => (
            <Card 
              key={complaint.id} 
              className="card-elegant"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">#{complaint.id}</CardTitle>
                    <CardDescription className="mt-1">{complaint.date}</CardDescription>
                  </div>
                  {getStatusBadge(complaint.status)}
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-2">{complaint.subject}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {complaint.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {complaints.length === 0 && (
          <Card className="card-elegant">
            <CardContent className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <p className="text-lg">No complaints submitted yet</p>
                <p className="text-sm">Click "New Complaint" to submit your first complaint</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}