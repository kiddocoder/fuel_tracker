
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Truck,
  Fuel, // Replacing GasPump with Fuel
  Package,
  Clock,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
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
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Order Fuel", icon: Fuel, path: "/order" }, // Changed GasPump to Fuel
    { name: "Track Delivery", icon: Truck, path: "/track" },
    { name: "Order History", icon: Clock, path: "/history" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  // Check if the current path is active
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className="w-64 h-screen bg-white text-gray-800 border-r border-gray-100 fixed top-0 left-0 z-10 shadow-sm"
      >
        <div className="flex items-center p-4 border-b border-gray-100">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-orange-500 flex items-center justify-center">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FuelTrack</span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 ml-auto rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="py-4">
          <nav className="px-4 space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 p-2.5 rounded-md transition-colors ${
                  isActive(item.path)
                    ? "bg-orange-50 text-orange-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive(item.path) ? "text-orange-500" : "text-gray-500"}`} />
                <span>{item.name}</span>
                {item.name === "Track Delivery" && (
                  <Badge className="ml-auto bg-orange-500 text-white text-xs">Active</Badge>
                )}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-full border-t border-gray-100 p-4">
          <div className="flex items-center space-x-3 p-2 mb-4 rounded-md bg-orange-50">
            <div className="flex-shrink-0">
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-orange-200 text-orange-800">JD</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate">Premium Account</p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full p-2.5 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="h-5 w-5 text-gray-500" />
            <span>Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? "lg:ml-64" : "ml-0"} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white border-b h-16 flex items-center justify-between px-4 shadow-sm">
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
          
          <div className="flex-1 mx-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-500"></span>
            </button>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-orange-200 text-orange-800">JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
