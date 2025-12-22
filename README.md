# Our Mumu Don Do

"Our foolishness is over."

This project is an educational web application for the children of Nigeria. It's built to arm the next generation with the truth by dismantling false histories and celebrating our own solutions. Through raw, illustrated stories, we foster the critical thinking needed to build a future free from the old nonsense.

## Features

- **Interactive Story Player**: Engages children with illustrated story pages complete with text and audio narration.
- **Featured Videos**: Showcases educational video content from various creators.
- **Themed Content**: Topics are organized into four main guideline categories:
  - Nigerian Solutions
  - Critical Thinking
  - Historical Context
  - Unity & Identity
- **AI-Powered Content Suggestions**: Utilizes Genkit and Google's Gemini model to help creators enhance story content.
- **Admin Dashboard**: A password-protected section for managing application content.
- **Responsive Design**: Built with a mobile-first approach to ensure a great experience on all devices.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with Google's Gemini models
- **Hosting**: Prepared for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or another package manager like yarn or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   ```

2. **Navigate to the project directory:**
   ```bash
   cd <project-directory>
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root of the project and add the necessary environment variables. This file is ignored by Git, so it's a safe place for your secrets.

```env
# A password to protect the /admin-dashboard route
ADMIN_PASSWORD="your_secret_admin_password"

# Firebase configuration (if using Firebase services)
# NEXT_PUBLIC_FIREBASE_API_KEY=
# NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
# NEXT_PUBLIC_FIREBASE_PROJECT_ID=
# NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
# NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
# NEXT_PUBLIC_FIREBASE_APP_ID=

# Genkit/Gemini API Key
# GEMINI_API_KEY=
```

### Running the Application

To run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

## Available Scripts

- `npm run dev`: Starts the Next.js development server with Turbopack.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.
