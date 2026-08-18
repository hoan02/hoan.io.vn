import { getDbClient } from "../client";
import { SEED_EDUCATION } from "@/knowledge/seed/education";
import { Education } from "@/knowledge/types";

export class EducationRepository {
  async getEducation(): Promise<Education> {
    const sql = getDbClient();
    if (!sql) {
      return SEED_EDUCATION;
    }

    try {
      const rows = await sql`
        SELECT 
          school,
          school_vi as "schoolVi",
          degree,
          degree_vi as "degreeVi",
          honor,
          honor_vi as "honorVi",
          period,
          major,
          capstone_topic as "capstoneTopic",
          achievements
        FROM education 
        LIMIT 1
      `;
      if (rows && rows.length > 0) {
        return rows[0] as unknown as Education;
      }
    } catch (error) {
      console.warn("Error fetching education from Neon DB, falling back to seed data:", error);
    }

    return SEED_EDUCATION;
  }
}

export const educationRepository = new EducationRepository();
