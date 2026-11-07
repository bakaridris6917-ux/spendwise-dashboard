// =====================================
// SpendWise - Interactive Budget Tracker
// =====================================

// ---------- 1. Data ----------

// Array of category objects (name, icon, spending limit)
const categories = [
  { name: "Food",          icon: "🍔", limit: 500 },
  { name: "Transport",     icon: "🚌", limit: 200 },
  { name: "Rent",          icon: "🏠", limit: 900 },
  { name: "Entertainment", icon: "🎬", limit: 150 },
  { name: "Savings",       icon: "🏦", limit: 500 },   // a goal, not a limit
  { name: "Utilities",     icon: "💡", limit: 200 }
];

let monthlyBudget = 2000;
let activeFilter = "All";
let nextId = 7;

// Array of expense records (starter data so the dashboard is not empty)
let expenses = [
  { id: 1, description: "Groceries",         category: "Food",          amount: 310 },
  { id: 2, description: "Bus pass",          category: "Transport",     amount: 96.5 },
  { id: 3, description: "November rent",     category: "Rent",          amount: 900 },
  { id: 4, description: "Movies and games",  category: "Entertainment", amount: 127.5 },
  { id: 5, description: "Monthly savings",   category: "Savings",       amount: 350 },
  { id: 6, description: "Electricity/water", category: "Utilities",     amount: 110 }
];

// ---------- 2. Grab elements from the page ----------
const statBudget      = document.getElementById("stat-budget");
const statSpent       = document.getElementById("stat-spent");
const statRemaining   = document.getElementById("stat-remaining");
const feedbackBox     = document.getElementById("feedback");
const feedbackText    = document.getElementById("feedback-text");
const progressBar     = document.getElementById("progress-bar");
const budgetForm      = document.getElementById("budget-form");
const budgetInput     = document.getElementById("budget-input");
const budgetError     = document.getElementById("budget-error");
const expenseForm     = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput     = document.getElementById("amount");
const categorySelect  = document.getElementById("category");
const categoryCards   = document.getElementById("category-cards");
const expenseList     = document.getElementById("expense-list");
const expenseCount    = document.getElementById("expense-count");
const emptyMessage    = document.getElementById("empty-message");
const filterSelect    = document.getElementById("filter-select");
const clearBtn        = document.getElementById("clear-btn");
const headerAddBtn    = document.getElementById("header-add-btn");
const currentMonth    = document.getElementById("current-month");
const expenseError    = document.getElementById("expense-error");

// ---------- 3. Calculation functions (loops) ----------

function formatMoney(amount) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

// Loop through every expense and add up the amounts
function calculateTotal() {
  let total = 0;
  for (const expense of expenses) {
    total += expense.amount;
  }
  return total;
}

// Loop through every expense and add up one category
function calculateCategoryTotal(categoryName) {
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].category === categoryName) {
      total += expenses[i].amount;
    }
  }
  return total;
}

// ---------- 4. Decision making (conditionals) ----------

// Returns a message, a level (ok / warn / danger) and the percent used
function getBudgetFeedback(budget, spent) {
  if (budget <= 0) {
    return { level: "warn", percent: 0, message: "Set a monthly budget to start tracking your spending." };
  }

  const percent = (spent / budget) * 100;
  const remaining = budget - spent;

  if (spent > budget) {
    return {
      level: "danger",
      percent: percent,
      message: "Over budget by " + formatMoney(Math.abs(remaining)) + "! Time to cut back."
    };
  } else if (percent >= 90) {
    return {
      level: "danger",
      percent: percent,
      message: "Careful! You have used " + percent.toFixed(1) + "% of your budget. Only " + formatMoney(remaining) + " left."
    };
  } else if (percent >= 70) {
    return {
      level: "warn",
      percent: percent,
      message: "Heads up: you have used " + percent.toFixed(1) + "% of your budget. " + formatMoney(remaining) + " left."
    };
  } else if (spent === 0) {
    return { level: "ok", percent: 0, message: "No spending yet. Add your first expense!" };
  } else {
    return {
      level: "ok",
      percent: percent,
      message: "You are on track! " + formatMoney(remaining) + " left this month."
    };
  }
}

// ---------- 5. Rendering (DOM manipulation) ----------

// Small helper that creates an element with a class and text
function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = text;
  }
  return element;
}

function renderStats() {
  const spent = calculateTotal();
  const remaining = monthlyBudget - spent;

  statBudget.textContent = formatMoney(monthlyBudget);
  statSpent.textContent = formatMoney(spent);
  statRemaining.textContent = formatMoney(remaining);

  // Decision: show a red number when the balance is negative
  if (remaining < 0) {
    statRemaining.classList.add("negative");
  } else {
    statRemaining.classList.remove("negative");
  }
}

function renderFeedback() {
  const result = getBudgetFeedback(monthlyBudget, calculateTotal());

  feedbackText.textContent = result.message;
  feedbackBox.className = "feedback " + result.level;
  progressBar.style.width = Math.min(result.percent, 100) + "%";
}

