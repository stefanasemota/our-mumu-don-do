'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  BookOpen,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export interface StorybookBookData {
  title: string;
  author: string;
  pdfUrl: string;
  downloadName: string;
  audioUrl?: string;
  audioTitle?: string;
  autoPlay?: boolean;
  inspirationUrl?: string;
  inspirationTitle?: string;
  pages: string[];
}

interface StorybookModalProps {
  book: StorybookBookData;
  onClose: () => void;
}

export function StorybookModal({ book, onClose }: StorybookModalProps) {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);

  // Dedicated Audio Narration State
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  const totalSpreads = book.pages.length;

  const triggerShowControls = useCallback(() => {
    setShowControls(true);
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
    }
    if (isPlaying) {
      controlsTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  }, [isPlaying]);

  const handleStageMouseLeave = useCallback(() => {
    if (isPlaying) {
      setShowControls(false);
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
      controlsTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    } else {
      setShowControls(true);
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    }
    return () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, [isPlaying]);

  // Handle Autoplay & Cleanup
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && book.audioUrl) {
      audio.src = book.audioUrl;
      audio.load();
      if (book.autoPlay) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [book.audioUrl, book.autoPlay]);

  // Keyboard navigation (Arrow keys, Esc, Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentSpread((prev) => Math.min(totalSpreads - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSpread((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          }
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSpreads, isFullscreen, onClose]);

  const handleNext = useCallback(() => {
    setCurrentSpread((prev) => Math.min(totalSpreads - 1, prev + 1));
  }, [totalSpreads]);

  const handlePrev = useCallback(() => {
    setCurrentSpread((prev) => Math.max(0, prev - 1));
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          toast({
            title: 'Audio Narration',
            description: 'Could not play the narration track.',
          });
        });
    }
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = progress * duration;
    setCurrentTime(audio.currentTime);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getSpreadLabel = (idx: number) => {
    if (idx === 0) return 'Book Cover';
    if (idx === totalSpreads - 1) return `Final Spread • Page ${idx * 2}`;
    return `Story Spread • Pages ${idx * 2 - 1}–${idx * 2}`;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 md:p-8 select-none animate-in fade-in duration-200',
        isFullscreen && 'p-0 rounded-none'
      )}
    >
      {/* Hidden Audio Element */}
      {book.audioUrl && (
        <audio
          ref={audioRef}
          src={book.audioUrl}
          preload="metadata"
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
              if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
                setDuration(audioRef.current.duration);
              }
            }
          }}
          onLoadedMetadata={() => {
            if (audioRef.current?.duration && !isNaN(audioRef.current.duration)) {
              setDuration(audioRef.current.duration);
            }
          }}
          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}

      <div
        className={cn(
          'relative w-full max-w-5xl h-[82vh] max-h-[820px] bg-surface-container rounded-2xl sm:rounded-3xl border border-outline-variant/40 shadow-2xl flex flex-col overflow-hidden transition-all',
          isFullscreen && 'max-w-none h-full max-h-none rounded-none border-none'
        )}
      >
        {/* HEADER BAR */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-outline-variant/30 bg-surface-dim/95 backdrop-blur-sm z-20">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-stitch-secondary/15 flex items-center justify-center flex-shrink-0 text-stitch-secondary border border-stitch-secondary/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-headline text-base sm:text-lg font-semibold text-on-surface truncate">
                  {book.title}
                </h3>
                <span className="hidden md:inline-block font-label-code text-[11px] px-2 py-0.5 rounded-full bg-stitch-secondary/20 text-stitch-secondary font-medium">
                  Illustrated Spread Edition
                </span>
              </div>
              <div className="font-label-code text-xs text-on-surface-variant flex items-center gap-1 truncate">
                {book.inspirationUrl && book.author.includes('• Inspired by') ? (
                  <>
                    <span>{book.author.split('• Inspired by')[0]}• Inspired by</span>
                    <a
                      href={book.inspirationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-300 hover:text-amber-200 underline underline-offset-2 inline-flex items-center gap-1 font-semibold transition-colors"
                      title={book.inspirationTitle || "Watch storytelling video"}
                    >
                      <span>{book.author.split('• Inspired by')[1].trim()} (Video)</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </>
                ) : (
                  <span>{book.author}</span>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Download PDF */}
            <a
              href={book.pdfUrl}
              download={book.downloadName}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-stitch-secondary text-on-secondary hover:bg-secondary-container transition-colors text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              title="Download original offline PDF"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Download</span>
            </a>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="w-9 h-9 rounded-full bg-surface-bright hover:bg-surface-variant text-on-surface flex items-center justify-center transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              aria-label="Close Book"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-surface-bright hover:bg-surface-variant text-on-surface flex items-center justify-center transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* MAIN VIEWER STAGE */}
        <div
          onMouseEnter={triggerShowControls}
          onMouseMove={triggerShowControls}
          onMouseLeave={handleStageMouseLeave}
          onTouchStart={triggerShowControls}
          className="flex-1 relative w-full h-full min-h-0 overflow-hidden bg-[#070b14] flex items-center justify-center p-2 sm:p-4"
        >
          {/* TOP AUDIO TOOLBAR (Harmonized with StoryPlayer) */}
          {book.audioUrl && (
            <div
              className={cn(
                'absolute top-3 sm:top-4 inset-x-3 sm:inset-x-6 flex flex-col gap-1.5 p-2 sm:px-4 sm:py-2.5 rounded-2xl bg-surface-dim/95 backdrop-blur-md border border-white/10 z-30 transition-all duration-300 shadow-xl',
                !isPlaying || showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3 text-xs">
                {/* Audio Narration Title & Timestamps */}
                <div className="flex flex-col min-w-0 pr-1">
                  <span className="font-label-ui font-semibold text-on-surface truncate text-xs sm:text-sm">
                    {book.audioTitle || `${book.title} • Audio Narration`}
                  </span>
                  <span className="font-label-code text-[11px] sm:text-xs text-stitch-secondary">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Scrubber (desktop & tablet) */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Seek narration"
                  onClick={handleScrub}
                  className="flex-1 max-w-xs sm:max-w-md h-2 bg-surface-bright rounded-full overflow-hidden cursor-pointer hidden sm:block"
                >
                  <div
                    className="h-full bg-stitch-secondary rounded-full shadow-[0_0_8px_rgba(74,225,118,0.8)] transition-all duration-150"
                    style={{
                      width: `${duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0}%`,
                    }}
                  />
                </div>

                {/* Mute & Fullscreen Toggles */}
                <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                  <button
                    type="button"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    onClick={toggleMute}
                    className="p-1.5 rounded-lg text-on-surface-variant hover:text-stitch-secondary transition-colors"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-error" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-stitch-secondary" />
                    )}
                  </button>

                  <button
                    type="button"
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                    onClick={toggleFullscreen}
                    className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors"
                    title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Scrubber for mobile screens */}
              <div
                role="button"
                tabIndex={0}
                aria-label="Seek narration"
                onClick={handleScrub}
                className="w-full h-1.5 bg-surface-bright rounded-full overflow-hidden cursor-pointer sm:hidden"
              >
                <div
                  className="h-full bg-stitch-secondary rounded-full shadow-[0_0_8px_rgba(74,225,118,0.8)] transition-all duration-150"
                  style={{
                    width: `${duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0}%`,
                  }}
                />
              </div>
            </div>
          )}

          <div className="relative w-full h-full min-h-0 flex items-center justify-center">
            {/* Storybook Spread Frame */}
            <div
              className="relative max-w-full max-h-full flex items-center justify-center transition-transform duration-200 ease-out shadow-2xl rounded-xl overflow-hidden bg-black/60 border border-white/10"
              style={{
                transform: `scale(${zoom})`,
              }}
            >
              {/* Book Spread Image with intrinsic aspect ratio */}
              <img
                src={book.pages[currentSpread]}
                alt={`${book.title} Spread ${currentSpread + 1}`}
                className="max-h-[calc(78vh-130px)] max-w-[calc(100vw-64px)] sm:max-w-full w-auto h-auto object-contain rounded-xl select-none shadow-2xl block"
                loading="eager"
              />

              {/* Subtle Book Spine Shadow Down Center of Spread (only for open spreads) */}
              {currentSpread > 0 && (
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 pointer-events-none bg-gradient-to-r from-transparent via-black/25 to-transparent mix-blend-multiply opacity-60" />
              )}

              {/* Corner Storybook Page Curl Effect */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none bg-gradient-to-bl from-white/10 to-transparent" />

              {/* Center Floating Play / Pause Spine Button (Harmonized with Story Player) */}
              {book.audioUrl && (
                <div
                  className={cn(
                    'absolute inset-0 flex flex-col items-center justify-center gap-3 z-20 pointer-events-auto transition-all duration-300',
                    !isPlaying || showControls ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  )}
                >
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-stitch-secondary/40 rounded-full blur-xl group-hover:bg-stitch-secondary/60 transition-all animate-pulse" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAudio();
                      }}
                      aria-label={isPlaying ? 'Pause Audio' : 'Play Audio'}
                      className="relative w-16 h-16 sm:w-20 sm:h-20 p-4 sm:p-5 rounded-full bg-stitch-secondary text-on-secondary flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer ring-4 ring-stitch-secondary/30"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 sm:w-10 sm:h-10 fill-on-secondary text-on-secondary" />
                      ) : (
                        <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-on-secondary text-on-secondary ml-1" />
                      )}
                    </button>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-surface-dim/90 backdrop-blur-md text-xs sm:text-sm font-label-ui text-on-surface shadow-lg border border-white/10 select-none">
                    {isPlaying ? 'Narration Active (Tap to Pause)' : 'Tap to Play Story Narration'}
                  </span>
                </div>
              )}
            </div>

            {/* Prev Button Overlay */}
            <button
              type="button"
              aria-label="Previous Page"
              onClick={handlePrev}
              disabled={currentSpread === 0}
              className={cn(
                'absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-surface-dim/90 hover:bg-surface-container text-on-surface border border-outline-variant/40 backdrop-blur-md flex items-center justify-center shadow-2xl transition-all duration-200 z-30',
                currentSpread === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-85 hover:opacity-100 hover:scale-105 active:scale-95'
              )}
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Next Button Overlay */}
            <button
              type="button"
              aria-label="Next Page"
              onClick={handleNext}
              disabled={currentSpread === totalSpreads - 1}
              className={cn(
                'absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-surface-dim/90 hover:bg-surface-container text-on-surface border border-outline-variant/40 backdrop-blur-md flex items-center justify-center shadow-2xl transition-all duration-200 z-30',
                currentSpread === totalSpreads - 1
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-85 hover:opacity-100 hover:scale-105 active:scale-95'
              )}
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>
        </div>

        {/* BOTTOM STORYBOOK NAVIGATION TRAY */}
        <footer className="px-4 sm:px-6 py-2.5 bg-surface-dim/95 border-t border-outline-variant/30 flex items-center justify-between gap-3 z-20">
            {/* Spread Indicator */}
            <div className="flex items-center gap-2">
              <span className="font-label-code text-xs text-stitch-secondary font-semibold bg-surface-container px-2.5 py-1 rounded-full border border-stitch-secondary/30">
                {currentSpread + 1} / {totalSpreads}
              </span>
              <span className="font-label-ui text-xs text-on-surface-variant font-medium hidden sm:inline">
                {getSpreadLabel(currentSpread)}
              </span>
            </div>

            {/* Quick Zoom Tools */}
            <div className="hidden md:flex items-center gap-1 px-2 py-0.5 rounded-lg bg-surface-container border border-outline-variant/30 text-xs">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.8, z - 0.15))}
                className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-label-code text-[11px] text-on-surface-variant w-9 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(2.0, z + 0.15))}
                className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              {zoom !== 1 && (
                <button
                  type="button"
                  onClick={() => setZoom(1)}
                  className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-colors"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Spread Quick Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentSpread === 0}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-semibold bg-surface-bright text-on-surface flex items-center gap-1 transition-colors',
                  currentSpread === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:bg-surface-variant active:scale-95'
                )}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev Spread</span>
              </button>

              <button
                type="button"
                onClick={() => setShowThumbnails(!showThumbnails)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-surface-bright text-on-surface-variant hover:text-stitch-secondary transition-colors"
                title="Toggle Spread Thumbnails"
              >
                {showThumbnails ? 'Hide Thumbnails' : 'All Spreads'}
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentSpread === totalSpreads - 1}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-semibold bg-stitch-secondary text-on-secondary flex items-center gap-1 transition-colors',
                  currentSpread === totalSpreads - 1
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:bg-secondary-container active:scale-95 shadow-sm'
                )}
              >
                <span className="hidden sm:inline">Next Spread</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </footer>

        {/* THUMBNAIL EXPANDABLE TRAY */}
        {showThumbnails && (
          <div className="px-4 py-3 bg-surface-container-high border-t border-outline-variant/30 flex items-center gap-3 overflow-x-auto z-20">
            {book.pages.map((pageImg, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setCurrentSpread(idx);
                }}
                className={cn(
                  'relative h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all group',
                  idx === 0 ? 'aspect-[792/1224]' : 'aspect-[1584/1224]',
                  currentSpread === idx
                    ? 'border-stitch-secondary shadow-[0_0_12px_rgba(74,225,118,0.6)] scale-105'
                    : 'border-outline-variant/40 opacity-70 hover:opacity-100 hover:scale-102'
                )}
                title={`Spread ${idx + 1}`}
              >
                <img
                  src={pageImg}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute bottom-0 inset-x-0 bg-black/75 text-[10px] font-mono text-center text-white py-0.5">
                  {idx === 0 ? 'Cover' : `${idx * 2 - 1}-${idx * 2}`}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
