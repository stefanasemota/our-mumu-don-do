'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Flame,
  Star,
  Play,
  BookOpen,
  ArrowRight,
  Compass,
  Headphones,
  Music,
  Brain,
  Bookmark,
  Volume2,
  X,
  Mic,
  ChevronRight,
  Crown,
  Landmark,
  Sparkles,
  Swords,
  Clock,
  Gift,
  Unlock,
  Award,
} from 'lucide-react';
import type { WeeklyEducationalTopic } from '@/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { StorybookModal, type StorybookBookData } from '../story/StorybookModal';

interface KidsEditionProps {
  topics?: WeeklyEducationalTopic[];
}

export type ThemeArchetype = 'all' | 'kings-warriors' | 'riddles-mysteries' | 'ancient-wonders';

interface StoryItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  archetype: ThemeArchetype;
  archetypeLabel: string;
  categoryTag?: string;
  imageUrl: string;
  audioUrl?: string;
  audioUrlDeCH?: string;
  duration: string;
  ageRange?: string;
  badgeLabel?: string;
  badgeType?: 'audio' | 'top-pick' | 'quiz' | 'book';
  hasQuiz?: boolean;
  hasStorybook?: boolean;
  storybookData?: StorybookBookData;
  isSpotlight?: boolean;
}

const ZAZZAU_BOOK: StorybookBookData = {
  title: 'The Great Giants of Zazzau',
  author: 'By Stefan Asemota • Official Illustrated Edition',
  pdfUrl: '/books/the-great-giants-of-zazzau.pdf',
  downloadName: 'The_Great_Giants_of_Zazzau.pdf',
  audioUrl: '/audio/The_Great_Giants_of_Zazzau.mp3',
  audioTitle: 'Audio Narration • The Great Giants of Zazzau',
  pages: Array.from({ length: 9 }, (_, i) => `/books/zazzau/page-${i + 1}.jpg`),
};

const ARHUAN_BOOK: StorybookBookData = {
  title: 'Arhuan: The Giant Prince of Benin',
  author: 'By Stefan Asemota • Inspired by Mama Africa',
  pdfUrl: '/books/arhuan-the-giant-prince-of-benin.pdf',
  downloadName: 'Arhuan_The_Giant_Prince_of_Benin.pdf',
  audioUrl: '/audio/Arhuan_The_Giant_Prince_of_Benin.mp3',
  audioTitle: 'Audio Narration • Arhuan: The Giant Prince of Benin',
  inspirationUrl: 'https://youtu.be/I_xZDq9vj7c?si=jykeZn-g5xbh8qbw',
  inspirationTitle: "Watch Mama Africa's Storytelling Video",
  pages: Array.from({ length: 12 }, (_, i) => `/books/arhuan/page-${i + 1}.jpg`),
};

