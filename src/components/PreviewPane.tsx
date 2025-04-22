
import React, { useRef, useEffect } from "react";
import { useCaseCustomizer } from "../context/CaseCustomizerContext";
import { PhonePlaceholder } from "./PlaceholderPhoneModels";
import { useIsMobile } from "@/hooks/use-mobile";

const PreviewPane: React.FC = () => {
  const { 
    selectedModel, 
    uploadedImage,
    backgroundColor,
    imagePosition, 
    imageScale, 
    imageRotation,
    isDraggingImage,
    setDraggingImage,
    setImagePosition,
    customText
  } = useCaseCustomizer();
  
  const isMobile = useIsMobile();
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef<{x: number, y: number}>({ x: 0, y: 0 });

  // Handle image dragging
  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      // Only handle left mouse button or touch
      if ('button' in e && e.button !== 0) return;
      
      e.preventDefault();
      
      // Get start coordinates
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      startPosRef.current = { 
        x: clientX - imagePosition.x, 
        y: clientY - imagePosition.y 
      };
      
      setDraggingImage(true);
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingImage) return;
      
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      setImagePosition({
        x: clientX - startPosRef.current.x,
        y: clientY - startPosRef.current.y
      });
    };

    const handleMouseUp = () => {
      setDraggingImage(false);
    };

    // Add drag event listeners to the image container
    const imageContainer = containerRef.current;
    if (imageContainer && uploadedImage) {
      imageContainer.addEventListener('mousedown', handleMouseDown);
      imageContainer.addEventListener('touchstart', handleMouseDown, { passive: false });
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleMouseMove, { passive: false });
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      if (imageContainer) {
        imageContainer.removeEventListener('mousedown', handleMouseDown);
        imageContainer.removeEventListener('touchstart', handleMouseDown);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [imagePosition, isDraggingImage, setDraggingImage, setImagePosition, uploadedImage]);

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
            
            {/* Custom case with background color or uploaded image */}
            <div 
              ref={containerRef}
              className="absolute inset-0 overflow-hidden rounded-[32px] z-5 cursor-move"
              style={{
                width: `${selectedModel.dimensions.width}px`,
                height: `${selectedModel.dimensions.height}px`,
                backgroundColor: backgroundColor || undefined
              }}
            >
              {uploadedImage && (
                <img 
                  ref={imageRef}
                  src={uploadedImage} 
                  alt="Custom case"
                  className="absolute select-none" 
                  style={{
                    transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageScale}) rotate(${imageRotation}deg)`,
                    maxWidth: "none",
                    transition: isDraggingImage ? "none" : "transform 0.2s ease-out",
                    cursor: "move"
                  }}
                  draggable="false"
                />
              )}

              {/* Custom Text Overlay */}
              {customText && (
                <div 
                  className="absolute"
                  style={{
                    fontFamily: customText.font,
                    color: customText.color,
                    fontSize: `${customText.size}px`,
                    transform: `translate(${customText.position.x}px, ${customText.position.y}px)`,
                    textShadow: "0px 1px 2px rgba(0,0,0,0.2)",
                    userSelect: "none",
                    whiteSpace: "pre",
                  }}
                >
                  {customText.content}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPane;
