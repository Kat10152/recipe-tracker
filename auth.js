function logout() {
  auth.signOut().then(() => {
    window.location.href = 'index.html';
  });
}

function updateNavAuth(user) {
  const container = document.getElementById('auth-nav');
  if (!container) return;

  if (user) {
    const name = user.displayName || user.email.split('@')[0];
    container.innerHTML = `
      <span class="nav-user">👤 ${name}</span>
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
  updateNavAuth(user);
  if (user) {
    await loadUserData(user.uid);
  } else {
    resetUserData();
  }
});
