
import { useRef, useState, useEffect } from "react";
import { TextStyle } from "../../context/CaseCustomizerContext";

// Hook simples para permitir arrastar texto na preview
export default function useDraggableText(
  customText: TextStyle | null,
  setCustomText: (txt: TextStyle | null) => void,
  setDragActive: (dragging: boolean) => void,
  rotation: number
) {
  const [textPosition, setTextPosition] = useState(customText?.position || { x: 20, y: 40, rotation });
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    setTextPosition(customText?.position || { x: 20, y: 40, rotation });
  }, [customText, rotation]);

  function handleTextMouseDown(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    setDragActive(true);

    const isTouch = "touches" in e;
    const startX = isTouch ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const startY = isTouch ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;

    dragStart.current = {
      x: startX - (textPosition.x || 0),
      y: startY - (textPosition.y || 0)
    };

    const handleMove = (moveEvent: any) => {
      const clientX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const clientY = moveEvent.touches ? moveEvent.touches[0].clientY : moveEvent.clientY;
      const newX = clientX - dragStart.current.x;
      const newY = clientY - dragStart.current.y;

      setTextPosition((prev) => {
        const newPos = { ...prev, x: newX, y: newY, rotation };
        if (customText)
          setCustomText({
            ...customText,
            position: newPos
          });
        return newPos;
      });
    };

    const handleUp = () => {
      setDragActive(false);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleUp);
  }

  return { textPosition, handleTextMouseDown };
}
