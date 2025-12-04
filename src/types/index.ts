import type { Timestamp } from 'firebase/firestore';

export type GuidelineCategory =
  | 'Nigerian Solutions'
  | 'Critical Thinking'
  | 'Historical Context'
  | 'Unity & Identity';

export interface StoryPage {
  text: string;
  imageUrl: string;
  audioUrl: string;
}

export interface WeeklyEducationalTopic {
  id: string;
  title: string;
  date: string; // Changed from Timestamp | Date to string
  guidelineCategory: GuidelineCategory;
  pages: StoryPage[];
}
