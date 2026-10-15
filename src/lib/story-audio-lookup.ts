export function getStoryAudioPath(storyId?: string, title?: string): string {
  const lowerTitle = (title || '').toLowerCase();
  const lowerId = (storyId || '').toLowerCase();

  // 1. Check title keywords first
  if (lowerTitle.includes('zazzau') || lowerTitle.includes('giant')) {
    if (lowerTitle.includes('arhuan') || lowerTitle.includes('benin')) {
      return '/audio/arhuan-the-giant-prince-of-benin.mp3';
    }
    return '/audio/The_Great_Giants_of_Zazzau.mp3';
  }
  if (lowerTitle.includes('arhuan')) {
    return '/audio/arhuan-the-giant-prince-of-benin.mp3';
  }
  if (lowerTitle.includes('glass') || lowerTitle.includes('milk')) {
    return '/audio/The-Glass-of-Milk.mp3';
  }
  if (lowerTitle.includes('signature')) {
    return '/audio/The-Kings-Signature.mp3';
  }
  if (lowerTitle.includes('river of') || lowerTitle.includes('thousand songs')) {
    return '/audio/The-River-of-a-Thousand-Songs.mp3';
  }
  if (lowerTitle.includes('river was') || lowerTitle.includes('always there')) {
    return '/audio/The-River-was-always-there.mp3';
  }
  if (lowerTitle.includes('colonisation') || lowerTitle.includes('colonization')) {
    return '/audio/Colonisation.mp3';
  }
  if (lowerTitle.includes('never lost')) {
    return '/audio/we-were-never-lost.mp3';
  }

  // 2. Check story ID mappings
  const map: Record<string, string> = {
    'the-great-giants-of-zazzau': '/audio/The_Great_Giants_of_Zazzau.mp3',
    'arhuan-the-giant-prince-of-benin': '/audio/arhuan-the-giant-prince-of-benin.mp3',
    '1': '/audio/The-Glass-of-Milk.mp3',
    '2': '/audio/Colonisation.mp3',
    'understanding-colonisation': '/audio/Colonisation.mp3',
    'colonisation': '/audio/Colonisation.mp3',
    '3': '/audio/The-Kings-Signature.mp3',
    'the-kings-signature': '/audio/The-Kings-Signature.mp3',
    '4': '/audio/The-River-was-always-there.mp3',
    'the-river-was-always-there': '/audio/The-River-was-always-there.mp3',
    '5': '/audio/we-were-never-lost.mp3',
    'we-were-never-lost': '/audio/we-were-never-lost.mp3',
    '6': '/audio/The-River-of-a-Thousand-Songs.mp3',
    'the-river-of-a-thousand-songs': '/audio/The-River-of-a-Thousand-Songs.mp3',
  };

  if (lowerId && map[lowerId]) {
    return map[lowerId];
  }

  return '/audio/The_Great_Giants_of_Zazzau.mp3';
}
