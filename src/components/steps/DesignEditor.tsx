
import React, { useState, useRef } from "react";
import { useCaseCustomizer } from "../../context/CaseCustomizerContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ZoomIn, RotateCcw, Type, Palette, Image, ArrowLeftRight, Save } from "lucide-react";
import useDraggableText from "../design-editor/useDraggableText";

const DesignEditor = () => {
  const { 
    imageScale, setImageScale, 
    imageRotation, setImageRotation,
    uploadedImage, setUploadedImage,
    backgroundColor, setBackgroundColor,
    customText, setCustomText,
    availableFonts,
    setImagePosition,
    setCurrentStep,
    selectedModel
  } = useCaseCustomizer();

  // Nova: opção de edição: "imagem" ou "cor"
  const [mode, setMode] = useState(uploadedImage ? "imagem" : "cor");
  // Upload file ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  // Texto customizado
  const [textInput, setTextInput] = useState(customText?.content || "");
  const [selectedFont, setSelectedFont] = useState(customText?.font || availableFonts[0]);
  const [textColor, setTextColor] = useState(customText?.color || "#000000");
  const [textSize, setTextSize] = useState(customText?.size || 20);
  const [textRotation, setTextRotation] = useState(customText ? customText.position?.rotation || 0 : 0);

  // Draggable text logic
  const [dragText, setDragText] = useState(false);
  const { textPosition, handleTextMouseDown } = useDraggableText(customText, setCustomText, setDragText, textRotation);

  // Cores sólidas do arco-íris
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

  // Aplica texto customizado, incluindo rotação/posição
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
      position: { 
        ...(customText?.position || { x: 20, y: 40 }),
        rotation: textRotation 
      }
    });
  };

  // File upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setMode("imagem");
        setBackgroundColor(null);
        setImagePosition({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  // Botão de salvar: baixa o preview como imagem
  const handleSaveDesign = () => {
    // Gera imagem do preview usando canvas
    const previewElem = document.querySelector(".case-preview-downloadable");
    if (previewElem) {
      import("html2canvas").then((html2canvas) => {
        html2canvas.default(previewElem as HTMLElement, { backgroundColor: null, useCORS: true }).then(canvas => {
          const url = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = url;
          link.download = "capa_customizada.png";
          link.click();
        });
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className={`font-medium ${isMobile ? 'text-base' : 'text-lg'}`}>Monte sua capa personalizada</h2>
      
      {/* Escolha inicial: cor sólida vs imagem */}
      <div className="bg-gray-100 rounded-lg p-3 mb-2">
        <Label className="block mb-2 text-sm font-medium">Escolha como personalizar sua capa:</Label>
        <div className="flex gap-2">
          <Button
            variant={mode === "cor" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setMode("cor");
              setUploadedImage(null);
            }}
          >
            <Palette className="mr-1 h-4 w-4" /> Cor sólida
          </Button>
          <Button
            variant={mode === "imagem" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setMode("imagem");
              fileInputRef.current?.click();
            }}
          >
            <Image className="mr-1 h-4 w-4" /> Upload de imagem
          </Button>
        </div>
        {/* Input real de arquivo hidden, acionado pelo botão */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Se cor sólida ativada */}
      {mode === "cor" && (
        <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Palette className={isMobile ? "h-3 w-3 text-gray-500 mr-1" : "h-4 w-4 text-gray-500 mr-2"} />
            <h3 className="text-sm font-medium">Escolha uma cor sólida</h3>
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
                onClick={() => setBackgroundColor(color.color)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Se imagem ativada */}
      {mode === "imagem" && uploadedImage && (
        <div className="space-y-5 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Ajuste de Imagem</h3>
            <Button
              size="xs"
              variant="outline"
              className="text-xs border-gray-300"
              onClick={() => setMode("cor")}
            >
              <ArrowLeftRight className="mr-1 h-3 w-3" /> Mudar para cor sólida
            </Button>
          </div>
          <p className="text-xs text-gray-500">Arraste a imagem na pré-visualização.<br />
            Ajuste o tamanho e rotação abaixo:</p>
          
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
      )}

      {/* Seção para texto customizado - SEMPRE disponível */}
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
                <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: textColor }} />
                <Input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-full h-8"
                />
              </div>
            </div>
          </div>
          {/* Tamanho e rotação do texto */}
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
          <div className="space-y-1">
            <div className="flex justify-between">
              <Label className="text-xs">Rotação do texto:</Label>
              <span className="text-xs">{textRotation}°</span>
            </div>
            <Slider
              value={[textRotation]}
              min={-180}
              max={180}
              step={1}
              onValueChange={(value) => setTextRotation(value[0])}
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
          <div className="text-xs text-gray-400">
            * Para mover o texto, posicione o cursor/mouse sobre o texto na pré-visualização.
          </div>
        </div>
      </div>

      {/* BOTÃO FINAL: SALVAR CAPA */}
      <div className="pt-4 flex justify-end">
        <Button onClick={handleSaveDesign}>
          <Save className="mr-2 h-4 w-4" /> Salvar capa como imagem
        </Button>
      </div>
    </div>
  );
};

export default DesignEditor;
