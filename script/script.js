// === OVERLAY SWIPE & CLICK ===
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
*/



// === DOMCONTENTLOADED INIT ===
document.addEventListener("DOMContentLoaded", function () {
  // Evidenzia menu attivo
  const activeMenus = document.querySelectorAll('.home');
  if (activeMenus){
    activeMenus.forEach(function(activeMenu){
      var p = activeMenu.querySelector('p');
      p.style.borderBottom = "1px solid #50593C";
    })
  } 

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
  setTimeout(hideOverlayAndPlayMusic, 1000);

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
const toggleMusicButton = document.getElementById('toggleMusicButton');
let isMusicPlaying = true; // Variabile per tenere traccia dello stato della musica

// Funzione per avviare la musica
function playAudio() {
  audio.play().catch(() => {
    console.log("Autoplay bloccato, attendi interazione");
  });

  // Rimuovi i listener per evitare di attivare la musica più volte
  window.removeEventListener('click', playAudio);
  window.removeEventListener('scroll', playAudio);
  window.removeEventListener('touchstart', playAudio);
}

// Gestisci l'evento di visibilità della pagina
function handleVisibilityChange() {
  if (document.hidden) {
    // La pagina non è visibile (l'utente ha cambiato tab o minimizzato la finestra)
    audio.pause();
    console.log("Musica messa in pausa, la tab non è visibile.");
  } else {
    // La pagina è visibile (l'utente è tornato alla tab)
    // Se vuoi, puoi far riprendere la musica:
    if (isMusicPlaying) {
      audio.play().catch(() => {
        console.log("Autoplay bloccato, attendi interazione");
      });
    }
  }
}

// Aggiungi i listener per l'evento di visibilità della pagina
document.addEventListener('visibilitychange', handleVisibilityChange);

// Avvia la musica al primo clic, scroll, o touch
audio.play().catch(() => {
  console.log("Autoplay bloccato, attendi interazione");
});

window.addEventListener('click', playAudio);
window.addEventListener('scroll', playAudio);
window.addEventListener('touchstart', playAudio);

// Funzione per bloccare o riprendere la musica tramite il bottone
function toggleMusic() {
  if (isMusicPlaying) {
    audio.pause();
    toggleMusicButton.innerHTML = `<i id="playIcon" class="fas fa-play"></i>`;
    isMusicPlaying = false;
    console.log("Musica messa in pausa.");
  } else {
    audio.play().catch(() => {
      console.log("Autoplay bloccato, attendi interazione");
    });
    toggleMusicButton.innerHTML = `<i id="pauseIcon" class="fas fa-pause"></i>`; // Cambia il testo del bottone
    isMusicPlaying = true;
    console.log("Musica ripresa.");
  }
}

// Aggiungi un event listener per il click sul bottone
toggleMusicButton.addEventListener('click', toggleMusic);

//-------------------------------------------------



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
  var body = document.querySelector('body');
  body.classList.remove('menu-open');
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

  const menuLinks = document.querySelectorAll('.'+page);
  if (menuLinks) {
    menuLinks.forEach(function(menuLink){
      var p = menuLink.querySelector('p');
      p.style.borderBottom = "1px solid #50593C";
    })
  }

  if(page == 'rsvp'){
    document.getElementById("nameInput").value = "";
    document.getElementById("rsvp_name").style.display = "block";
    document.getElementById("rsvp_its_you").classList.remove('d-block');
    document.getElementById("rsvp_its_you").classList.add('d-none');
    document.getElementById("rsvpForm").classList.remove('d-block');
    document.getElementById("rsvpForm").classList.add('d-none');
    document.getElementById("error").textContent = "";
    document.getElementById("messageOfConfirm").classList.remove('d-block');
    document.getElementById("messageOfConfirm").classList.add('d-none');
    document.getElementById("messaggioConferma").style.display = "none";
    document.getElementById("message_spinner").classList.add('d-block');

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
  var body = document.querySelector('body');
  body.classList.add('menu-open');
}




// == RSVP FORMSPREE == 
/*
document.getElementById('rsvpForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      form.style.display = "none";
      document.getElementById("nameInput").value = "";
      document.getElementById("rsvp_name").style.display = "none";
      document.getElementById("rsvp_its_you").classList.remove('d-block');
      document.getElementById("rsvp_its_you").classList.add('d-none');
      document.getElementById("rsvpForm").classList.remove('d-block');
      document.getElementById("rsvpForm").classList.add('d-none');
      document.getElementById("error").textContent = "";
      document.getElementById("messageOfConfirm").classList.remove('d-none');
      document.getElementById("messageOfConfirm").classList.add('d-block');
      setTimeout(function(){
        document.getElementById("message_spinner").classList.remove('d-block');
        document.getElementById("message_spinner").classList.add('d-none');
        document.getElementById("messaggioConferma").style.display = "block";
        setTimeout(function(){
          location.reload();
        },2000)
      },2000)
    } else {
      alert("Errore nell'invio. Riprova.");
    }
  }).catch(error => {
    alert("Errore di rete: " + error.message);
  });
});
*/


    // "Database" famiglie
    const families = {
      "utente prova": ["utente prova 1", "utente prova 2"],
      "jhon pier sagunos melchor": ["Jhon Pier Sagunos Melchor", "Gizelle Manalo Catigbac"],
      "gizelle manalo catigbac": ["Jhon Pier Sagunos Melchor", "Gizelle Manalo Catigbac"],
      "maria gina sagunos": ["Maria Gina Sagunos", "Lourdes Sagunos"],
      "lourdes sagunos": ["Maria Gina Sagunos", "Lourdes Sagunos"],
      "jonathan sagunos": ["Jonathan Sagunos", "Lucelyn Sagunos"],
      "lucelyn sagunos": ["Jonathan Sagunos", "Lucelyn Sagunos"],
      "camilla sagunos": ["Camilla Sagunos", "Sebastian Sagunos"],
      "sebastian sagunos": ["Camilla Sagunos", "Sebastian Sagunos"],
      "lourdelyn sagunos": ["Lourdelyn Sagunos", "Shanice Sagunos", "Herro Sagunos", "Zion Sagunos", "Nathan Sagunos"],
      "shanice sagunos": ["Lourdelyn Sagunos", "Shanice Sagunos", "Herro Sagunos", "Zion Sagunos", "Nathan Sagunos"],
      "herro sagunos": ["Lourdelyn Sagunos", "Shanice Sagunos", "Herro Sagunos", "Zion Sagunos", "Nathan Sagunos"],
      "zion sagunos": ["Lourdelyn Sagunos", "Shanice Sagunos", "Herro Sagunos", "Zion Sagunos", "Nathan Sagunos"],
      "nathan sagunos": ["Lourdelyn Sagunos", "Shanice Sagunos", "Herro Sagunos", "Zion Sagunos", "Nathan Sagunos"],
      "stanley sagunos": ["Stanley Sagunos"],
      "antonio catigbac": ["Antonio Catigbac", "Coleta Manalo", "Chelsea Catigbac"],
      "coleta manalo": ["Antonio Catigbac", "Coleta Manalo", "Chelsea Catigbac"],
      "chelsea catigbac": ["Antonio Catigbac", "Coleta Manalo", "Chelsea Catigbac"],
      "andrea giovannelli": ["Andrea Giovannelli", "Donatina Di Vietri"],
      "donatina di vietri": ["Andrea Giovannelli", "Donatina Di Vietri"],
      "lucio macatigbac": ["Lucio Macatigbac", "Amelia Macapanas", "Alexandrea Macatigbac", "Alexis Macatigbac"],
      "amelia macapanas": ["Lucio Macatigbac", "Amelia Macapanas", "Alexandrea Macatigbac", "Alexis Macatigbac"],
      "alexandrea macatigbac": ["Lucio Macatigbac", "Amelia Macapanas", "Alexandrea Macatigbac", "Alexis Macatigbac"],
      "alexis macatigbac": ["Lucio Macatigbac", "Amelia Macapanas", "Alexandrea Macatigbac", "Alexis Macatigbac"],
      "rosellie roldan": ["Rosellie Roldan", "Federico Mandola"],
      "federico mandola": ["Rosellie Roldan", "Federico Mandola"],
      "rosalie roldan": ["Rosalie Roldan", "Jeross Escauso", "Gianluca Escauso"],
      "jeross escauso": ["Rosalie Roldan", "Jeross Escauso", "Gianluca Escauso"],
      "gianluca escauso": ["Rosalie Roldan", "Jeross Escauso", "Gianluca Escauso"],
      "rowena roldan": ["Rowena Roldan", "Gian Luigi Zedde", "Channel Roldan"],
      "gian luigi zedde": ["Rowena Roldan", "Gian Luigi Zedde", "Channel Roldan"],
      "channel roldan": ["Rowena Roldan", "Gian Luigi Zedde", "Channel Roldan"],
      "rosemarie roldan": ["Rosemarie Roldan", "Giacomo Malasomma"],
      "giacomo malasomma": ["Rosemarie Roldan", "Giacomo Malasomma"],
      "shella olano": ["Shella Olano", "Michael Olano", "Shann Michael Olano"],
      "michael olano": ["Shella Olano", "Michael Olano", "Shann Michael Olano"],
      "shann michael olano": ["Shella Olano", "Michael Olano", "Shann Michael Olano"],
      "fe reyes": ["Fe Reyes", "Elpidio Palangue", "Cristian Palangue"],
      "elpidio palangue": ["Fe Reyes", "Elpidio Palangue", "Cristian Palangue"],
      "cristian palangue": ["Fe Reyes", "Elpidio Palangue", "Cristian Palangue"],
      "elizabeth dela cruz": ["Elizabeth Dela Cruz"],
      "george serrano": ["George Serrano", "Marife Serrano", "Julie Serrano"],
      "marife serrano": ["George Serrano", "Marife Serrano", "Julie Serrano"],
      "julie serrano": ["George Serrano", "Marife Serrano", "Julie Serrano"],
      "tony araja": ["Tony Araja", "Analy Araja", "Liezel Araja", "Lyka Araja"],
      "analy araja": ["Tony Araja", "Analy Araja", "Liezel Araja", "Lyka Araja"],
      "liezel araja": ["Tony Araja", "Analy Araja", "Liezel Araja", "Lyka Araja"],
      "lyka araja": ["Tony Araja", "Analy Araja", "Liezel Araja", "Lyka Araja"],
      "crisanto batu": ["Crisanto Batu", "Susan  Batu", "Erika Batu", "Maui Batu"],
      "susan  batu": ["Crisanto Batu", "Susan  Batu", "Erika Batu", "Maui Batu"],
      "erika batu": ["Crisanto Batu", "Susan  Batu", "Erika Batu", "Maui Batu"],
      "maui batu": ["Crisanto Batu", "Susan  Batu", "Erika Batu", "Maui Batu"],
      "leny chumacera": ["Leny Chumacera", "Mogie Chumacera", "Antonia Jamillano"],
      "mogie chumacera": ["Leny Chumacera", "Mogie Chumacera", "Antonia Jamillano"],
      "antonia jamillano": ["Leny Chumacera", "Mogie Chumacera", "Antonia Jamillano"],
      "jenny roldan": ["Jenny Roldan", "Boris Roldan", "Mishelle Idao", "Jassiel Roldan"],
      "boris roldan": ["Jenny Roldan", "Boris Roldan", "Mishelle Idao", "Jassiel Roldan"],
      "mishelle idao": ["Jenny Roldan", "Boris Roldan", "Mishelle Idao", "Jassiel Roldan"],
      "jassiel roldan": ["Jenny Roldan", "Boris Roldan", "Mishelle Idao", "Jassiel Roldan"],
      "noemi villanueva": ["Noemi Villanueva"],
      "gemma ocate": ["Gemma Ocate", "Ramon Amores", "Alessandro Amores", "Arianna Amores"],
      "ramon amores": ["Gemma Ocate", "Ramon Amores", "Alessandro Amores", "Arianna Amores"],
      "alessandro amores": ["Gemma Ocate", "Ramon Amores", "Alessandro Amores", "Arianna Amores"],
      "arianna amores": ["Gemma Ocate", "Ramon Amores", "Alessandro Amores", "Arianna Amores"],
      "nida dimaano": ["Nida Dimaano", "Patricio Dimaano"],
      "patricio dimaano": ["Nida Dimaano", "Patricio Dimaano"],
      "paulino garbin": ["Paulino Garbin", "Irma Garbin"],
      "irma garbin": ["Paulino Garbin", "Irma Garbin"],
      "isidra hernandez": ["Isidra Hernandez", "Dario Hernandez"],
      "dario hernandez": ["Isidra Hernandez", "Dario Hernandez"],
      "apollo garbin": ["Apollo Garbin", "Lima Garbin"],
      "lima garbin": ["Apollo Garbin", "Lima Garbin"],
      "apin garbin": ["Apin Garbin", "Betty Garbin"],
      "betty garbin": ["Apin Garbin", "Betty Garbin"],
      "facio garbin": ["Facio Garbin", "Janice Garbin"],
      "janice garbin": ["Facio Garbin", "Janice Garbin"],
      "lerma manalang": ["Lerma Manalang", "Dayo Manalang"],
      "dayo manalang": ["Lerma Manalang", "Dayo Manalang"],
      "rgie garbin": ["Rgie Garbin", "Gaudie Garbin"],
      "gaudie garbin": ["Rgie Garbin", "Gaudie Garbin"],
      "lina de leon": ["Lina De Leon", "Eddie De Leon"],
      "eddie de leon": ["Lina De Leon", "Eddie De Leon"],
      "mary garbin": ["Mary Garbin"],
      "jasmin de leon": ["Jasmin De Leon", "Samantha Silva", "Jarah De Leon"],
      "samantha silva": ["Jasmin De Leon", "Samantha Silva", "Jarah De Leon"],
      "jarah de leon": ["Jasmin De Leon", "Samantha Silva", "Jarah De Leon"],
      "joemar de leon": ["Joemar De Leon", "Jamesfiel De Leon"],
      "jamesfiel de leon": ["Jamesfiel De Leon", "Johnrick De Leon"],
      "johnrick de leon": ["Johnrick De Leon", "Careen De Leon", "Angelica De Leon"],
      "careen de leon": ["Johnrick De Leon", "Careen De Leon", "Angelica De Leon"],
      "angelica de leon": ["Johnrick De Leon", "Careen De Leon", "Angelica De Leon"],
      "jayson de leon": ["Jayson De Leon"],
      "sergio colasanti": ["Sergio Colasanti"],
      "giuseppina sabato": ["Giuseppina Sabato"],
      "mariachiara  gigante": ["Mariachiara  Gigante", "Domenico Gigante"],
      "domenico gigante": ["Mariachiara  Gigante", "Domenico Gigante"],
      "elisabetta nobile": ["Elisabetta Nobile", "Francesco Nobile"],
      "francesco nobile": ["Elisabetta Nobile", "Francesco Nobile"],
      "vincenzo piluso": ["Vincenzo Piluso"],
      "gianni siracusano": ["Gianni Siracusano", "Claudia Frangipane"],
      "claudia frangipane": ["Gianni Siracusano", "Claudia Frangipane"],
      "marcella frangipane": ["Marcella Frangipane"],
      "elena ressman": ["Elena Ressman"],
      "marcello ressman": ["Marcello Ressman"],
      "angela perroni": ["Angela Perroni", "Giorgio Caretti"],
      "giorgio caretti": ["Angela Perroni", "Giorgio Caretti"],
      "daniel sanchez alajo": ["Daniel Sanchez Alajo"],
      "maria eloisa arguelles": ["Maria Eloisa Arguelles", "Gabriel Prosperi"],
      "gabriel prosperi": ["Maria Eloisa Arguelles", "Gabriel Prosperi"],
      "marina mazzacane": ["Marina Mazzacane", "Matteo Sassone"],
      "matteo sassone": ["Marina Mazzacane", "Matteo Sassone"],
      "gian roibert cabellon": ["Gian Roibert Cabellon", "Christine Pilien", "Ariel Celine Cabellon"],
      "christine pilien": ["Gian Roibert Cabellon", "Christine Pilien", "Ariel Celine Cabellon"],
      "ariel celine cabellon": ["Gian Roibert Cabellon", "Christine Pilien", "Ariel Celine Cabellon"],
      "jerome maramot": ["Jerome Maramot", "Rachel Anne Patrocinio"],
      "rachel anne patrocinio": ["Jerome Maramot", "Rachel Anne Patrocinio"],
      "andrew leonor": ["Andrew Leonor", "Maricris Malabrigo", "Michael James Leonor"],
      "maricris malabrigo": ["Andrew Leonor", "Maricris Malabrigo", "Michael James Leonor"],
      "michael james leonor": ["Andrew Leonor", "Maricris Malabrigo", "Michael James Leonor"],
      "elton cariaga": ["Elton Cariaga", "Maria Fatima Santos"],
      "maria fatima santos": ["Elton Cariaga", "Maria Fatima Santos"],
      "luca westendorf": ["Luca Westendorf", "Maura Alberici", "Stefan Westendorf"],
      "maura alberici": ["Luca Westendorf", "Maura Alberici", "Stefan Westendorf"],
      "stefan westendorf": ["Luca Westendorf", "Maura Alberici", "Stefan Westendorf"],
      "davide mungiguerra": ["Davide Mungiguerra"],
      "jacopo cantalini": ["Jacopo Cantalini"],
      "luca messelesc": ["Luca Messelesc"],
      "benedetta venanzi": ["Benedetta Venanzi"],
      "luca santerini": ["Luca Santerini"],
      "nicoletta iacono": ["Nicoletta Iacono"],
      "claudia sgalippa": ["Claudia Sgalippa"],
      "gianluca arditi": ["Gianluca Arditi"],
      "giulia tasinato": ["Giulia Tasinato"],
      "john pierre arcano": ["John Pierre Arcano", "Hazelle Klein Axalan"],
      "hazelle klein axalan": ["John Pierre Arcano", "Hazelle Klein Axalan"],
      "karl anjelo reyes": ["Karl Anjelo Reyes", "Reichelle Mercado"],
      "reichelle mercado": ["Karl Anjelo Reyes", "Reichelle Mercado"],
      "ysabelle mercado": ["Ysabelle Mercado"],
      "marvin samiano": ["Marvin Samiano", "Vanessa Joy Palacio"],
      "vanessa joy palacio": ["Marvin Samiano", "Vanessa Joy Palacio"],
      "ralph glenn olinares": ["Ralph Glenn Olinares", "Cyril Ramos"],
      "cyril ramos": ["Ralph Glenn Olinares", "Cyril Ramos"],
      "john christopher duhina": ["John Christopher Duhina", "Kathleen Galut"],
      "kathleen galut": ["John Christopher Duhina", "Kathleen Galut"],
      "daryl renz lirio": ["Daryl Renz Lirio", "Giulietta Padan"],
      "giulietta padan": ["Daryl Renz Lirio", "Giulietta Padan"],
      "divino lirio": [
        "Divino Lirio",
        "Joy Lirio",
        "Ace Oliver Lirio",
        "Adriel Julian Lirio"
      ],
      "joy lirio": [
        "Divino Lirio",
        "Joy Lirio",
        "Ace Oliver Lirio",
        "Adriel Julian Lirio"
      ],
      "ace oliver lirio": [
        "Divino Lirio",
        "Joy Lirio",
        "Ace Oliver Lirio",
        "Adriel Julian Lirio"
      ],
      "adriel julian lirio": [
        "Divino Lirio",
        "Joy Lirio",
        "Ace Oliver Lirio",
        "Adriel Julian Lirio"
      ],
      "roland jun hernandez": ["Roland Jun Hernandez", "Chiara Tuvera", "Chris Jairus Hernandez"],
      "chiara tuvera": ["Roland Jun Hernandez", "Chiara Tuvera", "Chris Jairus Hernandez"],
      "chris jairus hernandez": ["Roland Jun Hernandez", "Chiara Tuvera", "Chris Jairus Hernandez"],
      "gianliton escueta": ["Gianliton Escueta"],
      "roberta caponigri": ["Roberta Caponigri"],
      "alfonso capaldo": ["Alfonso Capaldo"],
      "laura seraceno": ["Laura Seraceno"],
      "antonio baiano svizzero": ["Antonio Baiano Svizzero"],
      "federica piantadosi": ["Federica Piantadosi"],
      "maria pia ciocci": ["Maria Pia Ciocci"],
      "ilaria petti": ["Ilaria Petti"],
      "giulia kociuba": ["Giulia Kociuba"],
      "silvia di tomassi": ["Silvia Di Tomassi"],
      "mariarosaria russo": ["Mariarosaria Russo"],
      "romailyn sarmiento": ["Romailyn Sarmiento", "Jeffrey Sarmiento", "Evo Sarmiento", "Railey Sarmiento"],
      "jeffrey sarmiento": ["Romailyn Sarmiento", "Jeffrey Sarmiento", "Evo Sarmiento", "Railey Sarmiento"],
      "evo sarmiento": ["Romailyn Sarmiento", "Jeffrey Sarmiento", "Evo Sarmiento", "Railey Sarmiento"],
      "railey sarmiento": ["Romailyn Sarmiento", "Jeffrey Sarmiento", "Evo Sarmiento", "Railey Sarmiento"],
      "peachy tuazon": ["Peachy Tuazon", "Francisco Tuazon", "Francesca Tuazon"],
      "francisco tuazon": ["Peachy Tuazon", "Francisco Tuazon", "Francesca Tuazon"],
      "francesca tuazon": ["Peachy Tuazon", "Francisco Tuazon", "Francesca Tuazon"],
      "antonio manalo": ["Antonio Manalo", "Belen Manalo", "Francesco Manalo"],
      "belen manalo": ["Antonio Manalo", "Belen Manalo", "Francesco Manalo"],
      "francesco manalo": ["Antonio Manalo", "Belen Manalo", "Francesco Manalo"],
      "digno cajayon": ["Digno Cajayon", "Cristy Cajayon"],
      "cristy cajayon": ["Digno Cajayon", "Cristy Cajayon"],
      "salvatore carannante": ["Salvatore Carannante"],
      "enrico di lorenzo": ["Enrico Di Lorenzo"],
      "lucio sgarlata": ["Lucio Sgarlata"],
      "mattia bellisario": ["Mattia Bellisario"],
      "marco de rosa": ["Marco De Rosa", "Clara Capuano", "Marta De Rosa"],
      "clara capuano": ["Marco De Rosa", "Clara Capuano", "Marta De Rosa"],
      "marta de rosa": ["Marco De Rosa", "Clara Capuano", "Marta De Rosa"],
      "matteo barbarossa": ["Matteo Barbarossa"],
      "gavino bartolomeo": ["Gavino Bartolomeo", "Emanuela Di Vivona"],
      "emanuela di vivona": ["Gavino Bartolomeo", "Emanuela Di Vivona"],
      "michael gesmundo": ["Lina Gesmundo", "Ruben Gesmundo", "Michael Gesmundo"],
      "lina gesmundo": ["Lina Gesmundo", "Ruben Gesmundo", "Michael Gesmundo"],
      "ruben gesmundo": ["Lina Gesmundo", "Ruben Gesmundo", "Michael Gesmundo"],
      "josie manigbas": ["Josie Manigbas"],
      "janing manalo": ["Janing Manalo"],
      "forting manigbas": ["Forting Manigbas"],
      "belen manigbas": ["Belen Manigbas"]
    };
    /* ORIGINIAL
    function checkName() {
      const inputName = document.getElementById("nameInput").value.trim().toLowerCase();
      const members = families[inputName];

      if (members) {
        document.getElementById("rsvp_name").style.display = "none";
        document.getElementById("rsvp_its_you").classList.remove('d-none');
        document.getElementById("rsvp_its_you").classList.add('d-block');
        document.getElementById("familyName").textContent = inputName.toUpperCase();

        const familyMembers = document.getElementById("familyMembers");
        familyMembers.innerHTML = "";
        members.forEach(member => {
          const html = `
            <p>${member}</p>
          `;
          familyMembers.innerHTML += html;
        });
      } else {
        document.getElementById("error").textContent = "Non riusciamo a trovare il tuo nome.\nProva di nuovo!";
        document.getElementById("error").style.color = "#9A352A";
      }
    }
    */
    /* VERSIONE 2
    function levenshtein(a, b) {
      const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
        Array.from({ length: b.length + 1 }, (_, j) =>
          i === 0 ? j : j === 0 ? i : 0
        )
      );
  
      for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
          matrix[i][j] = a[i - 1] === b[j - 1]
            ? matrix[i - 1][j - 1]
            : Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + 1
              );
        }
      }
  
      return matrix[a.length][b.length];
    }
  
    function findClosestName(input, names) {
      const threshold = 3; // massimo numero di errori ammessi
      let closest = null;
      let minDistance = Infinity;
  
      for (const name of names) {
        const distance = levenshtein(input, name);
        if (distance < minDistance && distance <= threshold) {
          minDistance = distance;
          closest = name;
        }
      }
  
      return closest;
    }
  
    function checkName() {
      const inputName = document.getElementById("nameInput").value.trim().toLowerCase();
      const keys = Object.keys(families);
  
      const matchedName = families[inputName]
        ? inputName
        : findClosestName(inputName, keys);
  
      if (matchedName) {
        const members = families[matchedName];
  
        document.getElementById("rsvp_name").style.display = "none";
        document.getElementById("rsvp_its_you").classList.remove('d-none');
        document.getElementById("rsvp_its_you").classList.add('d-block');
        document.getElementById("familyName").textContent = matchedName.toUpperCase();
  
        const familyMembers = document.getElementById("familyMembers");
        familyMembers.innerHTML = "";
        members.forEach(member => {
          familyMembers.innerHTML += `<p>${member}</p>`;
        });
  
        document.getElementById("error").textContent = "";
      } else {
        document.getElementById("error").textContent = "Non riusciamo a trovare il tuo nome.\nProva di nuovo!";
        document.getElementById("error").style.color = "#9A352A";
      }
    }
      */

    /*VERSIONE 3*/ 

  function normalizeName(name) {
    return name.trim().toLowerCase().replace(/[^a-zA-Z\s]/g, "").replace(/\s+/g, " ");
  }

  function levenshtein(a, b) {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
      Array.from({ length: b.length + 1 }, (_, j) =>
        i === 0 ? j : j === 0 ? i : 0
      )
    );

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        matrix[i][j] = a[i - 1] === b[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(
              matrix[i - 1][j] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j - 1] + 1
            );
      }
    }

    return matrix[a.length][b.length];
  }

  function findClosestName(input, names) {
    const threshold = 5; // più alto = più tollerante
    let closest = null;
    let minDistance = Infinity;

    for (const name of names) {
      const distance = levenshtein(input, name);
      if (distance < minDistance && distance <= threshold) {
        minDistance = distance;
        closest = name;
      }
    }

    return closest;
  }
  /* OGGI
  function checkName() {
    const inputRaw = document.getElementById("nameInput").value;
    const inputName = normalizeName(inputRaw);
    const normalizedKeys = Object.keys(families).map(normalizeName);

    const matchedName = families[inputName]
      ? inputName
      : findClosestName(inputName, normalizedKeys);

    const originalKey = Object.keys(families).find(
      key => normalizeName(key) === matchedName
    );

    if (originalKey) {
      const members = families[originalKey];

      document.getElementById("rsvp_name").style.display = "none";
      document.getElementById("rsvp_its_you").classList.remove('d-none');
      document.getElementById("rsvp_its_you").classList.add('d-block');
      document.getElementById("familyName").textContent = originalKey.toUpperCase();

      const familyMembers = document.getElementById("familyMembers");
      familyMembers.innerHTML = "";
      members.forEach(member => {
        familyMembers.innerHTML += `<p>${member}</p>`;
      });

      document.getElementById("error").textContent = "";
    } else {
      document.getElementById("error").textContent = "Non riusciamo a trovare il tuo nome.\nProva di nuovo!";
      document.getElementById("error").style.color = "#9A352A";
    }
  }
    */

  let matchedFamilyKey = null; // <--- aggiungi questa variabile globale in alto

