// ===============================
// SpendWise - JavaScript Foundation
// ===============================

console.log("SpendWise script loaded successfully!");

// ---------- 1. Application data (variables) ----------
const appName = "SpendWise";           // string
const currency = "$";                  // string
let monthlyBudget = 0;                 // number
let isOverBudget = false;              // boolean

// Expense-related data: one variable per category (numbers)
let foodExpense = 0;
let transportExpense = 0;
let rentExpense = 0;
let entertainmentExpense = 0;
let savingsExpense = 0;
let utilitiesExpense = 0;

// ---------- 2. Reusable functions ----------

// Asks the user for a number and keeps asking until the input is valid
function getNumberInput(message) {
  let answer;   // declared outside the loop so the while condition can use it
  let value;

  do {
    answer = prompt(message);

    // User clicked Cancel: treat as 0 so the app does not crash
    if (answer === null) {
      return 0;
    }

    value = Number(answer);
  } while (answer.trim() === "" || isNaN(value) || value < 0);

  return value;
}

// Adds up all expenses
function calculateTotalExpenses(food, transport, rent, entertainment, savings, utilities) {
  return food + transport + rent + entertainment + savings + utilities;
}

// Budget minus total spending
function calculateRemainingBalance(budget, totalExpenses) {
  return budget - totalExpenses;
}

// Percentage of the budget already spent
function calculatePercentUsed(budget, totalExpenses) {
  if (budget === 0) {
    return 0;
  }
  return (totalExpenses / budget) * 100;
}

// Returns a friendly status message
function getBudgetStatus(remainingBalance, percentUsed) {
  if (remainingBalance < 0) {
    return "Over budget! You have spent more than your budget.";
  } else if (percentUsed >= 80) {
    return "Warning: you have used 80% or more of your budget.";
  } else {
    return "Great job! You are within your budget.";
  }
}

// Formats a number as money, e.g. $1250.50
function formatMoney(amount) {
  return currency + amount.toFixed(2);
}

// Prints everything to the console with clear labels
function displayResults(budget, expenses, totalExpenses, remainingBalance, percentUsed, status) {
  console.log("=================================");
  console.log(`   ${appName} Budget Summary`);
  console.log("=================================");
  console.log("Monthly Budget:    " + formatMoney(budget));
  console.log("---------------------------------");
  console.log("Expenses by category:");
  console.log("  Food:            " + formatMoney(expenses.food));
  console.log("  Transport:       " + formatMoney(expenses.transport));
  console.log("  Rent:            " + formatMoney(expenses.rent));
  console.log("  Entertainment:   " + formatMoney(expenses.entertainment));
  console.log("  Savings:         " + formatMoney(expenses.savings));
  console.log("  Utilities:       " + formatMoney(expenses.utilities));
  console.log("---------------------------------");
  console.log("Total Expenses:    " + formatMoney(totalExpenses));
  console.log("Remaining Balance: " + formatMoney(remainingBalance));
  console.log("Budget Used:       " + percentUsed.toFixed(1) + "%");
  console.log("Status:            " + status);
  console.log("=================================");
}

// ---------- 3. Main program ----------
function runSpendWise() {
  // Collect user input
  monthlyBudget = getNumberInput("Enter your total monthly budget:");
  foodExpense = getNumberInput("How much did you spend on Food?");
  transportExpense = getNumberInput("How much did you spend on Transport?");
  rentExpense = getNumberInput("How much did you spend on Rent?");
  entertainmentExpense = getNumberInput("How much did you spend on Entertainment?");
  savingsExpense = getNumberInput("How much did you put into Savings?");
  utilitiesExpense = getNumberInput("How much did you spend on Utilities?");

  // Perform calculations
  const totalExpenses = calculateTotalExpenses(
    foodExpense,
    transportExpense,
    rentExpense,
    entertainmentExpense,
    savingsExpense,
    utilitiesExpense
  );
  const remainingBalance = calculateRemainingBalance(monthlyBudget, totalExpenses);
  const percentUsed = calculatePercentUsed(monthlyBudget, totalExpenses);
  isOverBudget = remainingBalance < 0;
  const status = getBudgetStatus(remainingBalance, percentUsed);

  // Group expenses in an object to pass to the display function
  const expenses = {
    food: foodExpense,
    transport: transportExpense,
    rent: rentExpense,
    entertainment: entertainmentExpense,
    savings: savingsExpense,
    utilities: utilitiesExpense
  };

  // Display results
  displayResults(monthlyBudget, expenses, totalExpenses, remainingBalance, percentUsed, status);
}

runSpendWise();