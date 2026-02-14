# Utah Garden Planner 🌿

A visual plant directory and garden planner for Utah's climate (zones 3–10).

## Features

- **Plant Directory** — Browse 48 plants with filters for category, sun, water, maintenance, and bloom month
- **Plant Detail** — Full breakdown with growing calendar, stats, and pro tips
- **My Garden** — Add plants and see a 12-month task calendar for your collection

## Quick Start

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── main.jsx                    # Entry point
├── App.jsx                     # Main app with routing & state
├── data/
│   └── plants.js               # Plant database & constants
└── components/
    ├── PlantCalendar.jsx       # 12-month mini calendar
    ├── PlantCard.jsx           # Directory card
    ├── PlantDetail.jsx         # Full detail modal
    ├── GardenCalendar.jsx      # Year-at-a-glance calendar
    └── GardenPlantRow.jsx      # Garden list row
```

## Tech Stack

- React 18
- Vite
- No external UI libraries — all custom styled components