function checkName() {
  const inputRaw = document.getElementById("nameInput").value;
  const inputName = normalizeName(inputRaw);
  const normalizedKeys = Object.keys(families).map(normalizeName);

  const matchedName = families[inputName]
    ? inputName
    : findClosestName(inputName, normalizedKeys);

  const originalKey = Object.keys(families).find(
    key => normalizeName(key) === matchedName
  );

  matchedFamilyKey = originalKey; // <--- salva qui il riferimento corretto

  if (originalKey) {
    const members = families[originalKey];

    document.getElementById("rsvp_name").style.display = "none";
    document.getElementById("rsvp_its_you").classList.remove('d-none');
    document.getElementById("rsvp_its_you").classList.add('d-block');
    document.getElementById("familyName").textContent = originalKey.toUpperCase();

    const familyMembers = document.getElementById("familyMembers");
    familyMembers.innerHTML = "";
    members.forEach(member => {
      familyMembers.innerHTML += `<p>${member}</p>`;
    });

    document.getElementById("error").textContent = "";
  } else {
    document.getElementById("error").textContent = "Non riusciamo a trovare il tuo nome.\nProva di nuovo!";
    document.getElementById("error").style.color = "#9A352A";
  }
}




/* IS IT YOU FORMSPREE */ 
/*
function isItYou(yesOrNo){
  if(yesOrNo == 'yes'){
    document.getElementById("rsvp_its_you").classList.remove('d-block');
    document.getElementById("rsvp_its_you").classList.add('d-none');
    document.getElementById("rsvpForm").classList.remove('d-none');
    document.getElementById("rsvpForm").classList.add('d-block');

    const container = document.getElementById("membersContainer");
    container.innerHTML = "";
    const inputName = document.getElementById("nameInput").value.trim().toLowerCase();
    const members = families[inputName];
    members.forEach(member => {
        const html = `
          <fieldset>
            <legend class="color-dark-pink alex-brush-regular font-3">${member}</legend>
            <input type="hidden" name="members[]" value="${member}">

             <label class="mt-3 w-100">
              <div class="d-flex justify-content-between">
                <p class="font-2"><strong>Cerimonia in Chiesa</strong></p>  
                <select class="select_response color-green" name="cerimonia[${member}]" required>
                  <option value="Sì">Sì</option>
                  <option value="No">No</option>
                </select>
              </div>

              <p class="font-14">📍 Chiesa di Sant'Anselmo all'Aventino</p>
              <p>🕒 15:00 </p>
            </label>

            <label class="mt-3">
              <div class="d-flex justify-content-between">
                <p class="font-2"><strong>Ricevimento in Location</strong></p>  
                <select class="select_response color-green" name="ricevimento[${member}]" required>
                  <option value="Sì">Sì</option>
                  <option value="No">No</option>
                </select>
              </div>

              <p class="font-14">📍Magnolia Resort</p>
              <p>🕔 17:30 </p>
          
              <div class="mt-4">
                <p class="font-14">Quali sono le tue preferenze alimentari (allergie, intolleranze, dieta specifica)?</p>
                <textarea class="textarea_rsvp lora" name="preferenze_alimentari[${member}]"></textarea>
              </div>
            </label>
          </fieldset><br>
        `;
        container.innerHTML += html;
    });
  } else {
    document.getElementById("rsvp_its_you").classList.remove('d-block');
    document.getElementById("rsvp_its_you").classList.add('d-none');
    document.getElementById("rsvp_name").style.display = "block";
  }
}
*/

