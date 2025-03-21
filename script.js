// [========== Search bar js ============]
const MIN_SEARCH_LENGTH = 1;

// Select the search input, app icons, and popup elements
const searchInput = document.getElementById('search-input');
const appIcons = document.querySelectorAll('.product');
const loadingAnimation = document.getElementById('loading-animation');
const voiceSearchBtn = document.getElementById('voice-search-btn');
const voiceAnimation = document.getElementById('voice-animation');
const notFoundPopup = document.getElementById('not-found-popup');
const minCharPopup = document.getElementById('min-char-popup');

let typingTimer;
const TYPING_DELAY = 1000; // 1 second delay after typing stops

// Function to show loading animation
function showLoadingAnimation() {
    loadingAnimation.style.display = 'block';
}

// Function to hide loading animation
function hideLoadingAnimation() {
    loadingAnimation.style.display = 'none';
}

// Event listener for text input search
searchInput.addEventListener('input', function() {
    clearTimeout(typingTimer);
    showLoadingAnimation(); // Show loading animation when typing

    typingTimer = setTimeout(() => {
        const query = searchInput.value.toLowerCase().trim();

        if (query.length >= MIN_SEARCH_LENGTH) {
            let found = false;
            appIcons.forEach(icon => {
                const title = icon.getAttribute('data-title').toLowerCase();
                if (title.includes(query)) {
                    icon.style.display = 'block';
                    found = true;
                } else {
                    icon.style.display = 'none';
                }
            });

            if (!found) {
                showNotFoundPopup();
            }
        } else {
            appIcons.forEach(icon => {
                icon.style.display = 'block';
            });

            showMinCharPopup();
        }

        hideLoadingAnimation(); // Hide loading animation after processing
    }, TYPING_DELAY);
});

// Stop loading animation when input loses focus
searchInput.addEventListener('blur', hideLoadingAnimation);

// Voice recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    voiceSearchBtn.addEventListener('click', () => {
        // Show voice animation
        voiceAnimation.style.display = 'flex';
        recognition.start();
    });

    recognition.onresult = function(event) {
        const voiceQuery = event.results[0][0].transcript.toLowerCase().trim();
        searchInput.value = voiceQuery;
        searchInput.dispatchEvent(new Event('input'));
    };

    recognition.onspeechend = function() {
        recognition.stop();
        // Hide voice animation
        voiceAnimation.style.display = 'none';
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        // Hide voice animation
        voiceAnimation.style.display = 'none';
    };
} else {
    console.error('Speech recognition not supported in this browser.');
}

// Function to show "No matching apps found" alert
function showNotFoundPopup() {
    notFoundPopup.style.display = 'block';
    setTimeout(() => {
        notFoundPopup.style.display = 'none';
    }, 2000);
}

// Function to show "Minimum characters required" alert
function showMinCharPopup() {
    minCharPopup.style.display = 'block';
    setTimeout(() => {
        minCharPopup.style.display = 'none';
    }, 2000);
}



// ========= [ slider js ] =======
        let slideIndex = 0;
        const slides = document.querySelectorAll('.slide');
        function showSlide(index) {
            if (index >= slides.length) {
                slideIndex = 0;
            } else if (index < 0) {
                slideIndex = slides.length - 1;
            } else {
                slideIndex = index;
            }
            document.querySelector('.slider').style.transform = `translateX(${-slideIndex * 100}%)`;
        }
        function nextSlide() {
            showSlide(slideIndex + 1);
        }
        function prevSlide() {
            showSlide(slideIndex - 1);
        }
        // Auto-slide every 5 seconds
        setInterval(nextSlide, 4000);
       
       