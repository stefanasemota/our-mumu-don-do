
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
    audioUrl: '/audio/The-Glass-of-Milk.mp3',
    pages: [
      {
        text: 'Meet Amina! \nAmina lives in a beautiful, sunny town in Nigeria, full of colours, delicious smells, and friendly people.',
        imageUrl: '/images/the-glass-of-milk/page_0.png',
      },
      {
        text: 'One afternoon, Mama Yewande said, "Amina, my dear, please go to Malam Musas shop and buy us a bottle of fresh milk for our breakfast tomorrow."',
        imageUrl: '/images/the-glass-of-milk/page_1.png',
      },
      {
        text: 'Amina skipped to the shop and bought the milk. She paid Malam Musa and hurried home, excited for her favorite breakfast of akara and milk.',
        imageUrl: '/images/the-glass-of-milk/page_2.png',
      },
      {
        text: 'The next morning, Amina poured herself a glass of milk. But when she took a sip, her eyebrows furrowed. "Hmm," she thought. "This milk tastes different. It’s thin and watery!"',
        imageUrl: '/images/the-glass-of-milk/page_3.png',
      },
      {
        text: '“Mama Yewande,” Amina asked, “Why is this milk so watery? It’s not rich and creamy like the milk we bought last week.”',
        imageUrl: '/images/the-glass-of-milk/page_4.png',
      },
      {
        text: 'Mama Yewande sighed softly. "Amina, sometimes, people who sell things are dishonest. They add water to the good milk so they have more bottles to sell and can make more money."',
        imageUrl: '/images/the-glass-of-milk/page_5.png',
      },
      {
        text: 'Mama Yewande picked up two glasses of clear, clean water. "Imagine this clear water is something good, like honesty, or a good project for our community, like a new school."',
        imageUrl: '/images/the-glass-of-milk/page_6.png',
      },
      {
        text: 'Then, Mama Yewande took a handful of dusty sand and poured it into one glass. "This sand," she explained, "is like a bad action—cheating, lying, or taking something that does not belong to you."',
        imageUrl: '/images/the-glass-of-milk/page_7.png',
      },
      {
        text: '"See? Just a little bit of sand—just one bad action—ruins the clean, pure water. This act of spoiling something good for selfish gain? That is what we call corruption."',
        imageUrl: '/images/the-glass-of-milk/page_8.png',
      },
      {
        text: 'Mama Yewande squeezed Amina’s hand. "We must always try to be the clean water, Amina. We must choose honesty, work hard, and keep our actions pure. This is how we build a strong, good community."',
        imageUrl: '/images/the-glass-of-milk/page_9.png',
      },
      {
        text: '“Not every seller is like that, my dear! Most people are honest. But now that you know what corruption looks like, you can help keep your glass—and our community’s glass—clear and clean!”',
        imageUrl: '/images/the-glass-of-milk/page_10.png',
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
    audioUrl: '/audio/The-River-was-always-there.mp3',
    pages: [
      {
        text: '"Yeah... listen to the story o. No be everything dem tell you be the full truth."',
        imageUrl: '/images/the-river-was-always-there/page_1.png',
      },
      {
        text: '[Narration]\n\nThe girl ran to her Grandpa with an old history book. She had a big question about a legendary river—the great water wey flow since the beginning.',
        imageUrl: '/images/the-river-was-always-there/page_2.png',
      },
      {
        text: '[Girl]\n\n"Grandpa! This book say one visitor found our great river! How e go find something wey we already know? Something wey big like that?"',
        imageUrl: '/images/the-river-was-always-there/page_3.png',
      },
      {
        text: '[Grandpa - Chuckling]\n\n"Ah, my pikin, listen. If a stranger walk into our parlor and see our favorite sofa... did he find the sofa? No! We were already sitting on it, weren\'t we?"',
        imageUrl: '/images/the-river-was-always-there/page_4.png',
      },
      {
        text: '[Girl - Giggling]\n\n"Yes o! We were already there!"',
        imageUrl: '/images/the-river-was-always-there/page_5.png',
      },
      {
        text: '[Narration]\n\nLong ago, by the silver water, a fisherman named Musa was singing. The river was his home, his map, and his life.',
        imageUrl: '/images/the-river-was-always-there/page_6.png',
      },
      {
        text: '"The river is my friend, the water is my way... I know the current, from night until the day..."',
        imageUrl: '/images/the-river-was-always-there/page_7.png',
      },
      {
        text: '[Narration]\n\nThen a traveler arrived, looking lost. He asked for the way to the water. Musa pointed his paddle and smiled. The traveler wrote: \'I have found the river!\'',
        imageUrl: '/images/the-river-was-always-there/page_8.png',
      },
      {
        text: 'The river was never hiding, it was never lost\nE dey flow through our history, no matter the cost',
        imageUrl: '/images/the-river-was-always-there/page_9.png',
      },
      {
        text: 'We were the guides, he was just a guest\nOur home was already here, we pass the test!\n(Vocal ad-lib: "Confirm!")',
        imageUrl: '/images/the-river-was-always-there/page_10.png',
      },
      {
        text: '[Girl]\n\n"So he was just a tourist, Grandpa. We were the guides the whole time."',
        imageUrl: '/images/the-river-was-always-there/page_11.png',
      },
      {
        text: '[Grandpa]\n\n"Exactly, my clever girl. We only showed him where the sofa was."\n\n"Oya... keep the fire burning."',
        imageUrl: '/images/the-river-was-always-there/page_12.png',
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
    audioUrl: '/audio/The-Kings-Signature.mp3',
    pages: [
      {
        text: '[Intro]\n\n(Market sounds: "Oya buy your pepper!", car horns)\n(Beat kicks in: Slow, steady Afro-shakers and a smooth sax)\n\n"Yeah... Simi, listen well o. History no be just old story."',
        imageUrl: '/images/the-kings-signature/page_1.png',
      },
      {
        text: '[Narration]\n\nSimi was visiting Uncle Edet. Between the tall glass buildings and the ancient mud walls, she saw it—the building with the red curved roof.',
        imageUrl: '/images/the-kings-signature/page_2.png',
      },
      {
        text: '[Simi]\n\n"Uncle Edet, why we dey look this old place? The future is out there, no be so?"',
        imageUrl: '/images/the-kings-signature/page_3.png',
      },
      {
        text: '[Uncle Edet]\n\n"Ah, my pikin. If you no know where you come from, you no go know where you dey go. Come, make I show you the foundation."',
        imageUrl: '/images/the-kings-signature/page_4.png',
      },
      {
        text: '[Narration]\n\nInside the hall of records, the air smelled like teakwood and wisdom. Uncle Edet pointed to the royal seal of 1855.',
        imageUrl: '/images/the-kings-signature/page_5.png',
      },
      {
        text: '[Uncle Edet]\n\n"In 1855, our King, Duke Ephraim, he sign the law to protect the innocent. He be the Architect. He change the old ways so life go flourish. He build the structure, Simi."',
        imageUrl: '/images/the-kings-signature/page_6.png',
      },
      {
        text: '[Simi]\n\n"So he be like the Architect... he design the safety for us?"\n\n[Uncle Edet]\n\n"Exactly. But house wey empty, no be home."',
        imageUrl: '/images/the-kings-signature/page_7.png',
      },
      {
        text: 'The King was the Architect, he sign the royal scroll.\nEighteen-fifty-five, yeah, he get a noble soul.\nHe build the wall of justice, he make the law stand tall.\nBut a house needs a family, inside the palace hall.',
        imageUrl: '/images/the-kings-signature/page_8.png',
      },
      {
        text: '[Narration]\n\nHe showed her Mary Slessor. She came in 1876 with a heart of gold.\n\n[Uncle Edet]\n\n"Mary Slessor took the King’s foundation. She be the Caretaker. She furnish the house with hope and love."',
        imageUrl: '/images/the-kings-signature/page_9.png',
      },
      {
        text: 'One build the structure, the other fill the room (Yeah!)\nOne sign the promise, the other make it bloom.',
        imageUrl: '/images/the-kings-signature/page_10.png',
      },
      {
        text: 'Architect and Caretaker, moving hand in hand.\nBuilding the legacy, for all the people in the land!',
        imageUrl: '/images/the-kings-signature/page_11.png',
      },
      {
        text: '[Simi]\n\n"I see am now, Uncle. One build the house; the other bring the fire. We be the guides of the future."\n\n"Confirm."',
        imageUrl: '/images/the-kings-signature/page_12.png',
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
    videoUrl: '/videos/osas_Secret__A_Journey.mp4',
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

export async function getFeaturedVideoById(
  id: string
): Promise<FeaturedVideo | undefined> {
  // In a real app, you'd fetch this from Firestore
  return Promise.resolve(featuredVideos.find((video) => video.id === id));
}
