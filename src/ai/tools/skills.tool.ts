import { tool } from "ai";
import { GetSkillsSchema } from "../schemas/domain";
import { skillsRepository } from "@/db/repositories/skills.repo";
import { z } from "zod";

export const getSkills = tool({
  description:
    "Lấy danh sách kỹ năng chuyên môn, nhóm công nghệ (frontend, backend, devops, database, iot_systems, architecture) và năng lực cụ thể của Hoan.",
  inputSchema: GetSkillsSchema,
  execute: async ({ category }: z.infer<typeof GetSkillsSchema>) => {
    return await skillsRepository.getSkills({ category });
  },
});
