import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  IconBrandGithub,
  IconLogoGoogle,
  IconSkillCSS,
  IconSkillDocker,
  IconSkillFigmaDark,
  IconSkillFigmaLight,
  IconSkillHTML,
  IconSkillJavaScript,
  IconSkillMysqlDark,
  IconSkillMysqlLight,
  IconSkillNextjsDark,
  IconSkillNextjsLight,
  IconSkillNginx,
  IconSkillNodejsDark,
  IconSkillNodejsLight,
  IconSkillPrisma,
  IconSkillReactDark,
  IconSkillReactLight,
  IconSkillStackoverflowDark,
  IconSkillStackoverflowLight,
  IconSkillTailwindcssDark,
  IconSkillTailwindcssLight,
  IconSkillTypeScript,
} from "@/components/icons";
import { socialMediaList } from "@/components/pages/home";

import { NICKNAME } from "@/constants";

const AboutPage = () => {
  let delay = 0;

  // Mỗi lần nó được gọi, hãy tăng độ trễ
  const getDelay = () => (delay += 200);

  return (
    <div className="flex w-full flex-col justify-center px-6 pb-24 pt-8">
      <section className="w-screen-wrapper prose prose-neutral mx-auto max-w-screen-wrapper dark:prose-invert">
        <h2 className="text-3xl font-bold md:text-4xl">About</h2>
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h2>Tôi là ai?</h2>
          <p>
            Hi~ Tôi tên
            <strong className="text-green-600"> {NICKNAME}</strong>, là kỹ sư
            phát triển full-stack, tốt nghiệp đại học năm 2024, thích viết code
            và chơi game...
          </p>
        </div>

        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h2>Kỹ năng của tôi</h2>
        </div>

        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h3>Front-end</h3>
          <ul>
            <li>
              <IconSkillHTML className="mx-1 translate-y-0.5" /> HTML +
              <IconSkillCSS className="mx-1 translate-y-0.5" />
              CSS + <IconSkillJavaScript className="mx-1 translate-y-0.5" />
              JavaScript
            </li>
            <li>
              <IconSkillTypeScript className="mx-1 translate-y-0.5" />
              TypeScript +
              <IconSkillReactDark className="mx-1 translate-y-0.5 dark:hidden" />
              <IconSkillReactLight className="mx-1 hidden translate-y-0.5 dark:inline-block" />
              React +
              <IconSkillNextjsDark className="mx-1 translate-y-0.5 dark:hidden" />
              <IconSkillNextjsLight className="mx-1 hidden translate-y-0.5 dark:inline-block" />
              Next.js + ahooks +
              <IconSkillTailwindcssDark className="mx-1 translate-y-0.5 dark:hidden" />
              <IconSkillTailwindcssLight className="mx-1 hidden translate-y-0.5 dark:inline-block" />
              Tailwind CSS
            </li>
          </ul>
        </div>
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h3>Back-end</h3>
          <ul>
            <li>
              <IconSkillNodejsDark className="mx-1 translate-y-0.5 dark:hidden" />
              <IconSkillNodejsLight className="mx-1 hidden translate-y-0.5 dark:inline-block" />
              Node.js, khả năng CRUD đơn giản
            </li>
            <li>
              <IconSkillNextjsDark className="mx-1 translate-y-0.5 dark:hidden" />
              <IconSkillNextjsLight className="mx-1 hidden translate-y-0.5 dark:inline-block" />
              Next.js + <IconSkillPrisma className="mx-1 translate-y-0.5" />
              Prisma +
              <IconSkillMysqlDark className="mx-1 translate-y-0.5 dark:hidden" />
              <IconSkillMysqlLight className="mx-1 hidden translate-y-0.5 dark:inline-block" />
              MySQL, phát triển full-stack
            </li>
          </ul>
        </div>
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h3>Khác</h3>
          <ul>
            <li>
              Zsh + Oh My Zsh + iTerm2 + JetBrainsMono Nerd Font Mono, rất tiện
              lợi
            </li>
            <li>
              <IconSkillDocker className="mx-1 translate-y-0.5" />
              Docker + Orbstack, rất tiện lợi cho dịch vụ cơ sở dữ liệu cục bộ
            </li>
            <li>
              Sử dụng
              <IconSkillNginx className="mx-1 translate-y-0.5" />
              NGINX để cấu hình proxy ngược + HTTPS + kích hoạt HTTP2
            </li>
            <li>
              <IconSkillFigmaDark className="mx-1 translate-y-0.5 dark:hidden" />
              <IconSkillFigmaLight className="mx-1 hidden translate-y-0.5 dark:inline-block" />
              Figma, biết một ít, sử dụng để vẽ biểu tượng và làm ảnh bìa blog
              rất tiện
            </li>
            <li>
              Thành thạo sử dụng{" "}
              <IconLogoGoogle className="mx-1 translate-y-0.5" />
              Google +
              <IconBrandGithub className="mx-1 translate-y-0.5" />
              GitHub +
              <IconSkillStackoverflowDark className="mx-1 translate-y-0.5 dark:hidden" />
              <IconSkillStackoverflowLight className="mx-1 hidden translate-y-0.5 dark:inline-block" />
              Stack Overflow + Chat GPT để giải quyết các vấn đề, tôi giỏi sao
              chép dán 🙋
            </li>
          </ul>
        </div>

        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h2>Thiết bị của tôi</h2>
          <ul>
            <li>
              Laptop ASUS TUF Gaming A15: 16Gb + 512Gb{" "}
              <span className="line-through">
                Tất cả số tiền kiếm được đều dồn vào thiết bị điện tử
              </span>
              🙃
            </li>
            <li>Màn hình HP 24 inch fullHD IPS</li>
            <li>Bàn phím: RK G68</li>
            <li>Chuột: Logitech G304</li>
          </ul>
        </div>

        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h2>Liên hệ với tôi</h2>
          <p>Bạn có thể liên hệ với tôi qua bất kỳ cách nào dưới đây 👇</p>
          <ul className="!mb-0 flex !list-none items-center space-x-4 !pl-0">
            {socialMediaList.map((el) => (
              <li key={el.link}>
                <Button asChild variant="outline" size="icon">
                  <Link href={el.link} target="_blank">
                    {el.icon}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

export const revalidate = 60;
