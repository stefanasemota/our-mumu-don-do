import type { WeeklyEducationalTopic, FeaturedVideo } from '@/types';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  Firestore,
} from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

// This function now returns the local data and is only used for seeding.
export function getTopics(local = false): WeeklyEducationalTopic[] {
  const localTopics: WeeklyEducationalTopic[] = [
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
          text: '[Intro]\\nMeet Amina! \\nAmina lives in a beautiful, sunny town in Nigeria, full of colours, delicious smells, and friendly people.',
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
          text: '[Intro]\\n "Yeah... listen to the story o. No be everything dem tell you be the full truth."',
          imageUrl: '/images/the-river-was-always-there/page_1.png',
        },
        {
          text: '[Narration]\\n\\nThe girl ran to her Grandpa with an old history book. She had a big question about a legendary river—the great water wey flow since the beginning.',
          imageUrl: '/images/the-river-was-always-there/page_2.png',
        },
        {
          text: '[Girl]\\n\\n"Grandpa! This book say one visitor found our great river! How e go find something wey we already know? Something wey big like that?"',
          imageUrl: '/images/the-river-was-always-there/page_3.png',
        },
        {
          text: '[Grandpa - Chuckling]\\n\\n"Ah, my pikin, listen. If a stranger walk into our parlor and see our favorite sofa... did he find the sofa? No! We were already sitting on it, weren\\'t we?"',
          imageUrl: '/images/the-river-was-always-there/page_4.png',
        },
        {
          text: '[Girl - Giggling]\\n\\n"Yes o! We were already there!"',
          imageUrl: '/images/the-river-was-always-there/page_5.png',
        },
        {
          text: '[Narration]\\n\\nLong ago, by the silver water, the fisherman Musa was singing. The river was his home, his map, and his life.',
          imageUrl: '/images/the-river-was-always-there/page_6.png',
        },
        {
          text: '"The river is my friend, the water is my way... I know the current, from night until the day..."',
          imageUrl: '/images/the-river-was-always-there/page_7.png',
        },
        {
          text: "[Narration]\\n\\nThen a traveler arrived, looking lost. He asked for the way to the water. Musa pointed his paddle and smiled. The traveler wrote: 'I have found the river!'",
          imageUrl: '/images/the-river-was-always-there/page_8.png',
        },
        {
          text: 'The river was never hiding, it was never lost\\nE dey flow through our history, no matter the cost',
          imageUrl: '/images/the-river-was-always-there/page_9.png',
        },
        {
          text: 'We were the guides, he was just a guest\\nOur home was already here, we pass the test!\\n(Vocal ad-lib: "Confirm!")',
          imageUrl: '/images/the-river-was-always-there/page_10.png',
        },
        {
          text: '[Girl]\\n\\n"So he was just a tourist, Grandpa. We were the guides the whole time."',
          imageUrl: '/images/the-river-was-always-there/page_11.png',
        },
        {
          text: '[Grandpa]\\n\\n"Exactly, my clever girl. We only showed him where the sofa was."\\n\\n"Oya... keep the fire burning."',
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
          text: '[Intro]\\n\\n(Market sounds: "Oya buy your pepper!", car horns)\\n(Beat kicks in: Slow, steady Afro-shakers and a smooth sax)\\n"Yeah... Simi, listen well o. History no be just old story."',
          imageUrl: '/images/the-kings-signature/page_1.png',
        },
        {
          text: '[Narration]\\n\\nSimi was visiting Uncle Edet. Between the tall glass buildings and the ancient mud walls, she saw it—the building with the red curved roof.',
          imageUrl: '/images/the-kings-signature/page_2.png',
        },
        {
          text: '[Simi]\\n\\n"Uncle Edet, why we dey look this old place? The future is out there, no be so?"',
          imageUrl: '/images/the-kings-signature/page_3.png',
        },
        {
          text: '[Uncle Edet]\\n\\n"Ah, my pikin. If you no know where you come from, you no go know where you dey go. Come, make I show you the foundation."',
          imageUrl: '/images/the-kings-signature/page_4.png',
        },
        {
          text: '[Narration]\\n\\nInside the hall of records, the air smelled like teakwood and wisdom. Uncle Edet pointed to the royal seal of 1855.',
          imageUrl: '/images/the-kings-signature/page_5.png',
        },
        {
          text: '[Uncle Edet]\\n\\n"In 1855, our King, Duke Ephraim, he sign the law to protect the innocent. He be the Architect. He change the old ways so life go flourish. He build the structure, Simi."',
          imageUrl: '/images/the-kings-signature/page_6.png',
        },
        {
          text: '[Simi]\\n\\n"So he be like the Architect... he design the safety for us?"\\n\\n[Uncle Edet]\\n\\n"Exactly. But house wey empty, no be home."',
          imageUrl: '/images/the-kings-signature/page_7.png',
        },
        {
          text: 'The King was the Architect, he sign the royal scroll.\\nEighteen-fifty-five, yeah, he get a noble soul.\\nHe build the wall of justice, he make the law stand tall.\\nBut a house needs a family, inside the palace hall.',
          imageUrl: '/images/the-kings-signature/page_8.png',
        },
        {
          text: '[Narration]\\n\\nHe showed her Mary Slessor. She came in 1876 with a heart of gold.\\n\\n[Uncle Edet]\\n"Mary Slessor took the King’s foundation. She be the Caretaker. She furnish the house with hope and love."',
          imageUrl: '/images/the-kings-signature/page_9.png',
        },
        {
          text: 'One build the structure, the other fill the room (Yeah!)\\nOne sign the promise, the other make it bloom.',
          imageUrl: '/images/the-kings-signature/page_10.png',
        },
        {
          text: 'Architect and Caretaker, moving hand in hand.\\nBuilding the legacy, for all the people in the land!',
          imageUrl: '/images/the-kings-signature/page_11.png',
        },
        {
          text: '[Simi]\\n\\n"I see am now, Uncle. One build the house; the other bring the fire. We be the guides of the future."\\n\\n"Confirm."',
          imageUrl: '/images/the-kings-signature/page_12.png',
        },
      ],
    },
    {
      id: '4',
      title: 'Understanding Colonisation',
      description:
        'The story of Osas, a young boy who learns about his heritage, the impact of colonization, and the power of remembering one\\'s roots.',
      date: new Date('2024-06-01').toISOString(),
      guidelineCategory: 'Historical Context',
      audioUrl: '/audio/Colonisation.mp3',
      pages: [
        {
          text: '[Intro]\\n"Hear the story of Osas, a boy with a heart of gold. In our bright village, under the smiling sun..."',
          imageUrl: 'https://picsum.photos/seed/4-1/600/600',
        },
        {
          text: '[Narration]\\nOsas lived in a colorful village. His father, Fosa, made beautiful bronze art. His mother grew cocoa, teaching him kindness. Osas\\'s laugh made everyone smile. He helped elders and shared stories with his friends, Fino and Cosmos.',
          imageUrl: 'https://picsum.photos/seed/4-2/600/600',
        },
        {
          text: 'Fino could read the animal tracks, on the ground he would see\\nCosmos found his way by stars, for all the world to be free\\nOsas loved to help the old ones, carrying water with grace\\nThree friends, in their village, in this happy, sunny place.',
          imageUrl: 'https://picsum.photos/seed/4-3/600/600',
        },
        {
          text: '[Narration]\\nOne day, Osas found an old picture. A man stood with the King, holding a special, shiny rattle staff. Osas thought it was his great-grandfather. This picture showed him the beauty of his ancestors.',
          imageUrl: 'https://picsum.photos/seed/4-4/600/600',
        },
        {
          text: '[Osas - Curious Voice]\\n"Father! I saw this picture! Where is this beautiful rattle staff? I cannot find it!"',
          imageUrl: 'https://picsum.photos/seed/4-5/600/600',
        },
        {
          text: '[Fosa - Gentle Voice]\\n"Ah, my son. That staff, and many other special things, are no longer here with us. They were moved by people who visited from very far away, long ago."',
          imageUrl: 'https://picsum.photos/seed/4-6/600/600',
        },
        {
          text: '[Osas - Puzzled Voice]\\n"Moved? Who moved our things? Why?"',
          imageUrl: 'https://picsum.photos/seed/4-7/600/600',
        },
        {
          text: '[Fosa - Explaining Voice]\\n"Imagine if a stranger came into your room without asking. Not just looking, but changing things around, and taking your favorite toys to their own house. They might say they \\'found\\' your room, even though you were living there."',
          imageUrl: 'https://picsum.photos/seed/4-8/600/600',
        },
        {
          text: '[Osas - Worried Voice]\\n"That\\'s not fair! Why would anyone do that?"',
          imageUrl: 'https://picsum.photos/seed/4-9/600/600',
        },
        {
          text: '[Fosa]\\n"They believed they knew better. They had powerful tools, and there were many of them. Our ancestors were brave, they protected what was theirs. But the visitors were very strong. Our communities felt a deep change."',
          imageUrl: 'https://picsum.photos/seed/4-10/600/600',
        },
        {
          text: '[Cosmos - Thoughtful Voice]\\n"It was like someone changing your favorite room, Osas. The toys your mother bought might be gone. You might get used to new ways, and forget your own choices."',
          imageUrl: 'https://picsum.photos/seed/4-11/600/600',
        },
        {
          text: '"But they can never take away who we truly are. Our stories and songs stay with us, passed down through generations."',
          imageUrl: 'https://picsum.photos/seed/4-12/600/600',
        },
        {
          text: '[Fosa]\\n"It is true. And sometimes, even within our own people, choices were made that made things harder. We must remember this."',
          imageUrl: 'https://picsum.photos/seed/4-13/600/600',
        },
        {
          text: 'The rattle staff is gone, but the spirit remains (Yeah!)\\nOur stories are living, through joy and through pains\\nWe learn from the past, we build a new day\\nTogether as one, we will find our own way!\\n',
          imageUrl: 'https://picsum.photos/seed/4-14/600/600',
        },
        {
          text: '[Narration]\\nFrom that day, Osas saw the world differently. It was like a new light shone on everything. He noticed strange marks on coins, new clothes on judges, and words in the elders\\' talk that were not from their own tongue.',
          imageUrl: 'https://picsum.photos/seed/4-15/600/600',
        },
        {
          text: '[Osas - Determined Voice]\\n"Grandpa, getting the staff back is important. But helping us remember who we are? That\\'s even more important!"',
          imageUrl: 'https://picsum.photos/seed/4-16/600/600',
        },
        {
          text: '"Remember your history. Build your future. One community, standing strong."',
          imageUrl: 'https://picsum.photos/seed/4-17/600/600',
        },
      ],
    },
  ];

  return localTopics;
}

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


// This is a server-side only function
// It must be called from a server component or a server action
export async function getTopicById(
  id: string
): Promise<WeeklyEducationalTopic | undefined> {
  
  // This function CANNOT use the client-side `initializeFirebase`
  // We need a server-side way to get the db instance.
  // For now, we will use the client-side SDK on the server, which is not ideal
  // but will work for now. This should be replaced with the Admin SDK
  // in a real production application.
  const { firestore } = initializeFirebase(); 

  const topicRef = doc(firestore, 'weeklyEducationalTopics', id);
  const topicSnap = await getDoc(topicRef);

  if (!topicSnap.exists()) {
    // Fallback to local data if not in Firestore, useful for dev
     const localTopic = getTopics(true).find(t => t.id === id);
     if (localTopic) {
        return {
            ...localTopic,
            date: new Date(localTopic.date).toISOString(),
        }
     }
    return undefined;
  }

  const data = topicSnap.data();
  // Ensure date is a string
  const date = data.date?.toDate ? data.date.toDate().toISOString() : new Date().toISOString();
  
  return {
    id: topicSnap.id,
    ...data,
    date: date,
  } as WeeklyEducationalTopic;
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
