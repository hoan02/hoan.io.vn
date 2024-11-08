import Link from "next/link";

import { Button } from "@/components/ui/button";
import { IllustrationNotFound } from "@/components/illustrations";
import { PATHS } from "@/constants";

export default function Page() {
  return (
    <div className="grid h-screen place-items-center">
      <div className="grid gap-8">
        <IllustrationNotFound className="size-[320px]" />
        <h3 className="text-center text-2xl font-semibold tracking-tight">
          Trang không được tìm thấy!
        </h3>
        <Button asChild>
          <Link href={PATHS.SITE_HOME}>Quay lại trang chủ</Link>
        </Button>
      </div>
    </div>
  );
}
