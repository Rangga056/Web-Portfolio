import { FileType } from "@/context/ShellContext";

export interface NavItem {
  id: string;
  label: string;
  type: FileType;
  path: string;
  children?: NavItem[];
}

export const NAVIGATION_TREE: NavItem[] = [
  {
    id: "me",
    label: "me",
    type: "folder",
    path: "/me",
    children: [
      { id: "about", label: "about.md", type: "markdown", path: "me/about.md" },
      { id: "github", label: "github.json", type: "json", path: "me/github.json" },
      { id: "achievements", label: "achievements.json", type: "json", path: "me/achievements.json" },
      { id: "skills", label: "skills.json", type: "json", path: "me/skills.json" },
      { id: "resume", label: "resume.pdf", type: "pdf", path: "resume.pdf" },
    ],
  },
  {
    id: "projects",
    label: "projects",
    type: "folder",
    path: "/projects",
    children: [
      { id: "airbnb", label: "airbnb-clone.md", type: "markdown", path: "projects/airbnb-clone.md" },
      { id: "estate", label: "eclipse-estate.md", type: "markdown", path: "projects/eclipse-estate.md" },
      { id: "budget", label: "budget-tracker.md", type: "markdown", path: "projects/budget-tracker.md" },
      { id: "summit", label: "eclipse-summit.md", type: "markdown", path: "projects/eclipse-summit.md" },
      { id: "sentiment", label: "sentiment-dashboard.md", type: "markdown", path: "projects/sentiment-dashboard.md" },
      { id: "automation", label: "ai-automation.md", type: "markdown", path: "projects/automation.md" },
      { id: "portfolio", label: "ultimate-portfolio.md", type: "markdown", path: "projects/ultimate-portfolio.md" },
    ],
  },
  {
    id: "lab",
    label: "lab",
    type: "folder",
    path: "/lab",
    children: [
      { id: "matrix", label: "matrix-rain.ts", type: "code", path: "lab/matrix-rain.ts" },
      { id: "sorting", label: "sort-visualizer.go", type: "code", path: "lab/sort-visualizer.go" },
      { id: "neural", label: "neural-nodes.py", type: "code", path: "lab/neural-nodes.py" },
      { id: "vision", label: "computer-vision.py", type: "code", path: "lab/computer-vision.py" },
      { id: "spatial", label: "spatial-ai.ts", type: "code", path: "lab/spatial-ai.ts" },
    ],
  },
];
