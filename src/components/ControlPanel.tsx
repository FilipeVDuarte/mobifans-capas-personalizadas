
import React, { ReactNode } from "react";
import { ChevronRight, ChevronLeft, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ControlPanelProps {
  children: ReactNode;
  isMobile?: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ children, isMobile = false }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  
  // No modo mobile, o painel fica na parte inferior
  // No modo desktop, o painel fica na lateral direita
  const mobileClasses = isCollapsed 
    ? "h-12 border-t" 
    : "h-[60vh] border-t";
  
  const desktopClasses = isCollapsed 
    ? "w-12 border-l" 
    : "w-80 border-l";

  return (
    <div
      className={cn(
        "bg-white transition-all duration-300 ease-in-out relative",
        isMobile ? mobileClasses : desktopClasses
      )}
    >
      {/* Botão para expandir/colapsar com ícones diferentes para mobile/desktop */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "absolute bg-white border border-gray-200 rounded-full p-1 z-10",
          isMobile ? "-top-3 left-1/2 -translate-x-1/2" : "-left-3 top-20"
        )}
        aria-label={isCollapsed ? "Expandir painel" : "Colapsar painel"}
      >
        {isCollapsed ? (
          isMobile ? <ChevronUp size={16} /> : <ChevronLeft size={16} />
        ) : (
          isMobile ? <ChevronDown size={16} /> : <ChevronRight size={16} />
        )}
      </button>

      <div className={cn(
        "p-4 h-full overflow-auto",
        isCollapsed ? "opacity-0" : "opacity-100"
      )}>
        {!isCollapsed && children}
      </div>
    </div>
  );
};

export default ControlPanel;
