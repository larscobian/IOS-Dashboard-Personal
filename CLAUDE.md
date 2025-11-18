# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal goal-tracking dashboard for 2026, built on top of Vision UI Dashboard React template. The application tracks 7 personal goals throughout the year and includes a daily journaling system.

### Personal Goals Being Tracked
1. Read 5 books
2. Save $2,000
3. Invest $1,000
4. Exercise 3x/week (156 sessions annually)
5. Meal prep every Sunday (52 weeks)
6. Daily journal entries (365 days)
7. Sleep before midnight (365 days)

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (opens http://localhost:3000)
npm start

# Build for production
npm run build

# Run tests
npm test

# Clean install (removes node_modules and reinstalls)
npm run install:clean
```

## Architecture

### Routing System (`src/routes.js`)
Routes are defined as objects in an array. Each route object automatically renders in the sidebar navigation. Route configuration:
- `type: "collapse"` - Creates a navigable route
- `type: "title"` - Creates a section header in sidebar
- `route` - URL path for React Router
- `component` - React component to render
- `icon` - Icon component from react-icons
- `key` - Unique identifier

### Global State Management (`src/context/index.js`)
Uses React Context API with reducer pattern. The `VisionUIControllerProvider` manages:
- Sidebar state (mini/full, transparent)
- Navbar configuration (fixed, transparent)
- Layout direction (ltr/rtl)
- Theme customization

To use global state in components:
```javascript
import { useVisionUIController, setMiniSidenav } from "context";
const [controller, dispatch] = useVisionUIController();
// Access: controller.miniSidenav
// Update: setMiniSidenav(dispatch, true)
```

### Component System

**Base Components** (`src/components/Vui*`)
Styled wrapper components built on Material-UI:
- `VuiBox` - Flexbox container with custom styling
- `VuiTypography` - Text with theme-aware typography
- `VuiButton`, `VuiInput`, `VuiProgress` - Form and UI elements
- All components use Material-UI's `sx` prop for inline styling

**Layout Components** (`src/examples/LayoutContainers/`)
- `DashboardLayout` - Wraps all dashboard pages with sidebar/navbar
- `PageLayout` - Simple layout for authentication pages

**Reusable Components** (`src/examples/`)
- `Cards/StatisticsCards/MiniStatisticsCard` - Metric display cards
- `Charts/LineCharts/LineChart` - ApexCharts wrapper for line graphs
- `Charts/BarCharts/BarChart` - ApexCharts wrapper for bar graphs

### Theme System (`src/assets/theme/`)

Theme configuration is centralized and follows this structure:
- `base/` - Design tokens (colors, typography, borders, breakpoints)
- `components/` - Material-UI component overrides
- `functions/` - Utility functions (pxToRem, linearGradient, rgba, etc.)

Colors are accessed via:
```javascript
import colors from "assets/theme/base/colors";
const { info, success, gradients } = colors;
```

### Layout Structure

**Current Layouts:**
- `layouts/dashboard/` - Main overview showing progress summary
- `layouts/metas/` - Detailed view of all 7 goals with progress bars
- `layouts/journal/` - Daily journal entry system with calendar

**Data Organization Pattern:**
Each layout follows this convention:
```
layouts/[name]/
├── index.js              # Main component
├── components/           # Sub-components specific to this layout
└── data/                 # Static data, chart configurations
```

### Chart Integration

Charts use ApexCharts via `react-apexcharts`. Standard pattern:
```javascript
import LineChart from "examples/Charts/LineCharts/LineChart";
import { lineChartData } from "./data/lineChartData";
import { lineChartOptions } from "./data/lineChartOptions";

<LineChart lineChartData={lineChartData} lineChartOptions={lineChartOptions} />
```

## Implementation Guidelines

### Adding New Goals/Features
1. Create layout in `src/layouts/[feature-name]/`
2. Add route definition in `src/routes.js`
3. Follow existing component patterns from `layouts/metas/` or `layouts/journal/`

### Data Persistence
Currently, all data is static (hardcoded). When implementing persistence:
- Create `src/services/localStorage.js` for browser storage
- Create `src/services/[feature]Service.js` for business logic
- Store data as JSON in localStorage
- Consider adding state to context provider for global access

### Component Creation
Always use existing Vui* components as building blocks:
```javascript
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";
```

### Icon Usage
Icons come from `react-icons/io5`. Import pattern:
```javascript
import { IoTrophy, IoBookSharp, IoFitness } from "react-icons/io5";
```

## Key Files to Understand

- `src/App.js` - Root component, sets up routing and context provider
- `src/index.js` - Entry point, renders App with providers
- `src/routes.js` - Defines all navigation routes
- `src/context/index.js` - Global state management
- `src/assets/theme/base/colors.js` - Color palette definitions
- `src/assets/theme/functions/linearGradient.js` - Gradient utilities used throughout

## Current State vs. Future Features

**Implemented:**
- Basic routing and navigation
- Static goal display with progress bars (0% progress)
- Journal entry form UI
- Dashboard with summary cards

**Not Yet Implemented (marked as "Pendiente de implementar"):**
- Data persistence (localStorage or backend)
- Actual progress tracking and calculations
- Calendar visualization for 2026
- Streak counters for daily habits
- Book list management
- Savings/investment tracking over time
- Exercise session logging
- Meal prep planning interface

When implementing these features, create corresponding service files in `src/services/` and data files in the relevant layout's `data/` directory.
