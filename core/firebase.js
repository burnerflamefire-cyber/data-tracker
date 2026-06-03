(function () {
  const app = firebase.initializeApp(window.firebaseConfig);
  const auth = firebase.auth(app);

  window.firebaseServices = {
    app,
    auth
  };
})();
