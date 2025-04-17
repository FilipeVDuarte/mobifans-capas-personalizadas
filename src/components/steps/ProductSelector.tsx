import React, { useState } from "react";
import { useCaseCustomizer } from "../../context/CaseCustomizerContext";
import { phoneBrands, phoneModelsByBrand } from "../../data/phoneModels";
import { Button } from "@/components/ui/button";
import { ChevronRight, Smartphone } from "lucide-react";
import { brandIcons } from "../../data/brandIcons";

const ProductSelector: React.FC = () => {
  const { setSelectedModel, selectedModel, setCurrentStep } = useCaseCustomizer();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

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
      <h2 className="text-lg font-semibold mb-4">Selecione Seu Celular</h2>

      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2 text-gray-700">Marca</h3>
        <div className="grid grid-cols-2 gap-2">
          {phoneBrands.map((brand) => {
            const BrandIcon = brandIcons[brand] || Smartphone;
            
            return (
              <button
                key={brand}
                onClick={() => handleSelectBrand(brand)}
                className={`p-3 border rounded-md text-sm transition-all flex items-center justify-center gap-2 ${
                  selectedBrand === brand
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <BrandIcon className="h-5 w-5" />
                <span>{brand}</span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedBrand && (
        <div className="mb-6 animate-fade-in">
          <h3 className="text-sm font-medium mb-2 text-gray-700">Modelo</h3>
          <div className="space-y-2 max-h-[240px] overflow-y-auto pr-2">
            {phoneModelsByBrand[selectedBrand].map((phone) => (
              <button
                key={phone.id}
                onClick={() => handleSelectModel(phone.id)}
                className={`p-3 border rounded-md text-sm w-full text-left transition-all flex justify-between items-center ${
                  selectedModel?.id === phone.id
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
        >
          Continuar para Fotos
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductSelector;
