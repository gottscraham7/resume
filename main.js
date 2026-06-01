document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginCard = document.getElementById('loginCard');
  const profileCard = document.getElementById('profileCard');
  const displayName = document.getElementById('displayName');
  const loginMessage = document.getElementById('loginMessage');
  const logoutButton = document.getElementById('logoutButton');
  const themeToggle = document.getElementById('themeToggle');

  function updateTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    document.body.classList.toggle('light-mode', theme === 'light');
    if (themeToggle) {
      const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
      const iconText = theme === 'dark' ? 'dark_mode' : 'wb_sunny';
      themeToggle.setAttribute('aria-label', label);
      themeToggle.setAttribute('title', label);
      const icon = themeToggle.querySelector('.icon');
      if (icon) icon.textContent = iconText;
    }
    localStorage.setItem('theme', theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
      updateTheme(nextTheme);
    });
  }

  updateTheme(localStorage.getItem('theme') || 'light');

  function showProfile(userName) {
    if (displayName) displayName.textContent = userName;
    if (loginCard) loginCard.classList.add('hidden');
    if (profileCard) profileCard.classList.remove('hidden');
    if (logoutButton) logoutButton.classList.remove('hidden');
    if (loginMessage) loginMessage.textContent = '';
  }

  function showLogin() {
    if (loginCard) loginCard.classList.remove('hidden');
    if (profileCard) profileCard.classList.add('hidden');
    if (logoutButton) logoutButton.classList.add('hidden');
    if (loginForm) loginForm.reset();
    if (loginMessage) loginMessage.textContent = '';
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      if (!username || !password) {
        if (loginMessage) loginMessage.textContent = 'Please enter a username and password.';
        return;
      }

      showProfile(username);
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      showLogin();
    });
  }

  const clickBadge = document.getElementById('clickBadge');
  if (clickBadge) {
    let viewCount = Number(localStorage.getItem('viewCount') || 0);
    viewCount += 1;
    localStorage.setItem('viewCount', viewCount);
    clickBadge.textContent = `Page views: ${viewCount}`;
  }
});
