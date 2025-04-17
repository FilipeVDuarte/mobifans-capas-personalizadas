
import React from "react";

interface EditorTabsProps {
  activeTab: "position" | "resize" | "rotate";
  onTabChange: (tab: "position" | "resize" | "rotate") => void;
}

const EditorTabs: React.FC<EditorTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b mb-4">
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
