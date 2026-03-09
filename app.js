// Animate feature cards into view when they scroll into the viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.feature-card').forEach((card) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(card);
});

// Hero buttons
document.querySelector('.btn-primary').addEventListener('click', () => {
  alert('Recipe Tracker is coming soon! Stay tuned.');
});

document.querySelector('.btn-secondary').addEventListener('click', () => {
  alert('Browse Recipes — coming soon!');
});

// Navbar buttons
document.getElementById('btn-add').addEventListener('click', () => {
  alert('Add Recipe — coming soon!');
});

document.getElementById('btn-saved').addEventListener('click', () => {
  alert('Saved Recipes — coming soon!');
});
