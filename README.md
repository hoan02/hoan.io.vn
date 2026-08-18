# Le Cong Hoan (Lê Công Hoan) — Engineering Portfolio

> Evidence-driven personal developer portfolio and architecture case study hub of **Lê Công Hoan** — Full-stack Developer & System Builder. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, and AI Assistant (Gemini 2.5 Flash).

🌐 **Live Website**: [https://hoan.io.vn](https://hoan.io.vn)  
📄 **Engineering Notes**: [https://hoan.io.vn/writing](https://hoan.io.vn/writing)  
🤖 **LLM Context Dossier**: [https://hoan.io.vn/llms.txt](https://hoan.io.vn/llms.txt)

---

## 👨‍💻 Author & Identity

- **Full Name**: Lê Công Hoan (English: Le Cong Hoan) *(Note: Spelled "Hoan", NOT "Hoàn")*
- **Role**: Full-stack Developer & System Builder
- **Born**: April 2, 2002 (02/04/2002) — Hanoi, Vietnam
- **Education**: Degree of Engineer in Information Technology (Graduated with Distinction) — University of Transport and Communications (UTC, 10/2020 – 08/2024)
- **Email**: [lehoan.dev@gmail.com](mailto:lehoan.dev@gmail.com)
- **Phone**: (+84) 0358 069 992
- **GitHub**: [github.com/hoan02](https://github.com/hoan02)
- **LinkedIn**: [linkedin.com/in/hoan02](https://www.linkedin.com/in/hoan02)
- **Facebook**: [facebook.com/hoanit02](https://web.facebook.com/hoanit02)
- **CV / Resume**: [hoan.io.vn/cv/Le_Cong_Hoan_CV.pdf](https://hoan.io.vn/cv/Le_Cong_Hoan_CV.pdf)

---

## 🏗️ Open Source Architecture Organizations

- 🏢 **[ARDA Labs](https://github.com/arda-labs)** ([arda.io.vn](https://arda.io.vn)): Cloud-native multi-tenant FinOps platform featuring 9 Go microservices (synchronous gRPC + NATS JetStream events), React Module Federation (1 Shell + 7 Remotes), Ory Kratos/Hydra zero-trust identity with Traefik ForwardAuth, Zeebe 8.5 BPMN workflows, and CloudNativePG HA on a 3-node bare-metal K3s cluster.
- 📚 **[Puchidemy](https://github.com/puchidemy)** ([puchi.io.vn](https://puchi.io.vn)): Modern Vietnamese language learning web platform featuring a Next.js PWA frontend, 5 Go microservices monorepo built on Kratos v3, Limen Auth opaque sessions, NATS event bus, Cloudflare R2 audio streaming, and declarative ArgoCD GitOps on K3s.
- 📹 **[camrelay](https://github.com/hoan02/camrelay)**: High-performance asynchronous Rust daemon tunneling proprietary Dahua/easy4ip P2P cameras into local RTSP streams for Frigate NVR & Home Assistant with FFmpeg recording and rclone Google Drive archiving.
- 🎧 **[b4s](https://github.com/hoan02/b4s)**: Cross-platform desktop companion (Tauri v2 + Rust btleplug + SolidJS) for local Bluetooth LE headphone control (ANC, 10-band EQ, battery telemetry) without third-party cloud apps.

---

## 📚 10 Flagship Engineering Case Studies (`/writing`)

1. **[Designing Arda: A Cloud-Native Financial Operations Platform](https://hoan.io.vn/writing/designing-arda-cloud-native-finops-platform)** — System design of 9 Go services, gRPC, NATS, auth-gateway, CloudNativePG HA, and K3s GitOps.
2. **[Authentication Beyond JWT: Designing Arda's Identity Architecture](https://hoan.io.vn/writing/authentication-beyond-jwt-arda-identity-architecture)** — Edge Traefik ForwardAuth, auth-gateway BFF, Ory Kratos/Hydra, and downstream header injection.
3. **[Reliable Domain Events with NATS and the Transactional Outbox Pattern](https://hoan.io.vn/writing/reliable-domain-events-nats-transactional-outbox)** — Solving dual-write hazards in distributed Go services with PostgreSQL atomic outbox tables and idempotent consumer deduplication.
4. **[Putting BPMN Behind a Workflow Service Boundary](https://hoan.io.vn/writing/bpmn-workflow-service-boundary-zeebe)** — Clean gRPC workflow-service facade isolating Zeebe 8.5 process orchestration, SLA timers, and user tasks.
5. **[What I Learned Building a Multi-Remote Micro Frontend Platform](https://hoan.io.vn/writing/multi-remote-micro-frontend-platform-module-federation)** — React Module Federation architecture with 1 Shell host + 7 decoupled remotes sharing `@workspace/*` packages.
6. **[Running a Production-Like Platform on a Three-Node K3s Cluster](https://hoan.io.vn/writing/production-like-platform-three-node-k3s-cluster)** — 3 control-plane/worker bare-metal nodes, CloudNativePG HA PostgreSQL, NATS JetStream, Valkey, Traefik, and ArgoCD GitOps.
7. **[Building Puchi: From Product Idea to Service Architecture](https://hoan.io.vn/writing/building-puchi-product-idea-to-service-architecture)** — Deriving 5 Go Kratos v3 microservices from learner product needs, NATS event streaming, and Cloudflare R2 audio.
8. **[Why Puchi Uses Opaque Sessions Instead of JWT Everywhere](https://hoan.io.vn/writing/why-puchi-uses-opaque-sessions-over-jwt)** — Opaque bearer session tokens, centralized revocation authority, internal gRPC introspection, and Valkey caching.
9. **[Git Push to K3s: Building Puchi's GitOps Deployment Pipeline](https://hoan.io.vn/writing/git-push-to-k3s-puchi-gitops-pipeline)** — Zero-touch continuous delivery with GitHub Actions, GHCR, SealedSecrets, and declarative ArgoCD synchronization.
10. **[Designing a Story-Based Language Learning Engine](https://hoan.io.vn/writing/designing-story-based-language-learning-engine)** — Domain modeling: City -> Story -> Scene -> Content -> Activity hierarchy, separating static curriculum from dynamic learner progress.

---

## 🛠️ Tech Stack & Key Features

- **Frontend Core**: Next.js 16 (App Router + Turbopack), React 19, TypeScript, Tailwind CSS.
- **Visual Design**: Sleek dark aesthetic (`#09090B`, panel `#18181B`, border `#27272A`, emerald accent `#10B981`), interactive SVG architecture diagrams, image lightbox zoom, and side-by-side Naive vs Solution comparison cards.
- **AI Assistant (Hoan AI)**: Contextual assistant powered by Gemini 2.5 Flash (`@google/genai`), bottom-pinned chat bar with dynamic contextual follow-ups grounded in `ENGINEERING_EVIDENCE`.
- **SEO & AI Optimization (GEO/AIO)**: JSON-LD Person schema, dynamic `sitemap.xml`, `robots.txt`, and standard `/llms.txt` dossier.
- **Bilingual**: Seamless instant switching between English & Tiếng Việt.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Create `.env.local`:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production (Static SSG)
```bash
npm run build
```

---

## 📄 License
© 2026 Lê Công Hoan. All rights reserved.
