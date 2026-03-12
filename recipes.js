const RECIPES = [
  { id: 1,  emoji: '🍝', name: 'Spaghetti Carbonara',      time: '30 min', difficulty: 'Easy',   cuisine: 'Italian'  },
  { id: 2,  emoji: '🍜', name: 'Ramen Noodle Soup',        time: '45 min', difficulty: 'Medium', cuisine: 'Japanese' },
  { id: 3,  emoji: '🥗', name: 'Caesar Salad',             time: '15 min', difficulty: 'Easy',   cuisine: 'American' },
  { id: 4,  emoji: '🌮', name: 'Beef Tacos',               time: '25 min', difficulty: 'Easy',   cuisine: 'Mexican'  },
  { id: 5,  emoji: '🍛', name: 'Chicken Tikka Masala',     time: '50 min', difficulty: 'Medium', cuisine: 'Indian'   },
  { id: 6,  emoji: '🍕', name: 'Margherita Pizza',         time: '40 min', difficulty: 'Medium', cuisine: 'Italian'  },
  { id: 7,  emoji: '🥘', name: 'Pad Thai',                 time: '30 min', difficulty: 'Medium', cuisine: 'Thai'     },
  { id: 8,  emoji: '🥩', name: 'Classic Beef Burger',      time: '20 min', difficulty: 'Easy',   cuisine: 'American' },
  { id: 9,  emoji: '🍣', name: 'Salmon Sushi Rolls',       time: '60 min', difficulty: 'Hard',   cuisine: 'Japanese' },
  { id: 10, emoji: '🥐', name: 'Croissants',               time: '3 hrs',  difficulty: 'Hard',   cuisine: 'French'   },
  { id: 11, emoji: '🌯', name: 'Chicken Burrito Bowl',     time: '35 min', difficulty: 'Easy',   cuisine: 'Mexican'  },
  { id: 12, emoji: '🍲', name: 'Lentil Dal',               time: '40 min', difficulty: 'Easy',   cuisine: 'Indian'   },
  { id: 13, emoji: '🍝', name: 'Pesto Pasta',              time: '20 min', difficulty: 'Easy',   cuisine: 'Italian'  },
  { id: 14, emoji: '🦞', name: 'Lobster Bisque',           time: '1 hr',   difficulty: 'Hard',   cuisine: 'French'   },
  { id: 15, emoji: '🍜', name: 'Green Curry',              time: '35 min', difficulty: 'Medium', cuisine: 'Thai'     },
  { id: 16, emoji: '🧆', name: 'Falafel Wrap',             time: '30 min', difficulty: 'Medium', cuisine: 'American' },
];

function getSaved() {
  return JSON.parse(localStorage.getItem('savedRecipes') || '[]');
}

function toggleSave(id) {
  const saved = getSaved();
  const index = saved.indexOf(id);
  if (index === -1) {
    saved.push(id);
  } else {
    saved.splice(index, 1);
  }
  localStorage.setItem('savedRecipes', JSON.stringify(saved));
  renderCards();
}

function renderCards() {
  const query = document.getElementById('search').value.toLowerCase();
  const cuisine = document.getElementById('filter-cuisine').value;
  const difficulty = document.getElementById('filter-difficulty').value;
  const saved = getSaved();

  const filtered = RECIPES.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(query) || r.cuisine.toLowerCase().includes(query);
    const matchesCuisine = !cuisine || r.cuisine === cuisine;
    const matchesDifficulty = !difficulty || r.difficulty === difficulty;
    return matchesSearch && matchesCuisine && matchesDifficulty;
  });

  const grid = document.getElementById('recipes-grid');
  const noResults = document.getElementById('no-results');

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.classList.remove('hidden');
    return;
  }
  noResults.classList.add('hidden');

  grid.innerHTML = filtered.map(r => {
    const isSaved = saved.includes(r.id);
    return `
      <div class="recipe-card ${isSaved ? 'recipe-card--saved' : ''}">
        <div class="recipe-card-emoji">${r.emoji}</div>
        <div class="recipe-card-body">
          <h3 class="recipe-card-title">${r.name}</h3>
          <div class="recipe-card-tags">
            <span class="tag">${r.cuisine}</span>
            <span class="tag tag--diff tag--${r.difficulty.toLowerCase()}">${r.difficulty}</span>
            <span class="tag">⏱ ${r.time}</span>
          </div>
        </div>
        <button
          class="save-btn ${isSaved ? 'save-btn--saved' : ''}"
          onclick="toggleSave(${r.id})"
          title="${isSaved ? 'Remove from saved' : 'Save recipe'}"
          aria-label="${isSaved ? 'Remove from saved' : 'Save recipe'}"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M5 3h14a1 1 0 0 1 1 1v17l-8-4-8 4V4a1 1 0 0 1 1-1z"/>
          </svg>
        </button>
      </div>
    `;
  }).join('');
}

document.getElementById('search').addEventListener('input', renderCards);
document.getElementById('filter-cuisine').addEventListener('change', renderCards);
document.getElementById('filter-difficulty').addEventListener('change', renderCards);

document.getElementById('btn-add').addEventListener('click', () => {
  alert('Add Recipe — coming soon!');
});

document.getElementById('btn-saved').addEventListener('click', () => {
  alert('Saved Recipes — coming soon!');
});

renderCards();
