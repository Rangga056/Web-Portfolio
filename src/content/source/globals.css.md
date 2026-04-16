---
title: "Source: src/app/globals.css"
tech: ["Tailwind CSS", "CSS Variables", "Tokyo Night"]
type: "Style Definition"
---

```css
@import "tailwindcss";

:root {
  --background: #1a1b26;
  --foreground: #c0caf5;
  --ide-bg: #1a1b26;
  --ide-sidebar: #16161e;
  --ide-accent: #7aa2f7;
  --ide-border: #292e42;
}

@theme inline {
  --color-ide-bg: var(--ide-bg);
  --color-ide-sidebar: var(--ide-sidebar);
  --color-ide-accent: var(--ide-accent);
}

@utility glass {
  background-color: var(--ide-glass-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--ide-glass-border);
}
```
