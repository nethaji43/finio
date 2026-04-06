/* ============================================================
   LEDGER — Finance Dashboard  |  app.js
   State management, RBAC, charts, filters, CRUD, persistence
   ============================================================ */

"use strict";

// ── Category colour palette ──────────────────────────────────
const CATEGORY_COLORS = {
  Food:          "#f87171",
  Transport:     "#fb923c",
  Shopping:      "#fbbf24",
  Entertainment: "#a78bfa",
  Utilities:     "#60a5fa",
  Health:        "#34d399",
  Salary:        "#4ade80",
  Freelance:     "#2dd4bf",
  Investment:    "#818cf8",
  Other:         "#94a3b8",
};

const CATEGORY_ICONS = {
  Food: "🍔", Transport: "🚗", Shopping: "🛍️", Entertainment: "🎬",
  Utilities: "💡", Health: "🏥", Salary: "💼", Freelance: "💻",
  Investment: "📈", Other: "📦",
};

// ── Seed data ────────────────────────────────────────────────
const SEED_TRANSACTIONS = [
  // April 2025
  { id: "t1",  date: "2025-04-01", desc: "Monthly Salary",         category: "Salary",        type: "income",  amount: 85000 },
  { id: "t2",  date: "2025-04-02", desc: "Swiggy Order",           category: "Food",          type: "expense", amount: 340 },
  { id: "t3",  date: "2025-04-04", desc: "Uber Ride",              category: "Transport",     type: "expense", amount: 210 },
  { id: "t4",  date: "2025-04-05", desc: "Netflix Subscription",   category: "Entertainment", type: "expense", amount: 649 },
  { id: "t5",  date: "2025-04-07", desc: "Grocery — D-Mart",       category: "Food",          type: "expense", amount: 2140 },
  { id: "t6",  date: "2025-04-08", desc: "Freelance Project",      category: "Freelance",     type: "income",  amount: 22000 },
  { id: "t7",  date: "2025-04-09", desc: "Gym Membership",         category: "Health",        type: "expense", amount: 1800 },
  { id: "t8",  date: "2025-04-11", desc: "Electricity Bill",       category: "Utilities",     type: "expense", amount: 1240 },
  { id: "t9",  date: "2025-04-13", desc: "Amazon Purchase",        category: "Shopping",      type: "expense", amount: 3499 },
  { id: "t10", date: "2025-04-15", desc: "SIP — Nifty 50",         category: "Investment",    type: "expense", amount: 5000 },
  { id: "t11", date: "2025-04-17", desc: "Doctor Consultation",    category: "Health",        type: "expense", amount: 500 },
  { id: "t12", date: "2025-04-18", desc: "Zomato Delivery",        category: "Food",          type: "expense", amount: 480 },
  { id: "t13", date: "2025-04-20", desc: "BMTC Bus Pass",          category: "Transport",     type: "expense", amount: 300 },
  { id: "t14", date: "2025-04-21", desc: "Dividend — HDFC",        category: "Investment",    type: "income",  amount: 1600 },
  { id: "t15", date: "2025-04-23", desc: "BookMyShow Tickets",     category: "Entertainment", type: "expense", amount: 820 },
  { id: "t16", date: "2025-04-25", desc: "Water Bill",             category: "Utilities",     type: "expense", amount: 380 },
  { id: "t17", date: "2025-04-27", desc: "H&M Clothing",           category: "Shopping",      type: "expense", amount: 2890 },
  { id: "t18", date: "2025-04-28", desc: "Freelance Top-up",       category: "Freelance",     type: "income",  amount: 8000 },
  // March 2025
  { id: "t19", date: "2025-03-01", desc: "Monthly Salary",         category: "Salary",        type: "income",  amount: 85000 },
  { id: "t20", date: "2025-03-03", desc: "Grocery Store",          category: "Food",          type: "expense", amount: 1890 },
  { id: "t21", date: "2025-03-05", desc: "Ola Cabs",               category: "Transport",     type: "expense", amount: 450 },
  { id: "t22", date: "2025-03-07", desc: "Hotstar Subscription",   category: "Entertainment", type: "expense", amount: 299 },
  { id: "t23", date: "2025-03-10", desc: "Freelance Design Work",  category: "Freelance",     type: "income",  amount: 15000 },
  { id: "t24", date: "2025-03-12", desc: "Electricity Bill",       category: "Utilities",     type: "expense", amount: 1100 },
  { id: "t25", date: "2025-03-14", desc: "Pharmacy",               category: "Health",        type: "expense", amount: 680 },
  { id: "t26", date: "2025-03-16", desc: "Flipkart Sale Buy",      category: "Shopping",      type: "expense", amount: 4200 },
  { id: "t27", date: "2025-03-18", desc: "SIP — Nifty 50",         category: "Investment",    type: "expense", amount: 5000 },
  { id: "t28", date: "2025-03-20", desc: "Restaurant Dinner",      category: "Food",          type: "expense", amount: 1200 },
  { id: "t29", date: "2025-03-22", desc: "Movie Tickets",          category: "Entertainment", type: "expense", amount: 560 },
  { id: "t30", date: "2025-03-25", desc: "Gas Bill",               category: "Utilities",     type: "expense", amount: 290 },
  // February 2025
  { id: "t31", date: "2025-02-01", desc: "Monthly Salary",         category: "Salary",        type: "income",  amount: 85000 },
  { id: "t32", date: "2025-02-04", desc: "Grocery — BigBasket",    category: "Food",          type: "expense", amount: 2300 },
  { id: "t33", date: "2025-02-06", desc: "Auto Rides",             category: "Transport",     type: "expense", amount: 620 },
  { id: "t34", date: "2025-02-08", desc: "Spotify Premium",        category: "Entertainment", type: "expense", amount: 119 },
  { id: "t35", date: "2025-02-10", desc: "Freelance Web Dev",      category: "Freelance",     type: "income",  amount: 30000 },
  { id: "t36", date: "2025-02-12", desc: "Dentist Visit",          category: "Health",        type: "expense", amount: 1500 },
  { id: "t37", date: "2025-02-15", desc: "Electricity Bill",       category: "Utilities",     type: "expense", amount: 990 },
  { id: "t38", date: "2025-02-18", desc: "SIP — Nifty 50",         category: "Investment",    type: "expense", amount: 5000 },
  { id: "t39", date: "2025-02-20", desc: "Clothes — Levi's",       category: "Shopping",      type: "expense", amount: 3200 },
  { id: "t40", date: "2025-02-22", desc: "Pizza Night",            category: "Food",          type: "expense", amount: 580 },
  // January 2025
  { id: "t41", date: "2025-01-01", desc: "Monthly Salary",         category: "Salary",        type: "income",  amount: 82000 },
  { id: "t42", date: "2025-01-05", desc: "New Year Dinner",        category: "Food",          type: "expense", amount: 2800 },
  { id: "t43", date: "2025-01-07", desc: "Cab to Airport",         category: "Transport",     type: "expense", amount: 850 },
  { id: "t44", date: "2025-01-10", desc: "Annual OTT Bundle",      category: "Entertainment", type: "expense", amount: 1499 },
  { id: "t45", date: "2025-01-12", desc: "Freelance App Dev",      category: "Freelance",     type: "income",  amount: 18000 },
  { id: "t46", date: "2025-01-14", desc: "Electricity Bill",       category: "Utilities",     type: "expense", amount: 1050 },
  { id: "t47", date: "2025-01-18", desc: "SIP — Nifty 50",         category: "Investment",    type: "expense", amount: 5000 },
  { id: "t48", date: "2025-01-20", desc: "Myntra Shopping",        category: "Shopping",      type: "expense", amount: 1700 },
  // December 2024
  { id: "t49", date: "2024-12-01", desc: "Monthly Salary",         category: "Salary",        type: "income",  amount: 82000 },
  { id: "t50", date: "2024-12-05", desc: "Christmas Gifts",        category: "Shopping",      type: "expense", amount: 4500 },
  { id: "t51", date: "2024-12-10", desc: "Food Deliveries",        category: "Food",          type: "expense", amount: 1800 },
  { id: "t52", date: "2024-12-15", desc: "Freelance Bonus",        category: "Freelance",     type: "income",  amount: 12000 },
  { id: "t53", date: "2024-12-20", desc: "Travel — Goa",           category: "Transport",     type: "expense", amount: 6200 },
  { id: "t54", date: "2024-12-22", desc: "Utilities Bundle",       category: "Utilities",     type: "expense", amount: 1400 },
  { id: "t55", date: "2024-12-28", desc: "SIP — Nifty 50",         category: "Investment",    type: "expense", amount: 5000 },
  // November 2024
  { id: "t56", date: "2024-11-01", desc: "Monthly Salary",         category: "Salary",        type: "income",  amount: 82000 },
  { id: "t57", date: "2024-11-08", desc: "Grocery Shopping",       category: "Food",          type: "expense", amount: 1650 },
  { id: "t58", date: "2024-11-12", desc: "Freelance Design",       category: "Freelance",     type: "income",  amount: 9500 },
  { id: "t59", date: "2024-11-16", desc: "Electricity Bill",       category: "Utilities",     type: "expense", amount: 980 },
  { id: "t60", date: "2024-11-20", desc: "SIP — Nifty 50",         category: "Investment",    type: "expense", amount: 5000 },
];

