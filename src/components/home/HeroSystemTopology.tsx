"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Server,
  Database,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Terminal,
  Radio,
  ExternalLink,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { TechIcon } from "@/components/common/TechIcon";

interface TopologyNode {
  id: string;
  name: string;
  nameVi: string;
  badge: string;
  protocol: string;
  techs: string[];
  metrics: string;
  metricsVi: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TOPOLOGY_NODES: TopologyNode[] = [
  {
    id: "mfe",
    name: "Micro-Frontend & Edge Client",
    nameVi: "Micro-Frontend & Edge Client",
    badge: "Edge Presentation",
    protocol: "HTTP/3 • Module Federation",
    techs: ["Angular", "React", "Next.js", "Tailwind CSS"],
    metrics: "Shell + 7 Remotes • Zero bundle collision",
    metricsVi: "1 Shell + 7 Remotes • Độc lập chu kỳ release",
    color: "#3b82f6",
    icon: Terminal,
  },
  {
    id: "ingress",
    name: "Traefik ForwardAuth & IAM",
    nameVi: "Traefik ForwardAuth & IAM",
    badge: "Zero-Trust Ingress",
    protocol: "TLS 1.3 • ForwardAuth • OIDC",
    techs: ["Traefik", "Ory Kratos", "Cloudflare", "Keycloak"],
    metrics: "Sub-millisecond token introspect",
    metricsVi: "Xác thực tập trung sub-millisecond",
    color: "#10b981",
    icon: ShieldCheck,
  },
  {
    id: "services",
    name: "9 Go & Spring Boot Microservices",
    nameVi: "9 Go & Spring Boot Microservices",
    badge: "Distributed Domain Core",
    protocol: "gRPC (Protobuf) • High Throughput",
    techs: ["Go", "Spring Boot", "gRPC", "Protobuf"],
    metrics: "P99 latency < 10ms • Strict typing",
    metricsVi: "Độ trễ P99 < 10ms • Contract Protobuf",
    color: "#06b6d4",
    icon: Cpu,
  },
  {
    id: "events",
    name: "NATS JetStream & Outbox",
    nameVi: "NATS JetStream & Outbox",
    badge: "Event-Driven Backbone",
    protocol: "JetStream • Transactional Outbox",
    techs: ["NATS", "Kafka", "Redis"],
    metrics: "Guaranteed at-least-once • Zero data loss",
    metricsVi: "Bảo đảm at-least-once • Không thất thoát event",
    color: "#f59e0b",
    icon: Zap,
  },
  {
    id: "infra",
    name: "CloudNativePG HA & 3-Node K3s",
    nameVi: "CloudNativePG HA & 3-Node K3s",
    badge: "Homelab & Bare-metal",
    protocol: "Proxmox • K3s • Longhorn",
    techs: ["PostgreSQL", "Kubernetes", "Proxmox", "Docker"],
    metrics: "3 VMs HA • Automated failover",
    metricsVi: "3 Máy ảo HA • Tự động failover",
    color: "#8b5cf6",
    icon: Database,
  },
];

export function HeroSystemTopology({ language = "en" }: { language?: "en" | "vi" }) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("services");

  const activeNode = TOPOLOGY_NODES.find((n) => n.id === selectedNodeId) || TOPOLOGY_NODES[2];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-white/95 dark:bg-zinc-950/90 border border-zinc-200 dark:border-zinc-800/90 shadow-xl dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-md">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-zinc-900 dark:text-zinc-200">
            {language === "vi" ? "Kiến trúc Hệ thống Phân tán" : "Live Distributed Architecture"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
          <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          <span className="hidden sm:inline">P99: 8.4ms</span>
          <span>•</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">99.9% HA</span>
        </div>
      </div>

      {/* Main Interactive Diagram Canvas */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Node Stack Flow */}
        <div className="space-y-2.5 relative">
          {TOPOLOGY_NODES.map((node, index) => {
            const isSelected = selectedNodeId === node.id;
            const Icon = node.icon;

            return (
              <motion.div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`relative group cursor-pointer p-3 sm:p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                  isSelected
                    ? "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/40 shadow-sm"
                    : "bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/60 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                {/* Left: Indicator & Title */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-emerald-500 text-zinc-950 font-bold shadow-sm"
                        : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate">
                        {language === "vi" ? node.nameVi : node.name}
                      </h4>
                      <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {node.badge}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                      {node.protocol}
                    </p>
                  </div>
                </div>

                {/* Right: Quick Tech Icons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {node.techs.slice(0, 3).map((tech, tIdx) => (
                    <div
                      key={tIdx}
                      className="w-5 h-5 rounded flex items-center justify-center bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xs"
                      title={tech}
                    >
                      <TechIcon name={tech} className="w-3.5 h-3.5" />
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Node Deep-Dive Card */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-white to-zinc-50 dark:from-emerald-950/30 dark:via-zinc-900/70 dark:to-zinc-950 border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeNode.badge}</span>
            </div>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
              {activeNode.protocol}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium">
            {language === "vi" ? activeNode.metricsVi : activeNode.metrics}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {activeNode.techs.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] font-mono rounded bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Live System Telemetry Strip */}
      <div className="grid grid-cols-3 divide-x divide-zinc-200 dark:divide-zinc-800 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 text-center py-2.5 text-[11px] font-mono">
        <div>
          <div className="text-zinc-400 text-[10px]">MICROSERVICES</div>
          <div className="font-bold text-zinc-800 dark:text-zinc-200">9 Go + Spring</div>
        </div>
        <div>
          <div className="text-zinc-400 text-[10px]">INFRASTRUCTURE</div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400">3-Node K3s HA</div>
        </div>
        <div>
          <div className="text-zinc-400 text-[10px]">EVENT LOSS</div>
          <div className="font-bold text-zinc-800 dark:text-zinc-200">0.00% (Outbox)</div>
        </div>
      </div>
    </div>
  );
}
