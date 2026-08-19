"use client";

import React from "react";
import { Project } from "@/types";
import { Cpu, Server, Database, ShieldCheck, Zap, Layers, Network, Activity } from "lucide-react";
import { TechIcon } from "@/components/common/TechIcon";

interface BlueprintStep {
  label: string;
  sub: string;
  tech: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export function ProjectBlueprintVisual({
  project,
  language = "en",
}: {
  project: Project;
  language?: "en" | "vi";
}) {
  const getSteps = (): { title: string; subtitle: string; steps: BlueprintStep[] } => {
    switch (project.id) {
      case "epas-enterprise-process-automation":
        return {
          title: language === "vi" ? "Kiến trúc Phân tầng EPAS" : "EPAS Layered Architecture",
          subtitle: language === "vi" ? "Angular Host MFE ➔ Spring Boot ➔ Kafka & Oracle" : "Angular Host MFE ➔ Spring Boot ➔ Kafka & Oracle",
          steps: [
            {
              label: "Angular Shell MFE",
              sub: "Dynamic Forms & Grids",
              tech: "Angular",
              icon: Layers,
              color: "#dd0031",
            },
            {
              label: "BPM & Workflow Ingress",
              sub: "Keycloak OIDC Auth",
              tech: "Keycloak",
              icon: ShieldCheck,
              color: "#10b981",
            },
            {
              label: "Java Spring Boot Core",
              sub: "Lending & Approval Queues",
              tech: "Spring Boot",
              icon: Cpu,
              color: "#6db33f",
            },
            {
              label: "Kafka & Oracle Cluster",
              sub: "Event Stream & Audit Trail",
              tech: "Kafka",
              icon: Database,
              color: "#f59e0b",
            },
          ],
        };
      case "arda-finops-platform":
        return {
          title: language === "vi" ? "Kiến trúc ARDA Microservices" : "ARDA Microservices Architecture",
          subtitle: language === "vi" ? "React MFE ➔ Traefik ForwardAuth ➔ 9 Go Services ➔ NATS JetStream" : "React MFE ➔ Traefik ForwardAuth ➔ 9 Go Services ➔ NATS JetStream",
          steps: [
            {
              label: "Module Federation",
              sub: "Shell + 7 Remotes",
              tech: "React",
              icon: Layers,
              color: "#61dafb",
            },
            {
              label: "Traefik ForwardAuth",
              sub: "Ory Kratos / Hydra IAM",
              tech: "Traefik",
              icon: ShieldCheck,
              color: "#10b981",
            },
            {
              label: "9 Go Services (gRPC)",
              sub: "Unary & Stream Inter-service",
              tech: "Go",
              icon: Cpu,
              color: "#00add8",
            },
            {
              label: "NATS JetStream & CloudNativePG",
              sub: "Transactional Outbox HA",
              tech: "NATS",
              icon: Zap,
              color: "#8b5cf6",
            },
          ],
        };
      case "puchi-language-platform":
        return {
          title: language === "vi" ? "Kiến trúc Puchi PWA & GitOps" : "Puchi PWA & GitOps Architecture",
          subtitle: language === "vi" ? "Next.js PWA ➔ Kratos v3 Monorepo ➔ ArgoCD K3s" : "Next.js PWA ➔ Kratos v3 Monorepo ➔ ArgoCD K3s",
          steps: [
            {
              label: "Next.js PWA Client",
              sub: "Limen Opaque Session",
              tech: "Next.js",
              icon: Layers,
              color: "#000000",
            },
            {
              label: "Cloudflare R2 & CDN",
              sub: "Audio Stream & Ingress",
              tech: "Cloudflare",
              icon: Network,
              color: "#f38020",
            },
            {
              label: "5 Go Services (Kratos v3)",
              sub: "auth, learn, core, media",
              tech: "Go",
              icon: Cpu,
              color: "#00add8",
            },
            {
              label: "K3s Cluster & ArgoCD",
              sub: "Declarative GitOps Delivery",
              tech: "Kubernetes",
              icon: Server,
              color: "#326ce5",
            },
          ],
        };
      default:
        return {
          title: language === "vi" ? "Kiến trúc Hạ tầng Homelab K3s" : "K3s Homelab Infrastructure",
          subtitle: language === "vi" ? "Proxmox Host ➔ 3-VM K3s Cluster ➔ Longhorn HA" : "Proxmox Host ➔ 3-VM K3s Cluster ➔ Longhorn HA",
          steps: [
            {
              label: "ThinkCentre Proxmox Host",
              sub: "Intel Xeon 8C/16T • 32GB RAM",
              tech: "Proxmox",
              icon: Server,
              color: "#e57000",
            },
            {
              label: "3-VM K3s Cluster",
              sub: "Master & Worker Topology",
              tech: "Kubernetes",
              icon: Network,
              color: "#326ce5",
            },
            {
              label: "Traefik & Cloudflare Tunnel",
              sub: "Zero-port Public Ingress",
              tech: "Traefik",
              icon: ShieldCheck,
              color: "#10b981",
            },
            {
              label: "Longhorn Storage Pool",
              sub: "Replicated Persistent Volumes",
              tech: "Docker",
              icon: Database,
              color: "#06b6d4",
            },
          ],
        };
    }
  };

  const blueprint = getSteps();

  return (
    <div className="w-full h-full p-4 sm:p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between overflow-hidden relative">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

      {/* Blueprint Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold text-white tracking-wide">{blueprint.title}</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-zinc-400">
          <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>TOPOLOGY READY</span>
        </div>
      </div>

      {/* Animated Data Pipeline Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-auto py-2 relative z-10">
        {blueprint.steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="p-2.5 sm:p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/90 hover:border-emerald-500/40 transition-all flex items-center gap-3 shadow-xs"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: `${step.color}15`,
                  color: step.color,
                  borderColor: `${step.color}30`,
                }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h5 className="text-xs font-bold text-zinc-100 truncate">{step.label}</h5>
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-zinc-800 text-zinc-400">
                    STEP 0{idx + 1}
                  </span>
                </div>
                <p className="text-[10px] font-mono text-zinc-400 truncate mt-0.5">{step.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Blueprint Footer */}
      <div className="pt-2.5 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
        <span className="truncate">{blueprint.subtitle}</span>
        <span className="text-emerald-400 font-bold shrink-0 ml-2">VERIFIED CONTRACT</span>
      </div>
    </div>
  );
}
