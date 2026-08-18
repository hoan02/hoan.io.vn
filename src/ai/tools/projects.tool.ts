import { tool } from "ai";
import {
  GetProjectsSchema,
  GetProjectSchema,
  SearchProjectsSchema,
} from "../schemas/domain";
import { projectRepository } from "@/db/repositories/project.repo";
import { z } from "zod";

export const getProjects = tool({
  description:
    "Lấy danh sách tổng quan các dự án tiêu biểu (Arda Labs, Puchidemy, EPAS, CamRelay, B4S) kèm tech stack, tổ chức và tóm tắt.",
  inputSchema: GetProjectsSchema,
  execute: async ({
    organization,
    technology,
    domain,
  }: z.infer<typeof GetProjectsSchema>) => {
    return await projectRepository.getProjects({ organization, technology, domain });
  },
});

export const getProject = tool({
  description:
    "Lấy chi tiết chuyên sâu về một dự án cụ thể theo slug ('arda', 'puchi', 'epas', 'camrelay', 'b4s') bao gồm: bài toán, kiến trúc hệ thống, thách thức kỹ thuật, giải pháp, kết quả, repositories và evidence.",
  inputSchema: GetProjectSchema,
  execute: async ({ slug }: z.infer<typeof GetProjectSchema>) => {
    return await projectRepository.getProjectBySlug(slug);
  },
});

export const searchProjects = tool({
  description:
    "Tìm kiếm dự án chứng minh năng lực kỹ thuật của Hoan (ví dụ: 'Kubernetes', 'Go microservices', 'distributed systems', 'authentication', 'Rust', 'Module Federation').",
  inputSchema: SearchProjectsSchema,
  execute: async ({ query, competency }: z.infer<typeof SearchProjectsSchema>) => {
    return await projectRepository.searchProjects(query, competency);
  },
});
