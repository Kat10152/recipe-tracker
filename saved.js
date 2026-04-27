// getSaved, getUserRecipes, getAllRecipes, getRatings, syncUserData loaded from db.js

function unsave(id) {
  userData.savedRecipes = userData.savedRecipes.filter(s => s !== id);
  syncUserData();
  render();
}

function bookmarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M5 3h14a1 1 0 0 1 1 1v17l-8-4-8 4V4a1 1 0 0 1 1-1z"/>
  </svg>`;
}

const DIETARY_CLASS = { 'Vegan': 'vegan', 'Vegetarian': 'vegetarian', 'Gluten Free': 'gluten-free', 'Dairy Free': 'dairy-free' };

function cardHTML(r) {
  const timeTag     = r.time ? `<span class="tag">⏱ ${r.time}</span>` : '';
  const dietaryTags = (r.dietary || []).map(d => `<span class="tag tag--${DIETARY_CLASS[d] || ''}">${d}</span>`).join('');
  const rating      = getRatings()[r.id] || 0;
  return `
    <div class="recipe-card recipe-card--saved" onclick="openDetail('${r.id}')">
      <div class="recipe-card-emoji">${r.emoji || '🍽️'}</div>
      <div class="recipe-card-body">
        <h3 class="recipe-card-title">${r.name}</h3>
        <div class="recipe-card-tags">
          <span class="tag">${r.cuisine}</span>
          <span class="tag tag--${r.difficulty.toLowerCase()}">${r.difficulty}</span>
          ${timeTag}
          ${dietaryTags}
        </div>
        ${rating ? `<div class="card-stars">${displayStarsHTML(rating)}</div>` : ''}
      </div>
      <button
        class="save-btn save-btn--saved"
        onclick="event.stopPropagation(); unsave('${r.id}')"
        title="Remove from saved"
        aria-label="Remove from saved"
      >${bookmarkSVG()}</button>
    </div>
  `;
}

function render() {
  const savedIds     = getSaved();
  const all          = getAllRecipes();
  const savedRecipes = savedIds.map(id => all.find(r => r.id === id)).filter(Boolean);

  const myRecipes  = savedRecipes.filter(r =>  r.userCreated);
  const bookmarked = savedRecipes.filter(r => !r.userCreated);

  const empty       = document.getElementById('empty-state');
  const count       = document.getElementById('saved-count');
  const mySection   = document.getElementById('my-recipes-section');
  const savedSection = document.getElementById('saved-section');

  if (savedRecipes.length === 0) {
    mySection.classList.add('hidden');
    savedSection.classList.add('hidden');
    empty.classList.remove('hidden');
    count.textContent = auth.currentUser
      ? 'Your bookmarked recipes, all in one place.'
      : 'Log in to save and view your recipes.';
    return;
  }

  empty.classList.add('hidden');
  const total = savedRecipes.length;
  count.textContent = `You have ${total} saved recipe${total === 1 ? '' : 's'}.`;

  if (myRecipes.length > 0) {
    mySection.classList.remove('hidden');
    document.getElementById('my-recipes-grid').innerHTML = myRecipes.map(cardHTML).join('');
  } else {
    mySection.classList.add('hidden');
  }

  if (bookmarked.length > 0) {
    savedSection.classList.remove('hidden');
    document.getElementById('saved-grid').innerHTML = bookmarked.map(cardHTML).join('');
  } else {
    savedSection.classList.add('hidden');
  }
}

onDataLoaded(render);
