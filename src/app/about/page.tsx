
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const principles = [
    {
      title: 'Correcting False Narratives',
      description:
        'We believe in presenting history with accuracy and nuance, challenging myths and highlighting the contributions of our own leaders and thinkers.',
    },
    {
      title: 'Celebrating Nigerian Solutions',
      description:
        'We showcase stories of local innovation, resilience, and problem-solving to inspire a new generation of creators and leaders.',
    },
    {
      title: 'Fostering Critical Thinking',
      description:
        'Our stories are designed not just to be consumed, but to be questioned. We encourage children to analyze, discuss, and form their own opinions.',
    },
    {
      title: 'Promoting Unity & Identity',
      description:
        'By exploring the diverse cultures and shared history of Nigeria, we aim to build a stronger sense of unity and collective identity.',
    },
  ];

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="mb-8 flex justify-end">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <article className="prose prose-invert mx-auto max-w-none prose-headings:font-headline prose-headings:tracking-tight prose-p:text-foreground/80 prose-li:text-foreground/80">
          <header className="mb-12">
            <h1 className="mb-2 text-4xl font-bold text-primary md:text-5xl">
              About Our Mumu Don Do
            </h1>
            <p className="mt-0 text-xl text-foreground/70">
              Understand Yesterday. Improve Today.
            </p>
          </header>

          <section className="mb-12">
            <p className="lead mb-6 border-l-4 border-primary pl-6 text-xl !text-foreground/90">
              <a
                href="https://naijaspeak.sabiai.work/share/yrzMKoe4pnZZJ2UQ9wrt"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold no-underline hover:underline text-primary"
              >
                <strong>Our Mumu Don Do</strong>
              </a>
              , a Pidgin English phrase meaning "Our foolishness is over," is
              an educational web application for young Nigerians. It aims to
              foster critical thinking, celebrate local solutions, and provide
              a rich understanding of historical context through engaging,
              illustrated stories.
            </p>
            <p>
              In a world filled with information, it is more important than ever
              for the next generation to develop the skills to think critically
              about the narratives they encounter. This platform was created to
              provide a space where children can explore complex topics like
              history, governance, and identity in an accessible and engaging
              way.
            </p>
          </section>

          <Separator className="my-12" />

          <section>
            <h2 className="text-3xl text-primary">Our Core Principles</h2>
            <p>
              The content on this platform is guided by four main principles,
              each designed to empower the next generation of Nigerian leaders
              and thinkers:
            </p>
            <div className="mt-8 space-y-8 not-prose">
              {principles.map((principle, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-primary">
                    {index + 1}.
                  </span>
                  <div>
                    <h3 className="mt-0 text-lg font-semibold text-foreground">
                      {principle.title}
                    </h3>
                    <p className="mt-1 text-foreground/80">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator className="my-12" />

          <section>
            <h2 className="text-3xl text-primary">How We Build Am</h2>
            <p>
              Dis app dey use correct modern tech tools to make sure say
              everything fast and reliable no be small:
            </p>
            <ul className="!mt-6">
              <li className="!mb-2">
                <strong>Next.js &amp; React:</strong> Na wetin we use build the
                interface make e for load sharp-sharp and work well.
              </li>
              <li className="!mb-2">
                <strong>Google Gemini &amp; Genkit:</strong> Na dem be the engine
                wey dey help us write and adapt the stories wey you dey read.
              </li>
              <li>
                <strong>AI Narration:</strong> Another special AI dey help us
                voice the stories, to make am come alive for your ears.
              </li>
            </ul>
          </section>

          <Separator className="my-12" />

          <section>
            <h2 className="text-3xl text-primary">
              &copy; Copyright &amp; Usage
            </h2>
            <p>
              The original storylines on this platform are the creative property
              of <strong>Our Mumu Don Do</strong>. The generative text and audio
              are created using AI models and are provided for personal,
              non-commercial, and educational purposes.
            </p>
            <p>
              While you are free to share and enjoy them, please be aware that
              they are the product of both human and AI collaboration and do not
              constitute a transfer of copyright.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
