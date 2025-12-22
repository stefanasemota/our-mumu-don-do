import { Guidelines } from '@/components/home/Guidelines';
import { TopicAccordion } from '@/components/home/TopicAccordion';
import { getTopics } from '@/lib/data';
import { Separator } from '@/components/ui/separator';

export default async function Home() {
  const topics = await getTopics();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-4 tracking-tight">
          <span>Understand Yesterday.</span>
          <span className="block">Improve Today.</span>
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-foreground/80">
          An app for young Nigerians to uncover hidden stories, celebrate our
          own heroes, and master the art of critical thinking.
        </p>
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-8 text-center">
          Educational Stories
        </h2>
        <div>
          <TopicAccordion topics={topics} />
        </div>
      </section>

      <div className="my-12 md:my-16">
        <Separator />
      </div>

      <Guidelines />
    </div>
  );
}
