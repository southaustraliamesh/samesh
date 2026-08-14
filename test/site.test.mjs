import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { navLinks, resourceLinks } from '../src/links.mjs';

describe('SA Mesh landing site contract', () => {
  it('links to wiki, map and dashboard in the preferred order', () => {
    assert.deepEqual(resourceLinks.slice(0, 3).map((link) => link.label), ['Wiki', 'Dashboard', 'Map']);
    assert.equal(resourceLinks[0].href, 'https://wiki.samesh.au/');
    assert.equal(resourceLinks[1].href, 'https://sa.themesh.au/');
    assert.equal(resourceLinks[2].href, 'https://sa.themesh.au/map');
  });

  it('renders the SAMUG logo and app module', async () => {
    const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
    assert.match(html, /SA Mesh/);
    assert.match(html, /assets\/samug-logo\.png/);
    assert.match(html, /src\/app\.mjs/);
  });

  it('keeps top nav focused on public resources', () => {
    assert.deepEqual(navLinks.map((link) => link.label), ['Wiki', 'Map', 'Dashboard', 'AU MeshCore']);
  });
});
