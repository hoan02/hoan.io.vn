# Project Context & Agent Guidelines

## Owner & Identity Information
- **Full Name**: Lê Công Hoan (English: Le Cong Hoan)
  - *CRITICAL RULE*: The Vietnamese name is **Lê Công Hoan** (with "Hoan", NOT "Hoàn"). Never write "Hoàn".
- **Date of Birth**: April 2, 2002 (02/04/2002) — Age 24.
- **Title**: Full-stack Developer & System Builder
- **Education**: Degree of Engineer in Information Technology (Graduated with Distinction) — University of Transport and Communications (UTC, 10/2020 – 08/2024).
- **Contact**: lehoan.dev@gmail.com | (+84) 0358 069 992
- **Website**: https://hoan.io.vn | https://hoan.io.vn/writing | https://hoan.io.vn/llms.txt

## Core Architecture Sources & Organizations
1. **ARDA Labs** (`https://github.com/arda-labs` | `https://arda.io.vn`):
   - `arda-be`: 9 Go microservices (`iam`, `platform`, `finance`, `workflow`, `crm`, `hrm`, `notification`, `media`, `mdm`) with `libs/go/*` (`arda-auth`, `arda-grpc`, `arda-events`, `arda-postgres`). Synchronous gRPC + NATS JetStream events with Transactional Outbox + CloudNativePG HA + Zeebe 8.5 BPMN.
   - `arda-mfe`: React Module Federation (1 Shell + 7 Remotes) + `@workspace/*` shared packages (shadcn UI, api, auth, i18n, core, theme).
   - `arda-infra`: 3-node bare-metal K3s cluster (`192.168.100.201-203`), Traefik ForwardAuth Ingress, Ory Kratos/Hydra IAM, ArgoCD GitOps, Cloudflare Tunnel.
2. **Puchidemy** (`https://github.com/puchidemy` | `https://puchi.io.vn`):
   - `puchi-frontend`: Next.js PWA with Limen Auth opaque sessions.
   - `puchi-backend`: 5 Go microservices monorepo (`auth`, `core`, `learn`, `media`, `notification`) on Kratos v3 framework. Protobuf-first, NATS event bus.
   - `puchi-infra`: K3s cluster, ArgoCD GitOps, Cloudflare Tunnel, Cloudflare R2 audio streaming.
3. **Systems & IoT Projects**:
   - `camrelay` (`https://github.com/hoan02/camrelay`): High-performance asynchronous Rust bridge tunneling proprietary Dahua/easy4ip P2P cameras into local RTSP streams for Frigate NVR & Home Assistant with FFmpeg recording and rclone Google Drive archiving.
   - `b4s` (`https://github.com/hoan02/b4s`): Cross-platform desktop companion (Tauri v2 + Rust btleplug + SolidJS) for local Bluetooth LE headphone control (ANC, 10-band EQ, battery telemetry) without cloud accounts.
4. **Enterprise Experience**:
   - `NGV Group` (12/2024 – Present): Angular micro-frontends, Java Spring Boot microservices, Oracle/PostgreSQL, Kubernetes on-premise, Zalo OA module.
   - `MochiMochi` (03/2024 – 08/2024): Next.js App Router, web applications for Japanese & Chinese language learning.

## AI Assistant & Grounding Guidelines
- **Model**: `gemini-2.5-flash` via `@google/genai`.
- **Knowledge Base**: Rely on `ENGINEERING_EVIDENCE` from `src/data/engineeringEvidence.ts` and `ARTICLES_DATA` from `src/data/portfolioData.ts`.
- **Factuality Rule**: Never invent fake enterprise traffic, team sizes, or metrics. Describe architecture, self-hosted deployments, and evidence from public repositories accurately.
- **Conversational Rule**: Answer the user's actual question first (e.g. personal background, hobbies) rather than redirecting every question to technical skills.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
