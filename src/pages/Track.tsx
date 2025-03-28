
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Truck, 
  MapPin, 
  Clock, 
  PhoneCall,
  Navigation,
  Package,
  CheckCircle,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@mui/material";

const TrackPage = () => {
  const [loading, setLoading] = useState(true);
  const [trackingId, setTrackingId] = useState("");
  const [activeOrder, setActiveOrder] = useState<{
    id: string;
    status: "preparing" | "on-way" | "delivered";
    deliveryTime: string;
    location: string;
    driverName: string;
    driverPhone: string;
    origin: string;
    destination: string;
    product: string;
    quantity: string;
    progress: number;
  } | null>(null);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
      // Simulate having an active order
      setActiveOrder({
        id: "TRK-78945",
        status: "on-way",
        deliveryTime: "25 min",
        location: "2.5 km away",
        driverName: "Michael Johnson",
        driverPhone: "+1 (555) 123-4567",
        origin: "Fuel Depot Station",
        destination: "123 Main Street",
        product: "Regular Unleaded",
        quantity: "35 Liters",
        progress: 65,
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate tracking API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (trackingId) {
        setActiveOrder({
          id: trackingId,
          status: "on-way",
          deliveryTime: "25 min",
          location: "2.5 km away",
          driverName: "Michael Johnson",
          driverPhone: "+1 (555) 123-4567",
          origin: "Fuel Depot Station",
          destination: "123 Main Street",
          product: "Regular Unleaded",
          quantity: "35 Liters",
          progress: 65,
        });
      }
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "preparing":
        return <Package className="h-5 w-5" />;
      case "on-way":
        return <Truck className="h-5 w-5" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <Loader2 className="h-5 w-5 animate-spin" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "text-amber-500 bg-amber-500/10";
      case "on-way":
        return "text-blue-500 bg-blue-500/10";
      case "delivered":
        return "text-green-500 bg-green-500/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  const statusText = {
    preparing: "Preparing",
    "on-way": "On the way",
    delivered: "Delivered",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Track Delivery</h1>
        <p className="text-muted-foreground">Track your fuel delivery in real-time</p>
      </div>

      {/* Track Order Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Track Your Order</CardTitle>
            <CardDescription>Enter your tracking ID to see delivery status</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrack} className="flex space-x-3">
              <Input
                placeholder="Enter tracking ID (e.g., TRK-12345)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Track
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Active Order Tracking */}
      {activeOrder && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-6"
        >
          {/* Status Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Delivery Status</CardTitle>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(activeOrder.status)}`}>
                  {statusText[activeOrder.status]}
                </div>
              </div>
              <CardDescription>Tracking ID: {activeOrder.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <div className="flex justify-between mb-2">
                  <div className="text-sm">Order Placed</div>
                  <div className="text-sm">In Transit</div>
                  <div className="text-sm">Delivered</div>
                </div>
                <div className="h-2 w-full bg-muted rounded-full mb-1">
                  <div
                    className="h-2 bg-primary rounded-full transition-all"
                    style={{ width: `${activeOrder.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between relative">
                  <div className="h-4 w-4 bg-primary rounded-full absolute left-0 top-0 transform -translate-y-1/2"></div>
                  <div className={`h-4 w-4 rounded-full absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 ${
                    activeOrder.status === "on-way" || activeOrder.status === "delivered"
                      ? "bg-primary"
                      : "bg-muted"
                  }`}></div>
                  <div className={`h-4 w-4 rounded-full absolute right-0 top-0 transform -translate-y-1/2 ${
                    activeOrder.status === "delivered" ? "bg-primary" : "bg-muted"
                  }`}></div>
                </div>
              </div>

              {loading ? (
                <Skeleton variant="rectangular" height={100} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-blue-500/10">
                      <Clock className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Time</p>
                      <p className="font-medium">{activeOrder.deliveryTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-purple-500/10">
                      <MapPin className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Location</p>
                      <p className="font-medium">{activeOrder.location}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Map Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Live Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton variant="rectangular" height={300} />
              ) : (
                <div className="relative w-full h-80 bg-slate-100 rounded-md overflow-hidden">
                  {/* This would be replaced with an actual map component */}
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Navigation className="h-12 w-12 mx-auto mb-2" />
                      <p>Interactive map would be displayed here</p>
                      <p className="text-sm">
                        Using react-leaflet for the real implementation
                      </p>
                    </div>
                  </div>

                  {/* Info Pills */}
                  <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                    <div className="bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm flex items-center shadow-sm">
                      <MapPin className="h-3.5 w-3.5 mr-1.5" />
                      {activeOrder.origin} → {activeOrder.destination}
                    </div>
                    <div className="bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm flex items-center shadow-sm">
                      <Truck className="h-3.5 w-3.5 mr-1.5" />
                      {activeOrder.product} ({activeOrder.quantity})
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Driver Details */}
          <Card>
            <CardHeader>
              <CardTitle>Driver Information</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton variant="text" height={24} width="80%" />
                  <Skeleton variant="text" height={24} width="60%" />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Truck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{activeOrder.driverName}</h3>
                      <p className="text-sm text-muted-foreground">Delivery Driver</p>
                    </div>
                  </div>
                  <Button variant="outline" className="flex items-center">
                    <PhoneCall className="h-4 w-4 mr-2" />
                    Call Driver
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* No Active Orders */}
      {!loading && !activeOrder && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card>
            <CardContent className="py-10">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Active Deliveries</h3>
                <p className="text-muted-foreground mb-6">
                  You don't have any active fuel deliveries to track
                </p>
                <Button onClick={() => window.location.href = "/order"}>
                  Order Fuel Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default TrackPage;
