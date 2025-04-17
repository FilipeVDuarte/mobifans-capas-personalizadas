import React, { useState } from "react";
import { useCaseCustomizer } from "../../context/CaseCustomizerContext";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, RotateCcw, ZoomIn, Move, ShoppingCart } from "lucide-react";

const DesignEditor: React.FC = () => {
  const { 
    imageScale, 
    setImageScale, 
    imageRotation, 
    setImageRotation,
    imagePosition,
    setImagePosition,
    setCurrentStep 
  } = useCaseCustomizer();

  const [activeTab, setActiveTab] = useState<"position" | "resize" | "rotate">("position");

  const handleBack = () => {
    setCurrentStep(1);
  };
  
  const handleProceedToCheckout = () => {
    setCurrentStep(3);
  };

  const handlePositionChange = (change: { x: number, y: number }) => {
    setImagePosition({
      x: imagePosition.x + change.x,
      y: imagePosition.y + change.y,
    });
  };

  const handleReset = () => {
    setImagePosition({ x: 0, y: 0 });
    setImageScale(1);
    setImageRotation(0);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <h2 className="text-lg font-semibold mb-4">Design da Sua Capa</h2>
      
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab("position")}
          className={`px-4 py-2 text-sm ${
            activeTab === "position"
              ? "border-b-2 border-primary font-medium text-primary"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Posição
        </button>
        <button
          onClick={() => setActiveTab("resize")}
          className={`px-4 py-2 text-sm ${
            activeTab === "resize"
              ? "border-b-2 border-primary font-medium text-primary"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Tamanho
        </button>
        <button
          onClick={() => setActiveTab("rotate")}
          className={`px-4 py-2 text-sm ${
            activeTab === "rotate"
              ? "border-b-2 border-primary font-medium text-primary"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Rotação
        </button>
      </div>
      
      <div className="flex-1 mb-4">
        {activeTab === "position" && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handlePositionChange({ x: 0, y: -10 })}
              >
                Cima
              </Button>
              <div></div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handlePositionChange({ x: 0, y: 10 })}
              >
                Baixo
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handlePositionChange({ x: -10, y: 0 })}
              >
                Esquerda
              </Button>
              <div className="flex items-center justify-center">
                <Move className="h-5 w-5 text-gray-400" />
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handlePositionChange({ x: 10, y: 0 })}
              >
                Direita
              </Button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Use os botões para posicionar sua imagem na capa
            </p>
          </div>
        )}
        
        {activeTab === "resize" && (
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center">
                <ZoomIn className="h-4 w-4 text-gray-500 mr-2" />
                <Slider
                  value={[imageScale * 100]}
                  min={50}
                  max={150}
                  step={5}
                  className="flex-1"
                  onValueChange={(value) => setImageScale(value[0] / 100)}
                />
                <span className="ml-2 text-sm text-gray-500 w-8 text-right">
                  {Math.round(imageScale * 100)}%
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Ajuste o controle deslizante para redimensionar sua imagem
            </p>
          </div>
        )}
        
        {activeTab === "rotate" && (
          <div className="space-y-4">
            <div className="flex items-center">
              <RotateCcw className="h-4 w-4 text-gray-500 mr-2" />
              <Slider
                value={[imageRotation]}
                min={0}
                max={360}
                step={5}
                className="flex-1"
                onValueChange={(value) => setImageRotation(value[0])}
              />
              <span className="ml-2 text-sm text-gray-500 w-8 text-right">
                {imageRotation}°
              </span>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Ajuste o controle deslizante para rotacionar sua imagem
            </p>
          </div>
        )}
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="mb-4"
        onClick={handleReset}
      >
        <RotateCcw className="mr-1 h-4 w-4" />
        Redefinir Design
      </Button>
      
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <Button 
          variant="outline"
          onClick={handleBack}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Voltar
        </Button>
        <Button 
          onClick={handleProceedToCheckout}
          className="flex items-center"
        >
          <ShoppingCart className="mr-1 h-4 w-4" />
          Finalizar
        </Button>
      </div>
    </div>
  );
};

export default DesignEditor;
