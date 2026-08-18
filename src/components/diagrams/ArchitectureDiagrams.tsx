"use client";

import React from "react";

interface DiagramProps {
  caption?: string;
  captionVi?: string;
}

export function DiagramContainer({ title, caption, children }: { title: string; caption?: string; children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-2xl bg-[#09090B] border border-[#27272A] p-4 sm:p-6 shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#27272A]/80">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">
            {title}
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 bg-[#18181B] px-2 py-0.5 rounded border border-[#27272A]">
          Architecture Flow
        </span>
      </div>

      <div className="w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[620px] py-2 flex justify-center">
          {children}
        </div>
      </div>

      {caption && (
        <p className="mt-3 text-center text-xs text-zinc-400 font-mono italic">
          {caption}
        </p>
      )}
    </div>
  );
}

// 1. Arda High-Level Architecture Diagram
export function ArdaSystemArchitectureDiagram({ caption }: DiagramProps) {
  return (
    <DiagramContainer title="Arda System Architecture" caption={caption || "Arda: Cloud-Native Multi-Tenant FinOps Platform Topology"}>
      <svg viewBox="0 0 760 380" className="w-full max-w-[740px] h-auto font-mono text-xs">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
          </marker>
        </defs>

        {/* Client & Edge */}
        <g transform="translate(20, 20)">
          <rect width="180" height="70" rx="8" fill="#18181B" stroke="#27272A" strokeWidth="1.5" />
          <text x="90" y="32" fill="#FAFAFA" textAnchor="middle" fontWeight="bold" fontSize="12">Browser / Clients</text>
          <text x="90" y="52" fill="#A1A1AA" textAnchor="middle" fontSize="10">React Module Federation</text>
        </g>

        <path d="M 200 55 L 260 55" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow)" />

        <g transform="translate(270, 20)">
          <rect width="200" height="70" rx="8" fill="#18181B" stroke="#27272A" strokeWidth="1.5" />
          <text x="100" y="32" fill="#FAFAFA" textAnchor="middle" fontWeight="bold" fontSize="12">Cloudflare Tunnel</text>
          <text x="100" y="52" fill="#A1A1AA" textAnchor="middle" fontSize="10">DDoS · SSL · Zero Open Ports</text>
        </g>

        <path d="M 470 55 L 530 55" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow)" />

        <g transform="translate(540, 20)">
          <rect width="200" height="70" rx="8" fill="#18181B" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="100" y="32" fill="#10B981" textAnchor="middle" fontWeight="bold" fontSize="12">Traefik Ingress</text>
          <text x="100" y="52" fill="#A1A1AA" textAnchor="middle" fontSize="10">ForwardAuth Verification</text>
        </g>

        {/* Auth Gateway & IAM */}
        <path d="M 640 90 L 640 140" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow)" />

        <g transform="translate(20, 150)">
          <rect width="720" height="90" rx="10" fill="#18181B" stroke="#27272A" strokeWidth="1.5" />
          <rect x="15" y="15" width="220" height="60" rx="6" fill="#09090B" stroke="#27272A" />
          <text x="125" y="38" fill="#FAFAFA" textAnchor="middle" fontWeight="bold">auth-gateway (BFF)</text>
          <text x="125" y="56" fill="#10B981" textAnchor="middle" fontSize="10">Session & Context Proxy</text>

          <rect x="255" y="15" width="220" height="60" rx="6" fill="#09090B" stroke="#27272A" />
          <text x="365" y="38" fill="#FAFAFA" textAnchor="middle" fontWeight="bold">Ory Kratos + Hydra</text>
          <text x="365" y="56" fill="#A1A1AA" textAnchor="middle" fontSize="10">Identity & OAuth2 / OIDC</text>

          <rect x="495" y="15" width="210" height="60" rx="6" fill="#09090B" stroke="#27272A" />
          <text x="600" y="38" fill="#FAFAFA" textAnchor="middle" fontWeight="bold">iam-service</text>
          <text x="600" y="56" fill="#A1A1AA" textAnchor="middle" fontSize="10">RBAC, Roles & Tenant Policies</text>
        </g>

        {/* 9 Go Microservices */}
        <path d="M 380 240 L 380 270" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow)" />

        <g transform="translate(20, 280)">
          <rect width="720" height="85" rx="10" fill="#18181B" stroke="#10B981" strokeWidth="1.5" />
          <text x="360" y="24" fill="#10B981" textAnchor="middle" fontWeight="bold" fontSize="11">9 Go Microservices (gRPC & NATS JetStream)</text>
          
          <g transform="translate(15, 35)">
            <rect width="105" height="35" rx="4" fill="#09090B" stroke="#27272A" />
            <text x="52" y="22" fill="#FAFAFA" textAnchor="middle" fontSize="10">finance</text>
          </g>
          <g transform="translate(130, 35)">
            <rect width="105" height="35" rx="4" fill="#09090B" stroke="#27272A" />
            <text x="52" y="22" fill="#FAFAFA" textAnchor="middle" fontSize="10">workflow</text>
          </g>
          <g transform="translate(245, 35)">
            <rect width="105" height="35" rx="4" fill="#09090B" stroke="#27272A" />
            <text x="52" y="22" fill="#FAFAFA" textAnchor="middle" fontSize="10">crm</text>
          </g>
          <g transform="translate(360, 35)">
            <rect width="105" height="35" rx="4" fill="#09090B" stroke="#27272A" />
            <text x="52" y="22" fill="#FAFAFA" textAnchor="middle" fontSize="10">hrm</text>
          </g>
          <g transform="translate(475, 35)">
            <rect width="105" height="35" rx="4" fill="#09090B" stroke="#27272A" />
            <text x="52" y="22" fill="#FAFAFA" textAnchor="middle" fontSize="10">platform</text>
          </g>
          <g transform="translate(590, 35)">
            <rect width="115" height="35" rx="4" fill="#09090B" stroke="#27272A" />
            <text x="57" y="22" fill="#FAFAFA" textAnchor="middle" fontSize="10">notification/media</text>
          </g>
        </g>
      </svg>
    </DiagramContainer>
  );
}

