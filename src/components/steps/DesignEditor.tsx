
import React, { useState } from "react";
import { useCaseCustomizer } from "../../context/CaseCustomizerContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ZoomIn, RotateCcw, Type, Palette } from "lucide-react";

/**
 * Componente principal do editor de design da capa
 * Organizado em seções que ficam todas visíveis na mesma tela
 */
const DesignEditor = () => {
  // Hook de contexto que fornece estado e funções para customização da capa
  const { 
    imageScale, 
    setImageScale, 
    imageRotation, 
    setImageRotation,
    uploadedImage,
    setUploadedImage,
    backgroundColor,
    setBackgroundColor,
    customText,
    setCustomText,
    availableFonts
  } = useCaseCustomizer();
  
  // Estado local para acompanhar o texto em edição
  const [textInput, setTextInput] = useState(customText?.content || "");
  const [selectedFont, setSelectedFont] = useState(customText?.font || availableFonts[0]);
  const [textColor, setTextColor] = useState(customText?.color || "#000000");
  const [textSize, setTextSize] = useState(customText?.size || 20);
  
  // Verifica se está em um dispositivo móvel
  const isMobile = useIsMobile();

  // Cores sólidas pré-definidas (arco-íris + extras)
  const solidColors = [
    { name: "Vermelho", color: "#FF0000" },
    { name: "Laranja", color: "#FF7F00" },
    { name: "Amarelo", color: "#FFFF00" },
    { name: "Verde", color: "#00FF00" },
    { name: "Azul", color: "#0000FF" },
    { name: "Anil", color: "#4B0082" },
    { name: "Violeta", color: "#9400D3" },
    { name: "Rosa", color: "#FF69B4" },
    { name: "Preto", color: "#000000" },
    { name: "Branco", color: "#FFFFFF" },
  ];

  // Manipulador para aplicar texto customizado
  const handleApplyText = () => {
    if (!textInput.trim()) {
      setCustomText(null);
      return;
    }

    setCustomText({
      content: textInput,
      font: selectedFont,
      color: textColor,
      size: textSize,
      position: customText?.position || { x: 20, y: 40 }
    });
  };
  
  // Manipulador para aplicar cor de fundo sólida
  const handleSolidColorSelect = (color: string) => {
    setBackgroundColor(color);
    setUploadedImage(null); // Remove imagem quando usar cor sólida
  };
  
  // Manipulador para remover cor de fundo
  const handleRemoveBackground = () => {
    setBackgroundColor(null);
  };

  return (
    <div className="space-y-6">
      <h2 className={`font-medium ${isMobile ? 'text-base' : 'text-lg'}`}>Personalize seu Design</h2>
      
      {/* Seção de configuração da imagem */}
      {uploadedImage && (
        <div className="space-y-5 p-3 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium">Ajuste de Imagem</h3>
          <p className="text-xs text-gray-500">Arraste a imagem diretamente na pré-visualização</p>
          
          <div className="space-y-5">
            {/* Controle de tamanho da imagem */}
            <div className="space-y-2">
              <div className="flex items-center">
                <ZoomIn className={isMobile ? "h-3 w-3 text-gray-500 mr-1" : "h-4 w-4 text-gray-500 mr-2"} />
                <span className="text-xs text-gray-700 mr-2">Tamanho:</span>
                <Slider
                  value={[imageScale * 100]}
                  min={50}
                  max={150}
                  step={5}
                  className="flex-1"
                  onValueChange={(value) => setImageScale(value[0] / 100)}
                />
                <span className={isMobile ? "ml-1 text-xs text-gray-500 w-6 text-right" : "ml-2 text-sm text-gray-500 w-8 text-right"}>
                  {Math.round(imageScale * 100)}%
                </span>
              </div>
            </div>

            {/* Controle de rotação da imagem */}
            <div className="space-y-2">
              <div className="flex items-center">
                <RotateCcw className={isMobile ? "h-3 w-3 text-gray-500 mr-1" : "h-4 w-4 text-gray-500 mr-2"} />
                <span className="text-xs text-gray-700 mr-2">Rotação:</span>
                <Slider
                  value={[imageRotation]}
                  min={0}
                  max={360}
                  step={5}
                  className="flex-1"
                  onValueChange={(value) => setImageRotation(value[0])}
                />
                <span className={isMobile ? "ml-1 text-xs text-gray-500 w-6 text-right" : "ml-2 text-sm text-gray-500 w-8 text-right"}>
                  {imageRotation}°
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Seção de Cor de Fundo Sólida */}
      <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <Palette className={isMobile ? "h-3 w-3 text-gray-500 mr-1" : "h-4 w-4 text-gray-500 mr-2"} />
          <h3 className="text-sm font-medium">Cor de Fundo</h3>
        </div>
        
        <div className="grid grid-cols-5 gap-2">
          {solidColors.map((color) => (
            <button
              key={color.color}
              title={color.name}
              className={`w-full aspect-square rounded-full border-2 transition-all ${
                backgroundColor === color.color ? "border-black scale-110" : "border-gray-200"
              }`}
              style={{ backgroundColor: color.color }}
              onClick={() => handleSolidColorSelect(color.color)}
            />
          ))}
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs" 
            onClick={handleRemoveBackground}
          >
            Remover Cor
          </Button>
          
          {!uploadedImage && (
            <span className="text-xs text-gray-500 flex items-center">
              Você pode adicionar uma imagem na etapa anterior
            </span>
          )}
        </div>
      </div>
      
      {/* Seção de Adição de Texto */}
      <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <Type className={isMobile ? "h-3 w-3 text-gray-500 mr-1" : "h-4 w-4 text-gray-500 mr-2"} />
          <h3 className="text-sm font-medium">Adicionar Texto</h3>
        </div>
        
        <div className="space-y-3">
          <Input
            placeholder="Digite seu texto aqui"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="text-sm"
          />
          
          <div className="grid grid-cols-2 gap-3">
            {/* Seletor de fonte */}
            <div className="space-y-1">
              <Label className="text-xs">Escolha uma fonte:</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full justify-start text-left">
                    <span className="truncate" style={{ fontFamily: selectedFont }}>
                      {selectedFont.split(',')[0]}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-2 w-48">
                  <RadioGroup value={selectedFont} onValueChange={setSelectedFont}>
                    {availableFonts.map((font) => (
                      <div className="flex items-center space-x-2" key={font}>
                        <RadioGroupItem value={font} id={font} />
                        <Label htmlFor={font} className="text-sm cursor-pointer" style={{ fontFamily: font }}>
                          {font.split(',')[0]}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Seletor de cor */}
            <div className="space-y-1">
              <Label className="text-xs">Cor do texto:</Label>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: textColor }}
                />
                <Input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-full h-8"
                />
              </div>
            </div>
          </div>
          
          {/* Controle de tamanho do texto */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <Label className="text-xs">Tamanho do texto:</Label>
              <span className="text-xs">{textSize}px</span>
            </div>
            <Slider
              value={[textSize]}
              min={12}
              max={48}
              step={1}
              onValueChange={(value) => setTextSize(value[0])}
            />
          </div>
          
          <div className="flex justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => {
                setTextInput("");
                setCustomText(null);
              }}
            >
              Limpar texto
            </Button>
            
            <Button
              variant="default"
              size="sm"
              className="text-xs"
              onClick={handleApplyText}
            >
              Aplicar texto
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignEditor;
