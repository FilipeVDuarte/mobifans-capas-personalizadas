
import React from "react";
import { useCaseCustomizer } from "../context/CaseCustomizerContext";

const StatusBar: React.FC = () => {
  const { selectedModel, currentStep } = useCaseCustomizer();

  const getStatusText = () => {
    switch (currentStep) {
      case 0:
        return "Selecione seu modelo de celular";
      case 1:
        return "Faça upload da sua foto";
      case 2:
        return "Personalize seu design";
      default:
        return "Crie sua capa única";
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {getStatusText()}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
