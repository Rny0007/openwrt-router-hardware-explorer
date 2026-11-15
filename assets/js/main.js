/* OpenWrt Hardware Knowledge Base — Zero Dependency Futuristic Frontend Logic */
document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle with LocalStorage & Meta Theme Sync
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const theme = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    });
  }

  // Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const drawerClose = document.getElementById('mobile-drawer-close');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const drawer = document.getElementById('mobile-nav-drawer');

  function openDrawer() {
    document.body.classList.add('drawer-open');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    if (drawer) drawer.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    document.body.classList.remove('drawer-open');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    if (drawer) drawer.setAttribute('aria-hidden', 'true');
  }

  if (mobileToggle) mobileToggle.addEventListener('click', () => {
    if (document.body.classList.contains('drawer-open')) closeDrawer();
    else openDrawer();
  });
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('drawer-open')) {
      closeDrawer();
    }
  });

  document.querySelectorAll('.mobile-nav-links a').forEach(a => {
    a.addEventListener('click', closeDrawer);
  });

  // Global Keyboard Shortcut: Pressing '/' focuses search input
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      const heroSearch = document.getElementById('hero-search-input');
      const searchInput = document.getElementById('search-input');
      if (heroSearch) {
        heroSearch.focus();
      } else if (searchInput) {
        searchInput.focus();
      } else {
        const searchBtn = document.querySelector('.header-search-btn');
        if (searchBtn) window.location.href = searchBtn.getAttribute('href');
      }
    }
  });

  // Homepage Hero Search & Suggestion Pills
  const heroSearchInput = document.getElementById('hero-search-input');
  if (heroSearchInput) {
    heroSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = heroSearchInput.value.trim();
        if (val) {
          window.location.href = `explorer/index.html?q=${encodeURIComponent(val)}`;
        }
      }
    });

    document.querySelectorAll('.suggestion-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const q = pill.getAttribute('data-query');
        if (q) window.location.href = `explorer/index.html?q=${encodeURIComponent(q)}`;
      });
    });
  }

  // Homepage Filter Tabs Interactivity
  const filterTabs = document.querySelectorAll('.filter-tab-btn');
  const featuredCards = document.querySelectorAll('.featured-device-card');
  if (filterTabs.length > 0 && featuredCards.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.getAttribute('data-filter');
        featuredCards.forEach(card => {
          const cardStatus = card.getAttribute('data-status');
          if (filter === 'ALL' || cardStatus === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Directory Search Filter
  const directorySearch = document.getElementById('search-input');
  const filterRows = document.querySelectorAll('.filter-card');
  if (directorySearch && filterRows.length > 0) {
    directorySearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      filterRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  // Code Copy Buttons with Toast Notification
  document.querySelectorAll('pre').forEach((pre) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code snippet to clipboard');
    wrapper.appendChild(btn);

    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code') ? pre.querySelector('code').innerText : pre.innerText;
      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      } catch (err) {
        btn.textContent = 'Failed';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      }
    });
  });

  // Table of Contents Active Spy for Documentation Layout
  const tocLinks = document.querySelectorAll('.docs-sidebar a');
  const sections = [];
  tocLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) sections.push({ link, target });
    }
  });

  if (sections.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        const top = s.target.getBoundingClientRect().top;
        if (top <= 140) current = s.link.getAttribute('href');
      });
      tocLinks.forEach(l => {
        if (l.getAttribute('href') === current) {
          l.classList.add('active-toc');
        } else {
          l.classList.remove('active-toc');
        }
      });
    }, { passive: true });
  }
});
