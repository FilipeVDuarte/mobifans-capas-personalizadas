
import React from "react";
import { useCaseCustomizer } from "../context/CaseCustomizerContext";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const { selectedModel, currentStep } = useCaseCustomizer();
  const basePrice = 24.99;
  
  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <div className="text-xl font-semibold text-primary">
            Mobifans
          </div>
        </div>
        
        <div className="text-sm text-gray-500 hidden sm:block">
          Crie sua capa personalizada
        </div>
        
        <div className="flex items-center">
          {selectedModel && (
            <div className="mr-4 text-sm">
              <span className="font-medium text-primary">R${basePrice}</span>
              <span className="text-gray-500 ml-1">por capa</span>
            </div>
          )}
          
          {currentStep === 2 && (
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Finalizar Compra</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
