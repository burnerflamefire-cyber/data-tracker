(CLEAN PRODUCT DEFINITION)

# Project Data Tracker

## Purpose
A modular, browser-based data tracking system for infrastructure projects.  
Designed to support structured data capture, validation, auditing, and reporting across Programme and Project levels.

---

## Core Concept

This system uses a **minimal-column universal data model** where all project data is stored in a single flexible structure rather than many specialised tables.

Instead of many fields per business case, the system uses:

- One Date field (all time-based data)
- One Data Category field (resolved from user selection logic)
- One Free Text field
- One Unit field
- One Quantity field
- One Rate field
- One Amount field
- One Audit Log field

---

## Key Features

### 1. Guided Data Capture Engine
Users do not directly select “Data Category”.

Instead:
- Select Main Category
- Select Sub Category
- System resolves full Data Category automatically

Then users input required values depending on category rules.

---

### 2. Dual-Level Structure
- Programme Level (portfolio overview, rollups)
- Project Level (facility-specific detail tracking)

---

### 3. Editable Data Model
All visuals, tables, and dashboards are **bi-directionally linked**:
- Editing a table updates the underlying record
- Input form updates reflect instantly in visuals

---

### 4. Audit Logging (Immutable History Tracking)
Each record maintains a single concatenated audit log string:

Includes:
- User ID
- Timestamp (YYYY-MM-DD HH:MM:SS)
- Field changed
- Previous value
- New value

Audit log grows over time but is never overwritten.

---

### 5. Data Completeness Engine
System calculates:
- Required data categories per project (from Excel configuration file)
- Completed vs missing categories
- Completeness score (%)

Used for:
- Progress tracking
- Gamification
- Data quality enforcement

---

### 6. Analytics & Alerts
Built-in logic flags:
- Budget overruns
- Missing mandatory data
- Timeline risks
- Data inconsistencies

---

## Data Source Strategy

- Data Categories are imported from Excel configuration files
- System dynamically adapts without code changes
- Supports periodic re-ingestion and updates

---

## Tech Stack
- Frontend: HTML + Modular JavaScript
- Auth: Firebase Authentication (Anonymous)
- Database: Firebase Realtime Database
- Hosting: GitHub Pages
