"use client";

import React from "react";
import { 
  Globe, Layout, Database, 
  Cpu, Wrench, Shield,
  Braces, GitBranch, Box, Workflow
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillIconProps {
  name: string;
  className?: string;
}

export const SkillIcon = ({ name, className = "w-5 h-5" }: SkillIconProps) => {
  const n = name.toLowerCase();

  // --- Specialized SVG Mappings (Mocking high-fidelity icons) ---
  
  if (n.includes("next.js") || n.includes("nextjs")) {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r="64" fill="white"/>
        <path d="M106.667 103.88L55.0827 38.4H42.6667V89.6H51.2V51.52L96.8533 108.971C100.224 107.52 103.552 105.813 106.667 103.88Z" fill="black"/>
        <path d="M85.3333 38.4V89.6H76.8V38.4H85.3333Z" fill="black"/>
      </svg>
    );
  }

  if (n.includes("react")) {
    return (
      <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    );
  }

  if (n.includes("typescript") || n === "ts") {
    return (
      <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" fill="#3178c6" rx="16"/>
        <path d="M82.8 91.5l-6.4-1.1c-1.3-.2-2-.9-2-2v-4.1c0-1.1.7-1.8 2-2l6.4-1.1c1.3-.2 2.4.6 2.4 1.8v4.6c0 1.2-1.1 2-2.4 1.8zm-19.3-33.8h5.3v27.2c0 3.3-1.6 5.8-4.8 7.3l-5.6 2.6c-2.4 1.1-4.8.6-4.8-2.1v-4.3c0-1.8 1.4-2.8 3.1-3.6l3.5-1.6c.9-.4 1.3-1.1 1.3-2.1v-23.4z" fill="#fff"/>
      </svg>
    );
  }

  if (n.includes("javascript") || n === "js") {
    return (
      <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" fill="#f7df1e" rx="16"/>
        <path d="M75.3 98.7c-2.8 0-5.2-1.2-7.2-2.8l3.6-5.6c1.6 1.2 2.8 2 4.4 2 2.4 0 4-1.2 4-3.6v-25.2h8v25.2c0 6.8-4.8 10-9.2 10zm25.6 0c-4.4 0-8.8-2-11.2-4.8l4.4-5.2c1.6 2 3.6 3.2 6 3.2 2.4 0 4-1.2 4-3.2 0-2-1.6-2.8-4.8-4l-1.6-.8c-4.8-2-8-4.4-8-9.6 0-4.8 3.6-9.2 10.4-9.2 4 0 7.6 1.6 10 4l-3.6 5.2c-1.6-1.6-3.2-2.4-5.2-2.4-2.4 0-3.6 1.2-3.6 2.8 0 2 1.6 2.8 5.2 4l1.6.8c5.2 2 8 4.8 8 9.6 0 5.6-4.4 9.6-11.2 9.6z" fill="#000"/>
      </svg>
    );
  }

  if (n.includes("python")) {
    return (
      <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path d="M64 0C32.4 0 34.2 13.7 34.2 13.7l.1 14.1h30.2v4.3H22.7S0 29.5 0 62.4s19.8 32.5 19.8 32.5h11.8v-16.5c0-10.4 8.5-18.9 18.9-18.9h28.1c10.4 0 18.9-8.5 18.9-18.9V13.7S98.2 0 64 0zm-15.5 8.9c2.4 0 4.3 1.9 4.3 4.3s-1.9 4.3-4.3 4.3-4.3-1.9-4.3-4.3 1.9-4.3 4.3-4.3z" fill="#3776ab"/>
        <path d="M64 128c31.6 0 29.8-13.7 29.8-13.7l-.1-14.1H63.5v-4.3h41.8S128 98.5 128 65.6s-19.8-32.5-19.8-32.5h-11.8v16.5c0 10.4-8.5 18.9-18.9 18.9H49.4c-10.4 0-18.9 8.5-18.9 18.9v26.9S30 128 64 128zm15.5-8.9c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3z" fill="#ffd343"/>
      </svg>
    );
  }

  if (n.includes("go")) {
    return (
      <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path d="M50.4 75.8c-7.9 0-13.9-3.7-16.8-8.8l10.3-4.5c1.4 2.7 4 4.5 7.1 4.5 3.8 0 6.6-2.5 6.6-6.3v-.3c0-3.3-2.3-5.5-8-5.5h-4.3V44.2h4.1c4.5 0 6.8-2 6.8-4.9v-.3c0-2.8-2-4.5-5.1-4.5-2.7 0-5.1 1.4-6.3 3.6l-10-5.2c2.5-4.8 8.1-7.5 16-7.5 10.3 0 16.7 4.9 16.7 12.3v.3c0 4.1-2.3 7.3-6.1 9.2 4.9 1.8 8.2 5.5 8.2 10.6v.3c.1 8.8-7.7 13.8-19.2 13.8zM92.7 75.8c-12.8 0-19.8-8.6-19.8-25.2v-.3c0-16.6 7-25.2 19.8-25.2s19.8 8.6 19.8 25.2v.3c0 16.6-7 25.2-19.8 25.2zm0-9.6c5.2 0 8.3-4.9 8.3-15.6v-.3c0-10.7-3.1-15.6-8.3-15.6s-8.3 4.9-8.3 15.6v.3c0 10.7 3.1 15.6 8.3 15.6z" fill="#00add8"/>
      </svg>
    );
  }

  if (n.includes("postgres") || n.includes("postgresql")) {
    return (
      <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path d="M121.2 58.7c-3.1-12.5-12.5-21.9-25.1-25-6.3-1.6-12.5-1.6-18.8 0 1.6-3.1 3.1-6.3 6.3-7.8 6.3-4.7 14.1-4.7 20.4-3.1 4.7 1.6 9.4-1.6 10.9-6.3s-1.6-9.4-6.3-10.9c-12.5-3.1-25.1-1.6-34.5 6.3-6.3 6.3-9.4 14.1-9.4 21.9H55.5c0-12.5-6.3-23.5-15.7-31.3-9.4-7.8-23.5-10.9-34.5-7.8C2.2 4.7-1 12.5.5 15.7s10.9 4.7 15.7 3.1c6.3-1.6 12.5-1.6 18.8 0-1.6 3.1-3.1 6.3-6.3 7.8-6.3 4.7-14.1 4.7-20.4 3.1-4.7-1.6-9.4 1.6-10.9 6.3-1.6 4.7 1.6 9.4 6.3 10.9 12.5 3.1 25.1 1.6 34.5-6.3 3.1-3.1 6.3-6.3 7.8-9.4 6.3 7.8 9.4 15.7 9.4 25.1v15.7H43c-6.3 0-12.5 3.1-15.7 7.8-3.1 6.3-3.1 12.5 0 18.8 3.1 6.3 9.4 9.4 15.7 9.4h37.6c12.5 0 21.9-6.3 28.2-15.7 4.7-9.4 6.3-21.9 4.7-32.9l7.7-7.8z" fill="#336791"/>
      </svg>
    );
  }

  // --- Fallback Icon Selection ---
  if (n.includes("node")) return <Globe className={cn(className, "text-tokyo-green")} />;
  if (n.includes("html") || n.includes("css")) return <Layout className={cn(className, "text-tokyo-orange")} />;
  if (n.includes("sql") || n.includes("database") || n.includes("mongodb") || n.includes("supabase")) return <Database className={cn(className, "text-tokyo-purple")} />;
  if (n.includes("n8n") || n.includes("automation") || n.includes("agent")) return <Workflow className={cn(className, "text-tokyo-cyan")} />;
  if (n.includes("tailwind")) return <Braces className={cn(className, "text-tokyo-blue")} />;
  if (n.includes("git")) return <GitBranch className={cn(className, "text-tokyo-red")} />;
  if (n.includes("prisma") || n.includes("zod")) return <Shield className={cn(className, "text-tokyo-blue")} />;
  if (n.includes("vercel") || n.includes("postman")) return <Box className={cn(className, "text-tokyo-comment")} />;
  
  return <Cpu className={cn(className, "text-tokyo-blue opacity-50")} />;
};
