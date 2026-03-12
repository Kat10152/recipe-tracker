// getSaved, getUserRecipes, getAllRecipes, getRatings, syncUserData loaded from db.js

function toggleSave(id) {
  if (!requireAuth()) return;
  const idx = userData.savedRecipes.indexOf(id);
  if (idx === -1) {
    userData.savedRecipes.push(id);
  } else {
    userData.savedRecipes.splice(idx, 1);
  }
  syncUserData();
  renderCards();
}

function bookmarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M5 3h14a1 1 0 0 1 1 1v17l-8-4-8 4V4a1 1 0 0 1 1-1z"/>
  </svg>`;
}

function renderCards() {
  const query      = document.getElementById('search').value.toLowerCase();
  const cuisine    = document.getElementById('filter-cuisine').value;
  const difficulty = document.getElementById('filter-difficulty').value;
  const saved      = getSaved();
  const ratings    = getRatings();

  const filtered = getAllRecipes().filter(r => {
    const matchesSearch     = r.name.toLowerCase().includes(query) || r.cuisine.toLowerCase().includes(query);
    const matchesCuisine    = !cuisine    || r.cuisine    === cuisine;
    const matchesDifficulty = !difficulty || r.difficulty === difficulty;
    return matchesSearch && matchesCuisine && matchesDifficulty;
  });

  const grid      = document.getElementById('recipes-grid');
  const noResults = document.getElementById('no-results');

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.classList.remove('hidden');
    return;
  }
  noResults.classList.add('hidden');

  grid.innerHTML = filtered.map(r => {
    const isSaved = saved.includes(r.id);
    const timeTag = r.time ? `<span class="tag">⏱ ${r.time}</span>` : '';
    const rating  = ratings[r.id] || 0;
    return `
      <div class="recipe-card ${isSaved ? 'recipe-card--saved' : ''}" onclick="openDetail('${r.id}')">
        <div class="recipe-card-emoji">${r.emoji || '🍽️'}</div>
        <div class="recipe-card-body">
          <h3 class="recipe-card-title">${r.name}</h3>
          <div class="recipe-card-tags">
            ${r.userCreated ? '<span class="tag tag--custom">My Recipe</span>' : ''}
            <span class="tag">${r.cuisine}</span>
            <span class="tag tag--${r.difficulty.toLowerCase()}">${r.difficulty}</span>
            ${timeTag}
          </div>
          ${rating ? `<div class="card-stars">${displayStarsHTML(rating)}</div>` : ''}
        </div>
        <button
          class="save-btn ${isSaved ? 'save-btn--saved' : ''}"
          onclick="event.stopPropagation(); toggleSave('${r.id}')"
          title="${isSaved ? 'Remove from saved' : 'Save recipe'}"
          aria-label="${isSaved ? 'Remove from saved' : 'Save recipe'}"
        >${bookmarkSVG()}</button>
      </div>
    `;
  }).join('');
}

// ── Create Recipe Modal ───────────────────────────────────
const overlay = document.getElementById('modal-overlay');

function openModal() {
  if (!requireAuth()) return;
  overlay.classList.remove('hidden');
  document.getElementById('r-name').focus();
}

function closeModal() {
  overlay.classList.add('hidden');
  document.getElementById('create-recipe-form').reset();
  document.getElementById('form-error').classList.add('hidden');
}

document.getElementById('btn-create-recipe').addEventListener('click', openModal);
document.getElementById('modal-close').addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !overlay.classList.contains('hidden')) closeModal();
});

document.getElementById('create-recipe-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('r-name').value.trim();
  if (!name) {
    document.getElementById('form-error').classList.remove('hidden');
    return;
  }

  const ingredientsRaw = document.getElementById('r-ingredients').value.trim();
  const stepsRaw       = document.getElementById('r-steps').value.trim();

  const newRecipe = {
    id:          'u_' + Date.now(),
    name,
    emoji:       document.getElementById('r-emoji').value.trim() || '🍽️',
    cuisine:     document.getElementById('r-cuisine').value,
    difficulty:  document.getElementById('r-difficulty').value,
    time:        document.getElementById('r-time').value.trim(),
    servings:    document.getElementById('r-servings').value.trim(),
    description: document.getElementById('r-description').value.trim(),
    ingredients: ingredientsRaw ? ingredientsRaw.split('\n').map(l => l.trim()).filter(Boolean) : [],
    steps:       stepsRaw       ? stepsRaw.split('\n').map(l => l.trim()).filter(Boolean)       : [],
    userCreated: true,
  };

  userData.userRecipes.unshift(newRecipe);
  userData.savedRecipes.push(newRecipe.id);
  syncUserData();

  closeModal();
  renderCards();
});

// ── Filters ───────────────────────────────────────────────
document.getElementById('search').addEventListener('input', renderCards);
document.getElementById('filter-cuisine').addEventListener('change', renderCards);
document.getElementById('filter-difficulty').addEventListener('change', renderCards);

document.getElementById('btn-add').addEventListener('click', openModal);
document.getElementById('btn-saved').addEventListener('click', () => {
  window.location.href = 'saved.html';
});

onDataLoaded(renderCards);
