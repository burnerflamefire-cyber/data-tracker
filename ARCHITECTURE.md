(SYSTEM BLUEPRINT)

# Architecture — Data Tracker

## 🧭 System Overview

A modular, event-driven web application built around a single universal data model.

---

## 🧱 High-Level Architecture

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
│   ├── state.store.js
│   ├── event.bus.js
│   └── data.model.js
│
├── services/
│   ├── firebase.service.js
│   ├── category.service.js
│   └── audit.service.js
│
├── ui/
│   ├── layout.shell.js
│   ├── nav.primary.js
│   ├── nav.secondary.js
│   ├── data.table.js
│   ├── data.form.js
│   └── completeness.widget.js
│
├── modules/
│   ├── project/
│   │   ├── project.module.js
│   │   └── project.logic.js
│   │
│   ├── programme/
│   │   ├── programme.module.js
│   │   └── programme.logic.js
│
├── config-data/
│   └── category-mapping.xlsx (ingested)
│
└── utils/
    └── helpers.js

---

## ⚙️ Execution Flow

1. index.html loads shell
2. Firebase config initializes
3. Auth completes (anonymous login)
4. AppController starts system
5. Category configuration loads (Excel → Firebase or JSON)
6. UI Shell renders
7. Navigation loads (Project / Programme)
8. User selects module
9. Module loads:
   - Form engine
   - Table view
   - Completeness engine
10. All edits sync to Firebase via service layer

---

## 🧠 Core Engine Concept

### One Data Model Rule

All modules use the same structure:

- No module-specific schema
- No feature-specific tables
- Everything maps to universal record structure

---

## 🔁 Bi-Directional Data Binding

UI components:
- Form inputs
- Tables
- Visual dashboards

All bind to:
- Firebase records via service layer

Any change:
UI ↔ State Store ↔ Firebase

---

## 📊 Intelligence Layers

### 1. Category Engine
- Resolves Main + Sub → Data Category
- Driven by external configuration file

### 2. Audit Engine
- Appends change history string per record

### 3. Completeness Engine
- Compares project vs required dataset
- Produces completion %

### 4. Alert Engine
- Budget overrun detection
- Missing mandatory data detection
- Risk flags

---

## 🧩 Module Design Rule

Each module must:
- Be self-contained
- Never define its own data schema
- Only interpret shared data model
- Register via AppController

---

## 🚨 Critical Design Constraint

UI complexity is allowed.

Data model complexity is NOT allowed.

All complexity must move into:
- Services
- Engines
- Configuration files
