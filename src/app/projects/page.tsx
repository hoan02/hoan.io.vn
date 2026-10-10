"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SiteShell } from "@/components/layout/SiteShell";
import { PROJECTS_DATA } from "@/data/portfolioData";
import { getProjectEditorial, PROJECT_GROUP_ORDER } from "@/data/projectEditorial";
import { UI_TRANSLATIONS } from "@/data/translations";

const CATEGORIES = ["All", "Full-stack", "Backend", "Frontend", "DevOps & Cloud", "Systems & IoT", "Desktop & IoT"];

function ProjectsContent() {
  const { language } = useLanguage();
  const vi = language === "vi";
  const t = UI_TRANSLATIONS[language];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const title = vi && project.titleVi ? project.titleVi : project.title;
      const desc = vi && project.descriptionVi ? project.descriptionVi : project.description;
      const subtitle = vi && project.subtitleVi ? project.subtitleVi : project.subtitle;

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
  }, [searchQuery, selectedCategory, vi]);

  const groups = useMemo(() => {
    const result: { key: string; label: string; items: typeof filteredProjects }[] = [];
    const keys: string[] = [...PROJECT_GROUP_ORDER, "other"];
    for (const key of keys) {
      const items = filteredProjects.filter((p) => (getProjectEditorial(p)?.group ?? "other") === key);
      if (items.length === 0) continue;
      const ed = getProjectEditorial(items[0]);
      const label = ed ? (vi ? ed.groupLabelVi : ed.groupLabel) : vi ? "Khác" : "Other";
      result.push({ key, label, items });
    }
    return result;
  }, [filteredProjects, vi]);

  return (
    <SiteShell>
      <div className="page-wrap pt-16 pb-24">
        <header className="mb-10 max-w-3xl">
          <p className="eyebrow mb-3">{t.selectedWork.badge}</p>
          <h1 className="text-4xl sm:text-5xl mb-4">
            <span className="mark mark-draw">{vi ? "Dự án & Case Study Kỹ thuật" : "Engineering Projects & Case Studies"}</span>
          </h1>
          <p className="text-muted">
            {vi
              ? "Các dự án được chia theo hệ thống chuyên nghiệp, sản phẩm tự xây dựng và các thử nghiệm hệ thống. Mỗi case study bắt đầu từ bối cảnh, phạm vi đóng góp và những điểm kỹ thuật được đào sâu trong phần Writing."
              : "Professional systems, self-owned products, and systems experiments. Each case study starts with context, ownership, and the engineering threads explored in Writing."}
          </p>
        </header>

        <div className="space-y-6 mb-12">
          <div className="flex items-end gap-4 max-w-xl border-b-2 border-ink">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.selectedWork.searchPlaceholder}
              aria-label={t.selectedWork.searchPlaceholder}
              className="hand flex-1 bg-transparent py-2 text-xl text-ink placeholder:text-faint focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="link font-mono text-xs py-2"
              >
                {vi ? "Xóa" : "Clear"}
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2" role="group" aria-label={t.selectedWork.filterByCategory}>
            <span className="eyebrow">{t.selectedWork.filterByCategory}</span>
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={active}
                  className={`hand sketch min-h-10 px-3.5 text-lg ${
                    active ? "bg-ink text-paper" : "text-ink hover:bg-marker/50"
                  }`}
                >
                  {category === "All" ? t.selectedWork.allCategories : category}
                </button>
              );
            })}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="border-y border-rule py-16">
            <p className="font-mono text-sm text-muted">
              {vi ? "Không tìm thấy dự án phù hợp." : "No matching engineering projects found."}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="link mt-3 text-sm"
            >
              {vi ? "Đặt lại bộ lọc" : "Reset filters"}
            </button>
          </div>
        ) : (
          <div className="space-y-14">
            {groups.map((group) => (
              <section key={group.key} aria-labelledby={`group-${group.key}`}>
                <h2 id={`group-${group.key}`} className="eyebrow mb-6 text-xl">
                  {group.label}
                </h2>
                <ul className="grid gap-8 pt-2 sm:grid-cols-2">
                  {group.items.map((project) => {
                    const title = vi && project.titleVi ? project.titleVi : project.title;
                    const subtitle = vi && project.subtitleVi ? project.subtitleVi : project.subtitle;
                    const role = vi && project.roleVi ? project.roleVi : project.role;
                    return (
                      <li key={project.id}>
                        <Link
                          href={`/projects/${project.id}`}
                          className="note group flex h-full flex-col px-6 pb-6 pt-8"
                          style={{ transform: `rotate(${(project.id.length % 3) - 1}deg)` }}
                        >
                          <div className="hand space-y-0.5 text-lg">
                            <p>{project.year}</p>
                            <p className="text-base text-faint">{role}</p>
                          </div>
                          <div className="mt-2">
                            <h3 className="text-2xl">{title}</h3>
                            <p className="mt-2 text-muted max-w-2xl">{subtitle}</p>
                            <p className="mt-4 font-mono text-xs text-faint">
                              {project.techStack.slice(0, 7).join(" · ")}
                            </p>
                            <p className="mt-3 text-sm link inline-block">{t.selectedWork.viewArchitecture} →</p>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}

export default function ProjectsPage() {
  return <ProjectsContent />;
}
