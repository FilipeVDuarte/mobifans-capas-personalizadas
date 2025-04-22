
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

// Define text styling options
export interface TextStyle {
  content: string;
  font: string;
  color: string;
  size: number;
  position: { x: number; y: number };
}

// Define the context state interface
interface CaseCustomizerState {
  currentStep: number;
  selectedModel: PhoneModel | null;
  uploadedImage: string | null;
  imagePosition: { x: number; y: number };
  imageScale: number;
  imageRotation: number;
  isDraggingImage: boolean;
  setDraggingImage: (isDragging: boolean) => void;
  setCurrentStep: (step: number) => void;
  setSelectedModel: (model: PhoneModel | null) => void;
  setUploadedImage: (imageUrl: string | null) => void;
  setImagePosition: (position: { x: number; y: number }) => void;
  setImageScale: (scale: number) => void;
  setImageRotation: (rotation: number) => void;
  isCheckoutStep: boolean;
  // New solid background color
  backgroundColor: string | null;
  setBackgroundColor: (color: string | null) => void;
  // Text customization
  customText: TextStyle | null;
  setCustomText: (text: TextStyle | null) => void;
  availableFonts: string[];
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
  const [isDraggingImage, setDraggingImage] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState<string | null>(null);
  const [customText, setCustomText] = useState<TextStyle | null>(null);
  
  // Available fonts for text customization
  const availableFonts = [
    'Arial, sans-serif',
    'Georgia, serif',
    'Verdana, sans-serif',
    'Courier New, monospace',
    'Impact, Charcoal, sans-serif'
  ];
  
  // Determine if we're in the checkout step (step 3)
  const isCheckoutStep = currentStep === 3;

  const value = {
    currentStep,
    selectedModel,
    uploadedImage,
    imagePosition,
    imageScale,
    imageRotation,
    isDraggingImage,
    setDraggingImage,
    setCurrentStep,
    setSelectedModel,
    setUploadedImage,
    setImagePosition,
    setImageScale,
    setImageRotation,
    isCheckoutStep,
    backgroundColor,
    setBackgroundColor,
    customText,
    setCustomText,
    availableFonts
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