/* IS IT YOU FORMSUBMIT*/ 
/*  OGGI
function isItYou(yesOrNo){
  if(yesOrNo == 'yes'){
    document.getElementById("rsvp_its_you").classList.remove('d-block');
    document.getElementById("rsvp_its_you").classList.add('d-none');
    document.getElementById("rsvpForm").classList.remove('d-none');
    document.getElementById("rsvpForm").classList.add('d-block');

    const container = document.getElementById("membersContainer");
    container.innerHTML = "";
    const inputName = document.getElementById("nameInput").value.trim().toLowerCase();
    const members = families[inputName];
    members.forEach(member => {
        const html = `
        <fieldset>
          <legend class="color-dark-pink alex-brush-regular font-3">${member}</legend>

          <!-- Nome membro visibile e come hidden -->
          <input type="hidden" name="members[]" value="${member}">

          <!-- Cerimonia -->
          <label class="mt-3 w-100">
            <div class="d-flex justify-content-between">
              <p class="font-2"><strong>Cerimonia in Chiesa</strong></p>  
              <select class="select_response color-green" name="CERIMONIA:_${member}" required>
                <option value="Sì">Sì</option>
                <option value="No">No</option>
              </select>
            </div>
            <p class="font-14">📍 Chiesa di Sant'Anselmo all'Aventino</p>
            <p>🕒 15:00 </p>
          </label>

          <!-- Ricevimento -->
          <label class="mt-3">
            <div class="d-flex justify-content-between">
              <p class="font-2"><strong>Ricevimento in Location</strong></p>  
              <select class="select_response color-green" name="RICEVIMENTO:_${member}" required>
                <option value="Sì">Sì</option>
                <option value="No">No</option>
              </select>
            </div>
            <p class="font-14">📍 Magnolia Resort</p>
            <p>🕔 17:30 </p>

            <!-- Preferenze alimentari -->
            <div class="mt-4">
              <p class="font-14">Quali sono le tue preferenze alimentari (allergie, intolleranze, dieta specifica)?</p>
              <textarea class="textarea_rsvp lora" name="PREFERENZE_ALIMENTARI:_${member}"></textarea>
            </div>
          </label>
        </fieldset><br>
        `;
        container.innerHTML += html;
    });
  } else {
    document.getElementById("nameInput").value = "";
    document.getElementById("rsvp_its_you").classList.remove('d-block');
    document.getElementById("rsvp_its_you").classList.add('d-none');
    document.getElementById("rsvp_name").style.display = "block";
  }
}
  */

