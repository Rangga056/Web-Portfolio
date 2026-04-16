"use client";

import React from "react";

export const Logo = ({ size = 32, className = "" }: { size?: number; className?: string }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Circle (Sun) */}
      <circle cx="50" cy="50" r="45" stroke="#7aa2f7" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
      
      {/* Eclipse (Moon) */}
      <circle cx="45" cy="45" r="35" fill="#16161e" />
      
      {/* Glowing Edge */}
      <path 
        d="M80 50C80 66.5685 66.5685 80 50 80C33.4315 80 20 66.5685 20 50C20 33.4315 33.4315 20 50 20" 
        stroke="#7aa2f7" 
        strokeWidth="1.5" 
        strokeLinecap="round"
        className="animate-pulse"
      />

      {/* 404 Indicator (Technical detail) */}
      <text 
        x="50" 
        y="55" 
        fill="#7aa2f7" 
        fontSize="12" 
        fontFamily="monospace" 
        textAnchor="middle" 
        fontWeight="bold"
        className="opacity-80"
      >
        404
      </text>
    </svg>
  );
};
