"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS_DATA } from "@/data/portfolioData";
import { Project } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import dynamic from "next/dynamic";
import { ArrowUpRight, CheckCircle2, Eye, Sparkles } from "lucide-react";

const ProjectModal = dynamic(
  () => import("@/components/common/ProjectModal").then((mod) => mod.ProjectModal),
  { ssr: false }
);

export function SelectedWork() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "Full-stack", "Backend", "Frontend", "DevOps & Cloud"];
  const categoryLabels: Record<string, string> = {
    "All": t.selectedWork.all,
    "Full-stack": "Full-stack",
    "Backend": "Backend",
    "Frontend": "Frontend",
    "DevOps & Cloud": "DevOps & Cloud"
  };

  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="selected-work" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Heading */}
      <MotionWrapper>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-2">
              <span>{t.selectedWork.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {t.selectedWork.title}
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            {t.selectedWork.subtitle}
          </p>
        </div>
      </MotionWrapper>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 gap-12">
        {featuredProjects.map((project, index) => {
          const projectTitle = language === "vi" && project.titleVi ? project.titleVi : project.title;
          const projectDesc = language === "vi" && project.descriptionVi ? project.descriptionVi : project.description;
          const projectRole = language === "vi" && project.roleVi ? project.roleVi : project.role;
          const projectMetrics = language === "vi" && project.metricsVi ? project.metricsVi : project.metrics;

          return (
            <MotionWrapper key={project.id} delay={index * 0.1}>
              <div className="group relative rounded-2xl bg-zinc-950/70 border border-zinc-800/90 hover:border-emerald-500/40 p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:shadow-[0_20px_50px_-20px_rgba(16,185,129,0.15)] overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Project Info */}
                  <div className="lg:col-span-6 space-y-4">
                    {/* Meta Bar */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-900 text-emerald-400 border border-zinc-800">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">{project.year}</span>
                      <span className="text-zinc-700">•</span>
                      <span className="text-xs font-mono text-zinc-400">{projectRole}</span>
                    </div>

                    {/* Title & Description */}
                    <Link href={`/projects/${project.id}`} className="block group-hover:text-emerald-300 transition-colors">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                        <span>{projectTitle}</span>
                        <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-emerald-400 shrink-0" />
                      </h3>
                    </Link>

                    <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                      {projectDesc}
                    </p>

                    {/* Key Metrics */}
                    {projectMetrics && (
                      <div className="space-y-1.5 pt-2">
                        {projectMetrics.slice(0, 2).map((metric, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{metric}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-3">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-xs rounded-md bg-zinc-900/90 text-zinc-300 border border-zinc-800 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-2">
                      <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-zinc-950 transition-all shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t.selectedWork.viewArchitecture}</span>
                      </Link>

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                      >
                        <span>Quick Preview</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Visual Preview */}
                  <Link
                    href={`/projects/${project.id}`}
                    className="lg:col-span-6 relative aspect-[16/10] rounded-xl overflow-hidden border border-zinc-800/90 bg-zinc-900/80 shadow-lg block"
                  >
                    <Image
                      src={project.image}
                      alt={projectTitle}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                    
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-[11px] font-mono text-zinc-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>{t.selectedWork.caseStudyTag}</span>
                    </div>
                  </Link>
                </div>
              </div>
            </MotionWrapper>
          );
        })}
      </div>

      {/* View All Projects CTA Banner */}
      <MotionWrapper delay={0.2}>
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-zinc-900/90 hover:bg-emerald-500 hover:text-zinc-950 text-sm font-bold text-white border border-zinc-800 hover:border-emerald-500 transition-all duration-300 shadow-xl group"
          >
            <span>{t.selectedWork.viewAll} ({PROJECTS_DATA.length})</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </MotionWrapper>

      {/* Quick Preview Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
