
import React, { useState } from "react";
import { useCaseCustomizer } from "../../context/CaseCustomizerContext";
import { phoneBrands, phoneModelsByBrand } from "../../data/phoneModels";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

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
      <h2 className="text-lg font-semibold mb-4">Select Your Phone</h2>

      {/* Brand selection */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2 text-gray-700">Brand</h3>
        <div className="grid grid-cols-2 gap-2">
          {phoneBrands.map((brand) => (
            <button
              key={brand}
              onClick={() => handleSelectBrand(brand)}
              className={`p-3 border rounded-md text-sm transition-all ${
                selectedBrand === brand
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Model selection */}
      {selectedBrand && (
        <div className="mb-6 animate-fade-in">
          <h3 className="text-sm font-medium mb-2 text-gray-700">Model</h3>
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

      {/* Continue button */}
      <div className="mt-auto pt-4">
        <Button 
          onClick={handleContinue} 
          disabled={!selectedModel}
          className="w-full"
        >
          Continue to Photos
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductSelector;
