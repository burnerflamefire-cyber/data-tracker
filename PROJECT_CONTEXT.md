(SYSTEM RULES + DATA BRAIN)

# Project Context — Data Tracker

## Core Design Philosophy

This system is a **data-model-first application**, not a UI-first application.

UI is only a layer on top of a structured, minimal, universal data model.

---

## 🧱 Data Model (Single Source of Truth)

All records follow a minimal structure:

### Core Fields
- uid
- timestamp
- facilityName
- facilityGUID
- projectName
- projectGUID
- programme
- subProgramme
- rolloutFY
- projectPhase

### Universal Data Fields
- date (single field used for all time-related data)
- dataCategory (resolved system output)
- mainCategory (user input)
- subCategory (user input)
- freeText
- unit
- quantity
- rate
- amount

### System Fields
- auditLog (append-only string)
- completenessStatus (calculated)
- lastUpdated

---

## 🧠 Category Resolution Logic

Users never directly select final DataCategory.

Flow:
Main Category → Sub Category → System resolves Data Category

Rules:
- Mapping comes from Excel configuration file
- No hardcoding of categories in UI
- Categories are dynamic and extensible

---

## 🔁 Audit Log Rules

Each record has a single growing string:

Format:
UserID | Timestamp | Field | Old Value → New Value

Rules:
- Never overwritten
- Always appended
- Must remain human-readable
- Must support multiple edits per record

---

## 📊 Completeness Engine

Each project has a defined required dataset:
- Loaded from Excel category configuration
- Defines expected Data Categories per project type

System calculates:
- Total required categories
- Completed categories
- Missing categories
- Completion %

Used for:
- Progress dashboards
- Alerts
- Gamification visuals

---

## ⚠️ Business Rules

- One record can represent any type of project data
- No duplicate schema per feature
- All calculations derive from raw data
- UI must never define data structure
- Firebase is raw storage only

---

## 🔄 Data Flow

UI → Module → Service Layer → Firebase

And reverse:

Firebase → Service Layer → UI (render + edit sync)

---

## 🚫 Anti-Patterns (STRICT)

- No feature-specific database tables
- No hardcoded category lists in JS
- No direct UI → Firebase writes
- No duplicated data structures per module
