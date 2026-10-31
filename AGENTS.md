# AGENTS.md — AI Agent & Contributor Governance Protocol

Welcome to **Our Mumu Don Do**. All AI assistants, autonomous agents, and human contributors working in this repository MUST adhere to the following governance and development standards.

---

## 1. Conventional Commits Standard

Every commit message MUST strictly adhere to the Conventional Commits specification:

```
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

### Allowed Types
- `feat`: A new user-facing feature or educational content increment
- `fix`: A bug fix or security patch
- `docs`: Documentation updates, README changes, or commentary
- `chore`: Tooling, dependency updates, configuration, or scaffolding changes
- `refactor`: Code changes that neither fix a bug nor add a feature
- `test`: Adding or modifying automated unit, integration, or E2E tests
- `style`: Formatting, whitespace, or visual polish with no logic changes
- `perf`: Performance improvements (load time, bundle size, caching)

### Rules
- Keep the subject line imperative and concise (e.g. `feat(audiogram): add download trigger`).
- Reference related issue IDs or architectural decisions when applicable.
- Never bundle unrelated changes into a single monolithic commit.

---

## 2. Vibe-Coder & Feature-Driven Development Protocol

When developing or updating features in this codebase:
1. **Branch Isolation**: Work on isolated branches (e.g., `feature/...`, `fix/...`, `chore/...`) and never directly push untested changes to `main`.
2. **Micro-Patches**: Build in small, verified iterations. Validate each step with `npm run typecheck` and `npm test`.
3. **Preserve Runtime State & Locked Files**:
   - Files marked `@SABI_LOCKED` or `@SABI_AUTH_LOCKED` (e.g., `src/app/admin-login/actions.ts`, `src/lib/stories.ts`, `src/components/admin/EditStoryForm.tsx`) must NOT have their auth contracts altered.
4. **Architectural Guardrails**:
   - Keep UI components decoupled from low-level data fetching.
   - Maintain defense-in-depth security (SSRF prevention, strict Firestore schema rules, server layout authentication guards).

---

## 3. Verification Before Session Completion

Before submitting code changes or opening pull requests, you must run and verify:
1. `npm run typecheck` — Must pass with 0 errors.
2. `npm test` — Automated test suite must pass 100%.
3. `npm run build` — Next.js production build must compile successfully.
