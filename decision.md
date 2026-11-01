# Architectural Decision Records (`decision.md`)

This reverse-chronological ledger documents the major architectural decisions, context, and impacts across the evolution of **Our Mumu Don Do** (newest at top, oldest at bottom).

---

## [01.11.2026] ADR-008: Shift-Left Repository Layer (`src/repositories/`) & Unit/E2E Test Separation

- **Origin**: Human Request (`aos-audit-project` Pillar D Optimizations).
- **Context**: Complete the final two compliance items in Pillar D of the 🏗️ Architectural Summary without violating `@SABI_LOCKED` / `@SABI_AUTH_LOCKED` contracts or installing unapproved external dependencies.
- **Decision**:
  1. Create `src/repositories/storyRepository.ts` (`fetchTopicWithCuratedFallback` and `buildTopicsOrderedQuery`) and refactor non-locked route and UI components (`src/app/story/[id]/page.tsx`, `src/app/share/story/[id]/page.tsx`, `src/components/home/StoryList.tsx`, `src/app/admin-dashboard/client-page.tsx`, `src/components/admin/client-page.tsx`) to consume `@/repositories`.
  2. Separate unit tests (`npm run test:unit` -> `tests/sanity.test.mjs`) from E2E route/boundary tests (`npm run test:e2e` -> `tests/e2e/routes.e2e.test.mjs`) and sync `README.md` and `dev.md`.
- **Impact**: Achieves 19/19 (100%) compliance in `aos-audit.md` while keeping `@SABI_LOCKED` files untouched.

---

## [01.11.2026] ADR-007: Reverse-Chronological `[DD.MM.YYYY]` Ledger Migration & `ai-rules.json` Governance Upgrade

- **Origin**: Human Request & `aos-audit-project` Audit.
- **Context**: Audited repository against the latest engine-neutral 🏗️ Architectural Summary. Identified legacy `YYYY-MM-DD` dates and oldest-to-newest ordering in `decision.md` and `aos-audit.md`, as well as missing `ai-rules.json`, Execution Discipline clauses in `AGENTS.md`, and `vibe-coding-guardrail` in `package.json`.
- **Decision**:
  1. Migrate all dates in `decision.md` and `aos-audit.md` to `[DD.MM.YYYY]` format and reorder `decision.md` from newest (top) to oldest (bottom).
  2. Create root `ai-rules.json` and upgrade `AGENTS.md` to enforce Strict Git Strategy, Execution Discipline (Verify Before Writing, Look Before You Leap, Dependency Lockdown, Fix Your Own Bugs, Documentation Sync, Commit Atomicity, Explain the Fix, Zero AI Slop), and Conventional Commits while preserving `@SABI_LOCKED` contracts.
  3. Register `"vibe-coding-guardrail": "github:stefanasemota/vibe-coding-guardrail"` in `package.json` `devDependencies`.
- **Impact**: Updates `decision.md`, `aos-audit.md`, `AGENTS.md`, `package.json`, `tests/sanity.test.mjs`, and creates `ai-rules.json`.

---

## [01.11.2026] ADR-006: Architectural Audit Verification & Deferral of Runtime Repository Refactoring

- **Origin**: Periodic architecture audit via `aos-audit-project`.
- **Context**: Evaluated repository compliance against the 🏗️ Architectural Summary (14/17 checks passing). Core documentation, package metadata, governance, Node 22 pin, and unit testing harness are fully verified. However, encapsulating data access into `src/repositories/` and standing up an E2E testing framework would touch critical production routes and `@SABI_LOCKED` authentication modules.
- **Decision**: Keep the current verified stable state. Defer the Shift-Left Repository refactoring (`src/repositories/`) and E2E harness scaffolding to a dedicated, isolated feature branch/milestone to prevent regressions in active user-facing and admin features.
- **Impact**: Zero downtime and zero disruption to production features while preserving a formal path for future data layer decoupling.

---

## [31.10.2026] ADR-005: AOS Vibe-Coding Architectural Compliance & Governance Scaffolding

