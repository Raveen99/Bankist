"use strict";

const header = document.querySelector(".header");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

// Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

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
  window, scrollIntoView(section1);
});

//IMPLEMENTING PAGE NAVIGATION
document
  .querySelector(".nav__links")
  .addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Event: ", event.target);

    if (event.target.classList.contains("nav__link")) {
      const id = event.target.getAttribute("href");
      console.log("Id: ", id);
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
      });
    }
  });
