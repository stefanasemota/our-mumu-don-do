/** 
 * @SABI_LOCKED
 * AI INSTRUCTION: DO NOT MODIFY THIS FILE. 
 * This file contains specific Sabi Auth logic and optimized Next.js Image settings.
 */
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
import { Play, Pause, ExternalLink, Home } from 'lucide-react';
import type { WeeklyEducationalTopic } from '@/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ShareCardProps {
  topic: WeeklyEducationalTopic;
}

const categoryImageMap: Record<string, string> = {
  'Nigerian Solutions': 'topic-nigerian-solutions',
  'Critical Thinking': 'topic-critical-thinking',
  'Historical Context': 'topic-historical-context',
  'Unity & Identity': 'topic-unity-identity',
};

export function ShareCard({ topic }: ShareCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const categories = Array.isArray(topic.guidelineCategory)
    ? topic.guidelineCategory
    : [topic.guidelineCategory];
  const placeholderId =
    categories.length > 0
      ? categoryImageMap[categories[0]]
      : 'topic-critical-thinking';
  const placeholder = PlaceHolderImages.find((p) => p.id === placeholderId);

  const imageUrl =
    topic.pages && topic.pages[0]?.imageUrl?.startsWith('/')
      ? topic.pages[0].imageUrl
      : placeholder?.imageUrl || '/images/the-glass-of-milk/page_0.png';

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement || !topic.audioUrl) return;

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
    <>
      <div className="absolute top-4 right-4 z-50">
        <Button asChild variant="outline" className="bg-background/50 backdrop-blur-sm">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Go to App
          </Link>
        </Button>
      </div>

      <Card className="w-full max-w-md overflow-hidden border-white/10 bg-[#0f172a]">
        {/* 
            FIX 1: pt-10 creates the gap at the top.
            FIX 2: h-80 makes the image container much taller (bigger image).
            FIX 3: px-6 pushes the image slightly in from the sides for a premium look.
        */}
        <div className="px-6 pt-10"> 
          <div className="relative h-80 w-full overflow-hidden rounded-xl border border-white/5 shadow-2xl">
            {/* @SABI_IMAGE_LOCK_START - AI: DO NOT EDIT THIS BLOCK */}
            <Image
              src={imageUrl}
              alt={topic.title}
              fill
              priority
              // Changed to object-cover to make the image "Big" and fill the container
              className="object-cover" 
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* @SABI_IMAGE_LOCK_END */}
          </div>
        </div>

        <CardHeader className="pt-6">
          <CardTitle className="font-headline text-3xl text-white">
            {topic.title}
          </CardTitle>
          <CardDescription className="text-slate-400 text-base leading-relaxed">
            {topic.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {topic.audioUrl && (
            <Button 
              onClick={togglePlayPause} 
              className="w-full bg-green-700 hover:bg-green-600 text-white h-14 text-lg" 
              size="lg"
            >
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-5 w-5" /> Pause Story
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" /> Listen to Story
                </>
              )}
            </Button>
          )}
          <audio ref={audioRef} src={topic.audioUrl} preload="metadata" />
        </CardContent>

        <CardFooter className="pb-8">
          <Button variant="outline" className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-white h-12" asChild>
            <Link href="/">
              <ExternalLink className="mr-2 h-4 w-4" /> View Full Interactive Story
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}