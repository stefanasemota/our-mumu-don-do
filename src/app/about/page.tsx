import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  CheckCircle,
  Sparkles,
  Heart,
  Play,
  ExternalLink,
  ShieldCheck,
  Landmark,
  Lightbulb,
  Search,
  Globe,
  Languages,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const learningPillars = [
    {
      title: 'True History & Real Heroes',
      icon: Landmark,
      description:
        'We celebrate the true stories of great African kings, fearless warrior queens, and real community builders—showing history as it truly happened.',
    },
    {
      title: 'Smart Inventions & Local Solutions',
      icon: Lightbulb,
      description:
        'From ancient mud architecture to ingenious river trade routes, we show kids that African ingenuity and problem-solving have always thrived.',
    },
    {
      title: 'Question Everything (Sharp Thinking)',
      icon: Search,
      description:
        "Our stories aren't just for listening—they are packed with fun riddles and quick questions that challenge kids to think like detectives and make their own choices.",
    },
    {
      title: 'One People, Many Wonders',
      icon: Globe,
      description:
        'By exploring diverse traditions, songs, and languages from across Nigeria, children discover pride in their heritage and unity with one another.',
    },
  ];

  const techStack = [
    {
      name: 'Next.js & React',
      description:
        'Na wetin we use arrange the whole interface make e light, fast, and easy for pikin fingers to tap.',
    },
    {
      name: 'Google Gemini & Genkit',
      description:
        'The smart brain behind adapting long historical tales into exciting, kid-friendly adventures.',
    },
    {
      name: 'AI Narration',
      description:
        'Natural audio storytelling voices that bring every character and kingdom alive in your ears.',
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="mb-8 flex justify-between items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Discovery</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kids Edition</span>
          </div>
        </div>

        <article className="prose prose-invert mx-auto max-w-none prose-headings:font-headline prose-headings:tracking-tight prose-p:text-foreground/80 prose-li:text-foreground/80">
          <header className="mb-10">
            <h1 className="mb-3 text-4xl font-bold text-primary md:text-5xl lg:text-6xl tracking-tight">
              About Our Mumu Don Do
            </h1>
            <p className="mt-0 text-xl md:text-2xl font-medium text-foreground/80">
              Big Adventures. True History. Sharp Minds.
            </p>
          </header>

          <section className="mb-12">
            <div className="p-6 md:p-8 rounded-2xl bg-surface-container border border-outline-variant/30 not-prose mb-6 shadow-md">
              <p className="text-base md:text-lg leading-relaxed text-foreground/90 font-medium mb-4">
                <strong className="text-primary font-bold">Our Mumu Don Do</strong> (a beloved Pidgin phrase meaning <em>&quot;Our foolishness is enough!&quot;</em>) is a vibrant digital storybook designed for young explorers aged 7 to 10.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-foreground/80">
                We bring ancient Nigerian history, courageous leaders, clever tricksters, and rich cultures to life through illustrated, interactive audio tales. Instead of boring lectures, we give children thrilling stories that teach them how to think for themselves, ask smart questions, and celebrate where they come from.
              </p>
            </div>

            {/* NICE TO KNOW: LEARN NIGERIAN PIDGIN ENGLISH */}
            <div className="p-5 md:p-6 rounded-2xl bg-surface-container/70 border border-primary/20 hover:border-primary/40 transition-colors not-prose flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary flex-shrink-0 mt-0.5 sm:mt-0">
                  <Languages className="w-5 h-5" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                    <span>Nice to Know</span>
                    <span>•</span>
                    <span>Pidgin 101</span>
                  </div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">
                    Learn Nigerian Pidgin English
                  </h3>
                  <p className="text-sm text-foreground/75 mt-0.5 max-w-xl">
                    Curious about the phrases in our stories? Explore Naija Speak to master everyday Nigerian Pidgin expressions, vocabulary, and cultural context.
                  </p>
                </div>
              </div>
              <a
                href="https://naijaspeak.sabiai.work/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30 font-medium text-sm transition-all whitespace-nowrap self-stretch sm:self-auto justify-center group"
              >
                <span>Visit Naija Speak</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </section>

          <Separator className="my-10" />

          {/* WHAT EVERY YOUNG EXPLORER LEARNS HERE */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
              What Every Young Explorer Learns Here:
            </h2>
            <p className="text-base text-muted-foreground mb-6">
              Every quest is built around four fundamental cornerstones of discovery and critical growth:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 not-prose">
              {learningPillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-5 md:p-6 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col gap-3 shadow-sm hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-headline text-lg font-semibold text-foreground">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <Separator className="my-10" />

          {/* SPECIAL TRIBUTE: MAMA AFRICA & ORAL STORYTELLING */}
          <section className="mb-12 not-prose">
            <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-surface-container to-amber-500/5 border border-amber-500/30 shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-2.5 mb-3 text-amber-400 font-label-ui text-xs md:text-sm uppercase tracking-wider font-semibold">
                <Heart className="w-4 h-4 fill-amber-400" />
                <span>Special Tribute • Living African Oral Heritage</span>
              </div>

              <h2 className="font-headline text-2xl md:text-3xl text-foreground font-bold mb-3">
                Celebrating Mama Africa &amp; The Sacred Art of Oral Storytelling
              </h2>

              <p className="text-base md:text-lg text-foreground/85 leading-relaxed mb-4">
                Before books and screens, our grandmothers, elders, and griots gathered children under the baobab tree and by the evening fire to pass down the soul of our people. The epic story of <strong className="text-amber-300 font-semibold">Arhuan: The Giant Prince of Benin</strong> was lovingly inspired by <strong>Mama Africa</strong>, honoring the magic of her captivating storytelling voice.
              </p>

              <p className="text-sm md:text-base text-foreground/75 leading-relaxed mb-5">
                We celebrate her and every traditional African storyteller who keeps our ancestral folklore, rhythm, humor, and courage alive for generations to come.
              </p>

              <a
                href="https://youtu.be/I_xZDq9vj7c?si=jykeZn-g5xbh8qbw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 font-semibold text-sm transition-all shadow-md active:scale-95 group"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Watch Mama Africa&apos;s Storytelling Video</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </section>

          <Separator className="my-10" />

          {/* HOW WE BUILD AM */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
              How We Build Am
            </h2>
            <p className="text-foreground/80 mb-6">
              Dis app dey use correct modern technology to make sure say everything load sharp-sharp and sweet:
            </p>

            <div className="space-y-4 not-prose">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-start gap-4 p-4 rounded-xl bg-surface-container border border-outline-variant/20"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-headline text-base md:text-lg font-semibold text-foreground">
                      {tech.name}
                    </h3>
                    <p className="text-sm md:text-base text-foreground/80 mt-0.5">
                      {tech.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator className="my-10" />

          {/* COPYRIGHT & FAIR USE */}
          <section className="mb-12">
            <div className="flex items-center gap-2 text-primary font-semibold mb-2">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="text-xl md:text-2xl text-primary font-bold m-0">
                &copy; Copyright &amp; Fair Use
              </h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-foreground/80">
              The original storylines and illustrations are the creative property of <strong>Our Mumu Don Do</strong>. All audio narrations and adaptive scripts are generated collaboratively through human creative direction and AI tools for non-commercial educational use. Have fun exploring, sharing, and learning!
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
