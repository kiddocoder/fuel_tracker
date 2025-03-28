
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, User, Building, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"customer" | "agent">("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would perform actual authentication here
    if (email && password) {
      toast({
        title: "Login successful",
        description: `Welcome back! You've logged in as a ${activeTab}.`,
      });
      navigate("/");
    } else {
      toast({
        title: "Login failed",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Welcome/Introduction */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 bg-primary p-10 flex flex-col justify-center items-center text-primary-foreground"
      >
        <div className="max-w-md mx-auto">
          <div className="h-16 w-16 rounded-full bg-primary-foreground flex items-center justify-center mb-8">
            <Truck className="h-8 w-8 text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold mb-6">FuelTrack</h1>
          <p className="text-xl mb-6">
            Your one-stop solution for fuel delivery and tracking.
          </p>
          
          <ul className="space-y-4 mb-8">
            {[
              "Order fuel with just a few clicks",
              "Track your delivery in real-time",
              "View your order history and receipts",
              "Get notified about delivery status"
            ].map((feature, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="flex items-center"
              >
                <ChevronRight className="h-5 w-5 mr-2" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Right Panel - Login Form */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 bg-background p-10 flex flex-col justify-center"
      >
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Login to your account</h2>
          
          {/* Tabs */}
          <div className="flex mb-8 border-b">
            <button
              onClick={() => setActiveTab("customer")}
              className={`flex items-center space-x-2 px-4 py-3 ${
                activeTab === "customer"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <User className="h-5 w-5" />
              <span>Customer</span>
            </button>
            
            <button
              onClick={() => setActiveTab("agent")}
              className={`flex items-center space-x-2 px-4 py-3 ${
                activeTab === "agent"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Building className="h-5 w-5" />
              <span>Agent</span>
            </button>
          </div>
          
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="name@example.com"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Sign in
            </button>
          </form>
          
          <p className="mt-8 text-center text-muted-foreground">
            Don't have an account?{" "}
            <a href="#" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
