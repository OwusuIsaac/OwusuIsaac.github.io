const audio = document.getElementById('basketball-audio');
const button = document.querySelector('.play-button');
const basketball = document.getElementById('basketball');
const court = document.querySelector('.court');

let isPlaying = false;
let isBouncing = false;

// Toggle audio play/pause
function toggleAudio(e) {
  e.stopPropagation(); // Prevent triggering court click
  if (isPlaying) {
    audio.pause();
    button.innerHTML = '▶';
  } else {
    audio.play();
    button.innerHTML = '⏸';
  }
  isPlaying = !isPlaying;
}

// Handle clicking anywhere on the court
function handleCourtClick(e) {
  const rect = court.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  // If clicked in the top-left (backboard/rim area), trigger shoot
  if (clickX < rect.width * 0.25 && clickY < rect.height * 0.25) {
    shootSequence(clickX, clickY);
  } else {
    // Otherwise toggle bouncing animation
    toggleBounce();
  }
}

// Toggle bouncing animation
function toggleBounce() {
  isBouncing = !isBouncing;
  if (isBouncing) {
    basketball.classList.add('bouncing');
  } else {
    basketball.classList.remove('bouncing');
  }
}

// Sequence that moves the ball toward the rim and resets
function shootSequence(targetX, targetY) {
  basketball.classList.remove('bouncing');

  // Move to the top-left area (target coordinates)
  basketball.style.transition = 'transform 2s ease-in-out';
  const moveX = targetX - (court.clientWidth - 60);
  const moveY = targetY - (court.clientHeight - 60);
  basketball.style.transform = `translate(${moveX}px, ${moveY}px)`;

  // Then drop down
  setTimeout(() => {
    basketball.style.transition = 'transform 1s ease-in-out';
    basketball.style.transform = `translate(${moveX}px, 0px)`;
  }, 2000);

  // Then reset back to original position
  setTimeout(() => {
    basketball.style.transition = 'transform 1.5s ease-in-out';
    basketball.style.transform = 'translate(0, 0)';
  }, 3000);

  isBouncing = false;
}

// Reset play button when audio ends
audio.addEventListener('ended', () => {
  isPlaying = false;
  button.innerHTML = '▶';
});
