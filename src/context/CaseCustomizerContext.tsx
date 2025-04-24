
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
  position: { x: number; y: number; rotation: number };
}

export type StepType = 'brand' | 'model' | 'designType' | 'design' | 'export' | 'custom-model';

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
  // New fields for navigation
  selectedBrand: string | null;
  setSelectedBrand: (brand: string | null) => void;
  stepHistory: StepType[];
  currentStepType: StepType;
  setCurrentStepType: (stepType: StepType) => void;
  goToPreviousStep: () => void;
  goToStep: (stepType: StepType) => void;
  designType: 'image' | 'solid' | null;
  setDesignType: (type: 'image' | 'solid' | null) => void;
  customModelRequest: {
    deviceModel: string;
    email: string;
    notifyWhenAvailable: boolean;
  };
  setCustomModelRequest: (request: {
    deviceModel: string;
    email: string;
    notifyWhenAvailable: boolean;
  }) => void;
  resetSession: () => void;
  lastInteractionTime: number;
  updateLastInteraction: () => void;
}

// Create the context with default values
const CaseCustomizerContext = createContext<CaseCustomizerState | undefined>(undefined);

// Context provider component
export const CaseCustomizerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedModel, setSelectedModel] = useState<PhoneModel | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const [isDraggingImage, setDraggingImage] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState<string | null>(null);
  const [customText, setCustomText] = useState<TextStyle | null>(null);
  const [designType, setDesignType] = useState<'image' | 'solid' | null>(null);
  const [currentStepType, setCurrentStepType] = useState<StepType>('brand');
  const [stepHistory, setStepHistory] = useState<StepType[]>(['brand']);
  const [lastInteractionTime, setLastInteractionTime] = useState<number>(Date.now());
  
  const [customModelRequest, setCustomModelRequest] = useState({
    deviceModel: '',
    email: '',
    notifyWhenAvailable: false
  });

  // Reset timer whenever there's interaction
  const updateLastInteraction = () => {
    setLastInteractionTime(Date.now());
  };

  // Available fonts for text customization
  const availableFonts = [
    'Arial, sans-serif',
    'Georgia, serif',
    'Verdana, sans-serif',
    'Courier New, monospace',
    'Impact, Charcoal, sans-serif'
  ];
  
  // Determine if we're in the checkout step (AGORA O DESIGN É O FINAL, ou seja, STEP=1)
  const isCheckoutStep = currentStep === 1;

  // Navigation between steps
  const goToStep = (stepType: StepType) => {
    setCurrentStepType(stepType);
    setStepHistory(prev => [...prev, stepType]);
  };

  const goToPreviousStep = () => {
    if (stepHistory.length > 1) {
      const newHistory = [...stepHistory];
      newHistory.pop(); // Remove current step
      const previousStep = newHistory[newHistory.length - 1];
      setCurrentStepType(previousStep);
      setStepHistory(newHistory);
    }
  };

  const resetSession = () => {
    setCurrentStep(0);
    setSelectedModel(null);
    setSelectedBrand(null);
    setUploadedImage(null);
    setImagePosition({ x: 0, y: 0 });
    setImageScale(1);
    setImageRotation(0);
    setDraggingImage(false);
    setBackgroundColor(null);
    setCustomText(null);
    setDesignType(null);
    setCurrentStepType('brand');
    setStepHistory(['brand']);
    setCustomModelRequest({
      deviceModel: '',
      email: '',
      notifyWhenAvailable: false
    });
    updateLastInteraction();
  };

  // Effect to handle inactivity
  useEffect(() => {
    const inactivityTimer = setInterval(() => {
      const now = Date.now();
      // Reset to home page after 5 minutes of inactivity
      if (now - lastInteractionTime > 5 * 60 * 1000) {
        resetSession();
      }
    }, 60000); // Check every minute

    // Setup event listeners to track user activity
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    const handleUserActivity = () => {
      updateLastInteraction();
    };

    activityEvents.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });

    return () => {
      clearInterval(inactivityTimer);
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [lastInteractionTime]);

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
    availableFonts,
    selectedBrand,
    setSelectedBrand,
    currentStepType,
    setCurrentStepType,
    stepHistory,
    goToPreviousStep,
    goToStep,
    designType,
    setDesignType,
    customModelRequest,
    setCustomModelRequest,
    resetSession,
    lastInteractionTime,
    updateLastInteraction
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
