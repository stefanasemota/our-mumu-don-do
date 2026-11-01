import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Project Sanity: package.json has required metadata', () => {
  const pkgPath = path.resolve('package.json');
  assert.ok(fs.existsSync(pkgPath), 'package.json must exist');

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  assert.equal(pkg.name, 'our-mumu-don-do');
  assert.ok(pkg.version, 'version must be specified');
  assert.ok(pkg.author, 'author must be specified');
  assert.ok(Array.isArray(pkg.keywords), 'keywords must be an array');
  assert.ok(
    pkg.scripts?.['test:unit'],
    'test:unit script must be specified'
  );
  assert.ok(
    pkg.scripts?.['test:e2e'],
    'test:e2e script must be specified'
  );
  assert.equal(
    pkg.devDependencies?.['vibe-coding-guardrail'],
    'github:stefanasemota/vibe-coding-guardrail',
    'vibe-coding-guardrail must be registered in devDependencies'
  );
});

test('Project Sanity: core configuration files exist', () => {
  assert.ok(fs.existsSync(path.resolve('.nvmrc')), '.nvmrc must exist');
  assert.ok(fs.existsSync(path.resolve('.gitignore')), '.gitignore must exist');
  assert.ok(fs.existsSync(path.resolve('README.md')), 'README.md must exist');
  assert.ok(fs.existsSync(path.resolve('AGENTS.md')), 'AGENTS.md must exist');
  assert.ok(fs.existsSync(path.resolve('ai-rules.json')), 'ai-rules.json must exist');
  assert.ok(fs.existsSync(path.resolve('decision.md')), 'decision.md must exist');
  assert.ok(fs.existsSync(path.resolve('aos-audit.md')), 'aos-audit.md must exist');
  assert.ok(fs.existsSync(path.resolve('src/repositories/storyRepository.ts')), 'storyRepository.ts must exist');
});
