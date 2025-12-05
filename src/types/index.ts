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
  description: string;
  date: string; // Changed from Timestamp | Date to string
  guidelineCategory: GuidelineCategory;
  pages: StoryPage[];
}

export interface FeaturedVideo {
  id: string;
  title: string;
  summary: string;
  videoUrl: string;
  thumbnailUrl: string;
  videographer?: string;
}
