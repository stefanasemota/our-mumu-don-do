/** 
 * @SABI_LOCKED
 * AI INSTRUCTION: DO NOT MODIFY THIS FILE. 
 * This file contains specific Sabi Auth logic and optimized Next.js Image settings.
 */
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, ExternalLink, Home, Youtube } from 'lucide-react';
import type { WeeklyEducationalTopic } from '@/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { getMediaUrl } from '@/lib/media';
import { useToast } from '@/hooks/use-toast';

interface ShareCardProps {
  topic: WeeklyEducationalTopic;
}

const categoryImageMap: Record<string, string> = {
  'Nigerian Solutions': 'topic-nigerian-solutions',
  'Critical Thinking': 'topic-critical-thinking',
  'Historical Context': 'topic-historical-context',
  'Unity & Identity': 'topic-unity-identity',
};

export function ShareCard({ topic }: ShareCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<'en' | 'de-CH'>('en');
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const lowerTitle = (topic.title || '').toLowerCase();
  const isArhuan =
    topic.id === 'arhuan-the-giant-prince-of-benin' ||
    lowerTitle.includes('arhuan');

  const currentDescription =
    activeLanguage === 'de-CH' && topic.pages?.[0]?.textDeCH
      ? topic.pages[0].textDeCH
      : topic.description;

  const rawDeCHAudio =
    topic.audioUrlDeCH ||
    (lowerTitle.includes('glass') || lowerTitle.includes('milk')
      ? '/audio/The_Glass_of_Milk_ch.mp3'
      : lowerTitle.includes('river was') || lowerTitle.includes('always there')
      ? '/audio/The_River_was_always_there_ch.mp3'
      : lowerTitle.includes('signature')
      ? '/audio/The_Kings_Signature_ch.mp3'
      : lowerTitle.includes('colonis') || lowerTitle.includes('coloniz')
      ? '/audio/Colonisation_ch.mp3'
      : lowerTitle.includes('zazzau') || lowerTitle.includes('amina')
      ? '/audio/The Great Giants of Zazzau_ch.mp3'
      : lowerTitle.includes('arhuan') || lowerTitle.includes('benin')
      ? '/audio/arhuan-the-giant-prince-of-benin_ch.mp3'
      : undefined);

  const deCHAudioSource = rawDeCHAudio ? getMediaUrl(rawDeCHAudio) : undefined;
  const hasDeCH = Boolean(deCHAudioSource);
  const currentAudioUrl =
    activeLanguage === 'de-CH'
      ? deCHAudioSource
      : topic.audioUrl
      ? getMediaUrl(topic.audioUrl)
      : undefined;

  const categories = Array.isArray(topic.guidelineCategory)
    ? topic.guidelineCategory
    : [topic.guidelineCategory];
  const placeholderId =
    categories.length > 0
      ? categoryImageMap[categories[0]]
      : 'topic-critical-thinking';
  const placeholder = PlaceHolderImages.find((p) => p.id === placeholderId);

  const rawImageUrl =
    topic.pages && topic.pages[0]?.imageUrl
      ? topic.pages[0].imageUrl
      : placeholder?.imageUrl || '/images/the-glass-of-milk/page_0.png';
  const imageUrl = getMediaUrl(rawImageUrl);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement || !currentAudioUrl) return;

    if (!audioElement.src || !audioElement.src.endsWith(currentAudioUrl)) {
      audioElement.src = currentAudioUrl;
    }

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleError = (e: Event) => {
      console.warn('[ShareCard] Audio playback error on source:', audioElement.src, e);
      setIsPlaying(false);
    };

    audioElement.addEventListener('ended', handleEnded);
    audioElement.addEventListener('error', handleError);

    if (isPlaying) {
      audioElement.play().catch((error) => {
        console.error('Audio play failed:', error);
        setIsPlaying(false);
      });
    } else {
      audioElement.pause();
    }

    return () => {
      audioElement.removeEventListener('ended', handleEnded);
      audioElement.removeEventListener('error', handleError);
    };
  }, [isPlaying, currentAudioUrl]);

  const handleLanguageChange = (newLang: 'en' | 'de-CH') => {
    if (newLang === activeLanguage) return;
    setActiveLanguage(newLang);

    if (newLang === 'de-CH') {
      toast({
        title: '🇨🇭 Schwiizerdütsch aktiviert',
        description: 'Audio-Vorläsig und Tekscht-Zämmefassige sind jetzt uf Schwiizerdütsch umgschaltet.',
      });
    } else {
      toast({
        title: '🇬🇧 English Mode',
        description: 'Narration audio and story summaries are now in English.',
      });
    }

    const audioElement = audioRef.current;
    if (audioElement) {
      const wasPlaying = isPlaying;
      const targetSrc =
        newLang === 'de-CH'
          ? deCHAudioSource
          : topic.audioUrl
          ? getMediaUrl(topic.audioUrl)
          : undefined;
      if (targetSrc) {
        audioElement.pause();
        audioElement.src = targetSrc;
        audioElement.load();
        if (wasPlaying) {
          audioElement.play().catch((err) => console.warn('Audio switch playback failed:', err));
        }
      } else {
        audioElement.pause();
        setIsPlaying(false);
      }
    }
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <Button asChild variant="outline" className="bg-background/50 backdrop-blur-sm">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Go to App
          </Link>
        </Button>
      </div>

      <Card className="w-full max-w-md overflow-hidden border-white/10 bg-[#0f172a]">
        {/* 
            FIX 1: pt-10 creates the gap at the top.
            FIX 2: h-80 makes the image container much taller (bigger image).
            FIX 3: px-6 pushes the image slightly in from the sides for a premium look.
        */}
        <div className="px-6 pt-10"> 
          <div className="relative h-80 w-full overflow-hidden rounded-xl border border-white/5 shadow-2xl">
            {/* @SABI_IMAGE_LOCK_START - AI: DO NOT EDIT THIS BLOCK */}
            <Image
              src={imageUrl}
              alt={topic.title}
              fill
              priority
              // Changed to object-cover to make the image "Big" and fill the container
              className="object-cover" 
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* @SABI_IMAGE_LOCK_END */}
          </div>
        </div>

        <CardHeader className="pt-6">
          <CardTitle className="font-headline text-3xl text-white">
            {topic.title}
          </CardTitle>
          <CardDescription className="text-slate-400 text-base leading-relaxed">
            {currentDescription}
          </CardDescription>

          {isArhuan && (
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-amber-500/10 via-amber-950/25 to-slate-900/60 border border-amber-500/30 text-slate-200 shadow-md">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Youtube className="w-4 h-4 text-red-500 fill-red-500" />
                  <span>Cultural Tribute</span>
                </div>
                <span className="text-[10px] font-mono text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20 font-semibold">
                  Mama Africa
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {activeLanguage === 'de-CH' ? (
                  <>
                    Mit Liebi inspiriert dur d&apos;mündlechi Gschichteerzellig vo de{' '}
                    <strong className="text-amber-300 font-semibold">Mama Africa</strong>. Mir fiired
                    ihre YouTube-Kanal und di lebändigi Tradition vo afrikanische Gschichte.
                  </>
                ) : (
                  <>
                    Lovingly inspired by the oral storytelling of{' '}
                    <strong className="text-amber-300 font-semibold">Mama Africa</strong>. Celebrating
                    her YouTube channel and the sacred tradition of African oral folklore.
                  </>
                )}
              </p>
              <a
                href="https://youtu.be/I_xZDq9vj7c?si=jykeZn-g5xbh8qbw"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-amber-200 hover:text-white border border-red-500/30 font-medium text-xs transition-colors w-full justify-center group"
              >
                <Youtube className="w-4 h-4 text-red-500 fill-red-500 group-hover:scale-110 transition-transform" />
                <span>
                  {activeLanguage === 'de-CH'
                    ? 'Mama Africa uf YouTube luege'
                    : 'Watch Mama Africa on YouTube'}
                </span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
              </a>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {hasDeCH && (
            <div className="flex items-center justify-between gap-1.5 p-1 rounded-full bg-slate-900/90 border border-white/10 shadow-inner">
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                className={cn(
                  'flex-1 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer',
                  activeLanguage === 'en'
                    ? 'bg-green-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                )}
              >
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10">EN</span>
                <span>English</span>
                {activeLanguage === 'en' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('de-CH')}
                className={cn(
                  'flex-1 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer',
                  activeLanguage === 'de-CH'
                    ? 'bg-green-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                )}
              >
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10">CH</span>
                <span>Schwiizerdütsch</span>
                {activeLanguage === 'de-CH' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </button>
            </div>
          )}

          {currentAudioUrl && (
            <Button 
              onClick={togglePlayPause} 
              className="w-full bg-green-700 hover:bg-green-600 text-white h-14 text-lg" 
              size="lg"
            >
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-5 w-5" /> Pause Story
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" /> Listen to Story {activeLanguage === 'de-CH' ? '(CH)' : ''}
                </>
              )}
            </Button>
          )}
          <audio ref={audioRef} preload="metadata" />
        </CardContent>

        <CardFooter className="pb-8">
          <Button variant="outline" className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-white h-12" asChild>
            <Link href={`/story/${topic.id}`}>
              <ExternalLink className="mr-2 h-4 w-4" /> View Full Interactive Story
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}