"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";

export type FileType = "markdown" | "json" | "code" | "folder" | "pdf";
export type SidebarView = "explorer" | "search" | "git" | "extensions" | "settings" | "profile";
export type ThemeType = "tokyo-night" | "catppuccin" | "gruvbox" | "nord" | "midnight";

export interface Tab {
  id: string;
  label: string;
  path: string;
  type: FileType;
  contentId?: string;
}

interface ShellContextType {
  activeTabId: string | null;
  openTabs: Tab[];
  setActiveTab: (tab: Tab) => void;
  closeTab: (tabId: string) => void;
  closeAllTabs: () => void;
  isTerminalOpen: boolean;
  toggleTerminal: () => void;
  terminalHeight: number;
  setTerminalHeight: (h: number) => void;
  activeSidebarView: SidebarView;
  setSidebarView: (view: SidebarView) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  sidebarWidth: number;
  setSidebarWidth: (w: number) => void;
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ShellContext = createContext<ShellContextType | undefined>(undefined);

export function ShellProvider({ children }: { children: React.ReactNode }) {
  const [openTabs, setOpenTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(300);
  const [activeSidebarView, setActiveSidebarView] = useState<SidebarView>("explorer");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [theme, setThemeState] = useState<ThemeType>("tokyo-night");

  useEffect(() => {
    const savedTheme = localStorage.getItem("eclipse-theme") as ThemeType;
    if (savedTheme) setThemeState(savedTheme);
    
    // Default mobile sidebar closed
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem("eclipse-theme", newTheme);
  }, []);

  const setActiveTab = useCallback((tab: Tab) => {
    setOpenTabs((prev) => {
      const exists = prev.find((t) => t.id === tab.id);
      if (exists) return prev;
      return [...prev, tab];
    });
    setActiveTabId(tab.id);
    if (window.innerWidth > 1024 && !isSidebarOpen) setIsSidebarOpen(true);
  }, [isSidebarOpen]);

  const closeTab = useCallback((tabId: string) => {
    setOpenTabs((prev) => {
      const remaining = prev.filter((t) => t.id !== tabId);
      if (activeTabId === tabId && remaining.length > 0) {
        setActiveTabId(remaining[remaining.length - 1].id);
      } else if (remaining.length === 0) {
        setActiveTabId(null);
      }
      return remaining;
    });
  }, [activeTabId]);

  const closeAllTabs = useCallback(() => {
    setOpenTabs([]);
    setActiveTabId(null);
  }, []);

  const toggleTerminal = useCallback(() => {
    setIsTerminalOpen(prev => !prev);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const setSidebarView = useCallback((view: SidebarView) => {
    if (activeSidebarView === view && isSidebarOpen) {
      setIsSidebarOpen(false);
    } else {
      setActiveSidebarView(view);
      setIsSidebarOpen(true);
    }
  }, [activeSidebarView, isSidebarOpen]);

  const value = useMemo(() => ({
    activeTabId,
    openTabs,
    setActiveTab,
    closeTab,
    closeAllTabs,
    isTerminalOpen,
    toggleTerminal,
    terminalHeight,
    setTerminalHeight,
    activeSidebarView,
    setSidebarView,
    isSidebarOpen,
    toggleSidebar,
    sidebarWidth,
    setSidebarWidth,
    theme,
    setTheme,
  }), [activeTabId, openTabs, setActiveTab, closeTab, closeAllTabs, isTerminalOpen, toggleTerminal, terminalHeight, activeSidebarView, setSidebarView, isSidebarOpen, toggleSidebar, sidebarWidth, theme, setTheme]);

  return (
    <ShellContext.Provider value={value}>
      {children}
    </ShellContext.Provider>
  );
}

export function useShell() {
  const context = useContext(ShellContext);
  if (context === undefined) {
    throw new Error("useShell must be used within a ShellProvider");
  }
  return context;
}
