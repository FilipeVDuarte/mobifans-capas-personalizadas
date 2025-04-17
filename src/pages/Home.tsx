
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Smartphone } from "lucide-react";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleStartCustomization = () => {
    navigate("/personalizar");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F1F0FB] to-white flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold text-primary mb-6">
          Mobifans - Capa Personalizada
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Crie sua própria capa de celular única e personalizada. 
          Escolha seu modelo, faça upload de uma foto e transforme seu 
          dispositivo em algo especial.
        </p>
        
        <Button 
          onClick={handleStartCustomization} 
          className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors"
          size="lg"
        >
          <Smartphone className="mr-2" /> Começar Personalização
        </Button>
      </div>
    </div>
  );
};

export default Home;
