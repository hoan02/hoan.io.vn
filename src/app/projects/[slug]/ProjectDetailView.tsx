"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/types";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UI_TRANSLATIONS } from "@/data/translations";
import { PROJECTS_DATA, ARTICLES_DATA } from "@/data/portfolioData";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { CustomCursor } from "@/components/common/CustomCursor";
import { AskAIFloatingButton } from "@/components/ai/AskAIFloatingButton";
import { AskAIModal } from "@/components/ai/AskAIModal";
import { DIAGRAM_MAP } from "@/components/diagrams/ArchitectureDiagrams";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Server,
  Activity,
  Sparkles,
  BookOpen,
  Share2,
  Check,
  Code2
} from "lucide-react";

interface ProjectDetailViewProps {
  project: Project;
}

function ProjectDetailContent({ project }: ProjectDetailViewProps) {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleOpenAI = () => setAiModalOpen(true);
  const handleCloseAI = () => setAiModalOpen(false);

  const projectTitle = language === "vi" && project.titleVi ? project.titleVi : project.title;
  const projectSubtitle = language === "vi" && project.subtitleVi ? project.subtitleVi : project.subtitle;
  const projectDesc = language === "vi" && project.descriptionVi ? project.descriptionVi : project.description;
  const projectProblem = language === "vi" && project.problemVi ? project.problemVi : project.problem;
  const projectRole = language === "vi" && project.roleVi ? project.roleVi : project.role;
  const projectArchitecture = language === "vi" && project.architectureVi ? project.architectureVi : project.architecture;
  const projectContributions = language === "vi" && project.contributionsDetailedVi ? project.contributionsDetailedVi : project.contributionsDetailed;
  const projectResults = language === "vi" && project.resultsVi ? project.resultsVi : project.results;
  const projectMetrics = language === "vi" && project.metricsVi ? project.metricsVi : project.metrics;

  // Diagram Component mapping
  const DiagramComponent = DIAGRAM_MAP[project.id];

  // Related Articles
  const relatedArticles = project.relatedArticles
    ? ARTICLES_DATA.filter((a) => project.relatedArticles?.includes(a.slug))
    : [];

  // Next & Prev Project
  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? PROJECTS_DATA[currentIndex - 1] : null;
  const nextProject = currentIndex < PROJECTS_DATA.length - 1 ? PROJECTS_DATA[currentIndex + 1] : null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <main className="relative min-h-screen bg-[#090a0f] text-[#f4f4f5] bg-grid-pattern selection:bg-emerald-500 selection:text-black">
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/3 right-1/4 w-[500px] h-[500px] bg-teal-500/[0.03] rounded-full blur-[160px] pointer-events-none -z-10" />

      <CustomCursor />
      <Navbar onOpenAI={handleOpenAI} />

      <article className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Navigation Breadcrumbs & Actions */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>{t.selectedWork.backToProjects}</span>
          </Link>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{copiedLink ? (language === "vi" ? "Đã sao chép" : "Copied!") : (language === "vi" ? "Chia sẻ" : "Share")}</span>
          </button>
        </div>

        {/* Header Title Section */}
        <MotionWrapper delay={0.05}>
          <div className="border-b border-zinc-800/80 pb-8 mb-12">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                {project.category}
              </span>
              <span className="text-xs font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                {project.year}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                • {projectRole}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
              {projectTitle}
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-normal leading-relaxed max-w-3xl mb-8">
              {projectSubtitle}
            </p>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-white border border-zinc-800 transition-all hover:scale-105"
                >
                  <Github className="w-4 h-4 text-emerald-400" />
                  <span>{t.selectedWork.repository}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              )}
              {project.liveUrl && project.liveUrl !== "#contact" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-zinc-950 transition-all hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Platform</span>
                </a>
              )}
              <button
                onClick={handleOpenAI}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-medium text-emerald-400 border border-emerald-500/30 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === "vi" ? "Hỏi AI về dự án này" : "Ask AI about this project"}</span>
              </button>
            </div>
          </div>
        </MotionWrapper>

        {/* Tech Stack Pills Bar */}
        <MotionWrapper delay={0.1}>
          <div className="mb-12 p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.selectedWork.technologies}</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* Metrics Grid (if available) */}
        {projectMetrics && projectMetrics.length > 0 && (
          <MotionWrapper delay={0.15}>
            <div className="mb-14">
              <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>{t.selectedWork.metricsTitle}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-gradient-to-b from-zinc-900/80 to-zinc-950 border border-zinc-800/80 flex items-start gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <p className="text-xs sm:text-sm text-zinc-200 font-mono leading-relaxed">
                      {metric}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </MotionWrapper>
        )}

        {/* Section 1: Overview & Problem Statement */}
        <MotionWrapper delay={0.2}>
          <div className="space-y-8 mb-14">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4 flex items-center gap-2.5">
                <span className="text-emerald-400 font-mono text-base">01.</span>
                <span>{t.selectedWork.overview}</span>
              </h2>
              <p className="text-base text-zinc-300 leading-relaxed font-normal">
                {projectDesc}
              </p>
            </div>

            {projectProblem && (
              <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-zinc-300">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{t.selectedWork.problem}</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                  {projectProblem}
                </p>
              </div>
            )}
          </div>
        </MotionWrapper>

        {/* Section 2: Architecture & Topology */}
        {(Boolean(DiagramComponent) || Boolean(project.architectureDiagram) || (projectArchitecture && projectArchitecture.length > 0)) && (
          <MotionWrapper delay={0.25}>
            <div className="mb-14">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-6 flex items-center gap-2.5">
                <span className="text-emerald-400 font-mono text-base">02.</span>
                <span>{t.selectedWork.architecture}</span>
              </h2>

              {/* Render visual SVG Diagram if available */}
              {DiagramComponent && (
                <div className="mb-8">
                  <DiagramComponent caption={`${project.title} — System Topology`} />
                </div>
              )}

              {/* Render ASCII Diagram if available and no SVG */}
              {!DiagramComponent && project.architectureDiagram && (
                <div className="my-6 rounded-2xl bg-zinc-950 border border-zinc-800 p-6 overflow-x-auto custom-scrollbar font-mono text-xs text-emerald-400/90 leading-relaxed shadow-2xl">
                  <pre>{project.architectureDiagram}</pre>
                </div>
              )}

              {/* Bullet points for architecture details */}
              {projectArchitecture && projectArchitecture.length > 0 && (
                <div className="space-y-3 mt-6">
                  {projectArchitecture.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                      <p className="leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </MotionWrapper>
        )}

        {/* Section 3: Engineering Deliverables */}
        {projectContributions && projectContributions.length > 0 && (
          <MotionWrapper delay={0.3}>
            <div className="mb-14">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-6 flex items-center gap-2.5">
                <span className="text-emerald-400 font-mono text-base">03.</span>
                <span>{t.selectedWork.contributions}</span>
              </h2>
              <div className="grid grid-cols-1 gap-3.5">
                {projectContributions.map((contrib, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-start gap-3.5"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-zinc-200 leading-relaxed">
                      {contrib}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </MotionWrapper>
        )}

        {/* Section 4: Production Results */}
        {projectResults && projectResults.length > 0 && (
          <MotionWrapper delay={0.35}>
            <div className="mb-14">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-6 flex items-center gap-2.5">
                <span className="text-emerald-400 font-mono text-base">04.</span>
                <span>{t.selectedWork.results}</span>
              </h2>
              <div className="space-y-3">
                {projectResults.map((res, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                    <p className="leading-relaxed">{res}</p>
                  </div>
                ))}
              </div>
            </div>
          </MotionWrapper>
        )}

        {/* Section 5: Related Engineering Articles */}
        {relatedArticles.length > 0 && (
          <MotionWrapper delay={0.4}>
            <div className="mb-16 pt-8 border-t border-zinc-800/80">
              <h2 className="text-lg font-bold text-white tracking-tight mb-6 flex items-center gap-2 text-emerald-400">
                <BookOpen className="w-5 h-5" />
                <span>{t.selectedWork.relatedWriting}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((article) => {
                  const articleTitle = language === "vi" && article.titleVi ? article.titleVi : article.title;
                  return (
                    <Link
                      key={article.slug}
                      href={`/writing/${article.slug}`}
                      className="group p-5 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-2">
                          {article.readTime}
                        </span>
                        <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                          {articleTitle}
                        </h3>
                      </div>
                      <div className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 group-hover:text-emerald-400 pt-3">
                        <span>Read deep dive</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </MotionWrapper>
        )}

        {/* Next / Prev Project Navigator */}
        <div className="pt-10 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.id}`}
              className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-all group text-left"
            >
              <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1 mb-1">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                Previous Project
              </span>
              <p className="text-sm font-bold text-zinc-300 group-hover:text-emerald-400 transition-colors line-clamp-1">
                {language === "vi" && prevProject.titleVi ? prevProject.titleVi : prevProject.title}
              </p>
            </Link>
          ) : <div />}

          {nextProject && (
            <Link
              href={`/projects/${nextProject.id}`}
              className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-all group text-right sm:text-right ml-auto w-full"
            >
              <span className="text-[11px] font-mono text-zinc-500 inline-flex items-center gap-1 mb-1">
                Next Project
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm font-bold text-zinc-300 group-hover:text-emerald-400 transition-colors line-clamp-1">
                {language === "vi" && nextProject.titleVi ? nextProject.titleVi : nextProject.title}
              </p>
            </Link>
          )}
        </div>
      </article>

      <Footer />
      <AskAIFloatingButton onClick={handleOpenAI} />
      {aiModalOpen && <AskAIModal isOpen={aiModalOpen} onClose={handleCloseAI} />}
    </main>
  );
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  return (
    <LanguageProvider>
      <ProjectDetailContent project={project} />
    </LanguageProvider>
  );
}
