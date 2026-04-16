"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FileText, FileJson, FileCode, File, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "@/constants/navigation";
import { useShell, FileType } from "@/context/ShellContext";

const FileIcon = ({ type, isOpen }: { type: FileType; isOpen?: boolean }) => {
  if (type === "folder") {
    return isOpen ? <ChevronDown className="w-4 h-4 text-zinc-500" /> : <ChevronRight className="w-4 h-4 text-zinc-500" />;
  }
  
  switch (type) {
    case "markdown": return <FileText className="w-4 h-4 text-tokyo-blue" />;
    case "json": return <FileJson className="w-4 h-4 text-tokyo-yellow" />;
    case "code": return <FileCode className="w-4 h-4 text-tokyo-green" />;
    case "pdf": return <FileDown className="w-4 h-4 text-tokyo-red" />;
    default: return <File className="w-4 h-4 text-zinc-400" />;
  }
};

const FolderIcon = ({ isOpen }: { isOpen: boolean }) => {
  return <Folder className={cn("w-4 h-4 fill-current", isOpen ? "text-tokyo-blue" : "text-zinc-500")} />;
};

export const FileTreeItem = ({ item, depth = 0 }: { item: NavItem; depth?: number }) => {
  const [isOpen, setIsOpen] = useState(depth === 0);
  const { activeTabId, setActiveTab } = useShell();
  
  const isSelected = activeTabId === item.id;
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.type === "folder") {
      setIsOpen(!isOpen);
    } else {
      setActiveTab({
        id: item.id,
        label: item.label,
        path: item.path,
        type: item.type
      });
    }
  };

  return (
    <div className="select-none">
      <div 
        onClick={handleClick}
        className={cn(
          "flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-white/5 transition-colors group",
          isSelected && "bg-tokyo-blue/10 text-white border-l-2 border-tokyo-blue"
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        <FileIcon type={item.type} isOpen={isOpen} />
        {item.type === "folder" && <FolderIcon isOpen={isOpen} />}
        <span className={cn(
          "text-sm font-medium", 
          isSelected ? "text-tokyo-blue" : "text-zinc-400 group-hover:text-zinc-200"
        )}>
          {item.label}
        </span>
      </div>
      
      {item.type === "folder" && isOpen && item.children && (
        <div className="mt-0.5">
          {item.children.map(child => (
            <FileTreeItem key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileTree = ({ items }: { items: NavItem[] }) => {
  return (
    <div className="py-2">
      <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-2">
        Explorer
      </div>
      {items.map(item => (
        <FileTreeItem key={item.id} item={item} />
      ))}
    </div>
  );
};
