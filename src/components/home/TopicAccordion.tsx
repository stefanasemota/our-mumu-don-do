import type { WeeklyEducationalTopic } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { StoryPlayer } from '../story/StoryPlayer';

interface TopicAccordionProps {
  topics: WeeklyEducationalTopic[];
}

export function TopicAccordion({ topics }: TopicAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {topics.map((topic) => (
        <AccordionItem value={topic.id} key={topic.id}>
          <AccordionTrigger className="text-lg font-headline hover:no-underline text-left px-6">
            {topic.title}
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-8">
              <StoryPlayer topic={topic} />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
