function logout() {
  auth.signOut().then(() => {
    window.location.href = 'index.html';
  });
}

function updateNavAuth(user) {
  const container = document.getElementById('auth-nav');
  if (!container) return;

  if (user) {
    const name   = user.displayName || user.email.split('@')[0];
    const avatar = userData.avatar || '🧑‍🍳';
    container.innerHTML = `
      <a class="nav-user" href="profile.html" title="View profile">
        <span class="nav-avatar">${avatar}</span>
        <span>${name}</span>
      </a>
      <button class="btn-nav-secondary" onclick="logout()">Log Out</button>
    `;
  } else {
    container.innerHTML = `
      <button class="btn-nav-secondary" onclick="window.location.href='login.html'">Log In</button>
      <button class="btn-nav-primary" onclick="window.location.href='login.html?tab=signup'">Sign Up</button>
    `;
  }
}

auth.onAuthStateChanged(async (user) => {
  if (user) {
    await loadUserData(user.uid);
  } else {
    resetUserData();
  }
  updateNavAuth(user);
});
