
import React from "react";
import { useCaseCustomizer } from "../context/CaseCustomizerContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Upload, PaintBucket } from "lucide-react";

const DesignTypeSelector: React.FC = () => {
  const { 
    goToStep,
    goToPreviousStep,
    setDesignType,
    updateLastInteraction
  } = useCaseCustomizer();

  const handleSelectDesignType = (type: 'image' | 'solid') => {
    updateLastInteraction();
    setDesignType(type);
    goToStep('design');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <button 
        onClick={() => {
          updateLastInteraction();
          goToPreviousStep();
        }}
        className="flex items-center text-[#4161c3] mb-8"
      >
        <ArrowLeft className="mr-2" />
        <span className="text-lg">Voltar</span>
      </button>

      <h1 className="text-5xl font-bold text-[#4161c3] mb-16 text-center">
        O que deseja fazer?
      </h1>
      
      <div className="flex flex-col space-y-6 items-center">
        <Button
          onClick={() => handleSelectDesignType('image')}
          className="bg-[#4161c3] hover:bg-[#3451a3] w-full max-w-sm h-16 text-xl"
        >
          <Upload className="mr-2" size={24} /> Upload de imagem
        </Button>
        
        <div className="text-2xl text-gray-500 my-2">ou</div>
        
        <Button
          onClick={() => handleSelectDesignType('solid')}
          className="bg-[#4161c3] hover:bg-[#3451a3] w-full max-w-sm h-16 text-xl"
        >
          <PaintBucket className="mr-2" size={24} /> Cor sólida
        </Button>
      </div>
    </div>
  );
};

export default DesignTypeSelector;