// ── App State ────────────────────────────────────────────────
const state = {
  transactions: [],
  role: "admin",
  theme: "dark",
  filters: { search: "", category: "all", type: "all", sort: "date-desc" },
  editingId: null,
  deletingId: null,
  charts: { trend: null, donut: null, monthly: null },
};

// ── Utilities ────────────────────────────────────────────────
const fmt = (n) => "₹" + Math.abs(n).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtFull = (n) => "₹" + Math.abs(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
const uid = () => "t" + Date.now() + Math.random().toString(36).slice(2, 7);

// ── LocalStorage persistence ─────────────────────────────────
function loadState() {
  try {
    const saved = localStorage.getItem("ledger_transactions");
    if (saved) state.transactions = JSON.parse(saved);
    else state.transactions = [...SEED_TRANSACTIONS];

    const theme = localStorage.getItem("ledger_theme");
    if (theme) state.theme = theme;

    const role = localStorage.getItem("ledger_role");
    if (role) state.role = role;
  } catch {
    state.transactions = [...SEED_TRANSACTIONS];
  }
}

function saveState() {
  try {
    localStorage.setItem("ledger_transactions", JSON.stringify(state.transactions));
    localStorage.setItem("ledger_theme", state.theme);
    localStorage.setItem("ledger_role", state.role);
  } catch {}
}

// ── DOM refs ─────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);
const $$ = (sel) => document.querySelectorAll(sel);

// ── Navigation ───────────────────────────────────────────────
function navigate(section) {
  $$(".nav-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.section === section);
  });
  $$(".section").forEach((el) => {
    el.classList.toggle("active", el.id === "section-" + section);
  });
  if (section === "insights") renderInsights();
  if (section === "transactions") renderTransactionsTable();
  // Close mobile sidebar
  $("sidebar").classList.remove("open");
  $("sidebarOverlay").classList.remove("open");
}

