
import React from "react";
import { CaseCustomizerProvider, useCaseCustomizer } from "../context/CaseCustomizerContext";
import StepNavigation from "./StepNavigation";
import ProductSelector from "./steps/ProductSelector";
import PhotoUploader from "./steps/PhotoUploader";
import DesignEditor from "./steps/DesignEditor";
import Checkout from "./steps/Checkout";
import PreviewPane from "./PreviewPane";
import ControlPanel from "./ControlPanel";
import Header from "./Header";
import StatusBar from "./StatusBar";
import { useIsMobile } from "@/hooks/use-mobile";

const CaseCustomizerContent: React.FC = () => {
  const { currentStep, isCheckoutStep } = useCaseCustomizer();
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Header />
      <StepNavigation />
      
      {/* Layout flexível que se adapta entre mobile e desktop */}
      <div className={`flex flex-1 overflow-hidden ${isMobile ? 'flex-col' : 'flex-row'}`}>
        {/* Container da Preview com estilos responsivos */}
        <div className={`flex items-center justify-center overflow-hidden
          ${isMobile ? 'h-[40vh] p-2' : 'flex-1 p-6'}`}>
          <PreviewPane />
        </div>
        
        {/* Painel de controle lateral (desktop) ou inferior (mobile) */}
        <ControlPanel isMobile={isMobile}>
          {currentStep === 0 && <ProductSelector />}
          {currentStep === 1 && <PhotoUploader />}
          {currentStep === 2 && <DesignEditor />}
          {currentStep === 3 && <Checkout />}
        </ControlPanel>
      </div>
      
      <StatusBar />
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
