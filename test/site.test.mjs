import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { navLinks, resourceLinks } from '../src/links.mjs';

describe('SA Mesh landing site contract', () => {
  it('links to public resources and SEO entry points in the preferred order', () => {
    assert.deepEqual(resourceLinks.map((link) => link.label), [
      'Wiki',
      'MeshCore South Australia',
      'Frequency & Settings',
      'Dashboard',
      'Map',
      'Discord',
      'The Mesh Australia'
    ]);
    assert.equal(resourceLinks[0].href, 'https://wiki.samesh.au/');
    assert.equal(resourceLinks[1].href, 'https://wiki.samesh.au/meshcore/south-australia');
    assert.equal(resourceLinks[2].href, 'https://wiki.samesh.au/meshcore/recommended-settings');
    assert.equal(resourceLinks[3].href, 'https://sa.themesh.au/');
    assert.equal(resourceLinks[4].href, 'https://sa.themesh.au/map');
    assert.equal(resourceLinks[5].href, 'https://discord.gg/w9b7EBNC8X');
  });

  it('renders crawlable static links, SAMUG artwork and app module', async () => {
    const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
    assert.match(html, /MeshCore South Australia \| SA Mesh/);
    assert.match(html, /href="https:\/\/wiki\.samesh\.au\/"/);
    assert.match(html, /href="https:\/\/wiki\.samesh\.au\/meshcore\/south-australia"/);
    assert.match(html, /href="https:\/\/wiki\.samesh\.au\/meshcore\/recommended-settings"/);
    assert.match(html, /href="https:\/\/discord\.gg\/w9b7EBNC8X"/);
    assert.match(html, /assets\/samug-logo\.png/);
    assert.match(html, /src\/app\.mjs/);
  });

  it('uses the supplied wide SAMUG logo artwork with descriptive alt text', async () => {
    const logo = await readFile(new URL('../assets/samug-logo.png', import.meta.url));
    assert.equal(logo.readUInt32BE(16), 900);
    assert.equal(logo.readUInt32BE(20), 300);
    const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
    assert.match(html, /alt="SA Mesh South Australia community logo"/);
    assert.match(html, /alt="SA Mesh South Australia community banner"/);
    const css = await readFile(new URL('../assets/style.css', import.meta.url), 'utf8');
    assert.match(css, /\.sa-logo-mark \{ width:150px/);
    assert.match(css, /\.sa-panel-logo \{ width:min\(100%, 420px\)/);
  });

  it('uses the SA:MUG icon set for browser favicons', async () => {
    const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
    assert.match(html, /assets\/favicon\.ico/);
    assert.match(html, /assets\/favicon-32\.png/);
    assert.match(html, /assets\/favicon-192\.png/);
    assert.match(html, /assets\/favicon-180\.png/);
  });

  it('keeps top nav focused on public resources', () => {
    assert.deepEqual(navLinks.map((link) => link.label), ['Wiki', 'Start Here', 'Dashboard', 'Map', 'Discord', 'AU MeshCore']);
  });

  it('adds SEO primitives for search discovery', async () => {
    const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
    assert.match(html, /<title>MeshCore South Australia \| SA Mesh<\/title>/);
    assert.match(html, /name="description" content="SA Mesh is the MeshCore South Australia community hub/);
    assert.match(html, /rel="canonical" href="https:\/\/samesh\.au\/"/);
    assert.match(html, /type="application\/ld\+json"/);
    assert.match(html, /"alternateName": "MeshCore South Australia"/);
  });

  it('ships robots and sitemap files in the static artifact', async () => {
    const robots = await readFile(new URL('../robots.txt', import.meta.url), 'utf8');
    assert.match(robots, /User-agent: \*/);
    assert.match(robots, /Sitemap: https:\/\/samesh\.au\/sitemap\.xml/);
    assert.doesNotMatch(robots, /<!doctype html>/i);

    const sitemap = await readFile(new URL('../sitemap.xml', import.meta.url), 'utf8');
    assert.match(sitemap, /<loc>https:\/\/samesh\.au\/<\/loc>/);
    assert.doesNotMatch(sitemap, /<!doctype html>/i);

    const build = await readFile(new URL('../scripts/build.mjs', import.meta.url), 'utf8');
    assert.match(build, /robots\.txt/);
    assert.match(build, /sitemap\.xml/);
  });

  it('left-aligns the panel logo on narrow desktop-view mobile layouts', async () => {
    const css = await readFile(new URL('../assets/style.css', import.meta.url), 'utf8');
    assert.match(css, /\.sa-panel-logo \{[^}]*margin:0 auto 24px 0/);
    assert.match(css, /@media \(max-width: 980px\) \{[^}]*justify-items:start/);
    assert.match(css, /\.sa-site-logo \{ justify-self:start; \}/);
  });
});
