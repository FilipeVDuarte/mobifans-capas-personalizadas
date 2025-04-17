
import React from "react";
import { CaseCustomizerProvider, useCaseCustomizer } from "../context/CaseCustomizerContext";
import StepNavigation from "./StepNavigation";
import ProductSelector from "./steps/ProductSelector";
import PhotoUploader from "./steps/PhotoUploader";
import DesignEditor from "./steps/DesignEditor";
import PreviewPane from "./PreviewPane";
import ControlPanel from "./ControlPanel";
import Header from "./Header";

const CaseCustomizerContent: React.FC = () => {
  const { currentStep } = useCaseCustomizer();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Header />
      <StepNavigation />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Central preview pane */}
        <div className="flex-1 flex items-center justify-center overflow-hidden p-6">
          <PreviewPane />
        </div>
        
        {/* Right control panel */}
        <ControlPanel>
          {currentStep === 0 && <ProductSelector />}
          {currentStep === 1 && <PhotoUploader />}
          {currentStep === 2 && <DesignEditor />}
        </ControlPanel>
      </div>
    </div>
  );
};

const CaseCustomizer: React.FC = () => {
  return (
    <CaseCustomizerProvider>
      <CaseCustomizerContent />
    </CaseCustomizerProvider>
  );
};

export default CaseCustomizer;
