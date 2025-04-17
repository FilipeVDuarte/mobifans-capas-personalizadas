
import React, { useState } from "react";
import { useCaseCustomizer } from "../../context/CaseCustomizerContext";
import EditorTabs from "../design-editor/EditorTabs";
import PositionTab from "../design-editor/PositionTab";
import ResizeTab from "../design-editor/ResizeTab";
import RotateTab from "../design-editor/RotateTab";

const DesignEditor = () => {
  const { imageScale, setImageScale, imageRotation, setImageRotation, setImagePosition } = useCaseCustomizer();
  const [activeTab, setActiveTab] = useState<"position" | "resize" | "rotate">("position");

  const handlePositionChange = (change: { x: number; y: number }) => {
    setImagePosition((prev) => ({
      x: prev.x + change.x,
      y: prev.y + change.y,
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Ajuste sua imagem</h2>
      <EditorTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
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