// 2. Arda Identity & Authentication Flow
export function ArdaAuthFlowDiagram({ caption }: DiagramProps) {
  return (
    <DiagramContainer title="Arda Zero-Trust Auth & Identity Boundary" caption={caption || "Arda: Step-by-Step ForwardAuth & Session Proxy Pipeline"}>
      <svg viewBox="0 0 740 320" className="w-full max-w-[720px] h-auto font-mono text-xs">
        <defs>
          <marker id="arrow-auth" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
          </marker>
        </defs>

        {/* Step 1: Browser */}
        <g transform="translate(20, 30)">
          <rect width="150" height="90" rx="8" fill="#18181B" stroke="#27272A" strokeWidth="1.5" />
          <text x="75" y="35" fill="#FAFAFA" textAnchor="middle" fontWeight="bold">1. Browser Client</text>
          <text x="75" y="55" fill="#A1A1AA" textAnchor="middle" fontSize="10">BFF Cookie / Header</text>
          <text x="75" y="72" fill="#10B981" textAnchor="middle" fontSize="9">puchi/arda.io.vn</text>
        </g>

        <path d="M 170 75 L 220 75" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-auth)" />

        {/* Step 2: Traefik Ingress */}
        <g transform="translate(230, 30)">
          <rect width="160" height="90" rx="8" fill="#18181B" stroke="#10B981" strokeWidth="1.5" />
          <text x="80" y="35" fill="#10B981" textAnchor="middle" fontWeight="bold">2. Traefik Ingress</text>
          <text x="80" y="55" fill="#A1A1AA" textAnchor="middle" fontSize="10">ForwardAuth Middleware</text>
          <text x="80" y="72" fill="#FAFAFA" textAnchor="middle" fontSize="9">Route Interception</text>
        </g>

        <path d="M 390 75 L 440 75" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-auth)" />

        {/* Step 3: auth-gateway */}
        <g transform="translate(450, 30)">
          <rect width="160" height="90" rx="8" fill="#18181B" stroke="#27272A" strokeWidth="1.5" />
          <text x="80" y="35" fill="#FAFAFA" textAnchor="middle" fontWeight="bold">3. auth-gateway</text>
          <text x="80" y="55" fill="#A1A1AA" textAnchor="middle" fontSize="10">Ory Session Check</text>
          <text x="80" y="72" fill="#10B981" textAnchor="middle" fontSize="9">Resolves User Context</text>
        </g>

        <path d="M 530 120 L 530 180" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-auth)" />

        {/* Step 4: Identity Validation Engines */}
        <g transform="translate(20, 190)">
          <rect width="360" height="100" rx="8" fill="#18181B" stroke="#27272A" strokeWidth="1.5" />
          <text x="180" y="30" fill="#FAFAFA" textAnchor="middle" fontWeight="bold">4. Ory Kratos & Hydra + IAM</text>
          <text x="180" y="52" fill="#A1A1AA" textAnchor="middle" fontSize="10">• Kratos: Credentials & Multi-factor</text>
          <text x="180" y="68" fill="#A1A1AA" textAnchor="middle" fontSize="10">• Hydra: OAuth2 Grants & Tokens</text>
          <text x="180" y="84" fill="#A1A1AA" textAnchor="middle" fontSize="10">• IAM: RBAC, Tenant UUID & Permissions</text>
        </g>

        <path d="M 380 240 L 440 240" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-auth)" />

        {/* Step 5: Downstream Microservices with Injected Headers */}
        <g transform="translate(450, 190)">
          <rect width="270" height="100" rx="8" fill="#09090B" stroke="#10B981" strokeWidth="1.5" />
          <text x="135" y="28" fill="#10B981" textAnchor="middle" fontWeight="bold">5. Downstream Go Services</text>
          <text x="135" y="48" fill="#FAFAFA" textAnchor="middle" fontSize="10">Injected Trusted Headers:</text>
          <text x="135" y="66" fill="#A1A1AA" textAnchor="middle" fontSize="9">X-User-Id, X-Tenant-Id</text>
          <text x="135" y="82" fill="#A1A1AA" textAnchor="middle" fontSize="9">X-Roles, X-Permissions</text>
        </g>
      </svg>
    </DiagramContainer>
  );
}

