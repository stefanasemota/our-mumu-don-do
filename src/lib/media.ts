const FIREBASE_STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'studio-748727496-885ed.firebasestorage.app';

/**
 * Resolves any relative media path (e.g. '/audio/story.mp3' or '/images/...')
 * to its direct Firebase Storage public streaming URL.
 * If already an absolute http(s) URL or empty, returns as-is.
 */
export function getMediaUrl(path?: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(cleanPath)}?alt=media`;
}
