
import React from "react";
import { useCaseCustomizer } from "../context/CaseCustomizerContext";
import { ShoppingCart } from "lucide-react";

const StatusBar: React.FC = () => {
  const { selectedModel, currentStep } = useCaseCustomizer();
  const basePrice = 24.99;

  const getStatusText = () => {
    switch (currentStep) {
      case 0:
        return "Selecione seu modelo de celular";
      case 1:
        return "Faça upload da sua foto";
      case 2:
        return "Personalize seu design";
      default:
        return "Crie sua capa única";
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
              <span className="text-gray-600">Preço: </span>
              <span className="text-primary">R${basePrice.toFixed(2)}</span>
            </div>
            
            {currentStep === 2 && (
              <button className="ml-4 text-sm flex items-center text-primary hover:text-primary/80 transition-colors">
                <ShoppingCart className="h-4 w-4 mr-1" />
                <span>Adicionar ao Carrinho</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusBar;
