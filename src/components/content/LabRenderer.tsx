"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box } from "@/components/ui/Box";
import { Typography } from "@/components/ui/Typography";
import { 
  Terminal, Code, Play, RefreshCw, Cpu, Plus, Minus, Zap, 
  Database, Settings2, Activity, X, BarChart3, Scan, Globe2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Matrix Rain Engine ---
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(22, 22, 30, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#7aa2f7"; 
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);
  return <canvas ref={canvasRef} className="w-full h-full opacity-60" />;
};

// --- ADVANCED Sorting Engine ---
const SortingVisualizer = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [size, setSize] = useState(20);
  const [algo, setAlgo] = useState<"bubble" | "selection">("bubble");

  const resetArray = () => {
    setArray(Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 10));
  };

  useEffect(() => { resetArray(); }, [size]);

  const bubbleSort = async () => {
    setSorting(true);
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
    }
    setSorting(false);
  };

  const selectionSort = async () => {
    setSorting(true);
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, 80));
    }
    setSorting(false);
  };

  return (
    <div className="w-full h-full flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
         <div className="flex gap-4 items-center">
            <select 
              value={algo} 
              onChange={(e) => setAlgo(e.target.value as any)}
              className="bg-ide-sidebar border border-ide-border rounded text-[10px] text-zinc-400 p-1.5 outline-none font-mono"
            >
               <option value="bubble">BUBBLE_SORT</option>
               <option value="selection">SELECTION_SORT</option>
            </select>
            <input 
              type="range" min="10" max="50" step="5" value={size} 
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-24 accent-tokyo-blue"
            />
            <span className="text-[10px] font-mono text-zinc-600">N={size}</span>
         </div>
         <button 
           onClick={algo === "bubble" ? bubbleSort : selectionSort} 
           disabled={sorting}
           className="px-4 py-1.5 bg-tokyo-blue text-ide-bg rounded font-black text-[10px] hover:bg-tokyo-cyan transition-all disabled:opacity-30"
         >
           RUN_ALGO
         </button>
      </div>

      <div className="flex-1 flex items-end gap-1 border-b border-ide-border pb-2">
        {array.map((val, i) => (
          <motion.div
            key={i}
            layout
            style={{ height: `${val}%` }}
            className="flex-1 bg-tokyo-blue/40 border-t-2 border-tokyo-blue rounded-t-sm"
          />
        ))}
      </div>
    </div>
  );
};

