'use client';

import { useState, useRef, useEffect } from 'react';
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
import { Button } from '@/components/ui/button';
import { Play, Pause, ExternalLink } from 'lucide-react';
import type { WeeklyEducationalTopic } from '@/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ShareCardProps {
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

export function ShareCard({ topic }: ShareCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const placeholderId = categoryImageMap[topic.guidelineCategory];
  const placeholder = PlaceHolderImages.find((p) => p.id === placeholderId);
  const imageUrl = topic.pages[0]?.imageUrl.startsWith('/')
    ? topic.pages[0].imageUrl
    : placeholder?.imageUrl || '';

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    if (audioElement.src !== topic.audioUrl) {
      audioElement.src = topic.audioUrl;
    }

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audioElement.addEventListener('ended', handleEnded);

    if (isPlaying) {
      audioElement.play().catch((error) => {
        console.error('Audio play failed:', error);
        setIsPlaying(false);
      });
    } else {
      audioElement.pause();
    }

    return () => {
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [isPlaying, topic.audioUrl]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <div className="relative h-60 w-full">
        <Image
          src={imageUrl}
          alt={topic.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{topic.title}</CardTitle>
        <CardDescription>{topic.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={togglePlayPause} className="w-full" size="lg">
          {isPlaying ? (
            <>
              <Pause className="mr-2" /> Pause Story
            </>
          ) : (
            <>
              <Play className="mr-2" /> Listen to Story
            </>
          )}
        </Button>
        <audio ref={audioRef} src={topic.audioUrl} preload="metadata" />
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/story/${topic.id}`}>
            <ExternalLink className="mr-2" /> View Full Interactive Story
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
