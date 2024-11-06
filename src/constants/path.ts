import { NICKNAME } from ".";

export const PATHS = {
  /** ************* SITE ****************** */
  SITE_HOME: "/",
  SITE_BLOG: "/blog",
  SITE_SNIPPET: "/snippet",
  SITE_ABOUT: "/about",
  SITEMAP: "/sitemap.xml",

  /** ************* ADMIN ****************** */
  ADMIN_HOME: "/admin",
  ADMIN_STATISTIC: "/admin/statistic",

  ADMIN_BLOG: "/admin/blog",
  ADMIN_BLOG_CREATE: "/admin/blog/create",
  ADMIN_BLOG_EDIT: "/admin/blog/edit",

  ADMIN_SNIPPET: "/admin/snippet",
  ADMIN_SNIPPET_CREATE: "/admin/snippet/create",
  ADMIN_SNIPPET_EDIT: "/admin/snippet/edit",

  ADMIN_TAG: "/admin/tag",
  ADMIN_NOTE: "/admin/note",

  /** ************* AUTH ****************** */
  AUTH_SIGN_IN: "/auth/sign-in",
  NEXT_AUTH_SIGN_IN: "/api/auth/sign-in",
};

export const PATHS_MAP: Record<string, string> = {
  /** ************* SITE ****************** */
  [PATHS.SITE_HOME]: "Home",
  [PATHS.SITE_BLOG]: "Blog",
  [PATHS.SITE_SNIPPET]: "Snippet",
  [PATHS.SITE_ABOUT]: "About",
  [PATHS.SITEMAP]: "Sitemap",

  /** ************* ADMIN ****************** */
  [PATHS.ADMIN_HOME]: "Trang chủ",
  [PATHS.ADMIN_STATISTIC]: "Thống kê",
  [PATHS.ADMIN_BLOG]: "Quản lý blog",
  [PATHS.ADMIN_BLOG_CREATE]: "Tạo blog",
  [PATHS.ADMIN_BLOG_EDIT]: "Chỉnh sửa blog",
  [PATHS.ADMIN_SNIPPET]: "Quản lý đoạn mã",
  [PATHS.ADMIN_SNIPPET_CREATE]: "Tạo đoạn mã",
  [PATHS.ADMIN_SNIPPET_EDIT]: "Chỉnh sửa đoạn mã",
  [PATHS.ADMIN_TAG]: "Quản lý thẻ",
  [PATHS.ADMIN_NOTE]: "Quản lý ghi chú",

  /** ************* AUTH ****************** */
  [PATHS.AUTH_SIGN_IN]: "Đăng nhập",
};

export const PATH_DESCRIPTION_MAP: Record<string, string> = {
  /** ************* SITE ****************** */
  [PATHS.SITE_HOME]: "Home",
  [PATHS.SITE_BLOG]: "Ở đây ghi lại những suy nghĩ, bài viết của tôi, hy vọng được cùng mọi người trao đổi ~",
  [PATHS.SITE_SNIPPET]: "Đây thường là những đoạn mã lặt vặt, thường là đoạn mã code",
  [PATHS.SITE_ABOUT]: `Đinh ~ Bạn có một bản giới thiệu về ${NICKNAME}, hãy kiểm tra nhé ~`,

  /** ************* ADMIN ****************** */
  [PATHS.ADMIN_HOME]: "Chào mừng trở lại, hãy cố gắng học hỏi nhé ~",
  [PATHS.ADMIN_STATISTIC]: "Tập hợp tất cả dữ liệu thống kê của trang",
  [PATHS.ADMIN_BLOG]: `Quản lý blog, ở đây bạn có thể thực hiện các thao tác thêm, xóa, sửa, tìm kiếm cho blog`,
  [PATHS.ADMIN_BLOG_CREATE]: "Hãy thoải mái sáng tạo ở đây!",
  [PATHS.ADMIN_BLOG_EDIT]:
    "Thế giới lộn xộn, blog cần phải sửa chữa, những bài viết tốt luôn cần được mài giũa nhiều lần",
  [PATHS.ADMIN_SNIPPET]: `Quản lý đoạn mã, ở đây bạn có thể thực hiện các thao tác thêm, xóa, sửa, tìm kiếm cho đoạn mã`,
  [PATHS.ADMIN_SNIPPET_CREATE]:
    "Nói thì dễ. Hãy cho tôi xem mã. Từ Linus Torvalds",
  [PATHS.ADMIN_SNIPPET_EDIT]: "Sửa chữa một chút, luôn tốt hơn là không có gì",
  [PATHS.ADMIN_TAG]: `Quản lý thẻ, ở đây bạn có thể thực hiện các thao tác thêm, xóa, sửa, tìm kiếm cho thẻ`,
  [PATHS.ADMIN_NOTE]: "Trí nhớ tốt không bằng viết ra, ý tưởng thoáng qua",

  /** ************* AUTH ****************** */
  [PATHS.AUTH_SIGN_IN]: "Đăng nhập",
};
