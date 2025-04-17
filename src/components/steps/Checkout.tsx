
import React from "react";
import { useCaseCustomizer } from "../../context/CaseCustomizerContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Check } from "lucide-react";

const Checkout: React.FC = () => {
  const { 
    selectedModel,
    imageScale,
    imageRotation,
    setCurrentStep 
  } = useCaseCustomizer();

  const basePrice = 24.99;
  const shipping = 4.99;
  const total = basePrice + shipping;

  const handleBack = () => {
    setCurrentStep(2);
  };
  
  const handlePlaceOrder = () => {
    alert("Order placed successfully! In a real application, this would process payment and submit the order.");
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <h2 className="text-lg font-semibold mb-4">Review Order</h2>
      
      {/* Order summary */}
      <div className="border rounded-md p-4 mb-4">
        <h3 className="font-medium text-gray-800 mb-2">Order Summary</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Product:</span>
            <span>Custom {selectedModel?.brand} {selectedModel?.model} Case</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Customizations:</span>
            <span>Scale: {Math.round(imageScale * 100)}%, Rotation: {imageRotation}°</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Price:</span>
            <span>${basePrice.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping:</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          
          <div className="border-t pt-2 mt-2 flex justify-between font-medium">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {/* Shipping details placeholder */}
      <div className="border rounded-md p-4 mb-4">
        <h3 className="font-medium text-gray-800 mb-2">Shipping Details</h3>
        <p className="text-sm text-gray-600">
          In a complete application, this would contain form fields for shipping address, payment method, etc.
        </p>
      </div>
      
      {/* Navigation buttons */}
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <Button 
          variant="outline"
          onClick={handleBack}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={handlePlaceOrder}
        >
          <Check className="mr-1 h-4 w-4" />
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
