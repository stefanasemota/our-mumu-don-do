'use server';

import { StoryList } from '@/components/home/StoryList';
import { Separator } from '@/components/ui/separator';

export default async function Home() {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-8 md:py-12">
      <section className="mb-12 text-center md:mb-16">
        <h1 className="font-headline text-5xl font-bold tracking-tight text-primary md:text-7xl">
          <span>Discover Your Story.</span>
          <span className="block">Shape Your Future.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-4xl text-xl text-foreground/80 md:text-2xl leading-relaxed">
          An app for young Nigerians to uncover hidden stories, celebrate our
          own heroes, and master the art of critical thinking.
        </p>
      </section>

      <div className="my-12 md:my-16">
        <Separator />
      </div>

      <section className="mb-12 md:mb-16">
        <div className="w-full">
          <StoryList />
        </div>
      </section>
    </div>
  );
}
