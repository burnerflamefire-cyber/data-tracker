(HOW EVERYTHING FITS TOGETHER)

# Architecture — Data Tracker

## High-Level Structure

index.html
│
├── config/
│   └── app.config.js
│
├── auth/
│   └── auth.firebase.js
│
├── core/
│   ├── app.controller.js
│   ├── router.js
│   └── state.store.js
│
├── ui/
│   ├── layout.shell.js
│   ├── nav.primary.js
│   ├── nav.secondary.js
│   └── theme.wcg.css
│
├── modules/
│   ├── project/
│   │   └── project.module.js
│   └── programme/
│       └── programme.module.js
│
├── services/
│   └── firebase.service.js
│
└── utils/
    └── helpers.js

---

## Execution Flow

1. index.html loads
2. config/app.config.js loads Firebase config
3. auth/firebase.js initializes Firebase + logs user in
4. app.controller.js starts system
5. layout.shell.js renders UI shell
6. navigation modules load
7. user selects Project or Programme
8. corresponding module initializes

---

## Key Design Rule

UI never talks directly to Firebase.

Only:

Module → Service Layer → Firebase
