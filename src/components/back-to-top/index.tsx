"use client";

import { useMemoizedFn, useScroll } from "ahooks";
import { ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BackToTopProps = {
  scrollRef?: React.MutableRefObject<HTMLDivElement | null>;
};

export const BackToTop = ({ scrollRef }: BackToTopProps) => {
  // Lưu ý: useScroll sử dụng document thay vì document.documentElement
  // nếu document.documentElement được đặt, cuộn.top luôn bằng 0
  const scroll = useScroll(() => scrollRef?.current || document);

  const handleClick = useMemoizedFn(() => {
    if (scrollRef?.current) {
      scrollRef?.current.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Ở đây hãy quay lại đầu trang và sử dụng document.documentElement vì không có phương thức ScrollTo trên tài liệu
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  });

  return (
    <Button
      className={cn("fixed bottom-8 right-8", {
        hidden: (scroll?.top ?? 0) < 100,
      })}
      variant="outline"
      size={"icon"}
      onClick={handleClick}
    >
      <ChevronUp className="size-4" />
    </Button>
  );
};
