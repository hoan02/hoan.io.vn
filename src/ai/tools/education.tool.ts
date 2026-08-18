import { tool } from "ai";
import { GetEducationSchema } from "../schemas/domain";
import { educationRepository } from "@/db/repositories/education.repo";

export const getEducation = tool({
  description:
    "Lấy thông tin học vấn của Hoan bao gồm: trường đại học, bằng cấp kỹ sư, xếp loại tốt nghiệp, niên khoá, chuyên ngành và đề tài tốt nghiệp.",
  inputSchema: GetEducationSchema,
  execute: async () => {
    return await educationRepository.getEducation();
  },
});
