if (window.location.pathname.includes("contact.html")) {
  const h1 = document.querySelector('h1');
  const text = h1.textContent;
  const words = text.split(' ');
  const cards = document.querySelectorAll('.card');
  const iconsButton = document.querySelector('.iconsbutton');

  h1.innerHTML = '';

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
    if (index < words.length - 1) h1.append(' ');
  });

  let h1Disappeared = false;

  function showCards() {
    const letterSpans = h1.querySelectorAll('.letter');
    const allGone = Array.from(letterSpans).every(span =>
      parseFloat(getComputedStyle(span).opacity) < 0.1
    );

    if (allGone && !h1Disappeared) {
      h1Disappeared = true;
      cards.forEach(card => {
        card.classList.remove('hidden');
        card.classList.add('visible');
      });
      setTimeout(() => {
        iconsButton.classList.remove('hidden');
        iconsButton.classList.add('visible');
      }, 300);
    }
  }

  h1.addEventListener('mouseover', () => {
    const letterSpans = h1.querySelectorAll('.letter');
    
    letterSpans.forEach((span, index) => {
      span.style.opacity = '0';
      span.style.transition = `opacity 1s ease ${index * 0.1}s`;
    });

    const totalDelay = (letterSpans.length - 1) * 100 + 1000;

    setTimeout(() => {
      showCards();
    }, totalDelay);
  });
}