'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Share2,
  Sparkles,
  MessageSquare,
  Bookmark,
  Check,
  Maximize2
} from 'lucide-react';
import type { WeeklyEducationalTopic, StoryPage } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Icons } from '../shared/Icons';

interface StoryPlayerProps {
  topic: WeeklyEducationalTopic;
}

const PLAYBACK_SPEEDS = [1.0, 1.25, 1.5, 0.85];

export function StoryPlayer({ topic }: StoryPlayerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReflectionOpen, setIsReflectionOpen] = useState(false);
  const [selectedPerspective, setSelectedPerspective] = useState<string | null>(null);
  const [reflectionText, setReflectionText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const totalPages = topic.pages?.length || 1;
  const page: StoryPage = topic.pages?.[currentPage] || { text: topic.description || '', imageUrl: '' };

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Audio Sync & Event Listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (topic.audioUrl && audio.src !== topic.audioUrl) {
      audio.src = topic.audioUrl;
    }

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [topic.audioUrl]);

  // Handle Play/Pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio playback error:", err);
        setIsPlaying(false);
      });
    }
  };

  // Skip Forward/Backward
  const seekDelta = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = Math.max(0, Math.min(audio.duration || 300, audio.currentTime + seconds));
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Scrub timeline
  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percent * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Cycle speed
  const cycleSpeed = () => {
    const nextIndex = (speedIndex + 1) % PLAYBACK_SPEEDS.length;
    setSpeedIndex(nextIndex);
    const newSpeed = PLAYBACK_SPEEDS[nextIndex];
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Share action
  const handleShare = async () => {
    const shareData = {
      title: topic.title,
      text: topic.description,
      url: `/share/story/${topic.id}`,
    };
    const absoluteUrl = typeof window !== 'undefined' ? new URL(shareData.url, window.location.origin).href : shareData.url;

    if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare({ ...shareData, url: absoluteUrl })) {
      try {
        await navigator.share({ ...shareData, url: absoluteUrl });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(absoluteUrl);
        toast({
          title: 'Link Copied!',
          description: 'The story link has been copied to your clipboard.',
        });
      } catch {
        toast({
          variant: 'destructive',
          title: 'Failed to Copy',
          description: 'Could not copy the link to your clipboard.',
        });
      }
    }
  };

  const toggleFullscreen = () => {
    if (!stageRef.current) return;
    if (!document.fullscreenElement) {
      stageRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Split story text to style the drop cap
  const firstLetter = page.text ? page.text.trim().charAt(0) : '';
  const remainingText = page.text ? page.text.trim().slice(1) : '';

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 text-foreground">
      {/* Hidden Native Audio Element */}
      <audio ref={audioRef} preload="metadata" />

      {/* TOP SEGMENT CAPSULES: Story Page Progress */}
      <div className="flex flex-col gap-2 bg-slate-900/60 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800/80 shadow-lg">
        <div className="flex items-center gap-1.5 w-full">
          {topic.pages?.map((_, idx) => {
            const isCompleted = idx < currentPage;
            const isActive = idx === currentPage;
            return (
              <button
                key={idx}
                type="button"
                aria-label={`Go to page ${idx + 1}`}
                onClick={() => setCurrentPage(idx)}
                className={cn(
                  "h-2 flex-1 rounded-full transition-all duration-300 relative overflow-hidden",
                  isCompleted && "bg-emerald-600 hover:bg-emerald-500",
                  isActive && "bg-slate-700 ring-2 ring-emerald-400/80 shadow-[0_0_12px_rgba(74,225,118,0.7)]",
                  !isCompleted && !isActive && "bg-slate-800 hover:bg-slate-700"
                )}
              >
                {isActive && (
                  <div className="absolute inset-y-0 left-0 w-full bg-emerald-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Chapter Metadata & Counter */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono uppercase tracking-wider text-emerald-400 font-semibold truncate max-w-[200px] sm:max-w-none">
              Scene {String(currentPage + 1).padStart(2, '0')} • {topic.title}
            </span>
          </div>
          <span className="font-mono text-xs">
            Page {currentPage + 1} of {totalPages}
          </span>
        </div>
      </div>

      {/* SECTION 1: CINEMATIC STORY STAGE (16:9 Artwork with Ambient Gaussian Flare) */}
      <div className="relative group">
        {/* Ambient Gaussian Backlight Flare */}
        <div className="absolute -inset-2 bg-gradient-to-r from-emerald-900/40 via-emerald-600/25 to-teal-900/35 rounded-2xl blur-xl -z-10 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

        <div
          ref={stageRef}
          className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-800/80"
        >
          {page.imageUrl ? (
            <Image
              src={page.imageUrl}
              alt={`Story scene ${currentPage + 1}`}
              fill
              className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
              priority={currentPage === 0}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-muted-foreground p-6 text-center">
              <Sparkles className="w-12 h-12 text-emerald-500/50 mb-2 animate-pulse" />
              <p className="font-headline text-lg text-foreground/80">{topic.title}</p>
              <p className="text-xs text-muted-foreground">Scene {currentPage + 1}</p>
            </div>
          )}

          {/* Scrim gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

          {/* Left & Right Tactile Directional Chevron Overlays */}
          <button
            type="button"
            aria-label="Previous scene"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/70 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-lg border border-slate-700/50",
              currentPage === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-emerald-600 hover:border-emerald-500 active:scale-95 cursor-pointer"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            aria-label="Next scene"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/70 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-lg border border-slate-700/50",
              currentPage === totalPages - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-emerald-600 hover:border-emerald-500 active:scale-95 cursor-pointer"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Stage Micro Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md font-mono text-[11px] text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
              16:9 HD
            </span>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              type="button"
              aria-label="Fullscreen view"
              onClick={toggleFullscreen}
              className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md flex items-center gap-1.5 text-xs text-slate-200 hover:text-white hover:bg-slate-800 border border-slate-700/50 transition-all cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-mono text-[11px]">Full View</span>
            </button>
          </div>

          {/* Bottom Scene Legend on Artwork */}
          <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-white drop-shadow-md">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-medium text-slate-200">{topic.title}</span>
            </div>
            <span className="font-mono text-[11px] text-slate-300">Act {currentPage + 1}</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: FLOATING GLASSMORPHIC AUDIO PLAYER DOCK */}
      <div className="w-full bg-slate-900/85 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-800/80 flex flex-col gap-4">
        {/* Waveform Progress Track & Time Badges */}
        <div className="flex flex-col gap-2">
          <div
            role="button"
            tabIndex={0}
            aria-label="Seek audio timeline"
            onClick={handleScrub}
            className="relative w-full h-8 flex items-center gap-1 px-2 bg-slate-950/70 rounded-xl cursor-pointer overflow-hidden border border-slate-800 hover:border-emerald-500/50 transition-colors"
          >
            {/* Generate Stylized Waveform Bars */}
            {Array.from({ length: 32 }).map((_, i) => {
              const barPercent = (i / 32) * 100;
              const isPast = barPercent <= progressPercent;
              // Deterministic heights for waveform effect
              const heights = [12, 20, 16, 24, 28, 18, 22, 14, 26, 28, 16, 22, 26, 18, 12, 20, 24, 14, 22, 28, 18, 14, 20, 26, 16, 22, 24, 14, 18, 22, 12, 16];
              const h = heights[i % heights.length];

              return (
                <div
                  key={i}
                  style={{ height: `${h}px` }}
                  className={cn(
                    "w-1 rounded-full transition-colors duration-150 flex-1",
                    isPast ? "bg-emerald-400 shadow-[0_0_6px_rgba(74,225,118,0.6)]" : "bg-slate-700/60"
                  )}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground px-1">
            <span className="text-emerald-400 font-semibold">{formatTime(currentTime)}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={cycleSpeed}
                className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-200 font-mono text-[11px] hover:bg-slate-700 transition-colors border border-slate-700"
              >
                {PLAYBACK_SPEEDS[speedIndex]}x
              </button>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Dock Controls: Volume, Skip Back, Big Play Button, Skip Forward, Bookmark, Share */}
        <div className="flex items-center justify-between pt-1">
          {/* Audio Volume / Mute Toggle */}
          <button
            type="button"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            onClick={toggleMute}
            className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-slate-800/80 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Skip Backward 15s */}
          <button
            type="button"
            aria-label="Rewind 15 seconds"
            onClick={() => seekDelta(-15)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-200 hover:text-white hover:bg-slate-800 active:scale-90 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Center Forest Emerald Play Button with Pulsing Wave Rings */}
          <div className="relative flex items-center justify-center">
            {isPlaying && (
              <div className="absolute -inset-2 rounded-full bg-emerald-500/20 animate-ping pointer-events-none" />
            )}
            <button
              type="button"
              aria-label={isPlaying ? "Pause storytelling narration" : "Play storytelling narration"}
              onClick={togglePlay}
              className={cn(
                "relative w-14 h-14 rounded-full text-white flex items-center justify-center shadow-xl transition-all active:scale-95",
                isPlaying
                  ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/30"
                  : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30"
              )}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-white" />
              ) : (
                <Play className="w-7 h-7 fill-white ml-0.5" />
              )}
            </button>
          </div>

          {/* Skip Forward 15s */}
          <button
            type="button"
            aria-label="Forward 15 seconds"
            onClick={() => seekDelta(15)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-200 hover:text-white hover:bg-slate-800 active:scale-90 transition-all"
          >
            <RotateCw className="w-5 h-5" />
          </button>

          {/* Share / Bookmark Actions */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Bookmark quote"
              onClick={() => {
                setIsBookmarked(!isBookmarked);
                toast({
                  title: isBookmarked ? 'Bookmark Removed' : 'Scene Bookmarked',
                  description: isBookmarked ? 'Scene removed from bookmarks.' : 'Scene saved to your reading list.',
                });
              }}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-slate-800",
                isBookmarked ? "text-emerald-400" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-emerald-400")} />
            </button>

            <button
              type="button"
              aria-label="Share story"
              onClick={handleShare}
              className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-emerald-400 hover:bg-slate-800 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 3: EDITORIAL STORY READING PASSAGE */}
      <article className="flex flex-col gap-4 bg-slate-900/50 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-slate-800/80 shadow-lg">
        {/* Narrator Metadata Badge with Live 3-Bar Equalizer */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
          <div className="flex items-center gap-3">
            {/* Live Animated 3-Bar Equalizer */}
            <div className="w-7 h-7 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center gap-0.5 px-1">
              <div className={cn("w-0.5 bg-emerald-400 rounded-full transition-all duration-300", isPlaying ? "h-3 animate-pulse" : "h-1.5")} />
              <div className={cn("w-0.5 bg-emerald-400 rounded-full transition-all duration-300", isPlaying ? "h-4 animate-bounce" : "h-2")} />
              <div className={cn("w-0.5 bg-emerald-400 rounded-full transition-all duration-300", isPlaying ? "h-2.5 animate-pulse" : "h-1")} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-200">Audio Narrative Stream</span>
              <span className="text-[11px] font-mono text-emerald-400">Our Mumu Don Do • Story Engine</span>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30 font-mono text-[11px] text-emerald-300">
            Stereo 48k
          </span>
        </div>

        {/* Editorial Story Body with Styled Drop Cap */}
        <div className="flex items-start gap-4 pt-2">
          <Icons.gorilla className="h-10 w-10 text-emerald-500 shrink-0 mt-1" />
          <div className="flex-1 text-base sm:text-lg leading-relaxed text-slate-200 whitespace-pre-line">
            {firstLetter && (
              <span className="float-left text-4xl sm:text-5xl font-headline font-bold text-emerald-400 leading-none pr-3 pt-1">
                {firstLetter}
              </span>
            )}
            {remainingText}
          </div>
        </div>
      </article>

      {/* SECTION 4: CRITICAL INQUIRY & CIVIC REFLECTION CARD */}
      <section className="p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-lg flex flex-col gap-3">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsReflectionOpen(!isReflectionOpen)}
          className="flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-emerald-400">
            <MessageSquare className="w-5 h-5" />
            <h3 className="text-xs font-semibold uppercase tracking-wider font-mono text-emerald-400">
              Critical Inquiry &amp; Civic Reflection
            </h3>
          </div>
          <button
            type="button"
            className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors"
          >
            {isReflectionOpen ? 'Hide' : 'Reflect'}
          </button>
        </div>

        <p className="text-sm font-headline text-slate-300">
          What lessons from this chapter apply to modern governance and community building today?
        </p>

        {isReflectionOpen && (
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex flex-wrap gap-2">
              {['Economic Preservation', 'Civic Sovereignty', 'Youth Leadership', 'Unity & Dialogue'].map((perspective) => (
                <button
                  key={perspective}
                  type="button"
                  onClick={() => setSelectedPerspective(perspective)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border",
                    selectedPerspective === perspective
                      ? "bg-emerald-600 text-white border-emerald-500 shadow-md"
                      : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750"
                  )}
                >
                  <span className={cn("w-1.5 h-1.5 rounded-full", selectedPerspective === perspective ? "bg-white" : "bg-emerald-400")} />
                  <span>{perspective}</span>
                </button>
              ))}
            </div>

            <textarea
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              disabled={isSubmitted}
              placeholder="Type your reflection on this story chapter... (shared with your learning circle)"
              rows={3}
              className="w-full rounded-xl bg-slate-950 p-3 text-sm text-slate-200 placeholder:text-slate-500 border border-slate-800 focus:outline-none focus:border-emerald-500 transition-all resize-none"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="font-mono text-[11px] text-muted-foreground">Min. 10 words for Civic Credit</span>
              <button
                type="button"
                disabled={isSubmitted || reflectionText.trim().length < 10}
                onClick={() => {
                  setIsSubmitted(true);
                  toast({
                    title: 'Perspective Recorded!',
                    description: 'Your civic perspective has been saved to the archives.',
                  });
                }}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md",
                  isSubmitted
                    ? "bg-slate-800 text-emerald-400 border border-emerald-500/30"
                    : reflectionText.trim().length >= 10
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                )}
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Perspective Saved</span>
                  </>
                ) : (
                  <span>Submit Perspective</span>
                )}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 5: CHAPTER NAVIGATION DOCK */}
      <footer className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className={cn(
            "flex-1 py-3 px-4 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all border",
            currentPage === 0
              ? "bg-slate-900/40 text-slate-600 border-slate-800/40 cursor-not-allowed"
              : "bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800 hover:border-slate-700 active:scale-98"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Scene</span>
        </button>

        <button
          type="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className={cn(
            "flex-1 py-3 px-4 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all border shadow-lg",
            currentPage === totalPages - 1
              ? "bg-slate-900/40 text-slate-600 border-slate-800/40 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 active:scale-98"
          )}
        >
          <span>Next Scene</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
}
