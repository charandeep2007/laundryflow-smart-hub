import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface NavigationProps {
  userType: 'student' | 'admin';
}

export default function Navigation({ userType }: NavigationProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const studentLinks = [
    { to: '/student/dashboard', label: 'Dashboard' },
    { to: '/student/orders', label: 'Orders' },
    { to: '/student/complaints', label: 'Complaints' },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/orders', label: 'Manage Orders' },
    { to: '/admin/complaints', label: 'Complaints' },
    { to: '/admin/stock', label: 'Stock' },
  ];

  const links = userType === 'student' ? studentLinks : adminLinks;

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-primary">LaundryFlow</h1>
            <div className="hidden md:flex space-x-6">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}