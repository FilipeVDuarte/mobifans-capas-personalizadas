
import React from "react";
import { Label } from "@/components/ui/label";

interface SolidColorSelectorProps {
  selectedColor: string;
  onChange: (color: string) => void;
}

const predefinedColors = [
  "#ff0000", // red
  "#ff8000", // orange
  "#ffff00", // yellow
  "#00ff00", // green
  "#0000ff", // blue
  "#4b0082", // indigo
  "#8b00ff", // violet
  "#ff69b4", // pink
  "#000000", // black
  "#ffffff", // white
];

const SolidColorSelector: React.FC<SolidColorSelectorProps> = ({ selectedColor, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <div className="mb-3 flex items-center justify-center">
          <Label className="text-base">Escolha uma cor sólida</Label>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {predefinedColors.map((color) => (
            <button
              key={color}
              onClick={() => onChange(color)}
              className={`w-12 h-12 rounded-full border-2 ${
                selectedColor === color ? "border-gray-900" : "border-gray-200"
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Color ${color}`}
            />
          ))}
        </div>
      </div>
      
      <div>
        <Label>Cor personalizada:</Label>
        <div className="flex items-center mt-1">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 p-0 border-0"
          />
          <div className="w-full h-2 bg-gradient-to-r from-black to-white rounded-full ml-2"></div>
        </div>
      </div>
    </div>
  );
};

export default SolidColorSelector;
