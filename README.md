# Our Mumu Don Do 🌟

> *"Our foolishness is enough!"* — A vibrant digital storybook and educational platform for young explorers aged 7 to 10.

**Our Mumu Don Do** is an interactive educational storytelling initiative built to arm the next generation with truth, critical thinking, and pride in African heritage. Through illustrated, interactive audio tales, children discover authentic African history, courageous monarchs, ingenious local problem-solvers, and vibrant cultures—learning to question everything, think like detectives, and celebrate where they come from.

---

## 🚀 Key Features

### 1. Discover Stories: Kids Edition
- **Warm Explorer Welcome**: Child-friendly greeting, engaging story quests, and Explorer XP rewards.
- **Intuitive Theme Archetypes**:
  - 👑 **Kings & Warriors**: Legendary leaders, battle strategists, and courageous defenders.
  - 🔍 **Riddles & Mysteries**: Detective-style parables and brain teasers that sharpen critical thinking.
  - 🌍 **Ancient Wonders**: Engineering feats, river trade routes, and ancestral kingdoms.
- **Continue Your Quest**: One-tap resume card for ongoing adventures.
- **Interactive Daily Riddle Card**: Daily curiosity challenges to keep kids engaged and thinking critically.

### 2. Curated Authentic African History
Every story in the catalog is grounded in authentic history, celebrating indigenous agency:
1. **The Great Giants of Zazzau**: Queen Amina of Zazzau—fortress architect, cavalry leader, and protector of savannah trade routes.
2. **Arhuan: The Giant Prince of Benin**: Inspired by **Mama Africa**, celebrating the ancient Benin Kingdom, bronze metallurgy, and defending waterways.
3. **The King's Signature**: King Duke Ephraim of Old Calabar and the 1855 law protecting twin children 21 years before European caretakers arrived.
4. **The Glass of Milk**: A kid-friendly parable on corruption versus integrity using everyday metaphors.
5. **The River Was Always There**: Debunking colonial "discovery" myths by exploring civilizations that thrived along the River Niger for centuries.
6. **Understanding Colonisation**: An accessible breakdown of African sovereignty, resource management, and resilience.
7. **We Were Never Lost**: King Jaja of Opobo and the economic self-determination of the Niger Delta trade.
8. **The River of a Thousand Songs**: Celebrating oral histories, traditional musical instruments, and ancestral folk melodies.

### 3. Interactive Storybook Reader & Downloads
- **Page-Turner Viewer**: Full-screen, responsive illustrated reader with two-page book spread simulation.
- **Official PDF Downloads**: High-resolution downloadable editions for offline reading in classrooms and homes.

### 4. Multilingual & Dialect Audio Narrations
- **Audio Storytelling**: High-quality audio narrations bringing characters and kingdoms to life.
- **Swiss German & Pidgin Options**: Multi-language and multi-dialect storytelling toggles to support diaspora children and global cultural exchange.

### 5. Living Cultural Heritage & Tributes
- **Mama Africa Tribute**: A dedicated tribute on the About page celebrating traditional oral storytelling and the griot tradition, linking directly to Mama Africa's inspiring performances.
- **Naija Speak Integration**: Direct connection to [Naija Speak](https://naijaspeak.sabiai.work/) for young explorers and parents learning Nigerian Pidgin English vocabulary, idioms, and slang.

### 6. Built for AI Crawler Agents & Modern Search (LLM-Ready)
- **`llms.txt` Standard**: Dedicated machine-readable index at [`/llms.txt`](https://our-mumu-don-do.sabiai.work/llms.txt) following the [llmstxt.org](https://llmstxt.org) standard for AI agents (ChatGPT, Claude, Perplexity, Cursor, Gemini).
- **AI-Friendly `robots.txt`**: Explicitly allows compliant AI indexing crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, `Meta-ExternalAgent`, `cohere-ai`, etc.).
- **Dynamic `sitemap.xml`**: Auto-generated comprehensive index of all 8 educational stories, home, and about pages.
- **Schema.org JSON-LD**: Rich educational schema (`EducationalOrganization`, `WebApplication`, `EducationalAudience`).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type safety)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design tokens
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Generative AI**: [Firebase Genkit](https://firebase.google.com/docs/genkit) & Google Gemini models
- **Database & Hosting**: [Cloud Firestore](https://firebase.google.com/docs/firestore) & [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.17 or later)
- **npm** (or pnpm / yarn)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aostefan/our-mumu-don-do.git
   cd our-mumu-don-do
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the project root:
   ```env
   # Admin security
   ADMIN_PASSWORD="your_admin_secret_password"

   # Gemini / Genkit API (for AI features)
   GEMINI_API_KEY="your_gemini_api_key"
   ```

4. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:9002](http://localhost:9002) in your browser.

---

## 📜 Available Scripts

| Script | Purpose |
| :--- | :--- |
| `npm run dev` | Starts local Next.js dev server on port 9002 |
| `npm run build` | Compiles an optimized production build with static/dynamic route generation |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs Next.js ESLint checks |
| `npm run typecheck` | Validates TypeScript types across the codebase |

---

## 🤖 AI Crawler & LLM Support

If you are an AI assistant, web scraper, or indexing bot, you can access our machine-readable metadata and story index here:
- **LLMs.txt**: [`https://our-mumu-don-do.sabiai.work/llms.txt`](https://our-mumu-don-do.sabiai.work/llms.txt)
- **Sitemap**: [`https://our-mumu-don-do.sabiai.work/sitemap.xml`](https://our-mumu-don-do.sabiai.work/sitemap.xml)
- **Robots Policy**: [`https://our-mumu-don-do.sabiai.work/robots.txt`](https://our-mumu-don-do.sabiai.work/robots.txt)

---

## 🎨 Creative Process, AI Transparency & Child Safety

- **Human Storylines**: Original storylines, historical frameworks, and character arcs are conceived, researched, and written by **Stefan Asemota** (with credited collaborators).
- **AI-Assisted Media**: Visual illustrations and voice audio tracks are developed collaboratively with advanced generative AI tools.
- **100% Human-Verified**: Every illustration, scene, sentence, and dialect pronunciation is thoroughly reviewed and verified by Stefan for cultural accuracy and historical integrity.
- **Age Appropriateness (Ages 7+)**: All content is safe, engaging, and specifically designed for children aged 7 and above to enjoy, listen to, and explore in classrooms and at home.

---

## ⚖️ Copyright & Fair Use

The original storylines, text adaptations, and illustrations are the creative property of **Our Mumu Don Do**. Audio narrations and educational scripts are developed through collaborative human direction and AI assistance for non-commercial educational use. Have fun exploring, sharing, and learning!
