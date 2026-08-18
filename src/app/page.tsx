"use client";

import React, { useState } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { AboutBento } from "@/components/sections/AboutBento";
import { Experience } from "@/components/sections/Experience";
import { TechStack } from "@/components/sections/TechStack";
import { Contact } from "@/components/sections/Contact";
import { AskAIFloatingButton } from "@/components/ai/AskAIFloatingButton";
import { AskAIModal } from "@/components/ai/AskAIModal";
import { CustomCursor } from "@/components/common/CustomCursor";

function PortfolioContent() {
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const handleOpenAI = () => setAiModalOpen(true);
  const handleCloseAI = () => setAiModalOpen(false);

  return (
    <main className="relative min-h-screen bg-[#090a0f] text-[#f4f4f5] bg-grid-pattern selection:bg-emerald-500 selection:text-black">
      {/* Ambient lighting layers */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-emerald-500/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/[0.03] rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Floating Navigation Bar with Language Switcher */}
      <Navbar onOpenAI={handleOpenAI} />

      {/* Main Portfolio Sections */}
      <Hero onOpenAI={handleOpenAI} />
      <SelectedWork />
      <AboutBento />
      <Experience />
      <TechStack />
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Interactive AI Assistant */}
      <AskAIFloatingButton onClick={handleOpenAI} />
      <AskAIModal isOpen={aiModalOpen} onClose={handleCloseAI} />
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
