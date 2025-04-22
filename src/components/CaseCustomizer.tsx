
import React from "react";
// Importa o provider/contexto principal da personalização
import { CaseCustomizerProvider, useCaseCustomizer } from "../context/CaseCustomizerContext";
// Componentes das etapas do wizard de personalização
import StepNavigation from "./StepNavigation";
import ProductSelector from "./steps/ProductSelector";
import PhotoUploader from "./steps/PhotoUploader";
import DesignEditor from "./steps/DesignEditor";
import Checkout from "./steps/Checkout";
import PreviewPane from "./PreviewPane";
import ControlPanel from "./ControlPanel";
import Header from "./Header";
import StatusBar from "./StatusBar";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Componente que compõe a interface do personalizador.
 * Faz um layout vertical mobile-first, responsivo para desktop.
 */
const CaseCustomizerContent: React.FC = () => {
  // Obtém etapa atual e se está na etapa de checkout
  const { currentStep, isCheckoutStep } = useCaseCustomizer();
  // Detecta se está em um dispositivo móvel
  const isMobile = useIsMobile();

  /* 
   * Para dispositivos mobile:
   * - Stack vertical
   * - Preview na parte superior
   * - Controle/tab embaixo no painel
   *
   * Para desktop:
   * - Preview à esquerda (grande)
   * - Painel de controles à direita
   */
  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden">
      {/* Cabeçalho fixo no topo (tira o scroll no mobile, mantém sticky UX) */}
      <Header />

      {/* Navegação por etapas tipo "wizard progress bar" */}
      <StepNavigation />

      {/* Área principal: adapta entre mobile/desktop (coluna x linha) */}
      <main className={`flex flex-1 w-full overflow-hidden 
        ${isMobile ? "flex-col-reverse" : "flex-row"}`}>

        {/* 
          PreviewPane: 
          - No mobile, ocupa topo (menos espaço)
          - No desktop, ocupa lateral esquerda (maior área)
        */}
        <section
          className={`flex items-center justify-center transition-all duration-300
            ${isMobile ? "w-full h-[38vh] p-2 z-0 bg-white/70 shadow-md rounded-b-3xl" 
            : "flex-1 p-8 max-w-[34vw] min-w-[320px] bg-white/80 shadow-md rounded-l-3xl"}`}
        >
          {/* Componente de preview da capa */}
          <PreviewPane />
        </section>

        {/* 
          Painel de controle: 
          - No mobile, fica na parte inferior e ocupa mais da metade da tela
          - No desktop, lateral direita fixa e dimensionada
        */}
        <aside
          className={
            isMobile
              ? "w-full h-[54vh] flex-shrink-0 z-10 bg-background/95 rounded-t-3xl shadow-lg"
              : "flex-[1.2] min-w-[360px] max-w-[36vw] h-full bg-background/95 rounded-r-3xl shadow-xl"
          }
        >
          {/* Oculta scrollbar vertical, aplica padding e animação */}
          <ControlPanel isMobile={isMobile}>
            {/* Renderização condicional por etapa */}
            {currentStep === 0 && <ProductSelector />}
            {currentStep === 1 && <PhotoUploader />}
            {currentStep === 2 && <DesignEditor />}
            {currentStep === 3 && <Checkout />}
          </ControlPanel>
        </aside>
      </main>

      {/* Barra de status fixa no rodapé (progresso/página) */}
      <StatusBar />
    </div>
  );
};

// Wrapper para prover contexto
const CaseCustomizer: React.FC = () => {
  return (
    <CaseCustomizerProvider>
      <CaseCustomizerContent />
    </CaseCustomizerProvider>
  );
};

export default CaseCustomizer;

