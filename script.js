/* =====================================
   MENU SYSTEM
===================================== */

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const menuItems = document.querySelectorAll(".menu-overlay li");
const menuLine = document.querySelector(".menu-line");
const menuContact = document.querySelector(".menu-contact");
const body = document.body;
const logo = document.getElementById("mainLogo");
const footer = document.querySelector("footer");

let menuOpen = false;
let isAnimating = false;

gsap.set(menu, { x: "100%" });
gsap.set(menuItems, { x: 200, opacity: 0 });
gsap.set(menuLine, { scaleX: 0 });
gsap.set(menuContact, { y: 30, opacity: 0 });

const menuTL = gsap.timeline({ paused: true });

menuTL
  .to(menu, { x: "0%", duration: 0.8 })
  .call(() => {
    body.classList.add("menu-active");
    footer.style.opacity = "0";
  }, null, 0.1)
  .call(() => {
    logo.src = "img/borro_cami.png";
    menuBtn.src = "img/ICONO AMARILLO.png";
  }, null, 0.2)
  .to(menuItems, {
    x: 0,
    opacity: 1,
    stagger: 0.15,
    duration: 0.8
  }, "-=0.4")
  .to(menuLine, {
    scaleX: 1,
    duration: 0.8
  }, "-=0.6")
  .to(menuContact, {
    y: 0,
    opacity: 1,
    duration: 0.6
  }, "-=0.5");

menuTL.eventCallback("onReverseComplete", () => {
  body.classList.remove("menu-active");
  footer.style.opacity = "1";
  logo.src = "img/LOGO.png";
  menuBtn.src = "img/Recurso 1.png";
  isAnimating = false;
  menuOpen = false;
});

menuBtn.addEventListener("click", () => {

  if (isAnimating) return;
  isAnimating = true;

  if (!menuOpen) {
    gsap.to(menuBtn, { rotation: 180, scale: 1.15, duration: 0.5 });
    menuTL.play();
    menuOpen = true;
    setTimeout(() => isAnimating = false, 900);
  } else {
    gsap.to(menuBtn, { rotation: 0, scale: 1, duration: 0.5 });
    menuTL.reverse();
  }
});


/* =====================================
   INTRO ANIMATION
===================================== */

window.addEventListener("load", () => {

  gsap.set("#mainLogo", { y: -40, opacity: 0 });
  gsap.set("#menuBtn", { y: -20, opacity: 0 });
  gsap.set("footer", { y: 20, opacity: 0 });

  const introTL = gsap.timeline({
    defaults: { ease: "power3.out" }
  });

  introTL
    .to("#mainLogo", {
      y: 0,
      opacity: 1,
      duration: 1
    })
    .to("#menuBtn", {
      y: 0,
      opacity: 1,
      duration: 0.8
    }, "-=0.7")
    .to("footer", {
      y: 0,
      opacity: 1,
      duration: 0.8
    }, "-=0.6");

});


/* =====================================
   WHEEL – STABLE TRUE INFINITE + SCROLL
===================================== */

function highlightCenter() {

  const wheel = document.querySelector(".wheel");
  const wheelRect = wheel.getBoundingClientRect();
  const centerY = wheelRect.top + wheelRect.height / 2;

  let closest = null;
  let minDistance = Infinity;

  document.querySelectorAll(".wheel-item").forEach(item => {

    const rect = item.getBoundingClientRect();
    const itemCenter = rect.top + rect.height / 2;
    const distance = Math.abs(itemCenter - centerY);

    item.classList.remove("active");

    if (distance < minDistance) {
      minDistance = distance;
      closest = item;
    }
  });

  if (closest) {
    closest.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", () => {

  const wheelTrack = document.querySelector(".wheel-track");
  const originalItems = Array.from(document.querySelectorAll(".wheel-item"));

  if (!wheelTrack || originalItems.length === 0) return;

  // Creamos 3 bloques (original + 2 clones)
  for (let i = 0; i < 2; i++) {
    originalItems.forEach(item => {
      wheelTrack.appendChild(item.cloneNode(true));
    });
  }

  const itemHeight = originalItems[0].offsetHeight;
  const blockHeight = itemHeight * originalItems.length;

  let startY = -blockHeight;
  gsap.set(wheelTrack, { y: startY });

  function update() {

    let y = gsap.getProperty(wheelTrack, "y");

    if (y <= -blockHeight * 2) {
      gsap.set(wheelTrack, { y: y + blockHeight });
    }

    if (y >= 0) {
      gsap.set(wheelTrack, { y: y - blockHeight });
    }

    highlightCenter();
  }

  Draggable.create(wheelTrack, {
    type: "y",
    inertia: true,
    onDrag: update,
    onThrowUpdate: update
  });

  /* Scroll convierte en giro */
  wheelTrack.addEventListener("wheel", (e) => {

    e.preventDefault();

    const delta = e.deltaY;
    let currentY = gsap.getProperty(wheelTrack, "y");

    gsap.set(wheelTrack, {
      y: currentY - delta * 0.8
    });

    update();

  });

  highlightCenter();

});
