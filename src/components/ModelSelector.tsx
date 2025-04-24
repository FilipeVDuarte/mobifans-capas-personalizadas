
import React from "react";
import { useCaseCustomizer } from "../context/CaseCustomizerContext";
import { phoneModelsByBrand } from "../data/phoneModels";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";

const ModelSelector: React.FC = () => {
  const { 
    setSelectedModel, 
    selectedBrand, 
    goToStep,
    goToPreviousStep,
    updateLastInteraction
  } = useCaseCustomizer();

  if (!selectedBrand) {
    return <div>Please select a brand first</div>;
  }

  const handleSelectModel = (modelId: string) => {
    updateLastInteraction();
    const model = phoneModelsByBrand[selectedBrand].find(m => m.id === modelId);
    if (model) {
      setSelectedModel(model);
      goToStep('designType');
    }
  };

  const handleCustomModel = () => {
    updateLastInteraction();
    goToStep('custom-model');
  };

  const phoneModels = phoneModelsByBrand[selectedBrand] || [];

  return (
    <div className="flex flex-col max-w-4xl mx-auto px-4 pb-10">
      <button 
        onClick={() => {
          updateLastInteraction();
          goToPreviousStep();
        }}
        className="flex items-center text-[#4161c3] mb-8 self-start"
      >
        <ArrowLeft className="mr-2" />
        <span className="text-lg">Voltar</span>
      </button>

      <h1 className="text-5xl font-bold text-[#4161c3] mb-8 text-center">
        Escolha seu dispositivo
      </h1>
      
      <div className="flex mb-10">
        <div className="w-1/3 pr-8">
          <div className="grid grid-flow-row gap-4">
            <div className="w-24 h-24 flex items-center justify-center border rounded-lg mb-2">
              <div className="w-16 h-16">
                {selectedBrand && (
                  <div className="font-bold text-center text-lg">{selectedBrand}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/3">
          <div className="grid grid-cols-3 gap-4">
            {phoneModels.map((phone) => (
              <button
                key={phone.id}
                onClick={() => handleSelectModel(phone.id)}
                className="border rounded-lg p-4 text-center transition-all hover:border-[#4161c3] hover:bg-[#4161c3]/10 aspect-square flex items-center justify-center"
              >
                <div className="font-medium">{phone.model}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button
        onClick={handleCustomModel}
        variant="outline"
        className="mt-6 self-center"
      >
        Não está nas opções ao lado
      </Button>
    </div>
  );
};

export default ModelSelector;
