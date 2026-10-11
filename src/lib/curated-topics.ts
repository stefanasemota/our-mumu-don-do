import type { WeeklyEducationalTopic } from '@/types';
import { getMediaUrl } from './media';

// The 8 REAL, authentic stories in Our Mumu Don Do
const RAW_REAL_STORIES: Record<string, WeeklyEducationalTopic> = {
  '1': {
    id: '1',
    title: 'The Glass of Milk',
    description:
      'This story uses the metaphors of watery milk and sandy water in a vibrant Nigerian setting to explain the concept of corruption and the power of honesty.',
    date: '2024-05-10T00:00:00.000Z',
    guidelineCategory: ['Critical Thinking'],
    audioUrl: '/audio/The-Glass-of-Milk.mp3',
    pages: [
      {
        text: 'Meet Amina!\nAmina lives in a beautiful, sunny town in Nigeria, full of colours, delicious smells, and friendly people.',
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

  '2': {
    id: '2',
    title: 'The River Was Always There',
    description:
      'Corrects the historical myth about the "discovery" of the River Niger, emphasizing the role of African guides, indigenous knowledge, and local presence.',
    date: '2024-05-03T00:00:00.000Z',
    guidelineCategory: ['Historical Context'],
    audioUrl: '/audio/The-River-was-always-there.mp3',
    audioUrlDeCH: '/audio/de_The_River_was_always_there.mp3',
    pages: [
      {
        text: '"Yeah... listen to the story o. No be everything dem tell you be the full truth."',
        textDeCH: '"Ja... los guet zue. Nid alles, was si dir verzelle, isch di ganzi Wahrheit."',
        imageUrl: '/images/the-river-was-always-there/page_1.png',
      },
      {
        text: 'The girl ran to her Grandpa with an old history book. She had a big question about a legendary river—the great water wey flow since the beginning.',
        textDeCH: 'S\'Meitli isch mit emene alte Gschichtsbuech zu ihrem Grossvater gsecklet. Sie het e grossi Frog gha über dä legendäri Fluss—das mächtige Wasser, wo scho sit immer gflosse isch.',
        imageUrl: '/images/the-river-was-always-there/page_2.png',
      },
      {
        text: '"Grandpa! This book say one visitor found our great river! How e go find something wey we already know? Something wey big like that?"',
        textDeCH: '"Grossvater! I däm Buech stoht, en Bsuecher heig üse grosse Fluss gfunde! Wie chan er öppis finde, wo mir scho lang känne? Öppis, wo so riisig isch?"',
        imageUrl: '/images/the-river-was-always-there/page_3.png',
      },
      {
        text: '"Ah, my pikin, listen. If a stranger walk into our parlor and see our favorite sofa... did he find the sofa? No! We were already sitting on it, weren\'t we?"',
        textDeCH: '"Ah, mis Chind, los zue. Wenn en Fremde i üsi Stube chunnt und üses Sofa gseht... het er denn s\'Sofa gfunde? Nei! Mir sind doch scho lang druffe ghocket, oder nid?"',
        imageUrl: '/images/the-river-was-always-there/page_4.png',
      },
      {
        text: '"Yes o! We were already there!"\nLong ago, by the silver water, the fisherman Musa was singing. The river was his home, his map, and his life.',
        textDeCH: '"Genau so isch es! Mir sind scho immer do gsi!"\nVor langer Zit het dr Fischer Musa am silbrige Wasser gsunge. Dr Fluss isch siis Dihei gsi, siis Läbe und sii Wäg.',
        imageUrl: '/images/the-river-was-always-there/page_5.png',
      },
      {
        text: 'The river was never hiding, it was never lost. E dey flow through our history, no matter the cost.',
        textDeCH: 'Dr Fluss het sich nie versteckt, er isch nie verlore gsi. Er fliesst dur üsi Gschicht, sit Generatione.',
        imageUrl: '/images/the-river-was-always-there/page_9.png',
      },
      {
        text: '"So he was just a tourist, Grandpa. We were the guides the whole time."\n"Exactly, my clever girl. We only showed him where the sofa was."',
        textDeCH: '"Denn isch er jo nume en Tourist gsi, Grossvater. Mir sind di ganze Zit d\'Füehrer gsi."\n"Ganz genau, mis schlaue Meitli. Mir hend ihm nume zeigt, wo s\'Sofa stoht."',
        imageUrl: '/images/the-river-was-always-there/page_11.png',
      },
    ],
  },

  '3': {
    id: '3',
    title: "The King's Signature",
    description:
      'Uses an imaginative setting to correct the myth about who stopped the killing of twins in Calabar. It proudly teaches that King Duke Ephraim signed the life-saving law in 1855, making him the Architect of change 21 years before Mary Slessor arrived as the Caretaker.',
    date: '2024-04-26T00:00:00.000Z',
    guidelineCategory: ['Critical Thinking'],
    audioUrl: '/audio/The-Kings-Signature.mp3',
    audioUrlDeCH: '/audio/The_Kings_Signature_ch.mp3',
    pages: [
      {
        text: 'Simi was visiting Uncle Edet. Between the tall glass buildings and the ancient mud walls, she saw it—the building with the red curved roof.',
        textDeCH: 'D\'Simi isch bim Unkel Edet z\'Bsuech gsi. Zwüsche de hoche Glasgebäud und de uralte Lehmmure het si es gseh—das Huus mit em rote, gschwungene Dach.',
        imageUrl: '/images/the-kings-signature/page_0.png',
      },
      {
        text: '"Uncle Edet, why we dey look this old place? The future is out there, no be so?"\n"Ah, my pikin. If you no know where you come from, you no go know where you dey go."',
        textDeCH: '"Unkel Edet, werum luegemer das alte Gebäude aa? D\'Zuekunft isch doch duss, oder nid?"\n"Ah, mis Chind. Wenn nid weisch, vo wo du chunnsch, weisch au nid, woane du gasch."',
        imageUrl: '/images/the-kings-signature/page_1.png',
      },
      {
        text: 'Inside the hall of records, the air smelled like teakwood and wisdom. Uncle Edet pointed to the royal seal of 1855.',
        textDeCH: 'I dr Halle vo de Dokument het d\'Luft nach Teakholz und Wiisheit gschmöckt. Dr Unkel Edet het uf s\'königliche Sigel vo 1855 zeigt.',
        imageUrl: '/images/the-kings-signature/page_5.png',
      },
      {
        text: '"In 1855, our King, Duke Ephraim, signed the law to protect the innocent. He was the Architect. He changed the old ways so life could flourish."',
        textDeCH: '"Im Johr 1855 het üse König, dr Duke Ephraim, s\'Gsetz zum Schutz vo de Unschuldige underschribe. Er isch dr Architekt gsi. Er het di alte Brüüch gänderet, damit s\'Läbe cha ufblüehe."',
        imageUrl: '/images/the-kings-signature/page_6.png',
      },
      {
        text: '"Mary Slessor took the King’s foundation. She was the Caretaker. She furnished the house with hope and love. Architect and Caretaker, moving hand in hand."',
        textDeCH: '"D\'Mary Slessor het uf em Fundamänt vom König ufbout. Sie isch d\'Pflägeri gsi. Sie het s\'Huus mit Hoffnig und Liebi gfüllt. Architekt und Pflägeri, Hand in Hand."',
        imageUrl: '/images/the-kings-signature/page_9.png',
      },
      {
        text: '"I see am now, Uncle. One built the house; the other brought the fire. We are the guides of the future. Confirm."',
        textDeCH: '"Jetzt verstahni\'s, Unkel. Dr eint het s\'Huus bout, di anderi het s\'Füür bracht. Mir sind d\'Wägwiiser vo dr Zuekunft. Ganz sicher."',
        imageUrl: '/images/the-kings-signature/page_12.png',
      },
    ],
  },

  '4': {
    id: '4',
    title: 'Understanding Colonisation',
    description:
      'Created with Stefan & Mr. Abeg (@mr-abeg.japa.techie). Experience the journey of Osas, a young boy discovering his heritage, the resilience of his roots, and the true meaning of cultural identity.',
    date: '2024-06-01T00:00:00.000Z',
    guidelineCategory: ['Historical Context'],
    audioUrl: '/audio/Colonisation.mp3',
    audioUrlDeCH: '/audio/Colonisation_ch.mp3',
    pages: [
      {
        text: 'Hear the story of Osas, a boy with a heart of gold. In our bright village, under the smiling sun...\nOsas lived in a colorful village. His father, Fosa, made beautiful bronze art.',
        textDeCH: 'Los d\'Gschicht vom Osas, emene Bueb mit emene goldige Härz. I üsem farbige Dorf, under dr lachende Sunne...\nDr Osas het imene lebhafte Dorf gläbt. Si Vater, dr Fosa, het wunderschöni Bronzechunst gschaffe.',
        imageUrl: '/images/understanding-colonisation/Osa-1.jpeg',
      },
      {
        text: 'One day, Osas found an old picture of a royal rattle staff. "Father! Where is this beautiful rattle staff?"\n"Ah, my son. That staff was moved by people who visited from very far away long ago."',
        textDeCH: 'Eines Tages het dr Osas es alts Bild vonere königliche Rattle-Rassle gseh. "Vater! Wo isch die schöni königlichi Rassle?"\n"Ah, mi Sohn. Die Rassle isch vor langer Zit vo Lüt mitgno worde, wo vo wit här z\'Bsuech cho sind."',
        imageUrl: '/images/understanding-colonisation/Osa-3.jpeg',
      },
      {
        text: '"Imagine if a stranger came into your room without asking, changing things around and taking your favorite toys. Our ancestors were brave, but visitors were strong."',
        textDeCH: '"Stell dr vor, en Fremde chäm ohni z\'froge i diis Zimmer, würdi alles umstelle und diis Lieblingsspilzüg mitnäh. Üsi Vorfahre sind tapfer gsi, aber d\'Bsuecher sind mächtig gsi."',
        imageUrl: '/images/understanding-colonisation/Osa-5.jpeg',
      },
      {
        text: '"The rattle staff is gone, but the spirit remains! Our stories are living. Getting the staff back is important, but helping us remember who we are? That\'s even more important!"',
        textDeCH: '"D\'Rassle isch zwar furt, aber dr Geist blibt do! Üsi Gschichte läbed. Dass mer d\'Rassle zruggbechömed isch wichtig, aber dass mer üs dra erinnered, wer mir sind? Das isch no viel wichtiger!"',
        imageUrl: '/images/understanding-colonisation/Osa-8.png',
      },
    ],
  },

  '5': {
    id: '5',
    title: 'We were never lost',
    description:
      'A multi-generational tale following the rise of King Jaja of Opobo. Discover how a newcomer named Mbanaso used his intellect, curiosity, and immense vision to transform into a global merchant king.',
    date: '2025-12-26T16:18:40.487Z',
    guidelineCategory: ['Historical Context'],
    audioUrl: '/audio/we-were-never-lost.mp3',
    pages: [
      {
        text: 'Tolu stood on the balcony of their bamboo-glass apartment, looking out at the shimmering Opobo River. "Grandpa," he asked, "the history books say King Jaja started with nothing. How does a boy with no shoes end up wearing a crown of coral?"',
        imageUrl: '/images/we-were-never-lost/0.jpg',
      },
      {
        text: 'Grandpa pulled up a holographic image of young Mbanaso. "It started with his eyes, Tolu. While others looked at the ground, Mbanaso looked at the horizon. He realized that if you can map the world in your mind, no one can keep your spirit in a cage."',
        imageUrl: '/images/we-were-never-lost/1.jpg',
      },
      {
        text: 'Mbanaso learned the languages of the sailors and the rhythm of the tides. He reorganized trade, paid off debts, and led thousands through winding creeks to create Opobo—the Place of Promise.',
        imageUrl: '/images/we-were-never-lost/4.jpg',
      },
      {
        text: 'In Opobo, Jaja was a King. He built a city so powerful that even foreign queens sent letters of respect. "Your past is not your anchor; your vision is your compass."',
        imageUrl: '/images/we-were-never-lost/6.jpg',
      },
    ],
  },

  '6': {
    id: '6',
    title: 'The River of a Thousand Songs',
    description:
      'Zaynab and Emeka meet at the great confluence of Lokoja. Through an old fisherman’s riddle, they discover that Nigeria’s strength is how our different cultural streams create one mighty, unstoppable river.',
    date: '2025-12-26T16:33:05.020Z',
    guidelineCategory: ['Unity & Identity'],
    audioUrl: '/audio/The-River-of-a-Thousand-Songs.mp3',
    pages: [
      {
        text: 'In the town of the waters, where the rivers meet the eye\nYoung Zaynab and Emeka sat beneath the midday sky\nShe wore indigo woven robes, he in red and gold so bright\nTalking \'bout whose home was better, from morning until night.',
        imageUrl: '/images/the-river-of-songs/0.jpg',
      },
      {
        text: 'The old fisherman paddled slow, his boat upon the deep.\n"The West Flow is wise and long," he said with a gentle smile.\n"The East Flow brings the mountain life, for every weary mile."',
        imageUrl: '/images/the-river-of-songs/3.jpg',
      },
      {
        text: 'He showed them woven cloth, Adire and Akwete too.\n"Pull one thread and it is weak, the pattern fades from view.\nBut together we are stronger, the old and then the new."',
        imageUrl: '/images/the-river-of-songs/4.jpg',
      },
      {
        text: 'A thousand songs in one voice, owners of the stream.\nNorthern soul and Southern heart, living out the dream.\nNo longer far apart, we flow into the sea.\nOne mighty rolling river, for you and then for me.',
        imageUrl: '/images/the-river-of-songs/6.jpg',
      },
    ],
  },

  'the-great-giants-of-zazzau': {
    id: 'the-great-giants-of-zazzau',
    title: 'The Great Giants of Zazzau',
    description:
      'Queen Amina: Warrior of Zazzau. Ride into the golden savannah of ancient Zazzau with Queen Amina! Discover how brave strategy, safe trade routes, and towering clay walls protected her people.',
    date: '2026-10-11T00:00:00.000Z',
    guidelineCategory: ['Historical Context', 'Unity & Identity'],
    audioUrl: '/audio/The_Great_Giants_of_Zazzau.mp3',
    pages: [
      {
        text: 'In the great ancient city of Zazzau, the desert winds blew warm and steady against the towering red clay walls. Queen Amina stood atop the fortress watchtower, looking across the vast savannah. She knew that walls could protect her people from sudden raids, but true prosperity came from building trade routes, uniting communities, and ruling with courage and wisdom.',
        imageUrl: '/books/zazzau/page-2.jpg',
        textDeCH:
          "I dr grosse, alte Stadt Zazzau het dr heissi Wüestewind sanft über di rote Lehmmure bloost. D'Königin Amina isch uf dr hoche Stadtmure gstande und het wyt über s'Land gluegt. Si het gwüsst, dass di wahri Stärki vomene Rych nid nume us Chrieger beschteht, sondern us em Fride, offene Handelswääg und em Zämehalt vo allne Mänsche.",
      },
      {
        text: 'Mounted on her swift warhorse, Amina led her community not to conquer, but to secure safe passage for farmers, craftspeople, and traders. She directed the construction of earthen walls—the legendary Ganuwa Amina—that encircled cities, offering safe havens and lively marketplaces where neighboring nations exchanged salt, kola nuts, and woven cloth.',
        imageUrl: '/books/zazzau/page-3.jpg',
        textDeCH:
          "Mit grossem Muet und Chlugheit het d'Amina iri Rappe bestyge. Si het d'Grenze gschützt und neui sicheri Handelsroute dur ganz Westafrika bouet. D'Puure und Handwärker händ Kolanüss, Gwürz und prachtvolli Stoff usstuuscht, und Zazzau isch zunere blühende Oase worde.",
      },
      {
        text: "As the afternoon sun cast long shadows across Zazzau, Amina convened the youth council. 'A ruler who only prepares for defense will always live in fear,' she advised the young leaders. 'A leader who builds connections creates lasting peace.' The young citizens listened carefully, understanding that their future required courage, dialogue, and cooperation.",
        imageUrl: '/books/zazzau/page-4.jpg',
        textDeCH:
          "D'Mure vo Zazzau – d'Ganuwa – sind mächtig gsi, sorgfältig us Lehm gformt. Aber d'Königin het zu irem Volk gsait: 'Mure gäbed Schutz vor Gfohr, aber offeni Tor und Fründschaft mached üs starch.' Jung und Alt händ vo irer Weitsicht glernt.",
      },
      {
        text: 'By evening, the marketplaces of Zazzau bustled with friendly music, lantern lights, and shared meals. Travelers from distant kingdoms rested safely within the gates. Queen Amina had proven that true leadership lies in wisdom, open doors, and justice.',
        imageUrl: '/books/zazzau/page-5.jpg',
        textDeCH:
          "Am Obe händ sich d'Händler und d'Familie uf em grosse Märtplatz versammlet. Bim Füür sind Gschichte verzellt worde, und d'Chind händ gseh, dass Fride und Zämehalt di gröschte Schätz vomene Volch sind. D'Königin Amina het s'Fundamänt für Generatione gleit.",
      },
    ],
  },

  'arhuan-the-giant-prince-of-benin': {
    id: 'arhuan-the-giant-prince-of-benin',
    title: 'Arhuan: The Giant Prince of Benin',
    description:
      "Inspired by Mama Africa. The epic legend of Prince Arhuan, the giant prince of the Benin Kingdom whose immense physical strength was guided by royal courage and ancestral wisdom.",
    date: '2026-10-11T00:00:00.000Z',
    guidelineCategory: ['Historical Context', 'Unity & Identity'],
    audioUrl: '/audio/arhuan-the-giant-prince-of-benin.mp3',
    pages: [
      {
        text: "In the legendary kingdom of Benin, Prince Arhuan grew taller and stronger than any warrior in the realm. As the wonderful storyteller Mama Africa narrates with so much warmth, true royalty is not measured by physical might alone, but by wisdom, honor, and loyalty to one's roots.",
        imageUrl: '/books/arhuan/page-2.jpg',
        textDeCH:
          "I dr mächtige Stadt Benin het dr Prinz Arhuan gläbt, dr riisigi Chrieger mit dr Chraft vo hundert Manne. Doch wie d'Mama Africa immer verzellt, isch wahri Grössi nid nume d'Chraft im Arm, sondern s'Guete im Härze.",
      },
      {
        text: 'With his legendary bronze armor and the ancestral blessings of Oba Ozolua, Prince Arhuan defended the waterways and forests of Benin, teaching generations that strength must always serve unity and the protection of the innocent.',
        imageUrl: '/books/arhuan/page-3.jpg',
        textDeCH:
          "Dr Arhuan het d'Wälder und d'Flüss vo Benin gschützt. Jedi Gschicht, wo d'Mama Africa über ihn singt, mahnt üs dra, mit Stolz und Reschpäkt für üses Erbe z'läbe.",
      },
    ],
  },
};

function resolveTopicMedia(topic: WeeklyEducationalTopic): WeeklyEducationalTopic {
  return {
    ...topic,
    audioUrl: topic.audioUrl ? getMediaUrl(topic.audioUrl) : undefined,
    audioUrlDeCH: topic.audioUrlDeCH ? getMediaUrl(topic.audioUrlDeCH) : undefined,
    pages: topic.pages.map((p) => ({
      ...p,
      imageUrl: p.imageUrl ? getMediaUrl(p.imageUrl) : undefined,
    })),
  };
}

export const REAL_STORIES: Record<string, WeeklyEducationalTopic> = Object.fromEntries(
  Object.entries(RAW_REAL_STORIES).map(([key, story]) => [key, resolveTopicMedia(story)])
);

// Aliases mapping human slugs to real story IDs
const SLUG_MAP: Record<string, string> = {
  'the-glass-of-milk': '1',
  'the-river-was-always-there': '2',
  'the-kings-signature': '3',
  'the-king-signature': '3',
  'understanding-colonisation': '4',
  'understanding-colonization': '4',
  'we-were-never-lost': '5',
  'the-river-of-a-thousand-songs': '6',
  'the-great-giants-of-zazzau': 'the-great-giants-of-zazzau',
  'arhuan-the-giant-prince-of-benin': 'arhuan-the-giant-prince-of-benin',
};

export function getCuratedTopic(id: string): WeeklyEducationalTopic | null {
  if (!id) return null;
  const clean = id.trim().toLowerCase();

  // Direct match
  if (REAL_STORIES[clean]) {
    return REAL_STORIES[clean];
  }

  // Alias match
  const targetId = SLUG_MAP[clean];
  if (targetId && REAL_STORIES[targetId]) {
    return REAL_STORIES[targetId];
  }

  return null;
}
