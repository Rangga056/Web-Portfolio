"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Box } from "@/components/ui/Box";
import { Typography } from "@/components/ui/Typography";
import { 
  Terminal, Code, Play, RefreshCw, Cpu, Plus, Minus, Zap, 
  Database, Settings2, Activity, X, BarChart3, Scan, Globe2,
  MousePointer2, Palette, FastForward, Sliders, Info, 
  Eye, Brain, Layers, Navigation2, Command, Volume2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Types ---
type MatrixTheme = "classic" | "tokyo" | "hazard" | "midnight";

// --- Matrix Rain Engine (INTERACTIVE) ---
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [theme, setTheme] = useState<MatrixTheme>("tokyo");
  const [speed, setSize] = useState(1);
  const mousePos = useRef({ x: -1000, y: -1000 });

  const themes: Record<MatrixTheme, string> = {
    classic: "#0f0",
    tokyo: "#7aa2f7",
    hazard: "#f7768e",
    midnight: "#fff"
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.parentElement?.offsetWidth || 800;
      canvas.height = canvas.parentElement?.offsetHeight || 600;
    };
    resize();
    window.addEventListener("resize", resize);

    const characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 16;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 14, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Interaction: Repel or glow near mouse
        const dist = Math.hypot(x - mousePos.current.x, y - mousePos.current.y);
        const isNearMouse = dist < 100;

        if (isNearMouse) {
          ctx.fillStyle = "#fff";
          ctx.shadowBlur = 15;
          ctx.shadowColor = themes[theme];
        } else {
          ctx.fillStyle = themes[theme];
          ctx.shadowBlur = 0;
        }

        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speed;
      }
    };

    const interval = setInterval(draw, 33);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [theme, speed]);

  return (
    <div className="w-full h-full relative">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 flex gap-2 z-10">
        {(Object.keys(themes) as MatrixTheme[]).map((t) => (
          <button 
            key={t}
            onClick={() => setTheme(t)}
            className={cn(
              "w-6 h-6 rounded-full border border-white/10 transition-all transform hover:scale-110",
              theme === t ? "border-white scale-110 shadow-lg" : "opacity-40"
            )}
            style={{ backgroundColor: themes[t] }}
          />
        ))}
        <div className="h-6 w-[1px] bg-white/10 mx-2" />
        <button onClick={() => setSize(s => Math.min(3, s + 0.5))} className="p-1 hover:text-white text-zinc-500"><FastForward className="w-4 h-4" /></button>
        <button onClick={() => setSize(s => Math.max(0.5, s - 0.5))} className="p-1 hover:text-white text-zinc-500 rotate-180"><FastForward className="w-4 h-4" /></button>
      </div>
      <div className="absolute bottom-4 right-4 text-[9px] font-mono text-zinc-600 bg-black/40 px-2 py-1 rounded backdrop-blur-sm border border-white/5">
        INT_ENGINE: ACTIVE | MOUSE_TRACKING: ENABLED
      </div>
    </div>
  );
};

