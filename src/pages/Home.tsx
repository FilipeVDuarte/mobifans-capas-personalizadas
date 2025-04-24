
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Smartphone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCaseCustomizer } from "@/context/CaseCustomizerContext";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { updateLastInteraction } = useCaseCustomizer();

  useEffect(() => {
    updateLastInteraction();
  }, []);

  const handleStartCustomization = () => {
    updateLastInteraction();
    navigate("/personalizar");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F1F0FB] to-white flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md">
        <div className="bg-[#e0e8ff] p-8 mb-8 rounded-3xl text-[#4161c3]">
          <h1 className={`font-bold mb-6 ${isMobile ? "text-4xl" : "text-5xl"}`}>
            Capas Personalizadas
          </h1>
          <h1 className={`font-bold mb-6 ${isMobile ? "text-4xl" : "text-5xl"}`}>
            Mobifans
          </h1>
        </div>
        
        <p className={`text-gray-600 mb-8 ${isMobile ? "text-base" : "text-lg"}`}>
          Crie sua própria capa única e personalizada.
          Escolha seu modelo, faça upload de uma foto
          e transforme seu dispositivo em algo especial.
        </p>
        
        <Button 
          onClick={handleStartCustomization} 
          className="w-full bg-[#4161c3] hover:bg-[#3451a3] transition-colors"
          size={isMobile ? "default" : "lg"}
        >
          Começar
        </Button>
      </div>
    </div>
  );
};

export default Home;
