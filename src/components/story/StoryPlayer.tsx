'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';
import type { WeeklyEducationalTopic } from '@/types';
import { Icons } from '../shared/Icons';

interface StoryPlayerProps {
  topic: WeeklyEducationalTopic;
}

export function StoryPlayer({ topic }: StoryPlayerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const page = topic.pages[currentPage];
  const progress = ((currentPage + 1) / topic.pages.length) * 100;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = page.audioUrl;
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentPage, page.audioUrl, isPlaying]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      // Optional: go to next page on audio end
      // if (currentPage < topic.pages.length - 1) {
      //   setCurrentPage(currentPage + 1);
      // }
    };

    audioElement.addEventListener('play', handlePlay);
    audioElement.addEventListener('pause', handlePause);
    audioElement.addEventListener('ended', handleEnded);

    return () => {
      audioElement.removeEventListener('play', handlePlay);
      audioElement.removeEventListener('pause', handlePause);
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (!isPlaying) {
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage < topic.pages.length - 1) {
      setCurrentPage(currentPage + 1);
      setIsPlaying(false); // Stop audio when changing page
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsPlaying(false); // Stop audio when changing page
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden shadow-2xl shadow-primary/10">
      <CardHeader>
        <CardTitle className="font-headline text-2xl md:text-3xl text-primary">
          {topic.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Page {currentPage + 1} of {topic.pages.length}
        </p>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-8 items-start">
        <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
          <Image
            src={page.imageUrl}
            alt={`Story page ${currentPage + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={currentPage === 0}
          />
        </div>
        <div className="flex flex-col h-full">
          <div className="flex-grow space-y-4">
            <div className="flex items-start gap-4">
              <Icons.gorilla className="h-10 w-10 text-primary/80 shrink-0 mt-1" />
              <p className="text-lg leading-relaxed text-foreground/90">
                {page.text}
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-4 p-4 rounded-lg bg-secondary">
            <audio ref={audioRef} src={page.audioUrl} preload="metadata" />
            <Button size="icon" variant="ghost" onClick={handlePlayPause}>
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
            <Button size="icon" variant="ghost" onClick={handleRestart}>
              <RotateCcw className="h-5 w-5" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Audio Narration
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Progress value={progress} className="w-full h-2" />
        <div className="flex justify-between w-full">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            variant="outline"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === topic.pages.length - 1}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
