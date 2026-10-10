"use client";

import React, { useState } from "react";
import { Squiggle } from "@/components/common/Doodles";
import Link from "next/link";
import { Project } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { SiteShell, useAskAI } from "@/components/layout/SiteShell";
import { UI_TRANSLATIONS } from "@/data/translations";
import { PROJECTS_DATA, ARTICLES_DATA } from "@/data/portfolioData";
import { getProjectEditorial } from "@/data/projectEditorial";
import { DIAGRAM_MAP } from "@/components/diagrams/ArchitectureDiagrams";

interface ProjectDetailViewProps {
  project: Project;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl sm:text-3xl pt-2 mb-5"><Squiggle className="mb-2" />{children}</h2>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 list-disc pl-5 marker:text-faint">
      {items.map((item, idx) => (
        <li key={idx} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

function ProjectDetailContent({ project }: ProjectDetailViewProps) {
  const { language } = useLanguage();
  const vi = language === "vi";
  const t = UI_TRANSLATIONS[language];
  const { openAI } = useAskAI();
  const [copiedLink, setCopiedLink] = useState(false);

  const projectTitle = vi && project.titleVi ? project.titleVi : project.title;
  const projectSubtitle = vi && project.subtitleVi ? project.subtitleVi : project.subtitle;
  const projectDesc = vi && project.descriptionVi ? project.descriptionVi : project.description;
  const projectProblem = vi && project.problemVi ? project.problemVi : project.problem;
  const projectRole = vi && project.roleVi ? project.roleVi : project.role;
  const projectArchitecture = vi && project.architectureVi ? project.architectureVi : project.architecture;
  const projectContributions = vi && project.contributionsDetailedVi ? project.contributionsDetailedVi : project.contributionsDetailed;
  const projectMetrics = vi && project.metricsVi ? project.metricsVi : project.metrics;
  const editorial = getProjectEditorial(project);
  const projectOverview = vi ? editorial?.contextVi : editorial?.context;
  const projectResults = editorial
    ? vi ? editorial.outcomesVi : editorial.outcomes
    : vi && project.resultsVi ? project.resultsVi : project.results;
  const editorialArticleSlugs = editorial ? editorial.highlights.flatMap((h) => h.articleSlugs) : [];

  const DiagramComponent = DIAGRAM_MAP[project.id];

  const relatedArticleSlugs = Array.from(new Set([...(project.relatedArticles || []), ...editorialArticleSlugs]));
  const relatedArticles = ARTICLES_DATA.filter((a) => relatedArticleSlugs.includes(a.slug));

  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? PROJECTS_DATA[currentIndex - 1] : null;
  const nextProject = currentIndex < PROJECTS_DATA.length - 1 ? PROJECTS_DATA[currentIndex + 1] : null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const meta = [
    project.year,
    projectRole,
    project.category,
    editorial ? (vi ? editorial.statusVi : editorial.status) : null,
  ].filter(Boolean);

  const hasLive = project.liveUrl && project.liveUrl !== "#contact";

  const infra = editorial?.infrastructureProfile;
  const infraRows = infra
    ? [
        { label: "Host", value: vi ? infra.hostVi : infra.host },
        { label: vi ? "Tài nguyên" : "Compute", value: vi ? infra.computeVi : infra.compute },
        { label: vi ? "Ảo hóa" : "Virtualization", value: vi ? infra.virtualizationVi : infra.virtualization },
        { label: "Guest nodes", value: vi ? infra.guestsVi : infra.guests },
      ]
    : [];

  return (
    <SiteShell>
      <article className="reading-wrap pt-12 pb-24">
        <div className="flex items-center justify-between gap-4 mb-10 text-sm">
          <Link href="/projects" className="link">
            ← {t.selectedWork.backToProjects}
          </Link>
          <button type="button" onClick={handleCopyLink} className="link font-mono text-xs">
            {copiedLink ? (vi ? "Đã sao chép" : "Copied") : vi ? "Sao chép liên kết" : "Copy link"}
          </button>
        </div>

        <header className="mb-12">
          <p className="eyebrow mb-4">{meta.join(" · ")}</p>
          <h1 className="text-4xl sm:text-5xl leading-tight mb-4"><span className="mark mark-draw">{projectTitle}</span></h1>
          <p className="text-lg text-muted mb-6">{projectSubtitle}</p>
          <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="link">
                {t.selectedWork.repository} ↗
              </a>
            )}
            {hasLive && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link">
                {vi ? "Bản triển khai" : "Live"} ↗
              </a>
            )}
            <button type="button" onClick={openAI} className="link">
              {vi ? "Hỏi AI về dự án này" : "Ask AI about this project"}
            </button>
          </p>
        </header>

        <div className="space-y-14">
          {editorial && (
            <section>
              <H2>{vi ? "Hệ thống này phục vụ điều gì" : "What this system is for"}</H2>
              <p className="leading-relaxed">{vi ? editorial.contextVi : editorial.context}</p>
              <h3 className="eyebrow font-sans font-normal mt-8 mb-2">
                {vi ? "Phạm vi Hoan trực tiếp phụ trách" : "What I owned"}
              </h3>
              <p className="leading-relaxed text-muted">{vi ? editorial.roleScopeVi : editorial.roleScope}</p>
              {editorial.publicNote && (
                <p className="mt-6 text-sm text-faint leading-relaxed">
                  {vi ? editorial.publicNoteVi : editorial.publicNote}
                </p>
              )}
            </section>
          )}

          {infra && (
            <section>
              <H2>{vi ? "Cấu hình Homelab hiện tại" : "Current homelab profile"}</H2>
              <p className="text-muted mb-5">
                {vi
                  ? "Đây là topology thực tế của lab hiện tại, tách biệt với các cụm bare-metal nhiều node dùng cho những hệ thống khác."
                  : "This is the actual current lab topology, separate from the multi-node bare-metal clusters used by other systems."}
              </p>
              <dl className="divide-y divide-rule border-y border-rule">
                {infraRows.map((row) => (
                  <div key={row.label} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6 py-3">
                    <dt className="eyebrow pt-0.5">{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <section>
            <H2>{t.selectedWork.overview}</H2>
            <p className="leading-relaxed">{projectOverview || projectDesc}</p>
            {projectProblem && (
              <>
                <h3 className="eyebrow font-sans font-normal mt-8 mb-2">{t.selectedWork.problem}</h3>
                <p className="leading-relaxed text-muted">{projectProblem}</p>
              </>
            )}
          </section>

          {editorial?.workflowAreas && editorial.workflowAreas.length > 0 && (
            <section>
              <H2>{vi ? "Phạm vi nghiệp vụ" : "Business workflow surface"}</H2>
              <p className="text-muted mb-5">
                {vi
                  ? "EPAS không phải một bộ màn hình rời rạc: mỗi phân hệ là một phần của chuỗi nghiệp vụ có dữ liệu, trạng thái, người xử lý và đầu ra báo cáo."
                  : "EPAS is not a collection of isolated screens: each module is part of a business chain with data, state, responsible actors, and reporting outputs."}
              </p>
              <ol className="divide-y divide-rule border-y border-rule">
                {editorial.workflowAreas.map((area, index) => (
                  <li key={area.id} className="grid gap-1 sm:grid-cols-[3rem_1fr] sm:gap-4 py-4">
                    <span className="eyebrow pt-1">0{index + 1}</span>
                    <div>
                      <h3 className="text-lg">{vi && area.titleVi ? area.titleVi : area.title}</h3>
                      <p className="text-muted mt-1 leading-relaxed">
                        {vi && area.summaryVi ? area.summaryVi : area.summary}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {(Boolean(DiagramComponent) || Boolean(project.architectureDiagram) || (projectArchitecture && projectArchitecture.length > 0)) && (
            <section>
              <H2>{t.selectedWork.architecture}</H2>
              {DiagramComponent && (
                <figure className="mb-8 bg-code border border-rule rounded p-3 overflow-x-auto">
                  <DiagramComponent caption={`${project.title} — System Topology`} />
                </figure>
              )}
              {!DiagramComponent && project.architectureDiagram && (
                <figure className="mb-8">
                  <pre className="bg-code border border-rule rounded p-4 overflow-x-auto font-mono text-xs leading-relaxed text-ink">
                    {project.architectureDiagram}
                  </pre>
                </figure>
              )}
              {projectArchitecture && projectArchitecture.length > 0 && <Bullets items={projectArchitecture} />}
            </section>
          )}

          {projectContributions && projectContributions.length > 0 && (
            <section>
              <H2>{t.selectedWork.contributions}</H2>
              <Bullets items={projectContributions} />
            </section>
          )}

          {projectMetrics && projectMetrics.length > 0 && (
            <section>
              <H2>{t.selectedWork.metricsTitle}</H2>
              <ul className="divide-y divide-rule border-y border-rule font-mono text-sm">
                {projectMetrics.map((metric, idx) => (
                  <li key={idx} className="py-3 leading-relaxed">
                    {metric}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {projectResults && projectResults.length > 0 && (
            <section>
              <H2>{t.selectedWork.results}</H2>
              <Bullets items={projectResults} />
            </section>
          )}

          {editorial && editorial.highlights.length > 0 && (
            <section>
              <H2>{vi ? "Các điểm nổi bật được đào sâu" : "Engineering threads behind the project"}</H2>
              <p className="text-muted mb-5">
                {vi
                  ? "Mỗi điểm dưới đây dẫn tới những ghi chép tập trung vào một quyết định hoặc bài toán cụ thể."
                  : "Each thread links to notes focused on one concrete decision or engineering problem."}
              </p>
              <ul className="divide-y divide-rule border-y border-rule">
                {editorial.highlights.map((highlight) => {
                  const articles = ARTICLES_DATA.filter((a) => highlight.articleSlugs.includes(a.slug));
                  return (
                    <li key={highlight.id} className="py-5">
                      <h3 className="text-lg">{vi && highlight.titleVi ? highlight.titleVi : highlight.title}</h3>
                      <p className="text-muted mt-1 leading-relaxed">
                        {vi && highlight.summaryVi ? highlight.summaryVi : highlight.summary}
                      </p>
                      {articles.length > 0 && (
                        <ul className="mt-3 space-y-1 text-sm">
                          {articles.map((article) => (
                            <li key={article.slug}>
                              <Link href={`/writing/${article.slug}`} className="link">
                                {vi && article.titleVi ? article.titleVi : article.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <section>
            <H2>{t.selectedWork.technologies}</H2>
            <p className="font-mono text-sm text-muted leading-relaxed">{project.techStack.join(" · ")}</p>
          </section>

          {relatedArticles.length > 0 && (
            <section>
              <H2>{t.selectedWork.relatedWriting}</H2>
              <ul className="divide-y divide-rule border-y border-rule">
                {relatedArticles.map((article) => (
                  <li key={article.slug}>
                    <Link href={`/writing/${article.slug}`} className="group flex items-baseline justify-between gap-4 py-3">
                      <span className="group-hover:text-accent transition-colors">
                        {vi && article.titleVi ? article.titleVi : article.title}
                      </span>
                      <span className="eyebrow shrink-0">{article.readTime}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <nav
          aria-label={vi ? "Dự án khác" : "More projects"}
          className="mt-16 pt-6 border-t-2 border-dashed border-rule grid gap-6 sm:grid-cols-2 text-sm"
        >
          {prevProject ? (
            <Link href={`/projects/${prevProject.id}`} className="group block">
              <span className="eyebrow block mb-1">← {vi ? "Dự án trước" : "Previous project"}</span>
              <span className="font-serif text-lg group-hover:text-accent transition-colors">
                {vi && prevProject.titleVi ? prevProject.titleVi : prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextProject && (
            <Link href={`/projects/${nextProject.id}`} className="group block sm:text-right">
              <span className="eyebrow block mb-1">{vi ? "Dự án tiếp" : "Next project"} →</span>
              <span className="font-serif text-lg group-hover:text-accent transition-colors">
                {vi && nextProject.titleVi ? nextProject.titleVi : nextProject.title}
              </span>
            </Link>
          )}
        </nav>
      </article>
    </SiteShell>
  );
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  return <ProjectDetailContent project={project} />;
}
