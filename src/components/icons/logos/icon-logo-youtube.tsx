import * as React from "react";

import { cn } from "@/lib/utils";

export const IconLogoYoutube = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn("icon-[logos--youtube-icon]", className)}
    ></span>
  );
};
