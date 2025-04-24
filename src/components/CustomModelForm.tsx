
import React, { useState } from "react";
import { useCaseCustomizer } from "../context/CaseCustomizerContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const CustomModelForm: React.FC = () => {
  const { 
    customModelRequest,
    setCustomModelRequest,
    goToPreviousStep,
    resetSession,
    updateLastInteraction
  } = useCaseCustomizer();
  
  const [deviceModel, setDeviceModel] = useState(customModelRequest.deviceModel);
  const [email, setEmail] = useState(customModelRequest.email);
  const [notifyWhenAvailable, setNotifyWhenAvailable] = useState(customModelRequest.notifyWhenAvailable);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateLastInteraction();
    
    if (!deviceModel.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, informe qual é o seu smartphone",
        variant: "destructive"
      });
      return;
    }
    
    if (notifyWhenAvailable && !email.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, informe seu email para notificação",
        variant: "destructive"
      });
      return;
    }
    
    const formData = {
      deviceModel,
      email,
      notifyWhenAvailable
    };
    
    setCustomModelRequest(formData);
    
    // Simulate saving the data
    console.log("Custom device request:", formData);
    
    toast({
      title: "Solicitação enviada",
      description: "Entraremos em contato quando tivermos este modelo disponível."
    });
    
    // Go back to home after successful submission
    setTimeout(() => {
      resetSession();
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <button 
        onClick={() => {
          updateLastInteraction();
          goToPreviousStep();
        }}
        className="flex items-center text-[#4161c3] mb-8"
      >
        <ArrowLeft className="mr-2" />
        <span className="text-lg">Voltar</span>
      </button>

      <h1 className="text-5xl font-bold text-[#4161c3] mb-10 text-center">
        Preencha o formulário
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-xl text-center">Qual o seu smartphone</h3>
          <Input 
            value={deviceModel} 
            onChange={(e) => setDeviceModel(e.target.value)}
            placeholder="Escreva aqui"
            className="text-center h-12 text-lg"
          />
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <Switch 
            id="notify" 
            checked={notifyWhenAvailable}
            onCheckedChange={setNotifyWhenAvailable}
            className="data-[state=checked]:bg-[#4161c3]"
          />
          <label htmlFor="notify" className="text-lg">
            Quer receber um email quando tivermos esse modelo?
          </label>
        </div>
        
        {notifyWhenAvailable && (
          <div className="space-y-2">
            <h3 className="text-xl text-center">Email</h3>
            <Input 
              type="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Coloque o seu melhor email"
              className="text-center h-12 text-lg"
            />
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full bg-[#4161c3] hover:bg-[#3451a3] h-12 text-lg mt-8"
        >
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default CustomModelForm;
