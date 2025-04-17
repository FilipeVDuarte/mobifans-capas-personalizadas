
import React, { useRef } from "react";
import { useCaseCustomizer } from "../../context/CaseCustomizerContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Upload, Image } from "lucide-react";

const PhotoUploader: React.FC = () => {
  const { 
    setUploadedImage, 
    uploadedImage, 
    setCurrentStep 
  } = useCaseCustomizer();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleBack = () => {
    setCurrentStep(0);
  };
  
  const handleContinue = () => {
    if (uploadedImage) {
      setCurrentStep(2);
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <h2 className="text-lg font-semibold mb-4">Upload Your Photo</h2>
      
      {/* Upload area */}
      <div className="flex-1">
        {!uploadedImage ? (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center h-64 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={handleUploadClick}
          >
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 text-center mb-2">
              Click to upload an image or drag and drop
            </p>
            <p className="text-xs text-gray-400">
              PNG, JPG or WEBP (max 5MB)
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        ) : (
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-lg mb-3 relative bg-gray-100">
              <img 
                src={uploadedImage} 
                alt="Uploaded" 
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleUploadClick}
            >
              <Image className="mr-2 h-4 w-4" />
              Change Image
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        )}
      </div>
      
      {/* Navigation buttons */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Button 
          variant="outline"
          onClick={handleBack}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={handleContinue}
          disabled={!uploadedImage}
        >
          Continue
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PhotoUploader;
