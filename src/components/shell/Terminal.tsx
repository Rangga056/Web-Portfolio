"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useShell, Tab } from "@/context/ShellContext";
import { NAVIGATION_TREE, NavItem } from "@/constants/navigation";
import { ResizeHandle } from "@/components/ui/ResizeHandle";

export const Terminal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [history, setHistory] = useState<string[]>(["Welcome to Rangga-OS v2.0.0", "Type 'help' to see available commands."]);
  const [input, setInput] = useState("");
  const { setActiveTab, terminalHeight, setTerminalHeight } = useShell();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const findNavItem = (path: string): NavItem | null => {
    let result: NavItem | null = null;
    const traverse = (nodes: NavItem[]) => {
      for (const node of nodes) {
        if (node.path === path || node.id === path || node.label === path || node.label.replace('.md', '').replace('.json', '') === path) {
          result = node;
          return;
        }
        if (node.children) traverse(node.children);
      }
    };
    traverse(NAVIGATION_TREE);
    return result;
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const parts = input.trim().split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    const newHistory = [...history, `$ ${input}`];

    switch (cmd) {
      case "help":
        newHistory.push("Available commands:");
        newHistory.push("  about      - Display user information");
        newHistory.push("  projects   - List all available project buffers");
        newHistory.push("  skills     - Display technical stack");
        newHistory.push("  ls [dir]   - List contents of a directory");
        newHistory.push("  open <tab> - Open a buffer in the editor");
        newHistory.push("  clear      - Clear the terminal screen");
        newHistory.push("  git status - Check current workspace status");
        newHistory.push("  whoami     - Identify current system user");
        newHistory.push("  exit       - Terminate current terminal session");
        break;
      case "about":
        newHistory.push("User: Muhammad Rangga Miftahul Falah (@Eclipse404)");
        newHistory.push("Role: Software Engineer / AI Automator");
        newHistory.push("Status: Actively building high-performance fullstack systems.");
        break;
      case "projects":
        newHistory.push("BUFFER_POOL:");
        newHistory.push(" - airbnb-clone.md");
        newHistory.push(" - eclipse-summit.md");
        newHistory.push(" - budget-tracker.md");
        newHistory.push(" - eclipse-estate.md");
        newHistory.push(" - ai-automation.md");
        break;
      case "skills":
        newHistory.push("STACK_DUMP:");
        newHistory.push(" [Languages] TypeScript, Go, Python, SQL");
        newHistory.push(" [Frameworks] Next.js, React, Node.js, Prisma, Supabase");
        newHistory.push(" [Automation] n8n, AI Agents, Python Workflows");
        break;
      case "whoami":
        newHistory.push("guest@eclipse-shell:~/workspace");
        break;
      case "git":
        if (args[0] === "status") {
          newHistory.push("On branch main");
          newHistory.push("Your branch is up to date with 'origin/main'.");
          newHistory.push("nothing to commit, working tree clean");
        } else {
          newHistory.push("git: subcommand not implemented yet. Use 'git status'.");
        }
        break;
      case "ls":
        const dir = args[0] || "root";
        if (dir === "root" || dir === "/") {
          newHistory.push("me/  projects/  lab/  resume.pdf");
        } else if (dir === "me" || dir === "me/") {
          newHistory.push("about.md  github.json  skills.json");
        } else if (dir === "projects" || dir === "projects/") {
          newHistory.push("airbnb-clone.md  eclipse-estate.md  budget-tracker.md  eclipse-summit.md  ...");
        } else {
          newHistory.push(`ls: directory not found: ${dir}`);
        }
        break;
      case "open":
        if (args.length === 0) {
          newHistory.push("Usage: open <filename>");
        } else {
          const item = findNavItem(args[0]);
          if (item && item.type !== "folder") {
            setActiveTab({
              id: item.id,
              label: item.label,
              path: item.path,
              type: item.type
            });
            newHistory.push(`Opening buffer: ${item.label}`);
          } else {
            newHistory.push(`Error: Buffer '${args[0]}' not found in NAVIGATION_TREE.`);
          }
        }
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "exit":
        onClose();
        return;
      default:
        newHistory.push(`sh: command not found: ${cmd}. Try 'help'.`);
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: terminalHeight }}
          exit={{ height: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed bottom-6 right-0 left-0 md:left-16 z-40 bg-ide-sidebar border-t border-ide-border shadow-2xl flex flex-col overflow-hidden"
        >
          <ResizeHandle 
            orientation="vertical" 
            onResize={(delta) => setTerminalHeight(Math.max(100, Math.min(800, terminalHeight - delta)))}
            className="absolute top-0 left-0 w-full"
          />

          <div className="flex items-center justify-between px-4 py-2 border-b border-ide-border bg-black/20 shrink-0">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-tokyo-blue" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">zsh — Rangga Portfolio</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 p-4 font-mono text-xs overflow-auto space-y-1 no-scrollbar selection:bg-tokyo-blue/20"
          >
            {history.map((line, i) => (
              <div key={i} className={line.startsWith("$") ? "text-tokyo-blue" : "text-zinc-400"}>
                {line}
              </div>
            ))}
            <form onSubmit={handleCommand} className="flex items-center gap-2">
              <span className="text-tokyo-green">➜</span>
              <span className="text-tokyo-cyan">~</span>
              <input
                autoFocus
                className="flex-1 bg-transparent border-none outline-none text-zinc-200"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
