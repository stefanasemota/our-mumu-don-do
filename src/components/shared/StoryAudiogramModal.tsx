'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Play, Pause, Download, Share2, Sparkles, RefreshCw, Check, Volume2 } from 'lucide-react';
import { Icons } from './Icons';
import { getStoryAudioPath } from '@/lib/story-audio-lookup';
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

const TEASER_DURATION_SECONDS = 15;

function getSupportedVideoMimeType(): string {
  if (typeof window === 'undefined' || typeof MediaRecorder === 'undefined') {
    return 'video/mp4';
  }
  const preferred = [
    'video/mp4; codecs=avc1.42E01E,mp4a.40.2',
    'video/mp4',
    'video/webm; codecs=vp9,opus',
    'video/webm; codecs=vp8,opus',
    'video/webm',
  ];
  for (const mime of preferred) {
    if (MediaRecorder.isTypeSupported(mime)) {
      return mime;
    }
  }
  return 'video/webm';
}

export function StoryAudiogramModal({ story, isOpen, onClose }: StoryAudiogramModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [generatedVideoBlob, setGeneratedVideoBlob] = useState<Blob | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const imageElementRef = useRef<HTMLImageElement | null>(null);
  const { toast } = useToast();

  const productionBase = 'https://our-mumu-don-do.sabiai.work';
  const storyUrl = story ? `${productionBase}/story/${story.id}` : productionBase;

  // Cleanup URLs and Audio on unmount or close
  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {}
    }
    if (generatedVideoUrl) {
      URL.revokeObjectURL(generatedVideoUrl);
    }
    setIsPlaying(false);
    setIsRecording(false);
    setCurrentTime(0);
    setRecordingProgress(0);
  }, [generatedVideoUrl]);

  useEffect(() => {
    if (!isOpen) {
      cleanup();
    }
  }, [isOpen, cleanup]);

  // Draw 9:16 vertical Story frame on Canvas (720 x 1280)
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // 1. Clear & Background Gradient (Deep obsidian + warm African earth tones)
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, '#060911');
    bgGradient.addColorStop(0.5, '#0b1220');
    bgGradient.addColorStop(1, '#05070d');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Ambient Blurred Backdrop of Cover Image
    if (imageElementRef.current && imageElementRef.current.complete) {
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.filter = 'blur(40px)';
      ctx.drawImage(imageElementRef.current, -60, -60, width + 120, height + 120);
      ctx.restore();
    }

    // 3. Subtle background radial flare behind artwork
    const flare = ctx.createRadialGradient(width / 2, 460, 50, width / 2, 460, 360);
    flare.addColorStop(0, 'rgba(74, 225, 118, 0.22)');
    flare.addColorStop(0.5, 'rgba(16, 185, 129, 0.08)');
    flare.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = flare;
    ctx.fillRect(0, 100, width, 720);

    // 4. Top Header Badges
    ctx.save();
    // Pill: OUR MUMU DON DO • AFRICAN HERITAGE
    const badgeText = '🌍 OUR MUMU DON DO • AFRICAN HERITAGE';
    ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const badgeWidth = ctx.measureText(badgeText).width + 36;
    const badgeX = (width - badgeWidth) / 2;
    const badgeY = 90;

    ctx.fillStyle = 'rgba(74, 225, 118, 0.15)';
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeWidth, 38, 19);
    ctx.fill();
    ctx.strokeStyle = 'rgba(74, 225, 118, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#4ae176';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, width / 2, badgeY + 19);

    // Subtitle / Kingdom Tag
    const tagText = (story?.categoryTag || story?.subtitle || 'AFRICAN HISTORICAL STORY').toUpperCase();
    ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace';
    ctx.fillStyle = '#fbbf24'; // Warm gold
    ctx.letterSpacing = '2px';
    ctx.fillText(tagText, width / 2, 160);
    ctx.restore();

    // 5. Centered Story Illustration (480 x 480 Square Frame with rounded corners)
    const artSize = 480;
    const artX = (width - artSize) / 2;
    const artY = 200;
    const radius = 28;

    ctx.save();
    // Shadow for depth
    ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
    ctx.shadowBlur = 32;
    ctx.shadowOffsetY = 16;

    // Rounded rectangle path for image clip
    ctx.beginPath();
    ctx.roundRect(artX, artY, artSize, artSize, radius);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.clip();

    if (imageElementRef.current && imageElementRef.current.complete) {
      ctx.drawImage(imageElementRef.current, artX, artY, artSize, artSize);
    } else {
      // Placeholder while loading
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(artX, artY, artSize, artSize);
    }
    ctx.restore();

    // Artwork border outline
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(artX, artY, artSize, artSize, radius);
    ctx.strokeStyle = 'rgba(74, 225, 118, 0.6)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    // 6. Story Title (Generous, bold typography with wrapping if long)
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

    const title = story?.title || 'Our Mumu Don Do Story';
    if (ctx.measureText(title).width > width - 80) {
      // Split into two lines
      const words = title.split(' ');
      const mid = Math.ceil(words.length / 2);
      const line1 = words.slice(0, mid).join(' ');
      const line2 = words.slice(mid).join(' ');
      ctx.fillText(line1, width / 2, 735);
      ctx.fillText(line2, width / 2, 780);
    } else {
      ctx.fillText(title, width / 2, 750);
    }

    // Narration Sub-label
    ctx.font = '19px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('🎙️ Story Narration • Official Sound Teaser', width / 2, 825);
    ctx.restore();

    // 7. Dynamic Animated Equalizer Soundwaves (32 frequency bars)
    const numBars = 32;
    const barWidth = 8;
    const barGap = 6;
    const totalWaveWidth = numBars * barWidth + (numBars - 1) * barGap;
    const startX = (width - totalWaveWidth) / 2;
    const waveBaseY = 940;
    const maxBarHeight = 70;

    let frequencyData = new Uint8Array(numBars);
    if (analyserRef.current && isPlaying) {
      analyserRef.current.getByteFrequencyData(frequencyData);
    }

    ctx.save();
    for (let i = 0; i < numBars; i++) {
      let value = frequencyData[i] || 0;
      // If paused or silent, generate a gentle pulsing wave idle animation
      if (!isPlaying || value === 0) {
        const timeOffset = Date.now() / 400;
        value = Math.sin(timeOffset + i * 0.35) * 20 + 28;
      }

      const barHeight = Math.max(8, (value / 255) * maxBarHeight);
      const bx = startX + i * (barWidth + barGap);
      const by = waveBaseY - barHeight / 2;

      // Vertical emerald-to-mint gradient for each bar
      const barGrad = ctx.createLinearGradient(0, by, 0, by + barHeight);
      barGrad.addColorStop(0, '#4ae176');
      barGrad.addColorStop(0.7, '#10b981');
      barGrad.addColorStop(1, '#059669');

      ctx.fillStyle = barGrad;
      ctx.beginPath();
      ctx.roundRect(bx, by, barWidth, barHeight, 4);
      ctx.fill();
    }
    ctx.restore();

    // 8. Bottom CTA Sticker Pill
    ctx.save();
    const ctaText = '🎧 Listen to full story at our-mumu-don-do.sabiai.work';
    ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const ctaWidth = ctx.measureText(ctaText).width + 48;
    const ctaX = (width - ctaWidth) / 2;
    const ctaY = 1080;

    ctx.shadowColor = 'rgba(74, 225, 118, 0.3)';
    ctx.shadowBlur = 18;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.beginPath();
    ctx.roundRect(ctaX, ctaY, ctaWidth, 54, 27);
    ctx.fill();

    ctx.strokeStyle = '#4ae176';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(ctaText, width / 2, ctaY + 27);
    ctx.restore();

    // 9. Countdown Timer Badge at Bottom Right (15s teaser)
    ctx.save();
    const remaining = Math.max(0, Math.ceil(TEASER_DURATION_SECONDS - currentTime));
    const timerText = `⏱️ 0:${remaining < 10 ? '0' : ''}${remaining}`;
    ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';
    ctx.fillText(timerText, width / 2, 1170);
    ctx.restore();
  }, [story, isPlaying, currentTime]);

  // Render loop
  useEffect(() => {
    if (!isOpen) return;

    let isSubscribed = true;
    const renderLoop = () => {
      if (isSubscribed) {
        drawFrame();
        animationFrameRef.current = requestAnimationFrame(renderLoop);
      }
    };

    animationFrameRef.current = requestAnimationFrame(renderLoop);
    return () => {
      isSubscribed = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen, drawFrame]);

  // Load Audio & Image through CORS-enabled proxy
  useEffect(() => {
    if (!isOpen || !story) return;

    setIsReady(false);
    setLoadingError(null);

    // 1. Preload Image
    const rawImage = story.imageUrl || '/images/the-great-giants-of-zazzau-cover.png';
    const proxiedImgUrl = `/api/media-proxy?path=${encodeURIComponent(rawImage)}`;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = proxiedImgUrl;
    img.onload = () => {
      imageElementRef.current = img;
      drawFrame();
    };
    img.onerror = () => {
      // Fallback directly to image path
      img.src = rawImage;
      imageElementRef.current = img;
    };

    // 2. Setup Audio with Web Audio API for frequency visualizer
    const rawAudio = story.audioUrl || getStoryAudioPath(story.id, story.title);
    const proxiedAudioUrl = `/api/media-proxy?path=${encodeURIComponent(rawAudio)}`;

    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audio.src = proxiedAudioUrl;
    audio.preload = 'auto';
    audioRef.current = audio;

    audio.ontimeupdate = () => {
      if (audio.currentTime >= TEASER_DURATION_SECONDS) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
        setCurrentTime(0);
      } else {
        setCurrentTime(audio.currentTime);
      }
    };

    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.oncanplay = () => {
      setIsReady(true);
    };

    audio.onerror = () => {
      console.warn('Audio proxy load issue, falling back to direct audio source');
      audio.src = rawAudio;
      setIsReady(true);
    };

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [isOpen, story, drawFrame]);

  // Connect Audio Context lazily on first user interaction (browser policy)
  const setupAudioContext = useCallback(() => {
    if (audioContextRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      if (audioRef.current) {
        const source = ctx.createMediaElementSource(audioRef.current);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        analyser.smoothingTimeConstant = 0.8;
        source.connect(analyser);
        analyser.connect(ctx.destination);
        analyserRef.current = analyser;
      }
    } catch (err) {
      console.warn('Web Audio setup not allowed or already connected:', err);
    }
  }, []);

  // Toggle Live Preview Playback
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    setupAudioContext();
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('Audio play error:', err);
      }
    }
  };

  // Record 15-second audiogram video from Canvas + Audio Stream
  const generateAudiogramVideo = async (): Promise<Blob | null> => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;
    if (!canvas || !audio) return null;

    setIsRecording(true);
    setRecordingProgress(0);
    recordedChunksRef.current = [];

    setupAudioContext();
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    // 1. Capture 30fps Canvas Stream
    const canvasStream = canvas.captureStream(30);

    // 2. Capture Audio Stream from Web Audio destination
    let combinedStream: MediaStream;
    try {
      if (audioContextRef.current && analyserRef.current) {
        const dest = audioContextRef.current.createMediaStreamDestination();
        analyserRef.current.connect(dest);
        combinedStream = new MediaStream([
          ...canvasStream.getVideoTracks(),
          ...dest.stream.getAudioTracks(),
        ]);
      } else {
        combinedStream = canvasStream;
      }
    } catch (e) {
      combinedStream = canvasStream;
    }

    const mimeType = getSupportedVideoMimeType();

    return new Promise((resolve) => {
      try {
        const recorder = new MediaRecorder(combinedStream, {
          mimeType,
          videoBitsPerSecond: 2500000,
        });
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            recordedChunksRef.current.push(e.data);
          }
        };

        recorder.onstop = () => {
          const finalBlob = new Blob(recordedChunksRef.current, { type: mimeType });
          setGeneratedVideoBlob(finalBlob);
          const url = URL.createObjectURL(finalBlob);
          setGeneratedVideoUrl(url);
          setIsRecording(false);
          setIsPlaying(false);
          resolve(finalBlob);
        };

        // Reset audio to start of teaser
        audio.currentTime = 0;
        audio.play().then(() => {
          setIsPlaying(true);
          recorder.start(100);

          // Update recording progress every 200ms
          const startTime = Date.now();
          const interval = setInterval(() => {
            const elapsed = (Date.now() - startTime) / 1000;
            const progress = Math.min(100, Math.round((elapsed / TEASER_DURATION_SECONDS) * 100));
            setRecordingProgress(progress);

            if (elapsed >= TEASER_DURATION_SECONDS) {
              clearInterval(interval);
              if (recorder.state === 'recording') {
                recorder.stop();
              }
              audio.pause();
              audio.currentTime = 0;
            }
          }, 200);
        });
      } catch (err) {
        console.error('MediaRecorder error:', err);
        setIsRecording(false);
        setIsPlaying(false);
        resolve(null);
      }
    });
  };

  // Share to WhatsApp Status directly with video file
  const handleShareToWhatsAppStatus = async () => {
    if (!story) return;

    let videoBlob = generatedVideoBlob;
    if (!videoBlob) {
      toast({
        title: '🎬 Creating 15s Story Teaser...',
        description: 'Recording high-definition video with music soundwaves for WhatsApp Status.',
      });
      videoBlob = await generateAudiogramVideo();
    }

    if (!videoBlob) {
      toast({
        variant: 'destructive',
        title: 'Could not create teaser video',
        description: 'Falling back to standard WhatsApp link share.',
      });
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `📖 *${story.title}*\n${story.description || ''}\n\n👉 Listen here: ${storyUrl}`
      )}`;
      window.open(waUrl, '_blank');
      return;
    }

    const ext = videoBlob.type.includes('mp4') ? 'mp4' : 'webm';
    const videoFile = new File([videoBlob], `${story.id}-status-teaser.${ext}`, {
      type: videoBlob.type,
    });

    // Check if device supports native file sharing (Mobile iOS Safari / Android Chrome)
    if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [videoFile] })) {
      try {
        toast({
          title: '📲 Opening WhatsApp Status!',
          description: 'Select "WhatsApp" and choose "My Status" to share your video clip.',
        });
        await navigator.share({
          files: [videoFile],
          title: story.title,
          text: `📖 ${story.title} • Listen to the full story at: ${storyUrl}`,
        });
        return;
      } catch (shareErr: any) {
        if (shareErr?.name === 'AbortError') return;
        console.warn('Native file share cancelled or failed:', shareErr);
      }
    }

    // Desktop or fallback: Trigger video file download
    const downloadUrl = URL.createObjectURL(videoBlob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${story.id}-whatsapp-status.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast({
      title: '📥 Teaser Video Downloaded!',
      description: 'Upload this video directly to WhatsApp Status or Instagram Stories.',
    });
  };

  // Manual Download Handler
  const handleDownloadVideo = async () => {
    let videoBlob = generatedVideoBlob;
    if (!videoBlob) {
      videoBlob = await generateAudiogramVideo();
    }
    if (!videoBlob) return;

    const ext = videoBlob.type.includes('mp4') ? 'mp4' : 'webm';
    const downloadUrl = URL.createObjectURL(videoBlob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${story?.id || 'story'}-teaser.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast({
      title: '✅ Video Saved!',
      description: 'Ready to post to WhatsApp Status, Instagram Reels, or TikTok.',
    });
  };

  if (!isOpen || !story) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[130] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-surface-container rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-outline-variant/20 bg-surface-container-high/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-stitch-secondary/20 text-stitch-secondary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-stitch-secondary animate-pulse" />
            </div>
            <div>
              <h3 className="font-headline text-base sm:text-lg font-bold text-on-surface">
                WhatsApp Status Audiogram
              </h3>
              <p className="font-label-code text-[11px] text-stitch-secondary font-medium">
                15-Second Animated Video with Soundwaves
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 9:16 LIVE CANVAS PREVIEW */}
        <div className="p-4 flex flex-col items-center gap-3 bg-black/40">
          <div className="relative w-full max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/40 bg-black group">
            {/* The 720x1280 Canvas (Scaled to fit preview box) */}
            <canvas
              ref={canvasRef}
              width={720}
              height={1280}
              className="w-full h-full object-contain block"
            />

            {/* In-Preview Play/Pause Overlay */}
            <button
              type="button"
              onClick={togglePlay}
              disabled={isRecording}
              aria-label={isPlaying ? 'Pause preview' : 'Play preview'}
              className={cn(
                'absolute inset-0 m-auto w-16 h-16 rounded-full bg-stitch-secondary/90 hover:bg-stitch-secondary text-on-secondary flex items-center justify-center shadow-2xl transition-all cursor-pointer ring-4 ring-stitch-secondary/30',
                isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-90 hover:scale-105'
              )}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-current" />
              ) : (
                <Play className="w-7 h-7 fill-current ml-1" />
              )}
            </button>

            {/* Recording Progress Badge */}
            {isRecording && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-4 z-20 text-center">
                <div className="w-12 h-12 rounded-full border-4 border-stitch-secondary border-t-transparent animate-spin" />
                <span className="font-label-ui text-sm font-bold text-white">
                  Recording Teaser... {recordingProgress}%
                </span>
                <span className="font-label-code text-xs text-stitch-secondary">
                  Capturing soundwaves & audio track
                </span>
              </div>
            )}
          </div>

          {/* PREVIEW STATUS PILL */}
          <div className="flex items-center gap-2 font-label-code text-xs text-on-surface-variant">
            <Volume2 className={cn('w-4 h-4', isPlaying ? 'text-stitch-secondary animate-pulse' : 'text-on-surface-variant')} />
            <span>
              {isPlaying
                ? `Playing 15s excerpt (${Math.round(currentTime)}s)`
                : 'Tap preview to test soundwaves & audio narration'}
            </span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="p-4 sm:p-5 flex flex-col gap-2.5 bg-surface-container">
          {/* PRIMARY: SHARE TO WHATSAPP STATUS */}
          <button
            type="button"
            onClick={handleShareToWhatsAppStatus}
            disabled={isRecording}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-white font-label-ui text-sm sm:text-base font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <Icons.whatsapp className="w-5 h-5 fill-current" />
            <span>Share Video to WhatsApp Status</span>
          </button>

          {/* SECONDARY: DOWNLOAD VIDEO */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadVideo}
              disabled={isRecording}
              className="flex-1 py-2.5 px-4 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-ui text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border border-outline-variant/30 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-stitch-secondary" />
              <span>Download Video (.mp4)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(storyUrl);
                  toast({
                    title: 'Link Copied!',
                    description: 'Paste it in your WhatsApp Status caption or Instagram sticker.',
                  });
                }
              }}
              className="py-2.5 px-3 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-stitch-secondary font-label-ui text-xs font-semibold flex items-center gap-1.5 border border-outline-variant/30 transition-all cursor-pointer"
              title="Copy Story Link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Copy Link</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
