"use client";

import React from "react";
import { Box } from "@/components/ui/Box";
import { Typography } from "@/components/ui/Typography";
import { FileDown, Eye, ShieldCheck, Printer, ExternalLink } from "lucide-react";

export const PdfRenderer = ({ label }: { label: string }) => {
  const pdfUrl = "/Muhammad Rangga Miftahul Falah_CV.pdf";

  return (
    <div className="max-w-6xl mx-auto py-12 px-8 h-full flex flex-col">
      <div className="border-b border-ide-border pb-8 mb-12 flex justify-between items-end">
        <div className="space-y-2">
          <Typography as="h1" variant="title">Curriculum Vitae</Typography>
          <div className="flex items-center gap-3">
            <Typography variant="muted" className="text-tokyo-blue font-mono">{label}</Typography>
            <span className="text-zinc-700">•</span>
            <Typography variant="muted" className="text-zinc-500 text-[10px]">APPLICATION/PDF</Typography>
          </div>
        </div>
        <div className="flex gap-3">
           <a 
             href={pdfUrl} 
             target="_blank"
             rel="noopener noreferrer"
             className="flex items-center gap-2 px-4 py-2 bg-ide-sidebar border border-ide-border text-zinc-400 rounded hover:text-white hover:border-zinc-600 transition-all text-xs font-mono"
           >
             <ExternalLink className="w-3.5 h-3.5" />
             OPEN_EXTERNAL
           </a>
           <a 
             href={pdfUrl} 
             download 
             className="flex items-center gap-2 px-4 py-2 bg-tokyo-blue/10 text-tokyo-blue border border-tokyo-blue/20 rounded hover:bg-tokyo-blue/20 transition-all text-xs font-mono font-bold"
           >
             <FileDown className="w-4 h-4" />
             DOWNLOAD_PDF
           </a>
        </div>
      </div>

      <Box variant="bordered" padding="none" className="flex-1 bg-black/40 rounded-xl overflow-hidden border-zinc-800 shadow-2xl min-h-[800px] group relative">
        <div className="absolute inset-0 bg-tokyo-blue/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        <iframe 
          src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
          className="w-full h-full border-none opacity-90 group-hover:opacity-100 transition-opacity"
          title="Resume Preview"
        />
      </Box>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-ide-sidebar/30 border border-ide-border rounded-lg space-y-3">
          <div className="flex items-center gap-2 text-tokyo-blue">
            <ShieldCheck className="w-4 h-4" />
            <Typography variant="muted" className="text-[10px] uppercase tracking-widest font-bold">Verification</Typography>
          </div>
          <Typography variant="body" className="text-sm text-zinc-400">
            Document integrity verified via local filesystem check.
          </Typography>
        </div>
        
        <div className="p-6 bg-ide-sidebar/30 border border-ide-border rounded-lg space-y-3">
          <div className="flex items-center gap-2 text-tokyo-green">
            <Eye className="w-4 h-4" />
            <Typography variant="muted" className="text-[10px] uppercase tracking-widest font-bold">Permissions</Typography>
          </div>
          <Typography variant="body" className="text-sm text-zinc-400">
            Read-only access granted for guest sessions.
          </Typography>
        </div>

        <div className="p-6 bg-ide-sidebar/30 border border-ide-border rounded-lg space-y-3">
          <div className="flex items-center gap-2 text-tokyo-purple">
            <Printer className="w-4 h-4" />
            <Typography variant="muted" className="text-[10px] uppercase tracking-widest font-bold">Output</Typography>
          </div>
          <Typography variant="body" className="text-sm text-zinc-400">
            Optimized for standard A4 physical printing.
          </Typography>
        </div>
      </div>
    </div>
  );
};
