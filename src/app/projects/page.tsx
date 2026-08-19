"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PROJECTS_DATA } from "@/data/portfolioData";
import { getProjectEditorial } from "@/data/projectEditorial";
import { UI_TRANSLATIONS } from "@/data/translations";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { CustomCursor } from "@/components/common/CustomCursor";
import { GithubIcon } from "@/components/common/Icons";
import { TechBadge } from "@/components/common/TechIcon";
import { AskAIFloatingButton } from "@/components/ai/AskAIFloatingButton";
import { AskAIModal } from "@/components/ai/AskAIModal";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import {
  FolderGit2,
  ArrowRight,
  ArrowLeft,
  Search,
  ExternalLink,
  Layers,
  Activity
} from "lucide-react";

function ProjectsContent() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const handleOpenAI = () => setAiModalOpen(true);
  const handleCloseAI = () => setAiModalOpen(false);

  const categories = ["All", "Full-stack", "Backend", "Frontend", "DevOps & Cloud", "Systems & IoT", "Desktop & IoT"];

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const title = language === "vi" && project.titleVi ? project.titleVi : project.title;
      const desc = language === "vi" && project.descriptionVi ? project.descriptionVi : project.description;
      const subtitle = language === "vi" && project.subtitleVi ? project.subtitleVi : project.subtitle;
      
      const matchesCategory =
        selectedCategory === "All" ||
        project.category === selectedCategory ||
        (selectedCategory === "Systems & IoT" && (project.category as string).includes("IoT"));

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        title.toLowerCase().includes(q) ||
        desc.toLowerCase().includes(q) ||
        subtitle.toLowerCase().includes(q) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, language]);

  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-[#090a0f] text-slate-900 dark:text-[#f4f4f5] bg-grid-pattern selection:bg-emerald-500 selection:text-black transition-colors duration-200">
      {/* Ambient lighting layers */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/[0.04] dark:bg-emerald-500/[0.03] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/3 right-1/4 w-[450px] h-[450px] bg-teal-500/[0.03] dark:bg-teal-500/[0.02] rounded-full blur-[140px] pointer-events-none -z-10" />

      <CustomCursor />
      <Navbar onOpenAI={handleOpenAI} />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <MotionWrapper delay={0.05}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>{t.selectedWork.backToHome}</span>
          </Link>
        </MotionWrapper>

        {/* Header */}
        <MotionWrapper delay={0.1}>
          <div className="mb-12 border-b border-zinc-200 dark:border-zinc-800/80 pb-8">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-mono tracking-widest uppercase mb-3">
              <FolderGit2 className="w-4 h-4" />
              <span>{t.selectedWork.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-950 dark:text-white tracking-tight mb-4">
              {language === "vi" ? "Kho Dự án & Case Study Kỹ thuật" : "Engineering Projects & Case Studies"}
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl font-normal leading-relaxed">
              {language === "vi"
                ? "Các dự án được chia theo hệ thống chuyên nghiệp, sản phẩm tự xây dựng và các thử nghiệm hệ thống. Mỗi case study bắt đầu từ bối cảnh, phạm vi đóng góp và những điểm kỹ thuật được đào sâu trong phần Writing."
                : "Professional systems, self-owned products, and systems experiments. Each case study starts with context, ownership, and the engineering threads explored in Writing."}
            </p>
          </div>
        </MotionWrapper>

        {/* Controls: Search & Category Filters */}
        <MotionWrapper delay={0.15}>
          <div className="space-y-6 mb-12">
            {/* Search Input */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.selectedWork.searchPlaceholder}
                className="w-full pl-11 pr-4 py-3 text-sm rounded-xl bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition-all font-mono shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-zinc-500 mr-2">{t.selectedWork.filterByCategory}</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    selectedCategory === category
                      ? "bg-emerald-500 text-zinc-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      : "bg-white dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-sm"
                  }`}
                >
                  {category === "All" ? t.selectedWork.allCategories : category}
                </button>
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 rounded-2xl bg-white/60 dark:bg-zinc-950/40 border border-dashed border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
            <Layers className="w-10 h-10 text-zinc-400 dark:text-zinc-600 mx-auto mb-4" />
            <p className="text-base text-zinc-600 dark:text-zinc-400 font-mono">
              {language === "vi" ? "Không tìm thấy dự án phù hợp." : "No matching engineering projects found."}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-4 py-2 text-xs font-mono bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-emerald-600 dark:text-emerald-400 rounded-lg border border-zinc-200 dark:border-zinc-800 transition-colors shadow-sm"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => {
              const projectTitle = language === "vi" && project.titleVi ? project.titleVi : project.title;
              const projectDesc = language === "vi" && project.descriptionVi ? project.descriptionVi : project.description;
              const projectRole = language === "vi" && project.roleVi ? project.roleVi : project.role;
              const editorial = getProjectEditorial(project);
              const primaryHighlight = editorial?.highlights[0];
              const projectContext = language === "vi" ? editorial?.contextVi : editorial?.context;
              const projectGroup = language === "vi" ? editorial?.groupLabelVi : editorial?.groupLabel;
              const projectStatus = language === "vi" ? editorial?.statusVi : editorial?.status;
              const highlightTitle = language === "vi" && primaryHighlight?.titleVi ? primaryHighlight.titleVi : primaryHighlight?.title;
              const highlightSummary = language === "vi" && primaryHighlight?.summaryVi ? primaryHighlight.summaryVi : primaryHighlight?.summary;

              return (
                <MotionWrapper key={project.id} delay={0.1 + (idx % 6) * 0.05}>
                  <div className="group h-full flex flex-col justify-between rounded-2xl bg-white/90 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800/90 hover:border-emerald-500/50 dark:hover:border-emerald-500/40 p-6 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-[0_20px_40px_-20px_rgba(16,185,129,0.15)] relative overflow-hidden">
                    {/* Top corner glow on hover */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div>
                      {/* Meta header */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 border border-zinc-200 dark:border-zinc-800">
                            {projectGroup || project.category}
                          </span>
                          <span className="text-xs font-mono text-zinc-500">
                            {project.year}
                          </span>
                        </div>

                        {/* Quick links */}
                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                              title="View GitHub Repository"
                            >
                              <GithubIcon className="w-4 h-4" />
                            </a>
                          )}
                          {project.liveUrl && project.liveUrl !== "#contact" && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                              title="Live Deployment"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Title & Link */}
                      <Link href={`/projects/${project.id}`} className="block group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mb-2 flex items-center justify-between">
                          <span>{projectTitle}</span>
                          <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-emerald-500 flex-shrink-0" />
                        </h2>
                      </Link>

                      {/* Subtitle / Role */}
                      <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400/80 mb-4">
                        {projectStatus || projectRole}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-4 mb-6">
                        {projectContext || projectDesc}
                      </p>

                      {/* Project highlight connected to the writing archive */}
                      {primaryHighlight && (
                        <div className="mb-6 p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                            <Activity className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span>{language === "vi" ? "Điểm nổi bật" : "Engineering thread"}</span>
                          </div>
                          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{highlightTitle}</p>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">{highlightSummary}</p>
                          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono pt-1">{primaryHighlight.articleSlugs.length} {language === "vi" ? "bài viết đào sâu" : "deep-dive notes"}</p>
                        </div>
                      )}
                    </div>

                    {/* Bottom: Tech Stack & CTA */}
                    <div>
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-100 dark:border-zinc-900 mb-5">
                        {project.techStack.slice(0, 5).map((tech) => (
                          <TechBadge key={tech} name={tech} size="xs" />
                        ))}
                        {project.techStack.length > 5 && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900/50 text-zinc-500 border border-zinc-200 dark:border-zinc-800/60 flex items-center">
                            +{project.techStack.length - 5}
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-emerald-500 hover:text-zinc-950 dark:hover:bg-emerald-500 dark:hover:text-zinc-950 text-xs font-semibold text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all duration-200 group/btn"
                      >
                        <span>{t.selectedWork.viewArchitecture}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </MotionWrapper>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
      <AskAIFloatingButton onClick={handleOpenAI} />
      <MobileTabBar onOpenAI={handleOpenAI} />
      {aiModalOpen && <AskAIModal isOpen={aiModalOpen} onClose={handleCloseAI} />}
    </main>
  );
}

export default function ProjectsPage() {
  return <ProjectsContent />;
}
