import type { Timestamp } from 'firebase/firestore';

export type GuidelineCategory =
  | 'Nigerian Solutions'
  | 'Critical Thinking'
  | 'Historical Context'
  | 'Unity & Identity';

export interface StoryPage {
  text: string;
  imageUrl: string;
  textDeCH?: string;
}

export interface StoryNarrationTrack {
  audioUrl?: string;
  narrator?: string;
  transcript?: string;
  quizPrompt?: string;
  quizOptions?: string[];
}

export interface WeeklyEducationalTopic {
  id: string;
  title: string;
  description: string;
  date: string; // Changed from Timestamp | Date to string
  guidelineCategory: GuidelineCategory[]; // Changed to an array of strings
  pages: StoryPage[];
  imageUrl?: string;
  audioUrl: string;
  audioUrlDeCH?: string;
  narration?: {
    en?: StoryNarrationTrack;
    'de-CH'?: StoryNarrationTrack;
  };
}
