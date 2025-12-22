'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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
} from 'lucide-react';
import type { WeeklyEducationalTopic } from '@/types';
import { Icons } from '../shared/Icons';

interface StoryPlayerProps {
  topic: WeeklyEducationalTopic;
}

export function StoryPlayer({ topic }: StoryPlayerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const page = topic.pages[currentPage];
  const progress = ((currentPage + 1) / topic.pages.length) * 100;

  const handleNextPage = useCallback(() => {
    setIsAutoPlaying(false);
    if (currentPage < topic.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, topic.pages.length]);

  const handlePrevPage = () => {
    setIsAutoPlaying(false);
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    // Handler for when audio finishes playing
    const handleEnded = () => {
      if (isAutoPlaying) {
        if (currentPage < topic.pages.length - 1) {
          // Go to the next page if autoplaying
          setCurrentPage(prev => prev + 1);
        } else {
          // Reached the end, stop autoplay
          setIsAutoPlaying(false);
        }
      }
    };
    
    audioElement.addEventListener('ended', handleEnded);

    // When the page or autoplay status changes, manage audio
    if (isAutoPlaying) {
      // Set the source and play
      audioElement.src = page.audioUrl;
      audioElement.play().catch(error => {
        console.error("Audio play failed:", error);
        setIsAutoPlaying(false); // Stop autoplay on error
      });
    } else {
      // If not autoplaying, pause the audio
      audioElement.pause();
    }

    // Cleanup listener on component unmount or dependency change
    return () => {
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [currentPage, isAutoPlaying, page.audioUrl, topic.pages.length]);
  

  const handlePlayPause = () => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    // Toggle autoplay state
    setIsAutoPlaying(prev => !prev);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden shadow-2xl shadow-primary/10">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
            <div className="flex-grow">
                <CardTitle className="font-headline text-2xl md:text-3xl text-primary">
                    {topic.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Page {currentPage + 1} of {topic.pages.length}
                </p>
            </div>
            <Button size="icon" variant="outline" onClick={handlePlayPause} className="shrink-0 hover:bg-primary/20 hover:text-primary">
              {isAutoPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
              <span className="sr-only">Play/Pause Narration</span>
            </Button>
        </div>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-8 items-start">
        <div className="relative aspect-square w-full rounded-lg overflow-hidden border">
          <Image
            src={page.imageUrl}
            alt={`Story page ${currentPage + 1}`}
            fill
            className="object-contain"
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
          <audio ref={audioRef} preload="metadata" />
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
