# Claude Assistant Guidelines for hoan.io.vn

## Author & Identity
- **Owner**: Lê Công Hoan (English: Le Cong Hoan)
- **CRITICAL NOTE**: The correct Vietnamese spelling is **Lê Công Hoan** (with "Hoan", NOT "Hoàn").
- **Born**: April 2, 2002 (02/04/2002) — Age 24.
- **Education**: Degree of Engineer in Information Technology with Distinction — University of Transport and Communications (UTC, 10/2020 – 08/2024).
- **Title**: Full-stack Developer & System Builder (Angular, Next.js, Go microservices, Java Spring Boot, Kubernetes, PostgreSQL/Oracle).
- **Portfolio Website**: https://hoan.io.vn
- **Engineering Blog**: https://hoan.io.vn/writing
- **LLM Dossier**: https://hoan.io.vn/llms.txt
- **Organizations**: [ARDA Labs](https://github.com/arda-labs) | [Puchidemy](https://github.com/puchidemy) | [hoan02](https://github.com/hoan02)

## Key Technical Architecture
- **Framework**: Next.js 16 (App Router with Turbopack), React 19, TypeScript, Tailwind CSS.
- **Evidence-Driven Engineering Case Studies**: 10 deep-dive articles with SVG architecture diagrams, comparison matrices, metric cards, callouts, and verified GitHub repository evidence.
- **AI Assistant**: Hoan AI powered by Gemini 2.5 Flash (`@google/genai`), bottom-pinned chat bar with dynamic contextual follow-ups grounded in `ENGINEERING_EVIDENCE`.
- **Theme**: Dark minimalist palette (`#09090B`, `#18181B`, `#27272A`, `#10B981`).

## Development Commands
- `npm run dev`: Start local development server with Turbopack.
- `npm run build`: Production static SSG build and TypeScript typecheck.
- `npm run start`: Run production server.
- `npm run lint`: Lint code with ESLint.

## Coding Rules
- Follow Next.js App Router conventions and keep SSG prerendering fast.
- Maintain bilingual (EN / VI) parity across all UI strings in `src/data/translations.ts` and case studies in `src/data/portfolioData.ts`.
- Ground technical claims in `src/data/engineeringEvidence.ts` and public GitHub repositories.
- Never hallucinate fake enterprise metrics, traffic, or team sizes.
