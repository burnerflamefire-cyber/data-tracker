window.AppState = {
    mode: "programme", // or "project"
    user: null
};

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.currentUser = user;
        window.AppState.user = user;
        console.log("User signed in:", user.uid);
    }
});
