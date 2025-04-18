
import React from "react";
import { Button } from "@/components/ui/button";
import { Move } from "lucide-react";

/**
 * Props do componente PositionTab
 * @param onPositionChange - Função chamada quando a posição é alterada
 */
interface PositionTabProps {
  onPositionChange: (change: { x: number; y: number }) => void;
}

/**
 * Componente que permite ajustar a posição da imagem
 * Fornece controles para mover a imagem em todas as direções
 */
const PositionTab: React.FC<PositionTabProps> = ({ onPositionChange }) => {
  return (
    <div className="space-y-4">
      {/* Grade de botões de controle de posição */}
      <div className="grid grid-cols-3 gap-2">
        {/* Botão para mover para cima */}
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onPositionChange({ x: 0, y: -10 })}
        >
          Cima
        </Button>
        <div></div>
        {/* Botão para mover para baixo */}
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onPositionChange({ x: 0, y: 10 })}
        >
          Baixo
        </Button>
        
        {/* Botão para mover para esquerda */}
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onPositionChange({ x: -10, y: 0 })}
        >
          Esquerda
        </Button>
        
        {/* Ícone central indicativo */}
        <div className="flex items-center justify-center">
          <Move className="h-5 w-5 text-gray-400" />
        </div>
        
        {/* Botão para mover para direita */}
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onPositionChange({ x: 10, y: 0 })}
        >
          Direita
        </Button>
      </div>
      
      {/* Texto de instrução */}
      <p className="text-xs text-gray-500 text-center">
        Use os botões para posicionar sua imagem na capa
      </p>
    </div>
  );
};

export default PositionTab;
