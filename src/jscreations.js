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
  
        const container = document.querySelector('.container');
        container.classList.remove('hidden');
        container.classList.add('visible');
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




let color1 = "rgba(130, 24, 91, 0.76)";
let color2 = "rgba(255, 178, 214, 1)";
let particles = [];
let ctx, width, height;
let mouse = { x: null, y: null };
let isHoveringH1 = false;

if (window.location.pathname.includes("creations.html")) {
  window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("creationsCanvas");
    if (!canvas) return;
    ctx = canvas.getContext("2d");

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Suivi de la souris
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // Détection du survol du h1
    const h1 = document.querySelector('h1');
    h1.addEventListener('mouseenter', () => isHoveringH1 = true);
    h1.addEventListener('mouseleave', () => isHoveringH1 = false);

    class FireflyParticle {
      constructor(index) {
        this.reset(index);
      }

      reset(index) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = 1 + Math.random() * 4.5;
        this.color = index % 2 === 0 ? color1 : color2;
        this.vy = 0.2 + Math.random() * 0.5;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.alpha = 0.2 + Math.random() * 0.5;
        this.twinkle = Math.random() * 0.02;
      }

      update() {
        // Répulsion douce de la souris
        if (!isHoveringH1 && mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = 120;

          if (dist < minDist) {
            const angle = Math.atan2(dy, dx);
            const force = (minDist - dist) / minDist;
            const push = force * 1;

            this.vx += Math.cos(angle) * push;
            this.vy += Math.sin(angle) * push;
          }
        }

        this.vx *= 0.96; // friction
        this.vy *= 0.96;

        // Mouvement naturel vers le bas
        this.vy += 0.05;

        this.x += this.vx;
        this.y += this.vy;

        this.alpha += this.twinkle;
        if (this.alpha > 1 || this.alpha < 0.2) this.twinkle *= -1;

        if (this.y > height + 10 || this.x < -10 || this.x > width + 10) {
          this.y = -10;
          this.x = Math.random() * width;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    

    function createParticles(count) {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new FireflyParticle(i));
      }
    }

    createParticles(70);

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();
  });
}

// ✅ Fonctions globales pour bouton
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
