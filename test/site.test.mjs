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

  it('uses the supplied wide SAMUG logo artwork', async () => {
    const logo = await readFile(new URL('../assets/samug-logo.png', import.meta.url));
    assert.equal(logo.readUInt32BE(16), 900);
    assert.equal(logo.readUInt32BE(20), 300);
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
    assert.deepEqual(navLinks.map((link) => link.label), ['Wiki', 'Map', 'Dashboard', 'AU MeshCore']);
  });
});
