import type { WeeklyEducationalTopic } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

interface TopicAccordionProps {
  topics: WeeklyEducationalTopic[];
}

export function TopicAccordion({ topics }: TopicAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {topics.map((topic) => (
        <AccordionItem value={topic.id} key={topic.id}>
          <AccordionTrigger className="text-lg font-headline hover:no-underline text-left">
            {topic.title}
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p className="text-muted-foreground">{topic.description}</p>
            <Button asChild variant="link" className="p-0 h-auto">
              <Link href={`/story/${topic.id}`}>
                Read The Full Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
