import { getDbClient } from "../client";
import { SEED_EXPERIENCES } from "@/knowledge/seed/experience";
import { Experience } from "@/knowledge/types";

export class ExperienceRepository {
  async getExperiences(filter?: { company?: string }): Promise<Experience[]> {
    const sql = getDbClient();
    if (!sql) {
      return this.filterInMemory(filter);
    }

    try {
      let rows;
      if (filter?.company) {
        rows = await sql`
          SELECT 
            id,
            company,
            role,
            period,
            location,
            summary,
            contributions,
            tech_stack as "techStack"
          FROM experiences 
          WHERE company ILIKE ${`%${filter.company}%`}
          ORDER BY display_order ASC
        `;
      } else {
        rows = await sql`
          SELECT 
            id,
            company,
            role,
            period,
            location,
            summary,
            contributions,
            tech_stack as "techStack"
          FROM experiences 
          ORDER BY display_order ASC
        `;
      }

      if (rows && rows.length > 0) {
        return rows as unknown as Experience[];
      }
    } catch (error) {
      console.warn("Error fetching experiences from Neon DB, falling back to seed data:", error);
    }

    return this.filterInMemory(filter);
  }

  private filterInMemory(filter?: { company?: string }): Experience[] {
    if (!filter?.company) {
      return SEED_EXPERIENCES;
    }
    const q = filter.company.toLowerCase();
    return SEED_EXPERIENCES.filter((exp) => exp.company.toLowerCase().includes(q));
  }
}

export const experienceRepository = new ExperienceRepository();