function isItYou(yesOrNo){
  if(yesOrNo === 'yes'){
    document.getElementById("rsvp_its_you").classList.remove('d-block');
    document.getElementById("rsvp_its_you").classList.add('d-none');
    document.getElementById("rsvpForm").classList.remove('d-none');
    document.getElementById("rsvpForm").classList.add('d-block');

    const container = document.getElementById("membersContainer");
    container.innerHTML = "";

    if (!matchedFamilyKey || !families[matchedFamilyKey]) {
      container.innerHTML = "<p>Errore: famiglia non trovata.</p>";
      return;
    }

    const members = families[matchedFamilyKey];
    members.forEach(member => {
      if(member.toLowerCase() == 'sergio colasanti' || 
        member.toLowerCase() == 'luca westendorf' ||
        member.toLowerCase() == 'davide mungiguerra' ||
        member.toLowerCase() == 'jacopo cantalini' ||
        member.toLowerCase() == 'luca messelesc' ||
        member.toLowerCase() == 'gianluca arditi' ||
        member.toLowerCase() == 'roberta caponigri' ||
        member.toLowerCase() == 'alfonso capaldo' ||
        member.toLowerCase() == 'laura seraceno' ||
        member.toLowerCase() == 'antonio baiano svizzero' ||
        member.toLowerCase() == 'federica piantadosi' ||
        member.toLowerCase() == 'maria pia ciocci' ||
        member.toLowerCase() == 'ilaria petti' ||
        member.toLowerCase() == 'giulia kociuba' ||
        member.toLowerCase() == 'silvia di tomassi' ||
        member.toLowerCase() == 'mariarosaria russo' ||
        member.toLowerCase() == 'salvatore carannante' ||
        member.toLowerCase() == 'enrico di lorenzo' ||
        member.toLowerCase() == 'lucio sgarlata' ||
        member.toLowerCase() == 'mattia bellisario' ||
        member.toLowerCase() == 'matteo barbarossa' ||
        member.toLowerCase() == 'michael gesmundo'){
          const html = `
          <fieldset>
            <legend class="color-dark-pink alex-brush-regular font-3">${member}</legend>
            <input type="hidden" name="members[]" value="${member}">
  
            <label class="mt-3 w-100">
              <div class="d-flex justify-content-between">
                <p class="font-2"><strong>Cerimonia in Chiesa</strong></p>  
                <select class="select_response color-green" name="CERIMONIA:_${member}" required>
                  <option value="Sì">Sì</option>
                  <option value="No">No</option>
                </select>
              </div>
              <p class="font-14">📍 Chiesa di Sant'Anselmo all'Aventino</p>
              <p>🕒 15:00 </p>
            </label>
  
            <label class="mt-3">
              <div class="d-flex justify-content-between">
                <p class="font-2"><strong>Ricevimento in Location</strong></p>  
                <select class="select_response color-green" name="RICEVIMENTO:_${member}" required>
                  <option value="Sì">Sì</option>
                  <option value="No">No</option>
                </select>
              </div>
              <p class="font-14">📍 Magnolia Resort</p>
              <p>🕔 17:30 </p>
  
              <div class="mt-4">
                <p class="font-14 lora">Quali sono le tue preferenze alimentari? Specifica qui sotto nella box</p>
                <textarea class="textarea_rsvp lora font-14" name="PREFERENZE_ALIMENTARI:_${member}" placeholder="Allergie, intolleranze, preferenze alimentari ecc..."></textarea>
              </div>

              <div class="mt-4">
                <p class="font-14 lora">Ti farebbe piacere venire con un accompagnatore? Se sì, indicaci il nome e segnalaci eventuali intolleranze, allergie o esigenze alimentari </p>
                <p class="font-14 lora mt-3">Nome e cognome</p>
                <input type="text" class="lora font-14 extra_name" name="PERSONA_EXTRA:_${member}">

                <p class="font-14 mt-3">Preferenze alimentari</p>
                <textarea class="textarea_rsvp lora font-14" name="PREFERENZE_ALIMENTARI_PERSONA_EXTRA:_${member}" placeholder="Allergie, intolleranze, preferenze alimentari ecc..."></textarea>
              </div>
            </label>
          </fieldset><br>
        `;
        container.innerHTML += html;

        } else {
          const html = `
          <fieldset>
            <legend class="color-dark-pink alex-brush-regular font-3">${member}</legend>
            <input type="hidden" name="members[]" value="${member}">
  
            <label class="mt-3 w-100">
              <div class="d-flex justify-content-between">
                <p class="font-2"><strong>Cerimonia in Chiesa</strong></p>  
                <select class="select_response color-green" name="CERIMONIA:_${member}" required>
                  <option value="Sì">Sì</option>
                  <option value="No">No</option>
                </select>
              </div>
              <p class="font-14">📍 Chiesa di Sant'Anselmo all'Aventino</p>
              <p>🕒 15:00 </p>
            </label>
  
            <label class="mt-3">
              <div class="d-flex justify-content-between">
                <p class="font-2"><strong>Ricevimento in Location</strong></p>  
                <select class="select_response color-green" name="RICEVIMENTO:_${member}" required>
                  <option value="Sì">Sì</option>
                  <option value="No">No</option>
                </select>
              </div>
              <p class="font-14">📍 Magnolia Resort</p>
              <p>🕔 17:30 </p>
  
              <div class="mt-4">
                <p class="font-14 lora">Quali sono le tue preferenze alimentari? Specifica qui sotto nella box</p>
                <textarea class="textarea_rsvp lora font-14" name="PREFERENZE_ALIMENTARI:_${member}" placeholder="Allergie, intolleranze, preferenze alimentari ecc..."></textarea>
              </div>
            </label>
          </fieldset><br>
        `;
        container.innerHTML += html;
        }

    });
  } else {
    document.getElementById("nameInput").value = "";
    document.getElementById("rsvp_its_you").classList.remove('d-block');
    document.getElementById("rsvp_its_you").classList.add('d-none');
    document.getElementById("rsvp_name").style.display = "block";
  }
}


