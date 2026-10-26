// Theme toggle (remembers choice; falls back to system preference)
const root = document.documentElement;
document.getElementById('themeToggle').addEventListener('click', () => {
  const isDark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = isDark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
});

// Highlight the menu link for the section in view
const links = document.querySelectorAll('.menu a');
const sections = [...document.querySelectorAll('section[id]')];
function updateActive() {
  const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
  let current = atBottom ? sections[sections.length - 1] : null;
  if (!current) sections.forEach((s) => { if (s.getBoundingClientRect().top < innerHeight * 0.35) current = s; });
  links.forEach((a) => a.classList.toggle('active', !!current && a.getAttribute('href') === '#' + current.id));
}
addEventListener('scroll', updateActive, { passive: true });
updateActive();

document.getElementById('year').textContent = new Date().getFullYear();
