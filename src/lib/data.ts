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
    title: 'The River Was Always There',
    description:
      'Another Story written by NaijaSabi, corrects the historical myth about the "discovery" of the River Niger, emphasizing the role of African guides and local presence.',
    date: new Date('2024-05-03').toISOString(),
    guidelineCategory: 'Historical Context',
    pages: [
      {
        text: 'Tolu ran into the living room, a stack of very old history books sliding in her hands. She loved visiting Grandpa Adekunle because his house was shaped like a giant, colorful, triple-decker pagoda—a mix of old Nigeria and new China, Grandpa called it.',
        imageUrl: '/images/the-river-was-always-there/page_1.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: '"Grandpa! Grandpa Adekunle!" Tolu called out. She pointed a small finger at a faded picture in one of the texts. "In my school book, it says that Mungo Park discovered the great River Niger! Is that really true? How can you find something that is so big?"',
        imageUrl: '/images/the-river-was-always-there/page_2.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Grandpa Adekunle adjusted his spectacles—they were gold-rimmed and slightly crooked. He reached out and gently took the book. "Ah, the famous discovery story," he chuckled, setting the book down. "Tolu, let me ask you something important."',
        imageUrl: '/images/the-river-was-always-there/page_3.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: '"If a total stranger walks right into our living room," he began, looking around the bright, spacious room, "and he sees our beautiful, comfy, Ankara-covered sofa… did he  discover the sofa? No! We were already sitting on it, werent we?"',
        imageUrl: '/images/the-river-was-always-there/page_4.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Tolu giggled. "Yes! Mama was probably knitting right there! So why would he say he found the river?" Grandpa Adekunle tapped his chin. "Because the River Niger, my dear, was never hiding. It was busy."',
        imageUrl: '/images/the-river-was-always-there/page_5.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'The view shifted, suddenly becoming lush and green, long, long ago. Along the banks of the vast, silver River Niger, people were already living vibrant lives. They fished, they traded, and they wrote songs about the water.',
        imageUrl: '/images/the-river-was-always-there/page_6.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Musa the fisherman was singing a strong, ancient tune as he paddled his canoe near the tall reeds. He knew every turn, every bend, every sandbank. This river was his home, his map, and his pantry.',
        imageUrl: '/images/the-river-was-always-there/page_7.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Suddenly, a very hot, confused-looking man in too many layers of clothes stumbled out of the thick bush. He carried a bulky telescope and sweated profusely. It was Mungo Park. He looked utterly lost.',
        imageUrl: '/images/the-river-was-always-there/page_8.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Mungo Park waved frantically at Musa. "Excuse me, good man! Which way to the great, previously unmapped water source? I must locate it!" Musa simply pointed downstream with his paddle and shrugged, then went back to his fishing.',
        imageUrl: '/images/the-river-was-always-there/page_9.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Mungo Park rushed back to his temporary camp, dipped his quill in ink, and scribbled furiously in his journal. I have done it! I have found the mighty river! Meanwhile, Musa, guiding his canoe back upstream, smiled and shook his head quietly.',
        imageUrl: '/images/the-river-was-always-there/page_10.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'The scene faded back to the bright, modern living room. Tolus eyes were wide. "So, he did not discover it. He just used it and wrote a proud story about it," she summarized.',
        imageUrl: '/images/the-river-was-always-there/page_11.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: 'Grandpa Adekunle smiled, a deep, proud smile. "Exactly, my clever girl. The river was always there. It had been serving us for millennia. We only had to tell him where the sofa was." Tolu grinned. "He was a tourist, Grandpa. We were the guides."',
        imageUrl: '/images/the-river-was-always-there/page_12.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
    ],
  },
  {
    id: '3',
    title: 'The Kings Signature',
    description:
      'Uses an imaginative Lagos-Kano fusion setting to correct the myth about who stopped the killing of twins in Calabar. It proudly teaches that King Duke Ephraim signed the life-saving law in 1855, making him the Architect of change 21 years before Mary Slessor arrived as the kind Caretaker for the rescued babies.',
    date: new Date('2024-04-26').toISOString(),
    guidelineCategory: 'Critical Thinking',
    pages: [
      {
        text: "Simi was spending the long summer holiday in her Uncle Edet city, a vibrant place where tall buildings stood beside ancient, mud-walled palaces. Uncle Edet, she asked, pointing across a bustling market square, what is that huge, beautiful old building with the red curved roof?",
        imageUrl: '/images/the-kings-signature/page_1.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: "Uncle Edet adjusted his traditional hat, its embroidery catching the sun. Ah, Simi. That is the Old Secretariat. It is where the deep roots of our community were first planted. Every good community needs a strong foundation, just like that building.",
        imageUrl: '/images/the-kings-signature/page_2.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: "Simi squinted. But the foundation looks cracked now. Why do people remember old rules? Shouldn’t we just focus on the future?",
        imageUrl: '/images/the-kings-signature/page_3.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: "We remember, Simi, because the future stands on the shoulders of the past, Uncle Edet said, leading her toward the ancient gate. Come. I want to show you the most important signature ever signed in this city.",
        imageUrl: '/images/the-kings-signature/page_4.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: "They entered a cool, echoing hall filled with dusty scrolls and carved wooden cabinets. The air smelled of old paper and teakwood. Uncle Edet stopped at a display case holding a brittle, yellowed document sealed with thick red wax.",
        imageUrl: '/images/the-kings-signature/page_5.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: "In 1855, Edet whispered, our great King, Duke Ephraim, laid down a law that saved countless lives. Before this, tradition demanded a very cruel thing when twins were born.",
        imageUrl: '/images/the-kings-signature/page_6.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: "Simi gasped when Uncle Edet explained the tradition of abandoning twin babies, believing them to be a curse. The King knew tradition was wrong when it harmed the innocent, Edet continued. He used his power to build a safe house for all. This signature is the foundation, the very structure of the building.",
        imageUrl: '/images/the-kings-signature/page_7.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: "Simi traced the huge, looping royal seal on the document with her finger outside the glass. So, King Duke Ephraim was the Architect of safety, she summarized.",
        imageUrl: '/images/the-kings-signature/page_8.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: "Exactly, Edet agreed. But listen, Simi. A house with a strong foundation is still empty. It needs people who will lovingly furnish it. It needs care.",
        imageUrl: '/images/the-kings-signature/page_9.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: "Uncle Edet led her to another section, where photographs of a kind woman with bright, focused eyes were displayed. Meet the Caretaker. Mary Slessor. She came later, in 1876, and used the King’s foundation to build a home of hope.",
        imageUrl: '/images/the-kings-signature/page_10.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: "The King was the Architect who built the law in 1855, Edet stated firmly, and Mary Slessor was the amazing Caretaker who furnished the house in 1876. The history clicked perfectly in Simi’s mind.",
        imageUrl: '/images/the-kings-signature/page_11.png',
        audioUrl:
          'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-audio.mp3',
      },
      {
        text: "Uncle Edet wrapped his arm around Simi. See? True change requires both the mighty signature of the King and the gentle, tireless hands of the Caretaker. One builds the structure; the other fills it with warmth.",
        imageUrl: '/images/the-kings-signature/page_12.png',
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
    videographer: '© Mr. Abeg',
    summary:
      'Step into the vibrant African village where Osas, a kind-hearted boy with a famous laugh, embarks on a journey of heritage, loss, and hope. Discover how the mysterious disappearance of a sacred rattle staff unveils the profound impact of colonization on his community. Through warm hand-drawn animation inspired by Kirikou and the Sorceress, this moving story highlights the importance of unity, pride, and remembering one’s roots. Witness Osas and his friends as they learn about courage, history, and resilience under the glowing orange sun. Perfect for the African diaspora and anyone eager to explore rich cultural narratives. Like and share this heartfelt tale to spread awareness and inspire connection. #AfricanHeritage #OsasStory #ColonialHistory #UnityAndHope',
    videoUrl:
      'https://storage.googleapis.com/starthack-a-lota-dora/assets/sample-video.mp4',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1658402834502-866c5760bb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8bmlnZXJpYW4lMjBtYXJrZXR8ZW58MHx8fHwxNzY0ODU2OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
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
