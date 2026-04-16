"use client";

import React from "react";
import { Sidebar } from "@/components/shell/Sidebar";
import { TabBar } from "@/components/shell/TabBar";
import { StatusBar } from "@/components/shell/StatusBar";
import { CommandPalette } from "@/components/shell/CommandPalette";
import { Terminal } from "@/components/shell/Terminal";
import { useShell } from "@/context/ShellContext";
import { motion, AnimatePresence } from "framer-motion";

export const ShellLayout = ({ children }: { children: React.ReactNode }) => {
  const { isTerminalOpen, toggleTerminal, isSidebarOpen, toggleSidebar } = useShell();

  return (
    <div className="h-full w-full flex flex-col overflow-hidden relative bg-ide-bg">
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar />
        
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
           {isSidebarOpen && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={toggleSidebar}
               className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden"
             />
           )}
        </AnimatePresence>

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <TabBar />
          {/* Main Scrollable Content Area */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden relative no-scrollbar">
            {children}
          </main>
          <Terminal isOpen={isTerminalOpen} onClose={toggleTerminal} />
        </div>
      </div>
      
      <div className="hidden md:block">
        <StatusBar />
      </div>
      <CommandPalette />
    </div>
  );
};
