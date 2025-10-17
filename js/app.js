// Women's Day Interactive App
// Get all the necessary elements
const questionCard = document.querySelector('.question-card');
const noBtn = document.querySelector('.no-btn');
const yesBtn = document.querySelector('.yes-btn');
const flowerLoader = document.querySelector('.flower-loader');
const resultContainer = document.querySelector('.result-container');
const resultGif = document.querySelector('.result-gif');

// Make the "No" button move away when hovered or when mouse gets near
let noBtnMoving = false;

function moveNoButton() {
  if (noBtnMoving) return;

  noBtnMoving = true;

  // Generate random movement within reasonable bounds
  const moveX = (Math.random() - 0.5) * 200; // -100px to +100px
  const moveY = (Math.random() - 0.5) * 150; // -75px to +75px

  // Apply transform to move button relative to its normal position
  noBtn.style.transform = `translate(${moveX}px, ${moveY}px) scale(0.9)`;

  // Reset to normal position after animation
  setTimeout(() => {
    noBtn.style.transform = 'translate(0, 0) scale(1)';
    noBtnMoving = false;
  }, 300);
}

// Move button when mouse hovers over it
noBtn.addEventListener("mouseover", moveNoButton);

// Move button when mouse gets near it (proximity detection)
document.addEventListener("mousemove", (e) => {
  if (noBtnMoving) return;

  const btnRect = noBtn.getBoundingClientRect();
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Calculate distance from mouse to button center
  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;
  const distance = Math.sqrt(
    Math.pow(mouseX - btnCenterX, 2) +
    Math.pow(mouseY - btnCenterY, 2)
  );

  // If mouse is within 100px of the button, move it away
  if (distance < 100) {
    moveNoButton();
  }
});

// Prevent clicking the No button
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  moveNoButton();
  return false;
});

// Also prevent the button from receiving focus
noBtn.addEventListener("mousedown", (e) => {
  e.preventDefault();
  moveNoButton();
});

// Override the button's onclick behavior
noBtn.onclick = (e) => {
  e.preventDefault();
  moveNoButton();
  return false;
};

// Handle "Yes" button click
yesBtn.addEventListener("click", () => {
  // Hide buttons
  document.querySelector('.button-container').style.display = 'none';

  // Show flower loading animation
  flowerLoader.style.display = "block";

  // Add some celebratory text changes
  const subtitle = document.querySelector('.subtitle');
  const originalText = subtitle.textContent;
  subtitle.textContent = "Hãy cùng nhau tôn vinh những người phụ nữ tuyệt vời của Việt Nam! 🌸";

  // After 2 seconds, show result
  setTimeout(() => {
    flowerLoader.style.display = "none";
    resultContainer.style.display = "block";
    resultGif.style.display = "block";

    // Play the GIF if it's a video element
    if (resultGif.tagName === 'VIDEO') {
      resultGif.play();
    }

    // Add confetti effect
    createConfetti();
  }, 2000);
});

// Create floating flower petals effect
function createFlowerPetals() {
  const petals = ['🌸', '🌺', '🌷', '💐', '🌹'];
  const petal = document.createElement('div');
  petal.textContent = petals[Math.floor(Math.random() * petals.length)];
  petal.style.position = 'absolute';
  petal.style.fontSize = '30px';
  petal.style.left = Math.random() * window.innerWidth + 'px';
  petal.style.top = window.innerHeight + 'px';
  petal.style.pointerEvents = 'none';
  petal.style.zIndex = '1000';
  petal.style.animation = `floatPetal ${Math.random() * 3 + 2}s linear forwards`;
  
  document.body.appendChild(petal);
  
  // Remove petal after animation
  setTimeout(() => {
    if (petal.parentNode) {
      petal.parentNode.removeChild(petal);
    }
  }, 5000);
}

// Add floating petals animation
const petalsStyle = document.createElement('style');
petalsStyle.textContent = `
  @keyframes floatPetal {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(petalsStyle);

// Create confetti effect
function createConfetti() {
  const colors = ['#ffcc00', '#ff6600', '#cc0000', '#4CAF50', '#FF9800'];
  
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = '-10px';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '1000';
      confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
      
      document.body.appendChild(confetti);
      
      // Remove confetti after animation
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti);
        }
      }, 5000);
    }, i * 100);
  }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
  @keyframes confettiFall {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(confettiStyle);

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  // Make sure elements are hidden initially
  flowerLoader.style.display = "none";
  resultContainer.style.display = "none";
  resultGif.style.display = "none";
  
  // Add some initial flower petals
  setInterval(createFlowerPetals, 2000);
});

// Add click sound effect for buttons (optional)
function playClickSound() {
  // You can add a sound file here if desired
  // const audio = new Audio('click.mp3');
  // audio.play();
}

// Add click sound to buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', playClickSound);
});