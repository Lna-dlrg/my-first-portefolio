// Script pour page contact.html 
if (window.location.pathname.includes("contact.html")) {
  const h1 = document.querySelector('h1');
  const text = h1.textContent;
  const words = text.split(' ');

  h1.innerHTML = ''; // Vider l'élément h1 avant de le remplir

  words.forEach((word, index) => {
    const wordSpan = document.createElement('span');
    wordSpan.classList.add('word');
    
    word.split('').forEach((letter) => {
      const letterSpan = document.createElement('span');
      letterSpan.textContent = letter;
      letterSpan.classList.add('letter');
      wordSpan.appendChild(letterSpan);
    });
    
    h1.appendChild(wordSpan);
  
    // Ajoute un espace sauf après le dernier mot
    if (index < words.length - 1) {
      h1.append(' ');
    }
  });

  // Préparer les articles
  const articlesElements = document.querySelectorAll('article');
  articlesElements.forEach(article => {
    article.classList.add('hidden');
  });

  // Variable pour suivre si le h1 est déjà disparu
  let h1Disappeared = false;

  // Fonction pour faire apparaître les articles
  function showArticles() {
    // Vérifier que toutes les lettres ont disparu
    const letterSpans = h1.querySelectorAll('.letter');
    const allDisappeared = Array.from(letterSpans).every(span => 
      parseFloat(getComputedStyle(span).opacity) < 0.1);
    
    if (allDisappeared && !h1Disappeared) {
      h1Disappeared = true; // Éviter les déclenchements multiples
      
      // Afficher les articles un par un
      articlesElements.forEach((article, index) => {
        setTimeout(() => {
          article.classList.remove('hidden');
          article.classList.add('visible')
        }, 300 * index); // Délai progressif pour chaque article
      });
    }
  }

  // Ajouter l'événement hover pour déclencher la disparition des lettres
  h1.addEventListener('mouseover', (e) => {
    const letterSpans = h1.querySelectorAll('.letter');
    letterSpans.forEach((span, index) => {
      span.style.opacity = '0';
      span.style.transition = `opacity 1s ease ${index * 0.1}s`;
    });
    
    // Vérifier régulièrement si toutes les lettres ont disparu
    const checkInterval = setInterval(() => {
      showArticles();
      
      // Si les articles sont affichés, arrêter la vérification
      if (h1Disappeared) {
        clearInterval(checkInterval);
      }
    }, 200);
    
    // Sécurité: arrêter la vérification après 5 secondes quoi qu'il arrive
    setTimeout(() => {
      clearInterval(checkInterval);
      if (!h1Disappeared) {
        showArticles(); // Forcer l'affichage si pas encore fait
      }
    }, 5000);
  });
}

// Animation de rotation des articles
const articles = document.querySelectorAll('article');

articles.forEach(article => {
function handleMove(e) {
  const { x, y, width, height } = article.getBoundingClientRect();
  const cx = x + width / 2;
  const cy = y + height / 2;

  const { pageX, pageY } = e;

  const dx = (cx - pageX) / (width / 2);
  const dy = (cy - pageY) / (height / 2);

  article.style.transform = `rotateX(${20 * dy * -1}deg) rotateY(${20 * dx}deg)`;
}

function handleOut() {
  article.style.transform = 'initial';
}

article.addEventListener('mousemove', handleMove);
article.addEventListener('mouseout', handleOut);
});











  