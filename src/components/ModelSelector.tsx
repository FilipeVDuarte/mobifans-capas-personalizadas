
import React from "react";
import { useCaseCustomizer } from "../context/CaseCustomizerContext";
import { phoneModelsByBrand } from "../data/phoneModels";
import { Button } from "@/components/ui/button";
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

  const getModelIcon = (modelId: string) => {
    const model = phoneModelsByBrand[selectedBrand].find(m => m.id === modelId);
    if (!model) return null;
    
    try {
      return <img 
        src={`/src/icons models/Icon_${modelId}.svg`}
        alt={`${model.model} icon`}
        className="w-16 h-16 mb-2"
      />;
    } catch {
      return null;
    }
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
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {phoneModels.map((phone) => (
          <button
            key={phone.id}
            onClick={() => handleSelectModel(phone.id)}
            className="border rounded-lg p-4 text-center transition-all 
              hover:border-[#4161c3] hover:bg-[#4161c3]/10 flex flex-col 
              items-center justify-center aspect-square"
          >
            {getModelIcon(phone.id)}
            <div className="font-medium mt-2">Capa {phone.model}</div>
          </button>
        ))}
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
