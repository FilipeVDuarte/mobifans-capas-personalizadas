
import React, { ReactNode } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ControlPanelProps {
  children: ReactNode;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div
      className={cn(
        "bg-white border-l border-gray-200 transition-all duration-300 ease-in-out relative",
        isCollapsed ? "w-12" : "w-80"
      )}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-3 top-20 bg-white border border-gray-200 rounded-full p-1 z-10"
        aria-label={isCollapsed ? "Expand panel" : "Collapse panel"}
      >
        {isCollapsed ? (
          <ChevronLeft size={16} />
        ) : (
          <ChevronRight size={16} />
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
