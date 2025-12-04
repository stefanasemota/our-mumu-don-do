import { Guidelines } from '@/components/home/Guidelines';
import { TopicGrid } from '@/components/home/TopicGrid';
import { getTopics } from '@/lib/data';

export default async function Home() {
  const topics = await getTopics();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-4 tracking-tight">
          Understand Yesterday. Improve Today.
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-foreground/80">
          An educational tool for the young children of Nigeria, fostering
          critical thinking, celebrating Nigerian solutions, and exploring our
          rich historical context.
        </p>
      </section>

      <Guidelines />

      <section className="mt-12 md:mt-20">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-8 text-center">
          Weekly Educational Topics
        </h2>
        <TopicGrid topics={topics} />
      </section>
    </div>
  );
}
