import type { WeeklyEducationalTopic } from '@/types';
import { TopicCard } from './TopicCard';

interface TopicGridProps {
  topics: WeeklyEducationalTopic[];
}

export function TopicGrid({ topics }: TopicGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {topics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
}
