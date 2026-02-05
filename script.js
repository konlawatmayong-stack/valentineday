// Get elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modalMessage');
const closeBtn = document.getElementById('closeBtn');
const heartsBackground = document.querySelector('.hearts-background');

// Create floating hearts
function createFloatingHeart() {
    const heart = document.createElement('div');
    const heartEmojis = ['💕', '💗', '💓', '💝', '💖', '💘'];
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.position = 'absolute';
    heart.style.fontSize = Math.random() * 20 + 20 + 'px';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '100%';
    heart.style.opacity = '0.4';
    heart.style.pointerEvents = 'none';
    heart.style.animation = `float ${Math.random() * 10 + 10}s linear`;
    heart.style.animationDelay = Math.random() * 5 + 's';

    heartsBackground.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 20000);
}

// Create hearts periodically
setInterval(createFloatingHeart, 1000);

// Initial hearts
for (let i = 0; i < 10; i++) {
    setTimeout(createFloatingHeart, i * 500);
}

// Yes button click
yesBtn.addEventListener('click', () => {
    modalMessage.textContent = 'ยินดีด้วย! 💕 รักนะ! 💖';
    modal.classList.add('active');
    createConfetti();
});

// No button click - make it run away!
noBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Calculate random position within viewport
    const randomX = Math.random() * (viewportWidth - btnWidth - 100) + 50;
    const randomY = Math.random() * (viewportHeight - btnHeight - 100) + 50;

    // Make button position fixed so it can move anywhere on screen
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.3s ease';
});

// Close modal
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Create confetti effect
function createConfetti() {
    const colors = ['#ff1e6b', '#ff6b9d', '#ffc3e1', '#ff8fab'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.opacity = '1';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';

            document.body.appendChild(confetti);

            const fallDuration = Math.random() * 3 + 2;
            const fallDistance = Math.random() * 100 + 100;
            const sway = Math.random() * 100 - 50;

            confetti.animate([
                {
                    transform: 'translateY(0) translateX(0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translateY(${fallDistance}vh) translateX(${sway}px) rotate(${Math.random() * 360}deg)`,
                    opacity: 0
                }
            ], {
                duration: fallDuration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            setTimeout(() => {
                confetti.remove();
            }, fallDuration * 1000);
        }, i * 30);
    }
}
