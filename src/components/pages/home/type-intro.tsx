"use client";

import * as React from "react";
import { TypeAnimation } from "react-type-animation";

export const TypeIntro = () => {
  return (
    <TypeAnimation
      className="text-2xl tracking-widest md:text-4xl"
      sequence={[
        500,
        "Một kỹ sư phát triển website",
        1000,
        "A Web <Developer /> .",
        1000,
      ]}
      speed={10}
      repeat={Infinity}
    />
  );
};
