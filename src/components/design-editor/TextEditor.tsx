
import React, { useState, useEffect } from "react";
import { useCaseCustomizer } from "../../context/CaseCustomizerContext";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ColorPicker from "./ColorPicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TextEditor: React.FC = () => {
  const {
    customText,
    setCustomText,
    availableFonts,
    updateLastInteraction
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

  return (
    <div className="space-y-4 mt-6">
      <h3 className="font-medium text-lg">Adicionar Texto:</h3>
      
      <Input
        placeholder="Escreva aqui"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Escolha uma fonte:</Label>
          <Select 
            value={selectedFont} 
            onValueChange={(value) => {
              updateLastInteraction();
              setSelectedFont(value);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableFonts.map((font) => (
                <SelectItem key={font} value={font}>
                  <span style={{ fontFamily: font }}>
                    {font.split(",")[0]}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Cor do texto:</Label>
          <ColorPicker 
            color={textColor} 
            onChange={(color) => {
              updateLastInteraction();
              setTextColor(color);
            }} 
          />
        </div>
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <Label>Tamanho</Label>
          <span>{textSize}px</span>
        </div>
        <Slider
          value={[textSize]}
          min={12}
          max={72}
          step={1}
          onValueChange={(value) => {
            updateLastInteraction();
            setTextSize(value[0]);
          }}
        />
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <Label>Rotação</Label>
          <span>{textRotation}°</span>
        </div>
        <Slider
          value={[textRotation]}
          min={-180}
          max={180}
          step={1}
          onValueChange={(value) => {
            updateLastInteraction();
            setTextRotation(value[0]);
          }}
        />
      </div>
      
      <div className="flex space-x-2 pt-2">
        <Button 
          variant="outline" 
          onClick={clearText}
          className="flex-1"
        >
          Limpar texto
        </Button>
        
        <Button 
          onClick={applyText}
          className="bg-[#4161c3] hover:bg-[#3451a3] flex-1"
        >
          Aplicar texto
        </Button>
      </div>
      
      <div className="text-xs text-gray-500 italic">
        * Para mover o texto, posicione o cursor/mouse sobre o texto na pré-visualização.
      </div>
    </div>
  );
};

export default TextEditor;
