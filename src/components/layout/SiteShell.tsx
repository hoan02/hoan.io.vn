"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const AskAIModal = dynamic(
  () => import("@/components/ai/AskAIModal").then((mod) => mod.AskAIModal),
  { ssr: false }
);

interface AskAIContextValue {
  openAI: () => void;
}

const AskAIContext = createContext<AskAIContextValue>({ openAI: () => {} });

/** Open the Hoan AI chat from anywhere inside <SiteShell>. */
export function useAskAI() {
  return useContext(AskAIContext);
}

/**
 * Common page frame: header, footer and the AI chat panel.
 * Every route renders its content inside this instead of wiring them itself.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const [aiOpen, setAiOpen] = useState(false);
  const openAI = useCallback(() => setAiOpen(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setAiOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(() => ({ openAI }), [openAI]);

  return (
    <AskAIContext.Provider value={value}>
      <div className="min-h-screen flex flex-col bg-paper text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      {aiOpen && <AskAIModal isOpen={aiOpen} onClose={() => setAiOpen(false)} />}
    </AskAIContext.Provider>
  );
}
