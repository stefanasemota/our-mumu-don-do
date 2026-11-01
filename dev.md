# Developer Guide (`dev.md`) — Our Mumu Don Do

This guide provides instructions for setting up, developing, testing, and running **Our Mumu Don Do** locally and within Google Antigravity.

---

## 1. Prerequisites & Environment

- **Node.js**: `22.x` (Pinned via `.nvmrc`)
- **npm**: `>= 10.x`
- **Shell**: bash / zsh
- **FFmpeg**: Handled locally via `ffmpeg-static` for 9:16 vertical video audiogram generation.

To ensure your environment matches the repository runtime:
```bash
nvm use
```

---

## 2. Installation & Quick Start

```bash
# Clone the repository
git clone https://github.com/stefanasemota/our-mumu-don-do.git
cd our-mumu-don-do

# Install dependencies
npm install

# Start local Next.js development server
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser.

---

## 3. Environment Variables Configuration

Create a `.env` file in the project root:

```env
# Admin Authentication Secret (used by @stefan/sabi-auth & server layout guards)
ADMIN_PASSWORD="your_admin_secret_password"
ADMIN_EMAIL="admin@our-mumu-don-do.com"

# Google Gemini / Firebase Genkit (for AI story adaptation)
GEMINI_API_KEY="your_gemini_api_key"

# Public Firebase Configuration (optional override if different from studio default)
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="studio-748727496-885ed.firebasestorage.app"
```

---

## 4. Execution Commands & Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Next.js development server on port 9002. |
| `npm run build` | Compiles optimized Next.js production build. |
| `npm run start` | Runs the compiled Next.js production build locally. |
| `npm run lint` | Runs Next.js ESLint checks. |
| `npm run typecheck` | Validates TypeScript types across the entire codebase (`tsc --noEmit`). |
| `npm test` | Runs the automated unit test suite via Node.js native test runner. |
| `npm run test:unit` | Executes unit tests (`node --test tests/sanity.test.mjs`). |
| `npm run test:e2e` | Executes E2E route and repository boundary tests (`node --test tests/e2e/routes.e2e.test.mjs`). |
| `npm run genkit:dev` | Starts the Firebase Genkit developer interface. |

---

## 5. Google Antigravity & Agent Workflows

When working with Google Antigravity AI agents in this project:
- **Sandbox Execution**: Commands should be executed in standard sandbox mode first. Only network-restricted tasks (such as git push or external authentication) require elevated bypass permission.
- **Micro-Patches**: Always apply focused, minimal edits using file replacement tools rather than rewriting entire files.
- **Verification Loop**: Always run `npm run typecheck` and `npm test` before concluding a task or pushing commits.
- **Auth Guard Integrity**: Never remove `@SABI_LOCKED` comments or modify password validation logic in `src/app/admin-login/actions.ts` or `src/app/admin-dashboard/layout.tsx`.

---

## 6. Pre-rendering Audiogram Teasers

To generate or refresh pre-rendered 15-second vertical MP4 audiograms:
```bash
node scripts/generate-teasers.mjs
```
The output videos will be generated into `public/teasers/`.
