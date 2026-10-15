'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, Copy, Check, Share2, Sparkles, ExternalLink } from 'lucide-react';
import { Icons } from './Icons';
import { getMediaUrl } from '@/lib/media';
import { StoryAudiogramModal } from './StoryAudiogramModal';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export interface ShareStoryData {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  categoryTag?: string;
  audioUrl?: string;
}

interface ShareStoryModalProps {
  story: ShareStoryData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareStoryModal({ story, isOpen, onClose }: ShareStoryModalProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [isAudiogramModalOpen, setIsAudiogramModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setCanNativeShare(true);
    }
  }, []);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !story) return null;

  // Build the canonical production share URL
  const productionBase = 'https://our-mumu-don-do.sabiai.work';
  const shareUrl = `${productionBase}/share/story/${story.id}`;

  const shareText = `📖 *${story.title}*\n${
    story.description ? `${story.description}\n\n` : ''
  }👉 Listen & explore on Our Mumu Don Do:\n${shareUrl}`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      toast({
        title: 'Link Copied to Clipboard!',
        description: 'Share it on WhatsApp, Instagram, or anywhere you like.',
      });
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('Failed to copy share link:', err);
      toast({
        variant: 'destructive',
        title: 'Could not copy link',
        description: 'Please copy the link text directly from the box.',
      });
    }
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const thumbnail = getMediaUrl(
    story.imageUrl || '/images/the-great-giants-of-zazzau-cover.png'
  );

  const handleInstagramShare = async () => {
    // 1. Always copy the link first so the user can immediately paste it into Instagram's Link Sticker
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      }
    } catch (e) {
      console.warn('Clipboard write failed:', e);
    }

    // 2. On mobile, if we share an IMAGE file, Instagram unlocks "Stories" and "Feed" in the OS share sheet!
    if (canNativeShare) {
      try {
        let imageFile: File | null = null;
        if (thumbnail) {
          try {
            const res = await fetch(thumbnail, { mode: 'cors' });
            if (res.ok) {
              const blob = await res.blob();
              const ext = blob.type.includes('png') ? 'png' : 'jpg';
              imageFile = new File([blob], `${story.id}-story.${ext}`, {
                type: blob.type || 'image/jpeg',
              });
            }
          } catch (fetchErr) {
            console.warn('Could not load image file for Instagram share sheet:', fetchErr);
          }
        }

        // If file sharing is supported by device and image was loaded, share the image file
        if (imageFile && navigator.canShare && navigator.canShare({ files: [imageFile] })) {
          toast({
            title: '📸 Ready for Instagram Story!',
            description: 'Link copied! Select "Stories" in Instagram, then tap the 🔗 Sticker to paste the link.',
          });
          await navigator.share({
            files: [imageFile],
            title: story.title,
            text: `📖 ${story.title} • ${shareUrl}`,
          });
          return;
        }

        // Fallback to URL/text share if image file sharing cannot be invoked
        await navigator.share({
          title: story.title,
          text: `📖 ${story.title} • African Heritage Story on Our Mumu Don Do`,
          url: shareUrl,
        });
        return;
      } catch (err: any) {
        // User may cancel native share sheet; do not show error on AbortError
        if (err?.name === 'AbortError') return;
      }
    }

    // Desktop or non-mobile fallback
    toast({
      title: '📸 Link Copied for Instagram!',
      description: 'Link copied! Open Instagram to paste into your Story sticker, Bio, or Direct Message.',
    });
    window.open('https://instagram.com', '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    if (!canNativeShare) return;
    try {
      await navigator.share({
        title: story.title,
        text: `📖 ${story.title}\n${story.description || ''}`,
        url: shareUrl,
      });
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        console.warn('Native share failed:', err);
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface-container rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-outline-variant/20 bg-surface-container-high/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-stitch-primary/20 text-stitch-secondary flex items-center justify-center">
              <Share2 className="w-5 h-5 text-stitch-secondary" />
            </div>
            <div>
              <h3 id="share-modal-title" className="font-headline text-lg sm:text-xl font-bold text-on-surface">
                Share This Story
              </h3>
              <p className="font-label-code text-xs text-on-surface-variant">
                Inspire young minds with African heritage
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close share dialog"
            className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STORY PREVIEW CARD */}
        <div className="p-4 sm:p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3.5 bg-surface-container-low p-3 rounded-2xl border border-outline-variant/25">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container">
              <Image
                src={thumbnail}
                alt={story.title}
                fill
                unoptimized
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-label-code text-[11px] text-stitch-secondary font-semibold uppercase tracking-wider truncate">
                {story.categoryTag || story.subtitle || 'African Folk Tale'}
              </span>
              <h4 className="font-headline text-base sm:text-lg font-bold text-on-surface line-clamp-1 mt-0.5">
                {story.title}
              </h4>
              <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 mt-0.5 leading-snug">
                {story.description}
              </p>
            </div>
          </div>

          {/* SOCIAL SHARING BUTTONS */}
          <div className="flex flex-col gap-2.5">
            {/* OPTION A: WHATSAPP STATUS AUDIOGRAM TEASER (PLAYS AUDIO) */}
            <button
              type="button"
              onClick={() => setIsAudiogramModalOpen(true)}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 active:scale-98 text-white font-label-ui shadow-lg hover:shadow-xl transition-all cursor-pointer border border-emerald-400/40 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm sm:text-base font-bold leading-tight flex items-center gap-1.5">
                      WhatsApp Status Audio Teaser
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-yellow-400 text-black font-extrabold tracking-wider">
                        Teaser
                      </span>
                    </span>
                    <span className="text-xs text-emerald-100 font-normal leading-snug">
                      Plays 15s audio excerpt & soundwaves on Status
                    </span>
                  </div>
                </div>
                <Icons.whatsapp className="w-6 h-6 fill-white opacity-90 flex-shrink-0" />
              </div>
            </button>

            {/* WHATSAPP LINK BUTTON */}
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-white font-label-ui text-sm sm:text-base font-bold flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Icons.whatsapp className="w-5 h-5 fill-current" />
              <span>Share Link on WhatsApp</span>
            </button>

            {/* INSTAGRAM BUTTON */}
            <button
              type="button"
              onClick={handleInstagramShare}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 active:scale-98 text-white font-label-ui text-sm sm:text-base font-bold flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Icons.instagram className="w-5 h-5 text-white stroke-[2.5]" />
              <span>Share on Instagram</span>
            </button>

            {/* NATIVE OS SHARE BUTTON (If mobile device supports it) */}
            {canNativeShare && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="w-full py-3 px-4 rounded-2xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-ui text-sm font-semibold flex items-center justify-center gap-2 border border-outline-variant/30 transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-stitch-secondary" />
                <span>More Apps (AirDrop, Messages, etc.)</span>
              </button>
            )}
          </div>

          {/* COPY LINK INPUT ROW */}
          <div className="flex flex-col gap-1.5 pt-2 border-t border-outline-variant/20">
            <span className="font-label-code text-xs text-on-surface-variant font-medium">
              Direct Story Link:
            </span>
            <div className="flex items-center gap-2 bg-surface-container-lowest p-2 rounded-xl border border-outline-variant/30 focus-within:border-stitch-secondary transition-colors">
              <input
                type="text"
                readOnly
                value={shareUrl}
                aria-label="Story Share Link"
                className="bg-transparent text-xs font-mono text-on-surface flex-1 px-2 focus:outline-none select-all truncate"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg text-xs font-label-ui font-semibold flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0',
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-primary-container hover:bg-secondary-container text-on-primary-container'
                )}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 9:16 WHATSAPP STATUS AUDIOGRAM MODAL */}
      <StoryAudiogramModal
        story={story}
        isOpen={isAudiogramModalOpen}
        onClose={() => setIsAudiogramModalOpen(false)}
      />
    </div>
  );
}
