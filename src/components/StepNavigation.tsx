
import React from "react";
import { useCaseCustomizer } from "../context/CaseCustomizerContext";
import { cn } from "@/lib/utils";
import { CheckCircle2, Smartphone, Image, PenTool, ShoppingCart } from "lucide-react";

const steps = [
  { 
    name: "Products", 
    description: "Select your phone model",
    icon: Smartphone
  },
  { 
    name: "Photos", 
    description: "Upload your image",
    icon: Image
  },
  { 
    name: "Design", 
    description: "Customize your case",
    icon: PenTool
  },
  { 
    name: "Checkout", 
    description: "Complete your order",
    icon: ShoppingCart
  }
];

const StepNavigation: React.FC = () => {
  const { currentStep, setCurrentStep } = useCaseCustomizer();

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
                  // Only allow navigating to steps that are available
                  if (index <= currentStep) {
                    setCurrentStep(index)
                  }
                }}
                disabled={index > currentStep}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full text-sm transition-colors duration-200",
                  currentStep === index 
                    ? "bg-primary text-primary-foreground" 
                    : index < currentStep 
                      ? "bg-green-100 text-green-600" 
                      : "bg-gray-100 text-gray-400"
                )}
              >
                {index < currentStep ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </button>
              
              <span className={cn(
                "mt-2 text-sm font-medium whitespace-nowrap",
                currentStep === index 
                  ? "text-primary" 
                  : index < currentStep 
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