// --- SONIFIED Sorting Engine ---
const SortingVisualizer = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [size, setSize] = useState(30);
  const [algo, setAlgo] = useState<"quick" | "merge" | "bubble">("quick");
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0 });
  const audioCtx = useRef<AudioContext | null>(null);

  const resetArray = useCallback(() => {
    setArray(Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 5));
    setStats({ comparisons: 0, swaps: 0 });
  }, [size]);

  useEffect(() => { resetArray(); }, [resetArray]);

  const playSound = (val: number) => {
    if (!audioCtx.current) audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(200 + val * 5, audioCtx.current.currentTime);
    gain.gain.setValueAtTime(0.05, audioCtx.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.current.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(audioCtx.current.destination);
    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.1);
  };

  const bubbleSort = async () => {
    setSorting(true);
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setStats(s => ({ ...s, comparisons: s.comparisons + 1 }));
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setStats(s => ({ ...s, swaps: s.swaps + 1 }));
          setArray([...arr]);
          playSound(arr[j]);
          await new Promise(r => setTimeout(r, size > 30 ? 20 : 50));
        }
      }
    }
    setSorting(false);
  };

  const quickSort = async () => {
    setSorting(true);
    const arr = [...array];
    const sort = async (l: number, r: number) => {
      if (l >= r) return;
      let pivot = arr[r];
      let i = l;
      for (let j = l; j < r; j++) {
        setStats(s => ({ ...s, comparisons: s.comparisons + 1 }));
        if (arr[j] < pivot) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setStats(s => ({ ...s, swaps: s.swaps + 1 }));
          setArray([...arr]);
          playSound(arr[i]);
          await new Promise(res => setTimeout(res, 30));
          i++;
        }
      }
      [arr[i], arr[r]] = [arr[r], arr[i]];
      setArray([...arr]);
      await sort(l, i - 1);
      await sort(i + 1, r);
    };
    await sort(0, arr.length - 1);
    setSorting(false);
  };

  return (
    <div className="w-full h-full flex flex-col p-6 space-y-6 bg-black/20">
      <div className="flex items-center justify-between">
         <div className="flex gap-4 items-center">
            <select 
              value={algo} 
              onChange={(e) => setAlgo(e.target.value as any)}
              className="bg-ide-sidebar border border-ide-border rounded text-[10px] text-zinc-300 p-2 outline-none font-mono focus:border-tokyo-blue transition-colors"
            >
               <option value="quick">QUICK_SORT (O(n log n))</option>
               <option value="bubble">BUBBLE_SORT (O(n²))</option>
            </select>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded border border-white/5">
              <Sliders className="w-3 h-3 text-zinc-500" />
              <input 
                type="range" min="10" max="100" step="10" value={size} 
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-24 accent-tokyo-blue"
              />
            </div>
         </div>
         <div className="flex gap-2">
           <button onClick={resetArray} className="p-2 hover:bg-white/5 rounded-lg transition-colors"><RefreshCw className="w-4 h-4 text-zinc-500" /></button>
           <button 
             onClick={algo === "quick" ? quickSort : bubbleSort} 
             disabled={sorting}
             className="px-6 py-2 bg-tokyo-blue text-ide-bg rounded-lg font-black text-xs hover:bg-tokyo-cyan transition-all disabled:opacity-30 shadow-lg shadow-tokyo-blue/20"
           >
             EXECUTE_SORT
           </button>
         </div>
      </div>

      <div className="flex-1 flex items-end gap-[1px] md:gap-[2px] border-b border-ide-border/30 pb-4">
        {array.map((val, i) => (
          <motion.div
            key={i}
            layout
            style={{ 
              height: `${val}%`,
              backgroundColor: `hsl(${220 + val}, 70%, 60%)`
            }}
            className="flex-1 rounded-t-sm relative group"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-ide-sidebar text-[8px] px-1 rounded border border-white/10 z-20 transition-opacity">
              {val}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Complexity", val: algo === 'quick' ? 'O(n log n)' : 'O(n²)', icon: Activity },
          { label: "Comparisons", val: stats.comparisons, icon: Brain },
          { label: "Swaps/Moves", val: stats.swaps, icon: RefreshCw },
          { label: "Sonification", val: "Active (Sine)", icon: Volume2 }
        ].map((s, i) => (
          <div key={i} className="bg-black/40 p-3 rounded-lg border border-white/5 flex items-center gap-3">
             <s.icon className="w-4 h-4 text-tokyo-blue" />
             <div>
               <div className="text-[8px] text-zinc-600 uppercase font-bold">{s.label}</div>
               <div className="text-xs font-mono text-zinc-300">{s.val}</div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Neural Sandbox ---
const NeuralEngine = () => {
  const [layers, setLayers] = useState([3, 5, 5, 1]);
  const [activeSignal, setActiveSignal] = useState(-1);
  const [learningMode, setLearningMode] = useState(false);

  const addLayer = () => {
    if (layers.length >= 6) return;
    const newLayers = [...layers];
    newLayers.splice(layers.length - 1, 0, 4);
    setLayers(newLayers);
  };

  const removeLayer = (idx: number) => {
    if (layers.length <= 2 || idx === 0 || idx === layers.length - 1) return;
    const newLayers = [...layers];
    newLayers.splice(idx, 1);
    setLayers(newLayers);
  };

  const updateNodes = (idx: number, delta: number) => {
    const newLayers = [...layers];
    newLayers[idx] = Math.max(1, Math.min(8, newLayers[idx] + delta));
    setLayers(newLayers);
  };

  const runInference = () => {
    setActiveSignal(0);
    const iterate = (step: number) => {
      if (step >= layers.length) {
        setTimeout(() => setActiveSignal(-1), 500);
        return;
      }
      setActiveSignal(step);
      setTimeout(() => iterate(step + 1), 400);
    };
    iterate(0);
  };

  return (
    <div className="w-full h-full flex flex-col p-6 bg-black/40 overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-tokyo-purple" />
            <span className="text-xs font-bold text-zinc-100 uppercase tracking-widest">Neural Architecture Sandbox</span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">Dynamic Multi-Layer Perceptron (MLP)</span>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setLearningMode(!learningMode)}
            className={cn(
              "px-4 py-1.5 rounded-lg border transition-all flex items-center gap-2 text-[10px] font-bold",
              learningMode ? "bg-tokyo-green/10 border-tokyo-green text-tokyo-green shadow-[0_0_15px_rgba(158,206,106,0.2)]" : "bg-white/5 border-white/10 text-zinc-500"
            )}
          >
            <Activity className="w-3.5 h-3.5" /> BACKPROP_MODE
          </button>
          <button 
            onClick={runInference} 
            disabled={activeSignal !== -1}
            className="px-6 py-1.5 bg-tokyo-purple text-white rounded-lg font-black text-[10px] hover:brightness-110 transition-all disabled:opacity-30 shadow-lg shadow-tokyo-purple/20 flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> RUN_INFERENCE
          </button>
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center gap-12 md:gap-20 px-4">
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
                
                const isFiring = activeSignal === layerIdx || (learningMode && activeSignal === layerIdx + 1);
                
                return (
                  <motion.line 
                    key={`${layerIdx}-${nodeIdx}-${nextNodeIdx}`} 
                    x1={`${x1}%`} y1={`${y1 === Infinity ? 50 : y1}%`} 
                    x2={`${x2}%`} y2={`${y2 === Infinity ? 50 : y2}%`} 
                    stroke={learningMode ? "#9ece6a" : "#7aa2f7"} 
                    strokeWidth={isFiring ? "1.5" : "0.5"} 
                    initial={{ opacity: 0.1 }} 
                    animate={{ 
                      opacity: isFiring ? 0.6 : 0.1,
                      strokeWidth: isFiring ? 1.5 : 0.5
                    }} 
                    transition={{ duration: 0.3 }} 
                  />
                );
              });
            });
          })}
        </svg>

        {layers.map((count, layerIdx) => (
          <div key={layerIdx} className="flex flex-col gap-8 relative z-10">
            <div className="flex flex-col items-center gap-2 group">
               <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-black/60 p-1 rounded-md border border-white/10">
                  <button onClick={() => updateNodes(layerIdx, 1)} className="hover:text-tokyo-blue"><Plus className="w-3.5 h-3.5" /></button>
                  <button onClick={() => updateNodes(layerIdx, -1)} className="hover:text-tokyo-red"><Minus className="w-3.5 h-3.5" /></button>
                  {layerIdx > 0 && layerIdx < layers.length - 1 && (
                    <button onClick={() => removeLayer(layerIdx)} className="hover:text-white"><X className="w-3.5 h-3.5" /></button>
                  )}
               </div>
               <div className={cn(
                 "text-[8px] font-black uppercase tracking-tighter transition-colors",
                 activeSignal === layerIdx ? "text-tokyo-cyan" : "text-zinc-600"
               )}>
                  {layerIdx === 0 ? 'Input' : layerIdx === layers.length - 1 ? 'Output' : `L${layerIdx}`}
               </div>
            </div>
            <div className="flex flex-col gap-4">
              {Array.from({ length: count }).map((_, nodeIdx) => (
                <motion.div 
                  key={nodeIdx} 
                  animate={activeSignal === layerIdx ? { 
                    scale: [1, 1.4, 1], 
                    backgroundColor: learningMode ? "rgba(158, 206, 106, 0.9)" : "rgba(122, 162, 247, 0.9)",
                    boxShadow: learningMode ? "0 0 20px #9ece6a" : "0 0 20px #7aa2f7"
                  } : {}} 
                  transition={{ duration: 0.4 }} 
                  className="w-6 h-6 rounded-full border border-white/20 bg-white/5 flex items-center justify-center relative cursor-help group/node"
                >
                   <div className="absolute -right-12 bg-black/80 px-2 py-1 rounded text-[7px] text-zinc-400 opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none border border-white/5">
                     ACT: {Math.random().toFixed(4)}
                   </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
        
        <button 
          onClick={addLayer}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-zinc-500 hover:text-white"
          title="Add Hidden Layer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// --- Vision OS Control Center ---
const VisionEngine = () => {
  const [scanMode, setScanMode] = useState<"object" | "face" | "heatmap">("object");
  const [isProcessing, setIsProcessing] = useState(true);
  const [logs, setLogs] = useState<string[]>(["[SYS] Vision Kernel Initialized", "[SYS] Camera_01: ONLINE"]);

  useEffect(() => {
    const interval = setInterval(() => {
      const msgs = {
        object: ["Detected: macbook_pro (0.98)", "Detected: coffee_mug (0.84)", "Scanning peripherals..."],
        face: ["Subject_ID: RANGGA_01", "Expression: FOCUSED", "Auth: GRANTED"],
        heatmap: ["Temp_Critical: 42°C", "Thermal_Anomaly: NONE", "VRAM_USAGE: HIGH"]
      };
      const pool = msgs[scanMode];
      setLogs(prev => [pool[Math.floor(Math.random() * pool.length)], ...prev].slice(0, 5));
    }, 2000);
    return () => clearInterval(interval);
  }, [scanMode]);

  return (
    <div className="w-full h-full flex flex-col p-6 bg-[#0a0a0e] relative overflow-hidden">
       {/* UI Grid Overlay */}
       <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="w-full h-full border border-tokyo-blue/20" style={{ backgroundImage: 'radial-gradient(circle, #7aa2f7 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
       </div>

       <div className="flex items-center justify-between z-10 mb-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-lg bg-tokyo-blue/10 border border-tokyo-blue/20 flex items-center justify-center">
                <Scan className="w-6 h-6 text-tokyo-blue animate-pulse" />
             </div>
             <div className="text-left">
                <div className="text-xs font-bold text-white tracking-tighter">VISION_CORE_v4.2</div>
                <div className="text-[9px] font-mono text-tokyo-blue uppercase">Stream: 1080p @ 60FPS</div>
             </div>
          </div>
          <div className="flex gap-2">
             {(['object', 'face', 'heatmap'] as const).map(mode => (
               <button 
                 key={mode}
                 onClick={() => setScanMode(mode)}
                 className={cn(
                   "px-3 py-1 rounded text-[9px] font-mono border transition-all",
                   scanMode === mode ? "bg-tokyo-blue border-tokyo-blue text-ide-bg font-black" : "bg-black/40 border-white/10 text-zinc-500 hover:text-white"
                 )}
               >
                 {mode.toUpperCase()}
               </button>
             ))}
          </div>
       </div>

       <div className="flex-1 flex gap-6 z-10 min-h-0">
          <div className="flex-1 relative rounded-xl border border-white/10 bg-zinc-950 overflow-hidden group">
             {/* Simulated Camera Feed */}
             <div className="absolute inset-0 flex items-center justify-center">
                {scanMode === 'object' && (
                  <>
                    <motion.div 
                      animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute w-40 h-40 border-2 border-tokyo-blue rounded-lg"
                    >
                      <span className="absolute -top-6 left-0 bg-tokyo-blue text-ide-bg text-[8px] px-1 font-bold">DEVICE: LAPTOP [0.99]</span>
                    </motion.div>
                    <motion.div 
                      animate={{ x: [-20, 10, -20], y: [40, 60, 40] }}
                      transition={{ duration: 6, repeat: Infinity }}
                      className="absolute w-20 h-20 border-2 border-tokyo-cyan rounded-lg"
                    >
                      <span className="absolute -top-6 left-0 bg-tokyo-cyan text-ide-bg text-[8px] px-1 font-bold">OBJ: MUG [0.85]</span>
                    </motion.div>
                  </>
                )}
                {scanMode === 'face' && (
                  <div className="relative">
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-48 h-56 border-2 border-tokyo-green rounded-[40%] flex items-center justify-center"
                    >
                       <div className="w-full h-[1px] bg-tokyo-green/20 animate-scan" />
                    </motion.div>
                    <div className="absolute -right-32 top-0 space-y-2">
                       <div className="text-[7px] font-mono text-tokyo-green">PITCH: 1.2°</div>
                       <div className="text-[7px] font-mono text-tokyo-green">YAW: -0.4°</div>
                       <div className="text-[7px] font-mono text-tokyo-green">ROLL: 0.1°</div>
                    </div>
                  </div>
                )}
                {scanMode === 'heatmap' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-yellow-900/20 to-blue-900/40 animate-pulse" />
                )}
             </div>

             {/* Scanning Line */}
             <motion.div 
               animate={{ top: ['0%', '100%'] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-tokyo-blue to-transparent shadow-[0_0_15px_#7aa2f7] z-20"
             />
             
             <div className="absolute top-4 right-4 flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[8px] font-mono text-red-500">REC</span>
             </div>
          </div>

          <div className="w-48 flex flex-col gap-4">
             <div className="flex-1 bg-black/60 rounded-xl border border-white/5 p-4 font-mono text-[9px] space-y-2 overflow-hidden">
                <div className="text-zinc-600 border-b border-white/5 pb-2 mb-2 uppercase tracking-widest font-bold">Telemetry_Log</div>
                <AnimatePresence mode="popLayout">
                  {logs.map((log, i) => (
                    <motion.div 
                      key={log + i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-tokyo-blue/80 whitespace-nowrap"
                    >
                      &gt; {log}
                    </motion.div>
                  ))}
                </AnimatePresence>
             </div>
             <div className="h-32 bg-tokyo-blue/5 rounded-xl border border-tokyo-blue/10 p-3">
                <div className="text-[8px] text-tokyo-blue font-bold uppercase mb-2">Process_Load</div>
                <div className="space-y-2">
                   {[
                     { label: 'Neural', val: 74 },
                     { label: 'CUDA', val: 42 },
                     { label: 'Memory', val: 89 }
                   ].map(stat => (
                     <div key={stat.label}>
                       <div className="flex justify-between text-[7px] text-zinc-500 mb-1">
                          <span>{stat.label}</span>
                          <span>{stat.val}%</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.val}%` }}
                            className="h-full bg-tokyo-blue"
                          />
                       </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- Spatial Navigation Hub ---
const SpatialEngine = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const nodes = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
    z: Math.random() * 100,
    label: `Node_${i.toString().padStart(2, '0')}`
  })), []);

  return (
    <div className="w-full h-full flex flex-col p-8 bg-[#08080a] relative group">
       <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ rotateZ: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-[500px] h-[500px] border border-white/5 rounded-full"
          />
       </div>

       <div className="relative flex-1 flex items-center justify-center perspective-1000">
          <motion.div 
            animate={{ rotateY: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="w-full h-full relative preserve-3d"
          >
             {/* Connections */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible opacity-20">
                {nodes.map((node, i) => {
                  const nextNode = nodes[(i + 1) % nodes.length];
                  return (
                    <line 
                      key={i}
                      x1={`${node.x}%`} y1={`${node.y}%`}
                      x2={`${nextNode.x}%`} y2={`${nextNode.y}%`}
                      stroke="#bb9af7" strokeWidth="0.5"
                    />
                  );
                })}
             </svg>

             {nodes.map((node, i) => (
               <motion.div
                 key={i}
                 className={cn(
                   "absolute w-3 h-3 rounded-full border transition-all cursor-pointer",
                   activeNode === i ? "bg-tokyo-purple border-white shadow-[0_0_15px_#bb9af7]" : "bg-black border-tokyo-purple/40 hover:border-tokyo-purple"
                 )}
                 style={{ left: `${node.x}%`, top: `${node.y}%` }}
                 onClick={() => setActiveNode(i)}
                 whileHover={{ scale: 1.5 }}
               >
                  <AnimatePresence>
                     {activeNode === i && (
                       <motion.div 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="absolute -top-12 left-1/2 -translate-x-1/2 bg-tokyo-purple text-white text-[8px] font-mono px-2 py-1 rounded whitespace-nowrap z-30 shadow-xl"
                       >
                         {node.label}<br/>Z_AXIS: {node.z.toFixed(2)}
                       </motion.div>
                     )}
                  </AnimatePresence>
               </motion.div>
             ))}
          </motion.div>
       </div>

       <div className="absolute top-8 left-8 space-y-4">
          <div className="flex items-center gap-3">
             <Navigation2 className="w-5 h-5 text-tokyo-purple" />
             <div className="text-left">
                <div className="text-xs font-bold text-white uppercase tracking-wider">Spatial_Path_Optimizer</div>
                <div className="text-[9px] text-zinc-500 font-mono italic">Topology: Randomized Mesh</div>
             </div>
          </div>
          <div className="bg-black/60 p-4 rounded-xl border border-white/5 space-y-3">
             <div className="text-[8px] text-tokyo-purple font-black uppercase">Navigation_Metrics</div>
             <div className="flex gap-6">
                <div>
                   <div className="text-[7px] text-zinc-600 uppercase">Nodes</div>
                   <div className="text-xs font-mono text-zinc-300">12.0</div>
                </div>
                <div>
                   <div className="text-[7px] text-zinc-600 uppercase">Latency</div>
                   <div className="text-xs font-mono text-zinc-300">0.4ms</div>
                </div>
                <div>
                   <div className="text-[7px] text-zinc-600 uppercase">Sync</div>
                   <div className="text-xs font-mono text-zinc-300">99.9%</div>
                </div>
             </div>
          </div>
       </div>

       <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
          <div className="flex gap-2 pointer-events-auto">
             <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"><Plus className="w-4 h-4 text-zinc-400" /></button>
             <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"><Minus className="w-4 h-4 text-zinc-400" /></button>
          </div>
          <div className="text-right">
             <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Global_Coordinate_Ref</div>
             <div className="text-[8px] font-mono text-tokyo-purple">X: 142.04 | Y: -42.89 | Z: 12.00</div>
          </div>
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
                 <Database className="w-3 h-3" /> VRAM: 2.4GB
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500">
                 <Settings2 className="w-3 h-3" /> CUDA: v12.4
              </div>
           </div>
           <Typography variant="muted" className="text-[9px] font-mono text-tokyo-blue uppercase font-bold">XLA_JIT_OPTIMIZED</Typography>
        </div>
      </div>
    </div>
  );
};
