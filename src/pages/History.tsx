
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  Search, 
  CalendarDays, 
  Filter, 
  Download, 
  Loader2, 
  DropletIcon,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@mui/material";

type OrderStatus = "delivered" | "in-progress" | "cancelled";

type Order = {
  id: string;
  date: string;
  type: string;
  quantity: string;
  amount: string;
  status: OrderStatus;
  deliveryAddress: string;
};

const HistoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    // Simulate API call to fetch order history
    const timer = setTimeout(() => {
      const sampleOrders: Order[] = [
        {
          id: "ORD-1234",
          date: "June 15, 2023",
          type: "Diesel",
          quantity: "50L",
          amount: "$187.50",
          status: "delivered",
          deliveryAddress: "123 Main Street, Anytown, ST 12345",
        },
        {
          id: "ORD-1235",
          date: "June 10, 2023",
          type: "Regular Unleaded",
          quantity: "35L",
          amount: "$120.75",
          status: "delivered",
          deliveryAddress: "456 Oak Avenue, Somewhere, ST 67890",
        },
        {
          id: "ORD-1236",
          date: "June 5, 2023",
          type: "Premium Unleaded",
          quantity: "40L",
          amount: "$158.00",
          status: "delivered",
          deliveryAddress: "789 Pine Road, Elsewhere, ST 54321",
        },
        {
          id: "ORD-1237",
          date: "June 1, 2023",
          type: "Diesel",
          quantity: "25L",
          amount: "$93.75",
          status: "delivered",
          deliveryAddress: "321 Cedar Lane, Nowhere, ST 98765",
        },
        {
          id: "ORD-1238",
          date: "May 28, 2023",
          type: "Regular Unleaded",
          quantity: "45L",
          amount: "$155.25",
          status: "delivered",
          deliveryAddress: "123 Main Street, Anytown, ST 12345",
        },
        {
          id: "ORD-1239",
          date: "June 18, 2023",
          type: "Premium Unleaded",
          quantity: "30L",
          amount: "$118.50",
          status: "in-progress",
          deliveryAddress: "456 Oak Avenue, Somewhere, ST 67890",
        },
        {
          id: "ORD-1240",
          date: "June 12, 2023",
          type: "Diesel",
          quantity: "20L",
          amount: "$75.00",
          status: "cancelled",
          deliveryAddress: "789 Pine Road, Elsewhere, ST 54321",
        },
      ];
      
      setOrders(sampleOrders);
      setFilteredOrders(sampleOrders);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter orders based on search query
    if (searchQuery.trim() === "") {
      setFilteredOrders(orders);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = orders.filter(
        (order) =>
          order.id.toLowerCase().includes(lowercasedQuery) ||
          order.type.toLowerCase().includes(lowercasedQuery) ||
          order.deliveryAddress.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredOrders(filtered);
    }
  }, [searchQuery, orders]);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "delivered":
        return (
          <div className="flex items-center space-x-1 text-green-500 bg-green-500/10 px-2.5 py-0.5 rounded-full text-xs font-medium">
            <CheckCircle className="h-3 w-3" />
            <span>Delivered</span>
          </div>
        );
      case "in-progress":
        return (
          <div className="flex items-center space-x-1 text-blue-500 bg-blue-500/10 px-2.5 py-0.5 rounded-full text-xs font-medium">
            <Clock className="h-3 w-3" />
            <span>In Progress</span>
          </div>
        );
      case "cancelled":
        return (
          <div className="flex items-center space-x-1 text-red-500 bg-red-500/10 px-2.5 py-0.5 rounded-full text-xs font-medium">
            <AlertCircle className="h-3 w-3" />
            <span>Cancelled</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Order History</h1>
        <p className="text-muted-foreground">View and manage your past fuel orders</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID, fuel type, or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Date Range</span>
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Filter</span>
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Export</span>
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                <Skeleton variant="rectangular" height={48} />
                {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} variant="rectangular" height={52} />
                ))}
              </div>
            ) : filteredOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <DropletIcon className="h-4 w-4 text-primary" />
                            <span>{order.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>{order.amount}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Package className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No orders found</h3>
                <p className="text-muted-foreground">
                  {searchQuery.trim() !== ""
                    ? "No orders match your search criteria"
                    : "You haven't placed any orders yet"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Order Statistics Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            title: "Total Orders",
            value: loading ? "-" : orders.length,
            icon: Package,
            color: "bg-blue-500/10 text-blue-500",
          },
          {
            title: "Total Spent",
            value: loading
              ? "-"
              : `$${orders
                  .reduce(
                    (sum, order) =>
                      sum + parseFloat(order.amount.replace("$", "")),
                    0
                  )
                  .toFixed(2)}`,
            icon: DropletIcon,
            color: "bg-green-500/10 text-green-500",
          },
          {
            title: "Most Ordered",
            value: loading
              ? "-"
              : (() => {
                  const typeCount: Record<string, number> = {};
                  orders.forEach((order) => {
                    typeCount[order.type] = (typeCount[order.type] || 0) + 1;
                  });
                  const sortedTypes = Object.entries(typeCount).sort(
                    (a, b) => b[1] - a[1]
                  );
                  return sortedTypes.length > 0 ? sortedTypes[0][0] : "-";
                })(),
            icon: DropletIcon,
            color: "bg-purple-500/10 text-purple-500",
          },
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex justify-between items-start">
              {loading ? (
                <>
                  <div className="space-y-2">
                    <Skeleton variant="text" width={100} height={24} />
                    <Skeleton variant="text" width={60} height={40} />
                  </div>
                  <Skeleton variant="circular" width={40} height={40} />
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <h2 className="text-3xl font-bold">{stat.value}</h2>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};

export default HistoryPage;
