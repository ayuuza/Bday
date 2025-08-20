document.addEventListener('DOMContentLoaded', () => {
    const nameScreen = document.getElementById('name-screen');
    const gameScreen = document.getElementById('game-screen');
    const wishScreen = document.getElementById('wish-screen');
    const finalScreen = document.getElementById('final-screen');

    const userNameInput = document.getElementById('userNameInput');
    const startButton = document.getElementById('startButton');
    const backgroundSong = document.getElementById('background-song');
    const balloonContainer = document.getElementById('balloon-container');
    const sendWishButton = document.getElementById('sendWishButton');
    const finalGreeting = document.getElementById('finalGreeting');
    const birthdayPoem = document.getElementById('birthdayPoem');

    let userName = '';
    let poppedBalloons = 0;

    const poems = [
        "On this special day, a star shines so bright,\nGuiding your path with its beautiful light.\nMay joy and laughter fill up your space,\nAnd happiness find you in every place.",
        "A year has passed, a chapter anew,\nMay all your fondest dreams come true.\nMay your heart be light, your spirit free,\nHappy birthday, from me to thee.",
        "Another year, another grace,\nA smile lights up your lovely face.\nMay your day be filled with sweet delight,\nAnd your future forever be kind and bright."
    ];

    startButton.addEventListener('click', () => {
        userName = userNameInput.value.trim();
        if (userName !== '') {
            nameScreen.classList.add('hidden');
            gameScreen.classList.remove('hidden');
            
            // Attempt to play the audio
            const playPromise = backgroundSong.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Autoplay was prevented. Please check browser settings or user interaction.", error);
                });
            }

            createBalloons();
        } else {
            alert('Please enter your name!');
        }
    });

    function createBalloons() {
        for (let i = 0; i < 8; i++) {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
            balloon.style.left = `${Math.random() * 80 + 10}vw`;
            balloon.style.top = `${Math.random() * 70 + 15}vh`; 
            balloon.addEventListener('click', popBalloon);
            balloonContainer.appendChild(balloon);
        }
    }

    function popBalloon(event) {
        if (event.target.classList.contains('balloon')) {
            event.target.classList.add('popped');
            poppedBalloons++;
            if (poppedBalloons === 8) {
                setTimeout(() => {
                    gameScreen.classList.add('hidden');
                    wishScreen.classList.remove('hidden');
                }, 1000);
            }
        }
    }

    sendWishButton.addEventListener('click', () => {
        wishScreen.classList.add('hidden');
        finalScreen.classList.remove('hidden');
        finalGreeting.textContent = `Happy Birthday Dear ${userName}!`;
        birthdayPoem.textContent = poems[Math.floor(Math.random() * poems.length)];
    });
});