// 3. Transactional Outbox Pattern with NATS JetStream
export function TransactionalOutboxDiagram({ caption }: DiagramProps) {
  return (
    <DiagramContainer title="Transactional Outbox Pattern & NATS JetStream" caption={caption || "Atomic Business State + Domain Event Dispatching with Zero Dual-Write Hazards"}>
      <svg viewBox="0 0 740 300" className="w-full max-w-[720px] h-auto font-mono text-xs">
        <defs>
          <marker id="arrow-outbox" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
          </marker>
        </defs>

        {/* 1. Go Domain Service */}
        <g transform="translate(20, 30)">
          <rect width="180" height="110" rx="8" fill="#18181B" stroke="#27272A" strokeWidth="1.5" />
          <text x="90" y="32" fill="#FAFAFA" textAnchor="middle" fontWeight="bold">Go Domain Service</text>
          <text x="90" y="55" fill="#10B981" textAnchor="middle" fontSize="10">BEGIN TX</text>
          <text x="90" y="75" fill="#A1A1AA" textAnchor="middle" fontSize="9">1. Insert Domain Row</text>
          <text x="90" y="92" fill="#A1A1AA" textAnchor="middle" fontSize="9">2. Insert Outbox Event</text>
        </g>

        <path d="M 200 85 L 260 85" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-outbox)" />

        {/* 2. PostgreSQL Atomic Transaction */}
        <g transform="translate(270, 30)">
          <rect width="210" height="110" rx="8" fill="#09090B" stroke="#10B981" strokeWidth="1.5" />
          <text x="105" y="30" fill="#10B981" textAnchor="middle" fontWeight="bold">PostgreSQL (Atomic Commit)</text>
          <rect x="15" y="45" width="180" height="24" rx="4" fill="#18181B" stroke="#27272A" />
          <text x="105" y="61" fill="#FAFAFA" textAnchor="middle" fontSize="9">orders / payments (State)</text>
          <rect x="15" y="75" width="180" height="24" rx="4" fill="#18181B" stroke="#27272A" />
          <text x="105" y="91" fill="#10B981" textAnchor="middle" fontSize="9">outbox_events (Payload)</text>
        </g>

        <path d="M 375 140 L 375 190" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-outbox)" />

        {/* 3. Outbox Relay Worker */}
        <g transform="translate(270, 200)">
          <rect width="210" height="75" rx="8" fill="#18181B" stroke="#27272A" strokeWidth="1.5" />
          <text x="105" y="30" fill="#FAFAFA" textAnchor="middle" fontWeight="bold">Outbox Relay Worker</text>
          <text x="105" y="48" fill="#A1A1AA" textAnchor="middle" fontSize="9">Polls / CDC unpublished events</text>
          <text x="105" y="64" fill="#10B981" textAnchor="middle" fontSize="9">Envelope[T] + Mark Published</text>
        </g>

        <path d="M 480 237 L 530 237" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-outbox)" />

        {/* 4. NATS JetStream & Consumer */}
        <g transform="translate(540, 100)">
          <rect width="180" height="175" rx="8" fill="#18181B" stroke="#27272A" strokeWidth="1.5" />
          <text x="90" y="32" fill="#10B981" textAnchor="middle" fontWeight="bold">NATS JetStream</text>
          <text x="90" y="50" fill="#A1A1AA" textAnchor="middle" fontSize="9">At-least-once Delivery</text>

          <path d="M 90 65 L 90 95" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-outbox)" />

          <rect x="15" y="105" width="150" height="55" rx="6" fill="#09090B" stroke="#10B981" />
          <text x="90" y="125" fill="#FAFAFA" textAnchor="middle" fontWeight="bold" fontSize="10">Idempotent Consumer</text>
          <text x="90" y="142" fill="#A1A1AA" textAnchor="middle" fontSize="9">Event ID Deduplication</text>
        </g>
      </svg>
    </DiagramContainer>
  );
}

