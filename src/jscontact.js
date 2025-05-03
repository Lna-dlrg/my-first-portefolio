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




















if (window.location.pathname.includes("contact.html")) {

  const canvas = document.getElementById("contactCanvas");
  const ctx = canvas.getContext("2d");

  let width, height;
  let particles = [];

  let color1 = "rgba(130, 24, 91, 0.76)";
  let color2 = "rgb(255, 178, 214)";
  let particleCount = 35;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class SquareOrbitParticle {
    constructor(index, size) {
      this.centerX = Math.random() * width;
      this.centerY = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.size = size;
      this.color = index % 2 === 0 ? color1 : color2;

      this.totalPerimeter = 4 * size;
      this.speed = 0.8 + Math.random() * 0.5;
      this.offset = Math.random() * this.totalPerimeter;
    }

    update() {
      this.centerX += this.vx;
      this.centerY += this.vy;

      if (this.centerX < 0 || this.centerX > width) this.vx *= -1;
      if (this.centerY < 0 || this.centerY > height) this.vy *= -1;

      this.offset += this.speed;
      if (this.offset >= this.totalPerimeter) this.offset = 0;

      // Mouvement le long du carré
      let pos = this.offset;
      if (pos < this.size) {
        this.x = this.centerX - this.size / 2 + pos;
        this.y = this.centerY - this.size / 2;
      } else if (pos < this.size * 2) {
        this.x = this.centerX + this.size / 2;
        this.y = this.centerY - this.size / 2 + (pos - this.size);
      } else if (pos < this.size * 3) {
        this.x = this.centerX + this.size / 2 - (pos - 2 * this.size);
        this.y = this.centerY + this.size / 2;
      } else {
        this.x = this.centerX - this.size / 2;
        this.y = this.centerY + this.size / 2 - (pos - 3 * this.size);
      }
    }

    draw() {
      // Particule
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();

      // Carré d'orbite
      ctx.beginPath();
      ctx.rect(this.centerX - this.size / 2, this.centerY - this.size / 2, this.size, this.size);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 0.9;
      ctx.stroke();
    }
  }

  function createParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
      let size = 40 + Math.random() * 200;
      particles.push(new SquareOrbitParticle(i, size));
    }
  }
  createParticles(particleCount);

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();

  function randomColor(alpha = 1) {
    const r = () => Math.floor(Math.random() * 256);
    return `rgba(${r()}, ${r()}, ${r()}, ${alpha})`;
  }

  function randomizeColors() {
    color1 = randomColor(0.76);
    color2 = randomColor(1);

    particles.forEach((p, i) => {
      p.color = i % 2 === 0 ? color1 : color2;
    });
  }

}