// Authoritative Catalog: Only the 8 REAL existing stories in Our Mumu Don Do
const REAL_STORIES_CATALOG: StoryItem[] = [
  // SHELF 1: BRAVE KINGS, QUEENS & WARRIORS
  {
    id: 'the-great-giants-of-zazzau',
    title: 'The Great Giants of Zazzau',
    subtitle: 'Queen Amina: Warrior of Zazzau',
    categoryTag: 'Northern Kingdom',
    description:
      'Ride across the golden savannah with Queen Amina! Discover how brave strategy, towering earthen fortress walls, and safe trade routes protected her people.',
    archetype: 'kings-warriors',
    archetypeLabel: 'Kings & Warriors',
    imageUrl: '/images/the-great-giants-of-zazzau-cover.png',
    audioUrl: '/audio/The_Great_Giants_of_Zazzau.mp3',
    duration: '8 mins',
    ageRange: 'Ages 7–10',
    badgeLabel: 'Illustrated Book',
    badgeType: 'book',
    hasQuiz: true,
    hasStorybook: true,
    storybookData: ZAZZAU_BOOK,
    isSpotlight: true,
  },
  {
    id: '3',
    title: "The King's Signature",
    subtitle: 'King Duke Ephraim & The Law of 1855',
    categoryTag: 'Calabar Kingdom',
    description:
      'King Duke Ephraim signed the life-saving law in 1855, serving as the Architect of change 21 years before Mary Slessor arrived as Caretaker.',
    archetype: 'kings-warriors',
    archetypeLabel: 'Kings & Warriors',
    imageUrl: '/images/the-kings-signature/page_0.png',
    audioUrl: '/audio/The-Kings-Signature.mp3',
    audioUrlDeCH: '/audio/The_Kings_Signature_ch.mp3',
    duration: '6 mins',
    ageRange: 'Ages 7–10',
    badgeLabel: 'Top Pick',
    badgeType: 'top-pick',
    hasQuiz: true,
  },
  {
    id: '5',
    title: 'We were never lost',
    subtitle: 'King Jaja of Opobo & The Place of Promise',
    categoryTag: 'Delta Kingdom',
    description:
      'How young Mbanaso used intellect and vision to rise into King Jaja of Opobo, proving your vision is the only compass you need to navigate the world.',
    archetype: 'kings-warriors',
    archetypeLabel: 'Kings & Warriors',
    imageUrl: '/images/we-were-never-lost/0.jpg',
    audioUrl: '/audio/we-were-never-lost.mp3',
    duration: '9 mins',
    ageRange: 'Ages 8–11',
    badgeLabel: 'Top Pick',
    badgeType: 'top-pick',
    hasQuiz: false,
  },
  {
    id: 'arhuan-the-giant-prince-of-benin',
    title: 'Arhuan: The Giant Prince of Benin',
    subtitle: 'Inspired by Mama Africa',
    categoryTag: 'Benin Kingdom',
    description:
      'The epic legend of Prince Arhuan, the giant prince of Benin Kingdom whose immense strength was guided by royal courage and ancestral wisdom.',
    archetype: 'kings-warriors',
    archetypeLabel: 'Kings & Warriors',
    imageUrl: '/images/arhuan-the-giant-prince-of-benin-cover.png',
    audioUrl: '/audio/Arhuan_The_Giant_Prince_of_Benin.mp3',
    duration: '10 mins',
    ageRange: 'Ages 7–10',
    badgeLabel: 'Mama Africa',
    badgeType: 'book',
    hasQuiz: true,
    hasStorybook: true,
    storybookData: ARHUAN_BOOK,
  },

  // SHELF 2: MYSTERIES & SMART RIDDLES
  {
    id: '1',
    title: 'The Glass of Milk',
    subtitle: 'Corruption, Honesty & The Community Glass',
    categoryTag: 'Critical Thinking',
    description:
      'Uses the metaphors of watery milk and sandy water in a vibrant Nigerian setting to teach honesty, critical thinking, and civic integrity.',
    archetype: 'riddles-mysteries',
    archetypeLabel: 'Riddles & Mysteries',
    imageUrl: '/images/the-glass-of-milk/page_0.png',
    audioUrl: '/audio/The-Glass-of-Milk.mp3',
    duration: '5 mins',
    badgeLabel: 'Quiz',
    badgeType: 'quiz',
    hasQuiz: true,
  },
  {
    id: '6',
    title: 'The River of a Thousand Songs',
    subtitle: 'Confluence of Lokoja & Harmony of Cultural Streams',
    categoryTag: 'Unity & Identity',
    description:
      'At the meeting of the waters, an old fisherman’s riddle reveals how diverse Nigerian traditions flow together as one mighty river.',
    archetype: 'riddles-mysteries',
    archetypeLabel: 'Riddles & Mysteries',
    imageUrl: '/images/the-river-of-songs/0.jpg',
    audioUrl: '/audio/The-River-of-a-Thousand-Songs.mp3',
    duration: '7 mins',
    badgeLabel: 'Audio',
    badgeType: 'audio',
    hasQuiz: true,
  },

  // SHELF 3: WONDERS & ANCIENT KINGDOMS
  {
    id: '2',
    title: 'The River Was Always There',
    subtitle: 'African Knowledge & The Great River Niger',
    categoryTag: 'Historical Context',
    description:
      'Corrects the myth about the "discovery" of the River Niger, celebrating the African fishermen and navigators who always knew its waters.',
    archetype: 'ancient-wonders',
    archetypeLabel: 'Historical Context',
    imageUrl: '/images/the-river-was-always-there/page_1.png',
    audioUrl: '/audio/The-River-was-always-there.mp3',
    audioUrlDeCH: '/audio/de_The_River_was_always_there.mp3',
    duration: '8 mins',
    badgeLabel: 'Top Pick',
    badgeType: 'top-pick',
    hasQuiz: false,
  },
  {
    id: '4',
    title: 'Understanding Colonisation',
    subtitle: 'Created with Stefan & Mr. Abeg (@mr-abeg.japa.techie)',
    categoryTag: 'Historical Context',
    description:
      'Created with Stefan & Mr. Abeg. Osas discovers an ancient picture of a royal rattle staff and learns how remembering our true history empowers the next generation.',
    archetype: 'ancient-wonders',
    archetypeLabel: 'Historical Context',
    imageUrl: '/images/understanding-colonisation/Osa-1.jpeg',
    audioUrl: '/audio/Colonisation.mp3',
    audioUrlDeCH: '/audio/Colonisation_ch.mp3',
    duration: '8 mins',
    badgeLabel: 'Top Pick',
    badgeType: 'top-pick',
    hasQuiz: false,
  },
];

