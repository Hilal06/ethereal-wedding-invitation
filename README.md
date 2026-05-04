# Ethereal Wedding Invitation

A beautiful, highly responsive, and elegant digital wedding invitation built with React, Vite, Tailwind CSS, and Framer Motion. 

This project uses **Google Sheets as a Headless CMS**, meaning you can effortlessly update names, dates, quotes, events, and your image gallery simply by updating cells in a spreadsheet without touching a single line of code!.

## Features
- ✨ **Ethereal & Romantic Design**: Premium floating floral accents, sophisticated typography, and soft palettes crafted for modern weddings.
- 💨 **Fluid Animations**: Scroll-driven fade-ins, falling petals, and smooth page transitions powered by Framer Motion.
- 💾 **Google Sheets CMS Integration**: The frontend fetches data directly from a deployed Google Apps Script macro hooked to your personal Google Sheet. No complex server backend required!
- 🖼️ **Smart Google Drive Images**: Automatically parses and converts generic Google Drive shareable links into direct-view thumbnail endpoints so your image links load seamlessly directly from your Google Drive.
- 💌 **Live RSVP Management**: Fully functioning RSVP submission form that securely posts incoming guest data and wishes directly back to your designated Google Sheet tab!

## Project Architecture
- **Frontend Framework**: React 18 / Vite
- **Styling**: Tailwind CSS 
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Backend/Database**: Google Apps Script + Google Sheets

---

## Setup Instructions

### 1. The Headless CMS (Google Sheets)
This website dynamically connects to a spreadsheet to fetch all content. Check out the included documentation details on how to structure your sheet rows and columns properly.
1. Create a Google Sheet with specific tabs (`Settings`, `Couple`, `Event`, `Gallery`, `RSVP`).
2. Go to **Extensions > Apps Script** and deploy the custom `doGet` and `doPost` endpoints for parsing sheet values and returning JSON.
3. Ensure it is deployed as a **Web App** accessible to **Anyone**. Cop\y the generated **Web App Deployment URL**.

### 2. Required Environment Variables
In the root directory of this local project, create or edit your `.env` file to mount your remote data sources:

```env
# Your Google Apps Script Deployment Web App URL (the endpoint that returns JSON data)
VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/.../exec

# A direct raw URL link to any MP3/WAV file for background atmospheric music
VITE_BACKGROUND_MUSIC_URL=https://your-domain.com/music.mp3
```

### 3. Installation & Usage
To run the project on your local machine:

1. Install dependencies:
```bash
npm install
```

2. Start the local development server:
```bash
npm run dev
```

3. View it locally on `http://localhost:3000`

### 4. Build for Production
To bundle your website into a highly optimized, minified production package ready to be uploaded to a static hosting service (like Vercel, Netlify, or GitHub Pages):
```bash
npm run build
```

## Aesthetic Customization & Tweak
The core colors are hard-linked tightly into Tailwind's configuration utility class names. You can radically change the look and feel by editing your CSS variables over in `src/index.css`. Tailor `wedding-gold` or `wedding-cream` perfectly to your special day!
