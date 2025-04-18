
import React from "react";

/**
 * Props do componente EditorTabs
 * @param activeTab - Aba atualmente ativa
 * @param onTabChange - Função chamada quando uma aba é selecionada
 */
interface EditorTabsProps {
  activeTab: "position" | "resize" | "rotate";
  onTabChange: (tab: "position" | "resize" | "rotate") => void;
}

/**
 * Componente que renderiza as abas de navegação do editor
 * Permite alternar entre as diferentes funcionalidades de edição
 */
const EditorTabs: React.FC<EditorTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b mb-4">
      {/* Botão da aba de posição */}
      <button
        onClick={() => onTabChange("position")}
        className={`px-4 py-2 text-sm ${
          activeTab === "position"
            ? "border-b-2 border-primary font-medium text-primary"
            : "text-gray-500 hover:text-gray-900"
        }`}
      >
        Posição
      </button>
      
      {/* Botão da aba de redimensionamento */}
      <button
        onClick={() => onTabChange("resize")}
        className={`px-4 py-2 text-sm ${
          activeTab === "resize"
            ? "border-b-2 border-primary font-medium text-primary"
            : "text-gray-500 hover:text-gray-900"
        }`}
      >
        Tamanho
      </button>
      
      {/* Botão da aba de rotação */}
      <button
        onClick={() => onTabChange("rotate")}
        className={`px-4 py-2 text-sm ${
          activeTab === "rotate"
            ? "border-b-2 border-primary font-medium text-primary"
            : "text-gray-500 hover:text-gray-900"
        }`}
      >
        Rotação
      </button>
    </div>
  );
};

export default EditorTabs;
