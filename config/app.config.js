/**
 * Global Configuration Object
 * Contains Firebase environment variables and parameters.
 */
window.APP_CONFIG = {
  firebase: {
    apiKey: "AIzaSyCL6iJKRp-WjCgBTtRCuRny14lUOMP9KJg",
    authDomain: "data-tracker-f11df.firebaseapp.com",
    databaseURL: "https://data-tracker-f11df-default-rtdb.firebaseio.com",
    projectId: "data-tracker-f11df",
    storageBucket: "data-tracker-f11df.firebasestorage.app",
    messagingSenderId: "462872028246",
    appId: "1:462872028246:web:eb90490bd650a85d76c7f7"
  }
};

// Legacy support reference matching your auth script requirement
window.firebaseConfig = window.APP_CONFIG.firebase;
