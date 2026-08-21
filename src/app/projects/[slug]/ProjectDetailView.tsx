"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UI_TRANSLATIONS } from "@/data/translations";
import dynamic from "next/dynamic";
import { PROJECTS_DATA, ARTICLES_DATA } from "@/data/portfolioData";
import { getProjectEditorial } from "@/data/projectEditorial";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { GithubIcon } from "@/components/common/Icons";
import { TechBadge } from "@/components/common/TechIcon";
import { AskAIFloatingButton } from "@/components/ai/AskAIFloatingButton";
import { DIAGRAM_MAP } from "@/components/diagrams/ArchitectureDiagrams";

const AskAIModal = dynamic(
  () => import("@/components/ai/AskAIModal").then((mod) => mod.AskAIModal),
  { ssr: false }
);

const CustomCursor = dynamic(
  () => import("@/components/common/CustomCursor").then((mod) => mod.CustomCursor),
  { ssr: false }
);
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Activity,
  Sparkles,
  BookOpen,
  Share2,
  Check
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
  const projectMetrics = language === "vi" && project.metricsVi ? project.metricsVi : project.metrics;
  const editorial = getProjectEditorial(project);
  const projectOverview = language === "vi" ? editorial?.contextVi : editorial?.context;
  const projectResults = editorial
    ? (language === "vi" ? editorial.outcomesVi : editorial.outcomes)
    : (language === "vi" && project.resultsVi ? project.resultsVi : project.results);
  const editorialArticleSlugs = editorial
    ? editorial.highlights.flatMap((highlight) => highlight.articleSlugs)
    : [];

  // Diagram Component mapping
  const DiagramComponent = DIAGRAM_MAP[project.id];

  // Related Articles
  const relatedArticleSlugs = Array.from(new Set([...(project.relatedArticles || []), ...editorialArticleSlugs]));
  const relatedArticles = ARTICLES_DATA.filter((a) => relatedArticleSlugs.includes(a.slug));

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
    <main className="relative min-h-screen bg-slate-50 dark:bg-[#090a0f] text-slate-900 dark:text-[#f4f4f5] bg-grid-pattern selection:bg-emerald-500 selection:text-black transition-colors duration-200">
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/[0.04] dark:bg-emerald-500/[0.03] rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/3 right-1/4 w-[500px] h-[500px] bg-teal-500/[0.03] dark:bg-teal-500/[0.02] rounded-full blur-[160px] pointer-events-none -z-10" />

      <CustomCursor />
      <Navbar onOpenAI={handleOpenAI} />

      <article className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Navigation Breadcrumbs & Actions */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>{t.selectedWork.backToProjects}</span>
          </Link>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-white dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 transition-colors shadow-sm"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-zinc-500" />}
            <span>{copiedLink ? (language === "vi" ? "Đã sao chép" : "Copied!") : (language === "vi" ? "Chia sẻ" : "Share")}</span>
          </button>
        </div>

        {/* Header Title Section */}
        <MotionWrapper delay={0.05}>
          <div className="border-b border-zinc-200 dark:border-zinc-800/80 pb-8 mb-12">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                {project.category}
              </span>
              <span className="text-xs font-mono text-zinc-600 dark:text-zinc-500 px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                {project.year}
              </span>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                • {projectRole}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-zinc-950 dark:text-white tracking-tight mb-4 leading-tight">
              {projectTitle}
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed max-w-3xl mb-8">
              {projectSubtitle}
            </p>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-semibold dark:text-white border border-zinc-200 dark:border-zinc-800 transition-all hover:scale-105 shadow-sm"
                >
                  <GithubIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{t.selectedWork.repository}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>
              )}
              {project.liveUrl && project.liveUrl !== "#contact" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-zinc-950 transition-all hover:scale-105 shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Platform</span>
                </a>
              )}
              <button
                onClick={handleOpenAI}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === "vi" ? "Hỏi AI về dự án này" : "Ask AI about this project"}</span>
              </button>
            </div>
          </div>
        </MotionWrapper>

        {/* Editorial context: why this project exists and what Hoan owned */}
        {editorial && (
          <MotionWrapper delay={0.08}>
            <section className="mb-12 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                  {language === "vi" ? editorial.groupLabelVi : editorial.groupLabel}
                </span>
                <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">{language === "vi" ? editorial.statusVi : editorial.status}</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                <div>
                  <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3 font-semibold">
                    {language === "vi" ? "Hệ thống này phục vụ điều gì" : "What this system is for"}
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-800 dark:text-zinc-200 leading-relaxed">
                    {language === "vi" ? editorial.contextVi : editorial.context}
                  </p>
                </div>
                <div>
                  <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3 font-semibold">
                    {language === "vi" ? "Phạm vi Hoan trực tiếp phụ trách" : "What I owned"}
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {language === "vi" ? editorial.roleScopeVi : editorial.roleScope}
                  </p>
                </div>
              </div>
              {editorial.publicNote && (
                <p className="mt-6 pt-5 border-t border-emerald-500/15 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {language === "vi" ? editorial.publicNoteVi : editorial.publicNote}
                </p>
              )}
            </section>
          </MotionWrapper>
        )}

        {/* Infrastructure profile: make the actual homelab topology concrete */}
        {editorial?.infrastructureProfile && (
          <MotionWrapper delay={0.082}>
            <section className="mb-12 rounded-2xl bg-amber-500/[0.05] border border-amber-500/20 p-6 sm:p-8">
              <div className="mb-5 max-w-3xl">
                <h2 className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2 font-semibold">
                  {language === "vi" ? "Cấu hình Homelab hiện tại" : "Current homelab profile"}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {language === "vi"
                    ? "Đây là topology thực tế của lab hiện tại, tách biệt với các cụm bare-metal nhiều node dùng cho những hệ thống khác."
                    : "This is the actual current lab topology, separate from the multi-node bare-metal clusters used by other systems."}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: language === "vi" ? "Host" : "Host", value: language === "vi" ? editorial.infrastructureProfile.hostVi : editorial.infrastructureProfile.host },
                  { label: language === "vi" ? "Tài nguyên" : "Compute", value: language === "vi" ? editorial.infrastructureProfile.computeVi : editorial.infrastructureProfile.compute },
                  { label: language === "vi" ? "Ảo hóa" : "Virtualization", value: language === "vi" ? editorial.infrastructureProfile.virtualizationVi : editorial.infrastructureProfile.virtualization },
                  { label: language === "vi" ? "Guest nodes" : "Guest nodes", value: language === "vi" ? editorial.infrastructureProfile.guestsVi : editorial.infrastructureProfile.guests }
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-white dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/80 p-4 shadow-sm">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400/80 mb-2 font-semibold">{item.label}</div>
                    <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>
          </MotionWrapper>
        )}

        {/* Business workflow surface */}
        {editorial?.workflowAreas && editorial.workflowAreas.length > 0 && (
          <MotionWrapper delay={0.085}>
            <section className="mb-12">
              <div className="mb-5 max-w-3xl">
                <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2 font-semibold">
                  {language === "vi" ? "Phạm vi nghiệp vụ" : "Business workflow surface"}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {language === "vi"
                    ? "EPAS không phải một bộ màn hình rời rạc: mỗi phân hệ là một phần của chuỗi nghiệp vụ có dữ liệu, trạng thái, người xử lý và đầu ra báo cáo."
                    : "EPAS is not a collection of isolated screens: each module is part of a business chain with data, state, responsible actors, and reporting outputs."}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {editorial.workflowAreas.map((area, index) => (
                  <div key={area.id} className="rounded-xl bg-white dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/80 p-5 shadow-sm">
                    <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400/80 mb-4 font-bold">0{index + 1}</div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                      {language === "vi" && area.titleVi ? area.titleVi : area.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {language === "vi" && area.summaryVi ? area.summaryVi : area.summary}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </MotionWrapper>
        )}

        {/* Highlight threads are the bridge between a project and its writing */}
        {editorial && editorial.highlights.length > 0 && (
          <MotionWrapper delay={0.09}>
            <section className="mb-12">
              <div className="flex items-end justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2 font-semibold">
                    {language === "vi" ? "Các điểm nổi bật được đào sâu" : "Engineering threads behind the project"}
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {language === "vi" ? "Mỗi điểm dưới đây dẫn tới những ghi chép tập trung vào một quyết định hoặc bài toán cụ thể." : "Each thread links to notes focused on one concrete decision or engineering problem."}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {editorial.highlights.map((highlight) => {
                  const highlightTitle = language === "vi" && highlight.titleVi ? highlight.titleVi : highlight.title;
                  const highlightSummary = language === "vi" && highlight.summaryVi ? highlight.summaryVi : highlight.summary;
                  const highlightArticles = ARTICLES_DATA.filter((article) => highlight.articleSlugs.includes(article.slug));
                  return (
                    <div key={highlight.id} className="rounded-xl bg-white dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/80 p-5 shadow-sm">
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">{highlightTitle}</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">{highlightSummary}</p>
                      {highlightArticles.length > 0 && (
                        <div className="space-y-2 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                          {highlightArticles.map((article) => (
                            <Link key={article.slug} href={`/writing/${article.slug}`} className="flex items-start gap-2 text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors">
                              <BookOpen className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <span>{language === "vi" && article.titleVi ? article.titleVi : article.title}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </MotionWrapper>
        )}

        {/* Tech Stack Pills Bar */}
        <MotionWrapper delay={0.1}>
          <div className="mb-12 p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/80 shadow-sm">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4 flex items-center gap-2 font-semibold">
              <Cpu className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{t.selectedWork.technologies}</span>
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.techStack.map((tech) => (
                <TechBadge key={tech} name={tech} size="sm" />
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* Metrics Grid (if available) */}
        {projectMetrics && projectMetrics.length > 0 && (
          <MotionWrapper delay={0.15}>
            <div className="mb-14">
              <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2 font-semibold">
                <Activity className="w-4 h-4" />
                <span>{t.selectedWork.metricsTitle}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-white dark:bg-gradient-to-b dark:from-zinc-900/80 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800/80 flex items-start gap-3 shadow-sm"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-mono leading-relaxed">
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
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mb-4 flex items-center gap-2.5">
                <span>{t.selectedWork.overview}</span>
              </h2>
              <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                {projectOverview || projectDesc}
              </p>
            </div>

            {projectProblem && (
              <div className="p-6 rounded-2xl bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 text-zinc-800 dark:text-zinc-300">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{t.selectedWork.problem}</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
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
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6 flex items-center gap-2.5">
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
                <div className="my-6 rounded-2xl bg-zinc-900 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 overflow-x-auto custom-scrollbar font-mono text-xs text-emerald-400 leading-relaxed shadow-xl">
                  <pre>{project.architectureDiagram}</pre>
                </div>
              )}

              {/* Bullet points for architecture details */}
              {projectArchitecture && projectArchitecture.length > 0 && (
                <div className="space-y-3 mt-6">
                  {projectArchitecture.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 mt-2 flex-shrink-0" />
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
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6 flex items-center gap-2.5">
                <span>{t.selectedWork.contributions}</span>
              </h2>
              <div className="grid grid-cols-1 gap-3.5">
                {projectContributions.map((contrib, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/80 flex items-start gap-3.5 shadow-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
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
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6 flex items-center gap-2.5">
                <span>{t.selectedWork.results}</span>
              </h2>
              <div className="space-y-3">
                {projectResults.map((res, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 mt-2 flex-shrink-0" />
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
            <div className="mb-16 pt-8 border-t border-zinc-200 dark:border-zinc-800/80">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight mb-6 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
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
                      className="group p-5 rounded-xl bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/40 transition-all flex flex-col justify-between shadow-sm"
                    >
                      <div>
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2 font-semibold">
                          {article.readTime}
                        </span>
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                          {articleTitle}
                        </h3>
                      </div>
                      <div className="inline-flex items-center gap-1 text-xs font-mono text-zinc-500 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 pt-3">
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
        <div className="pt-10 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.id}`}
              className="p-4 rounded-xl bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group text-left shadow-sm"
            >
              <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1 mb-1">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                Previous Project
              </span>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                {language === "vi" && prevProject.titleVi ? prevProject.titleVi : prevProject.title}
              </p>
            </Link>
          ) : <div />}

          {nextProject && (
            <Link
              href={`/projects/${nextProject.id}`}
              className="p-4 rounded-xl bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group text-right sm:text-right ml-auto w-full shadow-sm"
            >
              <span className="text-[11px] font-mono text-zinc-500 inline-flex items-center gap-1 mb-1">
                Next Project
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
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
  return <ProjectDetailContent project={project} />;
}
