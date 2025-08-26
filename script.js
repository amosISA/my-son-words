document.addEventListener('DOMContentLoaded', () => {
    const wordsContainer = document.getElementById('words-container');
    const backgroundMusic = document.getElementById('background-music');
    const musicToggleButton = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');

    fetch('words.json')
        .then(response => response.json())
        .then(words => {
            words.forEach(word => {
                const cardContainer = document.createElement('div');
                cardContainer.classList.add('word-card-container');
                cardContainer.style.animationDelay = `${Math.random() * 2}s`;
                cardContainer.style.animationDuration = `${3 + Math.random() * 2}s`;

                const card = document.createElement('div');
                card.classList.add('word-card');

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
        })
        .catch(error => console.error('Error loading words:', error));

    musicToggleButton.addEventListener('click', () => {
        if (backgroundMusic.muted) {
            backgroundMusic.muted = false;
            backgroundMusic.play();
            musicIcon.textContent = '🔇'; // Change to mute icon
        } else {
            backgroundMusic.muted = true;
            backgroundMusic.pause();
            musicIcon.textContent = '🔊'; // Change to play icon
        }
    });
});
