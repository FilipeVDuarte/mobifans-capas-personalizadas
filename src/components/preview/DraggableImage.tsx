
import React from "react";

interface DraggableImageProps {
  imageRef: React.RefObject<HTMLImageElement>;
  uploadedImage: string;
  imagePosition: { x: number; y: number };
  imageScale: number;
  imageRotation: number;
  isDraggingImage: boolean;
  isSelected: boolean;
  onSelect: () => void;
  updateLastInteraction: () => void;
}

export const DraggableImage: React.FC<DraggableImageProps> = ({
  imageRef,
  uploadedImage,
  imagePosition,
  imageScale,
  imageRotation,
  isDraggingImage,
  isSelected,
  onSelect,
  updateLastInteraction,
}) => {
  return (
    <div 
      className={`absolute w-full h-full ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
        updateLastInteraction();
      }}
    >
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
    </div>
  );
};
