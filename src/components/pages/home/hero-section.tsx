import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { socialMediaList } from "./social-media";
import { TypeIntro } from "./type-intro";

import { NICKNAME, PATHS } from "@/constants";
import { cn } from "@/lib/utils";

export const HeroSection = () => {
  let delay = 0;

  // Mỗi lần nó được gọi, hãy tăng độ trễ
  const getDelay = () => (delay += 200);

  return (
    <div className="flex min-h-full  max-w-screen-md flex-col justify-center gap-5 px-6 md:px-10 2xl:max-w-7xl">
      <p
        className="animate-fade-up text-2xl tracking-widest animate-ease-in-out md:text-5xl"
        style={{
          animationDelay: `${getDelay()}ms`,
        }}
      >
        Xin chào, tôi là
      </p>
      <h1
        className={cn(
          `text-5xl py-2 md:text-8xl md:py-4 tracking-widest font-black bg-clip-text bg-gradient-to-r from-[#a4ff7d] to-[#0a8b24]`,
          "animate-fade-up animate-ease-in-out"
        )}
        style={{
          WebkitTextFillColor: "transparent",
          animationDelay: `${getDelay()}ms`,
        }}
      >
        {NICKNAME}
      </h1>
      <div
        className={cn("animate-fade-up animate-ease-in-out")}
        style={{
          animationDelay: `${getDelay()}ms`,
        }}
      >
        <TypeIntro />
      </div>
      <div
        className={cn(
          "text-2xl md:text-5xl tracking-widest flex gap-2",
          "animate-fade-up animate-ease-in-out"
        )}
        style={{
          animationDelay: `${getDelay()}ms`,
        }}
      >
        Thích
        <h2 className={`font-semibold text-[#64f547]`}>React</h2>,
        <h2 className={`font-semibold text-[#35d45d]`}>TypeScript</h2>
        <span className="ml-4">\owo/ ~</span>
      </div>
      <p
        className={cn(
          "text-base md:text-xl text-muted-foreground tracking-widest",
          "animate-fade-up animate-ease-in-out"
        )}
        style={{
          animationDelay: `${getDelay()}ms`,
        }}
      >
        Tôi ghi lại sự trưởng thành của mình trên trang web này, nỗ lực 💪 trở
        thành một lập trình viên giỏi hơn
      </p>
      <div
        className={cn("flex space-x-4", "animate-fade-up animate-ease-in-out")}
        style={{
          animationDelay: `${getDelay()}ms`,
        }}
      >
        <Link
          href={PATHS.SITE_BLOG}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Blog của tôi
        </Link>
        <Link
          href={PATHS.SITE_ABOUT}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Về tôi
        </Link>
      </div>

      <ul
        className={cn("flex space-x-4", "animate-fade-up animate-ease-in-out")}
        style={{
          animationDelay: `${getDelay()}ms`,
        }}
      >
        {socialMediaList.map((el) => (
          <li key={el.link}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="outline" size="icon">
                  <Link href={el.link} target="_blank">
                    {el.icon}
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>{el.label}</TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
};
