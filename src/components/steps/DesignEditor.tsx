
import React, { useState } from "react";
import { useCaseCustomizer } from "../../context/CaseCustomizerContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, RotateCcw, ShoppingCart } from "lucide-react";
import EditorTabs from "../design-editor/EditorTabs";
import PositionTab from "../design-editor/PositionTab";
import ResizeTab from "../design-editor/ResizeTab";
import RotateTab from "../design-editor/RotateTab";

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
      
      <EditorTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 mb-4">
        {activeTab === "position" && (
          <PositionTab onPositionChange={handlePositionChange} />
        )}
        
        {activeTab === "resize" && (
          <ResizeTab
            scale={imageScale}
            onScaleChange={setImageScale}
          />
        )}
        
        {activeTab === "rotate" && (
          <RotateTab
            rotation={imageRotation}
            onRotationChange={setImageRotation}
          />
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
