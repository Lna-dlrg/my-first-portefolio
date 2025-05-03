if (window.location.pathname.includes("moi.html")) {
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
  
    const pElement = document.querySelector('main p');
    const pText = pElement.textContent;
    pElement.textContent = '';
    pElement.classList.add('hidden');
  
    let h1Disappeared = false;
  
    function showParagraph() {
      const letterSpans = h1.querySelectorAll('.letter');
      const allDisappeared = Array.from(letterSpans).every(span => 
        parseFloat(getComputedStyle(span).opacity) < 0.1);
      
      if (allDisappeared && !h1Disappeared) {
        h1Disappeared = true;
        
        setTimeout(() => {
          pElement.classList.remove('hidden');
          pElement.classList.add('visible');
          typeWriter(pElement, pText, 32);
        }, 2);
      }
    }
  
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
  
    h1.addEventListener('mouseover', (e) => {
      const letterSpans = h1.querySelectorAll('.letter');
      letterSpans.forEach((span, index) => {
        span.style.opacity = '0';
        span.style.transition = `opacity 1s ease ${index * 0.1}s`;
      });
      
      const checkInterval = setInterval(() => {
        showParagraph();
        
        if (h1Disappeared) {
          clearInterval(checkInterval);
        }
      }, 200);
      
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!h1Disappeared) {
          showParagraph();
        }
      }, 5000);
    });
  }













 
  const canvas = document.getElementById("orbitCanvas");
  const ctx = canvas.getContext("2d");
  
  let width, height;
  let particles = [];
  
  let color1 = "rgba(130, 24, 91, 0.76)";
  let color2 = "rgb(255, 178, 214)";
  let particleCount = 25;
  
  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  
  class OrbitingParticle {
    constructor(index, angle, radius) {
      this.centerX = Math.random() * width;
      this.centerY = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.angle = angle;
      this.radius = radius;
      this.speed = (Math.random() * 0.005) + 0.002;
      this.size = 3;
      this.color = index % 2 === 0 ? color1 : color2;
      this.orbitColor = this.color;
    }
  
    update() {
      this.centerX += this.vx;
      this.centerY += this.vy;
  
      if (this.centerX < 0 || this.centerX > width) this.vx *= -1;
      if (this.centerY < 0 || this.centerY > height) this.vy *= -1;
  
      this.angle += this.speed;
      this.x = this.centerX + Math.cos(this.angle) * this.radius;
      this.y = this.centerY + Math.sin(this.angle) * this.radius;
    }
  
    draw() {
      // Particule
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
  
      // Cercle d’orbite (même couleur et finesse que les lignes du réseau)
      ctx.beginPath();
      ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = this.orbitColor;
      ctx.lineWidth = 0.9;
      ctx.stroke();
    }
  }
  
  function createOrbitParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
      let angle = Math.random() * 2 * Math.PI;
      let radius = 15 + Math.random() * Math.min(width, height) / 3;
      particles.push(new OrbitingParticle(i, angle, radius));
    }
  }
  createOrbitParticles(particleCount);
  
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
      p.orbitColor = p.color;
    });
  }
  