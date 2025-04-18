
import React, { useState } from "react";
import { useCaseCustomizer } from "../../context/CaseCustomizerContext";
import EditorTabs from "../design-editor/EditorTabs";
import PositionTab from "../design-editor/PositionTab";
import ResizeTab from "../design-editor/ResizeTab";
import RotateTab from "../design-editor/RotateTab";

/**
 * Componente principal do editor de design da capa
 * Gerencia as diferentes abas de edição (posição, tamanho e rotação)
 */
const DesignEditor = () => {
  // Hook de contexto que fornece estado e funções para customização da capa
  const { imageScale, setImageScale, imageRotation, setImageRotation, imagePosition, setImagePosition } = useCaseCustomizer();
  
  // Estado local para controlar qual aba está ativa
  const [activeTab, setActiveTab] = useState<"position" | "resize" | "rotate">("position");

  /**
   * Função que atualiza a posição da imagem baseada nas mudanças de x e y
   */
  const handlePositionChange = (change: { x: number; y: number }) => {
    // Criando um novo objeto de posição diretamente em vez de usar uma função de atualização
    setImagePosition({
      x: imagePosition.x + change.x,
      y: imagePosition.y + change.y,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Ajuste sua imagem</h2>
      
      {/* Componente de navegação entre as abas */}
      <EditorTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Renderização condicional das abas baseada na aba ativa */}
      {activeTab === "position" && (
        <PositionTab onPositionChange={handlePositionChange} />
      )}
      
      {activeTab === "resize" && (
        <ResizeTab scale={imageScale} onScaleChange={setImageScale} />
      )}
      
      {activeTab === "rotate" && (
        <RotateTab rotation={imageRotation} onRotationChange={setImageRotation} />
      )}
    </div>
  );
};

export default DesignEditor;
