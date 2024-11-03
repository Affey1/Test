const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

// Lógica para o menu hamburger
hamburger.addEventListener("click", () => nav.classList.toggle("active"));
