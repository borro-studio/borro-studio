/* =====================================
   GLOBAL SETUP
===================================== */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const body = document.body;
const logo = document.getElementById("mainLogo");
const menuBtn = document.getElementById("menuBtn");

const menu = document.getElementById("menu");
const menuItems = document.querySelectorAll(".menu-overlay li");

const portfolioBtn = document.getElementById("portfolio");
const backArrow = document.getElementById("backArrow");
const homeItems = document.querySelectorAll(".home-item");

const portfolioContent = document.getElementById("portfolioContent");
const projectBlocks = document.querySelectorAll(".project-block");

let portfolioOpen = false;
let menuOpen = false;
let isAnimating = false;

/* =====================================
   SIDE BAND CONTROL
===================================== */

function showSideBand() {
  gsap.to(".side-marquee", {
    opacity: 1,
    duration: 0.3,
    ease: "power2.out"
  });
}

function hideSideBand() {
  gsap.to(".side-marquee", {
    opacity: 0,
    duration: 0.3,
    ease: "power2.out"
  });
}

/* =====================================
   MENU SYSTEM
===================================== */

gsap.set(menu, { x: "100%" });
gsap.set(menuItems, { x: 200, opacity: 0 });

const menuTL = gsap.timeline({
  paused: true,
  defaults: { ease: "power4.inOut" },
  onStart: () => isAnimating = true,
  onComplete: () => isAnimating = false,
  onReverseComplete: () => {
    body.classList.remove("menu-active");
    logo.src = "img/LOGO.png";
    menuBtn.src = "img/Recurso 1.png";
    menuOpen = false;
    isAnimating = false;

    if (!portfolioOpen) {
      showSideBand();
    }
  }
});

