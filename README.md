# FinDash - Finance Dashboard

FinDash is a clean, interactive, and responsive finance dashboard built to track and understand financial activity. It features modern design elements like glassmorphism, smooth animations, and a rich dark/light mode experience.

## Features

- **Dashboard Overview**: Summary cards showing Total Balance, Income, and Expenses with custom visual trends.
- **Data Visualizations**: Time-based balance trend (Area Chart) and categorical spending breakdown (Pie Chart).
- **Transactions Management**: Complete list of transactions featuring role-based Add/Delete functionalities and quick filters (All, Income, Expense).
- **Role-Based UI**:
  - **Viewer**: Read-only access to view charts, insights, and transactions.
  - **Admin**: Elevated privileges allowing adding new transactions and deleting existing ones.
- **Insights Engine**: Automated spending insights, highlighting the highest spending category and overall progress.
- **State & Persistence**: Built with React Context API. All transactions, active theme, and role states are managed globally and persisted locally using `localStorage`.
- **Dark Mode**: Fully implemented dynamic dark and light themes, transitioning gracefully.

## Tech Stack

- **React (Vite)**: Fast frontend development environment.
- **Vanilla CSS**: Custom styling avoiding heavy frameworks. Implemented root variables for theming, CSS Grid for layouts, and flexbox for alignment.
- **Recharts**: For performant SVG-based data visualizations.
- **Lucide React**: Clean, consistent icon set.

## Setup Instructions

1. **Prerequisites**: Ensure you have Node.js installed.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
4. **Open in Browser**: Navigate to `http://localhost:5173` (or the port provided by Vite).
or open this link: https://finance-dashboard-nine-roan.vercel.app/

## Approach

1. **Design System First**: Rather than relying on external UI libraries such as MUI or Tailwind, I built a structured design system in `index.css`. This ensures maximum control over glassmorphism effects, theme variables, and global transitions.
2. **Context API for State**: Adopted `DashboardContext` to handle complex cross-component state without prop drilling. LocalStorage syncing was added directly within the context's side effects.
3. **Component Modularity**: Logically separated the dashboard into `Sidebar`, `Header`, `SummaryCards`, `Charts`, `Transactions`, and `Insights` to maintain scalable and readable code.
4. **Resiliency**: Defensive checks against empty data states (e.g., handling when all expenses are cleared or tracking the highest category falls back safely).

Enjoy managing your finances smoothly!
