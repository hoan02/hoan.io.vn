"use client";

import React from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Experience } from "@/components/sections/Experience";
import { TechStack } from "@/components/sections/TechStack";
import { LatestWriting } from "@/components/sections/LatestWriting";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <LatestWriting />
      <SelectedWork />
      <Experience />
      <TechStack />
      <Contact />
    </SiteShell>
  );
}
