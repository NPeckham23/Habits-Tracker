# My Habit Tracker

A personal daily habit & mood tracker, built for iPhone.

---

## Features

- **54 built-in tasks** across 8 colour-coded groups
- **Month, Week & Day** calendar views
- **Mood tracker** — 5-point emoji scale shown on every day
- **Filter** the calendar by group (e.g. Selena 💕) or individual task
- **Add custom tasks** at any time
- Data saved locally in your browser (no account needed)

### Groups
| Colour | Group | Examples |
|--------|-------|---------|
| 💕 Pink | Selena | Kissed, date, gift, intimate |
| 🏃 Green | Exercise | Jogged, climbed, cycled, walk |
| 🍽️ Orange | Food & Drink | Cooked, coffee, groceries |
| 🏠 Blue | Home | Cleaning, dishwasher, bins |
| 🧘 Purple | Wellbeing | Read, journaled, BetterHelp |
| 👨‍👩‍👧 Red | Family & Social | Calls, visits, friends, pub quiz |
| 🎮 Amber | Hobbies | Piano, chess, films, PlayStation |
| 💼 Teal | Work & Life | Office, overnight stays |

---

## Setup

### Prerequisites
- [Node.js](https://nodejs.org) v18 or later
- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (free tier is fine)

### Run locally
```bash
npm install
npm run dev
```
Open http://localhost:5173 in your browser.

---

## Deploy to Vercel (free, ~2 minutes)

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/habit-tracker.git
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New → Project**
3. Import your `habit-tracker` GitHub repo
4. Leave all settings as default — Vercel auto-detects Vite
5. Click **Deploy**

Your app will be live at `https://habit-tracker-xxx.vercel.app` in about 30 seconds.

---

## Add to iPhone home screen

Once deployed, open your Vercel URL in **Safari** on your iPhone:

1. Tap the **Share** button (box with arrow pointing up)
2. Scroll down and tap **"Add to Home Screen"**
3. Name it "Habits" (or whatever you like)
4. Tap **Add**

The app will appear on your home screen and run in **full-screen mode** — no Safari address bar, just the app. It behaves like a native app.

---

## Adding more tasks later

Open the app → tap any day → scroll to the bottom of the sheet → tap **"＋ Add a custom task"**. Give it a name, emoji, and group. It's saved immediately and synced across all calendar views.

To add tasks in code, open `src/App.jsx` and add entries to the `DEFAULT_TASKS` array at the top of the file, following the same format.

---

## Data & Privacy

All data is stored in your browser's `localStorage`. Nothing is sent anywhere. If you clear your browser data, your logs will be lost — so don't use private/incognito mode.

Future enhancement idea: add iCloud/Google sync via a free backend like Supabase.
