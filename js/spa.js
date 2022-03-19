"use strict";
document.addEventListener("DOMContentLoaded", charge);
function charge() {
  window.onload = (event) => {
    window["home"].addEventListener("click", (event) => push(event));
    window["casitaDelHorrorVII"].addEventListener("click", (event) => push(event));
    window["SoloSeMudaDosVeces"].addEventListener("click", (event) => push(event));
    load_content("home");
  };

   window.addEventListener("popstate", (event) => {
    let stateId = event.state.id;
    console.log("stateId = ", stateId);
    load_content(stateId);
  });

  function push(event) {
      event.preventDefault();
    let id = event.target.id;
    document.title = id;
    load_content(id);
    window.history.pushState({ id }, `${id}`, `/page/${id}`);
  }

  async function load_content(id) {
    console.log("Loading content for {" + id + "}");
    let container = document.querySelector(".container");
    try {
      let response = await fetch(`${window.location.origin}/${id}.html`);
      if (response.ok) {
        let content = await response.text();
        container.innerHTML = content;
        let img = 0;
        chargeMenu()
        if (id == "home"){
          chargeHome();
          img = "los simpson";
        }if (id == "casitaDelHorrorVII"){
          img = "casitaDelHorrorImg1";
        }if (id == "SoloSeMudaDosVeces") {
          img = "hank-scorpio-lanzallamas";
        }
        container.querySelector(".img").src = `${window.location.origin}/images/${img}.jpg`
      } else {
        container.innerHTML = "Content loading for /" + id + "...";
      }
    } catch (error) {
      container.innerHTML = "Error";
    }
  }
}