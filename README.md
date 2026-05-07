<div align="center">
  <h1>🌸 Ethereal Wedding Invitation</h1>
  <p><em>A beautifully crafted, headless CMS powered digital wedding invitation</em></p>

  <img src="https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-6-purple?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-f24e1e?logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Google_Sheets-CMS-34A853?logo=googlesheets&logoColor=white" alt="Google Sheets CMS" />

</div>

<br />

> Ethereal brings a romantic and cinematic experience to your guests before the big day even arrives. Effortlessly manage your invitation content using Google Sheets—no coding required after initial setup!

---

## ✨ Features

- **Ethereal & Romantic Design:** Premium floating floral accents, sophisticated typography, and soft palettes crafted for modern weddings.
- **Fluid Animations:** Scroll-driven fade-ins, falling petals, and smooth page transitions powered by Framer Motion.
- **Headless Google Sheets CMS:** Update names, dates, quotes, events, and RSVP data simply by editing a spreadsheet. 
- **Smart Image Parsing:** Automatically converts generic Google Drive shareable links into direct-view thumbnails for your gallery.
- **Live RSVP Management:** Fully functioning RSVP submission form that securely posts incoming guest data directly back to your designated Google Sheet tab.
- **Atmospheric Audio:** Built-in background music player with elegant UI controls.

## 📸 Preview

*(Replace the placeholder below with an actual screenshot of your website!)*

<div align="center">
  <img src="https://via.placeholder.com/1000x500.png?text=Ethereal+Wedding+Invitation+Screenshot+Here" alt="Ethereal Wedding Invitation Screenshot" width="100%" />
</div>

## 🚀 Live Demo

**[View Live Demo Here](#)** *(Replace this link with your actual deployed website url!)*

---

## 🛠️ Architecture

This project leverages modern frontend technologies combined with a lightweight, serverless backend approach:
- **Frontend:** React + TypeScript built with Vite.
- **Styling:** Tailwind CSS for responsive and highly customizable UI.
- **Backend/Database:** Google Apps Script serving as a REST API to read/write data to a Google Sheet.

---

## 📖 Getting Started

### 1. Setting up the Headless CMS (Google Sheets)

This website dynamically connects to a spreadsheet to fetch all content.

1. **Create a Google Sheet:** 
   - Create tabs with the exact names: `Settings`, `Couple`, `Event`, `Gallery`, `RSVP`.
   - Ensure the column headers match the expected JSON keys.
2. **Setup Apps Script:**
   - In your Google Sheet, go to **Extensions > Apps Script**.
   - Write or paste your `doGet` and `doPost` endpoint functions to parse sheet values.
3. **Deploy as Web App:**
   - Click **Deploy > New deployment** -> **Web app**.
   - Execute as: **Me** | Who has access: **Anyone**
   - Click **Deploy** and copy the generated **Web App URL**.

### 2. Local Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ethereal-wedding-invitation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   # Your Google Apps Script Deployment Web App URL
   VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   
   # Raw URL link to any MP3/WAV file for background music (optional)
   VITE_BACKGROUND_MUSIC_URL=https://your-domain.com/music.mp3
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   *Visit `http://localhost:3000` to view the application.*

---

## 🎨 Customization

The core aesthetics are deeply integrated into the Tailwind configuration and CSS variables.
To change the overall look and feel, edit the CSS variables in `src/index.css`:

```css
:root {
  --color-wedding-gold: #c5a059;
  --color-wedding-cream: #f9f6f0;
  /* ... */
}
```
You can also choose between different themes provided in the application context (`classic`, `modern`, `sage`, `burgundy`).

---

## 📦 Deployment

### Deploying to Vercel (Recommended)

1. **Push to GitHub:** Ensure your project is pushed to a repository.
2. **Import to Vercel:** Connect your GitHub account to [Vercel](https://vercel.com) and import the repository.
3. **Configure Environment Variables:** Add `VITE_GOOGLE_SHEET_URL` and `VITE_BACKGROUND_MUSIC_URL` in the project settings under Environment Variables.
4. **Deploy:** Click deploy. Vercel will handle the build automatically.

Alternatively, you can build locally using `npm run build` and deploy the `dist` folder to any static hosting service (Netlify, GitHub Pages, etc.).

---

<div align="center">
  <p><i>Created with ❤️ for your special day.</i></p>
  <p><i>Made with Love by <b><a href="https://github.com/Hilal06">@Hilal06</a></b> &bull; Digital Invitation Project by Olok.inc</i></p>
</div>
