
import React from "react";
import { Slider } from "@/components/ui/slider";
import { RotateCcw } from "lucide-react";

interface RotateTabProps {
  rotation: number;
  onRotationChange: (value: number) => void;
}

const RotateTab: React.FC<RotateTabProps> = ({ rotation, onRotationChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <RotateCcw className="h-4 w-4 text-gray-500 mr-2" />
        <Slider
          value={[rotation]}
          min={0}
          max={360}
          step={5}
          className="flex-1"
          onValueChange={(value) => onRotationChange(value[0])}
        />
        <span className="ml-2 text-sm text-gray-500 w-8 text-right">
          {rotation}°
        </span>
      </div>
      <p className="text-xs text-gray-500 text-center">
        Ajuste o controle deslizante para rotacionar sua imagem
      </p>
    </div>
  );
};

export default RotateTab;
