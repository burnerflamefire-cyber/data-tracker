/* ==========================================
   AUTH LAYER (FIREBASE ANONYMOUS LOGIN)
   + UID MANAGEMENT + UI STATUS BINDING
   ========================================== */

// Wait until Firebase config is available
const firebaseConfig = window.APP_CONFIG.firebase;

// Initialise Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database(app);
const auth = firebase.auth(app);

// Expose globally for other modules
window.db = db;
window.auth = auth;
window.globalUserUid = null;

// UI references (must exist in index.html)
const authStatusPanel = document.getElementById("authStatusPanel");
const authStatusText = document.getElementById("authStatusText");
const authUidDisplay = document.getElementById("authUidDisplay");
const userBadge = document.getElementById("userBadge");

// Optional local operator name (non-critical)
let currentUser = localStorage.getItem("qt_username") || "Operational User";

/* ================================
   AUTH FLOW
   ================================ */
auth.signInAnonymously()
  .then(function (userCredential) {
    const user = userCredential.user;

    // Store UID globally
    window.globalUserUid = user.uid;

    // Update UI - success state
    if (authStatusPanel) {
      authStatusPanel.className =
        "bg-[#002244] border border-[#004488] rounded px-1.5 py-0.5 text-[9px] font-mono inline-flex items-center gap-1 shadow-md";
    }

    if (authStatusText) {
      authStatusText.innerHTML = "Connected ✔";
    }

    if (authUidDisplay) {
      authUidDisplay.innerText = "UID: " + window.globalUserUid.substring(0, 5);
      authUidDisplay.classList.remove("hidden");
    }

    if (userBadge) {
      userBadge.innerHTML =
        `<i class="fa-solid fa-user-gear mr-0.5"></i> Operator: <strong>${currentUser}</strong>`;
    }

    console.log("Auth Success ✔ UID:", window.globalUserUid);
  })
  .catch(function (error) {
    console.error("Auth Failed:", error);

    if (authStatusPanel) {
      authStatusPanel.className =
        "bg-red-900/80 border border-red-500 rounded px-1.5 py-0.5 text-[9px] font-mono inline-flex items-center gap-1 shadow-md";
    }

    if (authStatusText) {
      authStatusText.innerHTML = "Auth Broken ✘";
    }
  });
