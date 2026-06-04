# UI Shell Specification — Data Tracker

## Purpose

Defines the complete layout, structure, and behaviour of the application shell.

All modules must plug into this shell without modifying its structure.

---

# 🏗️ 1. Overall Layout Structure

The application is divided into 3 permanent zones:

---

# 🧭 2. Navigation System

## 2.1 Primary Navigation (LEFTMOST)

Purpose:
Controls GLOBAL app context.

Contains:
- Project Level
- Programme Level

Behaviour:
- Always visible (can collapse width, not disappear)
- Clicking changes application mode
- Drives Secondary Navigation content

Visual rules:
- WC Government Blue base
- Selected state = darker blue + left highlight bar
- Hover = lighter blue glow effect

---

## 2.2 Secondary Navigation (MIDDLE LEFT)

Purpose:
Controls MODULE VIEW inside selected context.

Changes dynamically depending on:
- Project Level selected OR Programme Level selected

Example:
If Project Level selected:
- Overview
- Data Capture
- Tables
- Analytics
- Completeness

If Programme Level selected:
- Portfolio Overview
- Aggregated Reporting
- Risk View
- Funding Summary

Behaviour:
- Collapsible
- Context-aware
- Re-renders on Primary Nav change

---

## 2.3 Main Workspace (RIGHT SIDE)

Purpose:
Displays active module content.

Rules:
- Only ONE module renders at a time
- Modules are mounted here dynamically
- Must support:
  - Forms
  - Tables
  - Charts (future)
  - Dashboards

No navigation logic exists here.

---

## 2.4 Top Header Bar

Always visible.

Contains:
- App title (left)
- Auth status (center-right)
- User UID badge
- System status indicator

Behaviour:
- Fixed height
- Minimal clutter
- Debug-friendly status display in early versions

---

# 🎨 3. Visual Design System

## Theme

Western Cape Government Blue Palette:

Primary:
- Deep Blue: #002244
- Mid Blue: #003366
- Accent Blue: #0055AA

Text:
- White / Light Grey

Background:
- Dark navy base
- Subtle gradients allowed

---

## Interaction Rules

All interactive elements must have:

- Hover state
- Active state
- Selected state
- Disabled state (future use)

Transitions:
- Smooth (150–250ms)
- No abrupt changes

---

# 🧠 4. Behaviour Model

## App State Drives UI

UI must always reflect:

- Current Mode (Project / Programme)
- Active Module
- Selected Project (future)
- Auth State

No UI element stores permanent state independently.

---

# 🧩 5. Module Mounting Rules

Each module:

- Renders ONLY inside Main Workspace
- Cannot modify navigation directly
- Must register via AppController

Lifecycle:
1. init()
2. render()
3. destroy() (optional future use)

---

# ⚙️ 6. Collapse Behaviour

Both navigation panels:

- Can collapse independently
- Collapse reduces width, not removes DOM
- Icons remain visible when collapsed
- Expand restores full labels

---

# 📊 7. Future Extensions (Reserved Areas)

Shell must support:

- Tables with inline editing
- Dashboard widgets
- Split-pane views
- Modal overlays
- Drill-down pages

No redesign should be required later.
