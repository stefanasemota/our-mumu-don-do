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
  FileText,
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
  const [viewMode, setViewMode] = useState<'storybook' | 'pdf'>('storybook');
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);

  // Dedicated Audio Narration State
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  const totalSpreads = book.pages.length;

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

          {/* Viewer Mode & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

            {/* View Mode Toggle */}
            <div className="flex items-center p-0.5 rounded-xl bg-surface-bright border border-outline-variant/30 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setViewMode('storybook')}
                className={cn(
                  'px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors',
                  viewMode === 'storybook'
                    ? 'bg-stitch-secondary text-on-secondary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                )}
                title="Interactive 2-Page Storybook Spread"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Storybook</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('pdf')}
                className={cn(
                  'px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors',
                  viewMode === 'pdf'
                    ? 'bg-stitch-secondary text-on-secondary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                )}
                title="Standard PDF Document View"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">PDF</span>
              </button>
            </div>

            {/* Open Original PDF in Tab */}
            <a
              href={book.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-surface-bright text-on-surface hover:bg-surface-variant transition-colors text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              title="Open full PDF in a new browser tab"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden md:inline">Open Tab</span>
            </a>

            {/* Download PDF */}
            <a
              href={book.pdfUrl}
              download={book.downloadName}
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

        {/* NARRATION AUDIO STRIP */}
        <div className="px-4 sm:px-6 py-2 bg-surface-container-high border-b border-outline-variant/30 flex items-center justify-between gap-3 text-xs z-10">
          {book.audioUrl ? (
            <>
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  type="button"
                  aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
                  onClick={toggleAudio}
                  className="w-8 h-8 rounded-full bg-stitch-secondary text-on-secondary flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all flex-shrink-0"
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-on-secondary" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-on-secondary ml-0.5" />
                  )}
                </button>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-ui font-semibold text-on-surface truncate text-xs">
                    {book.audioTitle || 'Musical Audio Narration'}
                  </span>
                  <span className="font-label-code text-[11px] text-stitch-secondary">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* Scrubber */}
              <div
                role="button"
                tabIndex={0}
                aria-label="Seek narration"
                onClick={handleScrub}
                className="flex-1 max-w-md h-2 bg-surface-bright rounded-full overflow-hidden cursor-pointer hidden sm:block"
              >
                <div
                  className="h-full bg-stitch-secondary rounded-full shadow-[0_0_8px_rgba(74,225,118,0.8)]"
                  style={{
                    width: `${duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0}%`,
                  }}
                />
              </div>

              {/* Mute */}
              <button
                type="button"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                onClick={toggleMute}
                className="p-1 rounded-lg text-on-surface-variant hover:text-stitch-secondary transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-error" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Multilingual Narration Language Selector */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-surface-bright border border-outline-variant/30 text-[11px] font-semibold flex-shrink-0">
                <span className="px-2 py-0.5 rounded-md bg-stitch-secondary text-on-secondary flex items-center gap-1 shadow-sm">
                  <span className="text-[10px] font-mono font-bold">EN</span>
                  <span className="hidden sm:inline">English</span>
                </span>
                <span
                  title="Swiss German audio narration coming soon"
                  className="px-2 py-0.5 rounded-md text-on-surface-variant/40 flex items-center gap-1 opacity-60 cursor-not-allowed select-none"
                >
                  <span className="text-[10px] font-mono font-bold">CH</span>
                  <span className="hidden sm:inline">Schwiizerdütsch</span>
                  <span className="text-[9px] font-label-code bg-surface-dim px-1 py-0.5 rounded border border-outline-variant/30 text-stitch-secondary/80">
                    Audio Soon
                  </span>
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 text-on-surface-variant text-xs">
                <span className="w-2 h-2 rounded-full bg-stitch-secondary/60 animate-pulse" />
                <span className="font-label-code text-stitch-secondary/90">
                  Audio Narration Currently in Production
                </span>
              </div>
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-surface-bright border border-outline-variant/30 text-[11px] font-semibold flex-shrink-0">
                <span className="px-2 py-0.5 rounded-md bg-surface-dim text-on-surface-variant/80 flex items-center gap-1">
                  <span className="text-[10px] font-mono font-bold">EN</span>
                  <span className="hidden sm:inline">English</span>
                </span>
                <span
                  title="Swiss German audio narration coming soon"
                  className="px-2 py-0.5 rounded-md text-on-surface-variant/40 flex items-center gap-1 opacity-60 cursor-not-allowed select-none"
                >
                  <span className="text-[10px] font-mono font-bold">CH</span>
                  <span className="hidden sm:inline">Schwiizerdütsch</span>
                  <span className="text-[9px] font-label-code bg-surface-dim px-1 py-0.5 rounded border border-outline-variant/30 text-stitch-secondary/80">
                    Audio Soon
                  </span>
                </span>
              </div>
            </div>
          )}

          {/* Quick Zoom Tools (Storybook Mode only) */}
          {viewMode === 'storybook' && (
            <div className="flex items-center gap-1 border-l border-outline-variant/30 pl-3">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.8, z - 0.15))}
                className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-label-code text-[11px] text-on-surface-variant w-10 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(2.0, z + 0.15))}
                className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              {zoom !== 1 && (
                <button
                  type="button"
                  onClick={() => setZoom(1)}
                  className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-colors"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* MAIN VIEWER STAGE */}
        <div className="flex-1 relative w-full h-full min-h-0 overflow-hidden bg-[#070b14] flex items-center justify-center p-2 sm:p-4">
          {viewMode === 'storybook' ? (
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
          ) : (
            /* Fallback PDF Iframe */
            <iframe
              src={`${book.pdfUrl}#toolbar=1`}
              className="w-full h-full border-0 rounded-xl bg-surface-container-lowest"
              title={`${book.title} PDF Document`}
            />
          )}
        </div>

        {/* BOTTOM STORYBOOK NAVIGATION TRAY */}
        {viewMode === 'storybook' && (
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
        )}

        {/* THUMBNAIL EXPANDABLE TRAY */}
        {showThumbnails && viewMode === 'storybook' && (
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
