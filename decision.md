# Architectural Decision Records (`decision.md`)

This chronological ledger documents the major architectural decisions, context, and impacts across the evolution of **Our Mumu Don Do**.

---

## [2024-05-10] ADR-001: Next.js 14 App Router & Firebase App Hosting Foundation

- **Origin**: Initial platform inception and architectural setup.
- **Context**: Need a fast, SEO-friendly, server-rendered and statically optimizable web application for kids' interactive storytelling with Google cloud deployment.
- **Decision**: Adopt Next.js 14 with App Router, TypeScript, Tailwind CSS, ShadCN UI, and Firebase App Hosting (SSR supported via Cloud Run under the hood).
- **Impact**: Provides instant page loads, rich typography, responsive layouts, and seamless cloud hosting with automatic preview channels.

---

## [2026-10-15] ADR-002: Multi-Dialect Audio Narration Architecture (Swiss German & Pidgin)

- **Origin**: Expanding accessibility to diaspora children in Switzerland and Europe alongside Nigerian youth.
- **Context**: Creator Stefan Asemota identified that diaspora children speaking Swiss German (`de-CH`) and Nigerian Pidgin benefit deeply from hearing authentic stories in both heritage dialects.
- **Decision**: Integrate dual-language and multi-track narration into the story player (`StoryPlayer.tsx`) and data models (`audioUrl` and `audioUrlDeCH`), with direct link integration to Naija Speak (`naijaspeak.sabiai.work`).
- **Impact**: Enables diaspora kids to toggle between languages seamlessly while listening to authentic folk stories.

---

## [2026-10-16] ADR-003: WhatsApp 9:16 Vertical Audiogram Video Engine

- **Origin**: Viral social sharing requirements for WhatsApp Status and Instagram Stories.
- **Context**: On-the-fly client-side video rendering was slow, inconsistent across mobile browsers, and prone to memory exhaustion on lower-end devices.
- **Decision**: Pre-render 15-second vertical 9:16 MP4 video audiograms with animated soundwave visualizers, book cover artwork, typography, and direct story links using Node.js, `@napi-rs/canvas`, and `ffmpeg-static`. Serve pre-generated media directly from cloud storage with one-tap native Web Share API integration.
- **Impact**: Instant, zero-latency sharing to WhatsApp Status and Instagram Stories on mobile devices with high visual fidelity.

---

## [2026-10-16] ADR-004: Defense-in-Depth Security Hardening (Firestore Rules, SSRF, & Session Auth)

- **Origin**: Comprehensive security audit of application surface.
- **Context**: Identified potential risks: unvalidated upstream media proxying (SSRF risk), loose cookie presence checking in admin dashboard, and unrestricted Firestore client writes.
- **Decision**:
  1. Patch media proxy to restrict exclusively to HTTPS and the project's Firebase Storage bucket with URL-decoded path-traversal prevention.
  2. Implement server-side layout authentication guard in `src/app/admin-dashboard/layout.tsx` verifying exact password values.
  3. Deploy hardened `firestore.rules` via specialist rules author: enforce strict field types, cap string and array sizes, disallow deletes, and lock document IDs.
  4. Inject HTTP security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Permissions-Policy).
- **Impact**: Closed SSRF attack vectors, protected database integrity against unauthorized mutation, and secured admin sessions across all route endpoints.

---

## [2026-10-31] ADR-005: AOS Vibe-Coding Architectural Compliance & Governance Scaffolding

- **Origin**: Project architecture audit via `aos-audit-project`.
- **Context**: Align repository structure and governance with the 🏗️ Architectural Summary expectations of the vibe-coder protocol.
- **Decision**:
  1. Add standard 5-badge header row and mandatory community footer to `README.md`.
  2. Standardize `package.json` with project identity, Stephan Asemota author metadata, keywords, repository URL, and automated test scripts (`npm test`).
  3. Establish `initiative.md`, `dev.md`, `decision.md`, `AGENTS.md`, `.nvmrc` (pinned to Node 22), and `.gitignore` key/dist exclusions.
  4. Create `tests/sanity.test.mjs` unit test suite executed by Node.js native test runner.
- **Impact**: Full compliance with the AOS Vibe Coding Guardrail protocol, consistent agent governance, and streamlined local onboarding.

---

## [2026-11-01] ADR-006: Architectural Audit Verification & Deferral of Runtime Repository Refactoring

- **Origin**: Periodic architecture audit via `aos-audit-project`.
- **Context**: Evaluated repository compliance against the 🏗️ Architectural Summary (14/17 checks passing). Core documentation, package metadata, governance, Node 22 pin, and unit testing harness are fully verified. However, encapsulating data access into `src/repositories/` and standing up an E2E testing framework would touch critical production routes and `@SABI_LOCKED` authentication modules.
- **Decision**: Keep the current verified stable state. Defer the Shift-Left Repository refactoring (`src/repositories/`) and E2E harness scaffolding to a dedicated, isolated feature branch/milestone to prevent regressions in active user-facing and admin features.
- **Impact**: Zero downtime and zero disruption to production features while preserving a formal path for future data layer decoupling.

