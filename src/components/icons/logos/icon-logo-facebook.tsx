import * as React from "react";

import { cn } from "@/lib/utils";

export const IconLogoFacebook = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn("icon-[logos--facebook]", className)}
    ></span>
  );
};
