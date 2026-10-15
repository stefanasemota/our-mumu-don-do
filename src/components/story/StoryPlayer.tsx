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
  Check,
  Maximize2,
  Minimize2,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Mic,
  HelpCircle,
  CheckCircle,
  Handshake,
  Shield,
  Users,
  BookOpen,
  Download,
  ExternalLink,
  X,
  Music,
  Languages,
  Quote,
} from 'lucide-react';
import type { WeeklyEducationalTopic, StoryPage } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { getMediaUrl } from '@/lib/media';
import { Icons } from '../shared/Icons';
import { StorybookModal, type StorybookBookData } from './StorybookModal';
import { ShareStoryModal } from '../shared/ShareStoryModal';

interface StoryPlayerProps {
  topic: WeeklyEducationalTopic;
  standalone?: boolean;
}

export type StoryLanguage = 'en' | 'de-CH';

const PLAYBACK_SPEEDS = [0.85, 1.0, 1.25, 1.5];

// Full English scripts for multi-scene educational chapters
const ZAZZAU_EN_PAGES = [
  "In the great ancient city of Zazzau, the desert winds blew warm and steady against the towering red clay walls. Queen Amina stood atop the fortress watchtower, looking across the vast savannah. She knew that walls could protect her people from sudden raids, but true prosperity came from building trade routes, uniting communities, and ruling with courage and wisdom.",
  "Mounted on her swift warhorse, Amina led her community not to conquer, but to secure safe passage for farmers, craftspeople, and traders. She directed the construction of earthen walls—the legendary Ganuwa Amina—that encircled cities, offering safe havens and lively marketplaces where neighboring nations exchanged salt, kola nuts, and woven cloth.",
  "As the afternoon sun cast long shadows across Zazzau, Amina convened the youth council. 'A ruler who only prepares for defense will always live in fear,' she advised the young leaders. 'A leader who builds connections creates lasting peace.' The young citizens listened carefully, understanding that their future required courage, dialogue, and cooperation.",
  "By evening, the marketplaces of Zazzau bustled with friendly music, lantern lights, and shared meals. Travelers from distant kingdoms rested safely within the gates. Queen Amina had proven that true leadership lies in wisdom, open doors, and justice.",
];

// Swiss German authentic scripts for story scenes (ready for audio release)
const ZAZZAU_SWISS_GERMAN_PAGES = [
  "I dr grosse, alte Stadt Zazzau het dr heissi Wüestewind sanft über di rote Lehmmure bloost. D'Königin Amina isch uf dr hoche Stadtmure gstande und het wyt über s'Land gluegt. Si het gwüsst, dass di wahri Stärki vomene Rych nid nume us Chrieger beschteht, sondern us em Fride, offene Handelswääg und em Zämehalt vo allne Mänsche.",
  "Mit grossem Muet und Chlugheit het d'Amina iri Rappe bestyge. Si het d'Grenze gschützt und neui sicheri Handelsroute dur ganz Westafrika bouet. D'Puure und Handwärker händ Kolanüss, Gwürz und prachtvolli Stoff usstuuscht, und Zazzau isch zunere blühende Oase worde.",
  "D'Mure vo Zazzau – d'Ganuwa – sind mächtig gsi, sorgfältig us Lehm gformt. Aber d'Königin het zu irem Volk gsait: 'Mure gäbed Schutz vor Gfohr, aber offeni Tor und Fründschaft mached üs starch.' Jung und Alt händ vo irer Weitsicht glernt.",
  "Am Obe händ sich d'Händler und d'Familie uf em grosse Märtplatz versammlet. Bim Füür sind Gschichte verzellt worde, und d'Chind händ gseh, dass Fride und Zämehalt di gröschte Schätz vomene Volch sind. D'Königin Amina het s'Fundamänt für Generatione gleit.",
];

const ARHUAN_SWISS_GERMAN_PAGES = [
  "I dr mächtige Stadt Benin het dr Prinz Arhuan gläbt, dr riisigi Chrieger mit dr Chraft vo hundert Manne. Doch wie d'Mama Africa immer verzellt, isch wahri Grössi nid nume d'Chraft im Arm, sondern s'Guete im Härze.",
  "Dr Arhuan het d'Wälder und d'Flüss vo Benin gschützt. Jedi Gschicht, wo d'Mama Africa über ihn singt, mahnt üs dra, mit Stolz und Reschpäkt für üses Erbe z'läbe.",
];

const ZAZZAU_BOOK: StorybookBookData = {
  title: 'The Great Giants of Zazzau',
  author: 'By Stefan Asemota • Official Illustrated Edition',
  pdfUrl: getMediaUrl('/books/the-great-giants-of-zazzau.pdf'),
  downloadName: 'The_Great_Giants_of_Zazzau.pdf',
  audioUrl: getMediaUrl('/audio/The_Great_Giants_of_Zazzau.mp3'),
  audioTitle: 'Audio Narration • The Great Giants of Zazzau',
  pages: Array.from({ length: 9 }, (_, i) => getMediaUrl(`/books/zazzau/page-${i + 1}.jpg`)),
};

const ARHUAN_BOOK: StorybookBookData = {
  title: 'Arhuan: The Giant Prince of Benin',
  author: 'By Stefan Asemota • Inspired by Mama Africa',
  pdfUrl: getMediaUrl('/books/arhuan-the-giant-prince-of-benin.pdf'),
  downloadName: 'Arhuan_The_Giant_Prince_of_Benin.pdf',
  audioUrl: getMediaUrl('/audio/arhuan-the-giant-prince-of-benin.mp3'),
  audioTitle: 'Audio Narration • Arhuan: The Giant Prince of Benin',
  inspirationUrl: 'https://youtu.be/I_xZDq9vj7c?si=jykeZn-g5xbh8qbw',
  inspirationTitle: "Watch Mama Africa's Storytelling Video",
  pages: Array.from({ length: 12 }, (_, i) => getMediaUrl(`/books/arhuan/page-${i + 1}.jpg`)),
};

