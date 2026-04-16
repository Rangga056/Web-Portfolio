"use client";

import React, { useState, useCallback } from "react";
import {
  Search as SearchIcon,
  GitBranch,
  Terminal as TerminalIcon,
  Blocks,
  FileText,
  FileJson,
  FileCode,
  CheckCircle2,
  User,
  Settings,
  Palette,
  Music,
  Coffee,
  Info,
  ExternalLink,
  Globe,
  Code2,
  Link,
  Mail,
  RefreshCw,
  Plus,
  Download,
  Check,
  Sparkles,
  Filter,
} from "lucide-react";
import { Typography } from "@/components/ui/Typography";
import { Box } from "@/components/ui/Box";
import { NAVIGATION_TREE, NavItem } from "@/constants/navigation";
import { useShell, ThemeType } from "@/context/ShellContext";
import { cn } from "@/lib/utils";

// --- Functional Search View ---
export const SearchView = () => {
  const [query, setQuery] = useState("");
  const { setActiveTab } = useShell();

  const flattenedItems = useCallback(() => {
    const items: NavItem[] = [];
    const traverse = (nodes: NavItem[]) => {
      nodes.forEach((node) => {
        if (node.type !== "folder") items.push(node);
        if (node.children) traverse(node.children);
      });
    };
    traverse(NAVIGATION_TREE);
    return items;
  }, []);

  const results = flattenedItems().filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600 flex justify-between items-center">
        Search
        <Filter className="w-3 h-3 text-zinc-700" />
      </div>
      <div className="px-4 pb-4 border-b border-ide-border">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search files..."
          className="w-full bg-black/20 border border-ide-border rounded px-3 py-1.5 text-xs text-zinc-300 outline-none focus:border-tokyo-blue transition-colors"
        />
      </div>
      <div className="flex-1 overflow-auto p-2 space-y-1">
        {query ? (
          results.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                setActiveTab({
                  id: item.id,
                  label: item.label,
                  path: item.path,
                  type: item.type,
                })
              }
              className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-tokyo-blue/10 group transition-colors"
            >
              {item.type === "markdown" && (
                <FileText className="w-3.5 h-3.5 text-tokyo-blue" />
              )}
              {item.type === "json" && (
                <FileJson className="w-3.5 h-3.5 text-tokyo-yellow" />
              )}
              {item.type === "code" && (
                <FileCode className="w-3.5 h-3.5 text-tokyo-green" />
              )}
              <span className="text-xs text-zinc-400 group-hover:text-white transition-colors">
                {item.label}
              </span>
            </div>
          ))
        ) : (
          <div className="p-8 text-center flex flex-col items-center gap-4 opacity-30">
            <SearchIcon className="w-8 h-8 text-zinc-600" />
            <Typography
              variant="muted"
              className="text-[10px] uppercase font-bold tracking-widest"
            >
              Workspace Index Ready
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Interactive Source Control ---
export const GitView = () => {
  const { setActiveTab } = useShell();
  const [commitMsg, setCommitMsg] = useState("");
  const [isCommitting, setIsCommitting] = useState(false);
  const [staged, setStaged] = useState([
    { name: "src/app/page.tsx", path: "source/page.tsx.md" },
    { name: "src/globals.css", path: "source/globals.css.md" },
    { name: "package.json", path: "source/package.json.md" },
  ]);

  const handleCommit = () => {
    if (!commitMsg) return;
    setIsCommitting(true);
    setTimeout(() => {
      setStaged([]);
      setCommitMsg("");
      setIsCommitting(false);
    }, 1500);
  };

  const openPreview = (file: { name: string; path: string }) => {
    setActiveTab({
      id: file.name,
      label: file.name,
      path: file.path,
      type: "markdown",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600 flex justify-between items-center">
        Source Control
        <div className="flex gap-2">
          <RefreshCw
            className="w-3 h-3 cursor-pointer hover:text-white transition-colors"
            onClick={() =>
              setStaged([
                { name: "src/app/page.tsx", path: "source/page.tsx.md" },
                { name: "src/globals.css", path: "source/globals.css.md" },
                { name: "package.json", path: "source/package.json.md" },
              ])
            }
          />
          <Plus className="w-3 h-3 cursor-pointer hover:text-white" />
        </div>
      </div>

      <div className="px-4 py-3 border-b border-ide-border bg-black/10">
        <div className="relative group">
          <textarea
            value={commitMsg}
            onChange={(e) => setCommitMsg(e.target.value)}
            placeholder="Message (Cmd+Enter to commit)"
            className="w-full bg-ide-sidebar border border-ide-border rounded p-2 text-xs text-zinc-300 outline-none focus:border-tokyo-blue transition-colors min-h-[60px] resize-none"
          />
          <button
            onClick={handleCommit}
            disabled={isCommitting || staged.length === 0}
            className="mt-2 w-full py-1.5 bg-tokyo-blue text-ide-bg text-[10px] font-bold rounded hover:bg-tokyo-cyan transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isCommitting ? (
              <RefreshCw className="w-3 h-3 animate-spin" />
            ) : (
              "COMMIT"
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <Typography
              variant="muted"
              className="text-[10px] font-bold tracking-wider flex justify-between"
            >
              STAGED{" "}
              {staged.length > 0 && (
                <span className="text-tokyo-blue">({staged.length})</span>
              )}
            </Typography>
            <div className="space-y-1">
              {staged.map((file) => (
                <div
                  key={file.name}
                  onClick={() => openPreview(file)}
                  className="flex items-center justify-between text-[11px] font-mono p-1.5 hover:bg-white/5 rounded group cursor-pointer"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-tokyo-green font-bold w-3 text-center text-[10px]">
                      A
                    </span>
                    <span className="text-zinc-400 group-hover:text-zinc-200 truncate">
                      {file.name}
                    </span>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-3 h-3 text-zinc-600 hover:text-white" />
                  </div>
                </div>
              ))}
              {staged.length === 0 && (
                <Typography
                  variant="muted"
                  className="text-[10px] italic p-2 text-center border border-dashed border-ide-border rounded text-zinc-600 font-mono"
                >
                  No changes to commit.
                </Typography>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Extensions View ---
export const ExtensionsView = () => {
  const [installed, setInstalled] = useState<string[]>(["tokyo", "nextjs"]);
  const [installing, setInstalling] = useState<string | null>(null);

  const modules = [
    {
      id: "tokyo",
      name: "Tokyo Night Theme",
      desc: "Premium minimalist theme",
      icon: Palette,
      color: "text-tokyo-purple",
    },
    {
      id: "nextjs",
      name: "Next.js Engine",
      desc: "Core application runtime",
      icon: Globe,
      color: "text-tokyo-blue",
    },
    {
      id: "lofi",
      name: "Lo-fi Radio",
      desc: "Ambient background audio",
      icon: Music,
      color: "text-tokyo-green",
    },
    {
      id: "coffee",
      name: "Coffee Injector",
      desc: "Increase developer velocity",
      icon: Coffee,
      color: "text-tokyo-orange",
    },
    {
      id: "ai",
      name: "AI Automator",
      desc: "Autonomous agent controller",
      icon: Sparkles,
      color: "text-tokyo-cyan",
    },
  ];

  const toggleInstall = (id: string) => {
    if (installed.includes(id)) {
      setInstalled((prev) => prev.filter((item) => item !== id));
    } else {
      setInstalling(id);
      setTimeout(() => {
        setInstalled((prev) => [...prev, id]);
        setInstalling(null);
      }, 1200);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600 flex justify-between items-center border-b border-ide-border">
        Marketplace
        <SearchIcon className="w-3 h-3 text-zinc-700" />
      </div>
      <div className="flex-1 overflow-auto p-2 space-y-1">
        {modules.map((module) => {
          const isInstalled = installed.includes(module.id);
          const isProcessing = installing === module.id;

          return (
            <div
              key={module.id}
              className="p-3 rounded border border-transparent hover:border-ide-border hover:bg-black/20 transition-all group"
            >
              <div className="flex items-start gap-3">
                <module.icon
                  className={cn(
                    "w-5 h-5 mt-0.5 transition-transform group-hover:scale-110",
                    module.color,
                  )}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-zinc-200 truncate">
                      {module.name}
                    </span>
                  </div>
                  <div className="text-[9px] text-zinc-500 mt-0.5 line-clamp-1">
                    {module.desc}
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => toggleInstall(module.id)}
                      disabled={isProcessing}
                      className={cn(
                        "px-2 py-0.5 rounded text-[9px] font-mono transition-all flex items-center gap-1",
                        isInstalled
                          ? "bg-tokyo-green/10 text-tokyo-green border border-tokyo-green/20"
                          : "bg-tokyo-blue text-ide-bg font-bold",
                      )}
                    >
                      {isProcessing ? (
                        <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                      ) : isInstalled ? (
                        <Check className="w-2.5 h-2.5" />
                      ) : (
                        <Download className="w-2.5 h-2.5" />
                      )}
                      {isProcessing
                        ? "INSTALLING"
                        : isInstalled
                          ? "INSTALLED"
                          : "INSTALL"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Settings View ---
export const SettingsView = () => {
  const { theme, setTheme } = useShell();
  const themes: { id: ThemeType; name: string; color: string }[] = [
    { id: "tokyo-night", name: "Tokyo Night", color: "bg-[#1a1b26]" },
    { id: "catppuccin", name: "Catppuccin", color: "bg-[#24273a]" },
    { id: "gruvbox", name: "Gruvbox", color: "bg-[#282828]" },
    { id: "nord", name: "Nord", color: "bg-[#2e3440]" },
    { id: "midnight", name: "Midnight", color: "bg-black" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600 flex justify-between items-center">
        Settings
        <Settings className="w-3 h-3 text-zinc-700" />
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <Palette className="w-4 h-4" />
            <span className="text-xs font-bold text-tokyo-blue">
              Visual Theme
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={cn(
                  "flex items-center gap-3 w-full p-2.5 rounded border transition-all text-left group",
                  theme === t.id
                    ? "border-tokyo-blue bg-tokyo-blue/10"
                    : "border-ide-border hover:border-zinc-600 bg-black/20",
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border border-white/10 shadow-sm transition-transform group-hover:scale-110",
                    t.color,
                  )}
                />
                <span className="text-[11px] text-zinc-300 group-hover:text-white">
                  {t.name}
                </span>
                {theme === t.id && (
                  <CheckCircle2 className="w-3 h-3 ml-auto text-tokyo-blue" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <Info className="w-4 h-4" />
            <span className="text-xs font-bold text-tokyo-blue">
              System Config
            </span>
          </div>
          <div className="p-4 bg-black/20 rounded border border-ide-border space-y-3 text-zinc-500">
            <div className="flex justify-between text-[10px]">
              <span className="font-mono uppercase tracking-widest">
                Workspace
              </span>
              <span className="text-tokyo-green font-mono">STABLE</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="font-mono uppercase tracking-widest">
                Runtime
              </span>
              <span className="text-zinc-300 font-mono">Next.js v15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Profile View ---
export const ProfileView = () => (
  <div className="flex flex-col h-full">
    <div className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600 flex justify-between items-center">
      User Profile
      <RefreshCw className="w-3 h-3 text-zinc-700 hover:text-white cursor-pointer" />
    </div>
    <div className="flex-1 overflow-auto p-4 space-y-8">
      <div className="flex flex-col items-center text-center space-y-4 py-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-tokyo-blue via-tokyo-cyan to-tokyo-purple p-[2px] shadow-2xl animate-gradient-x">
          <div className="w-full h-full rounded-full bg-ide-bg flex items-center justify-center overflow-hidden border border-white/10 relative group">
            <Code2 className="w-12 h-12 text-tokyo-blue group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-tokyo-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div>
          <Typography
            variant="body"
            className="font-bold text-xl text-white tracking-tight"
          >
            Eclipse404
          </Typography>
          <Typography
            variant="muted"
            className="text-[10px] font-mono text-tokyo-blue uppercase tracking-widest"
          >
            Master Engineer
          </Typography>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-400">
          <Globe className="w-4 h-4" />
          <span className="text-xs font-bold text-tokyo-blue">
            Network Interfaces
          </span>
        </div>
        <div className="space-y-2">
          {[
            {
              name: "Main Hub (GitHub)",
              icon: Code2,
              url: "https://github.com/Rangga056",
            },
            {
              name: "Professional Node (LinkedIn)",
              icon: Link,
              url: "https://www.linkedin.com/in/muhammad-rangga-miftahul-falah-136595249/",
            },
            {
              name: "Direct Comm (Email)",
              icon: Mail,
              url: "mailto:muhammadrangga056@gmail.com",
            },
          ].map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              className="flex items-center justify-between p-3 rounded bg-black/20 border border-ide-border hover:border-tokyo-blue group transition-all"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <link.icon className="w-4 h-4 text-zinc-500 group-hover:text-tokyo-blue transition-colors shrink-0" />
                <span className="text-[11px] text-zinc-400 group-hover:text-zinc-200 truncate">
                  {link.name}
                </span>
              </div>
              <ExternalLink className="w-3 h-3 text-zinc-700 group-hover:text-tokyo-blue shrink-0" />
            </a>
          ))}
        </div>
      </div>

      <div className="p-4 bg-tokyo-blue/5 border border-tokyo-blue/10 rounded-lg space-y-2">
        <Typography
          variant="muted"
          className="text-[10px] uppercase font-bold tracking-tighter text-tokyo-cyan flex items-center gap-2"
        >
          <Sparkles className="w-3 h-3" /> System Achievement
        </Typography>
        <Typography
          variant="body"
          className="text-[11px] text-zinc-500 italic text-left"
        >
          Build sequence completed with 100% logic integrity. IDE Engine
          optimized for recursive career discovery.
        </Typography>
      </div>
    </div>
  </div>
);
