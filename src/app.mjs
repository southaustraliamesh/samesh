import { navLinks, resourceLinks } from './links.mjs';

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

function renderLinks() {
  const topNav = document.querySelector('#top-nav');
  if (topNav) {
    topNav.innerHTML = navLinks.map((link, index) => {
      const primary = index === 0 ? ' primary' : '';
      return `<a class="sa-top-nav-link${primary}" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}<span aria-hidden="true">↗</span></a>`;
    }).join('');
  }

  const actions = document.querySelector('#primary-actions');
  if (actions) {
    actions.innerHTML = resourceLinks.slice(0, 3).map((link) => {
      const primary = link.primary ? ' primary' : '';
      return `<a class="sa-button${primary}" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}<span aria-hidden="true">↗</span></a>`;
    }).join('');
  }

  const cards = document.querySelector('#resource-cards');
  if (cards) {
    cards.innerHTML = resourceLinks.map((link, index) => `
      <a class="sa-card${link.primary ? ' primary' : ''}" href="${escapeHtml(link.href)}">
        <span class="sa-number">${index + 1}</span>
        <span><strong>${escapeHtml(link.label)}</strong><small>${escapeHtml(link.summary)}</small></span>
      </a>
    `).join('');
  }
}

renderLinks();
