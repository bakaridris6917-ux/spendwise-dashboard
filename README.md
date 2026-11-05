# SpendWise

SpendWise is a personal budgeting application. It started as a responsive dashboard shell built with HTML and CSS (CSS Grid, Flexbox, CSS variables and a dark theme). It now also uses JavaScript to collect budget data from the user, calculate spending and show a clear summary in the browser console.

## What SpendWise Does

- Displays a modern dashboard with a sidebar, header and six category cards (Food, Transport, Rent, Entertainment, Savings, Utilities)
- Asks the user for their monthly budget and how much they spent in each category
- Calculates total expenses, the remaining balance and the percentage of the budget used
- Shows a labeled budget summary and a status message in the browser console
 |
## JavaScript Concepts Implemented

- Variables (`const` and `let`) and data types (string, number, boolean, object)
- User input with `prompt()` and type conversion with `Number()`
- Input validation using a `do...while` loop and `isNaN()`
- Arithmetic calculations
- Conditional statements (`if / else if / else`)
- Reusable functions with parameters and return values
- Template literals and string concatenation
- Console output with `console.log()`

## How Variables Are Used

Variables store the key budgeting data of the app:

```javascript
const appName = "SpendWise";     // string
const currency = "$";            // string
let monthlyBudget = 0;           // number: the user's total budget
let isOverBudget = false;        // boolean: true when spending exceeds the budget

// One number variable per expense category
let foodExpense = 0;
let transportExpense = 0;
let rentExpense = 0;
let entertainmentExpense = 0;
let savingsExpense = 0;
let utilitiesExpense = 0;
```

`const` is used for values that never change (the app name and currency symbol). `let` is used for values that change once the user enters data. The category expenses are also grouped into an `expenses` object before being passed to the display function.

## How User Input Is Collected

The app uses JavaScript `prompt()` boxes to ask for the monthly budget and the spending in each category. Because `prompt()` always returns text, the helper function `getNumberInput()` converts the answer to a number with `Number()`. It keeps asking until the user enters a valid, non-negative number. If the user clicks Cancel, the value is treated as `0` so the program does not crash.

```javascript
monthlyBudget = getNumberInput("Enter your total monthly budget:");
foodExpense = getNumberInput("How much did you spend on Food?");
```

## How Calculations Are Performed

1. **Total expenses:** add the six category amounts together
2. **Remaining balance:** monthly budget minus total expenses
3. **Percent used:** (total expenses ÷ monthly budget) × 100, with a check so the app never divides by zero
4. **Status message:** an `if / else if / else` statement decides whether the user is over budget, near the limit (80% or more), or within budget

## How Functions Help Organize the Code

Each task has its own function, so the code is easier to read, test and reuse:

| Function | Purpose |
|----------|---------|
| `getNumberInput(message)` | Asks for a number and validates it |
| `calculateTotalExpenses(...)` | Adds up all category expenses |
| `calculateRemainingBalance(budget, totalExpenses)` | Returns budget minus spending |
| `calculatePercentUsed(budget, totalExpenses)` | Returns the percentage of the budget spent |
| `getBudgetStatus(remainingBalance, percentUsed)` | Returns a status message |
| `formatMoney(amount)` | Formats a number as money, e.g. `$106.00` |
| `displayResults(...)` | Prints the labeled summary to the console |
| `runSpendWise()` | Runs the whole program in order |

Keeping the calculations separate from the input and display code means each function does one job and can be reused later when SpendWise gets more features.

## Example Output

For a budget of `2000` and expenses of `310`, `96.5`, `900`, `127.5`, `350` and `110`:

```
=================================
   SpendWise Budget Summary
=================================
Monthly Budget:    $2000.00
---------------------------------
Expenses by category:
  Food:            $310.00
  Transport:       $96.50
  Rent:            $900.00
  Entertainment:   $127.50
  Savings:         $350.00
  Utilities:       $110.00
---------------------------------
Total Expenses:    $1894.00
Remaining Balance: $106.00
Budget Used:       94.7%
Status:            Warning: you have used 80% or more of your budget.
=================================
```

## Layout and Styling

- **CSS Grid** for the page layout and the card grid
- **Flexbox** inside the sidebar, header and cards
- **CSS custom properties** on `:root` for the colour theme
- **Dark theme** by overriding only the `:root` variables inside `@media (prefers-color-scheme: dark)`
- **Responsive** single-column layout below 768px
- **Card hover and focus animations** of 200ms using `transform` and `box-shadow`

## Project Structure

```
spendwise-dashboard/
├── index.html
├── style.css
├── script.js
├── README.md
└── screenshots/
```

## How to Run

1. Clone or download this repository.
2. Open `index.html` in a modern browser.
3. Enter your budget and expenses in the prompt boxes.
4. Open the browser console (F12 → Console) to see the results.

## Author
Abubakar Mohamed
