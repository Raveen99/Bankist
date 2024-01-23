"use strict";

const header = document.querySelector(".header");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

// Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const allSection = document.querySelectorAll(".section");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Creating and inserting elements
const message = document.createElement("div");
message.classList.add("cookie-message");

message.innerHTML =
  'We use cookies for improved functionality.  <button class = "btn btn--close-cookie">Got It! </button> ';

header.append(message);

const cookieBtn = document.querySelector(".btn--close-cookie");
cookieBtn.addEventListener("click", function (event) {
  message.remove();
});

// Implementing Smooth Scrolling

btnScrollTo.addEventListener("click", function (event) {
  /* Old Method by calculating cordinates.
  //get cordinates of section where you want to scroll
  const cords = section1.getBoundingClientRect();

  //this display number of pixels that window is currently scrolled along x and y axis
  console.log("X: ", window.scrollX);
  console.log("Y: ", window.scrollY);

  window.scroll({
    top: cords.top + window.scrollY,
    left: cords.left + window.scrollX,
    behavior: "smooth",
  });*/

  //New Method
  section1.scrollIntoView({
    behavior: "smooth",
  });
});

//IMPLEMENTING PAGE NAVIGATION
document
  .querySelector(".nav__links")
  .addEventListener("click", function (event) {
    event.preventDefault();

    if (event.target.classList.contains("nav__link")) {
      const id = event.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
      });
    }
  });

//Implementing Tabbed Components
tabsContainer.addEventListener("click", function (event) {
  const clicked = event.target.closest(".operations__tab");

  if (!clicked) return;

  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  clicked.classList.add("operations__tab--active");

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//Menu Fade Animation

const handleHover = function (event, opacity) {
  if (event.target.classList.contains("nav__link")) {
    const link = event.target;
    const siblngs = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblngs.forEach((child) => {
      if (child != link) child.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

//Passing argument to event handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

//Implementing Sticky navigation using Intersection Observer API concept

/* The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element 
with an ancestor element or with a top-level document's viewport. */

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//Reveal Sections

const displaySection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  //console.log("Observer: ", observer);
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(displaySection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//lazy Loading images

const allImages = document.querySelectorAll("img[data-src]");

const displayImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  /*We cannot direct remove blur class because javascript is loading these images in background and if we remove blur class 
  if device network is slow then image will be displayed but it will still be in low quality and we don't want to show this to our user.
  So, we will capture laod event returned by javascript here. */
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(displayImg, {
  root: null,
  threshold: 0,
  rootMargin: "300px",
});

allImages.forEach((img) => imageObserver.observe(img));
