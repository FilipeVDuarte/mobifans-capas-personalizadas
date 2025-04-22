
import React from "react";

/**
 * Props do componente EditorTabs
 * @param activeTab - Aba atualmente ativa
 * @param onTabChange - Função chamada quando uma aba é selecionada
 * @param isMobile - Indica se o componente está sendo renderizado em um dispositivo móvel
 */
interface EditorTabsProps {
  activeTab: "position" | "resize" | "rotate";
  onTabChange: (tab: "position" | "resize" | "rotate") => void;
  isMobile?: boolean;
}

/**
 * Componente que renderiza as abas de navegação do editor
 * Permite alternar entre as diferentes funcionalidades de edição
 */
const EditorTabs: React.FC<EditorTabsProps> = ({ activeTab, onTabChange, isMobile = false }) => {
  const tabClassName = (tab: string) => {
    const baseClassName = `${activeTab === tab
      ? "border-b-2 border-primary font-medium text-primary"
      : "text-gray-500 hover:text-gray-900"} transition-colors`;
      
    // Tamanhos adaptados para mobile/desktop
    return isMobile
      ? `${baseClassName} px-2 py-1 text-xs`
      : `${baseClassName} px-4 py-2 text-sm`;
  };

  return (
    <div className="flex border-b mb-3">
      {/* Botão da aba de posição */}
      <button
        onClick={() => onTabChange("position")}
        className={tabClassName("position")}
      >
        Posição
      </button>
      
      {/* Botão da aba de redimensionamento */}
      <button
        onClick={() => onTabChange("resize")}
        className={tabClassName("resize")}
      >
        Tamanho
      </button>
      
      {/* Botão da aba de rotação */}
      <button
        onClick={() => onTabChange("rotate")}
        className={tabClassName("rotate")}
      >
        Rotação
      </button>
    </div>
  );
};

export default EditorTabs;