// ── Theme ────────────────────────────────────────────────────
function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.theme);
  $("iconMoon").style.display = state.theme === "dark" ? "block" : "none";
  $("iconSun").style.display = state.theme === "light" ? "block" : "none";
  // Rebuild charts on theme change
  setTimeout(() => {
    buildTrendChart();
    buildDonutChart();
    buildMonthlyChart();
  }, 50);
}

// ── Role ─────────────────────────────────────────────────────
function applyRole() {
  document.body.classList.toggle("viewer", state.role === "viewer");
  // Keep both role selects in sync
  $("roleSelect").value = state.role;
  $("mobileRoleSelect").value = state.role;
}

// ── Current month computations ───────────────────────────────
function getCurrentMonthTx() {
  const now = new Date();
  return state.transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });
}

function getPrevMonthTx() {
  const now = new Date();
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return state.transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getFullYear() === prev.getFullYear() && d.getMonth() === prev.getMonth();
  });
}

function computeSummary(txList) {
  const income = txList.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expense = txList.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  return { income, expense, net: income - expense };
}

function getTotalBalance() {
  const income = state.transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expense = state.transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  return income - expense;
}

// ── Render Summary Cards ─────────────────────────────────────
function renderCards() {
  const cur = computeSummary(getCurrentMonthTx());
  const prev = computeSummary(getPrevMonthTx());
  const balance = getTotalBalance();

  $("totalBalance").textContent = fmt(balance);
  $("totalIncome").textContent = fmt(cur.income);
  $("totalExpenses").textContent = fmt(cur.expense);
  $("netSavings").textContent = fmt(cur.net);

  // Trends
  const balDiff = balance > 0 ? "positive" : "negative";
  $("balanceTrend").textContent = "All-time net";
  $("balanceTrend").className = "card-trend " + balDiff;

  if (prev.expense > 0) {
    const pct = (((cur.expense - prev.expense) / prev.expense) * 100).toFixed(1);
    const sign = pct > 0 ? "↑" : "↓";
    $("expenseTrend").textContent = sign + " " + Math.abs(pct) + "% vs last month";
    $("expenseTrend").className = "card-trend " + (pct > 0 ? "negative" : "positive");
  }

  const savingsRate = cur.income > 0 ? ((cur.net / cur.income) * 100).toFixed(0) : 0;
  $("savingsRate").textContent = savingsRate + "% savings rate";
  $("savingsRate").className = "card-trend " + (savingsRate >= 0 ? "positive" : "negative");

  // Month label
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const now = new Date();
  $("currentMonthLabel").textContent = monthNames[now.getMonth()] + " " + now.getFullYear();
}

