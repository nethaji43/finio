# Fino — Finance Dashboard

A clean, interactive personal finance dashboard built with vanilla HTML, CSS, and JavaScript.

## Quick Start

No build step needed. Just open `index.html` in any modern browser.

```bash
# Option 1: Direct open
open index.html

# Option 2: Local server (recommended to avoid CORS on fonts)
npx serve .
# or
python3 -m http.server 8080
```

## Features

### Dashboard Overview
- **4 summary cards**: Total Balance, Monthly Income, Monthly Expenses, Net Savings
- **Balance Trend** line chart (last 6 months, income vs expenses)
- **Spending Breakdown** donut chart with live category legend
- **Recent Transactions** preview strip

### Transactions Section
- Full sortable table with date, description, category, type, amount
- **Search** by description or category name
- **Filter** by category and type (income/expense)
- **Sort** by date (newest/oldest) or amount (highest/lowest)
- **CSV Export** of filtered results

### Role-Based UI (RBAC)
Switch roles via the dropdown in the sidebar:
- **Admin**: Full access — can Add, Edit, Delete transactions
- **Viewer**: Read-only — all write actions are hidden

### Insights Section
- Highest spending category with percentage
- Savings rate with contextual advice
- Month-over-month expense comparison
- Average transaction value
- Most frequent spending category
- Monthly cash flow summary
- **Monthly Comparison** bar chart (6 months)
- **Category Breakdown** with animated progress bars (all-time)

## Technical Approach

### State Management
All state lives in a single `state` object:
```js
const state = {
  transactions: [],   // source of truth
  role: "admin",      // viewer | admin
  theme: "dark",      // dark | light
  filters: { search, category, type, sort },
  editingId: null,
  deletingId: null,
  charts: { trend, donut, monthly }  // Chart.js instances
};
```
Every mutation calls `renderAll()` + `saveState()` to keep UI and storage in sync.

### Persistence
- Transactions, role, and theme are stored in `localStorage`
- Seed data (60 transactions across 6 months) is loaded once on first visit

### Charts
Chart.js 4 via CDN — no build required. Charts are destroyed and re-created on theme change to pick up new color variables.

### RBAC
A single CSS class on `<body>`:
- `body.viewer` hides all `.admin-only` elements via CSS
- Applied on role change and on init

## File Structure

```
finance-dashboard/
├── index.html   — markup, semantic structure
├── style.css    — design tokens (CSS vars), layout, components
├── app.js       — all logic: state, CRUD, charts, filters, events
└── README.md
```

## Design Choices

- **Aesthetic**: Dark luxury — deep navy surfaces, gold accents, editorial serif headings (Playfair Display) + clean sans-serif body (DM Sans) + monospaced numbers (DM Mono)
- **Theme**: Toggleable dark/light, persisted to localStorage
- **Responsive**: Works down to 320px — sidebar collapses to hamburger, cards reflow to 2-column then 1-column
- **Empty states**: Gracefully handled for no-data and no-filter-matches scenarios
- **Animations**: CSS `fadeIn` on section switch, `modalIn` spring animation, progress bar transitions

## Dependencies

| Library | Version | Usage |
|---------|---------|-------|
| Chart.js | 4.4.0 | Line, Doughnut, Bar charts |
| Google Fonts | — | Playfair Display, DM Sans, DM Mono |

Both loaded via CDN — no npm install needed.