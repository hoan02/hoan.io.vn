import { tool } from "ai";
import { GetProfileSchema } from "../schemas/domain";
import { profileRepository } from "@/db/repositories/profile.repo";

export const getProfile = tool({
  description:
    "Lấy thông tin cá nhân cơ bản của Hoan bao gồm: họ tên, ngày sinh, tuổi, quê quán/nơi ở, chức danh, sở thích, thông tin liên hệ và các tổ chức mã nguồn mở.",
  inputSchema: GetProfileSchema,
  execute: async () => {
    return await profileRepository.getProfile();
  },
});
