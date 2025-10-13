document.addEventListener('DOMContentLoaded', () => {
    const wordsContainer = document.getElementById('words-container');
    const backgroundMusic = document.getElementById('background-music');
    const musicToggleButton = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let allWords = []; // To store all words for filtering
    let currentFilter = 'all'; // Default filter

    const renderWords = (wordsToRender) => {
        wordsContainer.innerHTML = ''; // Clear existing words
        wordsToRender.forEach(word => {
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('word-card-container');
            cardContainer.style.animationDelay = `${Math.random() * 2}s`;
            cardContainer.style.animationDuration = `${3 + Math.random() * 2}s`;

            const card = document.createElement('div');
            card.classList.add('word-card');
            // Add son-specific class for styling
            if (word.son === 'Oliver') {
                card.classList.add('word-card-oliver');
            } else {
                card.classList.add('word-card-liam');
            }

            const frontFace = document.createElement('div');
            frontFace.classList.add('word-card-face', 'word-card-front', 'text-xl',
                'font-bold');
            frontFace.textContent = word.sonWord;

            const backFace = document.createElement('div');
            backFace.classList.add('word-card-face', 'word-card-back', 'text-xl',
                'font-bold');
            backFace.textContent = word.realWord;

            card.appendChild(frontFace);
            card.appendChild(backFace);
            cardContainer.appendChild(card);
            wordsContainer.appendChild(cardContainer);

            cardContainer.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });
        });
    };

    const filterWords = (sonName) => {
        currentFilter = sonName;
        const filteredWords = sonName === 'all' ? allWords : allWords.filter(word => word.son === sonName);
        renderWords(filteredWords);
    };

    fetch('words.json')
        .then(response => response.json())
        .then(words => {
            allWords = words;
            renderWords(allWords);
        })
        .catch(error => console.error('Error loading words:', error));

    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            const sonName = event.target.dataset.son;
            filterWords(sonName);
        });
    });

    musicToggleButton.addEventListener('click', () => {
        if (backgroundMusic.muted) {
            backgroundMusic.muted = false;
            backgroundMusic.play();
            musicIcon.textContent = '🔊'; // Change to volume icon (unmuted)
        } else {
            backgroundMusic.muted = true;
            backgroundMusic.pause();
            musicIcon.textContent = '🔇'; // Change to mute icon
        }
    });
});
