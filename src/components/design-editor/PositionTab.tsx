
import React from "react";

/**
 * Este componente foi substituído pela funcionalidade de arrastar diretamente na visualização
 * Mantido apenas como referência para compatibilidade com código legado
 */
interface PositionTabProps {
  onPositionChange: (change: { x: number; y: number }) => void;
  isMobile?: boolean;
}

const PositionTab: React.FC<PositionTabProps> = () => {
  // Implementação vazia já que o componente foi substituído
  return null;
};

export default PositionTab;
