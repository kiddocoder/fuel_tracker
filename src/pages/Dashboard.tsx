
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { 
  Truck, 
  DropletIcon, 
  Clock, 
  CreditCard, 
  TrendingUp, 
  BarChart2,
  RefreshCw,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@mui/material";

// Sample data for charts
const consumptionData = [
  { name: "Jan", liters: 120 },
  { name: "Feb", liters: 150 },
  { name: "Mar", liters: 180 },
  { name: "Apr", liters: 170 },
  { name: "May", liters: 200 },
  { name: "Jun", liters: 220 },
  { name: "Jul", liters: 240 },
];

const fuelTypesData = [
  { name: "Petrol", value: 45 },
  { name: "Diesel", value: 35 },
  { name: "Premium", value: 20 },
];

const deliveryTimesData = [
  { day: "Mon", hours: 3.2 },
  { day: "Tue", hours: 2.8 },
  { day: "Wed", hours: 4.1 },
  { day: "Thu", hours: 3.5 },
  { day: "Fri", hours: 3.9 },
  { day: "Sat", hours: 2.6 },
  { day: "Sun", hours: 2.2 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your fuel deliveries</p>
        </div>
        <button className="flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-md hover:bg-primary/20 transition-colors">
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: "Total Deliveries", 
            value: "32", 
            description: "+14% from last month", 
            icon: Truck, 
            color: "bg-blue-500/10 text-blue-500" 
          },
          { 
            title: "Total Consumption", 
            value: "1,245 L", 
            description: "+5% from last month", 
            icon: DropletIcon, 
            color: "bg-green-500/10 text-green-500" 
          },
          { 
            title: "Average Delivery Time", 
            value: "3.2 hrs", 
            description: "-12% from last month", 
            icon: Clock, 
            color: "bg-amber-500/10 text-amber-500" 
          },
          { 
            title: "Total Spent", 
            value: "$4,320", 
            description: "+7% from last month", 
            icon: CreditCard, 
            color: "bg-purple-500/10 text-purple-500" 
          },
        ].map((card, i) => (
          <motion.div
            key={card.title}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card>
              <CardContent className="p-6 flex justify-between items-start">
                {loading ? (
                  <>
                    <div className="space-y-2">
                      <Skeleton variant="text" width={100} height={24} />
                      <Skeleton variant="text" width={60} height={40} />
                      <Skeleton variant="text" width={120} height={20} />
                    </div>
                    <Skeleton variant="circular" width={40} height={40} />
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{card.title}</p>
                      <h2 className="text-3xl font-bold">{card.value}</h2>
                      <p className="text-xs text-green-500 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {card.description}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${card.color}`}>
                      <card.icon className="h-5 w-5" />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consumption Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Fuel Consumption</CardTitle>
                <CardDescription>Monthly consumption in liters</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="h-80">
              {loading ? (
                <Skeleton variant="rectangular" height="100%" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={consumptionData}>
                    <defs>
                      <linearGradient id="colorLiters" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#0088FE" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="liters"
                      stroke="#0088FE"
                      fillOpacity={1}
                      fill="url(#colorLiters)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Delivery Time Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Delivery Times</CardTitle>
                <CardDescription>Average delivery times by day</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="h-80">
              {loading ? (
                <Skeleton variant="rectangular" height="100%" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deliveryTimesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Fuel Types Distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Fuel Types</CardTitle>
                <CardDescription>Distribution of fuel types ordered</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              {loading ? (
                <Skeleton variant="circular" width={200} height={200} />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fuelTypesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {fuelTypesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Recent Orders */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest fuel orders</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton variant="circular" width={40} height={40} />
                      <div className="space-y-2 flex-1">
                        <Skeleton variant="text" width="80%" height={24} />
                        <Skeleton variant="text" width="60%" height={16} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {[
                    {
                      id: "ORD-001",
                      type: "Diesel",
                      amount: "50L",
                      date: "May 15, 2023",
                      status: "Delivered",
                      statusColor: "bg-green-500/10 text-green-500",
                    },
                    {
                      id: "ORD-002",
                      type: "Petrol",
                      amount: "35L",
                      date: "May 12, 2023",
                      status: "Delivered",
                      statusColor: "bg-green-500/10 text-green-500",
                    },
                    {
                      id: "ORD-003",
                      type: "Premium",
                      amount: "40L",
                      date: "May 10, 2023",
                      status: "Delivered",
                      statusColor: "bg-green-500/10 text-green-500",
                    },
                    {
                      id: "ORD-004",
                      type: "Diesel",
                      amount: "25L",
                      date: "May 8, 2023",
                      status: "Delivered",
                      statusColor: "bg-green-500/10 text-green-500",
                    },
                  ].map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between border-b border-border pb-4 last:pb-0 last:border-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <DropletIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{order.type} - {order.amount}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${order.statusColor}`}>
                        {order.status}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
