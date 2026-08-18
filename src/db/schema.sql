-- Neon PostgreSQL Schema for hoan.io.vn portfolio knowledge
-- Prepared for vector embeddings & Full-Text Search

CREATE EXTENSION IF NOT EXISTS vector;

-- 1. Profile Table
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

-- 2. Education Table
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

-- 3. Experiences Table
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

-- 4. Skills Table
CREATE TABLE IF NOT EXISTS skill_categories (
    category VARCHAR(50) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    display_order INT DEFAULT 0
);

-- 5. Projects Table
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

-- 6. Knowledge Documents Table (Full-text search & pgvector ready)
CREATE TABLE IF NOT EXISTS knowledge_documents (
    id VARCHAR(50) PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    url VARCHAR(255) NOT NULL,
    -- Optional vector column for Phase 2: embedding vector(1536),
    tsv tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(summary, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(content, '')), 'C')
    ) STORED
);

CREATE INDEX IF NOT EXISTS idx_knowledge_tsv ON knowledge_documents USING GIN(tsv);
