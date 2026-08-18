import { getDbClient } from "../client";
import { SEED_SKILLS } from "@/knowledge/seed/skills";
import { SkillCategory } from "@/knowledge/types";

export class SkillsRepository {
  async getSkills(filter?: { category?: string }): Promise<SkillCategory[]> {
    const sql = getDbClient();
    if (!sql) {
      return this.filterInMemory(filter);
    }

    try {
      let rows;
      if (filter?.category && filter.category !== "all") {
        rows = await sql`
          SELECT 
            category,
            title,
            items
          FROM skill_categories 
          WHERE category = ${filter.category}
          ORDER BY display_order ASC
        `;
      } else {
        rows = await sql`
          SELECT 
            category,
            title,
            items
          FROM skill_categories 
          ORDER BY display_order ASC
        `;
      }

      if (rows && rows.length > 0) {
        return rows as unknown as SkillCategory[];
      }
    } catch (error) {
      console.warn("Error fetching skills from Neon DB, falling back to seed data:", error);
    }

    return this.filterInMemory(filter);
  }

  private filterInMemory(filter?: { category?: string }): SkillCategory[] {
    if (!filter?.category || filter.category === "all") {
      return SEED_SKILLS;
    }
    return SEED_SKILLS.filter((s) => s.category === filter.category);
  }
}

export const skillsRepository = new SkillsRepository();
