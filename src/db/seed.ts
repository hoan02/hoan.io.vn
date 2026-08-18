import { neon } from "@neondatabase/serverless";
import {
  SEED_PROFILE,
  SEED_EDUCATION,
  SEED_EXPERIENCES,
  SEED_SKILLS,
  SEED_PROJECTS,
  SEED_KNOWLEDGE_DOCUMENTS,
} from "../knowledge/seed";

export async function runMigrationAndSeed() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined in environment.");
    process.exit(1);
  }

  console.log("Connecting to Neon PostgreSQL...");
  const sql = neon(databaseUrl);

  try {
    console.log("1. Enabling pgvector extension...");
    await sql`CREATE EXTENSION IF NOT EXISTS vector;`;

    console.log("2. Creating tables...");
    await sql`
      CREATE TABLE IF NOT EXISTS profiles (
        id VARCHAR(50) PRIMARY KEY DEFAULT 'hoan',
        full_name VARCHAR(100) NOT NULL,
        full_name_vi VARCHAR(100) NOT NULL,
        display_name VARCHAR(50) NOT NULL,
        birthday VARCHAR(20) NOT NULL,
        birth_year INT NOT NULL,
        age INT NOT NULL,
        location VARCHAR(100) NOT NULL,
        headline TEXT NOT NULL,
        summary TEXT NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        cv_url VARCHAR(255) NOT NULL,
        website VARCHAR(255) NOT NULL,
        interests JSONB NOT NULL DEFAULT '[]'::jsonb,
        hobbies JSONB NOT NULL DEFAULT '[]'::jsonb,
        social_links JSONB NOT NULL DEFAULT '[]'::jsonb,
        open_source_orgs JSONB NOT NULL DEFAULT '[]'::jsonb,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS education (
        id VARCHAR(50) PRIMARY KEY DEFAULT 'utc',
        school VARCHAR(150) NOT NULL,
        school_vi VARCHAR(150) NOT NULL,
        degree VARCHAR(150) NOT NULL,
        degree_vi VARCHAR(150) NOT NULL,
        honor VARCHAR(100) NOT NULL,
        honor_vi VARCHAR(100) NOT NULL,
        period VARCHAR(50) NOT NULL,
        major VARCHAR(100) NOT NULL,
        capstone_topic TEXT,
        achievements JSONB NOT NULL DEFAULT '[]'::jsonb,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS experiences (
        id VARCHAR(50) PRIMARY KEY,
        company VARCHAR(100) NOT NULL,
        role VARCHAR(100) NOT NULL,
        period VARCHAR(50) NOT NULL,
        location VARCHAR(100) NOT NULL,
        summary TEXT NOT NULL,
        contributions JSONB NOT NULL DEFAULT '[]'::jsonb,
        tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
        display_order INT DEFAULT 0
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS skill_categories (
        category VARCHAR(50) PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        items JSONB NOT NULL DEFAULT '[]'::jsonb,
        display_order INT DEFAULT 0
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(50) PRIMARY KEY,
        slug VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(150) NOT NULL,
        organization VARCHAR(100),
        role VARCHAR(100) NOT NULL,
        period VARCHAR(50),
        year VARCHAR(20),
        summary TEXT NOT NULL,
        problem TEXT NOT NULL,
        tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
        domains JSONB NOT NULL DEFAULT '[]'::jsonb,
        competencies JSONB NOT NULL DEFAULT '[]'::jsonb,
        architecture JSONB NOT NULL DEFAULT '[]'::jsonb,
        challenges JSONB NOT NULL DEFAULT '[]'::jsonb,
        solutions JSONB NOT NULL DEFAULT '[]'::jsonb,
        outcomes JSONB NOT NULL DEFAULT '[]'::jsonb,
        repositories JSONB NOT NULL DEFAULT '[]'::jsonb,
        links JSONB NOT NULL DEFAULT '[]'::jsonb,
        evidence JSONB NOT NULL DEFAULT '[]'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS knowledge_documents (
        id VARCHAR(50) PRIMARY KEY,
        slug VARCHAR(100) UNIQUE NOT NULL,
        title TEXT NOT NULL,
        category VARCHAR(50) NOT NULL,
        summary TEXT NOT NULL,
        content TEXT NOT NULL,
        tags JSONB NOT NULL DEFAULT '[]'::jsonb,
        url VARCHAR(255) NOT NULL
      );
    `;

    console.log("3. Seeding Profile...");
    await sql`
      INSERT INTO profiles (
        id, full_name, full_name_vi, display_name, birthday, birth_year, age,
        location, headline, summary, email, phone, cv_url, website,
        interests, hobbies, social_links, open_source_orgs
      ) VALUES (
        'hoan',
        ${SEED_PROFILE.fullName},
        ${SEED_PROFILE.fullNameVi},
        ${SEED_PROFILE.displayName},
        ${SEED_PROFILE.birthday},
        ${SEED_PROFILE.birthYear},
        ${SEED_PROFILE.age},
        ${SEED_PROFILE.location},
        ${SEED_PROFILE.headline},
        ${SEED_PROFILE.summary},
        ${SEED_PROFILE.email},
        ${SEED_PROFILE.phone},
        ${SEED_PROFILE.cvUrl},
        ${SEED_PROFILE.website},
        ${JSON.stringify(SEED_PROFILE.interests)},
        ${JSON.stringify(SEED_PROFILE.hobbies)},
        ${JSON.stringify(SEED_PROFILE.socialLinks)},
        ${JSON.stringify(SEED_PROFILE.openSourceOrganizations)}
      )
      ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        full_name_vi = EXCLUDED.full_name_vi,
        headline = EXCLUDED.headline,
        summary = EXCLUDED.summary,
        interests = EXCLUDED.interests,
        hobbies = EXCLUDED.hobbies,
        open_source_orgs = EXCLUDED.open_source_orgs,
        updated_at = CURRENT_TIMESTAMP;
    `;

    console.log("4. Seeding Education...");
    await sql`
      INSERT INTO education (
        id, school, school_vi, degree, degree_vi, honor, honor_vi,
        period, major, capstone_topic, achievements
      ) VALUES (
        'utc',
        ${SEED_EDUCATION.school},
        ${SEED_EDUCATION.schoolVi},
        ${SEED_EDUCATION.degree},
        ${SEED_EDUCATION.degreeVi},
        ${SEED_EDUCATION.honor},
        ${SEED_EDUCATION.honorVi},
        ${SEED_EDUCATION.period},
        ${SEED_EDUCATION.major},
        ${SEED_EDUCATION.capstoneTopic || null},
        ${JSON.stringify(SEED_EDUCATION.achievements || [])}
      )
      ON CONFLICT (id) DO UPDATE SET
        honor = EXCLUDED.honor,
        honor_vi = EXCLUDED.honor_vi,
        updated_at = CURRENT_TIMESTAMP;
    `;

    console.log("5. Seeding Experiences...");
    for (let i = 0; i < SEED_EXPERIENCES.length; i++) {
      const exp = SEED_EXPERIENCES[i];
      await sql`
        INSERT INTO experiences (
          id, company, role, period, location, summary, contributions, tech_stack, display_order
        ) VALUES (
          ${exp.id},
          ${exp.company},
          ${exp.role},
          ${exp.period},
          ${exp.location},
          ${exp.summary},
          ${JSON.stringify(exp.contributions)},
          ${JSON.stringify(exp.techStack)},
          ${i}
        )
        ON CONFLICT (id) DO UPDATE SET
          role = EXCLUDED.role,
          period = EXCLUDED.period,
          summary = EXCLUDED.summary,
          contributions = EXCLUDED.contributions,
          tech_stack = EXCLUDED.tech_stack;
      `;
    }

    console.log("6. Seeding Skills...");
    for (let i = 0; i < SEED_SKILLS.length; i++) {
      const skill = SEED_SKILLS[i];
      await sql`
        INSERT INTO skill_categories (
          category, title, items, display_order
        ) VALUES (
          ${skill.category},
          ${skill.title},
          ${JSON.stringify(skill.items)},
          ${i}
        )
        ON CONFLICT (category) DO UPDATE SET
          title = EXCLUDED.title,
          items = EXCLUDED.items;
      `;
    }

    console.log("7. Seeding Projects (Arda, Puchi, EPAS, CamRelay, B4S)...");
    for (const p of SEED_PROJECTS) {
      await sql`
        INSERT INTO projects (
          id, slug, name, organization, role, period, year,
          summary, problem, tech_stack, domains, competencies,
          architecture, challenges, solutions, outcomes,
          repositories, links, evidence
        ) VALUES (
          ${p.id},
          ${p.slug},
          ${p.name},
          ${p.organization || null},
          ${p.role},
          ${p.period || null},
          ${p.year || null},
          ${p.summary},
          ${p.problem},
          ${JSON.stringify(p.techStack)},
          ${JSON.stringify(p.domains)},
          ${JSON.stringify(p.competencies)},
          ${JSON.stringify(p.architecture)},
          ${JSON.stringify(p.challenges)},
          ${JSON.stringify(p.solutions)},
          ${JSON.stringify(p.outcomes)},
          ${JSON.stringify(p.repositories || [])},
          ${JSON.stringify(p.links || [])},
          ${JSON.stringify(p.evidence || [])}
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          summary = EXCLUDED.summary,
          problem = EXCLUDED.problem,
          tech_stack = EXCLUDED.tech_stack,
          domains = EXCLUDED.domains,
          competencies = EXCLUDED.competencies,
          architecture = EXCLUDED.architecture,
          challenges = EXCLUDED.challenges,
          solutions = EXCLUDED.solutions,
          outcomes = EXCLUDED.outcomes,
          repositories = EXCLUDED.repositories,
          links = EXCLUDED.links,
          evidence = EXCLUDED.evidence;
      `;
    }

    console.log("8. Seeding Knowledge Documents...");
    for (const doc of SEED_KNOWLEDGE_DOCUMENTS) {
      await sql`
        INSERT INTO knowledge_documents (
          id, slug, title, category, summary, content, tags, url
        ) VALUES (
          ${doc.id},
          ${doc.slug},
          ${doc.title},
          ${doc.category},
          ${doc.summary},
          ${doc.content},
          ${JSON.stringify(doc.tags)},
          ${doc.url}
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          summary = EXCLUDED.summary,
          content = EXCLUDED.content,
          tags = EXCLUDED.tags;
      `;
    }

    console.log("\n✅ SUCCESS: Neon PostgreSQL schema created & seeded successfully!");
  } catch (error) {
    console.error("❌ Migration/Seed Error:", error);
    process.exit(1);
  }
}

runMigrationAndSeed();
