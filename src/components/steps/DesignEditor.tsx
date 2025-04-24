
import React, { useState, useEffect } from "react";
import { useCaseCustomizer } from "../../context/CaseCustomizerContext";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import ColorPicker from "../design-editor/ColorPicker";
import SolidColorSelector from "../design-editor/SolidColorSelector";
import TextEditor from "../design-editor/TextEditor";

const DesignEditor: React.FC = () => {
  const {
    uploadedImage,
    setUploadedImage,
    imageScale,
    setImageScale,
    imageRotation,
    setImageRotation,
    customText,
    setCustomText,
    availableFonts,
    designType,
    goToStep,
    setCurrentStep,
    goToPreviousStep,
    updateLastInteraction,
    backgroundColor,
    setBackgroundColor
  } = useCaseCustomizer();

  const [textInput, setTextInput] = useState("");
  const [selectedFont, setSelectedFont] = useState(availableFonts[0]);
  const [textColor, setTextColor] = useState("#000000");
  const [textSize, setTextSize] = useState(24);
  const [textRotation, setTextRotation] = useState(0);
  
  // Initialize text settings from existing customText if any
  useEffect(() => {
    if (customText) {
      setTextInput(customText.content);
      setSelectedFont(customText.font);
      setTextColor(customText.color);
      setTextSize(customText.size);
      setTextRotation(customText.position.rotation);
    }
  }, [customText]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLastInteraction();
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyText = () => {
    updateLastInteraction();
    if (textInput.trim()) {
      setCustomText({
        content: textInput,
        font: selectedFont,
        color: textColor,
        size: textSize,
        position: {
          x: customText?.position?.x || 0,
          y: customText?.position?.y || 0,
          rotation: textRotation
        }
      });
    }
  };

  const clearText = () => {
    updateLastInteraction();
    setTextInput("");
    setCustomText(null);
  };
  
  const handleFinish = () => {
    updateLastInteraction();
    setCurrentStep(1); // Move to export step
    goToStep('export');
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => {
            updateLastInteraction();
            goToPreviousStep();
          }}
          className="flex items-center text-[#4161c3]"
        >
          <ArrowLeft className="mr-1" size={16} />
          <span>Voltar</span>
        </button>
      </div>

      {designType === 'image' && (
        <>
          <div className="flex space-x-2 mb-4">
            <Button
              onClick={() => document.getElementById('image-upload')?.click()}
              variant="secondary"
              className="flex-1"
            >
              Upload de imagem
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            
            {uploadedImage && (
              <Button
                onClick={() => setUploadedImage(null)}
                variant="secondary"
                className="flex-1"
              >
                Trocar imagem
              </Button>
            )}
          </div>

          {uploadedImage && (
            <>
              <div className="space-y-4 mb-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <Label>Tamanho</Label>
                    <span>{Math.round(imageScale * 100)}%</span>
                  </div>
                  <Slider
                    value={[imageScale * 100]}
                    min={50}
                    max={200}
                    step={1}
                    onValueChange={(value) => {
                      updateLastInteraction();
                      setImageScale(value[0] / 100);
                    }}
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <Label>Rotação</Label>
                    <span>{imageRotation}°</span>
                  </div>
                  <Slider
                    value={[imageRotation]}
                    min={-180}
                    max={180}
                    step={1}
                    onValueChange={(value) => {
                      updateLastInteraction();
                      setImageRotation(value[0]);
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}

      {designType === 'solid' && (
        <SolidColorSelector
          selectedColor={backgroundColor || "#ffffff"}
          onChange={(color) => {
            updateLastInteraction();
            setBackgroundColor(color);
          }}
        />
      )}

      <TextEditor />

      <div className="mt-auto pt-4">
        <Button 
          onClick={handleFinish}
          className="w-full bg-[#4161c3] hover:bg-[#3451a3]"
        >
          Finalizar
        </Button>
      </div>
    </div>
  );
};

export default DesignEditor;
