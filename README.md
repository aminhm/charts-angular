# charts-angular

## Overview
This project is a Single Page Web Application designed to display a list of charts using the latest features of Angular.

## Features
- Responsive UI design
- Two separate routes: "View mode" and "Settings"
- Date range filter for charts in "View mode"
- Ability to add, edit, and remove charts in "Settings" using modal windows

## Libraries Used
- **RxJs:** Reactive Extensions for JavaScript
- **Angular Material / Ng Bootstrap / Taiga UI:** UI component libraries for Angular
- **Highcharts:** Interactive JavaScript charts library
- **NgXs:** State management libraries for Angular

## Installation
To install the necessary packages, run:
```
npm install
```

## Usage
To start the application, run:
```
npm start
```

## Routes
### View mode
- Displays a list of charts
- Includes a date range filter for filtering charts
- Date range filter is hidden if there are no charts

### Settings
- Allows users to add, edit, and remove charts
- Modal windows are used for adding/editing charts
- Users can change the name, type (line, spline, area), and color of each chart
