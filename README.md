# 📅 Angular 17 Standalone Event Calendar

<p align="center">
  <img src="https://img.shields.io/badge/Angular-17-red?logo=angular" />
  <img src="https://img.shields.io/badge/Standalone-Component-success" />
  <img src="https://img.shields.io/badge/Signals-Enabled-blue" />
  <img src="https://img.shields.io/badge/Animations-Enabled-orange" />
  <img src="https://img.shields.io/badge/Mobile-Friendly-brightgreen" />
  <img src="https://img.shields.io/badge/License-MIT-purple" />
</p>

A lightweight, reusable, and performance-optimized **Month View Event Calendar** built using **Angular 17 Standalone Components**, **Signals**, and **Angular Animations**.

Designed for enterprise applications like:

- HRMS
- Task Management
- Scheduling Systems
- Booking Systems
- Admin Dashboards


## 🚀 Features

### 📆 Calendar
- 6×7 (42 cell) month grid
- Correct weekday alignment
- Previous / Next navigation
- Today highlight
- Weekend styling
- Disabled other-month dates

### 📊 Event Handling
- Event count badge
- Total duration display
- Expand week to view events
- Configurable event actions
- Parent-controlled edit/delete
- Double-click (desktop) support
- Long press (mobile) support

### 🎨 UI/UX
- Selected date highlight
- Smooth expand/collapse animation
- Responsive layout
- Clean enterprise styling

### ⚡ Performance
- Angular Signals
- `trackBy` optimizations
- Optional O(1) event lookup map
- Fully reusable standalone component

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/angular-event-calendar.git
cd angular-event-calendar
npm install
ng serve


## # 📅 Angular 17 Standalone Event Calendar

<p align="center">
  <img src="https://img.shields.io/badge/Angular-17-red?logo=angular" />
  <img src="https://img.shields.io/badge/Standalone-Component-success" />
  <img src="https://img.shields.io/badge/Signals-Enabled-blue" />
  <img src="https://img.shields.io/badge/Animations-Enabled-orange" />
  <img src="https://img.shields.io/badge/Mobile-Friendly-brightgreen" />
  <img src="https://img.shields.io/badge/License-MIT-purple" />
</p>

A lightweight, reusable, and performance-optimized **Month View Event Calendar** built using **Angular 17 Standalone Components**, **Signals**, and **Angular Animations**.

Designed for enterprise applications like:

- HRMS
- Task Management
- Scheduling Systems
- Booking Systems
- Admin Dashboards

---

## 🚀 Features

### 📆 Calendar
- 6×7 (42 cell) month grid
- Correct weekday alignment
- Previous / Next navigation
- Today highlight
- Weekend styling
- Disabled other-month dates

### 📊 Event Handling
- Event count badge
- Total duration display
- Expand week to view events
- Configurable event actions
- Parent-controlled edit/delete
- Double-click (desktop) support
- Long press (mobile) support

###📱 Interaction Behavior

| Device | Action |	Result |
|--------|--------|--------|
| Desktop | Double click | Add event |
| Mobile | Long press (500ms) | Add event |
| Click | badge | Expand week |

### 🎨 UI/UX
- Selected date highlight
- Smooth expand/collapse animation
- Responsive layout
- Clean enterprise styling

### ⚡ Performance
- Angular Signals
- `trackBy` optimizations
- Optional O(1) event lookup map
- Fully reusable standalone component

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/angular-event-calendar.git
cd angular-event-calendar
npm install
ng serve

## 🛠 Enable Animations (Required)

In `app.config.ts`:

```js
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig = {
  providers: [
    provideAnimations()
  ]
};
```

## 🧩 Usage
Import Component

```js
import { MonthCalendarComponent } from './month-calendar/month-calendar.component';
```

## Template Usage

```html
<month-calendar
  [events]="events"
  (doubleClickOnCell)="addEvent($event)" 
  (eventAction)="onEventAction($event)" 
  (changeMonthView)="onchangeMonthView($event)">
</month-calendar>
```


## 📄 License
MIT

## ⭐ Support
If you found this useful, give it a ⭐ on GitHub!

## Author
- Maram Chandrasekhar Reddy [@chandumaram](https://github.com/chandumaram)


