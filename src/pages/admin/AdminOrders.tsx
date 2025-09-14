import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  studentId: string;
  washType: string;
  detergentType: string;
  clothCount: number;
  givenDate: string;
  returnDate: string;
  status: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "001",
      studentId: "ST001",
      washType: "Premium",
      detergentType: "Hypoallergenic",
      clothCount: 5,
      givenDate: "2025-01-10",
      returnDate: "2025-01-12",
      status: "Delivered",
    },
    {
      id: "002",
      studentId: "ST002",
      washType: "Normal",
      detergentType: "Standard",
      clothCount: 8,
      givenDate: "2025-01-14",
      returnDate: "2025-01-16",
      status: "Pending",
    },
    {
      id: "003",
      studentId: "ST003",
      washType: "Dry Clean",
      detergentType: "Standard",
      clothCount: 3,
      givenDate: "2025-01-13",
      returnDate: "2025-01-15",
      status: "Collected",
    },
    {
      id: "004",
      studentId: "ST001",
      washType: "Normal",
      detergentType: "Hypoallergenic",
      clothCount: 6,
      givenDate: "2025-01-15",
      returnDate: "2025-01-17",
      status: "Pending",
    },
  ]);

  const { toast } = useToast();

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    toast({
      title: "Status Updated",
      description: `Order #${orderId} marked as ${newStatus}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <span className="status-pending">Pending</span>;
      case 'collected':
        return <span className="status-collected">Collected</span>;
      case 'delivered':
        return <span className="status-delivered">Delivered</span>;
      default:
        return <span className="status-pending">{status}</span>;
    }
  };

  const getActionButtons = (order: Order) => {
    const buttons = [];
    
    if (order.status === 'Pending') {
      buttons.push(
        <Button
          key="collect"
          size="sm"
          variant="outline"
          onClick={() => updateOrderStatus(order.id, 'Collected')}
          className="mr-2"
        >
          Mark Collected
        </Button>
      );
    }
    
    if (order.status === 'Collected') {
      buttons.push(
        <Button
          key="deliver"
          size="sm"
          className="btn-gradient"
          onClick={() => updateOrderStatus(order.id, 'Delivered')}
        >
          Mark Delivered
        </Button>
      );
    }
    
    return buttons.length > 0 ? buttons : <span className="text-muted-foreground text-sm">No actions</span>;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation userType="admin" />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Manage Orders</h1>
          <p className="text-muted-foreground">Track and update the status of all student orders</p>
        </div>

        <Card className="card-elegant">
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
            <CardDescription>Complete list of student laundry orders with management actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Wash Type</TableHead>
                    <TableHead>Detergent Type</TableHead>
                    <TableHead>Cloth Count</TableHead>
                    <TableHead>Given Date</TableHead>
                    <TableHead>Return Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-accent/50">
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{order.studentId}</TableCell>
                      <TableCell>{order.washType}</TableCell>
                      <TableCell>{order.detergentType}</TableCell>
                      <TableCell>{order.clothCount}</TableCell>
                      <TableCell>{order.givenDate}</TableCell>
                      <TableCell>{order.returnDate}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{getActionButtons(order)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="text-lg">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">
                {orders.filter(order => order.status === 'Pending').length}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Awaiting collection</p>
            </CardContent>
          </Card>

          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="text-lg">Collected Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {orders.filter(order => order.status === 'Collected').length}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Ready for delivery</p>
            </CardContent>
          </Card>

          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="text-lg">Delivered Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {orders.filter(order => order.status === 'Delivered').length}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Completed orders</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}