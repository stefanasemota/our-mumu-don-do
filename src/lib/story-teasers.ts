/**
 * Resolves the static pre-rendered 15-second teaser MP4 video URL for a story.
 * Pre-rendered with ambient backdrop, cover artwork, authentic audio, and soundwaves.
 */
export function getStoryTeaserUrl(storyId?: string): string {
  if (!storyId) return '/teasers/the-great-giants-of-zazzau.mp4';
  const cleanId = storyId.trim().toLowerCase();
  return `/teasers/${cleanId}.mp4`;
}
