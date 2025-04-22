
import React from "react";
import { Button } from "@/components/ui/button";
import { Move } from "lucide-react";

/**
 * Props do componente PositionTab
 * @param onPositionChange - Função chamada quando a posição é alterada
 * @param isMobile - Indica se o componente está sendo renderizado em um dispositivo móvel
 */
interface PositionTabProps {
  onPositionChange: (change: { x: number; y: number }) => void;
  isMobile?: boolean;
}

/**
 * Componente que permite ajustar a posição da imagem
 * Fornece controles para mover a imagem em todas as direções
 */
const PositionTab: React.FC<PositionTabProps> = ({ onPositionChange, isMobile = false }) => {
  // Ajusta o tamanho do deslocamento baseado no dispositivo
  const moveOffset = isMobile ? 5 : 10;

  return (
    <div className="space-y-3">
      {/* Grade de botões de controle de posição com tamanhos responsivos */}
      <div className="grid grid-cols-3 gap-2">
        {/* Botão para mover para cima */}
        <Button 
          variant="outline" 
          size={isMobile ? "sm" : "default"}
          className={isMobile ? "text-xs py-1 px-2" : ""}
          onClick={() => onPositionChange({ x: 0, y: -moveOffset })}
        >
          Cima
        </Button>
        <div></div>
        {/* Botão para mover para baixo */}
        <Button 
          variant="outline" 
          size={isMobile ? "sm" : "default"}
          className={isMobile ? "text-xs py-1 px-2" : ""}
          onClick={() => onPositionChange({ x: 0, y: moveOffset })}
        >
          Baixo
        </Button>
        
        {/* Botão para mover para esquerda */}
        <Button 
          variant="outline" 
          size={isMobile ? "sm" : "default"}
          className={isMobile ? "text-xs py-1 px-2" : ""}
          onClick={() => onPositionChange({ x: -moveOffset, y: 0 })}
        >
          Esquerda
        </Button>
        
        {/* Ícone central indicativo */}
        <div className="flex items-center justify-center">
          <Move className={isMobile ? "h-4 w-4 text-gray-400" : "h-5 w-5 text-gray-400"} />
        </div>
        
        {/* Botão para mover para direita */}
        <Button 
          variant="outline" 
          size={isMobile ? "sm" : "default"}
          className={isMobile ? "text-xs py-1 px-2" : ""}
          onClick={() => onPositionChange({ x: moveOffset, y: 0 })}
        >
          Direita
        </Button>
      </div>
      
      {/* Texto de instrução adaptativo */}
      <p className={isMobile ? "text-[10px] text-gray-500 text-center" : "text-xs text-gray-500 text-center"}>
        Use os botões para posicionar sua imagem na capa
      </p>
    </div>
  );
};

export default PositionTab;
