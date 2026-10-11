'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  Check,
  Maximize2,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Mic,
  HelpCircle,
  CheckCircle,
  Handshake,
  Shield,
  Users,
  User,
} from 'lucide-react';
import type { WeeklyEducationalTopic, StoryPage } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Icons } from '../shared/Icons';

interface StoryPlayerProps {
  topic: WeeklyEducationalTopic;
  standalone?: boolean;
}

const PLAYBACK_SPEEDS = [0.85, 1.0, 1.25, 1.5];

export function StoryPlayer({ topic, standalone = false }: StoryPlayerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(1); // default 1.0x
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedPerspective, setSelectedPerspective] = useState<string | null>('peace');
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
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio playback simulated or blocked:', err);
          setIsPlaying(true);
        });
    }
  };

  // Scrub timeline
  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const targetDuration = duration > 0 ? duration : 340;
    const newTime = pct * targetDuration;

    if (audio && duration > 0) {
      audio.currentTime = newTime;
    }
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
    }
    setIsMuted(!isMuted);
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

  const activeDuration = duration > 0 ? duration : 340;
  const progressPercent = Math.min(100, Math.max(0, (currentTime / activeDuration) * 100));

  // Split story text to style the drop cap
  const firstLetter = page.text ? page.text.trim().charAt(0) : '';
  const remainingText = page.text ? page.text.trim().slice(1) : '';

  // Fallback hero artwork from Google Stitch suggestion
  const defaultStageArtwork =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC8HvA0q-Uwv4OrRwC8jFCyaQb3YLol_SV82spISy9X1jG9rVE1c30Z3MHbf0p_UJEeyEfhx5cf44ygd5ejhRjznA43C-57e8XpLYYorzwAArWgX5VoUmF7vWuNqOB7kK4X_gKxhq1EGpaMDPfZyADRsG9Y8GHPy5NnOUWKv7V71NWH2kTEGgdWhJU0R3atiBZ25PwAWhlulxtFuOjg0C7w6fKFEE35rq3-H7OjC7X4qtGUs8G0TXQk';

  return (
    <div className="w-full flex flex-col bg-surface text-on-surface">
      {/* Hidden Native Audio Element */}
      <audio ref={audioRef} preload="metadata" />

      {/* STITCH APP SHELL HEADER (Rendered in standalone story reader mode) */}
      {standalone && (
        <header className="sticky top-0 inset-x-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl pt-safe shadow-[0_4px_20px_rgba(0,0,0,0.35)] border-b border-surface-container mb-4">
          <div className="max-w-4xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <Link
                href="/"
                aria-label="Go Back"
                className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="h-8 w-8 rounded-full bg-primary-container border border-stitch-secondary/40 flex items-center justify-center flex-shrink-0">
                <Icons.gorilla className="h-5 w-5 text-stitch-secondary" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-code text-[11px] text-stitch-primary uppercase tracking-wider truncate">
                  Our Mumu Don Do
                </span>
                <h1 className="font-headline-sm text-sm sm:text-base text-on-surface truncate leading-tight font-medium">
                  {topic.title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                type="button"
                aria-label="Bookmark"
                onClick={() => {
                  setIsBookmarked(!isBookmarked);
                  toast({
                    title: isBookmarked ? 'Bookmark Removed' : 'Story Bookmarked',
                    description: isBookmarked ? 'Removed from reading list.' : 'Saved to your civic reading list.',
                  });
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              >
                <Bookmark className={cn('w-5 h-5', isBookmarked && 'fill-stitch-secondary text-stitch-secondary')} />
              </button>
              <button
                type="button"
                aria-label="Share"
                onClick={handleShare}
                className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full bg-stitch-primary flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-on-primary" />
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Container */}
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-5 px-3 sm:px-6">
        {/* TOP PROGRESS COMPONENT: Story Segment Capsules */}
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex items-center gap-1.5 w-full">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const isCompleted = idx < currentPage;
              const isActive = idx === currentPage;
              return (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to Segment ${idx + 1}`}
                  onClick={() => setCurrentPage(idx)}
                  className={cn(
                    'h-1.5 flex-1 rounded-full transition-all duration-300 relative overflow-hidden',
                    isCompleted && 'bg-primary-container hover:opacity-90',
                    isActive && 'bg-surface-bright relative group',
                    !isCompleted && !isActive && 'bg-surface-bright/50 hover:bg-surface-bright transition-colors'
                  )}
                >
                  {isActive && (
                    <div
                      className="absolute inset-y-0 left-0 bg-stitch-secondary shadow-[0_0_8px_rgba(74,225,118,0.8)] rounded-full transition-all duration-300"
                      style={{
                        width: duration > 0 ? `${Math.max(25, progressPercent)}%` : '50%',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Chapter Metadata & Monospace Counter */}
          <div className="flex items-center justify-between text-on-surface-variant pt-0.5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-stitch-secondary animate-pulse flex-shrink-0" />
              <span className="font-label-ui text-xs uppercase tracking-wider text-stitch-secondary font-semibold truncate">
                Scene {currentPage + 1} • {topic.title}
              </span>
            </div>
            <span className="font-label-code text-xs text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full flex-shrink-0">
              Page {currentPage + 1} of {totalPages}
            </span>
          </div>
        </div>

        {/* SECTION 1: CINEMATIC STORY STAGE (16:9 Artwork with Ambient Glow) */}
        <div className="relative my-1 group">
          {/* Ambient Gaussian Backlight Flare */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-container/40 via-secondary-container/25 to-tertiary-container/30 rounded-2xl blur-xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />

          <div
            ref={stageRef}
            className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-surface-container-low group border border-outline-variant/30"
          >
            {/* 16:9 Narrative Stage Artwork */}
            {page.imageUrl ? (
              <Image
                src={page.imageUrl}
                alt={`Story scene ${currentPage + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                priority={currentPage === 0}
              />
            ) : (
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url('${defaultStageArtwork}')`,
                }}
              />
            )}

            {/* Soft Scrim Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/95 via-surface-dim/40 to-transparent pointer-events-none" />

            {/* Directional Chevron Overlays */}
            <button
              type="button"
              aria-label="Previous scene"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className={cn(
                'absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-dim/75 backdrop-blur-md flex items-center justify-center text-on-surface transition-all shadow-lg border border-white/10 z-20',
                currentPage === 0
                  ? 'opacity-20 cursor-not-allowed'
                  : 'hover:bg-stitch-secondary hover:text-on-secondary active:scale-95 cursor-pointer'
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
                'absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-dim/75 backdrop-blur-md flex items-center justify-center text-on-surface transition-all shadow-lg border border-white/10 z-20',
                currentPage === totalPages - 1
                  ? 'opacity-20 cursor-not-allowed'
                  : 'hover:bg-stitch-secondary hover:text-on-secondary active:scale-95 cursor-pointer'
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Prominent Central Play/Pause Button for Kids with Glow */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10 pointer-events-none">
              <div className="relative flex items-center justify-center pointer-events-auto">
                {isPlaying && (
                  <div className="absolute -inset-3 rounded-full bg-stitch-secondary/30 animate-ping pointer-events-none" />
                )}
                <button
                  type="button"
                  aria-label={isPlaying ? 'Pause storytelling narration' : 'Play story video narration'}
                  onClick={togglePlay}
                  className="relative w-16 h-16 rounded-full bg-stitch-secondary text-on-secondary flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 fill-on-secondary text-on-secondary" />
                  ) : (
                    <Play className="w-8 h-8 fill-on-secondary text-on-secondary ml-1" />
                  )}
                </button>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-dim/80 backdrop-blur-md text-[13px] font-label-ui text-on-surface shadow-sm">
                {isPlaying ? 'Narration Active' : 'Tap to Play Story Audio'}
              </span>
            </div>

            {/* Location Pill & Fullscreen Toggle Top Overlay */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-dim/75 backdrop-blur-md text-on-surface text-[13px] font-medium border border-white/5">
                <MapPin className="w-4 h-4 text-stitch-secondary" />
                <span>{topic.guidelineCategory?.[0] || 'Palace of Zazzau'}</span>
              </div>
              <button
                type="button"
                aria-label="Fullscreen"
                onClick={toggleFullscreen}
                className="w-8 h-8 rounded-full bg-surface-dim/75 backdrop-blur-md flex items-center justify-center text-on-surface hover:bg-surface-bright transition-all border border-white/5"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Integrated Video Progress Bar & Audio Time at Bottom */}
            <div className="absolute bottom-2.5 inset-x-3 flex flex-col gap-1.5 p-2 rounded-xl bg-surface-dim/85 backdrop-blur-md border border-white/10 z-10">
              <div
                role="button"
                tabIndex={0}
                aria-label="Scrub timeline"
                onClick={handleScrub}
                className="relative w-full h-2 bg-surface-bright rounded-full overflow-hidden cursor-pointer"
              >
                <div
                  className="h-full bg-stitch-secondary rounded-full shadow-[0_0_8px_rgba(74,225,118,0.8)] transition-all duration-150"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-on-surface font-label-code text-[12px]">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    onClick={toggleMute}
                    className="hover:text-stitch-secondary transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-3.5 h-3.5 text-error" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 text-stitch-secondary" />
                    )}
                  </button>
                  <span className="text-stitch-secondary font-medium">
                    {formatTime(currentTime)}
                  </span>
                </div>
                <span>{formatTime(activeDuration)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: EDITORIAL STORY READING PASSAGE */}
        <article className="mt-2 flex flex-col gap-4">
          {/* Friendly Voice Reader Badge */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container border border-outline-variant/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-stitch-secondary flex-shrink-0">
                <Mic className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-label-ui text-xs text-on-surface font-semibold">
                  Listening Mode: {isPlaying ? 'On' : 'Ready'}
                </span>
                <span className="font-body-sm text-xs text-on-surface-variant">
                  Uncle Aminu is reading this story
                </span>
              </div>
            </div>
            <button
              type="button"
              className="px-3 py-1 rounded-full bg-surface-bright text-on-surface text-[13px] font-label-ui hover:bg-surface-variant transition-colors"
              onClick={cycleSpeed}
            >
              <span>{PLAYBACK_SPEEDS[speedIndex]}x Speed</span>
            </button>
          </div>

          {/* Easy-to-read Story Text with Drop Cap */}
          <div className="flex flex-col gap-4 text-on-surface leading-loose">
            <div className="font-body-lg text-base sm:text-lg text-on-surface whitespace-pre-line leading-relaxed">
              {firstLetter && (
                <span className="float-left text-headline-lg text-4xl sm:text-5xl font-semibold text-stitch-secondary leading-none pr-3 pt-1">
                  {firstLetter}
                </span>
              )}
              {remainingText}
            </div>

            {/* Simplified Quote Card */}
            <div className="p-4 rounded-xl bg-surface-container my-1 border-l-4 border-stitch-secondary">
              <p className="font-headline-sm text-base sm:text-lg italic text-on-surface leading-snug">
                “Walls protect those who are scared. Safe trade routes build a strong kingdom. We must trade peacefully with our neighbors!”
              </p>
              <span className="font-label-code text-xs text-stitch-secondary block mt-1.5">
                — Queen Amina of Zazzau • Leadership Wisdom
              </span>
            </div>
          </div>
        </article>

        {/* SECTION 4: CRITICAL INQUIRY & CIVIC REFLECTION CARD */}
        <section className="mt-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-container shadow-lg flex flex-col gap-3 border border-outline-variant/30">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-stitch-secondary" />
              <h2 className="font-label-ui text-xs text-on-surface uppercase tracking-wider font-semibold">
                Quick Question for You
              </h2>
            </div>
            <p className="font-headline-sm text-lg sm:text-xl text-on-surface leading-snug">
              What would you have done if you were Queen Amina?
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={() => setSelectedPerspective('peace')}
                className={cn(
                  'w-full py-2.5 px-3 rounded-xl font-label-ui text-sm flex items-center justify-between text-left transition-all',
                  selectedPerspective === 'peace'
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'bg-surface-bright text-on-surface-variant hover:bg-surface-variant'
                )}
              >
                <span className="flex items-center gap-2.5">
                  <Handshake className="w-4 h-4 text-stitch-secondary" />
                  <span>Choose peace and open trade</span>
                </span>
                {selectedPerspective === 'peace' ? (
                  <CheckCircle className="w-4 h-4 text-stitch-secondary" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-outline-variant" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedPerspective('walls')}
                className={cn(
                  'w-full py-2.5 px-3 rounded-xl font-label-ui text-sm flex items-center justify-between text-left transition-all',
                  selectedPerspective === 'walls'
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'bg-surface-bright text-on-surface-variant hover:bg-surface-variant'
                )}
              >
                <span className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-stitch-secondary" />
                  <span>Stay safe behind the palace walls</span>
                </span>
                {selectedPerspective === 'walls' ? (
                  <CheckCircle className="w-4 h-4 text-stitch-secondary" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-outline-variant" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedPerspective('youth')}
                className={cn(
                  'w-full py-2.5 px-3 rounded-xl font-label-ui text-sm flex items-center justify-between text-left transition-all',
                  selectedPerspective === 'youth'
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'bg-surface-bright text-on-surface-variant hover:bg-surface-variant'
                )}
              >
                <span className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-stitch-secondary" />
                  <span>Mobilize the youth council for homegrown solutions</span>
                </span>
                {selectedPerspective === 'youth' ? (
                  <CheckCircle className="w-4 h-4 text-stitch-secondary" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-outline-variant" />
                )}
              </button>
            </div>

            {/* Optional write-in reflection */}
            <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/30">
              <textarea
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                disabled={isSubmitted}
                placeholder="Share your reflection on this story chapter... (shared with your learning circle)"
                rows={2}
                className="w-full rounded-xl bg-surface-container-lowest p-3 text-sm text-on-surface placeholder:text-on-surface-variant/60 border border-outline-variant/40 focus:outline-none focus:border-stitch-secondary transition-all resize-none"
              />
              <div className="flex items-center justify-between">
                <span className="font-label-code text-[11px] text-on-surface-variant">
                  +5 Civic Points awarded upon saving
                </span>
                <button
                  type="button"
                  disabled={isSubmitted || (!selectedPerspective && !reflectionText.trim())}
                  onClick={() => {
                    setIsSubmitted(true);
                    toast({
                      title: 'Perspective Recorded!',
                      description: 'Recorded in the National Cohesion Archives. +5 Civic Points awarded.',
                    });
                  }}
                  className={cn(
                    'px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm',
                    isSubmitted
                      ? 'bg-primary-container text-stitch-secondary'
                      : selectedPerspective || reflectionText.trim()
                      ? 'bg-stitch-secondary text-on-secondary hover:bg-secondary-container active:scale-95'
                      : 'bg-surface-bright text-on-surface-variant/40 cursor-not-allowed'
                  )}
                >
                  {isSubmitted ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Perspective Recorded</span>
                    </>
                  ) : (
                    <span>Submit Perspective</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: HISTORICAL TIMELINE / RELATED ARCHIVAL RECORDS */}
        <section className="mt-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-label-ui text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              Related Archival Records
            </h3>
            <span className="font-label-code text-xs text-stitch-secondary">
              3 Documents
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* Record Card 1 */}
            <div className="p-3 rounded-xl bg-surface-container flex flex-col gap-2 shadow-sm border border-outline-variant/20 hover:border-stitch-secondary/40 transition-colors group cursor-pointer">
              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-low relative">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD5rnEEqCxfgb6g_aSnBNI8iJi19q3lTeVNjhQeO1Wh0t29Bnoi1P_-MTits-hOQr3qBPGqadoTgEGjQSsJBkMtN_0MH751yBXnvqFplfn8Ydi-8kCK68JIT-W1lx3PeTcBubmH2jtvgthQbTkAEUWFA8gzCM7KGw7kxMxZ_cH9ayYYj311ghT75dAWqMuHmAKKS53PIHmL6DZQ7u8B-3qQqo5Ie57ssqYKKOWinNF2kT2lekdjkLdd')`,
                  }}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-code text-[11px] text-stitch-secondary font-medium">
                  MAP • 1576
                </span>
                <h4 className="font-label-ui text-sm text-on-surface truncate font-semibold">
                  Walls of Zazzau (Ganuwa)
                </h4>
              </div>
            </div>

            {/* Record Card 2 */}
            <div className="p-3 rounded-xl bg-surface-container flex flex-col gap-2 shadow-sm border border-outline-variant/20 hover:border-stitch-secondary/40 transition-colors group cursor-pointer">
              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-low relative">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAcKoVgQ2wCPIjFjxEoRroXaMzSdzTvC04yAIsaJR8xcvp8XW6RtaLdmk8RETAea1tVbgqXmH5psrjibwbJP6ImNAaRuOGRzPuIMBosAoeTQ0fkLGk_MJBo5Amj2qk2p6Yzd5TYEHkcUTqbLps8p2UlQvQA05DbwhO0FbWVAvpOXxkz_Tm8cPCXqHIj-j-FmxdnwFlqYmhBikvhvAvDaEaqjvnjqVt1gWazV5ek2yTdykTJrn3ioJt')`,
                  }}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-code text-[11px] text-stitch-secondary font-medium">
                  ARMAMENT • 1580
                </span>
                <h4 className="font-label-ui text-sm text-on-surface truncate font-semibold">
                  Cavalry Cuirass & Lance
                </h4>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: CHAPTER NAVIGATION DOCK */}
        <footer className="mt-4 flex items-center justify-between gap-3 pb-8">
          <button
            type="button"
            aria-label="Go to previous page"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={cn(
              'w-12 h-12 rounded-xl bg-surface-container text-on-surface flex items-center justify-center flex-shrink-0 transition-colors border border-outline-variant/30',
              currentPage === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-surface-bright active:scale-95 cursor-pointer'
            )}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNextPage}
            className="flex-1 h-12 rounded-xl bg-stitch-secondary hover:bg-secondary-container text-on-secondary font-label-ui text-base font-semibold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
          >
            <span>{currentPage < totalPages - 1 ? 'Continue Story' : 'Story Completed'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </footer>
      </div>
    </div>
  );
}
