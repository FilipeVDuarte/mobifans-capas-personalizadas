
import React, { useState } from "react";
import { useCaseCustomizer } from "../../context/CaseCustomizerContext";
import { phoneBrands, phoneModelsByBrand } from "../../data/phoneModels";
import { Button } from "@/components/ui/button";
import { ChevronRight, Smartphone } from "lucide-react";
import { brandIcons } from "../../data/brandIcons";
import { useIsMobile } from "@/hooks/use-mobile";

const ProductSelector: React.FC = () => {
  const { setSelectedModel, selectedModel, setCurrentStep } = useCaseCustomizer();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleSelectBrand = (brand: string) => {
    setSelectedBrand(brand);
  };

  const handleSelectModel = (modelId: string) => {
    const model = phoneModelsByBrand[selectedBrand!].find(m => m.id === modelId);
    if (model) {
      setSelectedModel(model);
    }
  };

  const handleContinue = () => {
    if (selectedModel) {
      setCurrentStep(1);
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <h2 className={`font-semibold mb-4 ${isMobile ? "text-base" : "text-lg"}`}>Selecione Seu Celular</h2>

      <div className="mb-4">
        <h3 className={`font-medium mb-2 text-gray-700 ${isMobile ? "text-xs" : "text-sm"}`}>Marca</h3>
        <div className="grid grid-cols-2 gap-2">
          {phoneBrands.map((brand) => {
            const BrandIcon = brandIcons[brand] || Smartphone;
            
            return (
              <button
                key={brand}
                onClick={() => handleSelectBrand(brand)}
                className={`border rounded-md transition-all flex items-center justify-center gap-1 
                  ${isMobile ? "p-2 text-xs" : "p-3 text-sm"} 
                  ${selectedBrand === brand
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <BrandIcon className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
                <span>{brand}</span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedBrand && (
        <div className="mb-4 animate-fade-in">
          <h3 className={`font-medium mb-2 text-gray-700 ${isMobile ? "text-xs" : "text-sm"}`}>Modelo</h3>
          <div className={`space-y-2 pr-2 overflow-y-auto ${isMobile ? "max-h-[120px]" : "max-h-[240px]"}`}>
            {phoneModelsByBrand[selectedBrand].map((phone) => (
              <button
                key={phone.id}
                onClick={() => handleSelectModel(phone.id)}
                className={`border rounded-md w-full text-left transition-all flex justify-between items-center 
                  ${isMobile ? "p-2 text-xs" : "p-3 text-sm"}
                  ${selectedModel?.id === phone.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span>{phone.model}</span>
                {selectedModel?.id === phone.id && (
                  <span className="text-primary">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto pt-4">
        <Button 
          onClick={handleContinue} 
          disabled={!selectedModel}
          className="w-full"
          size={isMobile ? "sm" : "default"}
        >
          Continuar para Fotos
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductSelector;
