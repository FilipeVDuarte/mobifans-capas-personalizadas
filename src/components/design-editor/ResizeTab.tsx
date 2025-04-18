
import React from "react";
import { Slider } from "@/components/ui/slider";
import { ZoomIn } from "lucide-react";

/**
 * Props do componente ResizeTab
 * @param scale - Valor atual da escala da imagem
 * @param onScaleChange - Função chamada quando a escala é alterada
 */
interface ResizeTabProps {
  scale: number;
  onScaleChange: (value: number) => void;
}

/**
 * Componente que permite ajustar o tamanho da imagem
 * Usa um slider para controlar a escala de 50% a 150%
 */
const ResizeTab: React.FC<ResizeTabProps> = ({ scale, onScaleChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {/* Controle deslizante de escala */}
        <div className="flex items-center">
          <ZoomIn className="h-4 w-4 text-gray-500 mr-2" />
          <Slider
            value={[scale * 100]}
            min={50}
            max={150}
            step={5}
            className="flex-1"
            onValueChange={(value) => onScaleChange(value[0] / 100)}
          />
          {/* Exibição do valor atual da escala */}
          <span className="ml-2 text-sm text-gray-500 w-8 text-right">
            {Math.round(scale * 100)}%
          </span>
        </div>
      </div>
      
      {/* Texto de instrução */}
      <p className="text-xs text-gray-500 text-center">
        Ajuste o controle deslizante para redimensionar sua imagem
      </p>
    </div>
  );
};

export default ResizeTab;
