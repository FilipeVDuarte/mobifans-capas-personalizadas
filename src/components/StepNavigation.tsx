
import React from "react";
import { useCaseCustomizer } from "../context/CaseCustomizerContext";
import { cn } from "@/lib/utils";
import { CheckCircle2, Smartphone, PenTool, Download } from "lucide-react";

const steps = [
  { 
    name: "Produto", 
    description: "Selecione seu modelo",
    icon: Smartphone,
    type: "brand"
  },
  { 
    name: "Design", 
    description: "Personalize sua capa",
    icon: PenTool,
    type: "design"
  },
  {
    name: "Exportar",
    description: "Como quer nos enviar?",
    icon: Download,
    type: "export"
  }
];

const StepNavigation: React.FC = () => {
  const { currentStepType, goToStep, updateLastInteraction } = useCaseCustomizer();
  
  // Map step types to index
  const currentStepIndex = steps.findIndex(step => step.type === currentStepType);
  
  // Calculate which steps have been completed
  const isStepCompleted = (index: number) => {
    if (currentStepType === 'export') return index < 2;
    if (currentStepType === 'design') return index < 1;
    return false;
  };

  return (
    <div className="py-4 px-6 border-b overflow-x-auto">
      <ol className="flex items-center w-full min-w-max">
        {steps.map((step, index) => (
          <li 
            key={step.name} 
            className={cn(
              "flex items-center",
              index !== steps.length - 1 && "after:content-[''] after:w-12 after:h-1 after:border-b after:border-gray-200 after:mx-3 sm:after:mx-6"
            )}
          >
            <div className="flex flex-col items-center">
              <button 
                onClick={() => {
                  updateLastInteraction();
                  if (index <= currentStepIndex || isStepCompleted(index)) {
                    goToStep(step.type as any);
                  }
                }}
                disabled={index > currentStepIndex && !isStepCompleted(index)}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full text-sm transition-colors duration-200",
                  currentStepType === step.type
                    ? "bg-[#4161c3] text-white" 
                    : isStepCompleted(index)
                      ? "bg-green-100 text-green-600" 
                      : "bg-gray-100 text-gray-400"
                )}
              >
                {isStepCompleted(index) ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </button>
              
              <span className={cn(
                "mt-2 text-sm font-medium whitespace-nowrap",
                currentStepType === step.type
                  ? "text-[#4161c3]" 
                  : isStepCompleted(index)
                    ? "text-gray-900" 
                    : "text-gray-500"
              )}>
                {step.name}
              </span>
              
              <span className="text-xs text-gray-500 hidden sm:block whitespace-nowrap">
                {step.description}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default StepNavigation;
