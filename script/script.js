// === OVERLAY SWIPE & CLICK ===
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
  if (Math.abs(touchEndY - touchStartY) > threshold) {
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
    console.log("Click sull'overlay");
    hideOverlay();
  }
});


// === DOMCONTENTLOADED INIT ===
document.addEventListener("DOMContentLoaded", function () {
  // Evidenzia menu attivo
  const activeMenu = document.querySelector('.home p');
  if (activeMenu) activeMenu.style.borderBottom = "1px solid #50593C";

  // Rimuove backlink se esiste
  const backlink = document.getElementById("backlink");
  if (backlink) backlink.remove();

  // Layover e musica
  const overlay = document.querySelector('.layover-container');
  const audio = document.getElementById('bg-music');

  function hideOverlayAndPlayMusic() {
    if (!overlay) return;

    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 500);

    audio.play().catch(() => {
      console.log("Autoplay bloccato, attendi interazione");
    });

    window.removeEventListener('click', playAudio);
    window.removeEventListener('scroll', playAudio);
    window.removeEventListener('touchstart', playAudio);
  }

  // Nasconde overlay dopo 2s e tenta autoplay
  setTimeout(hideOverlayAndPlayMusic, 2000);

  // Fallback se autoplay è bloccato
  function playAudio() {
    audio.play().catch(() => {
      console.log("Autoplay bloccato, attendi interazione");
    });

    window.removeEventListener('click', playAudio);
    window.removeEventListener('scroll', playAudio);
    window.removeEventListener('touchstart', playAudio);
  }

  window.addEventListener('click', playAudio);
  window.addEventListener('scroll', playAudio);
  window.addEventListener('touchstart', playAudio);
});


// === MUSIC AUTOPLAY (OUTSIDE DOMContentLoaded) ===
const audio = document.getElementById('bg-music');

function playAudio() {
  audio.play().catch(() => {
    console.log("Autoplay bloccato, attendi interazione");
  });

  window.removeEventListener('click', playAudio);
  window.removeEventListener('scroll', playAudio);
  window.removeEventListener('touchstart', playAudio);
}

audio.play().catch(() => {
  console.log("Autoplay bloccato, attendi interazione");
});

window.addEventListener('click', playAudio);
window.addEventListener('scroll', playAudio);
window.addEventListener('touchstart', playAudio);


// === COUNTDOWN ===
const targetDate = new Date(2025, 9, 11, 15, 30, 0); // Ottobre = 9

function updateCountdown() {
  const now = new Date();
  let timeLeft = targetDate - now;

  if (timeLeft <= 0) {
    document.getElementById("countdown").innerHTML = "È arrivato il momento!";
    return;
  }

  // Calcolo di base
  let seconds = Math.floor((timeLeft / 1000) % 60);
  let minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  let totalDays = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  // Approssimazione dei mesi (considerando media di 30.44 giorni per mese)
  let months = Math.floor(totalDays / 30.44);
  let days = Math.floor(totalDays - months * 30.44);

  // Mostra nel DOM
  document.getElementById("months").textContent = String(months).padStart(2, "0");
  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

/*
const targetDate = new Date(2025, 9, 11, 15, 30, 0); // Ottobre = 9

function updateCountdown() {
  const now = new Date();
  const timeLeft = targetDate - now;

  if (timeLeft <= 0) {
    document.getElementById("countdown").innerHTML = "È arrivato il momento!";
    return;
  }

  const seconds = Math.floor((timeLeft / 1000) % 60);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
*/


// === CLICK MENU ===
function goToPage(page) {
  var hamburgerMenu = document.querySelector('.menu-mobile');
  if(hamburgerMenu){
    hamburgerMenu.classList.remove('d-block');
    hamburgerMenu.classList.add('d-none');
  }

  const allPages = document.querySelectorAll('.page');
  allPages.forEach(p => {
    p.classList.remove('d-block');
    p.classList.add('d-none');
  });

  const pageToGo = document.getElementById(page);
  if (pageToGo) {
    pageToGo.classList.remove('d-none');
    pageToGo.classList.add('d-block');
  }

  const allMenuLinks = document.querySelectorAll("nav li p");
  allMenuLinks.forEach(link => link.style.borderBottom = "");

  const menuLink = document.querySelector(`.${page}`);
  if (menuLink) {
    setTimeout(() => {
      const menuLinkP = menuLink.querySelector('p');
      if (menuLinkP) menuLinkP.style.borderBottom = "1px solid #50593C";
    }, 50);
  }
}


// == HAMBURGER MENU == 
function openHamburgeMenu(){
  console.log('Open hamburger');
  var hamburgerMenu = document.querySelector('.menu-mobile');
  if(hamburgerMenu){
    hamburgerMenu.classList.remove('d-none');
    hamburgerMenu.classList.add('d-block');
  }
}
