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
  return (
    <Accordion type="single" collapsible className="w-full">
      {topics.map((topic) => (
        <AccordionItem value={topic.id} key={topic.id}>
          <AccordionTrigger className="text-lg font-headline hover:no-underline text-left px-6">
            <div className="flex items-center gap-4">
              <span>{topic.title}</span>
              {(topic.id === '2' || topic.id === '3') && (
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                  correcting false narratives
                </Badge>
              )}
            </div>
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
