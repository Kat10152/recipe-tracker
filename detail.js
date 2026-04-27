// ── Ratings ───────────────────────────────────────────────
function saveRating(id, stars) {
  if (!requireAuth()) return;
  userData.ratings[id] = stars;
  syncUserData();
  renderStars(id, stars);
  const label = document.getElementById('stars-label');
  if (label) label.textContent = `${stars} / 5`;
  if (typeof renderCards === 'function') renderCards();
  if (typeof render === 'function') render();
}

function renderStars(id, current) {
  const container = document.getElementById('stars-input');
  if (!container) return;
  container.innerHTML = interactiveStarsHTML(id, current);
}

function interactiveStarsHTML(id, current) {
  return [1, 2, 3, 4, 5].map(n => `
    <span
      class="star-btn ${n <= current ? 'star-btn--filled' : ''}"
      onclick="saveRating('${id}', ${n})"
      onmouseover="hoverStars(${n})"
      onmouseleave="renderStars('${id}', ${current})"
      title="${n} star${n > 1 ? 's' : ''}"
    >★</span>
  `).join('');
}

function hoverStars(upTo) {
  document.querySelectorAll('.star-btn').forEach((s, i) => {
    s.classList.toggle('star-btn--hover', i < upTo);
  });
}

function displayStarsHTML(rating) {
  if (!rating) return '';
  return [1, 2, 3, 4, 5].map(n =>
    `<span class="star-display ${n <= rating ? 'star-display--filled' : ''}">★</span>`
  ).join('');
}

// ── Detail Modal ──────────────────────────────────────────
function openDetail(id) {
  const recipe  = getAllRecipes().find(r => r.id === id);
  if (!recipe) return;

  const isSaved    = getSaved().includes(id);
  const rating     = getRatings()[id] || 0;
  const timeTag     = recipe.time     ? `<span class="tag">⏱ ${recipe.time}</span>`           : '';
  const servingsTag = recipe.servings ? `<span class="tag">🍽️ Serves ${recipe.servings}</span>` : '';
  const dietaryTagClass = { 'Vegan': 'vegan', 'Vegetarian': 'vegetarian', 'Gluten Free': 'gluten-free', 'Dairy Free': 'dairy-free' };
  const dietaryTags = (recipe.dietary || []).map(d => `<span class="tag tag--${dietaryTagClass[d] || ''}">${d}</span>`).join('');

  const ingredientsHTML = recipe.ingredients && recipe.ingredients.length
    ? `<section class="detail-section">
        <h4>Ingredients</h4>
        <ul class="detail-ingredients">
          ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </section>`
    : '';

  const stepsHTML = recipe.steps && recipe.steps.length
    ? `<section class="detail-section">
        <h4>Instructions</h4>
        <ol class="detail-steps">
          ${recipe.steps.map(s => `<li>${s}</li>`).join('')}
        </ol>
      </section>`
    : '';

  const descriptionHTML = recipe.description
    ? `<p class="detail-description">${recipe.description}</p>`
    : '';

  document.getElementById('detail-content').innerHTML = `
    <div class="detail-header">
      <span class="detail-emoji">${recipe.emoji || '🍽️'}</span>
      <div>
        <h2 class="detail-title">${recipe.name}</h2>
        <div class="detail-tags">
          ${recipe.userCreated ? '<span class="tag tag--custom">My Recipe</span>' : ''}
          <span class="tag">${recipe.cuisine}</span>
          <span class="tag tag--${recipe.difficulty.toLowerCase()}">${recipe.difficulty}</span>
          ${timeTag}
          ${servingsTag}
          ${dietaryTags}
        </div>
      </div>
    </div>
    ${descriptionHTML}
    ${ingredientsHTML}
    ${stepsHTML}
    <section class="detail-section">
      <h4>Your Rating</h4>
      <div class="stars-row">
        <div id="stars-input">${interactiveStarsHTML(id, rating)}</div>
        <span class="stars-label" id="stars-label">${rating ? `${rating} / 5` : 'Tap a star to rate'}</span>
      </div>
    </section>
    <div class="detail-actions">
      <button
        class="btn-primary detail-save-btn ${isSaved ? 'detail-save-btn--saved' : ''}"
        id="detail-save-btn"
        onclick="toggleDetailSave('${id}')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" style="vertical-align:middle; margin-right:6px;"><path d="M5 3h14a1 1 0 0 1 1 1v17l-8-4-8 4V4a1 1 0 0 1 1-1z"/></svg>
        ${isSaved ? 'Saved' : 'Save Recipe'}
      </button>
      ${recipe.userCreated ? `
      <button class="btn-delete" onclick="deleteRecipe('${id}')">
        🗑️ Delete Recipe
      </button>` : ''}
    </div>
  `;

  document.getElementById('detail-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function toggleDetailSave(id) {
  if (!requireAuth()) return;
  const idx = userData.savedRecipes.indexOf(id);
  if (idx === -1) {
    userData.savedRecipes.push(id);
  } else {
    userData.savedRecipes.splice(idx, 1);
  }
  syncUserData();

  const isSaved  = userData.savedRecipes.includes(id);
  const btn      = document.getElementById('detail-save-btn');
  const svgIcon  = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" style="vertical-align:middle; margin-right:6px;"><path d="M5 3h14a1 1 0 0 1 1 1v17l-8-4-8 4V4a1 1 0 0 1 1-1z"/></svg>`;
  btn.innerHTML  = svgIcon + (isSaved ? 'Saved' : 'Save Recipe');
  btn.classList.toggle('detail-save-btn--saved', isSaved);

  if (typeof renderCards === 'function') renderCards();
  if (typeof render === 'function') render();
}

function deleteRecipe(id) {
  if (!confirm('Are you sure you want to delete this recipe?')) return;
  userData.userRecipes  = userData.userRecipes.filter(r => r.id !== id);
  userData.savedRecipes = userData.savedRecipes.filter(s => s !== id);
  syncUserData();
  closeDetail();
  if (typeof renderCards === 'function') renderCards();
  if (typeof render === 'function') render();
}

function closeDetail() {
  document.getElementById('detail-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('detail-close').addEventListener('click', closeDetail);
  document.getElementById('detail-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('detail-overlay')) closeDetail();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !document.getElementById('detail-overlay').classList.contains('hidden')) closeDetail();
  });
});
