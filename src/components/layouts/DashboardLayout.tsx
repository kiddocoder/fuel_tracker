
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Truck,
  ShoppingCart,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Bell,
  Search,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    // In a real app, clear auth tokens/state here
    navigate("/auth");
  };

  const sidebarItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Order Fuel", icon: ShoppingCart, path: "/order" },
    { name: "Track Delivery", icon: Truck, path: "/track" },
    { name: "Order History", icon: Package, path: "/history" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className="w-64 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border fixed top-0 left-0 z-10"
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center">
              <Truck className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="text-xl font-bold">FuelTrack</span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="py-4 px-2">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-3 p-3 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-full border-t border-sidebar-border p-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full p-3 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-0"} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-background border-b h-16 flex items-center justify-between px-4">
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-accent text-foreground"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
          
          <div className="flex-1 mx-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-md hover:bg-accent text-foreground relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <User className="h-5 w-5" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 h-[calc(100vh-4rem)] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
