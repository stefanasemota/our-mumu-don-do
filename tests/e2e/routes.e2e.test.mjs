import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('E2E Route Boundary: story and share routes delegate data fetching to src/repositories', () => {
  const repoPath = path.resolve('src/repositories/storyRepository.ts');
  assert.ok(fs.existsSync(repoPath), 'src/repositories/storyRepository.ts must exist');

  const storyRoute = fs.readFileSync(path.resolve('src/app/story/[id]/page.tsx'), 'utf-8');
  assert.ok(
    storyRoute.includes("from '@/repositories'"),
    'Story route must import from @/repositories'
  );
  assert.ok(
    !storyRoute.includes("from 'firebase/firestore'"),
    'Story route must not import firebase/firestore directly'
  );

  const shareRoute = fs.readFileSync(path.resolve('src/app/share/story/[id]/page.tsx'), 'utf-8');
  assert.ok(
    shareRoute.includes("from '@/repositories'"),
    'Share route must import from @/repositories'
  );
  assert.ok(
    !shareRoute.includes("from 'firebase/firestore'"),
    'Share route must not import firebase/firestore directly'
  );
});

test('E2E Public Endpoints: core App Router pages and llms.txt exist', () => {
  assert.ok(fs.existsSync(path.resolve('src/app/page.tsx')), 'Home route must exist');
  assert.ok(fs.existsSync(path.resolve('src/app/about/page.tsx')), 'About route must exist');
  assert.ok(fs.existsSync(path.resolve('src/app/sitemap.ts')), 'Sitemap generator must exist');
  assert.ok(fs.existsSync(path.resolve('src/app/robots.ts')), 'Robots generator must exist');
  assert.ok(fs.existsSync(path.resolve('public/llms.txt')), 'public/llms.txt must exist');
});
