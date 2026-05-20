// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then((reg) => console.log('Service Worker registered:', reg.scope))
      .catch((err) => console.log('Service Worker registration failed:', err));
  });
}

// --- Password Protection ---
// Change this password to whatever you want to share with your wife
const FAMILY_PASSWORD = 'liamoliver';

function checkAuth() {
  const lockScreen = document.getElementById('lock-screen');
  const appContent = document.getElementById('app-content');
  
  // Check if already authenticated
  if (localStorage.getItem('family-auth') === 'true') {
    lockScreen.style.display = 'none';
    appContent.style.display = 'flex';
    appContent.style.flexDirection = 'column';
    appContent.style.alignItems = 'center';
    return;
  }

  const submitBtn = document.getElementById('password-submit');
  const passwordInput = document.getElementById('password-input');
  const errorMsg = document.getElementById('password-error');

  const tryLogin = () => {
    const entered = passwordInput.value.trim().toLowerCase();
    if (entered === FAMILY_PASSWORD) {
      localStorage.setItem('family-auth', 'true');
      lockScreen.style.display = 'none';
      appContent.style.display = 'flex';
      appContent.style.flexDirection = 'column';
      appContent.style.alignItems = 'center';
    } else {
      errorMsg.style.display = 'block';
      passwordInput.value = '';
      passwordInput.focus();
    }
  };

  submitBtn.addEventListener('click', tryLogin);
  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') tryLogin();
  });
}

checkAuth();

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
            const frontSpan = document.createElement('span');
            frontSpan.textContent = word.sonWord;
            frontFace.appendChild(frontSpan);

            const backFace = document.createElement('div');
            backFace.classList.add('word-card-face', 'word-card-back', 'text-xl',
                'font-bold');
            const backSpan = document.createElement('span');
            backSpan.textContent = word.realWord;
            backFace.appendChild(backSpan);

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
