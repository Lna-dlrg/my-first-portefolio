// Script pour page moi.html
if (window.location.pathname.includes("moi.html")) {
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
  
    // Préparer le paragraphe
    const pElement = document.querySelector('main p');
    const pText = pElement.textContent;
    pElement.textContent = '';
    pElement.classList.add('hidden');
  
    // Variable pour suivre si le h1 est déjà disparu
    let h1Disappeared = false;
  
    // Fonction pour faire apparaître le paragraphe
    function showParagraph() {
      // Vérifier que toutes les lettres ont disparu
      const letterSpans = h1.querySelectorAll('.letter');
      const allDisappeared = Array.from(letterSpans).every(span => 
        parseFloat(getComputedStyle(span).opacity) < 0.1);
      
      if (allDisappeared && !h1Disappeared) {
        h1Disappeared = true; // Éviter les déclenchements multiples
        
        // Afficher le paragraphe avec effet de machine à écrire
        setTimeout(() => {
          pElement.classList.remove('hidden');
          pElement.classList.add('visible');
          typeWriter(pElement, pText, 32);
        }, 2); // Petit délai après la disparition complète du h1
      }
    }
  
    // Fonction typeWriter pour l'effet de machine à écrire
    function typeWriter(element, text, speed = 5) {
      let index = 0;
      function type() {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
          setTimeout(type, speed);
        }
      }
      type();
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
        showParagraph();
        
        // Si le paragraphe est affiché, arrêter la vérification
        if (h1Disappeared) {
          clearInterval(checkInterval);
        }
      }, 200);
      
      // Sécurité: arrêter la vérification après 5 secondes quoi qu'il arrive
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!h1Disappeared) {
          showParagraph(); // Forcer l'affichage si pas encore fait
        }
      }, 5000);
    });
  }

