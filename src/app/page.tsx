'use server';

import { StoryList } from '@/components/home/StoryList';

export default async function Home() {
  return (
    <main className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-4 md:py-8 min-h-screen">
      <StoryList />
    </main>
  );
}
