# 🚀 Ultimate Portfolio V2

A high-fidelity, IDE-inspired professional portfolio engineered with **Next.js 15**, **TypeScript**, and **Framer Motion**. This project features a recursive system-like interface, dynamic buffer management, and integrated AI automation showcases.

## 🛠 Technical Stack

- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS 4
- **Animations:** Framer Motion (staggered layouts, spring physics)
- **Data Fetching:** Octokit (GitHub API integration)
- **Content:** Markdown (gray-matter), JSON-based dynamic streams
- **Icons:** Lucide React
- **Theming:** CSS Variables with multi-theme support (Tokyo Night, Gruvbox, Nord, etc.)

## ✨ Core Features

- **IDE-Inspired Interface:** Sidebars, tabbed buffers, terminal emulator, and command palette (⌘+K).
- **GitHub Integration:** Live profile stats, activity timeline, and an interactive contribution heatmap with year selection.
- **Dynamic Content Engine:** Seamlessly renders Markdown projects, JSON data, and local PDF buffers.
- **Scientific Workspace (Lab):** Visualizers for algorithms (Sorting), Neural Networks, and Computer Vision.
- **Offline-First Ready:** Architecture designed for high-speed delivery and reliability.
- **Responsive Terminal:** Fully functional mock shell with custom commands (`help`, `ls`, `open`, `whoami`).

## 📁 Project Structure

```text
├── src/
│   ├── app/            # Next.js App Router & API routes
│   ├── components/     # UI, Content Renderers, Shell Components
│   ├── constants/      # Navigation tree & static configs
│   ├── context/        # Global Shell state management
│   ├── lib/            # Utilities & API wrappers
│   └── content/        # Markdown & JSON source buffers
├── public/             # Static assets (PDFs, SVGs)
└── ultimate-portofolio # Root directory configuration
```

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Rangga056/ultimate-portofolio.git
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env` file and add your GitHub token for live stats:
    ```env
    GITHUB_TOKEN=your_token_here
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with 💙 by [Muhammad Rangga Miftahul Falah](https://github.com/Rangga056)
