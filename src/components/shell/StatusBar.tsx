"use client";

import React from "react";
import { GitBranch, Bell, Globe, Cpu, CheckCircle2 } from "lucide-react";
import { useShell } from "@/context/ShellContext";
import { cn } from "@/lib/utils";

const StatusItem = ({ 
  children, 
  className, 
  icon: Icon
}: { 
  children?: React.ReactNode; 
  className?: string;
  icon?: React.ElementType;
}) => (
  <div className={cn(
    "flex items-center gap-1.5 px-3 py-1 cursor-pointer transition-colors hover:bg-white/10 text-[11px] text-zinc-400",
    className
  )}>
    {Icon && <Icon className="w-3.5 h-3.5" />}
    {children}
  </div>
);

export const StatusBar = () => {
  const { activeTabId, openTabs } = useShell();
  const activeTab = openTabs.find(t => t.id === activeTabId);

  return (
    <footer className="h-6 flex items-center justify-between bg-ide-sidebar border-t border-ide-border text-foreground px-2 text-[11px] font-medium shrink-0">
      <div className="flex items-center h-full">
        <div className="bg-tokyo-blue text-ide-bg px-3 py-1 font-bold mr-2 uppercase tracking-wider">
          Normal
        </div>
        <StatusItem icon={GitBranch} className="text-tokyo-blue">
          main*
        </StatusItem>
        {activeTab && (
          <div className="flex items-center px-3 border-x border-ide-border h-full text-zinc-400 font-mono">
            {activeTab.path.replace("/", "").replace(/\//g, " > ")}
          </div>
        )}
      </div>

      <div className="flex items-center h-full">
        <div className="flex items-center gap-3 mr-4 text-zinc-500">
           <a href="https://github.com/Rangga056" target="_blank" rel="noopener noreferrer" className="hover:text-tokyo-blue transition-colors text-[10px] font-mono">
             github
           </a>
           <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-tokyo-blue transition-colors text-[10px] font-mono">
             linkedin
           </a>
        </div>
        <StatusItem icon={Cpu} className="text-tokyo-yellow">
          LSP: TypeScript
        </StatusItem>
        <StatusItem icon={CheckCircle2} className="text-tokyo-green">
          Prettier
        </StatusItem>
        <StatusItem icon={Globe}>
          UTF-8
        </StatusItem>
      </div>
    </footer>
  );
};
