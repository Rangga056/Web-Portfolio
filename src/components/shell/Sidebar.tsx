"use client";

import React from "react";
import { Search as SearchIcon, GitBranch, Terminal as TerminalIcon, Blocks, Layout, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { FileTree } from "./FileTree";
import { NAVIGATION_TREE } from "@/constants/navigation";
import { useShell } from "@/context/ShellContext";
import { Logo } from "@/components/ui/Logo";
import { SearchView, GitView, ExtensionsView, SettingsView, ProfileView } from "./SidebarViews";
import { ResizeHandle } from "@/components/ui/ResizeHandle";
import { motion, AnimatePresence } from "framer-motion";

const ActivityIcon = ({ 
  icon: Icon, 
  active, 
  onClick 
}: { 
  icon: React.ElementType; 
  active?: boolean;
  onClick?: () => void;
}) => (
  <div 
    onClick={onClick}
    className={cn(
      "p-3 cursor-pointer transition-colors border-l-2 shrink-0",
      active ? "text-tokyo-blue border-tokyo-blue" : "text-zinc-500 border-transparent hover:text-zinc-300"
    )}
  >
    <Icon className="w-6 h-6" />
  </div>
);

export const Sidebar = () => {
  const { 
    isTerminalOpen, toggleTerminal, 
    activeSidebarView, setSidebarView,
    isSidebarOpen, sidebarWidth, setSidebarWidth 
  } = useShell();

  const renderSidebarContent = () => {
    switch (activeSidebarView) {
      case "explorer":
        return <FileTree items={NAVIGATION_TREE} />;
      case "search":
        return <SearchView />;
      case "git":
        return <GitView />;
      case "extensions":
        return <ExtensionsView />;
      case "settings":
        return <SettingsView />;
      case "profile":
        return <ProfileView />;
      default:
        return null;
    }
  };

  return (
    <aside className="flex h-full border-r border-ide-border bg-ide-sidebar z-30">
      {/* Activity Bar */}
      <div className="w-16 flex flex-col items-center py-4 border-r border-ide-border bg-black/20 shrink-0">
        <div className="mb-6">
          <Logo size={28} />
        </div>
        
        <ActivityIcon 
          icon={Layout} 
          active={isSidebarOpen && activeSidebarView === "explorer"} 
          onClick={() => setSidebarView("explorer")}
        />
        <ActivityIcon 
          icon={SearchIcon} 
          active={isSidebarOpen && activeSidebarView === "search"} 
          onClick={() => setSidebarView("search")}
        />
        <ActivityIcon 
          icon={GitBranch} 
          active={isSidebarOpen && activeSidebarView === "git"} 
          onClick={() => setSidebarView("git")}
        />
        <ActivityIcon 
          icon={Blocks} 
          active={isSidebarOpen && activeSidebarView === "extensions"} 
          onClick={() => setSidebarView("extensions")}
        />
        <ActivityIcon 
          icon={TerminalIcon} 
          active={isTerminalOpen} 
          onClick={toggleTerminal} 
        />
        
        <div className="mt-auto flex flex-col items-center gap-2">
          <ActivityIcon 
            icon={User} 
            active={isSidebarOpen && activeSidebarView === "profile"} 
            onClick={() => setSidebarView("profile")}
          />
          <ActivityIcon 
            icon={Settings} 
            active={isSidebarOpen && activeSidebarView === "settings"} 
            onClick={() => setSidebarView("settings")}
          />
        </div>
      </div>
      
      {/* Primary Sidebar Content (Resizable & Collapsible) */}
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: sidebarWidth, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="flex flex-col h-full bg-ide-sidebar/50 overflow-hidden relative shrink-0"
          >
            <div className="flex-1 w-full overflow-hidden">
              {renderSidebarContent()}
            </div>
            
            <ResizeHandle 
              orientation="horizontal" 
              onResize={(delta) => setSidebarWidth(Math.max(160, Math.min(600, sidebarWidth + delta)))}
              className="absolute top-0 right-0 h-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};
