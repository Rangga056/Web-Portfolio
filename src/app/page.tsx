"use client";

import { useEffect, useState } from "react";
import { useShell } from "@/context/ShellContext";
import { Box } from "@/components/ui/Box";
import { Typography } from "@/components/ui/Typography";
import { AnimatePresence, motion } from "framer-motion";
import { MarkdownRenderer } from "@/components/content/MarkdownRenderer";
import { JsonRenderer } from "@/components/content/JsonRenderer";
import { LabRenderer } from "@/components/content/LabRenderer";
import { PdfRenderer } from "@/components/content/PdfRenderer";
import { ContentData } from "@/lib/content";
import { Loader2, AlertCircle } from "lucide-react";

const ASCII_ART = `
▓█████  ▄████▄   ██▓     ██▓ ██▓███    ██████ ▓█████ 
▓█   ▀ ▒██▀ ▀█  ▓██▒    ▓██▒▓██░  ██▒▒██    ▒ ▓█   ▀ 
▒███   ▒▓█    ▄ ▒██░    ▒██▒▓██░ ██▓▒░ ▓██▄   ▒███   
▒▓█  ▄ ▒▓▓▄ ▄██▒▒██░    ░██░▒██▄█▓▒ ▒  ▒   ██▒▒▓█  ▄ 
░▒████▒▒ ▓███▀ ░░██████▒░██░▒██▒ ░  ░▒██████▒▒░▒████▒
░░ ▒░ ░░ ░▒ ▒  ░░ ▒░▓  ░░▓  ▒▓▒░ ░  ░▒ ▒▓▒ ▒ ░░░ ▒░ ░
 ░ ░  ░  ░  ▒   ░ ░ ▒  ░ ▒ ░░▒ ░     ░ ░▒  ░ ░ ░ ░  ░
   ░   ░          ░ ░    ▒ ░░░       ░  ░  ░     ░   
   ░  ░░ ░          ░  ░ ░                 ░     ░  ░
       ░                                             
`;

const WelcomeView = () => {
  const [bootStep, setBootStep] = useState(0);
  const bootMessages = [
    "Initializing shell...",
    "Loading content tree...",
    "Mounting project buffers...",
    "System ready."
  ];

  useEffect(() => {
    if (bootStep < bootMessages.length - 1) {
      const timer = setTimeout(() => setBootStep(prev => prev + 1), 600);
      return () => clearTimeout(timer);
    }
  }, [bootStep, bootMessages.length]);

  return (
    <Box 
      variant="default"
      padding="none"
      className="min-h-full flex flex-col items-center justify-center bg-ide-bg overflow-x-hidden py-12 md:py-0"
    >
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full px-6 md:px-12 space-y-12 md:space-y-20 flex flex-col"
      >
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
          <motion.pre 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[5px] sm:text-[8px] md:text-[14px] lg:text-[16px] leading-none text-tokyo-blue font-mono font-black whitespace-pre no-scrollbar selection:bg-tokyo-blue/20"
          >
            {ASCII_ART}
          </motion.pre>
          
          <div className="space-y-3">
            <Typography variant="body" className="text-zinc-500 font-mono text-sm md:text-lg tracking-[0.3em] uppercase">
              [ @eclipsedev ]
            </Typography>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-ide-border to-transparent" />
            <Typography as="h2" variant="title" className="text-zinc-400 font-medium text-lg md:text-xl">
              Muhammad Rangga Miftahul Falah
            </Typography>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <div className="space-y-6 md:space-y-8 text-left">
            <div className="flex items-center gap-4">
              <Typography variant="muted" className="uppercase text-[10px] tracking-[0.25em] font-bold text-tokyo-blue/80">
                01. Identity
              </Typography>
              <div className="flex-1 h-[1px] bg-ide-border/30" />
            </div>
            <Typography variant="body" className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-sans font-light">
              Software Engineer specializing in <span className="text-white font-medium">Fullstack Systems</span> and 
              <span className="text-white font-medium"> AI Automation</span>. 
              Bridging traditional logic with autonomous intelligence.
            </Typography>
          </div>

          <div className="space-y-6 md:space-y-8 text-left">
            <div className="flex items-center gap-4">
              <Typography variant="muted" className="uppercase text-[10px] tracking-[0.25em] font-bold text-tokyo-blue/80">
                02. System Logs
              </Typography>
              <div className="flex-1 h-[1px] bg-ide-border/30" />
            </div>
            <div className="text-[11px] md:text-[12px] space-y-3 text-zinc-500 font-mono border-l border-tokyo-blue/20 pl-6 md:pl-8">
              {bootMessages.slice(0, bootStep + 1).map((msg, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-tokyo-comment opacity-50">{i.toString().padStart(2, '0')}</span>
                  <span className={i === bootStep ? "text-tokyo-green" : ""}>{msg}</span>
                </div>
              ))}
              {bootStep < bootMessages.length - 1 && <span className="animate-pulse text-tokyo-blue">_</span>}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-center md:items-end border-t border-ide-border/30 opacity-50 gap-4 text-center md:text-left">
           <div className="space-y-1">
             <Typography variant="muted" className="text-[9px] uppercase tracking-widest">Environment</Typography>
             <Typography variant="body" className="text-xs font-mono">Kernel v2.4.0-stable | Node v20.11</Typography>
           </div>
           <div className="space-y-1 md:text-right">
             <Typography variant="muted" className="text-[9px] uppercase tracking-widest">Navigation</Typography>
             <Typography variant="body" className="text-xs font-mono italic">press ⌘+K to browse buffers</Typography>
           </div>
        </div>
      </motion.div>
    </Box>
  );
};

const FileView = ({ path, label, type }: { path: string; label: string; type: string }) => {
  const [data, setData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (type === "pdf" || path.startsWith("lab/")) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/content?path=${path}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setData(json);
      } catch (e: any) {
        setError(e.message || "Unknown buffer error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [path, type]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-tokyo-blue animate-spin" />
      </div>
    );
  }

  if (type === "pdf") return <PdfRenderer label={label} />;
  if (path.startsWith("lab/")) return <LabRenderer label={label} />;

  if (error || !data) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-tokyo-red/10 flex items-center justify-center border border-tokyo-red/20">
          <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-tokyo-red" />
        </div>
        <div className="space-y-2">
          <Typography variant="title" className="text-tokyo-red text-xl md:text-2xl font-mono">
            404: BUFFER_FAIL
          </Typography>
          <Typography variant="body" className="text-zinc-500 font-mono text-xs md:text-sm max-w-xs mx-auto">
            Failed to mount buffer: &quot;{path}&quot;
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      {data.type === "markdown" ? (
        <MarkdownRenderer content={data.content} frontmatter={data.frontmatter} />
      ) : (
        <JsonRenderer content={data.content} />
      )}
    </div>
  );
};

export default function Home() {
  const { activeTabId, openTabs } = useShell();
  const activeTab = openTabs.find(t => t.id === activeTabId);

  return (
    <div className="h-full w-full relative">
      <AnimatePresence mode="wait">
        {!activeTab ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full"
          >
            <WelcomeView />
          </motion.div>
        ) : (
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full"
          >
            <FileView path={activeTab.path} label={activeTab.label} type={activeTab.type} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
