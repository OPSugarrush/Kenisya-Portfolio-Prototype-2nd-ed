(() => {
  'use strict';

  const D = window.PORTFOLIO || { me: '', publications: [], articles: [], posters: [] };
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const esc = (s = '') =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const fmtDate = (iso, opts) => {
    const d = new Date(iso.length === 7 ? iso + '-01' : iso);
    return new Intl.DateTimeFormat('en-GB', { ...opts, timeZone: 'UTC' }).format(d);
  };

  /* ---------- Toast ---------- */

  const toast = $('#toast');
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (_) { /* ignore */ }
      ta.remove();
      return ok;
    }
  };

  /* ---------- Theme ---------- */

  const root = document.documentElement;
  const themeBtn = $('#theme-toggle');

  const applyTheme = (theme, persist) => {
    root.dataset.theme = theme;
    themeBtn.setAttribute('aria-pressed', String(theme === 'fluorescence'));
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'fluorescence' ? '#05050c' : '#f2eff7';
    if (persist) {
      try { localStorage.setItem('theme', theme); } catch (e) { /* storage unavailable */ }
    }
    window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
  };

  applyTheme(root.dataset.theme, false);
  themeBtn.addEventListener('click', () =>
    applyTheme(root.dataset.theme === 'fluorescence' ? 'histology' : 'fluorescence', true)
  );

  /* ---------- Publications ---------- */

  const pubs = [...D.publications].sort((a, b) => b.year - a.year);
  const pubList = $('#pub-list');
  const pubFilters = $('#pub-filters');
  const pubSearch = $('#pub-search');
  const pubStatus = $('#pub-status');
  const pubEmpty = $('#pub-empty');

  const citation = (p) =>
    `${p.authors.join(', ')} (${p.year}). ${p.title}. ${p.venue}${p.details ? ', ' + p.details : ''}. https://doi.org/${p.doi}`;

  const pubHTML = (p, i) => {
    const authors = p.authors
      .map((a) => (a === D.me ? `<strong>${esc(a)}</strong>` : esc(a)))
      .join(', ');
    const absId = `abstract-${i}`;
    return `
      <li class="pub" data-index="${i}">
        <p class="pub__year">${esc(p.year)}</p>
        <div class="pub__main">
          <p class="badge" data-type="${esc(p.type)}">${esc(p.type)}</p>
          <h3 class="pub__title"><a href="${esc(p.pdf)}" target="_blank" rel="noopener">${esc(p.title)}</a></h3>
          <p class="pub__authors">${authors}</p>
          <p class="pub__venue"><em>${esc(p.venue)}</em>${p.details ? ', ' + esc(p.details) : ''}</p>
          <p class="pub__summary">${esc(p.summary)}</p>
        </div>
        <div class="pub__actions">
          <a class="btn btn--sm" href="${esc(p.pdf)}" target="_blank" rel="noopener">PDF</a>
          <a class="btn btn--sm" href="https://doi.org/${esc(p.doi)}" target="_blank" rel="noopener">DOI</a>
          <button class="btn btn--sm" type="button" data-cite>Copy citation</button>
          <button class="btn btn--sm btn--toggle" type="button" data-abstract aria-expanded="false" aria-controls="${absId}">Abstract</button>
        </div>
        <div class="pub__abstract" id="${absId}" data-open="false"><div><p>${esc(p.abstract)}</p></div></div>
      </li>`;
  };

  pubList.innerHTML = pubs.map(pubHTML).join('');

  const state = { type: 'All', q: '' };
  const types = ['All', ...Array.from(new Set(pubs.map((p) => p.type)))];

  pubFilters.innerHTML = types
    .map((t) => {
      const n = t === 'All' ? pubs.length : pubs.filter((p) => p.type === t).length;
      return `<button class="chip" type="button" data-type="${esc(t)}" aria-pressed="${t === 'All'}">${esc(t)} <span class="chip__n">${n}</span></button>`;
    })
    .join('');

  const haystack = pubs.map((p) =>
    [p.title, p.authors.join(' '), p.venue, p.summary, p.abstract, (p.tags || []).join(' ')].join(' ').toLowerCase()
  );

  const applyFilters = () => {
    const q = state.q.trim().toLowerCase();
    const terms = q ? q.split(/\s+/) : [];
    let shown = 0;
    $$('.pub', pubList).forEach((li) => {
      const i = Number(li.dataset.index);
      const okType = state.type === 'All' || pubs[i].type === state.type;
      const okText = terms.every((t) => haystack[i].includes(t));
      const show = okType && okText;
      li.hidden = !show;
      if (show) shown += 1;
    });
    const filtered = state.type !== 'All' || terms.length > 0;
    pubStatus.textContent = filtered ? `Showing ${shown} of ${pubs.length} publications` : '';
    pubEmpty.hidden = shown !== 0;
  };

  pubFilters.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    state.type = btn.dataset.type;
    $$('.chip', pubFilters).forEach((c) => c.setAttribute('aria-pressed', String(c === btn)));
    applyFilters();
  });

  pubSearch.addEventListener('input', () => {
    state.q = pubSearch.value;
    applyFilters();
  });

  $('#pub-clear').addEventListener('click', () => {
    state.type = 'All';
    state.q = '';
    pubSearch.value = '';
    $$('.chip', pubFilters).forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.type === 'All')));
    applyFilters();
  });

  pubList.addEventListener('click', async (e) => {
    const li = e.target.closest('.pub');
    if (!li) return;
    const p = pubs[Number(li.dataset.index)];

    const toggle = e.target.closest('[data-abstract]');
    if (toggle) {
      const panel = $('#' + toggle.getAttribute('aria-controls'));
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      panel.dataset.open = String(open);
      return;
    }

    if (e.target.closest('[data-cite]')) {
      const ok = await copyText(citation(p));
      showToast(ok ? 'Citation copied' : 'Could not copy. Select the text manually.');
    }
  });

  /* ---------- Articles ---------- */

  $('#article-list').innerHTML = D.articles
    .map(
      (a) => `
      <li class="article">
        <p class="badge">${esc(a.kind)}</p>
        <h3 class="article__title"><a href="${esc(a.url)}" target="_blank" rel="noopener">${esc(a.title)}</a></h3>
        <p class="article__meta">
          <strong>${esc(a.outlet)}</strong>
          <time datetime="${esc(a.date)}">${fmtDate(a.date, { day: 'numeric', month: 'short', year: 'numeric' })}</time>
          <span>${esc(a.minutes)} min read</span>
        </p>
        <p class="article__summary">${esc(a.summary)}</p>
      </li>`
    )
    .join('');

  /* ---------- Posters and talks ---------- */

  $('#poster-list').innerHTML = D.posters
    .map(
      (p, i) => `
      <li class="poster">
        <div class="poster__thumb v${(i % 3) + 1}" aria-hidden="true">
          <span class="pt-head"></span><span class="pt-title"></span><span class="pt-col"></span><span class="pt-col"></span><span class="pt-fig"></span>
        </div>
        <div class="poster__text">
          <p class="badge" data-type="${esc(p.kind)}">${esc(p.kind)}</p>
          <h3 class="poster__title">${esc(p.title)}</h3>
          <p class="poster__event">${esc(p.event)}</p>
          <p class="poster__meta">
            <span>${esc(p.location)}</span>
            <time datetime="${esc(p.date)}">${fmtDate(p.date, { month: 'short', year: 'numeric' })}</time>
          </p>
          ${p.award ? `<p class="poster__award">${esc(p.award)}</p>` : ''}
          <a class="btn btn--sm" href="${esc(p.file)}" target="_blank" rel="noopener">${p.kind === 'Poster' ? 'Open poster' : 'Open slides'} (PDF)</a>
        </div>
      </li>`
    )
    .join('');

  /* ---------- Counts ---------- */

  const counts = { publications: pubs.length, articles: D.articles.length, posters: D.posters.length };
  $$('[data-count]').forEach((el) => {
    el.textContent = counts[el.dataset.count] ?? '';
  });

  const peerReviewed = pubs.filter((p) => p.type !== 'Preprint').length;
  $('#glance').innerHTML = [
    [pubs.length, 'Publications'],
    [peerReviewed, 'Peer reviewed'],
    [D.articles.length, 'Articles written'],
    [D.posters.length, 'Posters and talks']
  ]
    .map(([n, label]) => `<div><dt>${esc(label)}</dt><dd>${n}</dd></div>`)
    .join('');

  /* ---------- Scroll spy ---------- */

  const navLinks = $$('.nav a');
  const targets = navLinks
    .map((a) => $(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const navEl = $('.nav');
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((a) => {
            if (a.getAttribute('href') === '#' + entry.target.id) {
              a.setAttribute('aria-current', 'true');
              // On narrow screens the nav scrolls sideways; keep the active link in view
              if (window.innerWidth <= 1020) navEl.scrollTo({ left: a.offsetLeft - 16, behavior: 'smooth' });
            } else {
              a.removeAttribute('aria-current');
            }
          });
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    targets.forEach((t) => spy.observe(t));
  }

  /* ---------- Back to top ---------- */

  const toTop = $('#back-to-top');
  const onScroll = () => toTop.classList.toggle('is-visible', window.scrollY > 700);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
