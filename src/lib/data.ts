import type { WeeklyEducationalTopic } from '@/types';
import { Timestamp } from 'firebase/firestore';
import { PlaceHolderImages } from './placeholder-images';

const topics: WeeklyEducationalTopic[] = [
  {
    id: '1',
    title: 'The Rise of Tech in Lagos',
    date: Timestamp.fromDate(new Date('2024-05-10')),
    guidelineCategory: 'Nigerian Solutions',
    pages: [
      {
        text: 'Lagos is becoming a huge tech hub in Africa, with many new companies starting up.',
        imageUrl:
          PlaceHolderImages.find((p) => p.id === 'topic-nigerian-solutions')
            ?.imageUrl || 'https://picsum.photos/seed/201/800/600',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'These companies create jobs and solve local problems with new ideas.',
        imageUrl:
          PlaceHolderImages.find((p) => p.id === 'story-page-2')?.imageUrl ||
          'https://picsum.photos/seed/202/800/600',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
    ],
  },
  {
    id: '2',
    title: 'Benin Kingdom: A Legacy in Bronze',
    date: Timestamp.fromDate(new Date('2024-05-03')),
    guidelineCategory: 'Historical Context',
    pages: [
      {
        text: 'The Benin Kingdom was famous for its amazing bronze sculptures.',
        imageUrl:
          PlaceHolderImages.find((p) => p.id === 'topic-historical-context')
            ?.imageUrl || 'https://picsum.photos/seed/203/800/600',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
    ],
  },
  {
    id: '3',
    title: 'Why Do We Have Different Currencies?',
    date: Timestamp.fromDate(new Date('2024-04-26')),
    guidelineCategory: 'Critical Thinking',
    pages: [
      {
        text: "Let's explore why different countries use different money.",
        imageUrl:
          PlaceHolderImages.find((p) => p.id === 'topic-critical-thinking')
            ?.imageUrl || 'https://picsum.photos/seed/204/800/600',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
    ],
  },
  {
    id: '4',
    title: 'The Strength in Our Diversity',
    date: Timestamp.fromDate(new Date('2024-04-19')),
    guidelineCategory: 'Unity & Identity',
    pages: [
      {
        text: 'Nigeria has many different cultures, and that makes our country special.',
        imageUrl:
          PlaceHolderImages.find((p) => p.id === 'topic-unity-identity')
            ?.imageUrl || 'https://picsum.photos/seed/205/800/600',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
    ],
  },
];

export async function getTopics(): Promise<WeeklyEducationalTopic[]> {
  // In a real app, you'd fetch this from Firestore
  return Promise.resolve(topics);
}

export async function getTopicById(
  id: string
): Promise<WeeklyEducationalTopic | undefined> {
  // In a real app, you'd fetch this from Firestore
  return Promise.resolve(topics.find((topic) => topic.id === id));
}
