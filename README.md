# Alazar Pro | Visual Creative & Director Portfolio

This project is a high-end portfolio for Alazar Pro, featuring categorized photography and videography, cinematic video testimonials, and AI-powered visual tools.

## 🚀 How to Run Locally

To run this website on your local machine:

1.  **Install Node.js**: Make sure you have [Node.js](https://nodejs.org/) installed on your computer.
2.  **Open Terminal**: Open your terminal (or Command Prompt) and navigate to the project folder.
3.  **Install Dependencies**:
    Run the following command:
    ```bash
    npm install
    ```
4.  **Environment & Server (contact API + AI)**:
    - Copy `.env.example` to `.env.local` and fill the SMTP values, `VITE_CONTACT_API_URL`, and your `API_KEY` (Gemini key).
    - Start the contact & AI server locally (it defaults to port 3001):
    ```bash
    npm run server
    ```
5.  **Start the Frontend**:
    Run the dev server (Vite) locally:
    ```bash
    npm run dev
    ```

> Note: Keep any Google Gemini API keys server-side—do NOT expose them in client bundles. This repo includes a server endpoint (`/api/ai-chat`) you can use. Set `VITE_AI_API_URL` to your server address (e.g., `http://localhost:3001`).

## 📁 File Directory Guide

-   `App.tsx`: The main layout file. Contains the navigation, footer, and basic sections.
-   `index.html`: The core HTML template. Includes global styles and the TikTok integration script.
-   `types.ts`: Defines the data types for projects and categories (Wedding, Modeling, etc.).
-   `components/PortfolioGrid.tsx`: The "Work" section where photos and videos are categorized.
-   `components/Testimonials.tsx`: Displays the cinematic video testimonials.
-   `components/ContactSection.tsx`: The contact form and contact details section.
-   `services/geminiService.ts`: Contains the logic for the AI Photo Editor and Video Generator.

## 🛠 How to Customize

### 📧 Changing the Email Address
The email address is located in two files:
1.  **`App.tsx`**: Look for the `Direct Contact` section in the `footer` (near the bottom of the file).
2.  **`components/ContactSection.tsx`**: Search for `hello@alazarpro.com` and replace it with your desired email.

### 🎥 How to Insert Videos and Photos
All projects (Work) are managed in `components/PortfolioGrid.tsx` inside the `PROJECTS` array.

**To add a new video/photo:**
1.  Upload your video or image file to your web server or place it in the project's root folder (or `public/`).
2.  Open `components/PortfolioGrid.tsx`.
3.  Add a new entry to the `PROJECTS` array like this:
    ```javascript
    {
      id: 'v5',
      title: 'My New Video',
      type: 'Videography',
      category: 'Promotion', // Use Wedding, Modeling, Graduation, Celebrity, Promotion, or Short Film
      imageUrl: 'cover-image.jpg', // The thumbnail
      videoUrl: 'my-video.mp4',   // The actual video file
      description: 'A brief description of the work.'
    },
    ```

Image optimization recommendation:
- Generate WebP and AVIF fallbacks for hero and thumbnails for faster loads.
- Example using `sharp`:

```bash
npm install -g sharp-cli
sharp photo.jpg --resize 1024 --to webp -o photo.webp
sharp photo.jpg --resize 1024 --to avif -o photo.avif
```
- Put optimized versions in `public/` and update `App.tsx` picture sources or the `imageUrl` in the projects.


Running tests

- Install dev dependencies if you haven't yet:

```bash
npm install
```

- Run the server tests (Jest + Supertest):

```bash
npm test
```

The tests include a mocked Gemini client and a rate-limit test for `/api/ai-chat`. They run locally without contacting external AI services.


### 💬 Changing Testimonials
Open `components/Testimonials.tsx` and update the `testimonialVideos` array with your own video filenames.
