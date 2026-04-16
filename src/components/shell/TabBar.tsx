"use client";

import React from "react";
import { X, FileText, FileJson, FileCode, File, FileDown, Layers, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useShell, Tab, FileType } from "@/context/ShellContext";

const TabIcon = ({ type }: { type: FileType }) => {
  switch (type) {
    case "markdown": return <FileText className="w-3.5 h-3.5 text-tokyo-blue" />;
    case "json": return <FileJson className="w-3.5 h-3.5 text-tokyo-yellow" />;
    case "code": return <FileCode className="w-3.5 h-3.5 text-tokyo-green" />;
    case "pdf": return <FileDown className="w-3.5 h-3.5 text-tokyo-red" />;
    default: return <File className="w-3.5 h-3.5 text-zinc-400" />;
  }
};

const TabItem = ({ tab }: { tab: Tab }) => {
  const { activeTabId, setActiveTab, closeTab } = useShell();
  const isActive = activeTabId === tab.id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
      onClick={() => setActiveTab(tab)}
      className={cn(
        "group flex items-center gap-2 px-3 py-2 cursor-pointer border-r border-ide-border min-w-[120px] transition-all relative shrink-0",
        isActive ? "bg-ide-bg border-t-2 border-t-tokyo-blue" : "bg-black/20 text-zinc-500 hover:bg-white/5"
      )}
    >
      <TabIcon type={tab.type} />
      <span className={cn("text-[11px] whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]", isActive && "text-zinc-200")}>
        {tab.label}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          closeTab(tab.id);
        }}
        className={cn(
          "ml-auto p-0.5 rounded-sm hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity",
          isActive && "opacity-100"
        )}
      >
        <X className="w-3 h-3" />
      </button>
    </motion.div>
  );
};

export const TabBar = () => {
  const { openTabs, closeAllTabs, toggleSidebar } = useShell();

  return (
    <div className="flex items-center h-9 bg-ide-sidebar border-b border-ide-border overflow-hidden">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={toggleSidebar}
        className="md:hidden p-2 text-zinc-500 hover:text-white border-r border-ide-border"
      >
        <Layers className="w-4 h-4" />
      </button>

      <div className="flex-1 flex overflow-x-auto no-scrollbar scroll-smooth h-full">
        <AnimatePresence mode="popLayout">
          {openTabs.map((tab) => (
            <TabItem key={tab.id} tab={tab} />
          ))}
        </AnimatePresence>
      </div>

      {openTabs.length > 0 && (
        <button 
          onClick={closeAllTabs}
          title="Close All Buffers"
          className="px-3 h-full border-l border-ide-border text-zinc-500 hover:text-tokyo-red transition-colors group"
        >
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      )}
    </div>
  );
};
