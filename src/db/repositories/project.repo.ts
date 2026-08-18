import { getDbClient } from "../client";
import { SEED_PROJECTS } from "@/knowledge/seed/projects";
import { Project } from "@/knowledge/types";

export class ProjectRepository {
  async getProjects(filter?: {
    organization?: string;
    technology?: string;
    domain?: string;
  }): Promise<Project[]> {
    const sql = getDbClient();
    if (!sql) {
      return this.filterProjectsInMemory(filter);
    }

    try {
      const rows = await sql`
        SELECT 
          id,
          slug,
          name,
          organization,
          role,
          period,
          year,
          summary,
          problem,
          tech_stack as "techStack",
          domains,
          competencies,
          architecture,
          challenges,
          solutions,
          outcomes,
          repositories,
          links,
          evidence
        FROM projects
        ORDER BY created_at DESC
      `;

      if (rows && rows.length > 0) {
        let projects = rows as unknown as Project[];
        if (filter?.organization) {
          const org = filter.organization.toLowerCase();
          projects = projects.filter((p) => p.organization?.toLowerCase().includes(org));
        }
        if (filter?.technology) {
          const tech = filter.technology.toLowerCase();
          projects = projects.filter((p) => p.techStack?.some((t) => t.toLowerCase().includes(tech)));
        }
        if (filter?.domain) {
          const dom = filter.domain.toLowerCase();
          projects = projects.filter((p) => p.domains?.some((d) => d.toLowerCase().includes(dom)));
        }
        return projects;
      }
    } catch (error) {
      console.warn("Error fetching projects from Neon DB, falling back to seed data:", error);
    }

    return this.filterProjectsInMemory(filter);
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const cleanSlug = slug.trim().toLowerCase();
    const sql = getDbClient();
    if (!sql) {
      return (
        SEED_PROJECTS.find(
          (p) => p.slug.toLowerCase() === cleanSlug || p.id.toLowerCase() === cleanSlug
        ) || null
      );
    }

    try {
      const rows = await sql`
        SELECT 
          id,
          slug,
          name,
          organization,
          role,
          period,
          year,
          summary,
          problem,
          tech_stack as "techStack",
          domains,
          competencies,
          architecture,
          challenges,
          solutions,
          outcomes,
          repositories,
          links,
          evidence
        FROM projects
        WHERE slug = ${cleanSlug} OR id = ${cleanSlug}
        LIMIT 1
      `;
      if (rows && rows.length > 0) {
        return rows[0] as unknown as Project;
      }
    } catch (error) {
      console.warn(`Error fetching project ${slug} from Neon DB:`, error);
    }

    return (
      SEED_PROJECTS.find(
        (p) => p.slug.toLowerCase() === cleanSlug || p.id.toLowerCase() === cleanSlug
      ) || null
    );
  }

  async searchProjects(query: string, competency?: string): Promise<Project[]> {
    const q = query.toLowerCase();
    const c = competency?.toLowerCase();

    return SEED_PROJECTS.filter((p) => {
      const matchesTech = p.techStack.some((t) => t.toLowerCase().includes(q));
      const matchesCompetency =
        p.competencies.some((comp) => comp.toLowerCase().includes(q)) ||
        (c ? p.competencies.some((comp) => comp.toLowerCase().includes(c)) : false);
      const matchesDomain = p.domains.some((d) => d.toLowerCase().includes(q));
      const matchesSummary = p.summary.toLowerCase().includes(q) || p.problem.toLowerCase().includes(q);
      const matchesArchitecture = p.architecture.some((a) => a.toLowerCase().includes(q));

      return matchesTech || matchesCompetency || matchesDomain || matchesSummary || matchesArchitecture;
    });
  }

  private filterProjectsInMemory(filter?: {
    organization?: string;
    technology?: string;
    domain?: string;
  }): Project[] {
    let list = SEED_PROJECTS;
    if (filter?.organization) {
      const org = filter.organization.toLowerCase();
      list = list.filter((p) => p.organization?.toLowerCase().includes(org));
    }
    if (filter?.technology) {
      const tech = filter.technology.toLowerCase();
      list = list.filter((p) => p.techStack.some((t) => t.toLowerCase().includes(tech)));
    }
    if (filter?.domain) {
      const dom = filter.domain.toLowerCase();
      list = list.filter((p) => p.domains.some((d) => d.toLowerCase().includes(dom)));
    }
    return list;
  }
}

export const projectRepository = new ProjectRepository();
