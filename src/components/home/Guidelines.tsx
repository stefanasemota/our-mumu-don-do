import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Lightbulb,
  Landmark,
  Users,
  BrainCircuit,
} from 'lucide-react';
import type { GuidelineCategory } from '@/types';

const guidelines: {
  category: GuidelineCategory;
  icon: React.ElementType;
  description: string;
}[] = [
  {
    category: 'Nigerian Solutions',
    icon: Lightbulb,
    description: 'Celebrating local innovation and problem-solving.',
  },
  {
    category: 'Critical Thinking',
    icon: BrainCircuit,
    description: 'Encouraging questions and analytical skills.',
  },
  {
    category: 'Historical Context',
    icon: Landmark,
    description: 'Understanding our past to shape a better future.',
  },
  {
    category: 'Unity & Identity',
    icon: Users,
    description: 'Exploring the diverse cultures that make us one.',
  },
];

export function Guidelines() {
  return (
    <section id="guidelines" className="mb-12 md:mb-16">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {guidelines.map((guideline) => (
          <Card
            key={guideline.category}
            className="bg-card/50 border-border/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium font-body text-foreground/90">
                {guideline.category}
              </CardTitle>
              <guideline.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {guideline.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
