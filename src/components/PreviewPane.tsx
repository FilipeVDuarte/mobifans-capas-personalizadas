
import React, { useRef, useEffect, useState } from "react";
import { useCaseCustomizer } from "../context/CaseCustomizerContext";
import { PhonePlaceholder } from "./PlaceholderPhoneModels";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";
import { DraggableText } from "./preview/DraggableText";
import { DraggableImage } from "./preview/DraggableImage";

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
    customText,
    setCustomText,
    updateLastInteraction
  } = useCaseCustomizer();
  
  const [selectedElement, setSelectedElement] = useState<'image' | 'text' | null>(null);
  const isMobile = useIsMobile();
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef<{x: number, y: number}>({ x: 0, y: 0 });

  // Handle image dragging
  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      if (selectedElement !== 'image' && selectedElement !== null) return;
      if ('button' in e && e.button !== 0) return;

      e.preventDefault();
      updateLastInteraction();

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
      updateLastInteraction();

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      setImagePosition({
        x: clientX - startPosRef.current.x,
        y: clientY - startPosRef.current.y
      });
    };

    const handleMouseUp = () => {
      updateLastInteraction();
      setDraggingImage(false);
    };

    const handleContainerClick = () => {
      setSelectedElement(null);
    };

    const imageContainer = containerRef.current;
    if (imageContainer && uploadedImage) {
      imageContainer.addEventListener('mousedown', handleMouseDown);
      imageContainer.addEventListener('touchstart', handleMouseDown, { passive: false });
      imageContainer.addEventListener('click', handleContainerClick);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleMouseMove, { passive: false });
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      if (imageContainer) {
        imageContainer.removeEventListener('mousedown', handleMouseDown);
        imageContainer.removeEventListener('touchstart', handleMouseDown);
        imageContainer.removeEventListener('click', handleContainerClick);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [imagePosition, isDraggingImage, setDraggingImage, setImagePosition, uploadedImage, selectedElement, updateLastInteraction]);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <AspectRatio ratio={3/4} className="w-full max-w-[600px]">
        <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg shadow-sm">
          {!selectedModel ? (
            <div className="text-center text-gray-500 animate-pulse p-4">
              <p>Selecione um modelo para visualizar sua capa personalizada</p>
            </div>
          ) : (
            <div className="relative case-preview-downloadable transform-gpu">
              <div className="relative">
                <PhonePlaceholder 
                  brand={selectedModel.brand}
                  width={selectedModel.dimensions.width}
                  height={selectedModel.dimensions.height}
                />
                
                <div 
                  ref={containerRef}
                  className="absolute inset-0 overflow-hidden rounded-[32px] z-5"
                  style={{
                    width: `${selectedModel.dimensions.width}px`,
                    height: `${selectedModel.dimensions.height}px`,
                    backgroundColor: backgroundColor || undefined
                  }}
                >
                  {uploadedImage && (
                    <DraggableImage 
                      imageRef={imageRef}
                      uploadedImage={uploadedImage}
                      imagePosition={imagePosition}
                      imageScale={imageScale}
                      imageRotation={imageRotation}
                      isDraggingImage={isDraggingImage}
                      isSelected={selectedElement === 'image'}
                      onSelect={() => setSelectedElement('image')}
                      updateLastInteraction={updateLastInteraction}
                    />
                  )}

                  {!!customText?.content && (
                    <DraggableText
                      customText={customText}
                      containerRef={containerRef}
                      setCustomText={setCustomText}
                      isSelected={selectedElement === 'text'}
                      onSelect={() => setSelectedElement('text')}
                      updateLastInteraction={updateLastInteraction}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </AspectRatio>
    </div>
  );
};

export default PreviewPane;
