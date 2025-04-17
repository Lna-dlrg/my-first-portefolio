const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let width, height;
let particles = [];

// Couleurs modifiables
let particleColor = "rgba(130, 24, 91, 0.76)";
let lineColor = "rgb(255, 178, 214)";

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = 1.5;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = particleColor;
    ctx.fill();
  }
}

function createParticles(count) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}
createParticles(100);

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = lineColor;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.move();
    p.draw();
  });
  drawLines();
  requestAnimationFrame(animate);
}
animate();

// Fonctions pour couleurs aléatoires
function randomColor(alpha = 0.7) {
  const r = () => Math.floor(Math.random() * 256);
  return `rgba(${r()}, ${r()}, ${r()}, ${alpha})`;
}

// Fonction appelée par le bouton
function randomizeColors() {
  particleColor = randomColor(0.76);
  lineColor = randomColor(0.5);
}
