'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { WeeklyEducationalTopic } from '@/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '../ui/button';
import { Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const placeholderId = categoryImageMap[topic.guidelineCategory];
  const placeholder = PlaceHolderImages.find((p) => p.id === placeholderId);
  const imageUrl = topic.pages[0]?.imageUrl.startsWith('/')
    ? topic.pages[0].imageUrl
    : placeholder?.imageUrl || '';

  const handleShare = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault(); // Prevent link navigation if inside a link, though we moved it out.
    e.stopPropagation();

    const shareData = {
      title: topic.title,
      text: topic.description,
      url: `${window.location.origin}/story/${topic.id}`,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast({
          title: 'Link Copied!',
          description: 'The story link has been copied to your clipboard.',
        });
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        toast({
          variant: 'destructive',
          title: 'Failed to Copy',
          description: 'Could not copy the link to your clipboard.',
        });
      }
    }
  };

  return (
    <Card
      key={topic.id}
      className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1 border-border/50 group"
    >
      <Link href={`/story/${topic.id}`} className="block h-full flex flex-col">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
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
      </Link>
      <CardFooter>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-accent-foreground"
          onClick={handleShare}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}
