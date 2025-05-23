let touchStartY = 0;
let touchEndY = 0;
const threshold = 50; // distanza minima per considerare swipe

function handleGesture() {
  const overlay = document.querySelector('.layover-container');
  if (!overlay) return;

  if (touchEndY < touchStartY - threshold) {
    console.log('Swipe verso l\'alto');
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 500);
  }
  if (touchEndY > touchStartY + threshold) {
    console.log('Swipe verso il basso');
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 500);
  }
}

document.addEventListener('touchstart', e => {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
  touchEndY = e.changedTouches[0].screenY;
  handleGesture();
});
