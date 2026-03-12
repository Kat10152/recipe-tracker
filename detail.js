function openDetail(id) {
  const recipe = getAllRecipes().find(r => r.id === id);
  if (!recipe) return;

  const saved = getSaved();
  const isSaved = saved.includes(id);
  const timeTag = recipe.time ? `<span class="tag">⏱ ${recipe.time}</span>` : '';
  const servingsTag = recipe.servings ? `<span class="tag">🍽️ Serves ${recipe.servings}</span>` : '';

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
        </div>
      </div>
    </div>
    ${descriptionHTML}
    ${ingredientsHTML}
    ${stepsHTML}
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
  const saved = getSaved();
  const index = saved.indexOf(id);
  if (index === -1) {
    saved.push(id);
  } else {
    saved.splice(index, 1);
  }
  localStorage.setItem('savedRecipes', JSON.stringify(saved));

  // Update the save button inside the detail modal
  const isSaved = saved.includes(id);
  const btn = document.getElementById('detail-save-btn');
  const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" style="vertical-align:middle; margin-right:6px;"><path d="M5 3h14a1 1 0 0 1 1 1v17l-8-4-8 4V4a1 1 0 0 1 1-1z"/></svg>`;
  btn.innerHTML = svgIcon + (isSaved ? 'Saved' : 'Save Recipe');
  btn.classList.toggle('detail-save-btn--saved', isSaved);

  // Re-render the underlying grid if available
  if (typeof renderCards === 'function') renderCards();
  if (typeof render === 'function') render();
}

function deleteRecipe(id) {
  if (!confirm('Are you sure you want to delete this recipe?')) return;

  const userRecipes = getUserRecipes().filter(r => r.id !== id);
  localStorage.setItem('userRecipes', JSON.stringify(userRecipes));

  const saved = getSaved().filter(s => s !== id);
  localStorage.setItem('savedRecipes', JSON.stringify(saved));

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
