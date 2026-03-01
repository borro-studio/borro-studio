/* =====================================
   TYPEWRITER FUNCTION
===================================== */

function typeWriter(element, text, speed = 20, callback) {
  let i = 0;
  element.innerHTML = "";

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else {
      if (callback) callback();
    }
  }

  typing();
}


/* =====================================
   GLOBAL ELEMENTS
===================================== */

const body = document.body;
const logo = document.getElementById("mainLogo");
const menuBtn = document.getElementById("menuBtn");

const menu = document.getElementById("menu");
const menuItems = document.querySelectorAll(".menu-overlay li");

const portfolio = document.getElementById("portfolio");
const backArrow = document.getElementById("backArrow");
const homeItems = document.querySelectorAll(".home-item");

const portfolioContent = document.getElementById("portfolioContent");
const projectBlocks = document.querySelectorAll(".project-block");

let portfolioOpen = false;
let menuOpen = false;
let isAnimating = false;


/* =====================================
   MENU SYSTEM
===================================== */

gsap.set(menu, { x: "100%" });
gsap.set(menuItems, { x: 200, opacity: 0 });

const menuTL = gsap.timeline({ paused: true });

menuTL
  .to(menu, { x: "0%", duration: 0.8, ease: "power4.inOut" })
  .call(() => body.classList.add("menu-active"), null, 0.1)
  .call(() => {
    logo.src = "img/borro_cami.png";
    menuBtn.src = "img/ICONO AMARILLO.png";
  }, null, 0.2)
  .to(menuItems, {
    x: 0,
    opacity: 1,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.4");

menuTL.eventCallback("onReverseComplete", () => {
  body.classList.remove("menu-active");
  logo.src = "img/LOGO.png";
  menuBtn.src = "img/Recurso 1.png";
  menuOpen = false;
  isAnimating = false;
});

menuBtn.addEventListener("click", () => {

  if (isAnimating) return;
  isAnimating = true;

  if (!menuOpen) {

    gsap.to(menuBtn, {
      rotation: 180,
      scale: 1.15,
      duration: 0.5,
      ease: "power3.out"
    });

    menuTL.play();
    menuOpen = true;

    setTimeout(() => isAnimating = false, 900);

  } else {

    gsap.to(menuBtn, {
      rotation: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out"
    });

    menuTL.reverse();
  }

});


/* =====================================
   INTRO
===================================== */

window.addEventListener("load", () => {

  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

  body.classList.add("home-active");

  intro
    .fromTo(logo, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
    .fromTo(menuBtn, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.7")
    .fromTo("footer", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
    .fromTo(homeItems, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.8 }, "-=0.6");

});


/* =====================================
   PORTFOLIO OPEN
===================================== */

portfolio.addEventListener("click", () => {

  if (portfolioOpen) return;
  portfolioOpen = true;

  body.classList.remove("home-active");
  body.classList.add("portfolio-active");

  const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

  tl.to("footer", { opacity: 0, duration: 0.4 }, 0);

  homeItems.forEach(item => {
    if (item !== portfolio) {
      tl.to(item, { x: "-40vw", opacity: 0, duration: 0.6 }, 0);
    }
  });

  const isMobile = window.innerWidth < 768;

tl.to(portfolio, {
  x: isMobile ? window.innerWidth * 0.40 : window.innerWidth * 0.55,
  duration: 1,
  ease: "power4.inOut"
}, 0);

  tl.to(portfolio, { color: "#f4c44e", duration: 0.3 }, 0.2);

  tl.to(body, { backgroundColor: "#1f1f1f", duration: 0.6 }, 0);

  tl.call(() => {
    logo.src = "img/borro_cami.png";
    menuBtn.src = "img/ICONO AMARILLO.png";
  }, null, 0.3);

  tl.to(portfolioContent, {
    opacity: 1,
    pointerEvents: "auto",
    duration: 0.5
  }, 0.5);

  tl.fromTo(projectBlocks,
    { x: -120, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: "power4.out" },
    0.8
  );

  tl.to(backArrow, { opacity: 1, duration: 0.3 }, 0.8);

});


/* =====================================
   BACK TO HOME
===================================== */

backArrow.addEventListener("click", (e) => {

  e.stopPropagation();
  if (!portfolioOpen) return;
  portfolioOpen = false;

  const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

  tl.to(window, { scrollTo: 0, duration: 0.6, ease: "power2.out" }, 0);

  tl.to(projectBlocks, { x: -40, opacity: 0, duration: 0.4, stagger: 0.08 }, 0);

  tl.to(portfolioContent, { opacity: 0, duration: 0.3 }, 0.2);

  tl.to(backArrow, { opacity: 0, duration: 0.2 }, 0);

  tl.to(portfolio, { x: 0, duration: 0.6, ease: "power4.inOut" }, 0.3);

  tl.to(portfolio, { color: "#1c1c1c", duration: 0.3 }, 0.3);

  tl.to(homeItems, { x: 0, opacity: 1, duration: 0.6, stagger: 0.05 }, 0.4);

  tl.to(body, { backgroundColor: "#e6b84f", duration: 0.6 }, 0.3);

  tl.to("footer", { opacity: 1, duration: 0.4 }, 0.4);

  tl.call(() => {
    logo.src = "img/LOGO.png";
    menuBtn.src = "img/Recurso 1.png";
    body.classList.remove("portfolio-active");
    body.classList.add("home-active");
  });

});


/* =====================================
   STILO PREMIUM ANIMATION
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  const stiloProject = document.querySelector(".stilo-project");
  const stiloLine = document.querySelector(".stilo-project .project-line");
  const stiloExpand = document.querySelector(".stilo-expand");
  const stiloTitle = document.querySelector(".stilo-project .project-title");
  const stiloDescription = document.querySelector(".stilo-description");
  const stiloMeta = document.querySelector(".stilo-meta");

  let isOpen = false;

  if (!stiloProject) return;

  stiloProject.addEventListener("click", () => {

    if (!portfolioOpen) return;
    if (isOpen) return;
    isOpen = true;

    const descriptionText =
      "Stilo Pole Studio es un estudio creado por dos jóvenes emprendedoras que ante todo, disfrutan el deporte que tanto practican. Desde Aurea nos encargamos de transmitir esa confianza, juventud y dinamismo que tanto transmiten en sus clases.";

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    /* 1️⃣ Línea con micro overshoot */
    tl.to(stiloLine, {
      width: "88vw",
      duration: 0.6,
      ease: "power2.out"
    })
    

    /* 2️⃣ Título crece + sube + micro fade */
    tl.to(stiloTitle, {
      scale: 1.38,
      y: -12,
      opacity: 0.95,
      transformOrigin: "left top",
      duration: 0.7,
      ease: "power3.out"
    }, "-=0.5");

    /* 3️⃣ Abrir espacio suave */
    tl.to(stiloExpand, {
      height: 520,
      duration: 1,
      ease: "power2.out"
    }, "-=0.4");

    /* 4️⃣ Texto aparece suavemente */
    tl.to(stiloDescription, {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, "-=0.5");

    /* 5️⃣ Typewriter + meta */
    tl.call(() => {

      typeWriter(stiloDescription, descriptionText, 18, () => {

        gsap.to(stiloMeta, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        });

      });

    });

  });

});
