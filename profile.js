const AVATARS = [
  '🧑‍🍳','👨‍🍳','👩‍🍳','🍳','🥘','🫕',
  '🍽️','🌮','🍕','🍜','🍣','🥗',
  '🍰','🧁','🍩','🍪','🥐','🍱',
  '🍛','🍝','🧆','🥩','🫙','🥪',
  '🌯','🍲','🥟','🍤','🍡','🎂',
];

function renderProfile() {
  const user = auth.currentUser;
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  const name   = user.displayName || user.email.split('@')[0];
  const avatar = userData.avatar || '🧑‍🍳';

  document.getElementById('profile-name').textContent  = name;
  document.getElementById('profile-email').textContent = user.email;
  document.getElementById('avatar-emoji').textContent  = avatar;
  document.getElementById('edit-name').value           = name;

  document.getElementById('stat-saved').textContent   = getSaved().length;
  document.getElementById('stat-created').textContent = getUserRecipes().length;
  document.getElementById('stat-rated').textContent   = Object.keys(getRatings()).length;
}

// ── Avatar Picker ─────────────────────────────────────────
function openAvatarPicker() {
  const current = userData.avatar || '🧑‍🍳';
  document.getElementById('avatar-grid').innerHTML = AVATARS.map(a => `
    <button
      class="avatar-option ${a === current ? 'avatar-option--selected' : ''}"
      onclick="selectAvatar('${a}')"
      title="${a}"
    >${a}</button>
  `).join('');
  document.getElementById('avatar-overlay').classList.remove('hidden');
}

function closeAvatarPicker() {
  document.getElementById('avatar-overlay').classList.add('hidden');
}

async function selectAvatar(emoji) {
  userData.avatar = emoji;
  syncUserData();
  document.getElementById('avatar-emoji').textContent = emoji;
  updateNavAuth(auth.currentUser);
  closeAvatarPicker();
}

document.getElementById('avatar-modal-close').addEventListener('click', closeAvatarPicker);
document.getElementById('avatar-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('avatar-overlay')) closeAvatarPicker();
});

// ── Edit Name ─────────────────────────────────────────────
document.getElementById('profile-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name    = document.getElementById('edit-name').value.trim();
  const errorEl = document.getElementById('profile-error');
  const successEl = document.getElementById('profile-success');
  const btn     = document.getElementById('save-profile-btn');

  if (!name) {
    errorEl.textContent = 'Name cannot be empty.';
    errorEl.classList.remove('hidden');
    return;
  }

  btn.disabled    = true;
  btn.textContent = 'Saving…';
  errorEl.classList.add('hidden');
  successEl.classList.add('hidden');

  try {
    await auth.currentUser.updateProfile({ displayName: name });
    await db.collection('users').doc(auth.currentUser.uid).set({ name }, { merge: true });
    document.getElementById('profile-name').textContent = name;
    updateNavAuth(auth.currentUser);
    successEl.classList.remove('hidden');
    setTimeout(() => successEl.classList.add('hidden'), 3000);
  } catch (err) {
    errorEl.textContent = 'Failed to save. Please try again.';
    errorEl.classList.remove('hidden');
  }

  btn.disabled    = false;
  btn.textContent = 'Save Changes';
});

// ── Init ──────────────────────────────────────────────────
onDataLoaded(renderProfile);
