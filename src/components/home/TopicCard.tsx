import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { WeeklyEducationalTopic } from '@/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface TopicCardProps {
  topic: WeeklyEducationalTopic;
}

const categoryImageMap: Record<
  WeeklyEducationalTopic['guidelineCategory'],
  string
> = {
  'Nigerian Solutions': 'topic-nigerian-solutions',
  'Critical Thinking': 'topic-critical-thinking',
  'Historical Context': 'topic-historical-context',
  'Unity & Identity': 'topic-unity-identity',
};

export function TopicCard({ topic }: TopicCardProps) {
  const placeholderId = categoryImageMap[topic.guidelineCategory];
  const placeholder = PlaceHolderImages.find((p) => p.id === placeholderId);

  return (
    <Link href={`/story/${topic.id}`} className="group flex flex-col">
      <Card className="flex-grow overflow-hidden transition-all duration-300 ease-in-out hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1 border-border/50">
        <div className="relative h-48 w-full">
          <Image
            src={topic.pages[0]?.imageUrl || placeholder?.imageUrl || ''}
            alt={topic.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={placeholder?.imageHint}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <CardHeader>
          <CardTitle className="font-headline text-lg leading-snug group-hover:text-primary transition-colors">
            {topic.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
          <CardDescription className="text-sm text-muted-foreground mb-4 flex-grow">
            {topic.description}
          </CardDescription>
          <Badge variant="secondary" className="font-normal w-fit">
            {topic.guidelineCategory}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
}
