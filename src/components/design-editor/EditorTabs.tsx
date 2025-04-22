
import React from "react";

/**
 * Este componente foi substituído por uma versão integrada no DesignEditor.tsx
 * Mantido apenas como referência para compatibilidade com código legado
 */
interface EditorTabsProps {
  activeTab: "position" | "resize" | "rotate";
  onTabChange: (tab: "position" | "resize" | "rotate") => void;
  isMobile?: boolean;
}

const EditorTabs: React.FC<EditorTabsProps> = ({ activeTab, onTabChange, isMobile = false }) => {
  // Implementação vazia já que o componente foi integrado ao DesignEditor
  return null;
};

export default EditorTabs;