function renderCategoryCards() {
  categoryCards.innerHTML = "";

  categories.forEach(function (category) {
    const total = calculateCategoryTotal(category.name);
    const percent = Math.round((total / category.limit) * 100);
    const isSavings = category.name === "Savings";

    // Decide what the badge says and which colour it gets
    let badgeText = percent + "% used";
    let badgeClass = "badge";

    if (isSavings) {
      badgeText = percent + "% of goal";
      if (percent >= 100) {
        badgeClass += " badge-ok";
      }
    } else if (percent > 100) {
      badgeText = "Over limit";
      badgeClass += " badge-danger";
    } else if (percent >= 80) {
      badgeClass += " badge-warn";
    }

    const card = createElement("article", "card");
    card.tabIndex = 0;

    const top = createElement("div", "card-top");
    top.appendChild(createElement("span", "card-icon", category.icon));
    top.appendChild(createElement("span", badgeClass, badgeText));

    card.appendChild(top);
    card.appendChild(createElement("h3", "", category.name));
    card.appendChild(createElement("p", "amount", formatMoney(total)));
    card.appendChild(
      createElement("p", "meta", "of " + formatMoney(category.limit) + (isSavings ? " goal" : " budget"))
    );

    categoryCards.appendChild(card);
  });
}

function renderExpenseList() {
  expenseList.innerHTML = "";
  let shown = 0;

  // Loop backwards so the newest expense appears first
  for (let i = expenses.length - 1; i >= 0; i--) {
    const expense = expenses[i];

    if (activeFilter !== "All" && expense.category !== activeFilter) {
      continue;
    }

    const item = createElement("li", "expense-item");

    const info = createElement("div", "expense-info");
    info.appendChild(createElement("span", "expense-desc", expense.description));
    info.appendChild(createElement("span", "expense-tag", expense.category));

    const amount = createElement("span", "expense-amount", formatMoney(expense.amount));

    const deleteBtn = createElement("button", "delete-btn", "✕");
    deleteBtn.type = "button";
    deleteBtn.dataset.id = expense.id;
    deleteBtn.setAttribute("aria-label", "Delete " + expense.description);

    item.appendChild(info);
    item.appendChild(amount);
    item.appendChild(deleteBtn);
    expenseList.appendChild(item);
    shown++;
  }

  expenseCount.textContent = "Showing " + shown + " of " + expenses.length + " expenses";
  emptyMessage.hidden = shown !== 0;
}

// Redraw everything on the page from the data
function render() {
  renderStats();
  renderFeedback();
  renderCategoryCards();
  renderExpenseList();
}

// ---------- 6. Data-changing functions ----------

function addExpense(description, category, amount) {
  expenses.push({ id: nextId, description: description, category: category, amount: amount });
  nextId++;
  render();
}

function deleteExpense(id) {
  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });
  render();
}

// ---------- 7. Event listeners (user interactions) ----------

// Set the monthly budget
budgetForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const value = parseFloat(budgetInput.value);

  if (isNaN(value) || value <= 0) {
    budgetError.textContent = "Please enter a budget greater than 0.";
    return;
  }

  budgetError.textContent = "";
  monthlyBudget = value;
  render();
});

// Add a new expense
expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categorySelect.value;

  if (description === "") {
    expenseError.textContent = "Please enter a description.";
    descriptionInput.focus();
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    expenseError.textContent = "Please enter an amount greater than 0.";
    amountInput.focus();
    return;
  }

  expenseError.textContent = "";
  addExpense(description, category, amount);
  expenseForm.reset();
  descriptionInput.focus();
});

// Delete buttons: one listener on the list handles every button (event delegation)
expenseList.addEventListener("click", function (event) {
  const button = event.target.closest(".delete-btn");
  if (button) {
    deleteExpense(Number(button.dataset.id));
  }
});

// Filter the list by category
filterSelect.addEventListener("change", function () {
  activeFilter = filterSelect.value;
  renderExpenseList();
});

// Remove every expense
clearBtn.addEventListener("click", function () {
  if (expenses.length === 0) {
    return;
  }
  if (confirm("Delete all expenses? This cannot be undone.")) {
    expenses = [];
    render();
  }
});

// Header button jumps to the expense form
headerAddBtn.addEventListener("click", function () {
  expenseForm.scrollIntoView({ behavior: "smooth" });
  descriptionInput.focus();
});

// ---------- 8. Start the app ----------

function init() {
  // Fill the category dropdowns using a loop
  const allOption = document.createElement("option");
  allOption.value = "All";
  allOption.textContent = "All categories";
  filterSelect.appendChild(allOption);

  for (const category of categories) {
    const formOption = document.createElement("option");
    formOption.value = category.name;
    formOption.textContent = category.name;
    categorySelect.appendChild(formOption);

    const filterOption = document.createElement("option");
    filterOption.value = category.name;
    filterOption.textContent = category.name;
    filterSelect.appendChild(filterOption);
  }

  // Show the current month in the header
  const today = new Date();
  currentMonth.textContent =
    today.toLocaleDateString("en-US", { month: "long", year: "numeric" }) + " overview";

  budgetInput.value = monthlyBudget;
  render();
}

init();