menuTL
  .to(menu, { x: "0%", duration: 0.8 })
  .call(() => {
    body.classList.add("menu-active");
    logo.src = "img/borro_cami.png";
    menuBtn.src = "img/ICONO AMARILLO.png";
    hideSideBand();
  }, null, 0.1)
  .to(menuItems, {
    x: 0,
    opacity: 1,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.4");

menuBtn.addEventListener("click", () => {

  if (isAnimating) return;

  if (!menuOpen) {

    gsap.to(menuBtn, {
      rotation: 180,
      scale: 1.15,
      duration: 0.5,
      ease: "power3.out"
    });

    menuTL.play();
    menuOpen = true;

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

  body.classList.add("home-active");
  gsap.set("footer", { opacity: 1, y: 0 });

  showSideBand();

  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

  intro
    .from(logo, { y: -40, opacity: 0, duration: 1 })
    .from(menuBtn, { y: -20, opacity: 0, duration: 0.8 }, "-=0.7")
    .from("footer", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
    .from(homeItems, { y: 40, opacity: 0, stagger: 0.15, duration: 0.8 }, "-=0.6");
});

/* =====================================
   PORTFOLIO OPEN
===================================== */

portfolioBtn.addEventListener("click", () => {

  if (portfolioOpen || isAnimating) return;

  portfolioOpen = true;
  isAnimating = true;

  hideSideBand();

  body.classList.remove("home-active");
  body.classList.add("portfolio-active");

  const isMobile = window.innerWidth < 768;

  const tl = gsap.timeline({
    defaults: { ease: "power3.inOut" },
    onComplete: () => isAnimating = false
  });

  tl.to("footer", { opacity: 0, duration: 0.4 }, 0);

  homeItems.forEach(item => {
    if (item !== portfolioBtn) {
      tl.to(item, { x: "-40vw", opacity: 0, duration: 0.6 }, 0);
    }
  });

  tl.to(portfolioBtn, {
  x: isMobile
    ? window.innerWidth * 0.26   // 🔥 antes 0.4
    : window.innerWidth * 0.55,
  duration: 1,
  ease: "power4.inOut"
}, 0);

  tl.to(portfolioBtn, { color: "#f4c44e", duration: 0.3 }, 0.2);

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
    {
      x: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.2,
      ease: "power4.out"
    },
    0.8
  );

  tl.to(backArrow, { opacity: 1, duration: 0.3 }, 0.8);
});

/* =====================================
   BACK TO HOME
===================================== */

backArrow.addEventListener("click", (e) => {

  e.stopPropagation();
  if (!portfolioOpen || isAnimating) return;

  portfolioOpen = false;
  isAnimating = true;

  const tl = gsap.timeline({
    defaults: { ease: "power3.inOut" },
    onComplete: () => {
      isAnimating = false;
      showSideBand();
    }
  });

  tl.to(window, { scrollTo: 0, duration: 0.6 }, 0);
  tl.to(projectBlocks, { x: -40, opacity: 0, stagger: 0.08, duration: 0.4 }, 0);
  tl.to(portfolioContent, { opacity: 0, duration: 0.3 }, 0.2);
  tl.to(backArrow, { opacity: 0, duration: 0.2 }, 0);
  tl.to(portfolioBtn, { x: 0, duration: 0.6 }, 0.3);
  tl.to(portfolioBtn, { color: "#1c1c1c", duration: 0.3 }, 0.3);
  tl.to(homeItems, { x: 0, opacity: 1, stagger: 0.05, duration: 0.6 }, 0.4);
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
   GENERIC EXPANDABLE PROJECT SYSTEM
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  const projects = document.querySelectorAll(".expandable-project");

  projects.forEach(project => {

    const line = project.querySelector(".project-line");
    const title = project.querySelector(".project-title");
    const expand = project.querySelector(".project-expand");
    const description = project.querySelector(".project-description");
    const meta = project.querySelector(".project-meta");
    const closeBtn = project.querySelector(".close-project");
    const galleryItems = project.querySelectorAll(".gallery-item");

    let isOpen = false;

    gsap.set(title, { transformOrigin: "left top" });

    /* =========================
   OPEN
========================= */

title.addEventListener("click", (e) => {

  if (!portfolioOpen || isOpen) return;
  if (e.target.classList.contains("close-project")) return;

  isOpen = true;
  project.classList.add("expanded");

  expand.style.height = "auto";
  const contentHeight = expand.scrollHeight;
  expand.style.height = "0px";

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // 🔥 Línea hasta la "o" de Portfolio (alineación estable)
 tl.call(() => {

  const container = document.querySelector(".portfolio-content");

  const containerStyles = window.getComputedStyle(container);
  const paddingRight = parseFloat(containerStyles.paddingRight);

  const containerWidth = container.clientWidth;
  const maxWidth = containerWidth - paddingRight;

  const lineLeftInsideContainer = line.offsetLeft;

  const newWidth = maxWidth - lineLeftInsideContainer;

  gsap.to(line, {
    width: newWidth,
    duration: 0.7,
    ease: "power2.out"
  });

});
  // Expand primero
  tl.to(expand, {
    height: contentHeight,
    duration: 1.2,
    ease: "power3.out"
  }, 0);

  // Luego escala título
  tl.to(title, {
    scale: 1.35,
    y: -12,
    duration: 0.8,
    ease: "power3.out"
  }, 0.1);

  if (description) {
    tl.to(description, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, "-=0.8");
  }

  if (meta) {
    tl.to(meta, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, "-=0.6");
  }

  tl.to(galleryItems, {
    opacity: 1,
    duration: 0.8,
    stagger: 0.4
  }, "-=0.3");

  tl.to(closeBtn, {
    opacity: 1,
    pointerEvents: "auto",
    duration: 0.3
  }, "-=0.8");

  tl.set(expand, { height: "auto" });

});
    /* =========================
       CLOSE
    ========================= */

    closeBtn.addEventListener("click", (e) => {

      e.stopPropagation();
      if (!isOpen) return;

      isOpen = false;
      project.classList.remove("expanded");

      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      tl.to(closeBtn, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3
      });

      // 1️⃣ Desaparece contenido
      tl.to([galleryItems, meta, description], {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.05
      });

      // 2️⃣ Se contrae bloque
      tl.to(expand, {
        height: 0,
        duration: 0.8,
        ease: "power3.inOut"
      }, "-=0.1");

      // 3️⃣ Vuelve título
      tl.to(title, {
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "expo.inOut"
      }, "-=0.6");

      // 4️⃣ Vuelve línea
      tl.to(line, {
        width: 300,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.6");

    });

  });

});

/* =====================================
   PROJECT HOVER MICRO INTERACTION
===================================== */

projectBlocks.forEach(block => {

  const line = block.querySelector(".project-line");
  const title = block.querySelector(".project-title");

  block.addEventListener("mouseenter", () => {

    if (!portfolioOpen) return;

    if (block.classList.contains("expandable-project") && block.classList.contains("expanded")) return;

    gsap.to(line, {
      width: 360,
      duration: 0.35,
      ease: "power2.out"
    });

    gsap.to(title, {
      x: 12,
      duration: 0.35,
      ease: "power2.out"
    });

  });

  block.addEventListener("mouseleave", () => {

    if (!portfolioOpen) return;

    if (block.classList.contains("expandable-project") && block.classList.contains("expanded")) return;

    gsap.to(line, {
      width: 300,
      duration: 0.35,
      ease: "power2.out"
    });

    gsap.to(title, {
      x: 0,
      duration: 0.35,
      ease: "power2.out"
    });

  });

});
