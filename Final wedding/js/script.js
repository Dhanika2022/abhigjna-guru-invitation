// Prevent browser from restoring previous scroll position
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});

const seal = document.getElementById("seal");

function animateHero() {

    const items = [
        ".subtitle",
        ".invite",
        ".bride",
        ".love",
        ".groom",
        ".date",
        ".location",
        ".scroll"
    ];

    items.forEach((selector, index) => {

        const element = document.querySelector(selector);

        setTimeout(() => {

            element.style.transition = "all 0.8s ease";

            element.style.opacity = "1";

            element.style.transform = "translateY(0)";

        }, index * 400);

    });

}

seal.onclick = () => {

    // Always start from the top
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
    });

    // Seal animation
    seal.style.transform = "translate(-50%,-50%) scale(1.2)";

    // Golden light
    document.querySelector(".light").style.opacity = "1";

    // Open doors
    setTimeout(() => {

        document.querySelector(".left-door").style.transform = "translateX(-100%)";

        document.querySelector(".right-door").style.transform = "translateX(100%)";

    }, 400);

    // Hide seal
    setTimeout(() => {

        seal.style.opacity = "0";

    }, 500);

    // Show Hero
    setTimeout(() => {

    const hero = document.getElementById("hero");

    hero.style.opacity = "1";
    hero.style.pointerEvents = "auto";

    // Allow scrolling after intro animation
    document.body.style.overflowY = "auto";

    animateHero();
    setInterval(createPetal,500);
    document.getElementById("intro").style.display = "none";

}, 1600);

};

function createPetal(){

    const petal=document.createElement("img");

    const number=Math.floor(Math.random()*5)+1;

    petal.src="assets/images/petal"+number+".png";

    petal.className="petal";

    petal.style.left=Math.random()*100+"%";

    petal.style.width=(20+Math.random()*30)+"px";

    petal.style.animationDuration=(8+Math.random()*8)+"s";

    petal.style.opacity=.4+Math.random()*.6;

    document.getElementById("petals").appendChild(petal);

    setTimeout(()=>{

        petal.remove();

    },16000);

}

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.25
});

document.querySelectorAll(".fade-up").forEach(el=>{

    observer.observe(el);

});

const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

function initScratchCard() {

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    ctx.globalCompositeOperation = "source-over";

    // Gold Layer
    ctx.fillStyle = "#D4AF37";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 30px Poppins";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        "Scratch Here ✨",
        canvas.width / 2,
        canvas.height / 2
    );
}
window.addEventListener("load", initScratchCard);

let scratching = false;
let revealed = false;

// Prevent page scrolling while scratching
canvas.style.touchAction = "none";

canvas.addEventListener("pointerdown", (e) => {
    scratching = true;
    scratch(e); // Scratch immediately on touch
});

canvas.addEventListener("pointermove", (e) => {
    if (scratching) {
        scratch(e);
    }
});

canvas.addEventListener("pointerup", () => {
    scratching = false;
});

canvas.addEventListener("pointerleave", () => {
    scratching = false;
});

canvas.addEventListener("pointercancel", () => {
    scratching = false;
});

function scratch(e){

    if(!scratching) return;

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.save();

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    const percent = getScratchedPercentage();

    if(percent > 60 && !revealed){

        canvas.style.transition = "opacity .8s";
        canvas.style.opacity = "0";

        document
            .querySelector(".scratch-card")
            .classList.add("revealed");

        launchConfetti();
    }
}

function getScratchedPercentage() {

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let transparent = 0;

    for (let i = 3; i < pixels.data.length; i += 4) {
        if (pixels.data[i] === 0) {
            transparent++;
        }
    }

    return (transparent / (canvas.width * canvas.height)) * 100;
}

function launchConfetti() {

    for (let i = 0; i < 80; i++) {

        const confetti = document.createElement("div");

        confetti.className = "confetti";

        confetti.style.left = Math.random() * 100 + "%";

        confetti.style.animationDelay = Math.random() + "s";

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }

}

const weddingDate = new Date("August 19, 2026 10:00:00").getTime();

function updateCountdown(){

    const now = new Date().getTime();

    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

}

updateCountdown();

setInterval(updateCountdown,1000);