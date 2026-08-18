import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS_DATA } from "@/data/portfolioData";
import ProjectDetailView from "./ProjectDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.id === slug);

  if (!project) {
    return {
      title: "Project Not Found | Le Cong Hoan",
    };
  }

  return {
    title: `${project.title} — Architecture Case Study | Le Cong Hoan`,
    description: project.description,
    keywords: [...project.techStack, project.category, "Software Architecture", "Le Cong Hoan"],
    openGraph: {
      title: `${project.title} — System Architecture Case Study`,
      description: project.description,
      type: "website",
      url: `https://hoan.io.vn/projects/${project.id}`,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}
