# SpendWise Dashboard Shell

A responsive, static dashboard layout for **SpendWise**, a personal expense tracker. This is the visual foundation of my capstone project, built with HTML and modern CSS only (no JavaScript, no frameworks).

## Features

- **Sidebar navigation** with five menu items
- **Header** with page title, an "Add Expense" button and a user profile
- **Six category cards** (Food, Transport, Rent, Entertainment, Savings, Utilities) with realistic static budget data
- **Responsive layout** that collapses to a single column below 768px
- **Card micro-interactions**: hover and keyboard-focus animation
- **Dark theme** that follows the user's system preference

## Layout Techniques

- **CSS Grid** for the overall page layout (`grid-template-areas` for sidebar, header and main) and for the card grid
- **Flexbox** inside the sidebar, header, navigation items and each card
- No absolute positioning is used for the page layout

## Theme (CSS Custom Properties)

The colour palette is defined on `:root` and used throughout the stylesheet:

| Variable | Purpose |
|----------|---------|
| `--color-brand` | Brand colour (sidebar, buttons) |
| `--color-accent` | Accent colour (logo, avatar) |
| `--color-bg` | Page background |
| `--color-surface` | Header and card background |
| `--color-text` | Primary text |
| `--color-text-muted` | Secondary text |

### Dark theme (stretch goal)

The dark theme is implemented by overriding **only** the `:root` variables inside a `@media (prefers-color-scheme: dark)` block. No other selectors change.

## Responsive Design

A media query at `max-width: 767px` switches the grid to a single column and stacks the sidebar, header and cards. I verified it using the browser DevTools Device Toolbar.

## Card Micro-interactions

Cards lift by 4px and gain a stronger shadow on both `:hover` and `:focus-visible`. The transition lasts **200ms** and uses only `transform` and `box-shadow`. Cards are keyboard-focusable via `tabindex="0"`. Animations are disabled for users who prefer reduced motion.

## Project Structure

```
spendwise-dashboard/
├── index.html
├── style.css
├── README.md
└── screenshots/
```

## How to Run

1. Clone or download this repository.
2. Open `index.html` in any modern browser.

## What I Learned

- Combining CSS Grid for page structure with Flexbox for component internals
- Building a theme with CSS custom properties and overriding it for dark mode
- Writing responsive layouts with media queries
- Adding accessible, subtle animations with keyboard focus support

## Author

Abubakar Mohamed
