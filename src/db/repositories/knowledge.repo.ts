import { getDbClient } from "../client";
import { SEED_KNOWLEDGE_DOCUMENTS } from "@/knowledge/seed/documents";
import { KnowledgeDocument } from "@/knowledge/types";

export class KnowledgeRepository {
  async searchKnowledge(query: string, limit: number = 3): Promise<KnowledgeDocument[]> {
    const cleanQuery = query.trim().toLowerCase();
    const sql = getDbClient();

    if (sql) {
      try {
        const rows = await sql`
          SELECT 
            id,
            slug,
            title,
            category,
            summary,
            content,
            tags,
            url
          FROM knowledge_documents
          WHERE 
            title ILIKE ${`%${cleanQuery}%`} 
            OR summary ILIKE ${`%${cleanQuery}%`}
            OR content ILIKE ${`%${cleanQuery}%`}
          LIMIT ${limit}
        `;
        if (rows && rows.length > 0) {
          return rows as unknown as KnowledgeDocument[];
        }
      } catch (error) {
        console.warn("Search in Neon DB failed, falling back to in-memory search:", error);
      }
    }

    // In-memory text matching & ranking
    const queryTokens = cleanQuery.split(/\s+/).filter(Boolean);
    const scoredDocs = SEED_KNOWLEDGE_DOCUMENTS.map((doc) => {
      let score = 0;
      const titleLower = doc.title.toLowerCase();
      const summaryLower = doc.summary.toLowerCase();
      const contentLower = doc.content.toLowerCase();
      const tagsLower = doc.tags.map((t) => t.toLowerCase());

      queryTokens.forEach((token) => {
        if (titleLower.includes(token)) score += 10;
        if (tagsLower.some((t) => t.includes(token))) score += 8;
        if (summaryLower.includes(token)) score += 5;
        if (contentLower.includes(token)) score += 2;
      });

      return { doc, score };
    });

    return scoredDocs
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.doc);
  }
}

export const knowledgeRepository = new KnowledgeRepository();
