
import React from "react";
import { TextStyle } from "@/context/CaseCustomizerContext";

interface DraggableTextProps {
  customText: TextStyle | null;
  containerRef: React.RefObject<HTMLDivElement>;
  setCustomText: (text: TextStyle | null) => void;
  isSelected: boolean;
  onSelect: () => void;
  updateLastInteraction: () => void;
}

export const DraggableText: React.FC<DraggableTextProps> = ({ 
  customText,
  containerRef,
  setCustomText,
  isSelected,
  onSelect,
  updateLastInteraction
}) => {
  if (!customText?.content) return null;

  const textStartPos = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  function handleTextStart(e: React.MouseEvent | React.TouchEvent) {
    e.stopPropagation();
    if (!customText || !setCustomText) return;
    onSelect();
    updateLastInteraction();

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    textStartPos.current = {
      x: clientX - (customText.position?.x || 0),
      y: clientY - (customText.position?.y || 0)
    };

    function handleTextMove(ev: MouseEvent | TouchEvent) {
      updateLastInteraction();
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
      updateLastInteraction();
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

  return (
    <div 
      className={`absolute select-none ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
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
        padding: "4px"
      }}
      onMouseDown={handleTextStart}
      onTouchStart={handleTextStart}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {customText.content}
    </div>
  );
};
