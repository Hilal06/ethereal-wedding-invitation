# 🌸 Ethereal Wedding Invitation

<div align="center">
  <img src="https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-6-purple?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-f24e1e?logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Headless_CMS-Google_Sheets-34A853?logo=googlesheets&logoColor=white" alt="Google Sheets" />
</div>

<br />

A beautifully crafted, highly responsive, and elegant digital wedding invitation. Ethereal brings a romantic and cinematic experience to your guests before the big day even arrives. 

The best part? This project uses **Google Sheets as a Headless CMS**. You can effortlessly update names, dates, quotes, events, RSVP data, and your image gallery simply by updating cells in a spreadsheet—without touching a single line of code!

---

## 📸 Screenshot

*(Replace the placeholder below with an actual screenshot of your website!)*

![Ethereal Wedding Invitation Screenshot](https://via.placeholder.com/1000x500.png?text=Ethereal+Wedding+Invitation+Screenshot+Here)

## 🚀 Live Demo

**[View Live Demo Here](https://your-demo-link-here.com)**

*(Replace this link with your actual deployed website url!)*

---

## ✨ Features

- **Ethereal & Romantic Design**: Premium floating floral accents, sophisticated typography, and soft palettes crafted for modern weddings.
- **Fluid Animations**: Scroll-driven fade-ins, falling petals, and smooth page transitions powered by Framer Motion.
- **Google Sheets CMS Integration**: The frontend fetches data directly from a deployed Google Apps Script macro hooked to your personal Google Sheet. No complex server backend required!
- **Smart Google Drive Images**: Automatically parses and converts generic Google Drive shareable links into direct-view thumbnail endpoints.
- **Live RSVP Management**: Fully functioning RSVP submission form that securely posts incoming guest data directly back to your designated Google Sheet tab!

---

## 📋 Prerequisites

Before you start, make sure you have the following installed and ready:

1. **Node.js** (v18.x or later) & **npm**
2. A **Google Account** (to create the Google Sheet & Apps Script)
3. A basic understanding of the terminal/command line.

---

## 📖 Step-by-Step Tutorial

### Part 1: Setting up the Headless CMS (Google Sheets)

This website dynamically connects to a spreadsheet to fetch all content.

1. **Create a Google Sheet**: 
   - Create a new Google Sheet.
   - Create the following tabs (exact names): `Settings`, `Couple`, `Event`, `Gallery`, `RSVP`.
   - *Tip: The exact column headers must match the JSON keys expected by the frontend. (E.g., `Settings` should have keys like `weddingDate`, `brideName`, etc.)*
2. **Setup Apps Script**:
   - In your Google Sheet, go to **Extensions > Apps Script**.
   - Write or paste your `doGet` and `doPost` endpoint functions to parse sheet values and return/accept JSON.
3. **Deploy as Web App**:
   - Click **Deploy > New deployment**.
   - Select **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** and copy the generated **Web App URL**. You will need this later!

### Part 2: Local Setup & Installation

1. **Clone the repository** and navigate into the project directory.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Create a `.env` file in the root directory (where `package.json` is located) and add the following:
   ```env
   # Your Google Apps Script Deployment Web App URL from Part 1
   VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   
   # A direct raw URL link to any MP3/WAV file for background atmospheric music (optional)
   VITE_BACKGROUND_MUSIC_URL=https://your-domain.com/music.mp3
   ```
4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
5. **View your site**: Open your browser and navigate to `http://localhost:3000`.

---

## 🎨 Aesthetic Customization

Want to make it perfectly match your wedding theme? It's easy!

The core colors are hard-linked tightly into Tailwind's configuration. You can radically change the look and feel by editing your CSS variables over in `src/index.css`. 

For example, tailor the `--color-wedding-gold` or `--color-wedding-cream` hex codes perfectly to your special day's palette!

---

## 📦 Build for Production

When you are ready to share your beautiful invitation with the world, bundle your website into a highly optimized, minified package:

```bash
npm run build
```

The resulting files will be generated in the `dist` folder, which is ready to be uploaded to static hosting services like **Vercel**, **Netlify**, or **GitHub Pages**.

---

<div align="center">
  <i>Created with ❤️ for your special day.</i>
</div>
