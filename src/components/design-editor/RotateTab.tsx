
import React from "react";
import { Slider } from "@/components/ui/slider";
import { RotateCcw } from "lucide-react";

/**
 * Props do componente RotateTab
 * @param rotation - Valor atual da rotação em graus
 * @param onRotationChange - Função chamada quando a rotação é alterada
 * @param isMobile - Indica se o componente está sendo renderizado em um dispositivo móvel
 */
interface RotateTabProps {
  rotation: number;
  onRotationChange: (value: number) => void;
  isMobile?: boolean;
}

/**
 * Componente que permite ajustar a rotação da imagem
 * Usa um slider para controlar a rotação de 0 a 360 graus
 */
const RotateTab: React.FC<RotateTabProps> = ({ rotation, onRotationChange, isMobile = false }) => {
  return (
    <div className="space-y-3">
      {/* Controle deslizante de rotação */}
      <div className="flex items-center">
        <RotateCcw className={isMobile ? "h-3 w-3 text-gray-500 mr-1" : "h-4 w-4 text-gray-500 mr-2"} />
        <Slider
          value={[rotation]}
          min={0}
          max={360}
          step={5}
          className="flex-1"
          onValueChange={(value) => onRotationChange(value[0])}
        />
        {/* Exibição do valor atual da rotação */}
        <span className={isMobile ? "ml-1 text-xs text-gray-500 w-6 text-right" : "ml-2 text-sm text-gray-500 w-8 text-right"}>
          {rotation}°
        </span>
      </div>
      
      {/* Texto de instrução adaptativo */}
      <p className={isMobile ? "text-[10px] text-gray-500 text-center" : "text-xs text-gray-500 text-center"}>
        Ajuste o controle deslizante para rotacionar sua imagem
      </p>
    </div>
  );
};

export default RotateTab;
