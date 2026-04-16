---
title: "Source: src/app/page.tsx"
tech: ["React", "Framer Motion", "TypeScript"]
type: "Source Code"
---

```tsx
"use client";

import { useShell } from "@/context/ShellContext";
import { Box } from "@/components/ui/Box";
import { Typography } from "@/components/ui/Typography";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Primary Portfolio Entry Point
 * Implements an IDE-like interface with dynamic buffer switching.
 */
export default function Home() {
  const { activeTabId, openTabs } = useShell();
  const activeTab = openTabs.find(t => t.id === activeTabId);

  return (
    <div className="h-full w-full bg-ide-bg">
      <AnimatePresence mode="wait">
        {!activeTab ? (
          <motion.div key="welcome" {...animations}>
            <WelcomeView />
          </motion.div>
        ) : (
          <motion.div key={activeTab.id} {...animations}>
            <FileView path={activeTab.path} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```
