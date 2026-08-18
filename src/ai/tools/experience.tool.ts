import { tool } from "ai";
import { GetExperienceSchema } from "../schemas/domain";
import { experienceRepository } from "@/db/repositories/experience.repo";
import { z } from "zod";

export const getExperience = tool({
  description:
    "Lấy kinh nghiệm làm việc và các công ty Hoan đã/đang làm (NGV Group, MochiMochi), vai trò, thời gian, tech stack và đóng góp chi tiết.",
  inputSchema: GetExperienceSchema,
  execute: async ({ company }: z.infer<typeof GetExperienceSchema>) => {
    return await experienceRepository.getExperiences({ company });
  },
});
