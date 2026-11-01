import { collection, doc, getDoc, orderBy, query, type Firestore } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { getCuratedTopic, resolveTopicMedia } from '@/lib/curated-topics';
import type { WeeklyEducationalTopic } from '@/types';

const TOPICS_COLLECTION = 'weeklyEducationalTopics';

/**
 * Builds a Firestore query for all weekly educational topics ordered newest first.
 */
export function buildTopicsOrderedQuery(firestore: Firestore | null) {
  if (!firestore) return null;
  return query(collection(firestore, TOPICS_COLLECTION), orderBy('date', 'desc'));
}

/**
 * Fetches a topic by ID from Firestore and merges/falls back to the curated catalog.
 */
export async function fetchTopicWithCuratedFallback(
  id: string
): Promise<WeeklyEducationalTopic | null> {
  const curated = getCuratedTopic(id);

  try {
    if (db) {
      const docRef = doc(db, TOPICS_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data) {
          let dateString = '';
          if (data.date?.toDate) {
            dateString = data.date.toDate().toISOString();
          } else if (data.date) {
            dateString = new Date(data.date).toISOString();
          }

          return resolveTopicMedia({
            ...curated,
            ...data,
            audioUrlDeCH: data.audioUrlDeCH || curated?.audioUrlDeCH,
            id: docSnap.id,
            date: dateString,
          } as WeeklyEducationalTopic);
        }
      }
    }
  } catch (error) {
    console.warn(`[StoryRepository] Firestore fetch failed for "${id}", using curated fallback:`, error);
  }

  return curated ?? null;
}
