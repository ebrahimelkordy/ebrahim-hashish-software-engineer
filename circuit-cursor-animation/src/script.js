const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const themeBtn = document.getElementById("theme-toggle");

let width, height;
let particles = [];
let mouse = { x: -1000, y: -1000, active: false };
let currentTheme = "dark";

// सर्किट कलर्स कॉन्फ़िगरेशन
const baseHue = 180; // Cyan
const hueRange = 60;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  if (!mouse.active) {
    mouse.x = width / 2;
    mouse.y = height / 2;
  }
}

// थीम बदलने का लॉजिक
themeBtn.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", currentTheme);
});

function updateMouse(x, y) {
  mouse.x = x;
  mouse.y = y;
  mouse.active = true;
}

window.addEventListener("mousemove", (e) => updateMouse(e.clientX, e.clientY));
window.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
    updateMouse(e.touches[0].clientX, e.touches[0].clientY);
  },
  { passive: false }
);
window.addEventListener("resize", resize);

resize();

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.age = 0;
    this.life = Math.random() * 100 + 50;
    this.dead = false;

    const speed = Math.random() * 2 + 2;
    const angle = Math.floor(Math.random() * 8) * (Math.PI / 4);

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;

    const hue = baseHue + Math.random() * hueRange;
    const saturation = 100;
    const lightness = currentTheme === "dark" ? 50 : 40;
    this.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    this.width = Math.random() * 1.5 + 0.5;
  }

  update() {
    this.age++;
    if (this.age > this.life) {
      this.dead = true;
      return;
    }

    const prevX = this.x;
    const prevY = this.y;

    this.x += this.vx;
    this.y += this.vy;

    if (Math.random() < 0.05) {
      let currentAngle = Math.atan2(this.vy, this.vx);
      const turn = (Math.random() < 0.5 ? 1 : -1) * (Math.PI / 4);
      const newAngle = currentAngle + turn;

      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      this.vx = Math.cos(newAngle) * speed;
      this.vy = Math.sin(newAngle) * speed;
    }

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;
    ctx.lineCap = "round";
    ctx.stroke();
  }
}

function clearCanvas() {
  const alpha = 0.1;
  if (currentTheme === "dark") {
    ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
  } else {
    ctx.fillStyle = `rgba(240, 240, 240, ${alpha})`;
  }
  ctx.fillRect(0, 0, width, height);
}

let tick = 0;
function animate() {
  requestAnimationFrame(animate);
  clearCanvas();

  tick++;
  if (tick % 5 === 0) {
    const particlesPerPulse = 4;
    for (let i = 0; i < particlesPerPulse; i++) {
      particles.push(new Particle(mouse.x, mouse.y));
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    if (p.dead || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
      particles.splice(i, 1);
    }
  }
}

animate();
