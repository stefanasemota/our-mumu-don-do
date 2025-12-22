import type { WeeklyEducationalTopic } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { StoryPlayer } from '../story/StoryPlayer';
import { Badge } from '@/components/ui/badge';

interface TopicAccordionProps {
  topics: WeeklyEducationalTopic[];
}

export function TopicAccordion({ topics }: TopicAccordionProps) {
  if (!topics || topics.length === 0) {
    return (
      <div className="text-center text-foreground/80 py-10">
        <p className="font-headline text-2xl">Oboi, NEPA take light oh!</p>
        <p className="text-sm mt-2">No stories found. Please check back later.</p>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {topics.map((topic) => {
        const categories = Array.isArray(topic.guidelineCategory)
          ? topic.guidelineCategory
          : [topic.guidelineCategory];
        return (
          <AccordionItem value={topic.id} key={topic.id}>
            <AccordionTrigger className="text-lg font-headline hover:no-underline text-left px-6">
              <div className="flex flex-wrap items-center gap-4">
                <span>{topic.title}</span>
                <div className="flex flex-wrap items-center gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="font-normal text-sm"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-4 pb-8">
                <StoryPlayer topic={topic} />
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
