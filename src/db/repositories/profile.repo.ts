import { getDbClient } from "../client";
import { SEED_PROFILE } from "@/knowledge/seed/profile";
import { Profile } from "@/knowledge/types";

export class ProfileRepository {
  async getProfile(): Promise<Profile> {
    const sql = getDbClient();
    if (!sql) {
      return SEED_PROFILE;
    }

    try {
      const rows = await sql`
        SELECT 
          full_name as "fullName",
          full_name_vi as "fullNameVi",
          display_name as "displayName",
          birthday,
          birth_year as "birthYear",
          age,
          location,
          headline,
          summary,
          email,
          phone,
          cv_url as "cvUrl",
          website,
          interests,
          hobbies,
          social_links as "socialLinks",
          open_source_orgs as "openSourceOrganizations"
        FROM profiles 
        LIMIT 1
      `;
      if (rows && rows.length > 0) {
        return rows[0] as unknown as Profile;
      }
    } catch (error) {
      console.warn("Error fetching profile from Neon DB, falling back to seed data:", error);
    }

    return SEED_PROFILE;
  }
}

export const profileRepository = new ProfileRepository();
