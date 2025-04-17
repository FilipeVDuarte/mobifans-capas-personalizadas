
import React from 'react';

// This component provides placeholder phone outlines for demo purposes
// In a production environment, these would be replaced with actual phone model images

export const PhonePlaceholder: React.FC<{
  brand: string;
  width: number;
  height: number;
}> = ({ brand, width, height }) => {
  // Different placeholder styles based on the brand
  const isApple = brand === "Apple";
  const isSamsung = brand === "Samsung";
  const isGoogle = brand === "Google";
  const isOnePlus = brand === "OnePlus";
  
  return (
    <div 
      className="relative bg-gray-200 rounded-[32px] border-4 border-gray-300 shadow-lg"
      style={{
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      {/* Screen */}
      <div className="absolute inset-1 bg-black rounded-[28px]">
        {/* Dynamic notch for iPhone models */}
        {isApple && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10 border border-gray-700"></div>
        )}
        
        {/* Camera bumps based on brand */}
        {isApple && (
          <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-gray-800 grid grid-cols-2 p-1">
            <div className="w-3 h-3 bg-gray-700 rounded-full m-0.5"></div>
            <div className="w-3 h-3 bg-gray-700 rounded-full m-0.5"></div>
            <div className="w-3 h-3 bg-gray-700 rounded-full m-0.5"></div>
          </div>
        )}
        
        {isSamsung && (
          <div className="absolute top-3 right-3 w-8 h-20 rounded-lg bg-gray-800 flex flex-col p-1 items-center justify-around">
            <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
          </div>
        )}
        
        {isGoogle && (
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-16 h-5 rounded-lg bg-gray-800 flex justify-around items-center p-0.5">
            <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
          </div>
        )}
        
        {isOnePlus && (
          <div className="absolute top-3 left-3 w-20 h-6 rounded-lg bg-gray-800 flex justify-around items-center p-1">
            <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
          </div>
        )}
        
        {/* Center dot for punch-hole cameras (non-Apple) */}
        {!isApple && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full"></div>
        )}
      </div>
    </div>
  );
};
