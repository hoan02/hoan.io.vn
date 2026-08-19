"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BENTO_STATS } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { TechBadge } from "@/components/common/TechIcon";
import {
  Terminal,
  ShieldCheck,
  Zap,
  Code2,
  Layers,
  Server,
  Activity,
  HardDrive,
  Cpu,
  Sparkles,
  CheckCircle2,
  CornerDownLeft
} from "lucide-react";

export function AboutBento() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  // Interactive Mini Terminal State
  const [terminalCmd, setTerminalCmd] = useState("whoami");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: "whoami",
      output:
        language === "vi"
          ? "Lê Công Hoan • Kỹ sư CNTT tốt nghiệp loại Giỏi ĐH GTVT • Full-stack & System Builder"
          : "Le Cong Hoan • Degree of Engineer in IT (UTC, Distinction) • Full-stack & System Builder",
    },
  ]);

  const runCommand = (command: string) => {
    let out = "";
    const cleanCmd = command.toLowerCase().trim();
    if (cleanCmd === "whoami") {
      out =
        language === "vi"
          ? "Lê Công Hoan • Full-stack Engineer & System Builder (Hà Nội, VN)"
          : "Le Cong Hoan • Full-stack Engineer & System Builder (Hanoi, VN)";
    } else if (cleanCmd === "stack") {
      out = "Angular MFE, Next.js PWA, Go (gRPC), Spring Boot, Rust, PostgreSQL HA, K3s, NATS";
    } else if (cleanCmd === "homelab") {
      out = "ThinkCentre Host • Proxmox VE • 3-Node K3s Cluster • Longhorn HA • Traefik Ingress";
    } else if (cleanCmd === "metrics") {
      out = "P99 < 10ms • 9 Go Microservices • Zero-trust IAM • 0% Event Loss with Outbox";
    } else if (cleanCmd === "clear") {
      setTerminalHistory([]);
      return;
    } else {
      out = `Command not found: "${cleanCmd}". Try: whoami, stack, homelab, metrics, clear`;
    }

    setTerminalHistory((prev) => [...prev.slice(-3), { cmd: command, output: out }]);
    setTerminalCmd("");
  };

  return (
    <section id="about" className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Heading */}
      <MotionWrapper>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
              <Terminal className="w-3.5 h-3.5" />
              <span>{t.about.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              {t.about.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md font-normal leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>
      </MotionWrapper>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Card 1: Core Story / Intro */}
        <MotionWrapper delay={0.1} className="md:col-span-2 lg:col-span-2">
          <div className="h-full rounded-2xl bg-white/90 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800/90 hover:border-emerald-500/30 p-6 sm:p-8 flex flex-col justify-between transition-colors shadow-sm">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                {t.about.storyTitle}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.about.storyDesc}
              </p>
            </div>
            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-900 mt-6 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>{t.about.statusLabel}</span>
              <span>{t.about.coreLabel}</span>
            </div>
          </div>
        </MotionWrapper>

        {/* Card 2: Interactive Homelab Visual Telemetry Node */}
        <MotionWrapper delay={0.2} className="md:col-span-1 lg:col-span-2">
          <div className="h-full rounded-2xl bg-white/90 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800/90 hover:border-emerald-500/30 p-6 sm:p-8 flex flex-col justify-between transition-colors shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ThinkCentre Homelab Node</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">Proxmox VE • K3s</span>
              </div>

              {/* Hardware Visual Preview */}
              <div className="relative aspect-[21/9] rounded-xl overflow-hidden mb-4 border border-zinc-200 dark:border-zinc-800 bg-zinc-900">
                <Image
                  src="/images/projects/homelab-preview.jpg"
                  alt="Homelab Infrastructure Monitor"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-[10px] text-zinc-500">K3S NODES</div>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">3 VMs HA</div>
                </div>
                <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-[10px] text-zinc-500">STORAGE</div>
                  <div className="font-bold text-zinc-800 dark:text-zinc-200">Longhorn</div>
                </div>
                <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-[10px] text-zinc-500">INGRESS</div>
                  <div className="font-bold text-zinc-800 dark:text-zinc-200">Traefik</div>
                </div>
              </div>
            </div>
          </div>
        </MotionWrapper>

        {/* Card 3: Interactive Developer Terminal */}
        <MotionWrapper delay={0.25} className="md:col-span-3 lg:col-span-4">
          <div className="rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl overflow-hidden">
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-zinc-400 font-medium ml-2">hoan@arch-node:~</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                <span>Quick commands:</span>
                {["whoami", "stack", "homelab", "metrics"].map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => runCommand(cmd)}
                    className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-emerald-400 font-mono transition-colors"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 sm:p-5 font-mono text-xs text-zinc-300 space-y-2.5 max-h-48 overflow-y-auto custom-scrollbar">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span>➜</span>
                    <span className="text-zinc-100 font-bold">{item.cmd}</span>
                  </div>
                  <div className="text-zinc-300 pl-4 text-[11px] sm:text-xs leading-relaxed border-l border-zinc-800">
                    {item.output}
                  </div>
                </div>
              ))}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (terminalCmd.trim()) runCommand(terminalCmd);
                }}
                className="flex items-center gap-2 pt-1"
              >
                <span className="text-emerald-400">➜</span>
                <input
                  type="text"
                  value={terminalCmd}
                  onChange={(e) => setTerminalCmd(e.target.value)}
                  placeholder="Type a command (whoami, stack, homelab, metrics, clear)..."
                  className="w-full bg-transparent text-xs text-zinc-100 focus:outline-none placeholder:text-zinc-600"
                />
                <button type="submit" className="text-zinc-500 hover:text-zinc-300">
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </MotionWrapper>

        {/* Card 4: Architecture Core Pillars */}
        <MotionWrapper delay={0.35} className="md:col-span-3 lg:col-span-4">
          <div className="rounded-2xl bg-white/90 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800/90 p-6 sm:p-8 shadow-sm">
            <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> {t.about.coreTenets}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4" /> {t.about.tenet1Title}
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t.about.tenet1Desc}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2 font-semibold text-sm">
                  <Zap className="w-4 h-4" /> {t.about.tenet2Title}
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t.about.tenet2Desc}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2 font-semibold text-sm">
                  <Code2 className="w-4 h-4" /> {t.about.tenet3Title}
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t.about.tenet3Desc}
                </p>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
