(function () {

  function renderLoading() {
    document.getElementById("app").innerHTML = `
      <div style="font-family:Arial;padding:20px;">
        <h3>Loading Project Data Tracker...</h3>
      </div>
    `;
  }

  function renderApp(user) {
    document.getElementById("app").innerHTML = `
      <div style="font-family:Arial;">
        <div style="background:#003161;color:white;padding:10px;">
          Project Data Tracker
          <span style="float:right;">UID: ${user.uid}</span>
        </div>

        <div id="view"></div>
      </div>
    `;

    loadDashboard();
  }

  function loadDashboard() {
    document.getElementById("view").innerHTML = `
      <div style="padding:20px;">
        <h3>Dashboard Loaded ✔</h3>
      </div>
    `;
  }

  function start() {
    renderLoading();

    const auth = window.firebaseServices.auth;

    auth.onAuthStateChanged((user) => {
      if (user) {
        window.appState.user = user;
        window.appState.ready = true;
        renderApp(user);
      } else {
        auth.signInAnonymously();
      }
    });
  }

  window.addEventListener("DOMContentLoaded", start);

})();
