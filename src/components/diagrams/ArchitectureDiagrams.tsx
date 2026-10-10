"use client";

import React from "react";

interface DiagramProps {
  caption?: string;
  captionVi?: string;
}

export function DiagramContainer({ title, caption, children }: { title: string; caption?: string; children: React.ReactNode }) {
  return (
    <figure className="my-8 border-y border-rule py-4 text-ink">
      <figcaption className="eyebrow pb-3 mb-4 border-b border-rule">{title}</figcaption>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[620px] py-2 flex justify-center">
          {children}
        </div>
      </div>
      {caption && (
        <p className="mt-3 text-xs text-muted font-mono">
          {caption}
        </p>
      )}
    </figure>
  );
}

// 1. Arda High-Level Architecture Diagram
export function ArdaSystemArchitectureDiagram({ caption }: DiagramProps) {
  return (
    <DiagramContainer title="Arda System Architecture" caption={caption || "Arda: Cloud-Native Multi-Tenant FinOps Platform Topology"}>
      <svg viewBox="0 0 760 380" className="w-full max-w-[740px] h-auto font-mono text-xs">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" style={{ fill: "var(--accent)" }} />
          </marker>
        </defs>

        {/* Client & Edge */}
        <g transform="translate(20, 20)">
          <rect width="180" height="70" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper-2)", stroke: "var(--faint)" }} />
          <text x="90" y="32" textAnchor="middle" fontWeight="bold" fontSize="12" style={{ fill: "var(--ink)" }}>Browser / Clients</text>
          <text x="90" y="52" textAnchor="middle" fontSize="10" style={{ fill: "var(--muted)" }}>React Module Federation</text>
        </g>

        <path d="M 200 55 L 260 55" strokeWidth="1.5" markerEnd="url(#arrow)" style={{ stroke: "var(--accent)" }} />

        <g transform="translate(270, 20)">
          <rect width="200" height="70" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper-2)", stroke: "var(--faint)" }} />
          <text x="100" y="32" textAnchor="middle" fontWeight="bold" fontSize="12" style={{ fill: "var(--ink)" }}>Cloudflare Tunnel</text>
          <text x="100" y="52" textAnchor="middle" fontSize="10" style={{ fill: "var(--muted)" }}>DDoS · SSL · Zero Open Ports</text>
        </g>

        <path d="M 470 55 L 530 55" strokeWidth="1.5" markerEnd="url(#arrow)" style={{ stroke: "var(--accent)" }} />

        <g transform="translate(540, 20)">
          <rect width="200" height="70" rx="2" strokeWidth="1.5" strokeDasharray="3 3" style={{ fill: "var(--paper-2)", stroke: "var(--accent)" }} />
          <text x="100" y="32" textAnchor="middle" fontWeight="bold" fontSize="12" style={{ fill: "var(--accent)" }}>Traefik Ingress</text>
          <text x="100" y="52" textAnchor="middle" fontSize="10" style={{ fill: "var(--muted)" }}>ForwardAuth Verification</text>
        </g>

        {/* Auth Gateway & IAM */}
        <path d="M 640 90 L 640 140" strokeWidth="1.5" markerEnd="url(#arrow)" style={{ stroke: "var(--accent)" }} />

        <g transform="translate(20, 150)">
          <rect width="720" height="90" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper-2)", stroke: "var(--faint)" }} />
          <rect x="15" y="15" width="220" height="60" rx="2" style={{ fill: "var(--paper)", stroke: "var(--faint)" }} />
          <text x="125" y="38" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--ink)" }}>auth-gateway (BFF)</text>
          <text x="125" y="56" textAnchor="middle" fontSize="10" style={{ fill: "var(--accent)" }}>Session & Context Proxy</text>

          <rect x="255" y="15" width="220" height="60" rx="2" style={{ fill: "var(--paper)", stroke: "var(--faint)" }} />
          <text x="365" y="38" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--ink)" }}>Ory Kratos + Hydra</text>
          <text x="365" y="56" textAnchor="middle" fontSize="10" style={{ fill: "var(--muted)" }}>Identity & OAuth2 / OIDC</text>

          <rect x="495" y="15" width="210" height="60" rx="2" style={{ fill: "var(--paper)", stroke: "var(--faint)" }} />
          <text x="600" y="38" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--ink)" }}>iam-service</text>
          <text x="600" y="56" textAnchor="middle" fontSize="10" style={{ fill: "var(--muted)" }}>RBAC, Roles & Tenant Policies</text>
        </g>

        {/* Go services */}
        <path d="M 380 240 L 380 270" strokeWidth="1.5" markerEnd="url(#arrow)" style={{ stroke: "var(--accent)" }} />

        <g transform="translate(20, 280)">
          <rect width="720" height="85" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper-2)", stroke: "var(--accent)" }} />
          <text x="360" y="24" textAnchor="middle" fontWeight="bold" fontSize="11" style={{ fill: "var(--accent)" }}>Go services: 15 in the repo, 6 shown (gRPC & NATS JetStream)</text>
          
          <g transform="translate(15, 35)">
            <rect width="105" height="35" rx="2" style={{ fill: "var(--paper)", stroke: "var(--faint)" }} />
            <text x="52" y="22" textAnchor="middle" fontSize="10" style={{ fill: "var(--ink)" }}>finance</text>
          </g>
          <g transform="translate(130, 35)">
            <rect width="105" height="35" rx="2" style={{ fill: "var(--paper)", stroke: "var(--faint)" }} />
            <text x="52" y="22" textAnchor="middle" fontSize="10" style={{ fill: "var(--ink)" }}>workflow</text>
          </g>
          <g transform="translate(245, 35)">
            <rect width="105" height="35" rx="2" style={{ fill: "var(--paper)", stroke: "var(--faint)" }} />
            <text x="52" y="22" textAnchor="middle" fontSize="10" style={{ fill: "var(--ink)" }}>crm</text>
          </g>
          <g transform="translate(360, 35)">
            <rect width="105" height="35" rx="2" style={{ fill: "var(--paper)", stroke: "var(--faint)" }} />
            <text x="52" y="22" textAnchor="middle" fontSize="10" style={{ fill: "var(--ink)" }}>hrm</text>
          </g>
          <g transform="translate(475, 35)">
            <rect width="105" height="35" rx="2" style={{ fill: "var(--paper)", stroke: "var(--faint)" }} />
            <text x="52" y="22" textAnchor="middle" fontSize="10" style={{ fill: "var(--ink)" }}>platform</text>
          </g>
          <g transform="translate(590, 35)">
            <rect width="115" height="35" rx="2" style={{ fill: "var(--paper)", stroke: "var(--faint)" }} />
            <text x="57" y="22" textAnchor="middle" fontSize="10" style={{ fill: "var(--ink)" }}>notification/media</text>
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
            <path d="M 0 1 L 10 5 L 0 9 z" style={{ fill: "var(--accent)" }} />
          </marker>
        </defs>

        {/* Step 1: Browser */}
        <g transform="translate(20, 30)">
          <rect width="150" height="90" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper-2)", stroke: "var(--faint)" }} />
          <text x="75" y="35" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--ink)" }}>1. Browser Client</text>
          <text x="75" y="55" textAnchor="middle" fontSize="10" style={{ fill: "var(--muted)" }}>BFF Cookie / Header</text>
          <text x="75" y="72" textAnchor="middle" fontSize="9" style={{ fill: "var(--accent)" }}>puchi/arda.io.vn</text>
        </g>

        <path d="M 170 75 L 220 75" strokeWidth="1.5" markerEnd="url(#arrow-auth)" style={{ stroke: "var(--accent)" }} />

        {/* Step 2: Traefik Ingress */}
        <g transform="translate(230, 30)">
          <rect width="160" height="90" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper-2)", stroke: "var(--accent)" }} />
          <text x="80" y="35" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--accent)" }}>2. Traefik Ingress</text>
          <text x="80" y="55" textAnchor="middle" fontSize="10" style={{ fill: "var(--muted)" }}>ForwardAuth Middleware</text>
          <text x="80" y="72" textAnchor="middle" fontSize="9" style={{ fill: "var(--ink)" }}>Route Interception</text>
        </g>

        <path d="M 390 75 L 440 75" strokeWidth="1.5" markerEnd="url(#arrow-auth)" style={{ stroke: "var(--accent)" }} />

        {/* Step 3: auth-gateway */}
        <g transform="translate(450, 30)">
          <rect width="160" height="90" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper-2)", stroke: "var(--faint)" }} />
          <text x="80" y="35" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--ink)" }}>3. auth-gateway</text>
          <text x="80" y="55" textAnchor="middle" fontSize="10" style={{ fill: "var(--muted)" }}>Ory Session Check</text>
          <text x="80" y="72" textAnchor="middle" fontSize="9" style={{ fill: "var(--accent)" }}>Resolves User Context</text>
        </g>

        <path d="M 530 120 L 530 180" strokeWidth="1.5" markerEnd="url(#arrow-auth)" style={{ stroke: "var(--accent)" }} />

        {/* Step 4: Identity Validation Engines */}
        <g transform="translate(20, 190)">
          <rect width="360" height="100" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper-2)", stroke: "var(--faint)" }} />
          <text x="180" y="30" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--ink)" }}>4. Ory Kratos & Hydra + IAM</text>
          <text x="180" y="52" textAnchor="middle" fontSize="10" style={{ fill: "var(--muted)" }}>• Kratos: Credentials & Multi-factor</text>
          <text x="180" y="68" textAnchor="middle" fontSize="10" style={{ fill: "var(--muted)" }}>• Hydra: OAuth2 Grants & Tokens</text>
          <text x="180" y="84" textAnchor="middle" fontSize="10" style={{ fill: "var(--muted)" }}>• IAM: RBAC, Tenant UUID & Permissions</text>
        </g>

        <path d="M 380 240 L 440 240" strokeWidth="1.5" markerEnd="url(#arrow-auth)" style={{ stroke: "var(--accent)" }} />

        {/* Step 5: Downstream Microservices with Injected Headers */}
        <g transform="translate(450, 190)">
          <rect width="270" height="100" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper)", stroke: "var(--accent)" }} />
          <text x="135" y="28" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--accent)" }}>5. Downstream Go Services</text>
          <text x="135" y="48" textAnchor="middle" fontSize="10" style={{ fill: "var(--ink)" }}>Injected Trusted Headers:</text>
          <text x="135" y="66" textAnchor="middle" fontSize="9" style={{ fill: "var(--muted)" }}>X-User-Id, X-Tenant-Id</text>
          <text x="135" y="82" textAnchor="middle" fontSize="9" style={{ fill: "var(--muted)" }}>X-Roles, X-Permissions</text>
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
            <path d="M 0 1 L 10 5 L 0 9 z" style={{ fill: "var(--accent)" }} />
          </marker>
        </defs>

        {/* 1. Go Domain Service */}
        <g transform="translate(20, 30)">
          <rect width="180" height="110" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper-2)", stroke: "var(--faint)" }} />
          <text x="90" y="32" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--ink)" }}>Go Domain Service</text>
          <text x="90" y="55" textAnchor="middle" fontSize="10" style={{ fill: "var(--accent)" }}>BEGIN TX</text>
          <text x="90" y="75" textAnchor="middle" fontSize="9" style={{ fill: "var(--muted)" }}>1. Insert Domain Row</text>
          <text x="90" y="92" textAnchor="middle" fontSize="9" style={{ fill: "var(--muted)" }}>2. Insert Outbox Event</text>
        </g>

        <path d="M 200 85 L 260 85" strokeWidth="1.5" markerEnd="url(#arrow-outbox)" style={{ stroke: "var(--accent)" }} />

        {/* 2. PostgreSQL Atomic Transaction */}
        <g transform="translate(270, 30)">
          <rect width="210" height="110" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper)", stroke: "var(--accent)" }} />
          <text x="105" y="30" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--accent)" }}>PostgreSQL (Atomic Commit)</text>
          <rect x="15" y="45" width="180" height="24" rx="2" style={{ fill: "var(--paper-2)", stroke: "var(--faint)" }} />
          <text x="105" y="61" textAnchor="middle" fontSize="9" style={{ fill: "var(--ink)" }}>orders / payments (State)</text>
          <rect x="15" y="75" width="180" height="24" rx="2" style={{ fill: "var(--paper-2)", stroke: "var(--faint)" }} />
          <text x="105" y="91" textAnchor="middle" fontSize="9" style={{ fill: "var(--accent)" }}>outbox_events (Payload)</text>
        </g>

        <path d="M 375 140 L 375 190" strokeWidth="1.5" markerEnd="url(#arrow-outbox)" style={{ stroke: "var(--accent)" }} />

        {/* 3. Outbox Relay Worker */}
        <g transform="translate(270, 200)">
          <rect width="210" height="75" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper-2)", stroke: "var(--faint)" }} />
          <text x="105" y="30" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--ink)" }}>Outbox Relay Worker</text>
          <text x="105" y="48" textAnchor="middle" fontSize="9" style={{ fill: "var(--muted)" }}>Polls / CDC unpublished events</text>
          <text x="105" y="64" textAnchor="middle" fontSize="9" style={{ fill: "var(--accent)" }}>Envelope[T] + Mark Published</text>
        </g>

        <path d="M 480 237 L 530 237" strokeWidth="1.5" markerEnd="url(#arrow-outbox)" style={{ stroke: "var(--accent)" }} />

        {/* 4. NATS JetStream & Consumer */}
        <g transform="translate(540, 100)">
          <rect width="180" height="175" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper-2)", stroke: "var(--faint)" }} />
          <text x="90" y="32" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--accent)" }}>NATS JetStream</text>
          <text x="90" y="50" textAnchor="middle" fontSize="9" style={{ fill: "var(--muted)" }}>At-least-once Delivery</text>

          <path d="M 90 65 L 90 95" strokeWidth="1.5" markerEnd="url(#arrow-outbox)" style={{ stroke: "var(--accent)" }} />

          <rect x="15" y="105" width="150" height="55" rx="2" style={{ fill: "var(--paper)", stroke: "var(--accent)" }} />
          <text x="90" y="125" textAnchor="middle" fontWeight="bold" fontSize="10" style={{ fill: "var(--ink)" }}>Idempotent Consumer</text>
          <text x="90" y="142" textAnchor="middle" fontSize="9" style={{ fill: "var(--muted)" }}>Event ID Deduplication</text>
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
            <path d="M 0 1 L 10 5 L 0 9 z" style={{ fill: "var(--accent)" }} />
          </marker>
        </defs>

        {/* Domain Services */}
        <g transform="translate(20, 20)">
          <rect width="200" height="220" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper-2)", stroke: "var(--faint)" }} />
          <text x="100" y="30" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--ink)" }}>Domain Services</text>
          
          <rect x="20" y="50" width="160" height="40" rx="2" style={{ fill: "var(--paper)", stroke: "var(--faint)" }} />
          <text x="100" y="75" textAnchor="middle" style={{ fill: "var(--ink)" }}>finance-service</text>

          <rect x="20" y="105" width="160" height="40" rx="2" style={{ fill: "var(--paper)", stroke: "var(--faint)" }} />
          <text x="100" y="130" textAnchor="middle" style={{ fill: "var(--ink)" }}>crm-service</text>

          <rect x="20" y="160" width="160" height="40" rx="2" style={{ fill: "var(--paper)", stroke: "var(--faint)" }} />
          <text x="100" y="185" textAnchor="middle" style={{ fill: "var(--ink)" }}>hrm-service</text>
        </g>

        <path d="M 220 130 L 290 130" strokeWidth="1.5" markerEnd="url(#arrow-wf)" style={{ stroke: "var(--accent)" }} />

        {/* Workflow Service Boundary */}
        <g transform="translate(300, 45)">
          <rect width="220" height="170" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper-2)", stroke: "var(--accent)" }} />
          <text x="110" y="30" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--accent)" }}>workflow-service</text>
          <text x="110" y="50" textAnchor="middle" fontSize="10" style={{ fill: "var(--muted)" }}>gRPC & HTTP Facade</text>
          
          <rect x="15" y="70" width="190" height="85" rx="2" style={{ fill: "var(--paper)", stroke: "var(--faint)" }} />
          <text x="105" y="90" textAnchor="middle" fontSize="9" style={{ fill: "var(--ink)" }}>CreateCase / SubmitCase</text>
          <text x="105" y="108" textAnchor="middle" fontSize="9" style={{ fill: "var(--muted)" }}>User Task Assignment</text>
          <text x="105" y="126" textAnchor="middle" fontSize="9" style={{ fill: "var(--muted)" }}>SLA Timers & Error Boundary</text>
          <text x="105" y="144" textAnchor="middle" fontSize="9" style={{ fill: "var(--accent)" }}>Domain Event Hooks</text>
        </g>

        <path d="M 520 130 L 580 130" strokeWidth="1.5" markerEnd="url(#arrow-wf)" style={{ stroke: "var(--accent)" }} />

        {/* Zeebe Engine */}
        <g transform="translate(590, 65)">
          <rect width="130" height="130" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper)", stroke: "var(--accent)" }} />
          <text x="65" y="45" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--ink)" }}>Zeebe 8.5</text>
          <text x="65" y="70" textAnchor="middle" fontSize="10" style={{ fill: "var(--accent)" }}>BPMN 2.0</text>
          <text x="65" y="95" textAnchor="middle" fontSize="9" style={{ fill: "var(--muted)" }}>Orchestration</text>
          <text x="65" y="110" textAnchor="middle" fontSize="9" style={{ fill: "var(--muted)" }}>Engine</text>
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
            <path d="M 0 1 L 10 5 L 0 9 z" style={{ fill: "var(--accent)" }} />
          </marker>
        </defs>

        {/* Content Hierarchy */}
        <g transform="translate(15, 20)">
          <rect width="105" height="70" rx="2" style={{ fill: "var(--paper-2)", stroke: "var(--faint)" }} />
          <text x="52" y="32" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--accent)" }}>City</text>
          <text x="52" y="52" textAnchor="middle" fontSize="9" style={{ fill: "var(--muted)" }}>Hanoi / HCMC</text>
        </g>

        <path d="M 120 55 L 145 55" strokeWidth="1.5" markerEnd="url(#arrow-puchi)" style={{ stroke: "var(--accent)" }} />

        <g transform="translate(150, 20)">
          <rect width="105" height="70" rx="2" style={{ fill: "var(--paper-2)", stroke: "var(--faint)" }} />
          <text x="52" y="32" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--accent)" }}>Story</text>
          <text x="52" y="52" textAnchor="middle" fontSize="9" style={{ fill: "var(--muted)" }}>Topic & Goal</text>
        </g>

        <path d="M 255 55 L 280 55" strokeWidth="1.5" markerEnd="url(#arrow-puchi)" style={{ stroke: "var(--accent)" }} />

        <g transform="translate(285, 20)">
          <rect width="105" height="70" rx="2" style={{ fill: "var(--paper-2)", stroke: "var(--faint)" }} />
          <text x="52" y="32" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--accent)" }}>Scene</text>
          <text x="52" y="52" textAnchor="middle" fontSize="9" style={{ fill: "var(--muted)" }}>Context/Dialog</text>
        </g>

        <path d="M 390 55 L 415 55" strokeWidth="1.5" markerEnd="url(#arrow-puchi)" style={{ stroke: "var(--accent)" }} />

        <g transform="translate(420, 20)">
          <rect width="105" height="70" rx="2" style={{ fill: "var(--paper-2)", stroke: "var(--faint)" }} />
          <text x="52" y="32" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--accent)" }}>Activity</text>
          <text x="52" y="52" textAnchor="middle" fontSize="9" style={{ fill: "var(--muted)" }}>Quiz/Pronounce</text>
        </g>

        <path d="M 525 55 L 560 55" strokeWidth="1.5" markerEnd="url(#arrow-puchi)" style={{ stroke: "var(--accent)" }} />

        {/* User Attempt & Mastery */}
        <g transform="translate(570, 20)">
          <rect width="155" height="70" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper)", stroke: "var(--accent)" }} />
          <text x="77" y="30" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--ink)" }}>User Attempt</text>
          <text x="77" y="50" textAnchor="middle" fontSize="9" style={{ fill: "var(--accent)" }}>Evaluation & Score</text>
        </g>

        <path d="M 645 90 L 645 130" strokeWidth="1.5" markerEnd="url(#arrow-puchi)" style={{ stroke: "var(--accent)" }} />

        {/* NATS Event & Streak / XP Calculation */}
        <g transform="translate(15, 135)">
          <rect width="710" height="65" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper-2)", stroke: "var(--accent)" }} />
          <text x="355" y="26" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--accent)" }}>Asynchronous Mastery & Gamification Engine (NATS Event Bus)</text>
          <text x="355" y="48" textAnchor="middle" fontSize="10" style={{ fill: "var(--muted)" }}>Event `learn.lesson.completed` ──► Core Service Updates XP, Daily Streaks, Leaderboard without HTTP blocking</text>
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
            <path d="M 0 1 L 10 5 L 0 9 z" style={{ fill: "var(--accent)" }} />
          </marker>
        </defs>

        <g transform="translate(20, 30)">
          <rect width="130" height="70" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper-2)", stroke: "var(--faint)" }} />
          <text x="65" y="32" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--ink)" }}>1. Git Push</text>
          <text x="65" y="52" textAnchor="middle" fontSize="9" style={{ fill: "var(--muted)" }}>GitHub Repo</text>
        </g>

        <path d="M 150 65 L 190 65" strokeWidth="1.5" markerEnd="url(#arrow-gitops)" style={{ stroke: "var(--accent)" }} />

        <g transform="translate(200, 30)">
          <rect width="140" height="70" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper-2)", stroke: "var(--faint)" }} />
          <text x="70" y="32" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--ink)" }}>2. GitHub Actions</text>
          <text x="70" y="52" textAnchor="middle" fontSize="9" style={{ fill: "var(--muted)" }}>Build & Test Containers</text>
        </g>

        <path d="M 340 65 L 380 65" strokeWidth="1.5" markerEnd="url(#arrow-gitops)" style={{ stroke: "var(--accent)" }} />

        <g transform="translate(390, 30)">
          <rect width="130" height="70" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper-2)", stroke: "var(--faint)" }} />
          <text x="65" y="32" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--ink)" }}>3. GHCR Registry</text>
          <text x="65" y="52" textAnchor="middle" fontSize="9" style={{ fill: "var(--accent)" }}>Versioned Image Tag</text>
        </g>

        <path d="M 520 65 L 560 65" strokeWidth="1.5" markerEnd="url(#arrow-gitops)" style={{ stroke: "var(--accent)" }} />

        <g transform="translate(570, 30)">
          <rect width="150" height="70" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper-2)", stroke: "var(--accent)" }} />
          <text x="75" y="32" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--accent)" }}>4. ArgoCD GitOps</text>
          <text x="75" y="52" textAnchor="middle" fontSize="9" style={{ fill: "var(--muted)" }}>App of Apps Sync</text>
        </g>

        {/* Destination: K3s Cluster */}
        <path d="M 645 100 L 645 135" strokeWidth="1.5" markerEnd="url(#arrow-gitops)" style={{ stroke: "var(--accent)" }} />

        <g transform="translate(20, 145)">
          <rect width="700" height="60" rx="2" strokeWidth="1.5" style={{ fill: "var(--paper)", stroke: "var(--accent)" }} />
          <text x="350" y="26" textAnchor="middle" fontWeight="bold" style={{ fill: "var(--ink)" }}>5. 3-Node K3s Cluster (Production-like Self-Hosted Lab)</text>
          <text x="350" y="46" textAnchor="middle" fontSize="10" style={{ fill: "var(--accent)" }}>Traefik Ingress · CloudNativePG · NATS JetStream · Zero-Downtime Rolling Updates</text>
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
