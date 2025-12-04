import type { WeeklyEducationalTopic } from '@/types';
import { PlaceHolderImages } from './placeholder-images';

const topics: WeeklyEducationalTopic[] = [
  {
    id: '1',
    title: 'The Glass of Milk',
    description:
      'A metaphorical tale explaining the concept of corruption to young readers in a vibrant Nigerian setting.',
    date: new Date('2024-05-10').toISOString(),
    guidelineCategory: 'Nigerian Solutions',
    pages: [
      {
        text: 'The Glass of Milk" for a reader aged 7-12. This story, written by \'NaijaSpeak,\' uses the metaphors of watery milk and sandy water in a vibrant Nigerian setting to explain the concept of corruption.',
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
    description:
      'Discover the rich history and artistic mastery of the ancient Benin Kingdom and its famous bronze sculptures.',
    date: new Date('2024-05-03').toISOString(),
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
    description:
      'An engaging exploration into the world of economics, explaining the reasons behind different national currencies.',
    date: new Date('2024-04-26').toISOString(),
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
    description:
      'A celebration of the many cultures within Nigeria and how they combine to create a unique national identity.',
    date: new Date('2024-04-19').toISOString(),
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
  const topic = topics.find((topic) => topic.id === id);
  if (!topic) return undefined;

  // This is a temporary solution to handle the fact that the mock data has a mix of types.
  // In a real app, the data from Firestore would be consistent.
  const date = new Date(topic.date).toISOString();

  return { ...topic, date: date };
}
