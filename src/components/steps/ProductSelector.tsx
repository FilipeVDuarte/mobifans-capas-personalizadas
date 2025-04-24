
import React, { useState } from "react";
import { useCaseCustomizer } from "../../context/CaseCustomizerContext";
import { phoneBrands, phoneModelsByBrand } from "../../data/phoneModels";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { BrandIcon } from "../../data/brandIcons";

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
      <h2 className="text-lg font-semibold mb-6">Selecione Seu Celular</h2>

      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3 text-gray-700">Marca</h3>
        <div className="grid grid-cols-4 gap-4">
          {phoneBrands.map((brand) => (
            <button
              key={brand}
              onClick={() => handleSelectBrand(brand)}
              className={`border rounded-lg transition-all p-6 flex items-center justify-center
                ${selectedBrand === brand
                  ? "border-primary bg-primary/10"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <BrandIcon brand={brand} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedBrand && (
        <div className="flex-1 mb-6 animate-fade-in">
          <h3 className="text-sm font-medium mb-3 text-gray-700">Modelo</h3>
          <div className="grid grid-cols-2 gap-4 h-[calc(100%-2rem)] overflow-y-auto pr-2">
            {phoneModelsByBrand[selectedBrand].map((phone) => (
              <button
                key={phone.id}
                onClick={() => handleSelectModel(phone.id)}
                className={`border rounded-lg p-4 text-left transition-all flex justify-between items-center
                  ${selectedModel?.id === phone.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-sm">{phone.model}</span>
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
