import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
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
              <strong>Our Mumu Don Do</strong> is an educational web
              application designed for the young children of Nigeria. It aims to
              foster critical thinking, celebrate local Nigerian solutions, and
              provide a rich understanding of historical context through
              engaging, illustrated stories.
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
            <ul className="!mt-6 list-none !pl-0">
              <li className="mb-4">
                <h3 className="mb-1 mt-0 text-lg font-semibold !text-foreground">
                  1. Correcting False Narratives
                </h3>
                <p className="!mt-0">
                  We believe in presenting history with accuracy and nuance,
                  challenging myths and highlighting the contributions of our
                  own leaders and thinkers.
                </p>
              </li>
              <li className="mb-4">
                <h3 className="mb-1 mt-0 text-lg font-semibold !text-foreground">
                  2. Celebrating Nigerian Solutions
                </h3>
                <p className="!mt-0">
                  We showcase stories of local innovation, resilience, and
                  problem-solving to inspire a new generation of creators and
                  leaders.
                </p>
              </li>
              <li className="mb-4">
                <h3 className="mb-1 mt-0 text-lg font-semibold !text-foreground">
                  3. Fostering Critical Thinking
                </h3>
                <p className="!mt-0">
                  Our stories are designed not just to be consumed, but to be
                  questioned. We encourage children to analyze, discuss, and
                  form their own opinions.
                </p>
              </li>
              <li>
                <h3 className="mb-1 mt-0 text-lg font-semibold !text-foreground">
                  4. Promoting Unity &amp; Identity
                </h3>
                <p className="!mt-0">
                  By exploring the diverse cultures and shared history of
                  Nigeria, we aim to build a stronger sense of unity and
                  collective identity.
                </p>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}
