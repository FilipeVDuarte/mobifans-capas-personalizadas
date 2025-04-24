
import React, { useRef } from "react";
import { useCaseCustomizer } from "../context/CaseCustomizerContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import html2canvas from "html2canvas";

const ExportDesign: React.FC = () => {
  const { 
    goToPreviousStep,
    selectedModel,
    updateLastInteraction,
  } = useCaseCustomizer();
  
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    updateLastInteraction();
    
    if (!previewRef.current) return;
    
    try {
      // Find the case preview element within the preview container
      const caseElement = previewRef.current.querySelector(".case-preview-downloadable");
      
      if (!caseElement) {
        console.error("Case preview element not found");
        return;
      }
      
      const canvas = await html2canvas(caseElement as HTMLElement, {
        backgroundColor: null,
        useCORS: true,
        scale: 2, // Higher resolution
      });
      
      // Create download link
      const link = document.createElement("a");
      link.download = `mobifans-case-${selectedModel?.model || "custom"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto px-4 py-8">
      <div className="w-full flex justify-start mb-8">
        <button 
          onClick={() => {
            updateLastInteraction();
            goToPreviousStep();
          }}
          className="flex items-center text-[#4161c3]"
        >
          <ArrowLeft className="mr-2" />
          <span className="text-lg">Voltar</span>
        </button>
      </div>

      <h1 className="text-3xl font-bold text-[#4161c3] mb-8 text-center">
        Sua capa personalizada está pronta!
      </h1>
      
      <div className="mb-8 w-full max-w-md" ref={previewRef}>
        {/* This div will contain the preview from PreviewPane component */}
      </div>
      
      <Button
        onClick={handleDownload}
        className="bg-[#4161c3] hover:bg-[#3451a3] flex items-center px-8 py-6 text-lg"
      >
        <Download className="mr-2" />
        Baixar imagem
      </Button>
      
      <p className="mt-6 text-gray-600 text-center">
        Baixe sua imagem e entre em contato conosco para solicitar sua capa personalizada.
      </p>
    </div>
  );
};

export default ExportDesign;