// 4. Workflow Service Boundary & Zeebe 8.5
export function WorkflowServiceBoundaryDiagram({ caption }: DiagramProps) {
  return (
    <DiagramContainer title="BPMN Workflow-Service Boundary (Zeebe 8.5)" caption={caption || "Decoupled Workflow Orchestration via Dedicated Service Facade"}>
      <svg viewBox="0 0 740 260" className="w-full max-w-[720px] h-auto font-mono text-xs">
        <defs>
          <marker id="arrow-wf" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
          </marker>
        </defs>

        {/* Domain Services */}
        <g transform="translate(20, 20)">
          <rect width="200" height="220" rx="8" fill="#18181B" stroke="#27272A" strokeWidth="1.5" />
          <text x="100" y="30" fill="#FAFAFA" textAnchor="middle" fontWeight="bold">Domain Services</text>
          
          <rect x="20" y="50" width="160" height="40" rx="4" fill="#09090B" stroke="#27272A" />
          <text x="100" y="75" fill="#FAFAFA" textAnchor="middle">finance-service</text>

          <rect x="20" y="105" width="160" height="40" rx="4" fill="#09090B" stroke="#27272A" />
          <text x="100" y="130" fill="#FAFAFA" textAnchor="middle">crm-service</text>

          <rect x="20" y="160" width="160" height="40" rx="4" fill="#09090B" stroke="#27272A" />
          <text x="100" y="185" fill="#FAFAFA" textAnchor="middle">hrm-service</text>
        </g>

        <path d="M 220 130 L 290 130" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-wf)" />

        {/* Workflow Service Boundary */}
        <g transform="translate(300, 45)">
          <rect width="220" height="170" rx="8" fill="#18181B" stroke="#10B981" strokeWidth="1.5" />
          <text x="110" y="30" fill="#10B981" textAnchor="middle" fontWeight="bold">workflow-service</text>
          <text x="110" y="50" fill="#A1A1AA" textAnchor="middle" fontSize="10">gRPC & HTTP Facade</text>
          
          <rect x="15" y="70" width="190" height="85" rx="6" fill="#09090B" stroke="#27272A" />
          <text x="105" y="90" fill="#FAFAFA" textAnchor="middle" fontSize="9">CreateCase / SubmitCase</text>
          <text x="105" y="108" fill="#A1A1AA" textAnchor="middle" fontSize="9">User Task Assignment</text>
          <text x="105" y="126" fill="#A1A1AA" textAnchor="middle" fontSize="9">SLA Timers & Error Boundary</text>
          <text x="105" y="144" fill="#10B981" textAnchor="middle" fontSize="9">Domain Event Hooks</text>
        </g>

        <path d="M 520 130 L 580 130" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-wf)" />

        {/* Zeebe Engine */}
        <g transform="translate(590, 65)">
          <rect width="130" height="130" rx="8" fill="#09090B" stroke="#10B981" strokeWidth="1.5" />
          <text x="65" y="45" fill="#FAFAFA" textAnchor="middle" fontWeight="bold">Zeebe 8.5</text>
          <text x="65" y="70" fill="#10B981" textAnchor="middle" fontSize="10">BPMN 2.0</text>
          <text x="65" y="95" fill="#A1A1AA" textAnchor="middle" fontSize="9">Orchestration</text>
          <text x="65" y="110" fill="#A1A1AA" textAnchor="middle" fontSize="9">Engine</text>
        </g>
      </svg>
    </DiagramContainer>
  );
}

