
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCaseCustomizer } from "@/context/CaseCustomizerContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { resetSession, updateLastInteraction } = useCaseCustomizer();
  
  const handleReturn = () => {
    updateLastInteraction();
    resetSession();
    navigate("/");
  };

  return (
    <header className="h-[60px] border-b flex items-center px-4 shadow-sm sticky top-0 bg-white z-10">
      <Button
        variant="ghost"
        onClick={handleReturn}
        className="flex items-center text-[#4161c3] hover:text-[#3451a3] hover:bg-[#f1f5ff]"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>
      
      <div className="flex-1 flex justify-center">
        <img
          src="/public/lovable-uploads/f3f4583e-0e89-4610-ac74-4239c2a2295b.png" 
          alt="Mobifans Logo"
          className="h-8"
        />
      </div>
      
      <div className="w-[70px]">
        {/* Empty div for spacing */}
      </div>
    </header>
  );
};

export default Header;
