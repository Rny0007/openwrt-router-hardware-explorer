/* OpenWrt Hardware Knowledge Base — Zero Dependency Frontend Logic */
document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle with LocalStorage
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    });
  }

  // Interactive Live Filter for Directory & Explorer
  const searchInput = document.getElementById('search-input');
  const cards = document.querySelectorAll('.filter-card');
  if (searchInput && cards.length > 0) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Code Copy Buttons
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

  // Table of Contents Active Spy
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
        if (top <= 120) current = s.link.getAttribute('href');
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
