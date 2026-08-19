"use client";

import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "@/components/common/Icons";
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Phone,
  Clock,
  Radio,
  FileText,
  Activity,
  Download,
  Target,
  Zap
} from "lucide-react";

interface ContactNode {
  id: string;
  name: string;
  nameVi: string;
  category: string;
  categoryVi: string;
  value: string;
  href: string;
  isCopyable?: boolean;
  copyValue?: string;
  isDownload?: boolean;
  isExternal?: boolean;
  color: string;
  iconBg: string;
  iconColor: string;
  iconBorder: string;
  icon: React.ComponentType<{ className?: string }>;
  actionLabel: string;
  actionLabelVi: string;
}

export function Contact() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [activeNodeId, setActiveNodeId] = useState<string>("email");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");

  // Live Digital Clock for Hanoi (UTC+7)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = async (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setActiveNodeId(id);
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.85 },
        colors: ["#10b981", "#34d399", "#ffffff"],
      });
    } catch {
      // ignore
    }
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadCV = async () => {
    setActiveNodeId("cv");
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.85 },
        colors: ["#10b981", "#34d399", "#ffffff"],
      });
    } catch {
      // ignore
    }
    const link = document.createElement("a");
    link.href = PERSONAL_INFO.cvUrl;
    link.setAttribute("download", "Le_Cong_Hoan_CV.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const nodes: ContactNode[] = [
    {
      id: "email",
      name: "Direct Email (Gmail)",
      nameVi: "Email Trực tiếp (Gmail)",
      category: "Priority Channel",
      categoryVi: "Kênh ưu tiên",
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
      isCopyable: true,
      copyValue: PERSONAL_INFO.email,
      color: "#EA4335", // Gmail Official Red
      iconBg: "bg-[#EA4335]/15",
      iconColor: "text-[#EA4335]",
      iconBorder: "border-[#EA4335]/30",
      icon: Mail,
      actionLabel: "Copy Email",
      actionLabelVi: "Sao chép",
    },
    {
      id: "phone",
      name: "Zalo / Hotline",
      nameVi: "Zalo / Hotline",
      category: "Zalo Chat & Voice",
      categoryVi: "Chat Zalo & Gọi",
      value: PERSONAL_INFO.phone,
      href: `tel:${PERSONAL_INFO.phone.replace(/\s+/g, "")}`,
      isCopyable: true,
      copyValue: PERSONAL_INFO.phone,
      color: "#0068FF", // Zalo Official Brand Blue
      iconBg: "bg-[#0068FF]/15",
      iconColor: "text-[#0068FF]",
      iconBorder: "border-[#0068FF]/30",
      icon: Phone,
      actionLabel: "Copy Phone",
      actionLabelVi: "Sao chép",
    },
    {
      id: "github",
      name: "GitHub",
      nameVi: "GitHub",
      category: "Code & Repositories",
      categoryVi: "Mã nguồn mở",
      value: "github.com/hoan02",
      href: PERSONAL_INFO.github,
      isExternal: true,
      color: "#FFFFFF", // GitHub Official Monochromatic White
      iconBg: "bg-white/10",
      iconColor: "text-white",
      iconBorder: "border-white/20",
      icon: GithubIcon,
      actionLabel: "Open Profile",
      actionLabelVi: "Truy cập",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      nameVi: "LinkedIn",
      category: "Professional Network",
      categoryVi: "Mạng lưới nghề nghiệp",
      value: "linkedin.com/in/hoan02",
      href: PERSONAL_INFO.linkedin,
      isExternal: true,
      color: "#0A66C2", // LinkedIn Official Blue
      iconBg: "bg-[#0A66C2]/15",
      iconColor: "text-[#0A66C2]",
      iconBorder: "border-[#0A66C2]/30",
      icon: LinkedinIcon,
      actionLabel: "Connect",
      actionLabelVi: "Kết nối",
    },
    {
      id: "cv",
      name: "Curriculum Vitae",
      nameVi: "Hồ Sơ Năng Lực",
      category: "PDF Dossier",
      categoryVi: "Tải CV PDF",
      value: "Le_Cong_Hoan_CV.pdf",
      href: PERSONAL_INFO.cvUrl,
      isDownload: true,
      color: "#10B981", // Portfolio Brand Emerald
      iconBg: "bg-emerald-500/15",
      iconColor: "text-emerald-400",
      iconBorder: "border-emerald-500/30",
      icon: FileText,
      actionLabel: "Download CV",
      actionLabelVi: "Tải về",
    },
    {
      id: "facebook",
      name: "Facebook",
      nameVi: "Facebook",
      category: "Meta Social Network",
      categoryVi: "Mạng xã hội Meta",
      value: "facebook.com/hoanit02",
      href: PERSONAL_INFO.facebook,
      isExternal: true,
      color: "#1877F2", // Facebook Official Brand Blue
      iconBg: "bg-[#1877F2]/15",
      iconColor: "text-[#1877F2]",
      iconBorder: "border-[#1877F2]/30",
      icon: FacebookIcon,
      actionLabel: "Message",
      actionLabelVi: "Nhắn tin",
    },
  ];

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  return (
    <section id="contact" className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <MotionWrapper>
        <div className="relative rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-10 lg:p-14 overflow-hidden shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] text-zinc-100">
          {/* Cybernetic Background Grid & Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Top Control Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-800/80 font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>{language === "vi" ? "RADAR KẾT NỐI TRỰC TUYẾN" : "LIVE RADAR CONNECT"}</span>
              </div>
              <span className="hidden sm:inline-block text-zinc-600">|</span>
              <span className="hidden sm:inline-block text-zinc-400">HANOI, VIETNAM</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-bold">{currentTime || "UTC+7"}</span>
                <span className="text-zinc-500 text-[10px]">LOCAL</span>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[11px]">
                <Activity className="w-3 h-3 animate-pulse" />
                <span>RESP: &lt; 2H</span>
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <div className="relative z-10 max-w-2xl mb-10">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-[1.15]">
              {t.contact.titleStart}{" "}
              <span className="text-emerald-400 underline decoration-emerald-500/50 underline-offset-8">
                {t.contact.titleHighlight}
              </span>{" "}
              {t.contact.titleEnd}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
              {t.contact.subtitle}
            </p>
          </div>

          {/* Radar Docking Station Matrix: Equal Height Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Interactive Animated Radar Screen (Full Height Matching Cards) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800/90 shadow-inner overflow-hidden h-full min-h-[460px]">
              {/* Radar Top Header */}
              <div className="flex items-center justify-between w-full text-[11px] font-mono text-zinc-500 pb-2 border-b border-zinc-800/60">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <Target className="w-3.5 h-3.5 text-emerald-400" />
                  <span>21.0285°N, 105.8542°E</span>
                </span>
                <span className="text-emerald-400 font-bold">READY</span>
              </div>

              {/* Centered Radar Circle Sweep */}
              <div className="relative my-auto py-4 flex items-center justify-center">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-emerald-500/20 flex items-center justify-center">
                  {/* Concentric rings */}
                  <div className="w-48 h-48 rounded-full border border-emerald-500/20 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-emerald-500/30 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border border-emerald-500/40 flex items-center justify-center">
                        {/* Center Node: Hanoi Hub */}
                        <div className="relative flex items-center justify-center">
                          <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-emerald-400 opacity-60"></span>
                          <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_15px_#10b981]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Crosshairs */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-[1px] bg-emerald-500/20" />
                    <div className="h-full w-[1px] bg-emerald-500/20 absolute" />
                  </div>

                  {/* Rotating Radar Sweep Beam */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none origin-center animate-[spin_4s_linear_infinite]"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(16,185,129,0.35) 360deg)",
                    }}
                  />

                  {/* Dynamic Satellite Target Blips with Exact Brand Colors */}
                  {nodes.map((node, index) => {
                    const angles = [30, 90, 150, 210, 270, 330];
                    const angle = angles[index % angles.length];
                    const radius = index % 2 === 0 ? 104 : 78; // px from center
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                    const isSelected = activeNodeId === node.id;

                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setActiveNodeId(node.id)}
                        className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 border ${
                          isSelected
                            ? "scale-125 z-20 font-bold shadow-lg"
                            : "hover:scale-110 z-10 opacity-90 hover:opacity-100"
                        } ${node.iconBg} ${node.iconColor} ${node.iconBorder}`}
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          boxShadow: isSelected ? `0 0 20px ${node.color}` : undefined,
                        }}
                        title={node.name}
                      >
                        <node.icon className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Radar Selected Target Telemetry Card at the bottom of radar */}
              <div
                className="p-3 rounded-xl bg-zinc-950/80 border transition-all duration-300 flex items-center justify-between gap-3 text-xs font-mono"
                style={{ borderColor: `${activeNode.color}40` }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${activeNode.iconBg} ${activeNode.iconColor} ${activeNode.iconBorder}`}
                  >
                    <activeNode.icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-zinc-500 block truncate leading-tight">
                      {language === "vi" ? "MỤC TIÊU KHÓA" : "LOCKED TARGET"}
                    </span>
                    <span className="font-bold text-white text-xs truncate block" style={{ color: activeNode.color }}>
                      {language === "vi" ? activeNode.nameVi : activeNode.name}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono shrink-0">
                  ONLINE
                </span>
              </div>
            </div>

            {/* Right: Direct-Action Channel Cards Grid */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-full">
                {nodes.map((node) => {
                  const isSelected = activeNodeId === node.id;
                  const Icon = node.icon;

                  return (
                    <div
                      key={node.id}
                      onClick={() => setActiveNodeId(node.id)}
                      className={`relative p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between group ${
                        isSelected
                          ? "bg-zinc-900 shadow-[0_0_25px_rgba(0,0,0,0.5)] ring-1 ring-emerald-500/40"
                          : "bg-zinc-900/60 hover:bg-zinc-900 border-zinc-800/80 hover:border-zinc-700"
                      }`}
                      style={{
                        borderColor: isSelected ? node.color : undefined,
                      }}
                    >
                      {/* Top Row: Brand Icon + Names */}
                      <div className="flex items-center gap-3 mb-2.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200 ${node.iconBg} ${node.iconColor} ${node.iconBorder}`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-mono text-zinc-500 block uppercase leading-tight">
                            {language === "vi" ? node.categoryVi : node.category}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-zinc-100 truncate mt-0.5">
                            {language === "vi" ? node.nameVi : node.name}
                          </h4>
                        </div>
                      </div>

                      {/* Value / Link Display */}
                      <div className="mb-2.5 text-xs font-mono text-zinc-400 truncate">
                        {node.value}
                      </div>

                      {/* Bottom Direct Action Button */}
                      <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between gap-2">
                        {node.isCopyable ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(node.id, node.copyValue || node.value);
                            }}
                            className="w-full inline-flex items-center justify-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:scale-98 text-zinc-200 text-xs font-mono font-medium transition-all"
                          >
                            {copiedId === node.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400 font-bold">{t.hero.copied}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                                <span>{language === "vi" ? node.actionLabelVi : node.actionLabel}</span>
                              </>
                            )}
                          </button>
                        ) : node.isDownload ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadCV();
                            }}
                            className="w-full inline-flex items-center justify-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-zinc-950 text-xs font-mono font-bold transition-all shadow-sm"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>{language === "vi" ? node.actionLabelVi : node.actionLabel}</span>
                          </button>
                        ) : (
                          <a
                            href={node.href}
                            target={node.isExternal ? "_blank" : undefined}
                            rel={node.isExternal ? "noopener noreferrer" : undefined}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full inline-flex items-center justify-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 hover:text-white active:scale-98 text-zinc-300 text-xs font-mono font-medium transition-all"
                          >
                            <span>{language === "vi" ? node.actionLabelVi : node.actionLabel}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </MotionWrapper>
    </section>
  );
}
