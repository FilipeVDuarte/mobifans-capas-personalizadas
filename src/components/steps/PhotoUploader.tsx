
import React, { useRef } from "react";
import { useCaseCustomizer } from "../../context/CaseCustomizerContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Upload, Image } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const PhotoUploader: React.FC = () => {
  const { 
    setUploadedImage, 
    uploadedImage, 
    setCurrentStep 
  } = useCaseCustomizer();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleBack = () => {
    setCurrentStep(0);
  };
  
  const handleContinue = () => {
    if (uploadedImage) {
      setCurrentStep(2);
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <h2 className={`font-semibold mb-4 ${isMobile ? "text-base" : "text-lg"}`}>Faça Upload da Sua Foto</h2>
      
      <div className="flex-1">
        {!uploadedImage ? (
          <div 
            className={`border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors
              ${isMobile ? "p-3 h-40" : "p-6 h-64"}`}
            onClick={handleUploadClick}
          >
            <Upload className={isMobile ? "h-8 w-8 text-gray-400 mb-2" : "h-10 w-10 text-gray-400 mb-2"} />
            <p className={`text-gray-500 text-center mb-2 ${isMobile ? "text-xs" : "text-sm"}`}>
              Clique para fazer upload ou arraste uma imagem
            </p>
            <p className={isMobile ? "text-[10px] text-gray-400" : "text-xs text-gray-400"}>
              PNG, JPG ou WEBP (máx 5MB)
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        ) : (
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-lg mb-3 relative bg-gray-100">
              <img 
                src={uploadedImage} 
                alt="Uploaded" 
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              variant="outline"
              size={isMobile ? "sm" : "default"}
              className="w-full"
              onClick={handleUploadClick}
            >
              <Image className={`mr-2 ${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
              Trocar Imagem
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button 
          variant="outline"
          size={isMobile ? "sm" : "default"}
          onClick={handleBack}
        >
          <ChevronLeft className={`mr-1 ${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
          Voltar
        </Button>
        <Button 
          onClick={handleContinue}
          disabled={!uploadedImage}
          size={isMobile ? "sm" : "default"}
        >
          Continuar
          <ChevronRight className={`ml-1 ${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
        </Button>
      </div>
    </div>
  );
};

export default PhotoUploader;
