import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

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
  const [searchParams] = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([
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

  const [newOrder, setNewOrder] = useState({
    washType: "",
    detergentType: "",
    clothCount: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (searchParams.get('new') === 'true') {
      setIsDialogOpen(true);
    }
  }, [searchParams]);

  const handleSubmitOrder = () => {
    if (!newOrder.washType || !newOrder.detergentType || !newOrder.clothCount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const order: Order = {
      id: String(orders.length + 1).padStart(3, '0'),
      washType: newOrder.washType,
      detergentType: newOrder.detergentType,
      clothCount: parseInt(newOrder.clothCount),
      givenDate: new Date().toISOString().split('T')[0],
      returnDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "Pending",
    };

    setOrders([...orders, order]);
    setNewOrder({ washType: "", detergentType: "", clothCount: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Order Placed",
      description: `Order #${order.id} has been submitted successfully`,
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation userType="student" />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
            <p className="text-muted-foreground">Track and manage your laundry orders</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-gradient flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Place New Order</DialogTitle>
                <DialogDescription>
                  Fill in the details for your laundry order
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="wash-type">Wash Type</Label>
                  <Select onValueChange={(value) => setNewOrder({...newOrder, washType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select wash type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                      <SelectItem value="Dry Clean">Dry Clean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detergent-type">Detergent Type</Label>
                  <Select onValueChange={(value) => setNewOrder({...newOrder, detergentType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select detergent type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Hypoallergenic">Hypoallergenic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cloth-count">Cloth Count</Label>
                  <Input
                    id="cloth-count"
                    type="number"
                    min="1"
                    value={newOrder.clothCount}
                    onChange={(e) => setNewOrder({...newOrder, clothCount: e.target.value})}
                    placeholder="Enter number of items"
                  />
                </div>

                <Button className="w-full btn-gradient" onClick={handleSubmitOrder}>
                  Submit Order
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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