// --- Beautiful Neural Network ---
const NeuralEngine = () => {
  const [layers, setLayers] = useState([4, 6, 6, 2]);
  const [isFiring, setIsFiring] = useState(false);

  const updateNodes = (idx: number, delta: number) => {
    const newLayers = [...layers];
    newLayers[idx] = Math.max(1, Math.min(10, newLayers[idx] + delta));
    setLayers(newLayers);
  };

  const runPulse = () => {
    setIsFiring(true);
    setTimeout(() => setIsFiring(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col p-6 bg-black/30 overflow-hidden select-none">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col text-left">
          <span className="text-[9px] font-bold text-tokyo-blue uppercase tracking-widest">Architecture Visualizer</span>
          <span className="text-[8px] text-zinc-600 font-mono italic">Fully Connected Dense Layers</span>
        </div>
        <button onClick={runPulse} disabled={isFiring} className="px-5 py-2 bg-tokyo-blue text-ide-bg rounded-lg font-black text-[10px] hover:bg-tokyo-cyan transition-all disabled:opacity-30 shadow-[0_0_20px_rgba(122,162,247,0.2)] flex items-center gap-2">
          <Zap className={cn("w-3.5 h-3.5 fill-current", isFiring && "animate-pulse")} /> FIRE_DENSE_PASS
        </button>
      </div>

      <div className="flex-1 relative flex items-center justify-center gap-16 md:gap-24 lg:gap-32 px-10">
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          {layers.map((count, layerIdx) => {
            if (layerIdx === layers.length - 1) return null;
            const nextCount = layers[layerIdx + 1];
            return Array.from({ length: count }).map((_, nodeIdx) => {
              return Array.from({ length: nextCount }).map((_, nextNodeIdx) => {
                const x1 = (layerIdx / (layers.length - 1)) * 100;
                const x2 = ((layerIdx + 1) / (layers.length - 1)) * 100;
                const y1 = (nodeIdx / (count - 1 || 1)) * 100;
                const y2 = (nextNodeIdx / (nextCount - 1 || 1)) * 100;
                return (
                  <motion.line key={`${layerIdx}-${nodeIdx}-${nextNodeIdx}`} x1={`${x1}%`} y1={`${y1 === Infinity ? 50 : y1}%`} x2={`${x2}%`} y2={`${y2 === Infinity ? 50 : y2}%`} stroke="#7aa2f7" strokeWidth="0.5" initial={{ opacity: 0.05 }} animate={{ opacity: isFiring ? [0.05, 0.4, 0.05] : 0.05, strokeWidth: isFiring ? [0.5, 1, 0.5] : 0.5 }} transition={{ duration: 1.5, delay: layerIdx * 0.3 }} />
                );
              });
            });
          })}
        </svg>

        {layers.map((count, layerIdx) => (
          <div key={layerIdx} className="flex flex-col gap-6 relative z-10">
            <div className="flex flex-col items-center gap-1 group">
               <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-[-4px]">
                  <button onClick={() => updateNodes(layerIdx, 1)} className="hover:text-tokyo-blue"><Plus className="w-3 h-3" /></button>
                  <button onClick={() => updateNodes(layerIdx, -1)} className="hover:text-tokyo-red"><Minus className="w-3 h-3" /></button>
               </div>
               <div className="text-[7px] font-black text-zinc-700 uppercase tracking-tighter">
                  {layerIdx === 0 ? 'Input' : layerIdx === layers.length - 1 ? 'Output' : 'Hidden'}
               </div>
            </div>
            <div className="flex flex-col gap-3">
              {Array.from({ length: count }).map((_, nodeIdx) => (
                <motion.div key={nodeIdx} animate={isFiring ? { scale: [1, 1.3, 1], backgroundColor: ["rgba(122, 162, 247, 0.05)", "rgba(122, 162, 247, 0.8)", "rgba(122, 162, 247, 0.05)"], boxShadow: ["0 0 0px #7aa2f7", "0 0 15px #7aa2f7", "0 0 0px #7aa2f7"] } : {}} transition={{ duration: 0.6, delay: layerIdx * 0.3 }} className="w-5 h-5 rounded-full border border-tokyo-blue/40 bg-tokyo-blue/5 flex items-center justify-center relative shadow-sm">
                   <div className="w-1.5 h-1.5 rounded-full bg-tokyo-blue/20" />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- NEW: Computer Vision Engine ---
const VisionEngine = () => {
  const [scanning, setScanning] = useState(false);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-black/40">
       <div className="relative w-full max-w-sm aspect-video rounded-xl border border-ide-border overflow-hidden bg-zinc-900 group">
          <div className="absolute inset-0 flex flex-wrap content-start opacity-20">
             {Array.from({ length: 40 }).map((_, i) => (
               <div key={i} className="w-1/8 h-1/5 border-[0.5px] border-tokyo-blue/20" />
             ))}
          </div>
          <AnimatePresence>
             {scanning && (
               <motion.div 
                 initial={{ top: 0 }}
                 animate={{ top: '100%' }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="absolute left-0 right-0 h-0.5 bg-tokyo-blue shadow-[0_0_15px_#7aa2f7] z-20"
               />
             )}
          </AnimatePresence>
          <div className="absolute inset-0 flex items-center justify-center">
             <Scan className={cn("w-16 h-16 text-tokyo-blue/40", scanning && "animate-pulse")} />
          </div>
          <div className="absolute bottom-4 left-4 p-2 bg-black/60 rounded border border-tokyo-blue/20">
             <Typography variant="muted" className="text-[8px] font-mono text-tokyo-blue">DETECTION_ENGINE: ACTIVE</Typography>
             <Typography variant="muted" className="text-[8px] font-mono text-tokyo-green">OBJ_DETECT: 0.98 CONF</Typography>
          </div>
       </div>
       <button 
         onClick={() => setScanning(!scanning)}
         className="mt-8 px-6 py-2 bg-tokyo-blue text-ide-bg rounded-lg font-black text-xs hover:bg-tokyo-cyan transition-all"
       >
         {scanning ? "STOP_SCAN" : "INITIALIZE_VISION"}
       </button>
    </div>
  );
};

// --- NEW: Spatial AI Engine ---
const SpatialEngine = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-black/40 relative">
       <motion.div 
         animate={{ rotateY: 360 }}
         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
         className="w-48 h-48 border-2 border-dashed border-tokyo-blue/20 rounded-full flex items-center justify-center relative"
         style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
       >
          <div className="absolute inset-0 border border-tokyo-purple/10 rounded-full animate-ping" />
          <Globe2 className="w-24 h-24 text-tokyo-blue animate-pulse" />
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-tokyo-cyan rounded-full shadow-[0_0_10px_#7dcfff]"
              animate={{ 
                x: [Math.cos(i) * 100, Math.cos(i+1) * 100], 
                y: [Math.sin(i) * 100, Math.sin(i+1) * 100],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
       </motion.div>
       <div className="mt-12 text-center space-y-2">
          <Typography variant="body" className="text-xs font-mono text-white">Spatial_Mesh_Index: OPERATIONAL</Typography>
          <Typography variant="muted" className="text-[10px] font-mono text-zinc-500">Coordinate_System: Cartesian_0X_Alpha</Typography>
       </div>
    </div>
  );
};

export const LabRenderer = ({ label }: { label: string }) => {
  const isMatrix = label.includes("matrix");
  const isSorting = label.includes("sort");
  const isNeural = label.includes("neural");
  const isVision = label.includes("vision");
  const isSpatial = label.includes("spatial");

  return (
    <div className="h-full flex flex-col md:flex-row overflow-hidden border-t border-ide-border bg-ide-bg">
      <div className="hidden lg:flex flex-1 flex-col overflow-auto border-r border-ide-border bg-black/5">
        <div className="flex items-center justify-between px-4 py-2 border-b border-ide-border bg-ide-sidebar/50">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-tokyo-green" />
            <Typography variant="muted" className="text-xs font-mono">{label}</Typography>
          </div>
          <div className="flex items-center gap-1.5">
             <div className="w-2 h-2 rounded-full bg-tokyo-green shadow-[0_0_8px_#9ece6a]" />
             <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest">Compiler Online</span>
          </div>
        </div>
        
        <div className="p-8 font-mono text-xs leading-relaxed text-zinc-500">
           <div className="flex gap-4">
             <span className="text-zinc-800 w-4 text-right">1</span>
             <span className="text-tokyo-purple">class</span> <span className="text-tokyo-blue">LabExperiment</span> {" {"}
           </div>
           <div className="flex gap-4">
             <span className="text-zinc-800 w-4 text-right">2</span>
             <span>&nbsp;&nbsp;<span className="text-tokyo-purple">constructor</span>() {" {"}</span>
           </div>
           <div className="flex gap-4">
             <span className="text-zinc-800 w-4 text-right">3</span>
             <span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-tokyo-purple">this</span>.engine = <span className="text-tokyo-blue">new</span> Engine(&quot;{label}&quot;);</span>
           </div>
           <div className="flex gap-4">
             <span className="text-zinc-800 w-4 text-right">4</span>
             <span>&nbsp;&nbsp;{"}"}</span>
           </div>
           <div className="flex gap-4 text-zinc-800"><span className="w-4 text-right">...</span></div>
           <div className="flex gap-4">
             <span className="text-zinc-800 w-4 text-right">12</span>
             <span>&nbsp;&nbsp;<span className="text-tokyo-purple">async</span> <span className="text-tokyo-blue">run</span>() {" {"}</span>
           </div>
           <div className="flex gap-4">
             <span className="text-zinc-800 w-4 text-right">13</span>
             <span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-tokyo-purple">await</span> <span className="text-tokyo-purple">this</span>.engine.initialize();</span>
           </div>
           <div className="flex gap-4">
             <span className="text-zinc-800 w-4 text-right">14</span>
             <span>&nbsp;&nbsp;{"}"}</span>
           </div>
           <div className="flex gap-4">
             <span className="text-zinc-800 w-4 text-right">15</span>
             <span>{"}"}</span>
           </div>
        </div>
      </div>

      <div className="w-full lg:w-[700px] flex flex-col bg-black/40 shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-ide-border bg-ide-sidebar/50">
          <Terminal className="w-4 h-4 text-tokyo-blue" />
          <Typography variant="muted" className="text-[10px] uppercase tracking-widest font-bold">Scientific Workspace</Typography>
        </div>
        
        <div className="flex-1 relative overflow-hidden bg-black/20">
           {isMatrix && <MatrixRain />}
           {isSorting && <SortingVisualizer />}
           {isNeural && <NeuralEngine />}
           {isVision && <VisionEngine />}
           {isSpatial && <SpatialEngine />}
        </div>
        
        <div className="p-4 border-t border-ide-border bg-ide-sidebar/30 flex items-center justify-between">
           <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500">
                 <Database className="w-3 h-3" /> VRAM: 1.2GB
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500">
                 <Settings2 className="w-3 h-3" /> CUDA: v12.1
              </div>
           </div>
           <Typography variant="muted" className="text-[9px] font-mono text-tokyo-blue uppercase font-bold">XLA_JIT_ACTIVE</Typography>
        </div>
      </div>
    </div>
  );
};