export function StoryPlayer({ topic, standalone = false }: StoryPlayerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [activeLanguage, setActiveLanguage] = useState<StoryLanguage>('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(1); // default 1.0x
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedPerspective, setSelectedPerspective] = useState<string | null>('peace');
  const [reflectionText, setReflectionText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeStorybook, setActiveStorybook] = useState<StorybookBookData | null>(null);

  // Auto-hide controls state & timer
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const lowerTitle = (topic.title || '').toLowerCase();
  const isZazzau =
    lowerTitle.includes('zazzau') ||
    lowerTitle.includes('amina');
  const isArhuan =
    lowerTitle.includes('arhuan') ||
    lowerTitle.includes('benin');
  const isColonisation =
    lowerTitle.includes('colonis') ||
    lowerTitle.includes('coloniz');
  const hasGermanAudio = Boolean(
    (topic.audioUrlDeCH && topic.audioUrlDeCH.trim()) ||
    isZazzau ||
    isArhuan ||
    isColonisation ||
    lowerTitle.includes('glass') ||
    lowerTitle.includes('milk') ||
    lowerTitle.includes('river was') ||
    lowerTitle.includes('always there') ||
    lowerTitle.includes('signature')
  );
  const hasDeCHAudio = hasGermanAudio;

  // Compute effective pages:
  // If topic has multiple pages, use them; if topic has <= 1 page and is Zazzau, enrich with full chapter scenes.
  const rawPages: StoryPage[] =
    topic.pages && topic.pages.length > 1
      ? topic.pages
      : isZazzau
      ? ZAZZAU_EN_PAGES.map((text, idx) => ({
          text: idx === 0 && topic.pages?.[0]?.text ? topic.pages[0].text : text,
          imageUrl: topic.pages?.[idx]?.imageUrl || topic.pages?.[0]?.imageUrl || '',
        }))
      : topic.pages?.length
      ? topic.pages
      : [{ text: topic.description || '', imageUrl: '' }];

  const effectivePages: StoryPage[] = rawPages.map((p) => ({
    ...p,
    imageUrl: p.imageUrl ? getMediaUrl(p.imageUrl) : '',
  }));

  const totalPages = effectivePages.length;
  const page: StoryPage = effectivePages[currentPage] || { text: topic.description || '', imageUrl: '' };

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

  const handleStageMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    }
  };

  const scrollToStage = useCallback(() => {
    if (stageRef.current) {
      const headerOffset = 80;
      const elementPosition = stageRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + (window.scrollY || window.pageYOffset || 0) - headerOffset;
      window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // In-stage slide navigation - transitions slide in-place with zero page jump
  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    } else {
      toast({
        title: 'Story Completed!',
        description: 'You have finished reading all scenes of this story.',
      });
    }
  }, [currentPage, totalPages, toast]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  // Bottom footer navigation (after reading text) - advances slide & scrolls smoothly to stage
  const handleBottomContinue = useCallback(() => {
    if (currentPage < totalPages - 1) {
      const nextScene = currentPage + 1;
      setCurrentPage(nextScene);
      toast({
        title: `Scene ${nextScene + 1} of ${totalPages}`,
        description: 'Advancing to the next scene...',
      });
      setTimeout(() => {
        scrollToStage();
      }, 50);
    } else {
      toast({
        title: 'Story Completed!',
        description: 'You have finished reading all scenes of this story.',
      });
    }
  }, [currentPage, totalPages, toast, scrollToStage]);

  const handleBottomPrev = useCallback(() => {
    if (currentPage > 0) {
      const prevScene = currentPage - 1;
      setCurrentPage(prevScene);
      setTimeout(() => {
        scrollToStage();
      }, 50);
    }
  }, [currentPage, scrollToStage]);

  const getAudioSource = useCallback(
    (lang: StoryLanguage = activeLanguage) => {
      const getRaw = () => {
        if (lang === 'de-CH') {
          if (topic.audioUrlDeCH && topic.audioUrlDeCH.trim()) {
            return topic.audioUrlDeCH.trim();
          }
          if (lowerTitle.includes('glass') || lowerTitle.includes('milk')) {
            return '/audio/The_Glass_of_Milk_ch.mp3';
          }
          if (isZazzau) {
            return '/audio/The Great Giants of Zazzau_ch.mp3';
          }
          if (isArhuan) {
            return '/audio/arhuan-the-giant-prince-of-benin_ch.mp3';
          }
          if (lowerTitle.includes('river was') || lowerTitle.includes('always there')) {
            return '/audio/The_River_was_always_there_ch.mp3';
          }
          if (lowerTitle.includes('signature')) {
            return '/audio/The_Kings_Signature_ch.mp3';
          }
          if (isColonisation) {
            return '/audio/Colonisation_ch.mp3';
          }
          // Explicitly return empty when German is requested but no German audio exists
          return '';
        }

        // English narration fallback
        if (topic.audioUrl && topic.audioUrl.trim()) return topic.audioUrl.trim();
        if (isZazzau) {
          return '/audio/The_Great_Giants_of_Zazzau.mp3';
        }
        if (isArhuan) {
          return '/audio/arhuan-the-giant-prince-of-benin.mp3';
        }
        if (lowerTitle.includes('glass') || lowerTitle.includes('milk')) {
          return '/audio/The-Glass-of-Milk.mp3';
        }
        if (lowerTitle.includes('signature')) {
          return '/audio/The-Kings-Signature.mp3';
        }
        if (lowerTitle.includes('river of') || lowerTitle.includes('thousand songs')) {
          return '/audio/The-River-of-a-Thousand-Songs.mp3';
        }
        if (lowerTitle.includes('river was') || lowerTitle.includes('always there')) {
          return '/audio/The-River-was-always-there.mp3';
        }
        if (isColonisation) {
          return '/audio/Colonisation.mp3';
        }
        if (lowerTitle.includes('never lost')) {
          return '/audio/we-were-never-lost.mp3';
        }
        return '';
      };
      const raw = getRaw();
      return raw ? getMediaUrl(raw) : '';
    },
    [activeLanguage, isArhuan, isColonisation, isZazzau, lowerTitle, topic.audioUrl, topic.audioUrlDeCH]
  );

  const handleLanguageChange = (newLang: StoryLanguage) => {
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

    const audio = audioRef.current;
    if (audio) {
      const wasPlaying = isPlaying;
      const targetSrc = getAudioSource(newLang);
      if (targetSrc) {
        audio.pause();
        audio.src = targetSrc;
        audio.load();
        if (wasPlaying) {
          audio
            .play()
            .then(() => setIsPlaying(true))
            .catch((err) => console.warn('Audio switch playback:', err));
        } else {
          setIsPlaying(false);
        }
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  // Audio Sync & Event Listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const source = getAudioSource(activeLanguage);
    if (source && (!audio.src || !audio.src.endsWith(source))) {
      audio.src = source;
      audio.load();
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
      setShowControls(true);
      setCurrentTime(0);
    };

    const onError = (e: Event) => {
      console.warn('[StoryPlayer] Audio playback error on source:', audio.src, e);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [activeLanguage, getAudioSource]);

  // Handle Play/Pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setShowControls(true);
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          triggerShowControls();
        })
        .catch((err) => {
          console.warn('Audio playback simulated or blocked:', err);
          setIsPlaying(true);
          triggerShowControls();
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
  const handleShare = () => {
    setIsShareModalOpen(true);
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

  const getSceneText = () => {
    if (activeLanguage === 'de-CH') {
      if (page.textDeCH) return page.textDeCH;
      if (isZazzau) {
        return ZAZZAU_SWISS_GERMAN_PAGES[currentPage] || ZAZZAU_SWISS_GERMAN_PAGES[0];
      }
      if (isArhuan) {
        return ARHUAN_SWISS_GERMAN_PAGES[currentPage] || ARHUAN_SWISS_GERMAN_PAGES[0];
      }
      return page.text || '';
    }
    return page.text || '';
  };

  const displayText = getSceneText();
  const firstLetter = displayText ? displayText.trim().charAt(0) : '';
  const remainingText = displayText ? displayText.trim().slice(1) : '';

  // Fallback hero artwork from Google Stitch suggestion
  const defaultStageArtwork =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC8HvA0q-Uwv4OrRwC8jFCyaQb3YLol_SV82spISy9X1jG9rVE1c30Z3MHbf0p_UJEeyEfhx5cf44ygd5ejhRjznA43C-57e8XpLYYorzwAArWgX5VoUmF7vWuNqOB7kK4X_gKxhq1EGpaMDPfZyADRsG9Y8GHPy5NnOUWKv7V71NWH2kTEGgdWhJU0R3atiBZ25PwAWhlulxtFuOjg0C7w6fKFEE35rq3-H7OjC7X4qtGUs8G0TXQk';

  return (
    <div className="w-full flex flex-col bg-surface text-on-surface">
      {/* Hidden Native Audio Element */}
      <audio ref={audioRef} preload="metadata" />

      {/* STITCH APP SHELL HEADER (Rendered in standalone story reader mode) */}
      {standalone && (
        <header className="sticky top-0 inset-x-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl pt-safe shadow-[0_4px_20px_rgba(0,0,0,0.35)] border-b border-surface-container mb-6">
          <div className="w-full max-w-[1600px] mx-auto h-16 sm:h-20 px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href="/"
                aria-label="Go Back"
                className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="h-10 w-10 rounded-full bg-primary-container border border-stitch-secondary/40 flex items-center justify-center flex-shrink-0">
                <Icons.gorilla className="h-6 w-6 text-stitch-secondary" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-code text-xs sm:text-sm text-stitch-primary uppercase tracking-wider truncate">
                  Our Mumu Don Do
                </span>
                <h1 className="font-headline text-base sm:text-xl text-on-surface truncate leading-tight font-semibold">
                  {topic.title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                aria-label="Share"
                onClick={handleShare}
                className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Container - Full Width with generous margins and responsive breathing room */}
      <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 px-4 sm:px-8 lg:px-12">
        {/* TOP PROGRESS COMPONENT: Story Segment Capsules */}
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex items-center gap-2 w-full">
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
                    'h-2 sm:h-2.5 flex-1 rounded-full transition-all duration-300 relative overflow-hidden',
                    isCompleted && 'bg-primary-container hover:opacity-90',
                    isActive && 'bg-surface-bright relative group ring-1 ring-stitch-secondary/40',
                    !isCompleted && !isActive && 'bg-surface-bright/50 hover:bg-surface-bright transition-colors'
                  )}
                >
                  {isActive && (
                    <div
                      className="absolute inset-y-0 left-0 bg-stitch-secondary shadow-[0_0_10px_rgba(74,225,118,0.9)] rounded-full transition-all duration-300"
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
          <div className="flex items-center justify-between text-on-surface-variant pt-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-stitch-secondary animate-pulse flex-shrink-0" />
              <span className="font-label-ui text-sm sm:text-base uppercase tracking-wider text-stitch-secondary font-semibold truncate">
                Scene {currentPage + 1} • {topic.title}
              </span>
            </div>
            <span className="font-label-code text-xs sm:text-sm text-on-surface-variant bg-surface-container px-3.5 py-1 rounded-full flex-shrink-0 font-medium">
              Page {currentPage + 1} of {totalPages}
            </span>
          </div>

          {/* Top Language Selector Bar: English vs Schwiizerdütsch */}
          <div className="flex items-center justify-end gap-2 pt-2 pb-1 border-t border-outline-variant/20">
            <div className="inline-flex items-center p-1 rounded-full bg-surface-container border border-outline-variant/30 shadow-inner">
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                className={cn(
                  'px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-label-ui font-semibold flex items-center gap-1.5 transition-all cursor-pointer',
                  activeLanguage === 'en'
                    ? 'bg-stitch-secondary text-on-secondary shadow-[0_0_12px_rgba(74,225,118,0.5)] scale-102'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-bright/60'
                )}
              >
                <span className="text-[10px] sm:text-[11px] font-label-code font-bold px-1.5 py-0.5 rounded bg-black/15">EN</span>
                <span>English</span>
                {activeLanguage === 'en' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse ml-0.5" />
                )}
              </button>
              <button
                type="button"
                disabled={!hasGermanAudio}
                onClick={() => hasGermanAudio && handleLanguageChange('de-CH')}
                title={hasGermanAudio ? 'Schwiizerdütsch Audio Narration' : 'Schwiizerdütsch audio coming soon'}
                className={cn(
                  'px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-label-ui font-semibold flex items-center gap-1.5 transition-all',
                  hasGermanAudio ? 'cursor-pointer' : 'cursor-not-allowed opacity-35',
                  activeLanguage === 'de-CH'
                    ? 'bg-stitch-secondary text-on-secondary shadow-[0_0_12px_rgba(74,225,118,0.5)] scale-102'
                    : hasGermanAudio
                    ? 'text-on-surface-variant hover:text-on-surface hover:bg-surface-bright/60'
                    : 'text-on-surface-variant/50'
                )}
              >
                <span className="text-[10px] sm:text-[11px] font-label-code font-bold px-1.5 py-0.5 rounded bg-black/15">CH</span>
                <span>Schwiizerdütsch</span>
                {activeLanguage === 'de-CH' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse ml-0.5" />
                )}
                {hasGermanAudio && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-label-code bg-secondary-container text-on-secondary font-bold">
                    {lowerTitle.includes('river was') || lowerTitle.includes('always there') ? 'Song' : 'Audio'}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 1: CINEMATIC STORY STAGE (16:9 Artwork with Ambient Glow) */}
        <div className="relative my-2 group">
          {/* Ambient Gaussian Backlight Flare */}
          <div className="absolute -inset-2 bg-gradient-to-r from-primary-container/40 via-secondary-container/25 to-tertiary-container/30 rounded-3xl blur-2xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

          <div
            ref={stageRef}
            onMouseEnter={triggerShowControls}
            onMouseMove={triggerShowControls}
            onMouseLeave={handleStageMouseLeave}
            onTouchStart={triggerShowControls}
            onClick={triggerShowControls}
            className={cn(
              'relative w-full overflow-hidden shadow-2xl bg-surface-container-low group select-none cursor-pointer',
              isFullscreen
                ? 'h-full max-h-screen rounded-none border-0 bg-black flex items-center justify-center'
                : 'aspect-video rounded-2xl lg:rounded-3xl border border-outline-variant/30'
            )}
          >
            {/* Story Narrative Stage Artwork */}
            {page.imageUrl ? (
              <>
                {/* Ambient Blurred Backdrop to fill frame edges with harmonious colors */}
                <Image
                  key={`ambient-${page.imageUrl || currentPage}`}
                  src={getMediaUrl(page.imageUrl)}
                  alt=""
                  fill
                  unoptimized
                  aria-hidden="true"
                  className="object-cover blur-2xl sm:blur-3xl opacity-45 scale-110 pointer-events-none transition-opacity duration-500 animate-in fade-in"
                />
                {/* Primary Contained Artwork - Preserves 100% of characters & composition */}
                <Image
                  key={`stage-art-${page.imageUrl || currentPage}`}
                  src={getMediaUrl(page.imageUrl)}
                  alt={`Story scene ${currentPage + 1}`}
                  fill
                  unoptimized
                  className="object-contain drop-shadow-2xl transition-all duration-500 ease-out group-hover:scale-[1.02] animate-in fade-in zoom-in-95"
                  sizes="(max-width: 1600px) 100vw, 1600px"
                  priority={currentPage === 0}
                />
              </>
            ) : (
              <div
                className="w-full h-full bg-contain bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url('${defaultStageArtwork}')`,
                }}
              />
            )}

            {/* Soft Scrim Gradient Overlay */}
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-t from-surface-dim/85 via-transparent to-transparent pointer-events-none transition-opacity duration-300',
                isPlaying && !showControls ? 'opacity-0' : 'opacity-100'
              )}
            />

            {/* Directional Chevrons: Visible on hover/touch or paused */}
            <button
              type="button"
              aria-label="Previous scene"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPage();
              }}
              disabled={currentPage === 0}
              className={cn(
                'absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-surface-dim/80 backdrop-blur-md flex items-center justify-center text-on-surface transition-all duration-300 shadow-xl border border-white/10 z-20',
                !isPlaying || showControls ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none',
                currentPage === 0
                  ? 'opacity-20 cursor-not-allowed'
                  : 'hover:bg-stitch-secondary hover:text-on-secondary active:scale-95 cursor-pointer'
              )}
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
            <button
              type="button"
              aria-label="Next scene"
              onClick={(e) => {
                e.stopPropagation();
                handleNextPage();
              }}
              disabled={currentPage === totalPages - 1}
              className={cn(
                'absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-surface-dim/80 backdrop-blur-md flex items-center justify-center text-on-surface transition-all duration-300 shadow-xl border border-white/10 z-20',
                !isPlaying || showControls ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none',
                currentPage === totalPages - 1
                  ? 'opacity-20 cursor-not-allowed'
                  : 'hover:bg-stitch-secondary hover:text-on-secondary active:scale-95 cursor-pointer'
              )}
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* PROMINENT CENTRAL PLAY/PAUSE BUTTON:
                Only appears when paused, or when mouse hovers / user touches the video briefly */}
            <div
              className={cn(
                'absolute inset-0 flex flex-col items-center justify-center gap-3.5 z-20 transition-all duration-300 pointer-events-none',
                !isPlaying || showControls ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              )}
            >
              <div className="relative flex items-center justify-center pointer-events-auto">
                {isPlaying && (
                  <div className="absolute -inset-4 rounded-full bg-stitch-secondary/35 animate-ping pointer-events-none" />
                )}
                <button
                  type="button"
                  aria-label={isPlaying ? 'Pause storytelling narration' : 'Play story narration'}
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="relative w-18 h-18 sm:w-22 sm:h-22 p-5 rounded-full bg-stitch-secondary text-on-secondary flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer ring-4 ring-stitch-secondary/30"
                >
                  {isPlaying ? (
                    <Pause className="w-9 h-9 sm:w-11 sm:h-11 fill-on-secondary text-on-secondary" />
                  ) : (
                    <Play className="w-9 h-9 sm:w-11 sm:h-11 fill-on-secondary text-on-secondary ml-1" />
                  )}
                </button>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-surface-dim/90 backdrop-blur-md text-sm sm:text-base font-label-ui text-on-surface shadow-lg border border-white/10">
                {isPlaying ? 'Narration Active (Tap to Pause)' : 'Tap to Play Story Narration'}
              </span>
            </div>

            {/* TOP AUDIO TOOLBAR (Harmonized with StorybookModal - no small play button, placed at top) */}
            <div
              className={cn(
                'absolute top-3 sm:top-4 inset-x-3 sm:inset-x-6 flex flex-col gap-1.5 p-2 sm:px-4 sm:py-2.5 rounded-2xl bg-surface-dim/95 backdrop-blur-md border border-white/10 z-20 transition-all duration-300 shadow-xl',
                !isPlaying || showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3 text-xs">
                {/* Audio Narration Title & Timestamps */}
                <div className="flex flex-col min-w-0 pr-1">
                  <span className="font-label-ui font-semibold text-on-surface truncate text-xs sm:text-sm">
                    {topic.title} • {activeLanguage === 'de-CH' ? 'Audio-Gschicht' : 'Audio Narration'}
                  </span>
                  <span className="font-label-code text-[11px] sm:text-xs text-stitch-secondary">
                    {formatTime(currentTime)} / {formatTime(activeDuration)}
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
                    style={{ width: `${progressPercent}%` }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFullscreen();
                    }}
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
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Subtle Location Pill at Bottom Left */}
            <div
              className={cn(
                'absolute bottom-3 sm:bottom-4 left-3 sm:left-6 z-20 transition-all duration-300 pointer-events-none',
                !isPlaying || showControls ? 'opacity-100' : 'opacity-0'
              )}
            >
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-dim/80 backdrop-blur-md text-on-surface text-xs font-medium border border-white/10 shadow-md">
                <MapPin className="w-3.5 h-3.5 text-stitch-secondary" />
                <span>{topic.guidelineCategory?.[0] || 'Palace of Zazzau'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: EDITORIAL STORY READING PASSAGE */}
        <article className="mt-2 flex flex-col gap-6">
          {/* Stefan & Mr. Abeg Co-Creator Attribution for Understanding Colonisation */}
          {isColonisation && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 p-3.5 sm:px-5 sm:py-3 rounded-2xl bg-surface-container border border-emerald-500/30 text-xs sm:text-sm shadow-sm">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-foreground">
                  Created with Stefan Asemota &amp; Mr. Abeg
                </span>
                <span className="text-muted-foreground hidden sm:inline">•</span>
                <span className="text-muted-foreground text-xs">Osas &amp; The Sacred Bronze Staff</span>
              </div>
              <a
                href="https://www.youtube.com/@mr-abeg.japa.techie"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-stitch-secondary hover:underline font-medium group flex-shrink-0"
              >
                <span>Mr. Abeg on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          )}

          {/* Friendly Voice Reader Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-surface-container border border-outline-variant/30 shadow-md">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary-container flex items-center justify-center text-stitch-secondary flex-shrink-0">
                <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-label-ui text-sm sm:text-base text-on-surface font-semibold flex items-center gap-1.5">
                    {activeLanguage === 'de-CH' ? (
                      hasDeCHAudio ? (
                        lowerTitle.includes('river was') || lowerTitle.includes('always there') ? (
                          <>
                            <Music className="w-4 h-4 text-stitch-secondary" />
                            <span>Schwiizerdütsches Lied & Gschicht</span>
                          </>
                        ) : (
                          <>
                            <Mic className="w-4 h-4 text-stitch-secondary" />
                            <span>Schwiizerdütschi Audio-Gschicht</span>
                          </>
                        )
                      ) : (
                        <>
                          <Mic className="w-4 h-4 text-stitch-secondary" />
                          <span>Gschichteverzeller: Tante Heidi</span>
                        </>
                      )
                    ) : (
                      <>
                        <Mic className="w-4 h-4 text-stitch-secondary" />
                        <span>Storyteller: Uncle Aminu</span>
                      </>
                    )}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-label-code font-bold bg-stitch-secondary/20 text-stitch-secondary border border-stitch-secondary/40">
                    {activeLanguage === 'de-CH' ? 'CH-DE' : 'EN'}
                  </span>
                </div>
                <span className="font-body text-xs sm:text-sm text-on-surface-variant">
                  {activeLanguage === 'de-CH'
                    ? hasDeCHAudio
                      ? lowerTitle.includes('river was') || lowerTitle.includes('always there')
                        ? 'Traditionells Lied und Gschicht uf Schwiizerdütsch'
                        : 'Authentischi Audio-Vorläsig uf Schwiizerdütsch'
                      : 'Tante Heidi liist uf Schwiizerdütsch'
                    : 'Uncle Aminu is reading this story'}
                </span>
              </div>
            </div>
            <button
              type="button"
              className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-surface-bright text-on-surface text-sm sm:text-base font-label-ui hover:bg-surface-variant transition-colors font-medium border border-outline-variant/30 shadow-sm self-end sm:self-auto"
              onClick={cycleSpeed}
            >
              <span>{PLAYBACK_SPEEDS[speedIndex]}x {activeLanguage === 'de-CH' ? 'Tempo' : 'Speed'}</span>
            </button>
          </div>

          {/* Easy-to-read Story Text with Generous Typography */}
          <div className="flex flex-col gap-6 text-on-surface">
            <div className="text-lg sm:text-xl lg:text-2xl leading-relaxed sm:leading-loose text-on-surface whitespace-pre-line font-body font-normal">
              {firstLetter && (
                <span className="float-left text-5xl sm:text-6xl lg:text-7xl font-headline font-semibold text-stitch-secondary leading-none pr-4 pt-1">
                  {firstLetter}
                </span>
              )}
              {remainingText}
            </div>

            {/* Simplified Quote Card with Grand Typography & Dialect Marker Tag */}
            <div className="p-6 sm:p-8 rounded-2xl lg:rounded-3xl bg-surface-container my-2 border-l-4 sm:border-l-6 border-stitch-secondary shadow-lg">
              {activeLanguage === 'de-CH' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-stitch-secondary/20 text-stitch-secondary text-xs sm:text-sm font-label-code font-bold border border-stitch-secondary/40">
                  <Quote className="w-3.5 h-3.5" />
                  <span>Dialäkt-Zitat</span>
                </div>
              )}
              <p className="font-headline text-xl sm:text-2xl lg:text-3xl italic text-on-surface leading-relaxed sm:leading-snug">
                {activeLanguage === 'de-CH'
                  ? '“Mure schützed die, wo Angscht händ. Sicheri Handelswääg boued es starchs Rych uf. Mir müend fridlech mit üsne Nachbere zämeläbe und handle!”'
                  : '“Walls protect those who are scared. Safe trade routes build a strong kingdom. We must trade peacefully with our neighbors!”'}
              </p>
              <span className="font-label-code text-sm sm:text-base text-stitch-secondary block mt-3 font-semibold">
                {activeLanguage === 'de-CH'
                  ? '— Königin Amina vo Zazzau • Weisheit & Aafüahrig'
                  : '— Queen Amina of Zazzau • Leadership Wisdom'}
              </span>
            </div>

            {/* Inline Scene Continuation Bar (immediately after reading the passage) */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  handlePrevPage();
                  scrollToStage();
                }}
                disabled={currentPage === 0}
                className={cn(
                  'px-4 py-2.5 rounded-xl bg-surface-container text-on-surface font-label-ui text-sm font-semibold flex items-center gap-2 border border-outline-variant/30 transition-all',
                  currentPage === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:bg-surface-bright active:scale-95 cursor-pointer shadow-sm'
                )}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Scene</span>
              </button>

              <span className="font-label-code text-xs text-on-surface-variant font-medium">
                Scene {currentPage + 1} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() => {
                  if (currentPage < totalPages - 1) {
                    handleNextPage();
                    scrollToStage();
                  } else {
                    toast({
                      title: 'Story Completed!',
                      description: 'You have finished reading all scenes of this story.',
                    });
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-stitch-secondary hover:bg-secondary-container text-on-secondary font-label-ui text-sm font-bold flex items-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <span>
                  {currentPage < totalPages - 1
                    ? `Next Scene (${currentPage + 2}/${totalPages})`
                    : 'Completed'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </article>

        {/* SECTION 4: CRITICAL INQUIRY & CIVIC REFLECTION CARD */}
        <section className="mt-4">
          <div className="p-6 sm:p-8 rounded-2xl lg:rounded-3xl bg-surface-container shadow-xl flex flex-col gap-5 border border-outline-variant/30">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-stitch-secondary flex-shrink-0" />
              <h2 className="font-label-ui text-sm sm:text-base text-on-surface uppercase tracking-wider font-semibold">
                {activeLanguage === 'de-CH' ? 'Schnälli Frog für Dich' : 'Quick Question for You'}
              </h2>
            </div>
            <p className="font-headline text-2xl sm:text-3xl lg:text-4xl text-on-surface leading-snug font-semibold">
              {activeLanguage === 'de-CH'
                ? "Was hetsch Du gmacht, wenn Du d'Königin Amina wärsch gsi?"
                : 'What would you have done if you were Queen Amina?'}
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedPerspective('peace')}
                className={cn(
                  'w-full py-3.5 sm:py-4 px-4 sm:px-5 rounded-2xl font-label-ui text-base sm:text-lg lg:text-xl flex items-center justify-between text-left transition-all',
                  selectedPerspective === 'peace'
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-md'
                    : 'bg-surface-bright text-on-surface-variant hover:bg-surface-variant'
                )}
              >
                <span className="flex items-center gap-3 sm:gap-4">
                  <Handshake className="w-5 h-5 sm:w-6 sm:h-6 text-stitch-secondary flex-shrink-0" />
                  <span>
                    {activeLanguage === 'de-CH'
                      ? 'Fride wähle & offene Handel unterstütze'
                      : 'Choose peace and open trade'}
                  </span>
                </span>
                {selectedPerspective === 'peace' ? (
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-stitch-secondary flex-shrink-0" />
                ) : (
                  <span className="w-5 h-5 rounded-full border border-outline-variant flex-shrink-0" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedPerspective('walls')}
                className={cn(
                  'w-full py-3.5 sm:py-4 px-4 sm:px-5 rounded-2xl font-label-ui text-base sm:text-lg lg:text-xl flex items-center justify-between text-left transition-all',
                  selectedPerspective === 'walls'
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-md'
                    : 'bg-surface-bright text-on-surface-variant hover:bg-surface-variant'
                )}
              >
                <span className="flex items-center gap-3 sm:gap-4">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-stitch-secondary flex-shrink-0" />
                  <span>
                    {activeLanguage === 'de-CH'
                      ? 'Hinter de Palaschtmure in Sicherheit bliibe'
                      : 'Stay safe behind the palace fortress walls'}
                  </span>
                </span>
                {selectedPerspective === 'walls' ? (
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-stitch-secondary flex-shrink-0" />
                ) : (
                  <span className="w-5 h-5 rounded-full border border-outline-variant flex-shrink-0" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedPerspective('youth')}
                className={cn(
                  'w-full py-3.5 sm:py-4 px-4 sm:px-5 rounded-2xl font-label-ui text-base sm:text-lg lg:text-xl flex items-center justify-between text-left transition-all',
                  selectedPerspective === 'youth'
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-md'
                    : 'bg-surface-bright text-on-surface-variant hover:bg-surface-variant'
                )}
              >
                <span className="flex items-center gap-3 sm:gap-4">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-stitch-secondary flex-shrink-0" />
                  <span>
                    {activeLanguage === 'de-CH'
                      ? 'De Jugendroot zämetrummle für eigeni Lösige'
                      : 'Mobilize the youth council for homegrown solutions'}
                  </span>
                </span>
                {selectedPerspective === 'youth' ? (
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-stitch-secondary flex-shrink-0" />
                ) : (
                  <span className="w-5 h-5 rounded-full border border-outline-variant flex-shrink-0" />
                )}
              </button>
            </div>

            {/* Optional write-in reflection */}
            <div className="flex flex-col gap-3 pt-3 border-t border-outline-variant/30">
              <textarea
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                disabled={isSubmitted}
                placeholder={
                  activeLanguage === 'de-CH'
                    ? 'Schryb da dyni eigeni Gedanke zu däm Kapitel uf Schwiizerdütsch... (wird im Lernkreis teilt)'
                    : 'Share your personal reflection on this story chapter... (shared with your learning circle)'
                }
                rows={3}
                className="w-full rounded-2xl bg-surface-container-lowest p-4 sm:p-5 text-base sm:text-lg text-on-surface placeholder:text-on-surface-variant/60 border border-outline-variant/40 focus:outline-none focus:border-stitch-secondary transition-all resize-none"
              />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="font-label-code text-xs sm:text-sm text-on-surface-variant">
                  {activeLanguage === 'de-CH'
                    ? '+5 Bürgerpünkt gschickt übercho bim Spychere'
                    : '+5 Civic Points awarded upon saving'}
                </span>
                <button
                  type="button"
                  disabled={isSubmitted || (!selectedPerspective && !reflectionText.trim())}
                  onClick={() => {
                    setIsSubmitted(true);
                    toast({
                      title: activeLanguage === 'de-CH' ? 'Meinung gspeichert!' : 'Perspective Recorded!',
                      description:
                        activeLanguage === 'de-CH'
                          ? 'Dy Bytraag isch im Nationalarchiv ufgno worde. +5 Bürgerpünkt übercho.'
                          : 'Recorded in the National Cohesion Archives. +5 Civic Points awarded.',
                    });
                  }}
                  className={cn(
                    'px-6 py-2.5 rounded-full text-sm sm:text-base font-semibold flex items-center gap-2 transition-all shadow-md',
                    isSubmitted
                      ? 'bg-primary-container text-stitch-secondary'
                      : selectedPerspective || reflectionText.trim()
                      ? 'bg-stitch-secondary text-on-secondary hover:bg-secondary-container active:scale-95'
                      : 'bg-surface-bright text-on-surface-variant/40 cursor-not-allowed'
                  )}
                >
                  {isSubmitted ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{activeLanguage === 'de-CH' ? 'Meinung gspeichert' : 'Perspective Recorded'}</span>
                    </>
                  ) : (
                    <span>{activeLanguage === 'de-CH' ? 'Meinung spychere' : 'Submit Perspective'}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: HISTORICAL TIMELINE / RELATED ARCHIVAL RECORDS & PUBLICATIONS */}
        <section className="mt-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-label-ui text-sm sm:text-base text-on-surface-variant uppercase tracking-wider font-semibold">
              Related Archival Publications &amp; Storybooks
            </h3>
            <span className="font-label-code text-xs sm:text-sm text-stitch-secondary font-semibold">
              2 Publications Available
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Record Card 1: The Great Giants of Zazzau Illustrated Story Book */}
            <div
              onClick={() => {
                if (isPlaying && audioRef.current) {
                  audioRef.current.pause();
                  setIsPlaying(false);
                }
                setActiveStorybook({ ...ZAZZAU_BOOK, autoPlay: false });
              }}
              className="p-4 sm:p-5 rounded-2xl bg-surface-container flex flex-col justify-between gap-4 shadow-md border border-outline-variant/20 hover:border-stitch-secondary/60 transition-all duration-300 group hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex flex-col gap-3">
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-low relative">
                  <Image
                    src={getMediaUrl('/images/the-great-giants-of-zazzau-cover.png')}
                    alt="The Great Giants of Zazzau Book Cover by Stefan Asemota"
                    fill
                    unoptimized
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-2.5 right-2.5 px-3 py-1 rounded-full bg-surface-dim/90 backdrop-blur-md text-xs font-label-code text-stitch-secondary border border-stitch-secondary/40 flex items-center gap-1.5 shadow-lg">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Story Book</span>
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-code text-xs sm:text-sm text-stitch-secondary font-semibold">
                    OFFICIAL PUBLICATION • 2026
                  </span>
                  <h4 className="font-label-ui text-base sm:text-lg lg:text-xl text-on-surface truncate font-semibold group-hover:text-stitch-secondary transition-colors">
                    The Great Giants of Zazzau
                  </h4>
                  <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 mt-1">
                    By Stefan Asemota. Illustrated educational story book exploring Queen Amina, the historic city walls, and Nigerian heritage.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-label-code text-xs text-on-surface-variant">24 MB • PDF</span>
                  <div className="inline-flex items-center gap-1 p-0.5 rounded-md bg-surface-bright/80 border border-outline-variant/30 text-[10px]">
                    <span className="px-1.5 py-0.5 rounded bg-stitch-secondary text-on-secondary font-bold">
                      EN
                    </span>
                    <span
                      title="Swiss German narration coming soon"
                      className="px-1.5 py-0.5 rounded text-on-surface-variant/50 font-medium flex items-center gap-1 opacity-60 cursor-not-allowed"
                    >
                      <span>CH</span>
                      <span className="text-[8px] bg-surface-dim px-0.5 rounded">Soon</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isPlaying && audioRef.current) {
                        audioRef.current.pause();
                        setIsPlaying(false);
                      }
                      setActiveStorybook({ ...ZAZZAU_BOOK, autoPlay: true });
                    }}
                    title="Listen with Narration"
                    aria-label="Listen with Narration"
                    className="w-8 h-8 rounded-full bg-surface-bright hover:bg-surface-variant text-stitch-secondary flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isPlaying && audioRef.current) {
                        audioRef.current.pause();
                        setIsPlaying(false);
                      }
                      setActiveStorybook({ ...ZAZZAU_BOOK, autoPlay: false });
                    }}
                    title="Open Illustrated Book"
                    aria-label="Open Illustrated Book"
                    className="w-8 h-8 rounded-full bg-primary-container hover:bg-secondary-container text-on-primary-container flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Record Card 2: Arhuan: The Giant Prince of Benin Illustrated Story Book */}
            <div
              onClick={() => {
                if (isPlaying && audioRef.current) {
                  audioRef.current.pause();
                  setIsPlaying(false);
                }
                setActiveStorybook({ ...ARHUAN_BOOK, autoPlay: false });
              }}
              className="p-4 sm:p-5 rounded-2xl bg-surface-container flex flex-col justify-between gap-4 shadow-md border border-outline-variant/20 hover:border-stitch-secondary/60 transition-all duration-300 group hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex flex-col gap-3">
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-low relative">
                  <Image
                    src={getMediaUrl('/images/arhuan-the-giant-prince-of-benin-cover.png')}
                    alt="Arhuan: The Giant Prince of Benin Book Cover by Stefan Asemota"
                    fill
                    unoptimized
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-2.5 right-2.5 px-3 py-1 rounded-full bg-surface-dim/90 backdrop-blur-md text-xs font-label-code text-stitch-secondary border border-stitch-secondary/40 flex items-center gap-1.5 shadow-lg">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Story Book</span>
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-code text-xs sm:text-sm text-stitch-secondary font-semibold">
                    OFFICIAL PUBLICATION • 2026
                  </span>
                  <h4 className="font-label-ui text-base sm:text-lg lg:text-xl text-on-surface truncate font-semibold group-hover:text-stitch-secondary transition-colors">
                    Arhuan: The Giant Prince of Benin
                  </h4>
                  <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">
                    By Stefan Asemota. Inspired by{' '}
                    <a
                      href="https://youtu.be/I_xZDq9vj7c?si=jykeZn-g5xbh8qbw"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-amber-300 hover:text-amber-200 underline underline-offset-2 font-semibold inline-flex items-center gap-1"
                    >
                      <span>Mama Africa (Storytelling Video)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    , celebrating and honoring her captivating oral storytelling.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-label-code text-xs text-on-surface-variant">38 MB • PDF</span>
                  <div className="inline-flex items-center gap-1 p-0.5 rounded-md bg-surface-bright/80 border border-outline-variant/30 text-[10px]">
                    <span className="px-1.5 py-0.5 rounded bg-surface-dim text-on-surface-variant/80 font-medium">
                      EN
                    </span>
                    <span
                      title="Swiss German narration coming soon"
                      className="px-1.5 py-0.5 rounded text-on-surface-variant/50 font-medium flex items-center gap-1 opacity-60 cursor-not-allowed"
                    >
                      <span>CH</span>
                      <span className="text-[8px] bg-surface-dim px-0.5 rounded">Soon</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-surface-bright text-[11px] font-mono text-stitch-secondary/80">
                    Audio Soon
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isPlaying && audioRef.current) {
                        audioRef.current.pause();
                        setIsPlaying(false);
                      }
                      setActiveStorybook({ ...ARHUAN_BOOK, autoPlay: false });
                    }}
                    title="Open Illustrated Book"
                    aria-label="Open Illustrated Book"
                    className="w-8 h-8 rounded-full bg-primary-container hover:bg-secondary-container text-on-primary-container flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: CHAPTER NAVIGATION DOCK */}
        <nav aria-label="Chapter navigation dock" className="mt-8 flex items-center justify-between gap-3 sm:gap-4 pb-12">
          <button
            type="button"
            aria-label="Go to previous page"
            onClick={handleBottomPrev}
            disabled={currentPage === 0}
            className={cn(
              'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-surface-container text-on-surface flex items-center justify-center flex-shrink-0 transition-colors border border-outline-variant/30',
              currentPage === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-surface-bright active:scale-95 cursor-pointer shadow-md'
            )}
          >
            <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
          <button
            type="button"
            onClick={handleBottomContinue}
            className="flex-1 h-14 sm:h-16 rounded-2xl bg-stitch-secondary hover:bg-secondary-container text-on-secondary font-label-ui text-base sm:text-lg lg:text-xl font-semibold flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all cursor-pointer"
          >
            <span>{currentPage < totalPages - 1 ? `Continue Story (Scene ${currentPage + 2}/${totalPages})` : 'Story Completed'}</span>
            <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
          <button
            type="button"
            aria-label="Share story"
            title="Share Story"
            onClick={handleShare}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-surface-container hover:bg-surface-bright text-stitch-secondary flex items-center justify-center flex-shrink-0 transition-colors border border-outline-variant/30 active:scale-95 cursor-pointer shadow-md"
          >
            <Share2 className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </nav>
      </div>

      {/* STORY SHARE MODAL */}
      <ShareStoryModal
        story={{
          id: topic.id,
          title: topic.title,
          description: topic.description,
          imageUrl: topic.pages?.[0]?.imageUrl || (topic as any).imageUrl,
          categoryTag: Array.isArray(topic.guidelineCategory)
            ? topic.guidelineCategory[0]
            : topic.guidelineCategory,
        }}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* INTERACTIVE STORYBOOK SPREAD MODAL */}
      {activeStorybook && (
        <StorybookModal
          book={activeStorybook}
          onClose={() => setActiveStorybook(null)}
        />
      )}
    </div>
  );
}
