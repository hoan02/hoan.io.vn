"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Experience } from "@/components/sections/Experience";
import { TechStack } from "@/components/sections/TechStack";
import { LatestWriting } from "@/components/sections/LatestWriting";
import { Contact } from "@/components/sections/Contact";
import { AskAIFloatingButton } from "@/components/ai/AskAIFloatingButton";
import { MobileTabBar } from "@/components/layout/MobileTabBar";

const AskAIModal = dynamic(
  () => import("@/components/ai/AskAIModal").then((mod) => mod.AskAIModal),
  { ssr: false }
);

const CustomCursor = dynamic(
  () => import("@/components/common/CustomCursor").then((mod) => mod.CustomCursor),
  { ssr: false }
);

function PortfolioContent() {
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const handleOpenAI = () => setAiModalOpen(true);
  const handleCloseAI = () => setAiModalOpen(false);

  return (
    <main className="relative min-h-screen bg-[#090a0f] text-[#f4f4f5] bg-grid-pattern selection:bg-emerald-500 selection:text-black pb-16 md:pb-0">
      {/* Ambient lighting layers (hidden on mobile to eliminate composite lag) */}
      <div className="hidden sm:block fixed top-0 left-1/4 w-96 h-96 bg-emerald-500/[0.03] rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="hidden sm:block fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/[0.02] rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Floating Navigation Bar with Language Switcher */}
      <Navbar onOpenAI={handleOpenAI} />

      {/* Main Portfolio Sections — Streamlined Flow */}
      <Hero onOpenAI={handleOpenAI} />
      <SelectedWork />
      <Experience />
      <TechStack />
      <LatestWriting />
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Interactive AI Assistant & Navigation */}
      <AskAIFloatingButton onClick={handleOpenAI} />
      <MobileTabBar onOpenAI={handleOpenAI} />
      {aiModalOpen && <AskAIModal isOpen={aiModalOpen} onClose={handleCloseAI} />}
    </main>
  );
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <PortfolioContent />
    </LanguageProvider>
  );
}
