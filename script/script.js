/*
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
*/

document.addEventListener("DOMContentLoaded", function () {
  // Rimuove backlink se esiste
  var element = document.getElementById("backlink");
  if (element) {
    element.remove();
  }

  // Riferimento agli elementi
  const overlay = document.querySelector('.layover-container');
  const audio = document.getElementById('bg-music');

  // Funzione per nascondere layover e far partire musica
  function hideOverlayAndPlayMusic() {
    if (!overlay) return;

    overlay.style.opacity = '0';

    setTimeout(() => {
      overlay.style.display = 'none';
    }, 500);

    // Prova ad avviare la musica
    audio.play().catch(() => {
      console.log("Autoplay bloccato, attendi interazione");
    });

    // Rimuove i fallback listener
    window.removeEventListener('click', playAudio);
    window.removeEventListener('scroll', playAudio);
    window.removeEventListener('touchstart', playAudio);
  }

  // Dopo 2 secondi: nasconde il layover e prova ad avviare la musica
  setTimeout(hideOverlayAndPlayMusic, 2000);

  // Fallback: se autoplay è bloccato, avvia su interazione
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




// MUSIC
const audio = document.getElementById('bg-music');

function playAudio() {
  audio.play().catch(() => {
    console.log("Autoplay bloccato, attendi interazione");
  });

  // Rimuovo i listener dopo il primo play
  window.removeEventListener('click', playAudio);
  window.removeEventListener('scroll', playAudio);
  window.removeEventListener('touchstart', playAudio);
}

// Provo a far partire subito la musica (molto probabilmente bloccata)
audio.play().catch(() => {
  console.log("Autoplay bloccato, attendi interazione");
});

// Se bloccata, attendo click, scroll o swipe
window.addEventListener('click', playAudio);
window.addEventListener('scroll', playAudio);
window.addEventListener('touchstart', playAudio);







document.addEventListener("DOMContentLoaded", function () {
    var element = document.getElementById("backlink");
    if (element) {
      element.remove();
    }
  });


  // COUNTDOWN
    // Imposta la data di destinazione: 11 Ottobre 2025, ore 16:30
    const targetDate = new Date(2025, 9, 11, 15, 30, 0); // Ottobre = mese 9

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
  
    updateCountdown(); // Aggiorna subito
    setInterval(updateCountdown, 1000); // Poi ogni secondo


    // CLICK MENU 
    goToPage = function(page){
      console.log(page);

      var allPages = document.querySelectorAll('.page');
      console.log(allPages);
      allPages.forEach(function(singlePage){
        singlePage.classList.remove('d-block');
        singlePage.classList.add('d-none');
      })

      var pageToGo = document.getElementById(page);
      pageToGo.classList.remove('d-none');
      pageToGo.classList.add('d-block');      

      var menuLink = document.querySelector('.'+page);
      console.log(menuLink);
      var menuLinkP = menuLink.querySelector(p);
      p.style.borderBottom = "1px solid #50593C";
    }