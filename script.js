"use strict";
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const header = document.querySelector(".header");
const sections = document.querySelectorAll(".section");
const lazyImgs = document.querySelectorAll(".lazy-img");
const btn_right_slide = document.querySelector(".slider__btn--right");
const btn_left_slide = document.querySelector(".slider__btn--left");
const allSlides = document.querySelectorAll(".slide");
const dots_Conatiner = document.querySelector(".dots");
///////////////////////////////////////////////
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

btnScrollTo.addEventListener("click", (e) => {
  section1.scrollIntoView({ behavior: "smooth" });
});

function handleHoverNavItems(e) {
  if (e.target.classList.contains("nav__link")) {
    const el = e.target;
    const siblings = el.closest(".nav__links").querySelectorAll(".nav__link");
    const img = el.closest(".nav").querySelector("img");
    siblings.forEach((sib) => {
      if (sib !== el) {
        sib.style.opacity = this;
      }
      img.style.opacity = this;
    });
  }
}

nav.addEventListener("mouseover", handleHoverNavItems.bind(0.5));
nav.addEventListener("mouseout", handleHoverNavItems.bind(1));
///////////////////////////////////////////
nav.addEventListener("click", (e) => {
  if (e.target.classList.contains("nav__link")) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
///////////////////////////////////////////
tabsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("operations__tab")) {
    const tab = e.target.dataset.tab;

    tabs.forEach((el) => el.classList.remove("operations__tab--active"));
    e.target.classList.add("operations__tab--active");

    document
      .querySelectorAll(".operations__content")
      .forEach((el) => el.classList.remove("operations__content--active"));
    document
      .querySelector(`.operations__content--${tab}`)
      .classList.add("operations__content--active");
  }
});
///////////////////////////////////////////
function handleStickyNav(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
}

const stickyNav = new IntersectionObserver(handleStickyNav, {
  root: null,
  threshold: 0.8,
});
stickyNav.observe(header);
///////////////////////////////////////////

function handleLazyImage(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", (e) => {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
}

const lazyImg = new IntersectionObserver(handleLazyImage, {
  root: null,
  threshold: 0,
  rootMargin: "-90px",
});
lazyImgs.forEach((img) => {
  lazyImg.observe(img);
});
///////////////////////////////////////////
function handleShowSections(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("hidden");
  observer.unobserve(entry.target);
}

const showSections = new IntersectionObserver(handleShowSections, {
  root: null,
  threshold: 0.25,
});
sections.forEach((s) => {
  showSections.observe(s);
  s.classList.add("hidden");
});
///////////////////////////////////////////
function slider() {
  let curSlide = 0;
  let lastSlide = allSlides.length - 1;
  function createDots() {
    allSlides.forEach((_, index) => {
      dots_Conatiner.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${index}"></button>`
      );
    });
  }

  function activeDot(slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((el) => el.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  }
  function goToSlide(curSlide) {
    allSlides.forEach((el, index) => {
      el.style.transform = `translateX(${100 * (index - curSlide)}%)`;
    });
  }
  function nextSlide() {
    if (curSlide == lastSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  }
  function prevSlide() {
    if (curSlide === 0) {
      curSlide = lastSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  }

  function init() {
    createDots();
    activeDot(curSlide);
    goToSlide(curSlide);
  }
  init();

  btn_right_slide.addEventListener("click", nextSlide);
  btn_left_slide.addEventListener("click", prevSlide);

  dots_Conatiner.addEventListener("click", (e) => {
    if (e.target.classList.contains("dots__dot")) {
      goToSlide(e.target.dataset.slide);
      activeDot(e.target.dataset.slide);
    }
  });
}

slider();
////END
