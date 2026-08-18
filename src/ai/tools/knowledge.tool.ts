import { tool } from "ai";
import { SearchKnowledgeSchema } from "../schemas/domain";
import { knowledgeRepository } from "@/db/repositories/knowledge.repo";
import { z } from "zod";

export const searchKnowledge = tool({
  description:
    "Tìm kiếm tài liệu bài viết kỹ thuật chuyên sâu, case study kiến trúc hệ thống và ghi chép kỹ thuật đã xuất bản trên /writing của Hoan.",
  inputSchema: SearchKnowledgeSchema,
  execute: async ({ query, limit }: z.infer<typeof SearchKnowledgeSchema>) => {
    return await knowledgeRepository.searchKnowledge(query, limit);
  },
});
