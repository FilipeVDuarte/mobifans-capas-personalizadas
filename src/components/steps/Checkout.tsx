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
      <h2 className="text-lg font-semibold mb-4">Revisar Pedido</h2>
      
      <div className="border rounded-md p-4 mb-4">
        <h3 className="font-medium text-gray-800 mb-2">Resumo do Pedido</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Produto:</span>
            <span>Capa {selectedModel?.brand} {selectedModel?.model} Personalizada</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Personalizações:</span>
            <span>Escala: {Math.round(imageScale * 100)}%, Rotação: {imageRotation}°</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Preço:</span>
            <span>R${basePrice.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Frete:</span>
            <span>R${shipping.toFixed(2)}</span>
          </div>
          
          <div className="border-t pt-2 mt-2 flex justify-between font-medium">
            <span>Total:</span>
            <span>R${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="border rounded-md p-4 mb-4">
        <h3 className="font-medium text-gray-800 mb-2">Detalhes de Envio</h3>
        <p className="text-sm text-gray-600">
          Em uma aplicação completa, aqui estariam os campos para endereço de entrega, método de pagamento, etc.
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <Button 
          variant="outline"
          onClick={handleBack}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Voltar
        </Button>
        <Button 
          onClick={handlePlaceOrder}
        >
          <Check className="mr-1 h-4 w-4" />
          Finalizar Pedido
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