// 5. Puchi Language Learning Domain Flow
export function PuchiLearningDomainDiagram({ caption }: DiagramProps) {
  return (
    <DiagramContainer title="Puchi Story-Based Learning Domain Hierarchy" caption={caption || "Separation of Pedagogical Content Tree from Learner State and Mastery"}>
      <svg viewBox="0 0 740 220" className="w-full max-w-[720px] h-auto font-mono text-xs">
        <defs>
          <marker id="arrow-puchi" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
          </marker>
        </defs>

        {/* Content Hierarchy */}
        <g transform="translate(15, 20)">
          <rect width="105" height="70" rx="6" fill="#18181B" stroke="#27272A" />
          <text x="52" y="32" fill="#10B981" textAnchor="middle" fontWeight="bold">City</text>
          <text x="52" y="52" fill="#A1A1AA" textAnchor="middle" fontSize="9">Hanoi / HCMC</text>
        </g>

        <path d="M 120 55 L 145 55" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-puchi)" />

        <g transform="translate(150, 20)">
          <rect width="105" height="70" rx="6" fill="#18181B" stroke="#27272A" />
          <text x="52" y="32" fill="#10B981" textAnchor="middle" fontWeight="bold">Story</text>
          <text x="52" y="52" fill="#A1A1AA" textAnchor="middle" fontSize="9">Topic & Goal</text>
        </g>

        <path d="M 255 55 L 280 55" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-puchi)" />

        <g transform="translate(285, 20)">
          <rect width="105" height="70" rx="6" fill="#18181B" stroke="#27272A" />
          <text x="52" y="32" fill="#10B981" textAnchor="middle" fontWeight="bold">Scene</text>
          <text x="52" y="52" fill="#A1A1AA" textAnchor="middle" fontSize="9">Context/Dialog</text>
        </g>

        <path d="M 390 55 L 415 55" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-puchi)" />

        <g transform="translate(420, 20)">
          <rect width="105" height="70" rx="6" fill="#18181B" stroke="#27272A" />
          <text x="52" y="32" fill="#10B981" textAnchor="middle" fontWeight="bold">Activity</text>
          <text x="52" y="52" fill="#A1A1AA" textAnchor="middle" fontSize="9">Quiz/Pronounce</text>
        </g>

        <path d="M 525 55 L 560 55" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-puchi)" />

        {/* User Attempt & Mastery */}
        <g transform="translate(570, 20)">
          <rect width="155" height="70" rx="6" fill="#09090B" stroke="#10B981" strokeWidth="1.5" />
          <text x="77" y="30" fill="#FAFAFA" textAnchor="middle" fontWeight="bold">User Attempt</text>
          <text x="77" y="50" fill="#10B981" textAnchor="middle" fontSize="9">Evaluation & Score</text>
        </g>

        <path d="M 645 90 L 645 130" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-puchi)" />

        {/* NATS Event & Streak / XP Calculation */}
        <g transform="translate(15, 135)">
          <rect width="710" height="65" rx="8" fill="#18181B" stroke="#10B981" strokeWidth="1.5" />
          <text x="355" y="26" fill="#10B981" textAnchor="middle" fontWeight="bold">Asynchronous Mastery & Gamification Engine (NATS Event Bus)</text>
          <text x="355" y="48" fill="#A1A1AA" textAnchor="middle" fontSize="10">Event `learn.lesson.completed` ──► Core Service Updates XP, Daily Streaks, Leaderboard without HTTP blocking</text>
        </g>
      </svg>
    </DiagramContainer>
  );
}

