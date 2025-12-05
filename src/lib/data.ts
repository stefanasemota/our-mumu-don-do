import type { WeeklyEducationalTopic, FeaturedVideo } from '@/types';
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
        text: 'Mama Yewande picked up two glasses of clear, clean water. "Imagine this clear water is something good, like honesty, or a good project for our community, like a new school."',
        imageUrl: '/images/the-glass-of-milk/page_6.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Then, Mama Yewande took a handful of dusty sand and poured it into one glass. "This sand," she explained, "is like a bad action—cheating, lying, or taking something that does not belong to you."',
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
      },
    ],
  },
  {
    id: '2',
    title: 'he River Was Always There',
    description:
      'Another Story written by NaijaSabi, corrects the historical myth about the "discovery" of the River Niger, emphasizing the role of African guides and local presence.',
    date: new Date('2024-05-03').toISOString(),
    guidelineCategory: 'Historical Context',
    pages: [
      {
        text: 'Tolu ran into the living room, a stack of very old history books sliding in her hands. She loved visiting Grandpa Adekunle because his house was shaped like a giant, colorful, triple-decker pagoda—a mix of old Nigeria and new China, Grandpa called it.',
        imageUrl: '/images/the-river-was-always-there/page_0.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: '"Grandpa! Grandpa Adekunle!" Tolu called out. She pointed a small finger at a faded picture in one of the texts. "In my school book, it says that Mungo Park discovered the great River Niger! Is that really true? How can you find something that is so big?"',
        imageUrl: '/images/the-river-was-always-there/page_1.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Grandpa Adekunle adjusted his spectacles—they were gold-rimmed and slightly crooked. He reached out and gently took the book. "Ah, the famous discovery story," he chuckled, setting the book down. "Tolu, let me ask you something important."',
        imageUrl: '/images/the-river-was-always-there/page_2.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: '"If a total stranger walks right into our living room," he began, looking around the bright, spacious room, "and he sees our beautiful, comfy, Ankara-covered sofa… did he  discover the sofa? No! We were already sitting on it, werent we?"',
        imageUrl: '/images/the-river-was-always-there/page_3.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Tolu giggled. "Yes! Mama was probably knitting right there! So why would he say he found the river?" Grandpa Adekunle tapped his chin. "Because the River Niger, my dear, was never hiding. It was busy."',
        imageUrl: '/images/the-river-was-always-there/page_4.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'The view shifted, suddenly becoming lush and green, long, long ago. Along the banks of the vast, silver River Niger, people were already living vibrant lives. They fished, they traded, and they wrote songs about the water.',
        imageUrl: '/images/the-river-was-always-there/page_5.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Musa the fisherman was singing a strong, ancient tune as he paddled his canoe near the tall reeds. He knew every turn, every bend, every sandbank. This river was his home, his map, and his pantry.',
        imageUrl: '/images/the-river-was-always-there/page_6.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Suddenly, a very hot, confused-looking man in too many layers of clothes stumbled out of the thick bush. He carried a bulky telescope and sweated profusely. It was Mungo Park. He looked utterly lost.',
        imageUrl: '/images/the-river-was-always-there/page_7.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Mungo Park waved frantically at Musa. "Excuse me, good man! Which way to the great, previously unmapped water source? I must locate it!" Musa simply pointed downstream with his paddle and shrugged, then went back to his fishing.',
        imageUrl: '/images/the-river-was-always-there/page_8.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Mungo Park rushed back to his temporary camp, dipped his quill in ink, and scribbled furiously in his journal. I have done it! I have found the mighty river! Meanwhile, Musa, guiding his canoe back upstream, smiled and shook his head quietly.',
        imageUrl: '/images/the-river-was-always-there/page_9.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'The scene faded back to the bright, modern living room. Tolus eyes were wide. "So, he did not discover it. He just used it and wrote a proud story about it," she summarized.',
        imageUrl: '/images/the-river-was-always-there/page_10.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Grandpa Adekunle smiled, a deep, proud smile. "Exactly, my clever girl. The river was always there. It had been serving us for millennia. We only had to tell him where the sofa was." Tolu grinned. "He was a tourist, Grandpa. We were the guides."',
        imageUrl: '/images/the-river-was-always-there/page_11.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
    ],
  },
  {
    id: '3',
    title: 'The Kings Signature',
    description:
      'Uses an imaginative Afro-Asian fusion setting to explain that King Duke Ephraim established the law protecting twins in Calabar in 1855, 21 years before Mary Slessor arrived to provide crucial care.',
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

const featuredVideos: FeaturedVideo[] = [
  {
    id: '1',
    title: 'Discover Osas’s Secret: A Story of Heritage, Loss & Hope',
    summary:
      'Step into the vibrant African village where Osas, a kind-hearted boy with a famous laugh, embarks on a journey of heritage, loss, and hope. Discover how the mysterious disappearance of a sacred rattle staff unveils the profound impact of colonization on his community. Through warm hand-drawn animation inspired by Kirikou and the Sorceress, this moving story highlights the importance of unity, pride, and remembering one’s roots. Witness Osas and his friends as they learn about courage, history, and resilience under the glowing orange sun. Perfect for the African diaspora and anyone eager to explore rich cultural narratives. Like and share this heartfelt tale to spread awareness and inspire connection. #AfricanHeritage #OsasStory #ColonialHistory #UnityAndHope',
    videoUrl:
      'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-video.mp4',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1658402834502-866c5760bb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8bmlnZXJpYW4lMjBtYXJrZXR8ZW58MHx8fHwxNzY0ODU2OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    title: 'The Art of Adire',
    summary:
      'A short documentary on the traditional Yoruba art of indigo-dyed cloth.',
    videoUrl:
      'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-video.mp4',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1629806461298-616a9a5019a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxuaWdlcmlhbiUyMHRleHRpbGVzfGVufDB8fHx8MTc2NTM4NDA1NHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    title: 'Nok Terracotta Heads',
    summary:
      'Exploring the ancient terracotta sculptures of the Nok culture, some of the oldest in Africa.',
    videoUrl:
      'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-video.mp4',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1711117078011-d6f8c0657069?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8YmVuaW4lMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzY0ODU2OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '4',
    title: 'The Great Walls of Benin',
    summary:
      'Uncover the history of one of the largest man-made structures in the world.',
    videoUrl:
      'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-video.mp4',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1648023200201-8fcede127835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxsYWdvcyUyMG5pZ2VyaWF8ZW58MHx8fHwxNzY0ODU2OTE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
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

export async function getFeaturedVideos(): Promise<FeaturedVideo[]> {
  // In a real app, you'd fetch this from Firestore
  return Promise.resolve(featuredVideos);
}
