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
  Rewind,
  Share2,
} from 'lucide-react';
import type { WeeklyEducationalTopic, StoryPage } from '@/types';
import { Icons } from '../shared/Icons';
import { useToast } from '@/hooks/use-toast';

interface StoryPlayerProps {
  topic: WeeklyEducationalTopic;
}

export function StoryPlayer({ topic }: StoryPlayerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const totalPages = topic.pages.length;

  const page: StoryPage = topic.pages[currentPage];

  const progress = ((currentPage + 1) / totalPages) * 100;

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    if (audioElement.src !== topic.audioUrl) {
      audioElement.src = topic.audioUrl;
    }

    const handleEnded = () => {
      setIsAutoPlaying(false);
    };

    audioElement.addEventListener('ended', handleEnded);

    if (isAutoPlaying) {
      audioElement.play().catch(error => {
        console.error("Audio play failed:", error);
        setIsAutoPlaying(false);
      });
    } else {
      audioElement.pause();
    }

    return () => {
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [isAutoPlaying, topic.audioUrl]);


  const handlePlayPause = () => {
    setIsAutoPlaying(prev => !prev);
  };
  
  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: topic.title,
      text: topic.description,
      url: `/share/story/${topic.id}`,
    };
    
    // Use absolute URL for sharing
    const absoluteUrl = new URL(shareData.url, window.location.origin).href;

    if (navigator.share && navigator.canShare({...shareData, url: absoluteUrl})) {
      try {
        await navigator.share({...shareData, url: absoluteUrl});
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(absoluteUrl);
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
    <Card className="w-full max-w-4xl mx-auto overflow-hidden shadow-2xl shadow-primary/10">
      <CardHeader>
        {/*
          This container is now a flex-col on mobile and flex-row on medium screens and up.
          This stacks the controls on top of the title on mobile.
        */}
        <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-start gap-4">
            {/* The title and page count div */}
            <div className="flex-grow">
                <CardTitle className="font-headline text-2xl md:text-3xl text-primary">
                    {topic.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Page {currentPage + 1} of {totalPages}
                </p>
            </div>
            {/* The button controls div - aligned to the start of the flex container */}
            <div className="flex items-center justify-start gap-2">
              <Button size="icon" variant="outline" onClick={handlePrevPage} disabled={currentPage === 0} className="shrink-0 hover:bg-primary/20 hover:text-primary">
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous Page</span>
              </Button>
              <Button size="icon" variant="outline" onClick={handleNextPage} disabled={currentPage === totalPages - 1} className="shrink-0 hover:bg-primary/20 hover:text-primary">
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next Page</span>
              </Button>
              <Button size="icon" variant="outline" onClick={handleRewind} className="shrink-0 hover:bg-primary/20 hover:text-primary">
                <Rewind className="h-5 w-5" />
                <span className="sr-only">Rewind Narration</span>
              </Button>
              <Button size="icon" variant="outline" onClick={handlePlayPause} className="shrink-0 hover:bg-primary/20 hover:text-primary">
                {isAutoPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
                <span className="sr-only">Play/Pause Narration</span>
              </Button>
              <Button size="icon" variant="outline" onClick={handleShare} className="shrink-0 hover:bg-primary/20 hover:text-primary">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share Story</span>
              </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
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
          <div className="flex-grow space-y-4 min-h-[200px] md:min-h-[280px]">
            <div className="flex items-start gap-4">
              <Icons.gorilla className="h-10 w-10 text-primary/80 shrink-0 mt-1" />
              <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line">
                {page.text}
              </p>
            </div>
          </div>
          <audio ref={audioRef} preload="metadata" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Progress value={progress} className="w-full h-2" />
      </CardFooter>
    </Card>
  );
}
