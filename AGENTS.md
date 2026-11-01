# AGENTS.md — AI Workflow, Git & Contributor Governance Protocol

Welcome to **Our Mumu Don Do**. All AI assistants, autonomous agents, and human contributors working in this repository MUST adhere to the following strict operational and governance rules. Zero filler or AI slop—keep code, commits, and documentation straight to the point.

---

## 1. Branching & Git Strategy (STRICT)
* **Never work on `main`:** Always create a descriptive branch (`feature/<slug>`, `fix/<slug>`, `chore/<slug>`) from the latest `development` or `main` branch before writing code.
* **Test on the branch:** Ensure all code builds, tests pass, and the feature works within the isolated branch.
* **Push, do not merge:** Push the verified branch to the remote repository and open a Draft Pull Request. Never merge into `main` or `development`—leave final merge/review to the human.

---

## 2. Execution Discipline
* **Verify before writing:** Read existing relevant code and run the build/test command (`npm run typecheck && npm test`) to confirm the baseline passes before making edits.
* **Look Before You Leap:** Always run a `find` or `grep` search to check if a utility function, hook, or component already exists before writing a new one from scratch.
* **Dependency Lockdown:** Never install new `npm` packages or `pip` libraries without explicit human approval first. Rely on existing dependencies whenever possible.
* **Fix your own bugs:** If a build, lint, or test command fails after your edit, iterate and fix it autonomously before declaring the task done.
* **Documentation Sync:** If a code change alters an API endpoint, CLI flag, environment variable, or setup step, update `README.md`, `dev.md`, or API docs in the same commit.
* **Zero AI Slop:** Avoid filler words, robotic transitions, or verbose boilerplate. Write concise, direct prose and self-documenting code.
* **Preserve Runtime State & Locked Files:** Files marked `@SABI_LOCKED` or `@SABI_AUTH_LOCKED` (e.g., `src/app/admin-login/actions.ts`, `src/lib/stories.ts`, `src/components/admin/EditStoryForm.tsx`) must NOT have their auth contracts altered.
* **Architectural Guardrails:** Keep UI components decoupled from low-level data fetching and maintain defense-in-depth security (SSRF prevention, strict Firestore schema rules, server layout authentication guards).

---

## 3. Conventional Commits & Atomicity
* **Commit atomicity:** Make small, logical commits as you progress through a feature rather than one massive commit at the end.
* **Explain the Fix:** When resolving a bug (`fix`), include a concise commit body explaining *why* the bug occurred and *how* the change fixed it.
* **Required Header Format:** `<type>(<optional-scope>): <short description>`

| Type | When to Use |
|---|---|
| `feat` | A new feature or educational content increment visible to the user |
| `fix` | A bug fix or security patch (include root cause & fix summary) |
| `docs` | Documentation only changes |
| `chore` | Build, config, or tooling changes |
| `refactor` | Code restructured with no behavior change |
| `test` | Adding or correcting automated unit, integration, or E2E tests |
| `style` | Formatting or visual polish with no logic changes |
| `perf` | Performance improvements (load time, bundle size, caching) |

### ❌ Rejected by CI
* `"updated code"`, `"changes"`, `"WIP"`, or any commit message without a valid `type:` prefix.

---

## 4. Verification Before Session Completion

Before submitting code changes or opening pull requests, you must run and verify:
1. `npm run typecheck` — Must pass with 0 errors.
2. `npm test` — Automated test suite must pass 100%.
3. `npm run build` — Next.js production build must compile successfully.
