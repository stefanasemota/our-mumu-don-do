'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Download, Share2, Sparkles, Check, RotateCcw } from 'lucide-react';
import { Icons } from './Icons';
import { getStoryTeaserUrl } from '@/lib/story-teasers';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export interface StoryAudiogramModalProps {
  story: {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
    categoryTag?: string;
    audioUrl?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StoryAudiogramModal({ story, isOpen, onClose }: StoryAudiogramModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(15);
  const [isSharing, setIsSharing] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { toast } = useToast();

  const productionBase = 'https://our-mumu-don-do.sabiai.work';
  const storyUrl = story ? `${productionBase}/story/${story.id}` : productionBase;
  const teaserUrl = story ? getStoryTeaserUrl(story.id) : '/teasers/the-great-giants-of-zazzau.mp4';

  // Autoplay or pause on open/close
  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      setCurrentTime(0);
      setHasCompleted(false);
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {
          setIsPlaying(false);
        });
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
      setIsSharing(false);
      setHasCompleted(false);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      if (video.ended || currentTime >= duration - 0.2) {
        video.currentTime = 0;
        setCurrentTime(0);
      }
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      setCurrentTime(cur);
      const dur = videoRef.current.duration;
      if (dur && !isNaN(dur)) {
        setDuration(dur);
        if (cur >= dur - 0.25) {
          setHasCompleted(true);
        }
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setHasCompleted(true);
    if (videoRef.current) {
      setCurrentTime(videoRef.current.duration || 15);
    }
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const targetDuration = duration > 0 ? duration : 15;
    const newTime = pct * targetDuration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
    if (pct >= 0.95) {
      setHasCompleted(true);
    }
  };

  // Instant Share to WhatsApp Status using pre-generated server video file
  const handleShareToWhatsAppStatus = async () => {
    if (!story) return;
    setIsSharing(true);

    try {
      // 1. Fetch the pre-rendered server teaser MP4 file
      const response = await fetch(teaserUrl);
      if (!response.ok) throw new Error('Could not fetch teaser video');
      const blob = await response.blob();
      const videoFile = new File([blob], `${story.id}-status-teaser.mp4`, {
        type: 'video/mp4',
      });

      // 2. Check if device supports native file sharing (Mobile iOS Safari / Android Chrome)
      if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [videoFile] })) {
        try {
          toast({
            title: '📲 Opening WhatsApp Status!',
            description: 'Select "WhatsApp" and choose "My Status" to post your teaser video.',
          });
          await navigator.share({
            files: [videoFile],
            title: story.title,
            text: `📖 ${story.title} • Listen to the full story at: ${storyUrl}`,
          });
          setIsSharing(false);
          return;
        } catch (shareErr: any) {
          if (shareErr?.name === 'AbortError') {
            setIsSharing(false);
            return;
          }
          console.warn('Native share failed or canceled, falling back to download:', shareErr);
        }
      }

      // 3. Fallback for Desktop or unsupported browsers: instant file download
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${story.id}-whatsapp-status.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);

      toast({
        title: '📥 Teaser Video Saved!',
        description: 'Upload this video directly to your WhatsApp Status or Instagram Stories.',
      });
    } catch (err: any) {
      console.error('Failed to share teaser video:', err);
      // Ultimate fallback: open WhatsApp with direct link
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `📖 *${story.title}*\n${story.description || ''}\n\n👉 Listen here: ${storyUrl}`
      )}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setIsSharing(false);
    }
  };

  // Direct manual download of pre-rendered MP4
  const handleDownloadVideo = async () => {
    if (!story) return;
    try {
      const response = await fetch(teaserUrl);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${story.id}-status-teaser.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);

      toast({
        title: '✅ Video Saved!',
        description: 'Ready to post to WhatsApp Status, Instagram Reels, or TikTok.',
      });
    } catch (err) {
      console.error('Download failed:', err);
      window.open(teaserUrl, '_blank');
    }
  };

  if (!isOpen || !story) return null;

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const isReadyToShare = hasCompleted || (duration > 0 && currentTime >= duration - 0.3);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[130] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm sm:max-w-md bg-surface-container rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="p-4 sm:p-4.5 flex items-center justify-between border-b border-outline-variant/20 bg-surface-container-high/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-stitch-secondary/20 text-stitch-secondary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-stitch-secondary" />
            </div>
            <div>
              <h3 className="font-headline text-base sm:text-lg font-bold text-on-surface">
                WhatsApp Audiogram
              </h3>
              <p className="font-label-code text-[11px] text-stitch-secondary font-medium">
                15-Second Audiogram with Soundwaves
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 9:16 VERTICAL VIDEO PLAYER CONTAINER */}
        <div className="p-4 flex flex-col items-center gap-3 bg-[#070b14]">
          <div
            onClick={togglePlay}
            className="relative w-full max-w-[260px] sm:max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black cursor-pointer group"
          >
            {/* PRE-RENDERED MP4 TEASER VIDEO */}
            <video
              ref={videoRef}
              src={teaserUrl}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnded}
              className="w-full h-full object-cover block"
            />

            {/* FLOATING CENTRAL PLAY/PAUSE/REPLAY OVERLAY */}
            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-200 pointer-events-none',
                isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
              )}
            >
              <div className="w-14 h-14 rounded-full bg-stitch-secondary text-on-secondary flex items-center justify-center shadow-2xl ring-4 ring-stitch-secondary/40">
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-on-secondary" />
                ) : currentTime >= duration - 0.3 ? (
                  <RotateCcw className="w-7 h-7 stroke-[2.5]" />
                ) : (
                  <Play className="w-7 h-7 fill-on-secondary ml-1" />
                )}
              </div>
            </div>

            {/* SUBTLE DURATION BADGE */}
            <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-stitch-secondary font-semibold border border-white/10 pointer-events-none">
              {Math.min(15, Math.round(currentTime))}s / 15s
            </div>
          </div>

          {/* INTERACTIVE SCRUBBER BAR */}
          <div
            onClick={handleScrub}
            className="w-full max-w-[280px] py-1 cursor-pointer group flex items-center"
            title="Click or drag to seek"
          >
            <div className="w-full h-1.5 group-hover:h-2 bg-surface-bright rounded-full overflow-hidden transition-all relative">
              <div
                className="h-full bg-stitch-secondary transition-all duration-100 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="p-4 sm:p-5 flex flex-col gap-2.5 bg-surface-container">
          {/* PRIMARY: SHARE WHATSAPP AUDIOGRAM (ENABLED ONLY WHEN PROGRESS BAR IS FULL) */}
          <button
            type="button"
            onClick={handleShareToWhatsAppStatus}
            disabled={!isReadyToShare || isSharing}
            className={cn(
              'w-full py-3.5 px-4 rounded-2xl font-label-ui text-sm sm:text-base font-bold flex items-center justify-center gap-3 transition-all duration-300',
              isReadyToShare
                ? 'bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-white shadow-lg hover:shadow-xl cursor-pointer ring-2 ring-[#25D366]/40'
                : 'bg-surface-container-high/80 text-on-surface-variant/40 border border-outline-variant/30 cursor-not-allowed opacity-60'
            )}
            title={isReadyToShare ? 'Share to WhatsApp Status' : 'Listen to preview to unlock sharing'}
          >
            <Icons.whatsapp
              className={cn(
                'w-5 h-5 transition-opacity',
                isReadyToShare ? 'fill-current opacity-100' : 'fill-on-surface-variant/30 opacity-40'
              )}
            />
            <span>
              {isSharing
                ? 'Preparing WhatsApp...'
                : isReadyToShare
                ? 'Share WhatsApp Audiogram'
                : `Previewing Audiogram (${Math.min(15, Math.round(currentTime))}s / 15s)`}
            </span>
          </button>

          {/* SECONDARY: DIRECT DOWNLOAD MP4 */}
          <button
            type="button"
            onClick={handleDownloadVideo}
            className="w-full py-2.5 px-4 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-ui text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border border-outline-variant/30 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-stitch-secondary" />
            <span>Download Video (.mp4)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
