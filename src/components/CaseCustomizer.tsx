
import React from "react";
import { CaseCustomizerProvider, useCaseCustomizer } from "../context/CaseCustomizerContext";
import StepNavigation from "./StepNavigation";
import ProductSelector from "./steps/ProductSelector";
import DesignEditor from "./steps/DesignEditor";
import PreviewPane from "./PreviewPane";
import ControlPanel from "./ControlPanel";
import Header from "./Header";
import StatusBar from "./StatusBar";
import { useIsMobile } from "@/hooks/use-mobile";

const CaseCustomizerContent: React.FC = () => {
  const { currentStep } = useCaseCustomizer();
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden">
      <Header />

      {/* Centered step navigation */}
      <div className="flex justify-center">
        <div className="max-w-4xl w-full">
          <StepNavigation />
        </div>
      </div>

      <main className="flex flex-1 w-full overflow-hidden">
        {/* Preview section - Left side */}
        <section className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
          <div className="max-w-[600px] w-full h-full flex items-center justify-center">
            <PreviewPane />
          </div>
        </section>

        {/* Fixed control panel - Right side */}
        <aside className="w-[420px] fixed right-0 top-0 bottom-0 bg-white shadow-xl z-50 flex flex-col">
          <div className="h-[60px]" /> {/* Header space */}
          <div className="flex-1 overflow-y-auto">
            {currentStep === 0 && <ProductSelector />}
            {currentStep === 1 && <DesignEditor />}
          </div>
          <StatusBar />
        </aside>
      </main>
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
