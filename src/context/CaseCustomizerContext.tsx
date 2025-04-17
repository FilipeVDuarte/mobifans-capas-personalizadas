
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the phone models available for customization
export interface PhoneModel {
  id: string;
  brand: string;
  model: string;
  image: string;
  dimensions: {
    width: number;
    height: number;
  };
}

// Define the context state interface
interface CaseCustomizerState {
  currentStep: number;
  selectedModel: PhoneModel | null;
  uploadedImage: string | null;
  imagePosition: { x: number; y: number };
  imageScale: number;
  imageRotation: number;
  setCurrentStep: (step: number) => void;
  setSelectedModel: (model: PhoneModel | null) => void;
  setUploadedImage: (imageUrl: string | null) => void;
  setImagePosition: (position: { x: number; y: number }) => void;
  setImageScale: (scale: number) => void;
  setImageRotation: (rotation: number) => void;
  isCheckoutStep: boolean;
}

// Create the context with default values
const CaseCustomizerContext = createContext<CaseCustomizerState | undefined>(undefined);

// Context provider component
export const CaseCustomizerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedModel, setSelectedModel] = useState<PhoneModel | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  
  // Determine if we're in the checkout step (step 3)
  const isCheckoutStep = currentStep === 3;

  const value = {
    currentStep,
    selectedModel,
    uploadedImage,
    imagePosition,
    imageScale,
    imageRotation,
    setCurrentStep,
    setSelectedModel,
    setUploadedImage,
    setImagePosition,
    setImageScale,
    setImageRotation,
    isCheckoutStep
  };

  return (
    <CaseCustomizerContext.Provider value={value}>
      {children}
    </CaseCustomizerContext.Provider>
  );
};

// Custom hook for using the context
export const useCaseCustomizer = () => {
  const context = useContext(CaseCustomizerContext);
  if (context === undefined) {
    throw new Error('useCaseCustomizer must be used within a CaseCustomizerProvider');
  }
  return context;
};
