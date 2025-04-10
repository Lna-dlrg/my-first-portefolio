if (window.location.pathname.includes("creations.html")) {
  const h1 = document.querySelector('h1');
  const text = h1.textContent;
  const words = text.split(' ');

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

    if (index < words.length - 1) {
      h1.append(' ');
    }
  });

  const slider = document.querySelector('.slider');
  slider.classList.add('hidden');

  let h1Disappeared = false;

  function showSlider() {
    const letterSpans = h1.querySelectorAll('.letter');
    const allDisappeared = Array.from(letterSpans).every(span =>
      parseFloat(getComputedStyle(span).opacity) < 0.1
    );

    if (allDisappeared && !h1Disappeared) {
      h1Disappeared = true;

      setTimeout(() => {
        slider.classList.remove('hidden');
        slider.classList.add('visible');
      }, 2);
    }
  }

  h1.addEventListener('mouseover', () => {
    const letterSpans = h1.querySelectorAll('.letter');
    letterSpans.forEach((span, index) => {
      span.style.transition = `opacity 1s ease ${index * 0.1}s`;
      span.style.opacity = '0';
    });

    const checkInterval = setInterval(() => {
      showSlider();
      if (h1Disappeared) {
        clearInterval(checkInterval);
      }
    }, 200);

    setTimeout(() => {
      clearInterval(checkInterval);
      if (!h1Disappeared) {
        showSlider();
      }
    }, 5000);
  });
}