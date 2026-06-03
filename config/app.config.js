/* ================================
   APP CONFIG (SAFE GLOBAL SETTINGS)
   ================================ */

window.APP_CONFIG = {
  appName: "Project Data Tracker",

  // Firebase configuration (UNCHANGED from your working HTML)
  firebase: {
    apiKey: "AIzaSyCL6iJKRp-WjCgBTtRCuRny14lUOMP9KJg",
    authDomain: "data-tracker-f11df.firebaseapp.com",
    databaseURL: "https://data-tracker-f11df-default-rtdb.firebaseio.com",
    projectId: "data-tracker-f11df",
    storageBucket: "data-tracker-f11df.firebasestorage.app",
    messagingSenderId: "462872028246",
    appId: "1:462872028246:web:eb90490bd650a85d76c7f7"
  },

  // Optional global defaults (future-safe)
  defaults: {
    fiscalYearStartMonth: 3, // April
    currency: "ZAR",
    dateFormat: "YYYY-MM-DD"
  }
};
