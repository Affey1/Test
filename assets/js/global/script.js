const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

// Lógica para o menu hamburger
hamburger.addEventListener("click", () => nav.classList.toggle("active"));

document.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('corSelecionada'); // Obtém a cor salva

    if (savedColor) {
        document.body.style.background = savedColor; // Aplica a cor ao fundo
    }
});
