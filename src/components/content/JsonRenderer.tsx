"use client";

import React, { useState } from "react";

import { Box } from "@/components/ui/Box";
import { Typography } from "@/components/ui/Typography";
import {
  Star,
  ExternalLink,
  Code2,
  Binary,
  Database,
  Wrench,
  Languages,
  Terminal,
  ShieldCheck,
  ChevronRight,
  Info,
  Users,
  MapPin,
  Award,
  Trophy,
  Bookmark,
  CheckCircle2,
  GitFork,
  Globe,
  Eye,
  GitCommit,
  GitPullRequest,
  CircleDot,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { useShell } from "@/context/ShellContext";
import { motion, AnimatePresence } from "framer-motion";
import { NAVIGATION_TREE } from "@/constants/navigation";
import { GitHubCalendar } from 'react-github-calendar';

export const JsonRenderer = ({ content }: { content: string }) => {
  const [viewMode, setViewMode] = useState<"visual" | "raw">("visual");
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const { setActiveTab } = useShell();

  let data: any;
  try {
    data = JSON.parse(content);
  } catch {
    return (
      <div className="p-8 text-tokyo-red font-mono text-sm">
        Error: Buffer parse failure. Invalid JSON structure.
      </div>
    );
  }

  const isGithub = data.username === "Rangga056";
  const isSkills = data.programming_languages && data.frameworks_and_databases;
  const isAchievements =
    Array.isArray(data) && data.length > 0 && data[0].organization;

  // Helper to find project tab for a repo
  const getProjectTab = (repoName: string) => {
    const projectsFolder = NAVIGATION_TREE.find((n) => n.id === "projects");
    return projectsFolder?.children?.find(
      (p) =>
        p.id.toLowerCase().includes(repoName.toLowerCase()) ||
        repoName.toLowerCase().includes(p.id.toLowerCase()),
    );
  };

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [repoPage, setRepoPage] = useState(0);
  const repoPerPage = 6;
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2022 + 1 }, (_, i) => currentYear - i);

  // --- GitHub Dashboard Layout (Enhanced with Heatmap and Activity) ---
  if (isGithub && viewMode === "visual") {
    const totalPages = Math.ceil(data.public_repositories.length / repoPerPage);
    const paginatedRepos = data.public_repositories.slice(
      repoPage * repoPerPage,
      (repoPage + 1) * repoPerPage
    );

    return (
      <div className="max-w-6xl mx-auto py-8 md:py-12 px-6 md:px-8 space-y-12 pb-20 md:pb-12 text-left overflow-x-hidden">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-ide-border pb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-[2px] bg-gradient-to-br from-tokyo-blue to-tokyo-purple shadow-2xl shrink-0">
                <div className="w-full h-full rounded-full bg-ide-bg flex items-center justify-center overflow-hidden border-2 border-ide-bg">
                  <img
                    src={data.avatar_url}
                    alt={data.alias}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Typography
                  as="h1"
                  variant="title"
                  className="text-3xl md:text-5xl"
                >
                  {data.alias}
                </Typography>
                <Typography
                  variant="muted"
                  className="text-tokyo-blue font-mono text-sm md:text-base"
                >
                  @{data.username}
                </Typography>
              </div>
            </div>
            <Typography
              variant="body"
              className="max-w-2xl text-lg text-zinc-300 leading-relaxed font-sans"
            >
              {data.bio}
            </Typography>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
                <MapPin className="w-3.5 h-3.5" /> {data.location}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
                <Globe className="w-3.5 h-3.5" />{" "}
                {data.education || "System Information @ Universitas Nasional"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-auto">
            {[
              {
                label: "Repos",
                val: data.stats.repositories,
                color: "text-tokyo-blue",
              },
              {
                label: "Stars",
                val: data.stats.stars,
                color: "text-tokyo-yellow",
              },
              {
                label: "Followers",
                val: data.stats.followers,
                color: "text-tokyo-green",
              },
              {
                label: "Following",
                val: data.stats.following,
                color: "text-tokyo-purple",
              },
            ].map((stat) => (
              <Box
                key={stat.label}
                variant="bordered"
                padding="sm"
                className="bg-black/20 text-center rounded-xl py-4 flex flex-col items-center min-w-[100px]"
              >
                <Typography
                  variant="title"
                  className={cn("text-2xl", stat.color)}
                >
                  {stat.val}
                </Typography>
                <Typography
                  variant="muted"
                  className="text-[9px] uppercase tracking-widest font-bold"
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </div>
        </div>

        {/* Top Repositories Section */}
        <div className="space-y-6">
          <Typography as="div" variant="muted" className="uppercase text-[10px] tracking-widest font-bold flex items-center gap-2">
            <Star className="w-3 h-3 text-tokyo-yellow" />
            Featured Repositories
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.top_repositories?.map((repo: any) => {
              const projectTab = getProjectTab(repo.name);
              return (
                <Box key={repo.name} variant="bordered" className="bg-black/20 hover:border-tokyo-blue/40 transition-all p-0 rounded-xl space-y-0 overflow-hidden group flex flex-col">
                  {repo.image && (
                    <div className="w-full aspect-video overflow-hidden border-b border-ide-border relative bg-ide-bg/50">
                      <img 
                        src={repo.image} 
                        alt={repo.name} 
                        className={cn(
                          "w-full h-full transition-transform duration-500 group-hover:scale-105",
                          repo.layout === "mobile" || (repo.image && repo.image.includes('mobile')) ? "object-contain p-2" : "object-cover"
                        )}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-[10px] text-white font-mono flex items-center gap-1">
                          <Eye className="w-3 h-3" /> Previewing Workspace
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col space-y-3">
                    <div className="flex justify-between items-start">
                      <Typography variant="body" className="font-bold text-zinc-100">{repo.name}</Typography>
                      <div className="flex items-center gap-1 text-tokyo-yellow">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-[10px] font-mono">{repo.stars}</span>
                      </div>
                    </div>
                    <Typography variant="muted" className="text-xs line-clamp-2 h-10">{repo.description}</Typography>
                    
                    <div className="flex items-center gap-4 pt-2 mt-auto">
                      <span className="text-[9px] font-mono text-tokyo-blue uppercase font-bold shrink-0">{repo.language}</span>
                      
                      <div className="flex-1 flex justify-end items-center gap-3">
                        {projectTab && (
                          <button 
                            onClick={() => setActiveTab({
                              id: projectTab.id,
                              label: projectTab.label,
                              path: projectTab.path,
                              type: projectTab.type as any
                            })}
                            className="text-[10px] font-bold text-tokyo-cyan hover:text-white flex items-center gap-1 transition-colors uppercase tracking-widest"
                          >
                            View Buffer
                          </button>
                        )}
                        <a 
                          href={repo.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-zinc-500 hover:text-tokyo-blue transition-colors p-1.5 hover:bg-tokyo-blue/10 rounded-lg"
                          title="Open on GitHub"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </Box>
              );
            })}
          </div>
        </div>

        {/* Contribution Calendar */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Typography as="div" variant="muted" className="uppercase text-[10px] tracking-widest font-bold flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-tokyo-green" />
              Contribution Heatmap
            </Typography>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="bg-ide-sidebar border border-ide-border rounded text-[10px] text-zinc-400 p-1.5 outline-none font-mono focus:border-tokyo-blue transition-colors"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <Box
            variant="bordered"
            padding="lg"
            className="bg-black/20 rounded-2xl flex justify-center border-zinc-800/50 overflow-x-auto no-scrollbar"
          >
            <GitHubCalendar
              username="Rangga056"
              year={selectedYear}
              colorScheme="dark"
              theme={{
                dark: ["#16161e", "#2e3c64", "#445c92", "#7aa2f7", "#7dcfff"],
              }}
              fontSize={12}
              blockSize={12}
              blockMargin={4}
            />
          </Box>
        </div>

        {/* Contribution Activity Timeline & All Repos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <Typography as="div" variant="muted" className="uppercase text-[10px] tracking-widest font-bold flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-tokyo-blue" />
              Latest Activity
            </Typography>
            <div className="space-y-4 border-l border-ide-border pl-6 relative">
              {data.events?.map((e: any, i: number) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-ide-bg border-2 border-tokyo-blue group-hover:scale-125 transition-transform" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {e.type === "PushEvent" ? (
                        <GitCommit className="w-3 h-3 text-tokyo-green" />
                      ) : e.type === "PullRequestEvent" ? (
                        <GitPullRequest className="w-3 h-3 text-tokyo-purple" />
                      ) : (
                        <CircleDot className="w-3 h-3 text-tokyo-blue" />
                      )}
                      <span className="text-[11px] font-bold text-zinc-300">
                        {e.type.replace("Event", "")} in{" "}
                        <span className="text-tokyo-blue">
                          {e.repo.split("/")[1]}
                        </span>
                      </span>
                    </div>
                    <Typography
                      variant="muted"
                      className="text-[10px] font-mono"
                    >
                      {new Date(e.date).toLocaleDateString()} •{" "}
                      {e.payload?.commits?.[0]?.message ||
                        "Modified repository resources"}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Typography as="div" variant="muted" className="uppercase text-[10px] tracking-widest font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-tokyo-yellow" />
                Technical Repositories
              </Typography>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button 
                    disabled={repoPage === 0}
                    onClick={() => setRepoPage(prev => prev - 1)}
                    className="p-1 rounded hover:bg-white/5 disabled:opacity-20 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                  </button>
                  <span className="text-[10px] font-mono text-zinc-500">{repoPage + 1} / {totalPages}</span>
                  <button 
                    disabled={repoPage >= totalPages - 1}
                    onClick={() => setRepoPage(prev => prev + 1)}
                    className="p-1 rounded hover:bg-white/5 disabled:opacity-20 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => setViewMode("raw")}
                  className="text-[10px] font-mono text-zinc-600 hover:text-tokyo-blue transition-colors"
                >
                  &lt;raw_json /&gt;
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {paginatedRepos.map((repo: any) => {
                const projectTab = getProjectTab(repo.name);
                return (
                  <div
                    key={repo.name}
                    className="flex items-center justify-between p-3 rounded bg-black/20 border border-ide-border hover:border-tokyo-blue/30 group transition-all"
                  >
                    <div className="flex flex-col gap-1 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <Typography
                          variant="body"
                          className="font-bold text-sm text-zinc-200 truncate"
                        >
                          {repo.name}
                        </Typography>
                        <div className="w-1.5 h-1.5 rounded-full bg-tokyo-blue/40" />
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">
                          {repo.language}
                        </span>
                      </div>
                      <Typography
                        variant="muted"
                        className="text-[10px] truncate max-w-[300px]"
                      >
                        {repo.description || "Technical source buffer."}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-3">
                      {projectTab && (
                        <button
                          onClick={() =>
                            setActiveTab({
                              id: projectTab.id,
                              label: projectTab.label,
                              path: projectTab.path,
                              type: projectTab.type as any,
                            })
                          }
                          className="px-2.5 py-1 bg-tokyo-blue/10 text-tokyo-blue text-[9px] font-bold rounded border border-tokyo-blue/20 hover:bg-tokyo-blue/20 transition-all uppercase tracking-widest"
                        >
                          VIEW_BUFFER
                        </button>
                      )}
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-zinc-600 hover:text-tokyo-blue transition-colors hover:bg-tokyo-blue/10 rounded-lg"
                        title="View Repository"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Achievements Hub (Enhanced with PDF Toggles) ---
  if (isAchievements && viewMode === "visual") {
    return (
      <div className="max-w-5xl mx-auto py-16 px-10 space-y-12 pb-24 md:pb-16 text-left">
        <div className="border-b border-ide-border pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="px-2 py-0.5 bg-tokyo-green text-ide-bg text-[9px] font-black rounded-sm uppercase tracking-tighter">
                Verified_Awards
              </div>
              <Typography
                variant="muted"
                className="text-[10px] font-mono tracking-widest text-zinc-600"
              >
                CERT_ID: 0X_EXCELLENCE
              </Typography>
            </div>
            <Typography
              as="h1"
              variant="title"
              className="text-5xl tracking-tighter font-black"
            >
              Honors & <span className="text-tokyo-green">Certs</span>
            </Typography>
            <Typography
              variant="body"
              className="text-zinc-500 max-w-xl text-lg leading-relaxed"
            >
              Technical milestones and professional certifications verified via
              system-native PDF preview.
            </Typography>
          </div>
          <button
            onClick={() => setViewMode("raw")}
            className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 hover:text-tokyo-blue transition-colors px-4 py-2 border border-ide-border rounded"
          >
            <Terminal className="w-3 h-3" /> INSPECT_BUFFER
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10">
          {data.map((item: any) => (
            <div key={item.id} className="space-y-6">
              <Box
                variant="bordered"
                padding="lg"
                className="bg-ide-sidebar/60 border-ide-border rounded-xl flex flex-col md:flex-row gap-8 items-start hover:border-tokyo-blue/30 transition-all group"
              >
                <div
                  className={cn(
                    "w-16 h-16 rounded-xl flex items-center justify-center shrink-0 border border-ide-border shadow-inner",
                    item.type === "award"
                      ? "bg-tokyo-yellow/10 text-tokyo-yellow"
                      : "bg-tokyo-blue/10 text-tokyo-blue",
                  )}
                >
                  {item.type === "award" ? (
                    <Trophy className="w-8 h-8" />
                  ) : (
                    <ShieldCheck className="w-8 h-8" />
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <Typography
                        variant="title"
                        className="text-2xl text-white mb-1"
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="muted"
                        className="text-tokyo-blue font-mono text-xs uppercase tracking-widest"
                      >
                        {item.organization} • {item.date}
                      </Typography>
                    </div>
                    <div className="flex gap-2">
                      {item.image && (
                        <button
                          onClick={() =>
                            setPreviewFile(
                              previewFile === item.image ? null : item.image,
                            )
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-tokyo-blue/10 border border-tokyo-blue/30 text-tokyo-blue rounded-lg hover:bg-tokyo-blue/20 transition-all text-xs font-mono"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          {previewFile === item.image
                            ? "CLOSE_PREVIEW"
                            : "VIEW_DOCUMENT"}
                        </button>
                      )}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-black/40 border border-ide-border rounded-lg hover:text-tokyo-blue transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <Typography
                    variant="body"
                    className="text-zinc-400 leading-relaxed text-base"
                  >
                    {item.description}
                  </Typography>

                  <AnimatePresence>
                    {previewFile === item.image && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 600, opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="w-full mt-6 rounded-xl overflow-hidden border border-ide-border bg-black/40 shadow-2xl"
                      >
                        <iframe
                          src={`${item.image}#toolbar=0`}
                          className="w-full h-full border-none opacity-90"
                          title="Credential Preview"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Box>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- Skills Layout (Arsenal) ---
  if (isSkills && viewMode === "visual") {
    const categories = [
      {
        key: "programming_languages",
        label: "Core Logic",
        icon: Binary,
        color: "text-tokyo-blue",
      },
      {
        key: "frameworks_and_databases",
        label: "Systems & Data",
        icon: Database,
        color: "text-tokyo-purple",
      },
      {
        key: "tools",
        label: "Engineering Workflow",
        icon: Wrench,
        color: "text-tokyo-green",
      },
      {
        key: "languages",
        label: "Human Interface",
        icon: Languages,
        color: "text-tokyo-yellow",
      },
    ];

    return (
      <div className="max-w-6xl mx-auto py-10 md:py-16 px-6 md:px-10 space-y-12 md:space-y-16 pb-24 md:pb-16 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 border-b border-ide-border pb-8 md:pb-12 text-left">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="px-2 py-0.5 bg-tokyo-blue text-ide-bg text-[8px] md:text-[9px] font-black rounded-sm uppercase tracking-tighter">
                Verified
              </div>
              <Typography
                variant="muted"
                className="text-[9px] md:text-[10px] font-mono tracking-widest text-zinc-600"
              >
                STK_ID: 0X404_READY
              </Typography>
            </div>
            <Typography
              as="h1"
              variant="title"
              className="text-3xl md:text-5xl tracking-tighter font-black"
            >
              Technical <span className="text-tokyo-blue">Arsenal</span>
            </Typography>
            <Typography
              variant="body"
              className="text-zinc-500 max-w-xl text-base md:text-lg"
            >
              Recursive breakdown of specialized systems, frameworks, and
              engineering tools.
            </Typography>
          </div>
          <button
            onClick={() => setViewMode("raw")}
            className="flex items-center gap-2 text-[9px] md:text-[10px] font-mono text-zinc-600 hover:text-tokyo-blue transition-colors px-4 py-2 border border-ide-border rounded hover:bg-white/5 w-fit"
          >
            <Terminal className="w-3 h-3" /> INSPECT_RAW
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {categories.map((cat) => (
            <div key={cat.key} className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-3 md:gap-4 px-2">
                <div
                  className={cn(
                    "p-2 md:p-2.5 rounded-lg bg-black/20 border border-ide-border shadow-inner shrink-0",
                    cat.color,
                  )}
                >
                  <cat.icon className="w-4 md:w-5 h-4 md:h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <Typography
                    variant="body"
                    className="font-bold text-white tracking-tight text-sm md:text-base truncate"
                  >
                    {cat.label}
                  </Typography>
                  <Typography
                    variant="muted"
                    className="text-[8px] md:text-[10px] font-mono uppercase tracking-[0.2em] truncate"
                  >
                    {cat.key.replace(/_/g, " ")}
                  </Typography>
                </div>
              </div>

              <div className="border border-ide-border bg-black/10 border-zinc-800/50 rounded-xl min-h-[120px] p-4 md:p-6 flex flex-wrap gap-2 md:gap-3 content-start hover:border-zinc-700 transition-colors shadow-inner overflow-hidden">
                {cat.key === "languages"
                  ? data[cat.key].map((lang: any) => (
                      <div
                        key={lang.name}
                        className="w-full flex items-center justify-between p-2.5 md:p-3 rounded bg-ide-sidebar/40 border border-ide-border group hover:border-tokyo-blue/30 transition-all"
                      >
                        <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                          <SkillIcon
                            name={lang.name}
                            className="w-3.5 md:w-4 h-3.5 md:h-4 shrink-0"
                          />
                          <span className="text-[11px] md:text-xs text-zinc-300 font-medium group-hover:text-white truncate">
                            {lang.name}
                          </span>
                        </div>
                        <span className="text-[8px] md:text-[9px] font-mono text-tokyo-blue px-2 py-0.5 bg-tokyo-blue/5 rounded uppercase font-bold shrink-0 ml-2">
                          {lang.level}
                        </span>
                      </div>
                    ))
                  : data[cat.key].map((item: string) => (
                      <div
                        key={item}
                        className="px-3 md:px-4 py-1.5 md:py-2 bg-ide-sidebar/60 border border-ide-border rounded-lg text-[10px] md:text-xs text-zinc-400 font-medium hover:text-tokyo-blue hover:border-tokyo-blue/40 transition-all cursor-default flex items-center gap-2 md:gap-3 group"
                      >
                        <SkillIcon
                          name={item}
                          className="w-3 md:w-4 h-3 md:h-4 transition-transform group-hover:scale-110 shrink-0"
                        />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- Raw Source / Fallback View ---
  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12 px-6 md:px-8 space-y-6 md:space-y-8 pb-20 md:pb-12 text-left">
      <div className="border-b border-ide-border pb-6 md:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <Typography
            as="h1"
            variant="title"
            className="text-2xl md:text-3xl tracking-tight"
          >
            Source Buffer
          </Typography>
          <div className="flex items-center gap-3">
            <Typography
              variant="muted"
              className="text-tokyo-blue font-mono text-[10px] md:text-sm uppercase tracking-tight text-zinc-500"
            >
              application/json
            </Typography>
            <span className="text-zinc-700">•</span>
            <Typography
              variant="muted"
              className="text-zinc-600 text-[10px] md:text-xs"
            >
              IMMUTABLE_DATA_STREAM
            </Typography>
          </div>
        </div>
        {(isGithub || isSkills || isAchievements) && (
          <button
            onClick={() => setViewMode("visual")}
            className="flex items-center gap-2 px-4 py-2 bg-tokyo-blue text-ide-bg rounded text-[10px] font-black uppercase hover:bg-tokyo-cyan transition-all w-fit"
          >
            Visual Interface
          </button>
        )}
      </div>

      <div className="border border-ide-border bg-black/30 rounded-xl overflow-hidden border-zinc-800 shadow-2xl max-w-full">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-ide-border bg-ide-sidebar/50 overflow-x-auto no-scrollbar">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-tokyo-red/40" />
            <div className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-tokyo-yellow/40" />
            <div className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-tokyo-green/40" />
          </div>
          <div className="ml-2 md:ml-4 h-4 w-[1px] bg-ide-border shrink-0" />
          <Typography
            variant="muted"
            className="ml-1 md:ml-2 text-[9px] md:text-[10px] font-mono text-zinc-500 whitespace-nowrap"
          >
            buffer.json — read-only
          </Typography>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <SyntaxHighlighter
            style={atomDark}
            language="json"
            PreTag="div"
            customStyle={{
              margin: 0,
              padding: "1.5rem md:2.5rem",
              background: "transparent",
              fontSize: "11px md:13px",
              lineHeight: "1.6",
            }}
          >
            {content}
          </SyntaxHighlighter>
        </div>
      </div>

      <div className="p-4 md:p-6 bg-tokyo-blue/5 border border-tokyo-blue/10 rounded-lg text-left">
        <div className="flex items-center gap-3 italic">
          <Info className="w-3.5 md:w-4 h-3.5 md:h-4 text-tokyo-blue shrink-0" />
          <Typography
            variant="body"
            className="text-[10px] md:text-xs text-zinc-500 leading-relaxed"
          >
            Raw buffer parsed successfully. System utilizes localized JSON
            streams for high-speed content delivery and Git-based version
            integrity.
          </Typography>
        </div>
      </div>
    </div>
  );
};
