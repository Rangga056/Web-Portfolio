---
title: "BudgetFlow: PWA Tracking App"
tech: ["TypeScript", "Next.js", "Go", "PostgreSQL", "Dexie.js", "Recharts", "Docker"]
type: "PWA / Fullstack"
github_url: "https://github.com/Rangga056/budget-tracking-app"
image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200"
---

### Project Overview
**BudgetFlow** is a professional-grade financial management tool engineered for high reliability and accessibility. It features a robust **Offline-First Architecture**, allowing users to log transactions without an internet connection, which then automatically syncs once connectivity is restored.

### Key Features
- **Offline-First Engine:** Powered by **IndexedDB (Dexie.js)** for local transaction logging and immediate UI feedback.
- **Smart Sync Queue:** Automatically detects network restoration and syncs pending local writes to the backend server.
- **Analytics Dashboard:** Visual financial health summaries using **Recharts** (Pie and Line charts).
- **Transaction Intel:** Filterable history with support for receipt image attachments and metadata.
- **Category Management:** Customizable, color-coded, and icon-tagged categories for granular tracking.
- **Secure Auth Flow:** Implements HTTPOnly JWT cookies, email verification, and secure password reset.
- **Editorial-Grade UI:** Minimalist modern design with glassmorphic elements and staggered animations.
- **Docker-Ready:** Orchestrated setup for PostgreSQL, Go API, and Next.js frontend.

### Technical Deep Dive
The system is built with a **modular Go backend** handling high-performance API requests and a **Next.js 14 frontend** for a seamless user experience.

#### Architecture Highlights
- **Service Workers:** Enables full PWA capabilities, making the app installable on iOS and Android.
- **Sync Conflict Resolution:** Implemented logic to handle data merging during multi-device synchronization.

### Results
- Delivered a high-performance application with **< 1s initial load time**.
- Enabled 100% data integrity during intermittent connectivity via the custom sync engine.
