/* ==========================================
   AUTH LAYER (FIREBASE ANONYMOUS LOGIN)
   + UID MANAGEMENT + UI STATUS BINDING
   ========================================== */

const firebaseConfig = window.APP_CONFIG.firebase;

// Initialise Firebase instances globally
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database(app);
const auth = firebase.auth(app);

window.db = db;
window.auth = auth;
window.globalUserUid = null;

let currentUser = localStorage.getItem("qt_username") || "Operational User";

// Exported initialization method wrapper to execute via AppController
export function initializeAuthentication(onSuccessCallback) {
  const authStatusPanel = document.getElementById("authStatusPanel");
  const authStatusText = document.getElementById("authStatusText");
  const authUidDisplay = document.getElementById("authUidDisplay");
  const userBadge = document.getElementById("userBadge");

  auth.signInAnonymously()
    .then(function (userCredential) {
      const user = userCredential.user;
      window.globalUserUid = user.uid;

      if (authStatusPanel) {
        authStatusPanel.className =
          "bg-[#002244] border border-[#004488] rounded px-1.5 py-0.5 text-[9px] font-mono inline-flex items-center gap-1 shadow-md text-emerald-400";
      }
      if (authStatusText) authStatusText.innerHTML = "Connected ✔";
      if (authUidDisplay) {
        authUidDisplay.innerText = "UID: " + window.globalUserUid.substring(0, 5);
        authUidDisplay.classList.remove("hidden");
      }
      if (userBadge) {
        userBadge.innerHTML = `<i class="fa-solid fa-user-gear mr-0.5"></i> Operator: <strong>${currentUser}</strong>`;
      }

      console.log("Auth Success ✔ UID:", window.globalUserUid);
      
      // Notify the application system that authorization is established
      if (onSuccessCallback) onSuccessCallback(user);
    })
    .catch(function (error) {
      console.error("Auth Failed:", error);
      if (authStatusPanel) {
        authStatusPanel.className =
          "bg-red-900/80 border border-red-500 rounded px-1.5 py-0.5 text-[9px] font-mono inline-flex items-center gap-1 shadow-md text-red-200";
      }
      if (authStatusText) authStatusText.innerHTML = "Auth Broken ✘";
    });
}
