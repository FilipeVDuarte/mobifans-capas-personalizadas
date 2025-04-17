
import React from "react";
import { Button } from "@/components/ui/button";
import { Move } from "lucide-react";
import { useCaseCustomizer } from "../../context/CaseCustomizerContext";

interface PositionTabProps {
  onPositionChange: (change: { x: number; y: number }) => void;
}

const PositionTab: React.FC<PositionTabProps> = ({ onPositionChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onPositionChange({ x: 0, y: -10 })}
        >
          Cima
        </Button>
        <div></div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onPositionChange({ x: 0, y: 10 })}
        >
          Baixo
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onPositionChange({ x: -10, y: 0 })}
        >
          Esquerda
        </Button>
        <div className="flex items-center justify-center">
          <Move className="h-5 w-5 text-gray-400" />
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onPositionChange({ x: 10, y: 0 })}
        >
          Direita
        </Button>
      </div>
      <p className="text-xs text-gray-500 text-center">
        Use os botões para posicionar sua imagem na capa
      </p>
    </div>
  );
};

export default PositionTab;