// 6. Puchi GitOps Pipeline Diagram
export function PuchiGitOpsPipelineDiagram({ caption }: DiagramProps) {
  return (
    <DiagramContainer title="GitOps Deployment Pipeline (ArgoCD & K3s)" caption={caption || "Declarative GitHub Actions to ArgoCD K3s Sync Flow"}>
      <svg viewBox="0 0 740 220" className="w-full max-w-[720px] h-auto font-mono text-xs">
        <defs>
          <marker id="arrow-gitops" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
          </marker>
        </defs>

        <g transform="translate(20, 30)">
          <rect width="130" height="70" rx="8" fill="#18181B" stroke="#27272A" strokeWidth="1.5" />
          <text x="65" y="32" fill="#FAFAFA" textAnchor="middle" fontWeight="bold">1. Git Push</text>
          <text x="65" y="52" fill="#A1A1AA" textAnchor="middle" fontSize="9">GitHub Repo</text>
        </g>

        <path d="M 150 65 L 190 65" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-gitops)" />

        <g transform="translate(200, 30)">
          <rect width="140" height="70" rx="8" fill="#18181B" stroke="#27272A" strokeWidth="1.5" />
          <text x="70" y="32" fill="#FAFAFA" textAnchor="middle" fontWeight="bold">2. GitHub Actions</text>
          <text x="70" y="52" fill="#A1A1AA" textAnchor="middle" fontSize="9">Build & Test Containers</text>
        </g>

        <path d="M 340 65 L 380 65" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-gitops)" />

        <g transform="translate(390, 30)">
          <rect width="130" height="70" rx="8" fill="#18181B" stroke="#27272A" strokeWidth="1.5" />
          <text x="65" y="32" fill="#FAFAFA" textAnchor="middle" fontWeight="bold">3. GHCR Registry</text>
          <text x="65" y="52" fill="#10B981" textAnchor="middle" fontSize="9">Versioned Image Tag</text>
        </g>

        <path d="M 520 65 L 560 65" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-gitops)" />

        <g transform="translate(570, 30)">
          <rect width="150" height="70" rx="8" fill="#18181B" stroke="#10B981" strokeWidth="1.5" />
          <text x="75" y="32" fill="#10B981" textAnchor="middle" fontWeight="bold">4. ArgoCD GitOps</text>
          <text x="75" y="52" fill="#A1A1AA" textAnchor="middle" fontSize="9">App of Apps Sync</text>
        </g>

        {/* Destination: K3s Cluster */}
        <path d="M 645 100 L 645 135" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-gitops)" />

        <g transform="translate(20, 145)">
          <rect width="700" height="60" rx="8" fill="#09090B" stroke="#10B981" strokeWidth="1.5" />
          <text x="350" y="26" fill="#FAFAFA" textAnchor="middle" fontWeight="bold">5. 3-Node K3s Cluster (Production-like Self-Hosted Lab)</text>
          <text x="350" y="46" fill="#10B981" textAnchor="middle" fontSize="10">Traefik Ingress · CloudNativePG · NATS JetStream · Zero-Downtime Rolling Updates</text>
        </g>
      </svg>
    </DiagramContainer>
  );
}

// Map diagram slug to component
export const DIAGRAM_MAP: Record<string, React.FC<DiagramProps>> = {
  "designing-arda-cloud-native-finops-platform": ArdaSystemArchitectureDiagram,
  "arda-finops-microservices-module-federation": ArdaSystemArchitectureDiagram,
  "authentication-beyond-jwt-arda-identity-architecture": ArdaAuthFlowDiagram,
  "reliable-domain-events-nats-transactional-outbox": TransactionalOutboxDiagram,
  "bpmn-workflow-service-boundary-zeebe": WorkflowServiceBoundaryDiagram,
  "multi-remote-micro-frontend-platform-module-federation": ArdaSystemArchitectureDiagram,
  "production-like-platform-three-node-k3s-cluster": PuchiGitOpsPipelineDiagram,
  "building-puchi-product-idea-to-service-architecture": PuchiLearningDomainDiagram,
  "puchi-vietnamese-learning-platform-architecture": PuchiLearningDomainDiagram,
  "why-puchi-uses-opaque-sessions-over-jwt": ArdaAuthFlowDiagram,
  "git-push-to-k3s-puchi-gitops-pipeline": PuchiGitOpsPipelineDiagram,
  "designing-story-based-language-learning-engine": PuchiLearningDomainDiagram,
};
