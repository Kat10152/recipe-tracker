function getSaved() {
  return JSON.parse(localStorage.getItem('savedRecipes') || '[]');
}

function getUserRecipes() {
  return JSON.parse(localStorage.getItem('userRecipes') || '[]');
}

function getAllRecipes() {
  return [...getUserRecipes(), ...RECIPES];
}

function unsave(id) {
  const saved = getSaved().filter(s => s !== id);
  localStorage.setItem('savedRecipes', JSON.stringify(saved));
  render();
}

function bookmarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M5 3h14a1 1 0 0 1 1 1v17l-8-4-8 4V4a1 1 0 0 1 1-1z"/>
  </svg>`;
}

function render() {
  const savedIds = getSaved();
  const all = getAllRecipes();
  const savedRecipes = savedIds
    .map(id => all.find(r => r.id === id))
    .filter(Boolean);

  const grid = document.getElementById('saved-grid');
  const empty = document.getElementById('empty-state');
  const count = document.getElementById('saved-count');

  if (savedRecipes.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    count.textContent = 'Your bookmarked recipes, all in one place.';
    return;
  }

  empty.classList.add('hidden');
  count.textContent = `You have ${savedRecipes.length} saved recipe${savedRecipes.length === 1 ? '' : 's'}.`;

  grid.innerHTML = savedRecipes.map(r => {
    const timeTag = r.time ? `<span class="tag">⏱ ${r.time}</span>` : '';
    return `
      <div class="recipe-card recipe-card--saved">
        <div class="recipe-card-emoji">${r.emoji || '🍽️'}</div>
        <div class="recipe-card-body">
          <h3 class="recipe-card-title">${r.name}</h3>
          <div class="recipe-card-tags">
            ${r.userCreated ? '<span class="tag tag--custom">My Recipe</span>' : ''}
            <span class="tag">${r.cuisine}</span>
            <span class="tag tag--diff tag--${r.difficulty.toLowerCase()}">${r.difficulty}</span>
            ${timeTag}
          </div>
        </div>
        <button
          class="save-btn save-btn--saved"
          onclick="unsave('${r.id}')"
          title="Remove from saved"
          aria-label="Remove from saved"
        >${bookmarkSVG()}</button>
      </div>
    `;
  }).join('');
}

render();
