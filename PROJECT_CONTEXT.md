(RULES + BRAIN OF THE SYSTEM)

# Project Context — Data Tracker

## Core Philosophy
This system is built as a modular, AI-maintainable application. 
Each feature must be isolated, predictable, and loosely coupled.

## Non-Negotiable Rules
- No module should directly depend on another module’s internal logic
- All shared state flows through a central app controller
- Firebase is the only backend source of truth
- UI must remain responsive and modular
- No inline business logic inside HTML files

## UI Principles
- Western Cape Government blue theme
- Clean, enterprise-grade layout
- Left navigation = global structure
- Secondary navigation = module-level structure
- Everything collapsible
- Clear visual selection states

## Data Principles
- Firebase Realtime Database is primary storage
- UID-based user separation
- All records must include:
  - uid
  - timestamp
  - moduleType (project/programme)
  - recordId

## Module Rules
Each module must:
- Be self-contained JS file
- Expose init() function
- Register itself with AppController
- Never directly manipulate other modules

## System Behaviour
- App loads shell first
- Auth completes silently
- Modules load dynamically after auth success
