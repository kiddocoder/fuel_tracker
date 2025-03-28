
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Droplet, 
  MapPin, 
  Calendar, 
  Clock, 
  CreditCard, 
  Check, 
  ChevronRight,
  AlertCircle,
  Info
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

type FuelType = {
  id: string;
  name: string;
  price: number;
  description: string;
};

const fuelTypes: FuelType[] = [
  {
    id: "regular",
    name: "Regular Unleaded",
    price: 3.45,
    description: "Standard gasoline for most vehicles",
  },
  {
    id: "premium",
    name: "Premium Unleaded",
    price: 3.95,
    description: "Higher octane for high-performance engines",
  },
  {
    id: "diesel",
    name: "Diesel",
    price: 3.75,
    description: "For diesel engines only",
  },
];

const OrderPage = () => {
  const [selectedFuel, setSelectedFuel] = useState<FuelType | null>(null);
  const [quantity, setQuantity] = useState<number>(20);
  const [address, setAddress] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const { toast } = useToast();

  const handleIncrement = () => {
    setQuantity(prev => Math.min(prev + 5, 100));
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(prev - 5, 10));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 10 && value <= 100) {
      setQuantity(value);
    }
  };

  const calculateTotal = () => {
    if (!selectedFuel) return 0;
    return selectedFuel.price * quantity;
  };

  const handleSubmitOrder = () => {
    if (!selectedFuel || !address || !date || !time) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically submit the order to your backend
    toast({
      title: "Order placed successfully!",
      description: "Your fuel delivery has been scheduled",
    });

    // Close the confirmation sheet
    setSheetOpen(false);
  };

  const stepVariants = {
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
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Order Fuel</h1>
        <p className="text-muted-foreground">Order fuel delivery to your location in a few simple steps</p>
      </div>

      <div className="space-y-8">
        {/* Step 1: Select Fuel Type */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={stepVariants}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Droplet className="h-5 w-5 text-primary" />
                </div>
                Step 1: Select Fuel Type
              </CardTitle>
              <CardDescription>Choose the type of fuel you need</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {fuelTypes.map((fuel) => (
                  <div
                    key={fuel.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedFuel?.id === fuel.id
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedFuel(fuel)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{fuel.name}</h3>
                      {selectedFuel?.id === fuel.id && (
                        <div className="bg-primary rounded-full p-1">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{fuel.description}</p>
                    <p className="text-lg font-bold">${fuel.price.toFixed(2)}/L</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Step 2: Select Quantity */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={stepVariants}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Droplet className="h-5 w-5 text-primary" />
                </div>
                Step 2: Select Quantity
              </CardTitle>
              <CardDescription>How much fuel do you need?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={handleDecrement}
                  disabled={quantity <= 10}
                >
                  -
                </Button>
                <div className="flex-1">
                  <Input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min={10}
                    max={100}
                    className="text-center"
                  />
                  <div className="h-2 bg-gray-200 rounded-full mt-2">
                    <div 
                      className="h-2 bg-primary rounded-full" 
                      style={{ width: `${quantity}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>10L</span>
                    <span>100L</span>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={handleIncrement}
                  disabled={quantity >= 100}
                >
                  +
                </Button>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-md flex items-center">
                <Info className="h-5 w-5 text-muted-foreground mr-3" />
                <p className="text-sm text-muted-foreground">
                  For orders larger than 100L, please contact our customer service.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Step 3: Delivery Details */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={stepVariants}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                Step 3: Delivery Details
              </CardTitle>
              <CardDescription>Where and when should we deliver?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1">
                    Delivery Address
                  </label>
                  <Input
                    id="address"
                    placeholder="Enter your full address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-foreground mb-1">
                      Delivery Date
                    </label>
                    <div className="relative">
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-foreground mb-1">
                      Delivery Time
                    </label>
                    <div className="relative">
                      <Input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                      <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-500/10 p-4 rounded-md flex">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Delivery times are subject to availability. We will confirm the exact time after your order is placed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={stepVariants}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fuel Type</span>
                  <span className="font-medium">{selectedFuel?.name || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantity</span>
                  <span className="font-medium">{quantity} Liters</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price per Liter</span>
                  <span className="font-medium">${selectedFuel?.price.toFixed(2) || "0.00"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-bold">Total Amount</span>
                  <span className="font-bold text-lg">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => setSheetOpen(true)}
                disabled={!selectedFuel || !address || !date || !time}
              >
                Proceed to Payment
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      {/* Order Confirmation Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Confirm Your Order</SheetTitle>
            <SheetDescription>
              Please review your order details before proceeding with payment
            </SheetDescription>
          </SheetHeader>
          <div className="py-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Order Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fuel Type</span>
                    <span>{selectedFuel?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity</span>
                    <span>{quantity} Liters</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Price</span>
                    <span className="font-bold">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Delivery Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Address</span>
                    <span className="text-right">{address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date & Time</span>
                    <span>{date} at {time}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Payment Method</h3>
                <div className="border rounded-md p-3 flex items-center">
                  <CreditCard className="h-5 w-5 mr-3" />
                  <span>Pay on Delivery</span>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button 
                className="w-full mb-3"
                onClick={handleSubmitOrder}
              >
                Confirm Order
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setSheetOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default OrderPage;
