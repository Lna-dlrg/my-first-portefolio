// script.js

// Gérer l'affichage/masquage de la barre latérale
const menuToggle = document.getElementById('menuToggle'); // Le bouton de menu
const sidebar = document.getElementById('sidebar');      // La barre latérale

// Ajouter un écouteur d'événements pour le bouton de menu
menuToggle.addEventListener('click', () => {
    
    if (sidebar.style.left === '-250px') { // Si la barre latérale est masquée, l'afficher
        sidebar.style.left = '0'; // Affiche la barre latérale
    } 
    else {sidebar.style.left = '-250px'; // Cache la barre latérale
    }
});


// Gérer le changement de mode sombre/clair
const toggleButton = document.getElementById('modeToggle');
const body = document.body;

// Fonction pour appliquer le mode selon le choix sauvegardé
function applyTheme() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  if (isDarkMode) {
    body.classList.add('dark-mode');
    toggleButton.textContent = '☀️ Mode clair';
  } else {
    body.classList.remove('dark-mode');
    toggleButton.textContent = '🌚 Mode nuit';
  }
}

// Applique le thème au chargement de la page
applyTheme();

// Gère le changement de mode et enregistre la préférence
toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  // Enregistre la préférence dans localStorage
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'true');
    toggleButton.textContent = '☀️ Mode clair';
  } else {
    localStorage.setItem('darkMode', 'false');
    toggleButton.textContent = '🌚 Mode nuit';
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const h1 = document.querySelector('h1');
  const text = h1.textContent;
  const words = text.split(' ');

  h1.innerHTML = '';

  words.forEach((word, index) => {
    const wordSpan = document.createElement('span');
  word.split('').forEach((letter) => {
      const letterSpan = document.createElement('span');
      letterSpan.textContent = letter;
      letterSpan.classList.add('letter');
      wordSpan.appendChild(letterSpan);
    });
  h1.appendChild(wordSpan);
      if (index < words.length - 1) {
      h1.appendChild(document.createTextNode(' '));
    }
  });

const spans = h1.querySelectorAll('.letter');
  spans .forEach((span) => {
    let isMoved = false;

    span.addEventListener('mouseover', () => {
      if (!isMoved) {
        const randomX = Math.random() * 50 - 25 + 'vw';
        const randomY = Math.random() * 50 - 25 + 'vh';
        span.style.transition = 'transform 1s ease, opacity 1s ease';
        span.style.transform = `translate(${randomX}, ${randomY})`;
         isMoved = true;
      }
      else { 
        span.style.transform = 'translate(0, 0)';       // Revenir à la position initiale
        span.style.opacity = '1';
          isMoved = false;
      }
    });
  });
});