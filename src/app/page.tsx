'use server';

import { Guidelines } from '@/components/home/Guidelines';
import { StoryList } from '@/components/home/StoryList';
import { Separator } from '@/components/ui/separator';

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="mb-12 text-center md:mb-16">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-6xl">
          <span>Discover Your Story.</span>
          <span className="block">Shape Your Future.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
          An app for young Nigerians to uncover hidden stories, celebrate our
          own heroes, and master the art of critical thinking.
        </p>
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="mb-8 text-center font-headline text-3xl font-bold md:text-4xl">
          Educational Stories
        </h2>
        <div>
          <StoryList />
        </div>
      </section>

      <div className="my-12 md:my-16">
        <Separator />
      </div>

      <Guidelines />
    </div>
  );
}
