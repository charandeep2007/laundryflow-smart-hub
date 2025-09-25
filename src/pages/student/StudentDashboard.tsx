import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const dashboardCards = [
    {
      title: "Place New Order",
      description: "Submit a new laundry order",
      icon: Plus,
      action: () => navigate('/student/orders?new=true'),
      className: "bg-primary text-primary-foreground hover:bg-primary/90",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation userType="student" />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, Student</h1>
          <p className="text-muted-foreground">Manage your laundry orders and track their progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Place New Order - Main Action */}
          <div className="lg:col-span-1">
            {dashboardCards.map((card, index) => (
              <Card 
                key={card.title} 
                className="card-elegant cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <card.icon className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className={`w-full ${card.className || 'btn-gradient'}`}
                    onClick={card.action}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card className="card-elegant lg:col-span-1">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <p className="font-medium">Order #001</p>
                    <p className="text-sm text-muted-foreground">Premium Wash</p>
                  </div>
                  <span className="status-collected">Collected</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <p className="font-medium">Order #002</p>
                    <p className="text-sm text-muted-foreground">Normal Wash</p>
                  </div>
                  <span className="status-pending">Pending</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="card-elegant lg:col-span-1">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Your summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Orders</span>
                  <span className="text-2xl font-bold text-primary">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Pending</span>
                  <span className="text-2xl font-bold text-warning">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="text-2xl font-bold text-success">10</span>
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