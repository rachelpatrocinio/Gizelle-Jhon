let touchStartY = 0;
let touchEndY = 0;
const threshold = 50; // distanza minima per considerare swipe

function handleGesture() {
  if (touchEndY < touchStartY - threshold) {
    console.log('Swipe verso l\'alto');
    // Azione swipe up
  }
  if (touchEndY > touchStartY + threshold) {
    console.log('Swipe verso il basso');
    // Azione swipe down
  }
}

document.addEventListener('touchstart', e => {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
  touchEndY = e.changedTouches[0].screenY;
  handleGesture();
});