const THEME_PILLS: { id: ThemeArchetype; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'kings-warriors', label: 'Kings & Warriors', icon: Crown },
  { id: 'riddles-mysteries', label: 'Riddles & Mysteries', icon: Search },
  { id: 'ancient-wonders', label: 'Historical Wonders', icon: Landmark },
];

export function DiscoverStoriesKidsEdition({ topics }: KidsEditionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<ThemeArchetype>('all');
  const [activeStorybook, setActiveStorybook] = useState<StorybookBookData | null>(null);

  // Daily Riddle Reveal State
  const [isRiddleCracked, setIsRiddleCracked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [resumeText, setResumeText] = useState('Resume Chapter');

  const { toast } = useToast();

  // Filtered stories from the authoritative real catalog
  const filteredStories = useMemo(() => {
    return REAL_STORIES_CATALOG.filter((story) => {
      const matchesSearch =
        searchQuery === '' ||
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (story.subtitle && story.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTheme =
        selectedTheme === 'all' || story.archetype === selectedTheme;

      return matchesSearch && matchesTheme;
    });
  }, [searchQuery, selectedTheme]);

  const warriorStories = filteredStories.filter((s) => s.archetype === 'kings-warriors');
  const riddleStories = filteredStories.filter((s) => s.archetype === 'riddles-mysteries');
  const wonderStories = filteredStories.filter((s) => s.archetype === 'ancient-wonders');

  const handleCrackRiddle = () => {
    setIsRiddleCracked(true);
    toast({
      title: 'Riddle Solved!',
      description: '+50 Explorer XP awarded! You unlocked the Daily Curious Badge.',
    });
  };

  const handleAudioPreview = () => {
    setIsPlayingPreview(true);
    toast({
      title: 'Now Playing Audio Preview',
      description: 'The Legend of Queen Amina of Zazzau',
    });
    setTimeout(() => {
      setIsPlayingPreview(false);
    }, 3000);
  };

  const handleResumeClick = () => {
    setResumeText('Loading Quest...');
    setTimeout(() => {
      setResumeText('Quest Ready!');
    }, 400);
  };

  return (
    <div className="w-full flex flex-col gap-6 text-on-surface">
      {/* 1. KID HERO BANNER & WARM EXPLORER GREETING */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <h1 className="font-headline-sm text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
              Hi, Little Champion!
            </h1>
            <p className="font-body-sm text-sm sm:text-base text-on-surface-variant truncate">
              Pick your quest across ancient kingdoms!
            </p>
          </div>

          {/* Playful Kid Quest Badges */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5 bg-surface-container-high px-3 py-1.5 rounded-full shadow-sm">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-label-code text-xs sm:text-sm text-stitch-secondary font-semibold">
                3-Day Quest
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-primary-container/40 px-3 py-1.5 rounded-full">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-label-code text-xs sm:text-sm text-secondary font-semibold">
                Lvl 2
              </span>
            </div>
          </div>
        </div>

        {/* Kid-Friendly Search Bar */}
        <div className="relative w-full mt-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stitch-secondary">
            <Compass className="w-5 h-5 text-stitch-secondary" />
          </div>
          <input
            aria-label="Search stories"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-sm text-sm sm:text-base rounded-xl pl-11 pr-12 py-3.5 outline-none focus:bg-surface-container focus:ring-1 focus:ring-stitch-secondary/40 transition-all shadow-inner"
            placeholder="Search brave warriors, riddles, ancient history..."
            type="search"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant hover:text-stitch-secondary transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => toast({ title: 'Microphone Activated', description: 'Speak the name of a hero or kingdom!' })}
              aria-label="Voice Search"
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant hover:text-stitch-secondary transition-colors"
            >
              <Mic className="w-4 h-4" />
            </button>
          )}
        </div>
      </section>

      {/* 2. JUMP BACK IN: ACTIVE READING QUEST */}
      <section>
        <div className="bg-surface-container rounded-2xl p-4 sm:p-5 shadow-md flex flex-col gap-3 relative overflow-hidden border border-outline-variant/20">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-primary-container/20 blur-xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-stitch-secondary animate-pulse" />
              <span className="font-label-code text-xs uppercase tracking-wider text-stitch-secondary font-semibold">
                Continue Your Quest
              </span>
            </div>
            <span className="font-label-code text-xs text-on-surface-variant">Chapter 2 of 4</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-sm bg-surface-container-high border border-outline-variant/30">
              <Image
                src="/images/the-great-giants-of-zazzau-cover.png"
                alt="Queen Amina Quest Artwork"
                fill
                className="object-cover"
                sizes="80px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent" />
              <span className="absolute bottom-1 left-1 font-label-code text-[10px] text-stitch-secondary px-1.5 py-0.5 rounded bg-surface-container-lowest/90 font-bold">
                50%
              </span>
            </div>

            <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
              <div className="min-w-0">
                <h2 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface truncate leading-snug">
                  The Great Giants of Zazzau
                </h2>
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant line-clamp-1 mt-0.5">
                  Queen Amina: Warrior of Zazzau
                </p>
              </div>

              <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden my-2.5">
                <div
                  className="bg-gradient-to-r from-stitch-primary to-stitch-secondary h-full rounded-full transition-all shadow-[0_0_8px_rgba(74,225,118,0.5)]"
                  style={{ width: '50%' }}
                />
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/story/the-great-giants-of-zazzau"
                  onClick={handleResumeClick}
                  className="flex items-center justify-center gap-2 bg-primary-container hover:bg-secondary-container active:scale-95 text-on-primary font-label-ui text-xs sm:text-sm px-4 py-2 rounded-xl transition-all shadow-sm w-fit font-semibold"
                >
                  <Play className="w-4 h-4 fill-on-primary" />
                  <span>{resumeText}</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setActiveStorybook({ ...ZAZZAU_BOOK, autoPlay: true })}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-bright hover:bg-surface-variant text-stitch-secondary font-label-ui text-xs font-semibold border border-outline-variant/30 transition-all cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Book</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FUN ARCHETYPE FILTER PILLS */}
      <section className="overflow-x-auto no-scrollbar flex items-center gap-2.5 pb-1">
        <button
          type="button"
          onClick={() => setSelectedTheme('all')}
          className={cn(
            'flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-ui text-xs sm:text-sm whitespace-nowrap shadow-sm flex-shrink-0 active:scale-95 transition-all cursor-pointer',
            selectedTheme === 'all'
              ? 'bg-primary-container text-on-primary-container font-semibold ring-1 ring-stitch-secondary/40'
              : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
          )}
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
          <span>All Quests</span>
        </button>

        {THEME_PILLS.map((pill) => {
          const isActive = selectedTheme === pill.id;
          const IconComponent = pill.icon;
          return (
            <button
              key={pill.id}
              type="button"
              onClick={() => setSelectedTheme(isActive ? 'all' : pill.id)}
              className={cn(
                'flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-ui text-xs sm:text-sm whitespace-nowrap shadow-sm flex-shrink-0 active:scale-95 transition-all cursor-pointer',
                isActive
                  ? 'bg-primary-container text-on-primary-container font-semibold ring-1 ring-stitch-secondary/40'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              )}
            >
              <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{pill.label}</span>
            </button>
          );
        })}
      </section>

      {/* 4. FEATURED HERO ADVENTURE CARD */}
      {(selectedTheme === 'all' || selectedTheme === 'kings-warriors') && (
        <section>
          <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-surface-container flex flex-col border border-outline-variant/20 group">
            <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-surface-container-low">
              <Image
                src="/images/the-great-giants-of-zazzau-cover.png"
                alt="The Great Giants of Zazzau Cover"
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 80vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/60 to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="bg-surface-container-lowest/80 backdrop-blur-md px-2.5 py-1 rounded-full font-label-code text-xs text-stitch-secondary font-bold shadow-sm inline-flex items-center gap-1.5">
                  <Swords className="w-3.5 h-3.5" />
                  <span>Epic Adventure</span>
                </span>
                <span className="bg-surface-container-lowest/80 backdrop-blur-md px-2.5 py-1 rounded-full font-label-code text-xs text-on-surface font-medium shadow-sm inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>8 mins</span>
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsBookmarked(!isBookmarked);
                  toast({
                    title: !isBookmarked ? 'Saved to Favorite Quests!' : 'Removed from Favorites',
                  });
                }}
                aria-label="Save to favorite quests"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface-variant hover:text-stitch-secondary flex items-center justify-center transition-colors cursor-pointer"
              >
                <Bookmark className={cn('w-4 h-4', isBookmarked && 'fill-stitch-secondary text-stitch-secondary')} />
              </button>
            </div>

            <div className="p-4 sm:p-5 flex flex-col gap-2 -mt-4 relative z-10">
              <div className="flex items-center gap-1.5 text-stitch-secondary">
                <Star className="w-4 h-4 fill-stitch-secondary text-stitch-secondary" />
                <span className="font-label-code text-xs uppercase tracking-wider font-semibold">
                  Featured Champion Tale
                </span>
              </div>

              <h2 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface">
                The Great Giants of Zazzau
              </h2>

              <p className="font-body-md text-sm sm:text-base text-on-surface-variant line-clamp-2">
                Ride into the golden savannah with Queen Amina! Discover how brave strategy, safe trade routes, and towering clay walls protected her people.
              </p>

              <div className="pt-2 flex items-center justify-between gap-3">
                <Link
                  href="/story/the-great-giants-of-zazzau"
                  className="flex-1 flex items-center justify-center gap-2 bg-stitch-primary hover:bg-stitch-secondary text-on-primary font-label-ui text-sm sm:text-base py-3 px-4 rounded-xl shadow-md active:scale-98 transition-all font-semibold"
                >
                  <Play className="w-5 h-5 fill-on-primary" />
                  <span>Start Adventure</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setActiveStorybook({ ...ZAZZAU_BOOK, autoPlay: true })}
                  className="px-4 py-3 rounded-xl bg-surface-bright hover:bg-surface-variant text-stitch-secondary font-label-ui text-sm font-semibold border border-outline-variant/30 flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  title="Open Illustrated Story Book"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Read Book</span>
                </button>

                <button
                  type="button"
                  onClick={handleAudioPreview}
                  aria-label="Listen to Audio Story"
                  className="w-12 h-12 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-stitch-secondary flex items-center justify-center flex-shrink-0 active:scale-95 transition-all shadow-sm cursor-pointer border border-outline-variant/30"
                >
                  <Volume2 className={cn('w-5 h-5', isPlayingPreview && 'animate-pulse text-stitch-secondary')} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. SHELF 1: BRAVE KINGS, QUEENS & WARRIORS */}
      {warriorStories.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-headline text-lg sm:text-xl font-bold text-on-surface">
              Brave Kings, Queens &amp; Warriors
            </h3>
            <span className="font-label-code text-xs text-stitch-secondary flex items-center gap-0.5">
              <span>{warriorStories.length} Quests</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="overflow-x-auto no-scrollbar flex items-stretch gap-4 pb-2">
            {warriorStories.map((story) => (
              <article
                key={story.id}
                className="w-64 bg-surface-container rounded-xl overflow-hidden flex flex-col flex-shrink-0 shadow-md border border-outline-variant/20 hover:bg-surface-container-high transition-colors group"
              >
                <div className="relative w-full h-36 bg-surface-container-low">
                  <Image
                    src={story.imageUrl}
                    alt={story.title}
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    sizes="256px"
                  />
                  {story.badgeLabel && (
                    <span className="absolute top-2 left-2 bg-surface-container-lowest/80 backdrop-blur-md px-2 py-0.5 rounded-md font-label-code text-[11px] text-tertiary flex items-center gap-1 font-medium shadow-sm">
                      {story.badgeType === 'top-pick' && <Star className="w-3 h-3 fill-stitch-secondary text-stitch-secondary" />}
                      {story.badgeType === 'book' && <BookOpen className="w-3 h-3 text-stitch-secondary" />}
                      <span>{story.badgeLabel}</span>
                    </span>
                  )}
                  <span className="absolute bottom-2 right-2 bg-surface-container-lowest/80 backdrop-blur-md px-2 py-0.5 rounded-md font-label-code text-[11px] text-on-surface-variant font-medium">
                    {story.duration}
                  </span>
                </div>

                <div className="p-3.5 flex flex-col flex-1 justify-between gap-2">
                  <div>
                    <span className="font-label-code text-xs text-stitch-secondary font-medium">
                      {story.categoryTag || story.subtitle || 'Adventure'}
                    </span>
                    <h4 className="font-headline text-base font-bold text-on-surface line-clamp-1 mt-0.5 group-hover:text-stitch-secondary transition-colors">
                      {story.title}
                    </h4>
                    <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 mt-1">
                      {story.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-label-code text-[11px] text-on-surface-variant">
                      {story.ageRange || 'Ages 7–10'}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {story.hasStorybook && story.storybookData && (
                        <button
                          type="button"
                          onClick={() => setActiveStorybook(story.storybookData!)}
                          className="px-2.5 py-1 rounded-lg bg-surface-bright hover:bg-surface-variant text-stitch-secondary text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                          title="Open Illustrated Book"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>Book</span>
                        </button>
                      )}

                      <Link
                        href={`/story/${story.id}`}
                        className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center hover:bg-secondary-container transition-colors shadow-sm"
                        aria-label={`Play ${story.title}`}
                      >
                        <Play className="w-4 h-4 fill-on-primary-container" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 6. SHELF 2: MYSTERIES & SMART RIDDLES */}
      {riddleStories.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-headline text-lg sm:text-xl font-bold text-on-surface">
              Mysteries &amp; Smart Riddles
            </h3>
            <span className="font-label-code text-xs text-stitch-secondary flex items-center gap-0.5">
              <span>{riddleStories.length} Quests</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {riddleStories.map((story) => (
              <div
                key={story.id}
                className="bg-surface-container rounded-xl p-3.5 flex items-center gap-4 hover:bg-surface-container-high transition-colors shadow-sm border border-outline-variant/20"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-low relative border border-outline-variant/30">
                  <Image
                    src={story.imageUrl}
                    alt={story.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                  <div className="absolute bottom-1 left-1 bg-surface-container-lowest/80 px-1.5 py-0.5 rounded text-[10px] text-stitch-secondary font-bold font-label-code inline-flex items-center gap-1">
                    {story.badgeType === 'quiz' ? (
                      <>
                        <Brain className="w-3 h-3" />
                        <span>Quiz</span>
                      </>
                    ) : (
                      <>
                        <Headphones className="w-3 h-3" />
                        <span>Audio</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-label-code text-xs text-stitch-secondary font-medium">
                      {story.categoryTag || 'Detective Mystery'}
                    </span>
                    <span className="text-on-surface-variant text-xs">•</span>
                    <span className="font-label-code text-xs text-on-surface-variant">
                      {story.duration}
                    </span>
                  </div>
                  <h4 className="font-headline text-base font-bold text-on-surface truncate mt-0.5">
                    {story.title}
                  </h4>
                  <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant line-clamp-1 mt-0.5">
                    {story.description}
                  </p>
                </div>

                <Link
                  href={`/story/${story.id}`}
                  className="w-10 h-10 rounded-xl bg-surface-container-high hover:bg-primary-container text-stitch-secondary flex items-center justify-center flex-shrink-0 transition-colors shadow-sm cursor-pointer"
                  aria-label={`Play ${story.title}`}
                >
                  {story.badgeType === 'quiz' ? (
                    <Brain className="w-5 h-5 text-stitch-secondary" />
                  ) : (
                    <Music className="w-5 h-5 text-stitch-secondary" />
                  )}
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. SHELF 3: WONDERS & ANCIENT KINGDOMS */}
      {wonderStories.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-headline text-lg sm:text-xl font-bold text-on-surface">
              Wonders &amp; Ancient Kingdoms
            </h3>
            <span className="font-label-code text-xs text-stitch-secondary flex items-center gap-0.5">
              <span>{wonderStories.length} Quests</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {wonderStories.map((wonder) => (
              <div
                key={wonder.id}
                className="bg-surface-container rounded-xl overflow-hidden shadow-md flex flex-col border border-outline-variant/20 hover:bg-surface-container-high transition-colors group"
              >
                <div className="relative w-full h-36 bg-surface-container-low">
                  <Image
                    src={wonder.imageUrl}
                    alt={wonder.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <span className="absolute top-2 left-2 bg-surface-container-lowest/80 px-2 py-0.5 rounded font-label-code text-[11px] text-stitch-secondary font-bold shadow-sm">
                    {wonder.badgeLabel || 'Historical'}
                  </span>
                </div>

                <div className="p-3.5 flex flex-col flex-1 justify-between gap-2.5">
                  <div>
                    <h4 className="font-headline text-base font-bold leading-tight text-on-surface">
                      {wonder.title}
                    </h4>
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed line-clamp-2 mt-1">
                      {wonder.description}
                    </p>
                  </div>

                  <Link
                    href={`/story/${wonder.id}`}
                    className="w-full py-2 rounded-lg bg-surface-container-high hover:bg-primary-container text-on-surface hover:text-on-primary font-label-code text-xs font-semibold transition-colors flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>Read Tale</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. KID DAILY MYSTERY RIDDLE CARD (Interactive Moment of Delight) */}
      <section className="pt-2 pb-6">
        <div className="bg-gradient-to-br from-surface-container-high to-surface-container rounded-2xl p-5 sm:p-6 shadow-lg relative overflow-hidden flex flex-col gap-3.5 border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-stitch-secondary" />
              <span className="font-label-code text-xs sm:text-sm text-stitch-secondary font-bold uppercase tracking-wider">
                Today&apos;s Mystery Riddle
              </span>
            </div>
            <div className="bg-surface-container-lowest px-2.5 py-1 rounded-full text-stitch-secondary font-label-code text-xs font-bold border border-stitch-secondary/30">
              +50 Explorer XP
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-headline text-lg sm:text-xl text-on-surface italic leading-snug">
              &ldquo;What can travel all around the world, yet always stays in the exact same corner?&rdquo;
            </p>
            <span className="font-label-code text-xs text-on-surface-variant">
              Hint: It loves sending messages on ancient envelopes!
            </span>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            {!isRiddleCracked ? (
              <button
                type="button"
                onClick={handleCrackRiddle}
                className="w-full bg-stitch-primary hover:bg-stitch-secondary text-on-primary font-label-ui text-sm sm:text-base py-3 rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all font-semibold cursor-pointer"
              >
                <span>Crack The Riddle</span>
                <Unlock className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <div className="bg-surface-container-lowest rounded-xl p-4 flex flex-col gap-1.5 items-center text-center animate-fadeIn border border-stitch-secondary/40 shadow-inner">
                <Award className="w-8 h-8 text-amber-500 animate-bounce" />
                <p className="font-headline text-lg text-stitch-secondary font-bold">
                  Answer: A Postage Stamp!
                </p>
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
                  Awesome job! You earned your Daily Curious Badge!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* STORYBOOK SPREAD MODAL */}
      {activeStorybook && (
        <StorybookModal
          book={activeStorybook}
          onClose={() => setActiveStorybook(null)}
        />
      )}
    </div>
  );
}
