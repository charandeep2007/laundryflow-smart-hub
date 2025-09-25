import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Order {
  id: string;
  washType: string;
  detergentType: string;
  clothCount: number;
  givenDate: string;
  returnDate: string;
  status: string;
}

export default function StudentOrders() {
  const [orders] = useState<Order[]>([
    {
      id: "001",
      washType: "Premium",
      detergentType: "Hypoallergenic",
      clothCount: 5,
      givenDate: "2025-01-10",
      returnDate: "2025-01-12",
      status: "Collected",
    },
    {
      id: "002",
      washType: "Normal",
      detergentType: "Standard",
      clothCount: 8,
      givenDate: "2025-01-14",
      returnDate: "2025-01-16",
      status: "Pending",
    },
  ]);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation userType="student" />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
            <p className="text-muted-foreground">Track and manage your laundry orders</p>
          </div>
        </div>

        <Card className="card-elegant">
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>All your laundry orders and their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Wash Type</TableHead>
                    <TableHead>Detergent Type</TableHead>
                    <TableHead>Cloth Count</TableHead>
                    <TableHead>Given Date</TableHead>
                    <TableHead>Return Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-accent/50">
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{order.washType}</TableCell>
                      <TableCell>{order.detergentType}</TableCell>
                      <TableCell>{order.clothCount}</TableCell>
                      <TableCell>{order.givenDate}</TableCell>
                      <TableCell>{order.returnDate}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}