function copyIBAN() {
  const ibanText = document.getElementById("iban").innerText;
  navigator.clipboard.writeText(ibanText).then(() => {
    const msg = document.getElementById("copiedMessage");
    msg.style.display = "inline";
    setTimeout(() => msg.style.display = "none", 2000); // Nasconde dopo 2 secondi
  }).catch(err => {
    console.error("Errore nella copia dell'IBAN: ", err);
  });
}

  document.addEventListener("DOMContentLoaded", function () {
    var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    for (var i = 0; i < tooltipTriggerList.length; i++) {
      new bootstrap.Tooltip(tooltipTriggerList[i]);
    }
  });

  function copyNames(button) {
    var namesElement = document.getElementById("names");
    var namesText = namesElement.innerText;

    navigator.clipboard.writeText(namesText).then(function () {
      var tooltip = bootstrap.Tooltip.getInstance(button);

      // Cambia il contenuto del tooltip in "Copiato!"
      tooltip.setContent({ '.tooltip-inner': 'Copiato!' });
      tooltip.show();

      // Torna al testo originale dopo 2 secondi
      setTimeout(function () {
        tooltip.setContent({ '.tooltip-inner': 'Copia Nomi' });
      }, 2000);
    }).catch(function (err) {
      console.error("Errore durante la copia dei nomi:", err);
    });
  }

  function copyText(elementId, button) {
    var text = document.getElementById(elementId).innerText;

    navigator.clipboard.writeText(text).then(function () {
      var tooltip = bootstrap.Tooltip.getInstance(button);
      tooltip.setContent({ '.tooltip-inner': 'Copiato!' });
      tooltip.show();

      // Ripristina tooltip dopo 2 secondi
      setTimeout(function () {
        tooltip.setContent({ '.tooltip-inner': button.title });
      }, 2000);
    }).catch(function (err) {
      console.error("Errore nella copia: ", err);
    });
  }



