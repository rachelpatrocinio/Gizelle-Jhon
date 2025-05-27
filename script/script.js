let touchStartY = 0;
let touchEndY = 0;
const threshold = 50; // distanza minima per considerare swipe

function hideOverlay() {
  const overlay = document.querySelector('.layover-container');
  if (!overlay) return;

  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 500);
}

function handleGesture() {
  if (touchEndY < touchStartY - threshold || touchEndY > touchStartY + threshold) {
    console.log('Swipe rilevato');
    hideOverlay();
  }
}

document.addEventListener('touchstart', e => {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
  touchEndY = e.changedTouches[0].screenY;
  handleGesture();
});

document.addEventListener('click', e => {
  const overlay = document.querySelector('.layover-container');
  if (!overlay) return;

  if (overlay.contains(e.target)) {
    console.log('Click sull\'overlay');
    hideOverlay();
  }
});
