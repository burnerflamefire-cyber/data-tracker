console.log("Booting app…");

const bootInterval = setInterval(() => {
    if (window.firebaseReady === true && window.currentUser) {
        clearInterval(bootInterval);
        console.log("App ready");

        document.getElementById("app").innerHTML = window.APP_LAYOUT;
        window.AppRouter.load("programme");
    }
}, 300);
