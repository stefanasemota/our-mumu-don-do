import type { WeeklyEducationalTopic } from '@/types';
import { PlaceHolderImages } from './placeholder-images';

const topics: WeeklyEducationalTopic[] = [
  {
    id: '1',
    title: 'The Glass of Milk',
    description:
      'This story, written by NaijaSpeak, uses the metaphors of watery milk and sandy water in a vibrant Nigerian setting to explain the concept of corruption.',
    date: new Date('2024-05-10').toISOString(),
    guidelineCategory: 'Nigerian Solutions',
    pages: [
      {
        text: 'Meet Amina! Amina lives in a beautiful, sunny town in Nigeria, full of colours, delicious smells, and friendly people.',
        imageUrl: '/images/the-glass-of-milk/page_0.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'One afternoon, Mama Yewande said, "Amina, my dear, please go to Malam Musas shop and buy us a bottle of fresh milk for our breakfast tomorrow."',
        imageUrl: '/images/the-glass-of-milk/page_1.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Amina skipped to the shop and bought the milk. She paid Malam Musa and hurried home, excited for her favorite breakfast of akara and milk.',
        imageUrl: '/images/the-glass-of-milk/page_2.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'The next morning, Amina poured herself a glass of milk. But when she took a sip, her eyebrows furrowed. "Hmm," she thought. "This milk tastes different. It’s thin and watery!"',
        imageUrl: '/images/the-glass-of-milk/page_3.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: '“Mama Yewande,” Amina asked, “Why is this milk so watery? It’s not rich and creamy like the milk we bought last week.”',
        imageUrl: '/images/the-glass-of-milk/page_4.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Mama Yewande sighed softly. "Amina, sometimes, people who sell things are dishonest. They add water to the good milk so they have more bottles to sell and can make more money."',
        imageUrl: '/images/the-glass-of-milk/page_5.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Amina picked up two glasses of clear, clean water. "Imagine this clear water is something good, like honesty, or a good project for our community, like a new school."',
        imageUrl: '/images/the-glass-of-milk/page_6.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Then, Grand mother took a handful of dusty sand and poured it into one glass. "This sand," she explained, "is like a bad action—cheating, lying, or taking something that does not belong to you."',
        imageUrl: '/images/the-glass-of-milk/page_7.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: '"See? Just a little bit of sand—just one bad action—ruins the clean, pure water. This act of spoiling something good for selfish gain? That is what we call corruption."',
        imageUrl: '/images/the-glass-of-milk/page_8.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Mama Yewande squeezed Amina’s hand. "We must always try to be the clean water, Amina. We must choose honesty, work hard, and keep our actions pure. This is how we build a strong, good community."',
        imageUrl: '/images/the-glass-of-milk/page_9.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: '“Not every seller is like that, my dear! Most people are honest. But now that you know what corruption looks like, you can help keep your glass—and our community’s glass—clear and clean!”',
        imageUrl: '/images/the-glass-of-milk/page_10.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      }
    ],
  },
  {
    id: '2',
    title: 'Who Really Discovered the River Niger?',
    description:
      'Another Story written by NaijaSabi, corrects the historical myth about the "discovery" of the River Niger, emphasizing the role of African guides and local presence.',
    date: new Date('2024-05-03').toISOString(),
    guidelineCategory: 'Historical Context',
    pages: [
      {
        text: 'For a long time, stories said a European explorer discovered the River Niger. But people already lived there! Let\'s learn the real story.',
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
