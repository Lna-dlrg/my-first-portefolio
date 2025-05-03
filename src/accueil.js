const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    
    if (sidebar.style.left === '-250px') { 
        sidebar.style.left = '0';
    } 
    else {sidebar.style.left = '-250px';
    }
});


const toggleButton = document.getElementById('modeToggle');
const body = document.body;

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

applyTheme();

toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
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
        span.style.transform = 'translate(0, 0)';
        span.style.opacity = '1';
          isMoved = false;
      }
    });
  });
});










if (window.location.pathname.includes("accueil.html")) {

  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");
  
  let width, height;
  let particles = [];
  
  // Couleurs modifiables (alternance)
  let color1 = "rgba(130, 24, 91, 0.76)";
  let color2 = "rgb(255, 178, 214)";
  
  const particleCount = 100;
  const particleRadius = 3;
  const speed = 0.25;
  const maxDistance = 120;
  
  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  
  class Particle {
    constructor(index) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * speed;
      this.vy = (Math.random() - 0.5) * speed;
      this.color = index % 2 === 0 ? color1 : color2;
    }
  
    move() {
      this.x += this.vx;
      this.y += this.vy;
  
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
  
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, particleRadius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
  
  function createParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(i));
    }
  }
  createParticles(particleCount);
  
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = particles[i].color;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    drawLines();
    particles.forEach(p => {
      p.move();
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
  