
import React, { useEffect } from "react";
import { CaseCustomizerProvider, useCaseCustomizer, StepType } from "../context/CaseCustomizerContext";
import StepNavigation from "./StepNavigation";
import BrandSelector from "./BrandSelector";
import ModelSelector from "./ModelSelector";
import DesignTypeSelector from "./DesignTypeSelector";
import DesignEditor from "./steps/DesignEditor";
import ExportDesign from "./ExportDesign";
import CustomModelForm from "./CustomModelForm";
import PreviewPane from "./PreviewPane";
import Header from "./Header";
import StatusBar from "./StatusBar";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft } from "lucide-react"; 

const CaseCustomizerContent: React.FC = () => {
  const { 
    currentStepType, 
    goToPreviousStep,
    updateLastInteraction
  } = useCaseCustomizer();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Update interaction time when component mounts
    updateLastInteraction();
  }, []);

  const renderStepContent = () => {
    switch (currentStepType) {
      case 'brand':
        return <BrandSelector />;
      case 'model':
        return <ModelSelector />;
      case 'designType':
        return <DesignTypeSelector />;
      case 'design':
        return (
          <div className="flex flex-1 w-full overflow-hidden">
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
                <DesignEditor />
              </div>
              <StatusBar />
            </aside>
          </div>
        );
      case 'export':
        return (
          <div className="flex flex-1 w-full overflow-hidden">
            <section className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
              <div className="max-w-[600px] w-full h-full flex items-center justify-center">
                <PreviewPane />
              </div>
            </section>
            
            <aside className="w-[420px] fixed right-0 top-0 bottom-0 bg-white shadow-xl z-50 flex flex-col">
              <div className="h-[60px]" /> {/* Header space */}
              <div className="flex-1 overflow-y-auto p-6">
                <ExportDesign />
              </div>
              <StatusBar />
            </aside>
          </div>
        );
      case 'custom-model':
        return <CustomModelForm />;
      default:
        return <BrandSelector />;
    }
  };

  const showNavigation = ['design', 'export'].includes(currentStepType);

  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden">
      <Header />

      {showNavigation && (
        <div className="flex justify-center">
          <div className="max-w-4xl w-full">
            <StepNavigation />
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col w-full overflow-hidden">
        {renderStepContent()}
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
