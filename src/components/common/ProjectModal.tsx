"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Project } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { GithubIcon } from "@/components/common/Icons";
import { X, ExternalLink, CheckCircle2, Layers, Cpu } from "lucide-react";
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
  const projectRole = language === "vi" && project.roleVi ? project.roleVi : project.role;
  const projectArch = language === "vi" && project.architectureVi ? project.architectureVi : project.architecture;
  const projectMetrics = language === "vi" && project.metricsVi ? project.metricsVi : project.metrics;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-6 sm:p-8 z-10 custom-scrollbar"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header / Category & Year */}
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {project.category}
            </span>
            <span className="text-xs text-zinc-400 font-mono">{project.year}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-300 font-mono font-medium">{projectRole}</span>
          </div>

          {/* Title & Subtitle */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            {projectTitle}
          </h2>
          <p className="text-base text-zinc-400 mb-6">
            {projectSubtitle}
          </p>

          {/* Image Preview */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 border border-zinc-800 bg-zinc-900">
            <Image
              src={project.image}
              alt={projectTitle}
              fill
              className="object-cover"
            />
          </div>

          {/* Content Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" /> {t.selectedWork.overview}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {projectLongDesc}
                </p>
              </div>

              {projectArch && projectArch.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-400" /> {t.selectedWork.architecturalHighlights}
                  </h3>
                  <ul className="space-y-2">
                    {projectArch.map((arch, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{arch}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar Metrics & Stack */}
            <div className="space-y-5 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80">
              {projectMetrics && projectMetrics.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase text-zinc-400 tracking-wider mb-3">
                    {t.selectedWork.impactMetrics}
                  </h4>
                  <div className="space-y-2">
                    {projectMetrics.map((metric, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-semibold uppercase text-zinc-400 tracking-wider mb-2.5">
                  {t.selectedWork.technologies}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-xs rounded bg-zinc-800/90 text-zinc-300 border border-zinc-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800/80">
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs sm:text-sm font-semibold transition-colors"
                >
                  <span>{t.selectedWork.viewArchitecture}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
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