- **Origin**: Project architecture audit via `aos-audit-project`.
- **Context**: Align repository structure and governance with the 🏗️ Architectural Summary expectations of the vibe-coder protocol.
- **Decision**:
  1. Add standard 5-badge header row and mandatory community footer to `README.md`.
  2. Standardize `package.json` with project identity, Stephan Asemota author metadata, keywords, repository URL, and automated test scripts (`npm test`).
  3. Establish `initiative.md`, `dev.md`, `decision.md`, `AGENTS.md`, `.nvmrc` (pinned to Node 22), and `.gitignore` key/dist exclusions.
  4. Create `tests/sanity.test.mjs` unit test suite executed by Node.js native test runner.
- **Impact**: Full compliance with the AOS Vibe Coding Guardrail protocol, consistent agent governance, and streamlined local onboarding.

---

## [16.10.2026] ADR-004: Defense-in-Depth Security Hardening (Firestore Rules, SSRF, & Session Auth)

- **Origin**: Comprehensive security audit of application surface.
- **Context**: Identified potential risks: unvalidated upstream media proxying (SSRF risk), loose cookie presence checking in admin dashboard, and unrestricted Firestore client writes.
- **Decision**:
  1. Patch media proxy to restrict exclusively to HTTPS and the project's Firebase Storage bucket with URL-decoded path-traversal prevention.
  2. Implement server-side layout authentication guard in `src/app/admin-dashboard/layout.tsx` verifying exact password values.
  3. Deploy hardened `firestore.rules` via specialist rules author: enforce strict field types, cap string and array sizes, disallow deletes, and lock document IDs.
  4. Inject HTTP security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Permissions-Policy).
- **Impact**: Closed SSRF attack vectors, protected database integrity against unauthorized mutation, and secured admin sessions across all route endpoints.

---

## [16.10.2026] ADR-003: WhatsApp 9:16 Vertical Audiogram Video Engine

- **Origin**: Viral social sharing requirements for WhatsApp Status and Instagram Stories.
- **Context**: On-the-fly client-side video rendering was slow, inconsistent across mobile browsers, and prone to memory exhaustion on lower-end devices.
- **Decision**: Pre-render 15-second vertical 9:16 MP4 video audiograms with animated soundwave visualizers, book cover artwork, typography, and direct story links using Node.js, `@napi-rs/canvas`, and `ffmpeg-static`. Serve pre-generated media directly from cloud storage with one-tap native Web Share API integration.
- **Impact**: Instant, zero-latency sharing to WhatsApp Status and Instagram Stories on mobile devices with high visual fidelity.

---

## [15.10.2026] ADR-002: Multi-Dialect Audio Narration Architecture (Swiss German & Pidgin)

- **Origin**: Expanding accessibility to diaspora children in Switzerland and Europe alongside Nigerian youth.
- **Context**: Creator Stefan Asemota identified that diaspora children speaking Swiss German (`de-CH`) and Nigerian Pidgin benefit deeply from hearing authentic stories in both heritage dialects.
- **Decision**: Integrate dual-language and multi-track narration into the story player (`StoryPlayer.tsx`) and data models (`audioUrl` and `audioUrlDeCH`), with direct link integration to Naija Speak (`naijaspeak.sabiai.work`).
- **Impact**: Enables diaspora kids to toggle between languages seamlessly while listening to authentic folk stories.

---

## [10.05.2024] ADR-001: Next.js 14 App Router & Firebase App Hosting Foundation

- **Origin**: Initial platform inception and architectural setup.
- **Context**: Need a fast, SEO-friendly, server-rendered and statically optimizable web application for kids' interactive storytelling with Google cloud deployment.
- **Decision**: Adopt Next.js 14 with App Router, TypeScript, Tailwind CSS, ShadCN UI, and Firebase App Hosting (SSR supported via Cloud Run under the hood).
- **Impact**: Provides instant page loads, rich typography, responsive layouts, and seamless cloud hosting with automatic preview channels.

