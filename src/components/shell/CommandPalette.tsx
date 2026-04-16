"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, FileText, FileJson, FileCode, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAVIGATION_TREE, NavItem } from "@/constants/navigation";
import { useShell } from "@/context/ShellContext";

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { setActiveTab } = useShell();

  const flattenedItems = useCallback(() => {
    const items: NavItem[] = [];
    const traverse = (nodes: NavItem[]) => {
      nodes.forEach(node => {
        if (node.type !== "folder") items.push(node);
        if (node.children) traverse(node.children);
      });
    };
    traverse(NAVIGATION_TREE);
    return items;
  }, []);

  const filteredItems = flattenedItems().filter(item => 
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = (item: NavItem) => {
    setActiveTab({
      id: item.id,
      label: item.label,
      path: item.path,
      type: item.type
    });
    setIsOpen(false);
    setSearch("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl bg-ide-sidebar border border-ide-border rounded-xl shadow-2xl z-[51] overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-ide-border bg-black/20">
              <Search className="w-5 h-5 text-zinc-500" />
              <input
                autoFocus
                placeholder="Search files and projects..."
                className="flex-1 bg-transparent border-none outline-none text-zinc-200 placeholder:text-zinc-600 font-sans text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-ide-border bg-ide-bg text-[10px] text-zinc-500 font-mono">
                ESC
              </div>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-tokyo-blue/10 hover:text-white transition-colors group"
                  >
                    {item.type === "markdown" && <FileText className="w-4 h-4 text-tokyo-blue" />}
                    {item.type === "json" && <FileJson className="w-4 h-4 text-tokyo-yellow" />}
                    {item.type === "code" && <FileCode className="w-4 h-4 text-tokyo-green" />}
                    
                    <div className="flex-1 flex flex-col">
                      <span className="text-sm text-zinc-300 group-hover:text-white">{item.label}</span>
                      <span className="text-[10px] text-zinc-600 font-mono">{item.path}</span>
                    </div>
                    
                    <CornerDownLeft className="w-3 h-3 text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-zinc-600 text-sm italic">
                  No buffers match your search.
                </div>
              )}
            </div>
            
            <div className="px-4 py-2 border-t border-ide-border bg-black/20 text-[10px] text-zinc-600 flex justify-between">
              <span className="flex items-center gap-1">
                <span className="px-1 py-0.5 rounded bg-ide-bg border border-ide-border">ENTER</span> select
              </span>
              <span className="flex items-center gap-1">
                <span className="px-1 py-0.5 rounded bg-ide-bg border border-ide-border">TAB</span> navigate
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
