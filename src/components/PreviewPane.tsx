
import React from "react";
import { useCaseCustomizer } from "../context/CaseCustomizerContext";
import { PhonePlaceholder } from "./PlaceholderPhoneModels";
import { useIsMobile } from "@/hooks/use-mobile";

const PreviewPane: React.FC = () => {
  const { 
    selectedModel, 
    uploadedImage, 
    imagePosition, 
    imageScale, 
    imageRotation 
  } = useCaseCustomizer();
  const isMobile = useIsMobile();

  return (
    <div className={`relative bg-gray-50 rounded-lg shadow-sm flex items-center justify-center w-full transition-all duration-300
      ${isMobile ? 'p-2 max-h-full' : 'p-6 max-w-md max-h-[600px]'}`}>
      {!selectedModel ? (
        <div className="text-center text-gray-500 animate-pulse p-4">
          <p>{isMobile ? "Selecione um modelo" : "Selecione um modelo para visualizar sua capa personalizada"}</p>
        </div>
      ) : (
        <div className="relative">
          {/* Phone outline using placeholder component */}
          <div className="relative">
            <PhonePlaceholder 
              brand={selectedModel.brand}
              width={selectedModel.dimensions.width}
              height={selectedModel.dimensions.height}
            />
            
            {/* Custom case with uploaded image */}
            {uploadedImage && (
              <div 
                className="absolute inset-0 overflow-hidden rounded-[32px] z-5"
                style={{
                  width: `${selectedModel.dimensions.width}px`,
                  height: `${selectedModel.dimensions.height}px`
                }}
              >
                <img 
                  src={uploadedImage} 
                  alt="Custom case"
                  className="absolute" 
                  style={{
                    transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageScale}) rotate(${imageRotation}deg)`,
                    maxWidth: "none",
                    transition: "transform 0.2s ease-out"
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPane;
