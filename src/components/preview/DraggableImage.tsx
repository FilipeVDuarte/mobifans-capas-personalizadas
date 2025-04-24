
import React from "react";

interface DraggableImageProps {
  imageRef: React.RefObject<HTMLImageElement>;
  uploadedImage: string;
  imagePosition: { x: number; y: number };
  imageScale: number;
  imageRotation: number;
  isDraggingImage: boolean;
  updateLastInteraction: () => void;
}

export const DraggableImage: React.FC<DraggableImageProps> = ({
  imageRef,
  uploadedImage,
  imagePosition,
  imageScale,
  imageRotation,
  isDraggingImage,
  updateLastInteraction,
}) => {
  return (
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
  );
};
