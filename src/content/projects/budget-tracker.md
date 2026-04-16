---
title: "BudgetFlow: PWA Tracking App"
tech: ["Next.js 16", "Go Fiber", "PostgreSQL 16", "TypeScript", "Dexie.js", "Recharts", "Docker", "Bun"]
type: "PWA / Fullstack"
github_url: "https://github.com/Rangga056/budget-tracking-app"
images:
  - url: "https://raw.githubusercontent.com/Rangga056/budget-tracking-app/main/client/public/screenshots/landing-page-desktop.png"
    caption: "Landing Page - Desktop Experience"
  - url: "https://raw.githubusercontent.com/Rangga056/budget-tracking-app/main/client/public/screenshots/dashboard-page-desktop.png"
    caption: "Financial Dashboard - Real-time Analytics"
  - url: "https://raw.githubusercontent.com/Rangga056/budget-tracking-app/main/client/public/screenshots/transaction-page-mobile.png"
    caption: "Mobile Interface - Transaction Management"
  - url: "https://raw.githubusercontent.com/Rangga056/budget-tracking-app/main/client/public/screenshots/add-transaction-mobile.png"
    caption: "Mobile View - Quick Transaction Entry"
---

### Project Overview
**BudgetFlow** is a professional-grade financial management tool engineered for high reliability and accessibility. It features a robust **Offline-First Architecture**, allowing users to log transactions without an internet connection, which then automatically syncs once connectivity is restored.

### ✨ Key Features
- **Offline-First Engine:** Powered by **IndexedDB (Dexie.js)** for local transaction logging and immediate UI feedback.
- **Smart Sync Queue:** Automatically detects network restoration and syncs pending local writes to the backend server with conflict resolution.
- **Analytics Dashboard:** Visual financial health summaries using **Recharts** (Pie and Line charts) for data-driven insights.
- **Transaction Intel:** Full management system with support for filtering, browsing, and receipt image attachments.
- **Category Management:** Customizable, color-coded, and icon-tagged categories for granular tracking of income and expenses.
- **Secure Auth Flow:** Implements HTTPOnly JWT cookies, email verification, and secure password reset.
- **Modern UI/UX:** Minimalist design system with dark mode support, glassmorphic elements, and staggered animations.
- **Docker-Ready:** Simplified deployment using Docker Compose for the frontend, backend, and database.

### 🛠️ Technical Deep Dive
The system is built with a **high-performance Go Fiber backend** and a **Next.js 16 (App Router) frontend** running on the **Bun runtime**.

#### Architecture Highlights
- **Service Workers:** Enables full PWA capabilities, making the app installable on iOS and Android.
- **Frontend Stack:** Leverages **@tanstack/react-form** and **Zod** for robust state and form validation.
- **Backend Stack:** Uses **PostgreSQL 16** with the **pgx driver** for reliable data persistence.

### Results
- Delivered a high-performance application with optimized load times and offline reliability.
- Enabled 100% data integrity during intermittent connectivity via the custom sync engine.
