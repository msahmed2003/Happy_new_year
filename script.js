// 🎯 COUNTDOWN TIMER
const newYearTime = new Date("December 29, 2025 09:34:00").getTime();
let celebrated = false;

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

setInterval(() => {
    const now = new Date().getTime();
    const diff = newYearTime - now;

    if (diff <= 0 && !celebrated) {
        celebrated = true;

        document.getElementById("title").innerText = "🎆 Happy New Year 2026 🎆";
        document.getElementById("message").innerText =
            "✨ May this year bring Success, Health & Happiness ✨";

        document.getElementById("special-box").classList.remove("hidden");

        launchCelebration();
    }

    const d = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
    const h = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
    const m = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
    const s = Math.max(0, Math.floor((diff / 1000) % 60));

    daysEl.innerText = d;
    hoursEl.innerText = h;
    minutesEl.innerText = m;
    secondsEl.innerText = s;
}, 1000);

// 🎶 MUSIC
function playMusic() {
    document.getElementById("music").play();
}

// 🎆 FIREWORKS + CONFETTI EFFECT
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let particles = [];

function Particle(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 3 + 2;
    this.color = color;
    this.speedX = (Math.random() - 0.5) * 6;
    this.speedY = (Math.random() - 0.5) * 6;
    this.life = 100;
}

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const color = `hsl(${Math.random() * 360},100%,50%)`;

    for (let i = 0; i < 60; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.life <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(animate);
}

function launchCelebration() {
    setInterval(createFirework, 500);
    playMusic();
}

animate();