// ── Render Recent Transactions ───────────────────────────────
function renderRecentTx() {
  const recent = [...state.transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);
  const el = $("recentTxList");
  if (recent.length === 0) {
    el.innerHTML = '<div class="empty-state"><div class="empty-icon">◎</div><p>No transactions yet</p></div>';
    return;
  }
  el.innerHTML = recent.map(txItemHTML).join("");
}

function txItemHTML(t) {
  const icon = CATEGORY_ICONS[t.category] || "💳";
  return `<div class="tx-item">
    <div class="tx-icon ${t.type}">${icon}</div>
    <div class="tx-info">
      <div class="tx-name">${escHtml(t.desc)}</div>
      <div class="tx-date">${fmtDate(t.date)}</div>
    </div>
    <span class="tx-cat">${t.category}</span>
    <span class="tx-amount ${t.type}">${t.type === "income" ? "+" : "−"}${fmt(t.amount)}</span>
  </div>`;
}

// ── Trend Chart (line) ───────────────────────────────────────
function buildTrendChart() {
  const ctx = $("trendChart").getContext("2d");
  if (state.charts.trend) state.charts.trend.destroy();

  // Group by month (last 6 months)
  const months = getLast6Months();
  const incomeData = [], expenseData = [];

  months.forEach(({ year, month }) => {
    const txs = state.transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getFullYear() === year && d.getMonth() === month;
    });
    const summary = computeSummary(txs);
    incomeData.push(summary.income);
    expenseData.push(summary.expense);
  });

  const labels = months.map(({ year, month }) => {
    const d = new Date(year, month, 1);
    return d.toLocaleDateString("en-IN", { month: "short" });
  });

  const isDark = state.theme !== "light";
  const gridColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
  const textColor = isDark ? "#5c5a65" : "#a09a93";

  state.charts.trend = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          borderColor: "#4ade80",
          backgroundColor: "rgba(74,222,128,0.08)",
          pointBackgroundColor: "#4ade80",
          pointBorderColor: isDark ? "#1e2230" : "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 5,
          tension: 0.4,
          fill: true,
        },
        {
          label: "Expenses",
          data: expenseData,
          borderColor: "#f87171",
          backgroundColor: "rgba(248,113,113,0.08)",
          pointBackgroundColor: "#f87171",
          pointBorderColor: isDark ? "#1e2230" : "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 5,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark ? "#1e2230" : "#ffffff",
          borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
          borderWidth: 1,
          titleColor: isDark ? "#f0ece4" : "#1a1612",
          bodyColor: isDark ? "#9a97a0" : "#6b6560",
          padding: 12,
          callbacks: {
            label: (ctx) => " " + ctx.dataset.label + ": " + fmt(ctx.parsed.y),
          },
        },
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: textColor, font: { family: "DM Sans", size: 11 } },
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            font: { family: "DM Mono", size: 10 },
            callback: (v) => "₹" + (v / 1000).toFixed(0) + "k",
          },
        },
      },
    },
  });
}

