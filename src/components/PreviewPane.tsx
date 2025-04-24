import React, { useRef, useEffect } from "react";
import { useCaseCustomizer } from "../context/CaseCustomizerContext";
import { PhonePlaceholder } from "./PlaceholderPhoneModels";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
    customText,
    setCustomText
  } = useCaseCustomizer();
  
  const isMobile = useIsMobile();
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef<{x: number, y: number}>({ x: 0, y: 0 });
  const textStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

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

  // --- DRAGGABLE TEXT --- //
  useEffect(() => {
    if (!containerRef.current) return;

    function handleTextStart(e: MouseEvent | TouchEvent) {
      if (!customText || !setCustomText) return;

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      textStartPos.current = {
        x: clientX - (customText.position?.x || 0),
        y: clientY - (customText.position?.y || 0)
      };

      function handleTextMove(ev: MouseEvent | TouchEvent) {
        const moveX = "touches" in ev ? ev.touches[0].clientX : ev.clientX;
        const moveY = "touches" in ev ? ev.touches[0].clientY : ev.clientY;

        setCustomText({
          ...customText,
          position: {
            ...(customText.position || { x: 0, y: 0, rotation: 0 }),
            x: moveX - textStartPos.current.x,
            y: moveY - textStartPos.current.y,
            rotation: customText.position?.rotation || 0
          }
        });
      }

      function handleTextUp() {
        window.removeEventListener('mousemove', handleTextMove);
        window.removeEventListener('touchmove', handleTextMove);
        window.removeEventListener('mouseup', handleTextUp);
        window.removeEventListener('touchend', handleTextUp);
      }

      window.addEventListener('mousemove', handleTextMove);
      window.addEventListener('touchmove', handleTextMove, { passive: false });
      window.addEventListener('mouseup', handleTextUp);
      window.addEventListener('touchend', handleTextUp);
    }

    const container = containerRef.current;
    // Add a custom event on the TEXT DIV ONLY
    if (container) {
      const textElem = container.querySelector('[data-role="custom-draggable-text"]');
      if (textElem) {
        textElem.addEventListener('mousedown', handleTextStart);
        textElem.addEventListener('touchstart', handleTextStart, { passive: false });
      }
      return () => {
        if (textElem) {
          textElem.removeEventListener('mousedown', handleTextStart);
          textElem.removeEventListener('touchstart', handleTextStart);
        }
      };
    }
  }, [customText, setCustomText]);

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

                  {!!customText?.content && (
                    <div 
                      className="absolute select-none"
                      data-role="custom-draggable-text"
                      style={{
                        fontFamily: customText.font,
                        color: customText.color,
                        fontSize: `${customText.size}px`,
                        transform: `translate(${customText.position?.x || 0}px, ${customText.position?.y || 0}px) rotate(${customText.position?.rotation || 0}deg)`,
                        textShadow: "0px 1px 2px rgba(0,0,0,0.2)",
                        userSelect: "none",
                        whiteSpace: "pre",
                        touchAction: "none",
                        cursor: "move",
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
      </AspectRatio>
    </div>
  );
};

export default PreviewPane;
