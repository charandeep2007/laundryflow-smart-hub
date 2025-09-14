import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets } from "lucide-react";
import Footer from "@/components/Footer";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (userType: 'student' | 'admin') => {
    if (username && password) {
      navigate(`/${userType}/dashboard`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Droplets className="h-12 w-12 text-primary mr-3" />
              <h1 className="text-4xl font-bold text-foreground">LaundryFlow</h1>
            </div>
            <p className="text-lg text-muted-foreground">Smart Laundry Management System</p>
          </div>

          <Card className="card-elegant">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>Select your login type and enter credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="student" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="student">Student Login</TabsTrigger>
                  <TabsTrigger value="admin">Admin Login</TabsTrigger>
                </TabsList>
                
                <TabsContent value="student" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-username">Username</Label>
                    <Input
                      id="student-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input
                      id="student-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use your VTOP credentials to login.
                  </p>
                  <Button 
                    className="w-full btn-gradient"
                    onClick={() => handleLogin('student')}
                  >
                    Login as Student
                  </Button>
                </TabsContent>
                
                <TabsContent value="admin" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-username">Username</Label>
                    <Input
                      id="admin-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use your VTOP credentials to login.
                  </p>
                  <Button 
                    className="w-full btn-gradient"
                    onClick={() => handleLogin('admin')}
                  >
                    Login as Admin
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}