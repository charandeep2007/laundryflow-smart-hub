import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Clock, MessageSquare, Droplets } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Orders",
      value: "45",
      description: "All time orders",
      icon: Package,
      color: "text-primary",
    },
    {
      title: "Orders Pending",
      value: "8",
      description: "Awaiting processing",
      icon: Clock,
      color: "text-warning",
    },
    {
      title: "Complaints Pending",
      value: "3",
      description: "Require attention",
      icon: MessageSquare,
      color: "text-destructive",
    },
    {
      title: "Detergent Stock",
      value: "85%",
      description: "Inventory level",
      icon: Droplets,
      color: "text-success",
    },
  ];

  const recentOrders = [
    { id: "005", student: "ST001", type: "Premium", status: "Pending", date: "2025-01-14" },
    { id: "006", student: "ST002", type: "Normal", status: "Collected", date: "2025-01-14" },
    { id: "007", student: "ST003", type: "Dry Clean", status: "Pending", date: "2025-01-13" },
  ];

  const recentComplaints = [
    { id: "C003", student: "ST001", subject: "Late delivery", status: "Pending" },
    { id: "C004", student: "ST005", subject: "Quality issue", status: "Pending" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <span className="status-pending">Pending</span>;
      case 'collected':
        return <span className="status-collected">Collected</span>;
      case 'delivered':
        return <span className="status-delivered">Delivered</span>;
      case 'resolved':
        return <span className="status-resolved">Resolved</span>;
      default:
        return <span className="status-pending">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation userType="admin" />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, Admin</h1>
          <p className="text-muted-foreground">Manage laundry operations and monitor system performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={stat.title} 
              className="card-elegant"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest laundry orders from students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <div>
                      <p className="font-medium">#{order.id} - {order.student}</p>
                      <p className="text-sm text-muted-foreground">{order.type} • {order.date}</p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant">
            <CardHeader>
              <CardTitle>Recent Complaints</CardTitle>
              <CardDescription>Student complaints requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentComplaints.map((complaint) => (
                  <div key={complaint.id} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <div>
                      <p className="font-medium">#{complaint.id} - {complaint.student}</p>
                      <p className="text-sm text-muted-foreground">{complaint.subject}</p>
                    </div>
                    {getStatusBadge(complaint.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
              <CardDescription>Quick overview of system performance and key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">92%</div>
                  <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">2.3 days</div>
                  <p className="text-sm text-muted-foreground">Average Turnaround</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning mb-2">15 min</div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}