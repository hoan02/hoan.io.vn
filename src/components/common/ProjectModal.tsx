"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { ARTICLES_DATA } from "@/data/portfolioData";
import { GithubIcon } from "@/components/common/Icons";
import { X, ExternalLink, CheckCircle2, Layers, Cpu, AlertCircle, Wrench, BookOpen, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const projectTitle = language === "vi" && project.titleVi ? project.titleVi : project.title;
  const projectSubtitle = language === "vi" && project.subtitleVi ? project.subtitleVi : project.subtitle;
  const projectLongDesc = language === "vi" && project.longDescriptionVi ? project.longDescriptionVi : (project.longDescription || project.description);
  const projectProblem = language === "vi" && project.problemVi ? project.problemVi : project.problem;
  const projectContributions = language === "vi" && project.contributionsDetailedVi ? project.contributionsDetailedVi : project.contributionsDetailed;
  const projectResults = language === "vi" && project.resultsVi ? project.resultsVi : (project.results || project.metrics);
  const projectRole = language === "vi" && project.roleVi ? project.roleVi : project.role;

  // Find related articles
  const relatedArticles = project.relatedArticles
    ? ARTICLES_DATA.filter((a) => project.relatedArticles?.includes(a.slug))
    : [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-6 sm:p-8 z-10 custom-scrollbar"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header / Category & Year */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {project.category}
            </span>
            <span className="text-xs text-zinc-400 font-mono">{project.year}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-300 font-mono font-medium">{projectRole}</span>
          </div>

          {/* Title & Subtitle */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2 pr-10">
            {projectTitle}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mb-6 leading-relaxed">
            {projectSubtitle}
          </p>

          {/* Visual Banner */}
          <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] rounded-xl overflow-hidden mb-8 border border-zinc-800 bg-zinc-900">
            <Image
              src={project.image}
              alt={projectTitle}
              fill
              className="object-cover"
            />
          </div>

          {/* Case Study Content Blocks */}
          <div className="space-y-8 mb-8">
            {/* 1. Problem & Context */}
            {projectProblem && (
              <div className="p-4 sm:p-5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-emerald-400" /> {t.selectedWork.problem}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  {projectProblem}
                </p>
              </div>
            )}

            {/* 2. Architecture Diagram */}
            {project.architectureDiagram && (
              <div>
                <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" /> {t.selectedWork.architecture}
                </h3>
                <div className="p-4 sm:p-5 rounded-xl bg-black/80 border border-zinc-800/90 font-mono text-[11px] sm:text-xs text-emerald-400/90 overflow-x-auto leading-relaxed shadow-inner">
                  <pre>{project.architectureDiagram}</pre>
                </div>
              </div>
            )}

            {/* 3. Engineering Contributions */}
            {projectContributions && projectContributions.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-emerald-400" /> {t.selectedWork.contributions}
                </h3>
                <div className="space-y-2.5">
                  {projectContributions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <span className="text-emerald-400 shrink-0 mt-1 font-mono">▸</span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Production Results & Tech Stack Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectResults && projectResults.length > 0 && (
                <div className="p-4 sm:p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                  <h4 className="text-xs font-semibold uppercase text-zinc-300 tracking-wider mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t.selectedWork.results}
                  </h4>
                  <div className="space-y-2">
                    {projectResults.map((result, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-normal">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 sm:p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                <h4 className="text-xs font-semibold uppercase text-zinc-300 tracking-wider mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" /> {t.selectedWork.technologies}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/60 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Related Engineering Notes */}
            {relatedArticles.length > 0 && (
              <div className="pt-4 border-t border-zinc-800/80">
                <h4 className="text-xs font-semibold uppercase text-zinc-400 tracking-wider mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-400" /> {t.selectedWork.relatedWriting}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedArticles.map((article) => {
                    const articleTitle = language === "vi" && article.titleVi ? article.titleVi : article.title;
                    return (
                      <Link
                        key={article.slug}
                        href={`/writing/${article.slug}`}
                        onClick={onClose}
                        className="group/article p-3.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 transition-all flex items-center justify-between gap-3"
                      >
                        <div>
                          <span className="text-xs font-medium text-zinc-200 group-hover/article:text-emerald-400 transition-colors line-clamp-1">
                            {articleTitle}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono">
                            {article.readTime}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover/article:text-emerald-400 group-hover/article:translate-x-0.5 transition-all shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800/80">
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs sm:text-sm font-medium transition-colors border border-zinc-700"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>{t.selectedWork.repository}</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs sm:text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              {t.selectedWork.close}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
