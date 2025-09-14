import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface Complaint {
  id: string;
  studentId: string;
  subject: string;
  description: string;
  status: string;
  date: string;
}

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: "C001",
      studentId: "ST001",
      subject: "Delayed delivery",
      description: "My order was supposed to be delivered yesterday but hasn't arrived yet. I need my clothes for an important meeting tomorrow.",
      status: "Pending",
      date: "2025-01-13",
    },
    {
      id: "C002",
      studentId: "ST002",
      subject: "Stain not removed",
      description: "There was a coffee stain on my white shirt that wasn't properly cleaned. The stain is still visible after washing.",
      status: "Resolved",
      date: "2025-01-10",
    },
    {
      id: "C003",
      studentId: "ST003",
      subject: "Wrong detergent used",
      description: "I specifically requested hypoallergenic detergent but standard detergent was used, causing skin irritation.",
      status: "Pending",
      date: "2025-01-14",
    },
  ]);

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const { toast } = useToast();

  const resolveComplaint = (complaintId: string) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === complaintId ? { ...complaint, status: 'Resolved' } : complaint
    ));
    
    toast({
      title: "Complaint Resolved",
      description: `Complaint #${complaintId} has been marked as resolved`,
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

  const getActionButtons = (complaint: Complaint) => {
    if (complaint.status === 'Pending') {
      return (
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedComplaint(complaint)}
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Complaint Details</DialogTitle>
                <DialogDescription>
                  #{selectedComplaint?.id} - {selectedComplaint?.studentId}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Subject:</h4>
                  <p className="text-sm">{selectedComplaint?.subject}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Description:</h4>
                  <p className="text-sm leading-relaxed">{selectedComplaint?.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Date:</h4>
                  <p className="text-sm">{selectedComplaint?.date}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Status:</h4>
                  {selectedComplaint && getStatusBadge(selectedComplaint.status)}
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            size="sm"
            className="btn-gradient"
            onClick={() => resolveComplaint(complaint.id)}
          >
            Mark Resolved
          </Button>
        </div>
      );
    }
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSelectedComplaint(complaint)}
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
            <DialogDescription>
              #{selectedComplaint?.id} - {selectedComplaint?.studentId}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Subject:</h4>
              <p className="text-sm">{selectedComplaint?.subject}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Description:</h4>
              <p className="text-sm leading-relaxed">{selectedComplaint?.description}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Date:</h4>
              <p className="text-sm">{selectedComplaint?.date}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Status:</h4>
              {selectedComplaint && getStatusBadge(selectedComplaint.status)}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation userType="admin" />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Complaints Management</h1>
          <p className="text-muted-foreground">Review and resolve student complaints and feedback</p>
        </div>

        <Card className="card-elegant">
          <CardHeader>
            <CardTitle>All Complaints</CardTitle>
            <CardDescription>Student complaints and their resolution status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Complaint ID</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complaints.map((complaint) => (
                    <TableRow key={complaint.id} className="hover:bg-accent/50">
                      <TableCell className="font-medium">#{complaint.id}</TableCell>
                      <TableCell>{complaint.studentId}</TableCell>
                      <TableCell className="max-w-xs truncate">{complaint.subject}</TableCell>
                      <TableCell>{complaint.date}</TableCell>
                      <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                      <TableCell>{getActionButtons(complaint)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="text-lg">Pending Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">
                {complaints.filter(complaint => complaint.status === 'Pending').length}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Require attention</p>
            </CardContent>
          </Card>

          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="text-lg">Resolved Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {complaints.filter(complaint => complaint.status === 'Resolved').length}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Successfully resolved</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}