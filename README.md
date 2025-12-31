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
4.  **Add API Key**:
    Create a file named `.env` in the root folder and add your Google Gemini API key:
    ```env
    API_KEY=your_actual_api_key_here
    ```
5.  **Start the Server**:
    Run the following command to start the app on **localhost:3000**:
    ```bash
    npm start
    ```

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
1.  Upload your video or image file to your web server or place it in the project's root folder.
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

### 💬 Changing Testimonials
Open `components/Testimonials.tsx` and update the `testimonialVideos` array with your own video filenames.
