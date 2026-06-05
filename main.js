document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginCard = document.getElementById('loginCard');
  const profileCard = document.getElementById('profileCard');
  const displayName = document.getElementById('displayName');
  const loginMessage = document.getElementById('loginMessage');
  const logoutButton = document.getElementById('logoutButton');
  const logoutSection = document.getElementById('logoutSection');
  const themeToggle = document.getElementById('themeToggle');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const pageNav = document.querySelector('.page-nav');
  const loginNavLink = document.querySelector('.nav-links a[href="#loginCard"]');

  function updateTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    document.body.classList.toggle('light-mode', theme === 'light');

    if (themeToggle) {
      const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
      const icon = theme === 'dark' ? 'dark_mode' : 'wb_sunny';
      themeToggle.setAttribute('aria-label', label);
      themeToggle.setAttribute('title', label);
      const iconElement = themeToggle.querySelector('.icon');
      if (iconElement) {
        iconElement.textContent = icon;
      }
    }

    localStorage.setItem('theme', theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
      updateTheme(nextTheme);
    });
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  updateTheme(localStorage.getItem('theme') || 'dark');

  function showProfile(username) {
    if (displayName) {
      displayName.textContent = username || 'Guest';
    }

    if (loginCard) {
      loginCard.classList.add('hidden');
    }

    if (profileCard) {
      profileCard.classList.remove('hidden');
    }

    if (logoutSection) {
      logoutSection.classList.remove('hidden');
    }

    if (logoutButton) {
      logoutButton.classList.remove('hidden');
    }

    if (loginMessage) {
      loginMessage.textContent = '';
    }

    if (pageNav) {
      pageNav.classList.remove('hidden');
    }

    if (loginNavLink) {
      loginNavLink.classList.add('hidden');
    }
  }

  function showLogin() {
    if (loginCard) {
      loginCard.classList.remove('hidden');
    }

    if (profileCard) {
      profileCard.classList.add('hidden');
    }

    if (logoutSection) {
      logoutSection.classList.add('hidden');
    }

    if (logoutButton) {
      logoutButton.classList.add('hidden');
    }

    if (loginForm) {
      loginForm.reset();
    }

    if (loginMessage) {
      loginMessage.textContent = '';
    }

    if (pageNav) {
      pageNav.classList.add('hidden');
    }

    if (loginNavLink) {
      loginNavLink.classList.remove('hidden');
    }
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const usernameInput = document.getElementById('username');
      const passwordInput = document.getElementById('password');
      const username = usernameInput ? usernameInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value.trim() : '';

      if (!username || !password) {
        if (loginMessage) {
          loginMessage.textContent = 'Please enter a username and password.';
        }
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

  const sectionLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.target.id) {
            return;
          }

          const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (entry.isIntersecting) {
            sectionLinks.forEach((item) => item.classList.remove('active'));
            if (link) {
              link.classList.add('active');
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40% 0px',
        threshold: 0.1,
      }
    );

    sections.forEach((section) => observer.observe(section));

    sectionLinks.forEach((link) => {
      link.addEventListener('click', () => {
        sectionLinks.forEach((item) => item.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }
});