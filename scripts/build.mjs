import { cp, mkdir, rm, writeFile } from 'node:fs/promises';

await rm('build', { recursive: true, force: true });
await mkdir('build', { recursive: true });
await cp('assets', 'build/assets', { recursive: true });
await cp('src', 'build/src', { recursive: true });
await cp('index.html', 'build/index.html');
await cp('robots.txt', 'build/robots.txt');
await cp('sitemap.xml', 'build/sitemap.xml');
await writeFile('build/deploy-info.json', JSON.stringify({
  source: 'github-actions',
  repository: process.env.GITHUB_REPOSITORY ?? null,
  ref: process.env.GITHUB_REF ?? null,
  sha: process.env.GITHUB_SHA ?? null,
  createdUtc: new Date().toISOString()
}, null, 2) + '\n');