// ── Donut Chart ──────────────────────────────────────────────
function buildDonutChart() {
  const ctx = $("donutChart").getContext("2d");
  if (state.charts.donut) state.charts.donut.destroy();

  const curTx = getCurrentMonthTx().filter((t) => t.type === "expense");
  const catMap = {};
  curTx.forEach((t) => {
    catMap[t.category] = (catMap[t.category] || 0) + t.amount;
  });

  const sorted = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
  const labels = sorted.map((e) => e[0]);
  const data = sorted.map((e) => e[1]);
  const colors = labels.map((l) => CATEGORY_COLORS[l] || "#94a3b8");
  const total = data.reduce((s, v) => s + v, 0);

  // Update center display
  if (sorted.length > 0) {
    const topPct = total > 0 ? Math.round((sorted[0][1] / total) * 100) : 0;
    $("donutPct").textContent = topPct + "%";
  }

  // Render legend
  const legendEl = $("donutLegend");
  legendEl.innerHTML = sorted.map(([cat, amt]) => `
    <div class="donut-legend-item">
      <div class="donut-legend-left">
        <div class="donut-legend-dot" style="background:${CATEGORY_COLORS[cat] || '#94a3b8'}"></div>
        <span>${cat}</span>
      </div>
      <span class="donut-legend-val">${fmt(amt)}</span>
    </div>
  `).join("");

  if (data.length === 0) {
    $("donutPct").textContent = "—";
    return;
  }

  const isDark = state.theme !== "light";
  state.charts.donut = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: colors,
        borderColor: isDark ? "#1e2230" : "#ffffff",
        borderWidth: 3,
        hoverBorderWidth: 4,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: "72%",
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark ? "#1e2230" : "#ffffff",
          borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
          borderWidth: 1,
          titleColor: isDark ? "#f0ece4" : "#1a1612",
          bodyColor: isDark ? "#9a97a0" : "#6b6560",
          padding: 10,
          callbacks: {
            label: (ctx) => " " + ctx.label + ": " + fmt(ctx.parsed),
          },
        },
      },
    },
  });
}

// ── Monthly Comparison Chart (bar) ───────────────────────────
function buildMonthlyChart() {
  const ctx = $("monthlyChart").getContext("2d");
  if (state.charts.monthly) state.charts.monthly.destroy();

  const months = getLast6Months();
  const incomeData = [], expenseData = [];

  months.forEach(({ year, month }) => {
    const txs = state.transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getFullYear() === year && d.getMonth() === month;
    });
    const s = computeSummary(txs);
    incomeData.push(s.income);
    expenseData.push(s.expense);
  });

  const labels = months.map(({ year, month }) => {
    const d = new Date(year, month, 1);
    return d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
  });

  const isDark = state.theme !== "light";
  const gridColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
  const textColor = isDark ? "#5c5a65" : "#a09a93";

  state.charts.monthly = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: "rgba(74,222,128,0.75)",
          borderRadius: 5,
          borderSkipped: false,
        },
        {
          label: "Expenses",
          data: expenseData,
          backgroundColor: "rgba(248,113,113,0.75)",
          borderRadius: 5,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          display: true,
          position: "top",
          align: "end",
          labels: {
            color: textColor,
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 8,
            font: { family: "DM Sans", size: 11 },
          },
        },
        tooltip: {
          backgroundColor: isDark ? "#1e2230" : "#ffffff",
          borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
          borderWidth: 1,
          titleColor: isDark ? "#f0ece4" : "#1a1612",
          bodyColor: isDark ? "#9a97a0" : "#6b6560",
          padding: 12,
          callbacks: { label: (ctx) => " " + ctx.dataset.label + ": " + fmt(ctx.parsed.y) },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: textColor, font: { family: "DM Sans", size: 11 } },
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            font: { family: "DM Mono", size: 10 },
            callback: (v) => "₹" + (v / 1000).toFixed(0) + "k",
          },
        },
      },
    },
  });
}

