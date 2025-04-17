
import React from "react";
import { useCaseCustomizer } from "../context/CaseCustomizerContext";
import { ShoppingCart } from "lucide-react";

const StatusBar: React.FC = () => {
  const { selectedModel, currentStep } = useCaseCustomizer();
  const basePrice = 24.99;

  const getStatusText = () => {
    switch (currentStep) {
      case 0:
        return "Select your phone model";
      case 1:
        return "Upload your photo";
      case 2:
        return "Customize your design";
      default:
        return "Create your unique case";
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {getStatusText()}
        </div>
        
        {selectedModel && (
          <div className="flex items-center">
            <div className="text-sm font-medium">
              <span className="text-gray-600">Price: </span>
              <span className="text-primary">${basePrice.toFixed(2)}</span>
            </div>
            
            {currentStep === 2 && (
              <button className="ml-4 text-sm flex items-center text-primary hover:text-primary/80 transition-colors">
                <ShoppingCart className="h-4 w-4 mr-1" />
                <span>Add to Cart</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusBar;
