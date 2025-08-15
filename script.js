const promptForm = document.querySelector(".prompt-form");
const promptInput = document.querySelector(".prompt-input");
const promptBtn = document.querySelector(".prompt-btn");
const generateBtn = document.querySelector(".generate-btn");
const countSelect = document.getElementById("count-select");
const aspectSelect = document.getElementById("aspect-select");
const gridGallery = document.querySelector(".gallery-grid");
const API_KEY = "359e02d194741560f11e4f1ad0e61b40649e54f8be376ea94fb1ec9b4f0f82d91f5019fb34f74faf74cd5fed1993e9a3";

// Example prompts
const examplePrompts = [
    "Futuristic cyberpunk city at night with neon lights and flying cars.",
    "Majestic white tiger resting under a cherry blossom tree.",
    "Ancient temple ruins overgrown with glowing mystical plants.",
    "Steampunk airship flying above a cloudy sunset sky.",
    "Underwater kingdom with mermaids and bioluminescent creatures.",
    "Cozy winter cabin surrounded by snow-covered pine trees.",
    "Golden desert dunes with a giant dragon in the background.",
    "Fantasy castle floating in the clouds with rainbow bridges.",
    "Robot barista serving coffee in a retro diner.",
    "Alien jungle with colorful plants and strange glowing creatures."
];

// Function to generate images via Clipdrop API
const generateImages = async (imageCount, aspectRatio, promptText) => {
    try {
        gridGallery.innerHTML = '';

        // Create loading cards
        for (let i = 0; i < imageCount; i++) {
            gridGallery.innerHTML += `
                <div class="img-card" id="img-card-${i}" style="aspect-ratio:${aspectRatio}">
                    <div class="status-container">
                        <div class="spinner"></div>
                        <p class="status-text">Generating...</p>
                    </div>
                    <img src="#" class="result-img" />
                    <div class="img-overlay">
                        <button class="img-download-btn" data-img-id="${i}">
                            <i class="fa-solid fa-download"></i>
                        </button>
                    </div>
                </div>`;
        }

        // Generate unique images
        for (let i = 0; i < imageCount; i++) {
            const variedPrompt = `${promptText} ${getRandomVariation()}`;

            const form = new FormData();
            form.append('prompt', variedPrompt);

            const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
                method: 'POST',
                headers: {
                    'x-api-key': API_KEY
                },
                body: form
            });

            if (!response.ok) throw new Error(`API Error: ${response.status}`);

            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);

            const card = document.getElementById(`img-card-${i}`);
            card.querySelector('.status-container').style.display = "none";
            card.querySelector('.result-img').src = imageUrl;
        }

    } catch (error) {
        console.error("Error generating images:", error);
        document.querySelectorAll('.status-text').forEach(el => {
            el.textContent = "Error generating image";
        });
    }
};

// Helper function to add variation
function getRandomVariation() {
    const variations = [
        "digital art", "4k", "ultra detailed", "trending on artstation", 
        "unreal engine", "octane render", "cinematic lighting", 
        "concept art", "intricate details"
    ];
    return variations[Math.floor(Math.random() * variations.length)];
}

// Download image function
function downloadImage(imgUrl, promptText) {
    const link = document.createElement('a');
    link.href = imgUrl;
    link.download = `ai-image-${promptText.substring(0, 20).replace(/\s+/g, '-')}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Event listener for downloads
document.addEventListener('click', function(e) {
    if (e.target.closest('.img-download-btn')) {
        const btn = e.target.closest('.img-download-btn');
        const imgId = btn.getAttribute('data-img-id');
        const imgCard = document.getElementById(`img-card-${imgId}`);
        const imgSrc = imgCard.querySelector('.result-img').src;
        const promptText = promptInput.value.trim().substring(0, 50);
        downloadImage(imgSrc, promptText);
    }
});

// Form submission handler
const handleFormSubmit = (e) => {
    e.preventDefault();
    const imageCount = parseInt(countSelect.value) || 1;
    const aspectRatio = aspectSelect.value || "1/1";
    const promptText = promptInput.value.trim();

    if (!promptText) {
        alert("Please enter a prompt");
        return;
    }

    generateImages(imageCount, aspectRatio, promptText);
};

// Event listeners
promptBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    promptInput.value = prompt;
    promptInput.focus();
});

generateBtn.addEventListener("click", handleFormSubmit);