// ── Transactions Table ───────────────────────────────────────
function getFilteredTransactions() {
  let txs = [...state.transactions];
  const f = state.filters;

  if (f.search) {
    const q = f.search.toLowerCase();
    txs = txs.filter((t) =>
      t.desc.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  }
  if (f.category !== "all") txs = txs.filter((t) => t.category === f.category);
  if (f.type !== "all") txs = txs.filter((t) => t.type === f.type);

  txs.sort((a, b) => {
    switch (f.sort) {
      case "date-desc": return new Date(b.date) - new Date(a.date);
      case "date-asc":  return new Date(a.date) - new Date(b.date);
      case "amount-desc": return b.amount - a.amount;
      case "amount-asc":  return a.amount - b.amount;
      default: return 0;
    }
  });

  return txs;
}

function renderTransactionsTable() {
  const txs = getFilteredTransactions();
  const tbody = $("txTableBody");
  const empty = $("txEmptyState");

  $("txCount").textContent = txs.length + " transaction" + (txs.length !== 1 ? "s" : "") + " found";

  if (txs.length === 0) {
    tbody.innerHTML = "";
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  tbody.innerHTML = txs.map((t) => `
    <tr data-id="${t.id}">
      <td style="color:var(--text-2);font-size:0.8rem">${fmtDate(t.date)}</td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:1rem">${CATEGORY_ICONS[t.category] || "💳"}</span>
          <span style="font-weight:500">${escHtml(t.desc)}</span>
        </div>
      </td>
      <td><span class="cat-pill">${t.category}</span></td>
      <td><span class="type-badge ${t.type}">${t.type}</span></td>
      <td class="text-right">
        <span style="font-family:var(--font-mono);color:${t.type === "income" ? "var(--green)" : "var(--red)"}">
          ${t.type === "income" ? "+" : "−"}${fmtFull(t.amount)}
        </span>
      </td>
      <td class="text-center admin-only">
        <div class="table-actions">
          <button class="btn-icon edit-btn" data-id="${t.id}" title="Edit">
            <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="btn-icon delete-btn" data-id="${t.id}" title="Delete">
            <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join("");

  // Apply RBAC again on new rows
  if (state.role === "viewer") {
    tbody.querySelectorAll(".admin-only").forEach((el) => (el.style.display = "none"));
  }
}

function populateCategoryFilter() {
  const cats = [...new Set(state.transactions.map((t) => t.category))].sort();
  const sel = $("filterCategory");
  const cur = sel.value;
  sel.innerHTML = '<option value="all">All Categories</option>' +
    cats.map((c) => `<option value="${c}">${c}</option>`).join("");
  if (cats.includes(cur)) sel.value = cur;
}

// ── Insights ─────────────────────────────────────────────────
function renderInsights() {
  renderInsightCards();
  buildMonthlyChart();
  renderCategoryBreakdown();
}

function renderInsightCards() {
  const el = $("insightsGrid");
  const curTx = getCurrentMonthTx();
  const prevTx = getPrevMonthTx();
  const cur = computeSummary(curTx);
  const prev = computeSummary(prevTx);

  // Top spending category
  const expCats = {};
  curTx.filter((t) => t.type === "expense").forEach((t) => {
    expCats[t.category] = (expCats[t.category] || 0) + t.amount;
  });
  const topCat = Object.entries(expCats).sort((a, b) => b[1] - a[1])[0];

  // Savings rate
  const savingsRate = cur.income > 0 ? ((cur.net / cur.income) * 100).toFixed(1) : 0;

  // Expense change
  const expChange = prev.expense > 0
    ? (((cur.expense - prev.expense) / prev.expense) * 100).toFixed(1)
    : null;

  // Avg transaction value
  const expenses = curTx.filter((t) => t.type === "expense");
  const avgTx = expenses.length > 0 ? cur.expense / expenses.length : 0;

  // Most frequent category
  const freqCats = {};
  curTx.filter((t) => t.type === "expense").forEach((t) => {
    freqCats[t.category] = (freqCats[t.category] || 0) + 1;
  });
  const freqCat = Object.entries(freqCats).sort((a, b) => b[1] - a[1])[0];

  const insights = [
    {
      emoji: "🔥",
      label: "Top Spending Category",
      value: topCat ? topCat[0] : "—",
      desc: topCat
        ? `${fmt(topCat[1])} spent on ${topCat[0]} this month (${cur.expense > 0 ? Math.round((topCat[1] / cur.expense) * 100) : 0}% of total expenses)`
        : "No expenses recorded this month",
    },
    {
      emoji: savingsRate >= 20 ? "🏆" : savingsRate >= 0 ? "📊" : "⚠️",
      label: "Savings Rate",
      value: savingsRate + "%",
      desc: savingsRate >= 30
        ? "Excellent! You're saving well above average."
        : savingsRate >= 15
        ? "Good savings rate — aim for 20%+ for stronger financial health."
        : savingsRate >= 0
        ? "Try to increase your savings rate. Target: 20% or more."
        : "Expenses exceeded income this month — review your budget.",
    },
    {
      emoji: expChange !== null ? (expChange > 0 ? "📈" : "📉") : "📋",
      label: "Month-over-Month Expenses",
      value: expChange !== null ? (expChange > 0 ? "+" : "") + expChange + "%" : "—",
      desc: expChange !== null
        ? `Expenses ${expChange > 0 ? "increased" : "decreased"} by ${Math.abs(expChange)}% vs last month (${fmt(prev.expense)} → ${fmt(cur.expense)})`
        : "Not enough data to compare months.",
    },
    {
      emoji: "🧾",
      label: "Avg. Transaction Value",
      value: avgTx > 0 ? fmt(avgTx) : "—",
      desc: `${expenses.length} expense transactions this month averaging ${fmt(avgTx)} each`,
    },
    {
      emoji: "🔄",
      label: "Most Frequent Category",
      value: freqCat ? freqCat[0] : "—",
      desc: freqCat
        ? `${freqCat[1]} transaction${freqCat[1] !== 1 ? "s" : ""} in ${freqCat[0]} this month`
        : "No expenses this month",
    },
    {
      emoji: cur.net >= 0 ? "✅" : "❌",
      label: "Monthly Cash Flow",
      value: (cur.net >= 0 ? "+" : "") + fmt(cur.net),
      desc: `Income: ${fmt(cur.income)} · Expenses: ${fmt(cur.expense)}`,
    },
  ];

  el.innerHTML = insights.map((ins, i) => `
    <div class="insight-card" style="animation-delay:${i * 0.06}s">
      <div class="insight-emoji">${ins.emoji}</div>
      <div class="insight-label">${ins.label}</div>
      <div class="insight-value" style="color:${ins.label === "Monthly Cash Flow" ? (cur.net >= 0 ? "var(--green)" : "var(--red)") : "var(--text-1)"}">${ins.value}</div>
      <div class="insight-desc">${ins.desc}</div>
    </div>
  `).join("");
}

function renderCategoryBreakdown() {
  const expTx = state.transactions.filter((t) => t.type === "expense");
  const catMap = {};
  expTx.forEach((t) => {
    catMap[t.category] = (catMap[t.category] || 0) + t.amount;
  });
  const total = Object.values(catMap).reduce((s, v) => s + v, 0);
  const sorted = Object.entries(catMap).sort((a, b) => b[1] - a[1]);

  const el = $("categoryBreakdown");
  el.innerHTML = sorted.map(([cat, amt]) => {
    const pct = total > 0 ? ((amt / total) * 100).toFixed(1) : 0;
    const color = CATEGORY_COLORS[cat] || "#94a3b8";
    return `
      <div class="cat-breakdown-item">
        <div class="cat-breakdown-header">
          <span class="cat-breakdown-name">${CATEGORY_ICONS[cat] || "💳"} ${cat}</span>
          <span class="cat-breakdown-val">${fmt(amt)} <span style="color:var(--text-3)">(${pct}%)</span></span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${pct}%;background:${color}"></div>
        </div>
      </div>
    `;
  }).join("");
}

// ── Modal ────────────────────────────────────────────────────
function openModal(txId = null) {
  state.editingId = txId;
  $("modalTitle").textContent = txId ? "Edit Transaction" : "Add Transaction";
  $("editId").value = txId || "";

  if (txId) {
    const tx = state.transactions.find((t) => t.id === txId);
    if (tx) {
      $("fDesc").value = tx.desc;
      $("fAmount").value = tx.amount;
      $("fCategory").value = tx.category;
      $("fType").value = tx.type;
      $("fDate").value = tx.date;
    }
  } else {
    $("fDesc").value = "";
    $("fAmount").value = "";
    $("fCategory").value = "Food";
    $("fType").value = "expense";
    $("fDate").value = new Date().toISOString().split("T")[0];
  }

  $("modalOverlay").classList.add("open");
}

function closeModal() {
  $("modalOverlay").classList.remove("open");
  state.editingId = null;
}

function saveTransaction() {
  const desc = $("fDesc").value.trim();
  const amount = parseFloat($("fAmount").value);
  const category = $("fCategory").value;
  const type = $("fType").value;
  const date = $("fDate").value;

  if (!desc || !amount || amount <= 0 || !date) {
    alert("Please fill in all fields with valid values.");
    return;
  }

  if (state.editingId) {
    const idx = state.transactions.findIndex((t) => t.id === state.editingId);
    if (idx !== -1) {
      state.transactions[idx] = { ...state.transactions[idx], desc, amount, category, type, date };
    }
  } else {
    state.transactions.unshift({ id: uid(), desc, amount, category, type, date });
  }

  saveState();
  closeModal();
  renderAll();
}

function openDeleteModal(txId) {
  state.deletingId = txId;
  $("deleteOverlay").classList.add("open");
}

function closeDeleteModal() {
  $("deleteOverlay").classList.remove("open");
  state.deletingId = null;
}

function confirmDelete() {
  if (state.deletingId) {
    state.transactions = state.transactions.filter((t) => t.id !== state.deletingId);
    saveState();
    renderAll();
  }
  closeDeleteModal();
}

// ── Export ───────────────────────────────────────────────────
function exportCSV() {
  const txs = getFilteredTransactions();
  const rows = [["Date", "Description", "Category", "Type", "Amount"]];
  txs.forEach((t) => rows.push([t.date, `"${t.desc}"`, t.category, t.type, t.amount]));
  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ledger_transactions.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// ── Helpers ──────────────────────────────────────────────────
function getLast6Months() {
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ year: d.getFullYear(), month: d.getMonth() });
  }
  return months;
}

function escHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ── Render all ───────────────────────────────────────────────
function renderAll() {
  populateCategoryFilter();
  renderCards();
  renderRecentTx();
  buildTrendChart();
  buildDonutChart();
  renderTransactionsTable();
}

// ── Init ─────────────────────────────────────────────────────
function init() {
  loadState();
  applyTheme();
  applyRole();
  renderAll();

  // Navigation
  $$(".nav-item, .link-btn").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      navigate(el.dataset.section);
    });
  });

  // Role selects
  $("roleSelect").addEventListener("change", (e) => {
    state.role = e.target.value;
    $("mobileRoleSelect").value = state.role;
    saveState();
    applyRole();
  });
  $("mobileRoleSelect").addEventListener("change", (e) => {
    state.role = e.target.value;
    $("roleSelect").value = state.role;
    saveState();
    applyRole();
  });

  // Theme
  $("themeToggle").addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    applyTheme();
    saveState();
  });

  // Add buttons
  $("openAddTxBtn").addEventListener("click", () => openModal());
  $("openAddTxBtn2").addEventListener("click", () => openModal());

  // Modal controls
  $("modalClose").addEventListener("click", closeModal);
  $("modalCancel").addEventListener("click", closeModal);
  $("modalSave").addEventListener("click", saveTransaction);
  $("modalOverlay").addEventListener("click", (e) => { if (e.target === $("modalOverlay")) closeModal(); });

  // Delete modal
  $("deleteClose").addEventListener("click", closeDeleteModal);
  $("deleteCancelBtn").addEventListener("click", closeDeleteModal);
  $("deleteConfirmBtn").addEventListener("click", confirmDelete);
  $("deleteOverlay").addEventListener("click", (e) => { if (e.target === $("deleteOverlay")) closeDeleteModal(); });

  // Filters
  $("searchInput").addEventListener("input", (e) => {
    state.filters.search = e.target.value;
    renderTransactionsTable();
  });
  $("filterCategory").addEventListener("change", (e) => {
    state.filters.category = e.target.value;
    renderTransactionsTable();
  });
  $("filterType").addEventListener("change", (e) => {
    state.filters.type = e.target.value;
    renderTransactionsTable();
  });
  $("sortBy").addEventListener("change", (e) => {
    state.filters.sort = e.target.value;
    renderTransactionsTable();
  });
  $("clearFilters").addEventListener("click", () => {
    state.filters = { search: "", category: "all", type: "all", sort: "date-desc" };
    $("searchInput").value = "";
    $("filterCategory").value = "all";
    $("filterType").value = "all";
    $("sortBy").value = "date-desc";
    renderTransactionsTable();
  });

  // Export
  $("exportBtn").addEventListener("click", exportCSV);

  // Edit / Delete via event delegation
  $("txTableBody").addEventListener("click", (e) => {
    const editBtn = e.target.closest(".edit-btn");
    const delBtn = e.target.closest(".delete-btn");
    if (editBtn) openModal(editBtn.dataset.id);
    if (delBtn) openDeleteModal(delBtn.dataset.id);
  });

  // Mobile sidebar
  $("hamburger").addEventListener("click", () => {
    $("sidebar").classList.toggle("open");
    $("sidebarOverlay").classList.toggle("open");
  });
  $("sidebarOverlay").addEventListener("click", () => {
    $("sidebar").classList.remove("open");
    $("sidebarOverlay").classList.remove("open");
  });
}

document.addEventListener("DOMContentLoaded", init);