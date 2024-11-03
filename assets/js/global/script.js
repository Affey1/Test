const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
const poemDisplay = document.getElementById("poemDisplay"); // Seleciona a div para exibir o poema

// Lógica para o menu hamburger
hamburger.addEventListener("click", () => nav.classList.toggle("active"));

document.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('corSelecionada'); // Obtém a cor salva
    const savedPoem = localStorage.getItem('poemaSelecionado'); // Obtém o poema salvo

    if (savedColor) {
        document.body.style.background = savedColor; // Aplica a cor ao fundo
    }
    if (savedPoem) {
        poemDisplay.innerText = savedPoem; // Exibe o poema na div poemDisplay
    }
});
