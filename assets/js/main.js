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
});
