import { z } from "zod";

export const GetProfileSchema = z.object({});

export const GetEducationSchema = z.object({});

export const GetExperienceSchema = z.object({
  company: z
    .string()
    .optional()
    .describe("Tên công ty cần tra cứu (ví dụ 'NGV Group', 'MochiMochi') hoặc bỏ trống để lấy toàn bộ"),
});

export const GetSkillsSchema = z.object({
  category: z
    .enum(["frontend", "backend", "devops", "database", "iot_systems", "architecture", "all"])
    .optional()
    .describe("Nhóm kỹ năng cần lọc: frontend, backend, devops, database, iot_systems, architecture, hoặc all"),
});

export const GetProjectsSchema = z.object({
  organization: z
    .string()
    .optional()
    .describe("Lọc theo tổ chức (ví dụ 'ARDA Labs', 'Puchidemy', 'NGV Group')"),
  technology: z
    .string()
    .optional()
    .describe("Lọc theo công nghệ (ví dụ 'Go', 'Kubernetes', 'Angular', 'Rust', 'Next.js')"),
  domain: z
    .string()
    .optional()
    .describe("Lọc theo lĩnh vực (ví dụ 'FinOps', 'Microservices', 'IoT', 'EdTech')"),
});

export const GetProjectSchema = z.object({
  slug: z
    .string()
    .describe("Slug hoặc ID của dự án cần xem chi tiết: 'arda', 'puchi', 'epas', 'camrelay', 'b4s'"),
});

export const SearchProjectsSchema = z.object({
  query: z
    .string()
    .describe("Từ khoá tìm kiếm năng lực hoặc công nghệ trong dự án (ví dụ 'Kubernetes', 'distributed systems', 'authentication', 'micro-frontend', 'Rust')"),
  competency: z
    .string()
    .optional()
    .describe("Năng lực kỹ thuật cụ thể cần tìm"),
});

export const SearchKnowledgeSchema = z.object({
  query: z
    .string()
    .describe("Câu truy vấn tìm kiếm thông tin chuyên sâu, bài viết kỹ thuật, hoặc bằng chứng kỹ thuật"),
  limit: z
    .number()
    .optional()
    .default(3)
    .describe("Số lượng tài liệu tối đa cần trả về"),
});
