
import React from "react";
import { useCaseCustomizer } from "../context/CaseCustomizerContext";
import { phoneBrands } from "../data/phoneModels";
import { Button } from "@/components/ui/button";
import { BrandIcon } from "../data/brandIcons";

const BrandSelector: React.FC = () => {
  const { 
    setSelectedBrand, 
    goToStep, 
    updateLastInteraction 
  } = useCaseCustomizer();

  const handleSelectBrand = (brand: string) => {
    updateLastInteraction();
    setSelectedBrand(brand);
    goToStep('model');
  };

  const handleCustomModel = () => {
    updateLastInteraction();
    goToStep('custom-model');
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto px-4 pb-10">
      <h1 className="text-5xl font-bold text-[#4161c3] my-8 text-center">
        Escolha seu dispositivo
      </h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-3xl mb-10">
        {phoneBrands.map((brand) => (
          <div key={brand} className="flex flex-col items-center">
            <button
              onClick={() => handleSelectBrand(brand)}
              className="border rounded-lg transition-all p-6 flex items-center justify-center
                hover:border-[#4161c3] hover:bg-[#4161c3]/10 w-full aspect-square"
            >
              <div className="w-20 h-20 flex items-center justify-center">
                <BrandIcon brand={brand} />
              </div>
            </button>
            <span className="mt-3 text-lg font-medium">{brand}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={handleCustomModel}
        variant="outline"
        className="mt-6"
      >
        Não está nas opções acima
      </Button>
    </div>
  );
};

export default BrandSelector;
