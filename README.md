AI Image Generator 🎨✨

A modern, responsive AI-powered image generation web app that lets users create stunning images from text prompts using the Clipdrop Text-to-Image API.

📌 Features

🖊 Prompt Input – Type any description of your imagination.

🎲 Random Prompt Generator – Get random creative prompts for inspiration.

🖼 Multiple Image Count – Generate 1–4 images at once.

📏 Aspect Ratio Selection – Choose between Square (1:1), Landscape (16:9), or Portrait (9:16).

⏳ Loading Animation – Beautiful loading shimmer and spinner while images are generated.

💾 Download Button – Save generated images instantly.

📱 Responsive Design – Fully optimized for desktop, tablet, and mobile.

📂 Project Structure
📁 AI-Image-Generator
│── index.html      # Main HTML structure
│── style.css       # Modern and responsive styling
│── script.js       # Main JavaScript logic & API integration

⚙️ How It Works

User enters a custom prompt or clicks the dice 🎲 button for a random prompt.

Selects the image count and aspect ratio.

Clicks Generate and the app calls the Clipdrop Text-to-Image API with your prompt.

Displays results with download options.

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/your-username/ai-image-generator.git
cd ai-image-generator

2️⃣ Open in Browser

Simply open index.html in your browser.

🔑 API Key Setup

This project uses the Clipdrop API.

Get your API key from Clipdrop.

Open script.js and replace the value of API_KEY with your key:

const API_KEY = "your_api_key_here";

🛠 Technologies Used

HTML5 – Semantic structure

CSS3 – Modern UI with responsive design

JavaScript (ES6) – API calls & interactivity

Font Awesome – Icons

Clipdrop API – AI image generation

⚠️ Notes

The API may have rate limits depending on your plan.

The generated images are subject to Clipdrop's usage policy.

📄 License

This project is licensed under the MIT License – feel free to modify and use it.