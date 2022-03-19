"use strict";

function chargeMenu() {
  document.querySelector(".btn_menu").addEventListener("click", toggleMenu);
}
  function toggleMenu() {
    document.querySelector(".navegacion").classList.toggle("show");
  }

