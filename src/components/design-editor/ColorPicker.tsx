
import React from "react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, label }) => {
  return (
    <div className="flex items-center">
      {label && <span className="mr-2">{label}</span>}
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 p-0 border-0"
      />
      <div className="w-full h-2 bg-gradient-to-r from-black to-white rounded-full ml-2"></div>
    </div>
  );
};

export default ColorPicker;
