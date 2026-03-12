// ── In-memory cache ───────────────────────────────────────
let userData = { savedRecipes: [], userRecipes: [], ratings: {} };

// Listeners registered by page scripts via onDataLoaded()
const _renderListeners = [];

// Register a callback to run whenever user data is (re)loaded.
// If data is already loaded, runs immediately.
function onDataLoaded(cb) {
  _renderListeners.push(cb);
  if (_dataReady) cb();
}

let _dataReady = false;

function _triggerRender() {
  _dataReady = true;
  _renderListeners.forEach(cb => cb());
}

// ── Firestore operations ──────────────────────────────────

async function loadUserData(uid) {
  try {
    const snap = await db.collection('users').doc(uid).get();
    userData = snap.exists
      ? { savedRecipes: [], userRecipes: [], ratings: {}, ...snap.data() }
      : { savedRecipes: [], userRecipes: [], ratings: {} };
  } catch (e) {
    console.error('Failed to load user data:', e);
    userData = { savedRecipes: [], userRecipes: [], ratings: {} };
  }
  _triggerRender();
}

function resetUserData() {
  userData = { savedRecipes: [], userRecipes: [], ratings: {} };
  _triggerRender();
}

function syncUserData() {
  const user = auth.currentUser;
  if (!user) return;
  db.collection('users').doc(user.uid).set(userData, { merge: true })
    .catch(e => console.error('Sync failed:', e));
}

// ── Data accessors ────────────────────────────────────────
function getSaved()       { return userData.savedRecipes || []; }
function getUserRecipes() { return userData.userRecipes  || []; }
function getRatings()     { return userData.ratings      || {}; }
function getAllRecipes()   { return [...getUserRecipes(), ...RECIPES]; }

// ── Auth guard ────────────────────────────────────────────
function requireAuth() {
  if (!auth.currentUser) {
    if (confirm('You need to be logged in to do that. Go to the login page?')) {
      window.location.href = 'login.html';
    }
    return false;
  }
  return true;
}
