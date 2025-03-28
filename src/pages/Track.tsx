
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
  Loader2,
  Car,
  ExternalLink,
  Info,
  Fuel
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@mui/material";
import { Badge } from "@/components/ui/badge";

const TrackPage = () => {
  const [loading, setLoading] = useState(true);
  const [trackingId, setTrackingId] = useState("");
  const [mapReady, setMapReady] = useState(false);
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
    lastUpdated: string;
    vehicle: {
      type: string;
      model: string;
      speed: number;
      temperature: number;
    };
    route: {
      time: string;
      location: string;
    }[];
  } | null>(null);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
      setMapReady(true);
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
        lastUpdated: "2 min ago",
        vehicle: {
          type: "Truck",
          model: "Polestar 520",
          speed: 65,
          temperature: 20,
        },
        route: [
          { time: "10:24", location: "Fuel Depot, Starting Point" },
          { time: "10:38", location: "Highway Junction, Mile 5" },
          { time: "10:52", location: "Current Location" },
          { time: "11:15", location: "123 Main Street (Estimated)" },
        ]
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
          lastUpdated: "2 min ago",
          vehicle: {
            type: "Truck",
            model: "Polestar 520",
            speed: 65,
            temperature: 20,
          },
          route: [
            { time: "10:24", location: "Fuel Depot, Starting Point" },
            { time: "10:38", location: "Highway Junction, Mile 5" },
            { time: "10:52", location: "Current Location" },
            { time: "11:15", location: "123 Main Street (Estimated)" },
          ]
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Track Delivery</h1>
          <p className="text-muted-foreground">Track your fuel delivery in real-time</p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 md:mt-0"
        >
          <form onSubmit={handleTrack} className="flex space-x-3">
            <Input
              placeholder="Enter tracking ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="w-48 md:w-64"
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Track
            </Button>
          </form>
        </motion.div>
      </div>

      {activeOrder && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Map */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 lg:col-span-2 space-y-6"
          >
            {/* Map Card */}
            <Card className="border border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="relative w-full h-[500px] bg-slate-100 overflow-hidden">
                  {!mapReady ? (
                    <Skeleton variant="rectangular" height={500} />
                  ) : (
                    <>
                      {/* Simulated Map */}
                      <div className="absolute inset-0 bg-[#f3f4f6]">
                        <div className="h-full w-full relative flex items-center justify-center">
                          {/* Routes */}
                          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 500">
                            <path 
                              d="M100,250 C150,100 250,150 300,200 S400,300 500,250 S650,150 700,250" 
                              stroke="#f97316" 
                              strokeWidth="4" 
                              fill="none" 
                              strokeLinecap="round"
                            />
                            <circle cx="400" cy="250" r="15" fill="#ef4444" />
                            <circle cx="400" cy="250" r="30" fill="#ef4444" opacity="0.2">
                              <animate attributeName="r" from="15" to="40" dur="1.5s" repeatCount="indefinite" />
                              <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                          </svg>
                          
                          {/* Map pins */}
                          <div className="absolute left-1/4 top-1/3 flex flex-col items-center">
                            <MapPin className="h-8 w-8 text-red-500" />
                            <div className="bg-white px-2 py-1 rounded text-xs shadow-md mt-1">
                              Start
                            </div>
                          </div>
                          
                          <div className="absolute right-1/4 bottom-1/3 flex flex-col items-center">
                            <MapPin className="h-8 w-8 text-red-500" />
                            <div className="bg-white px-2 py-1 rounded text-xs shadow-md mt-1">
                              Destination
                            </div>
                          </div>
                          
                          {/* Truck icon */}
                          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                            <div className="bg-orange-500 rounded-full p-2">
                              <Truck className="h-6 w-6 text-white" />
                            </div>
                            <div className="bg-white px-2 py-1 rounded shadow-md mt-1 text-xs">
                              {activeOrder.vehicle.model}
                            </div>
                          </div>
                          
                          <div className="text-muted-foreground">
                            Interactive map would be displayed here with react-leaflet
                          </div>
                        </div>
                      </div>
                      
                      {/* Map Controls Overlay */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <Button size="icon" variant="outline" className="bg-white">
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" className="bg-white">
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center bg-background p-3 border-t">
                <div className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-4 w-4 mr-1" /> Last updated: {activeOrder.lastUpdated}
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" /> Full View
                </Button>
              </CardFooter>
            </Card>
            
            {/* Trip Info */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Trip Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Route timeline */}
                  <div className="space-y-3">
                    {activeOrder.route.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="mr-3 flex flex-col items-center">
                          <div className={`w-2.5 h-2.5 rounded-full ${index === 2 ? 'bg-orange-500 ring-4 ring-orange-100' : 'bg-gray-300'}`}></div>
                          {index < activeOrder.route.length - 1 && (
                            <div className="w-0.5 h-10 bg-gray-200"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className={`font-medium ${index === 2 ? 'text-orange-500' : ''}`}>{step.location}</p>
                              <p className="text-sm text-muted-foreground">{index === 2 ? 'Current Location' : (index < 2 ? 'Completed' : 'Estimated')}</p>
                            </div>
                            <Badge variant={index === 2 ? "default" : "outline"} className={index === 2 ? "bg-orange-500" : ""}>
                              {step.time}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Right Column - Vehicle & Status Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Vehicle Info */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-orange-500" />
                  {activeOrder.vehicle.model}
                </CardTitle>
                <CardDescription>Delivery Vehicle Information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Speed</p>
                    <p className="text-2xl font-bold">{activeOrder.vehicle.speed} <span className="text-sm font-normal">km/h</span></p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Temperature</p>
                    <p className="text-2xl font-bold">{activeOrder.vehicle.temperature}° <span className="text-sm font-normal">C</span></p>
                  </div>
                  <div className="col-span-2">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>0 km</span>
                      <span>{Math.round(activeOrder.progress)} km traveled</span>
                      <span>100 km</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Status Info */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Delivery Status</CardTitle>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(activeOrder.status)}`}>
                    {statusText[activeOrder.status]}
                  </div>
                </div>
                <CardDescription>Tracking ID: {activeOrder.id}</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex gap-2 items-center">
                      <div className="p-2 rounded-full bg-orange-100">
                        <MapPin className="h-4 w-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Origin</p>
                        <p className="font-medium">{activeOrder.origin}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="p-2 rounded-full bg-orange-100">
                        <Navigation className="h-4 w-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Destination</p>
                        <p className="font-medium">{activeOrder.destination}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex gap-2 items-center">
                      <div className="p-2 rounded-full bg-orange-100">
                        <Fuel className="h-4 w-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Product</p>
                        <p className="font-medium">{activeOrder.product}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="p-2 rounded-full bg-orange-100">
                        <Info className="h-4 w-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Quantity</p>
                        <p className="font-medium">{activeOrder.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Driver Card */}
            <Card>
              <CardHeader>
                <CardTitle>Driver Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <Truck className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{activeOrder.driverName}</h3>
                      <p className="text-sm text-muted-foreground">{activeOrder.driverPhone}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="flex items-center gap-1">
                    <PhoneCall className="h-4 w-4" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
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
                <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-orange-500" />
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
