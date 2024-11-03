const slider = document.getElementById('slider');
const colorToggle = document.getElementById('colorToggle');
const markers = document.querySelectorAll('.marker');
const sliderImage = document.getElementById('sliderImage');
const poemDisplay = document.getElementById('poemDisplay');

const markerPositions = Array.from(markers).map(marker => parseInt(marker.style.left));

const gradients = [
    '#87CEFA', // Inverno (azul claro)
    '#FFDEAD', // Outono (bege)
    '#98FB98', // Primavera (verde claro)
    '#e6ff66'  // Verão (amarelo)
];

const images = [
    'assets/images/pages/popup/inverno.png',
    'assets/images/pages/popup/outono.png',
    'assets/images/pages/popup/primavera.png',
    'assets/images/pages/popup/verão.png'
];

const poems = [
    'O frio envolve a terra, \num suspiro da neve, \numa dança de calma e paz.', // Inverno
    'Folhas caem suavemente, \num tapete de tons dourados, \noutrora verde, agora sereno.', // Outono
    'Flores surgem no campo, \num arco-íris de vida, \num renascimento colorido.', // Primavera
    'O sol brilha intenso, \num calor que abraça, \numa celebração de luz.' // Verão
];

let isDragging = false;
let clickCount = 0;
let clickTimeout;

// Função para mudar o fundo e a imagem
function changeBackgroundColorAndImage(position) {
    const index = markerPositions.indexOf(position);
    if (index !== -1) {
        const selectedColor = gradients[index];
        document.body.style.background = selectedColor; // Muda o fundo do body
        document.querySelector('.nav-list').style.background = selectedColor; // Altera a cor da nav-list
        sliderImage.src = images[index];
        poemDisplay.innerText = poems[index];

        // Salva a cor selecionada no localStorage
        localStorage.setItem('corSelecionada', selectedColor);
    }
}

// Função para mover o slider para o marcador mais próximo
function moveSliderToClosestMarker(newLeft) {
    const sliderWidth = slider.offsetWidth;
    let closestMarker = markerPositions[0];

    markerPositions.forEach(position => {
        if (Math.abs(newLeft + sliderWidth / 2 - position) < Math.abs(newLeft + sliderWidth / 2 - closestMarker)) {
            closestMarker = position;
        }
    });

    slider.style.left = (closestMarker - sliderWidth / 2) + 'px';
    changeBackgroundColorAndImage(closestMarker);
}

// Função para arrastar o slider
function dragSlider(e) {
    const toggleRect = colorToggle.getBoundingClientRect();
    const sliderWidth = slider.offsetWidth;
    const maxLeft = toggleRect.width - sliderWidth;

    let newLeft = e.clientX - toggleRect.left - sliderWidth / 2;
    if (newLeft < 0) newLeft = 0;
    if (newLeft > maxLeft) newLeft = maxLeft;

    slider.style.left = newLeft + 'px';
}

slider.addEventListener('mousedown', (e) => {
    clickCount++;
    if (clickCount > 1) {
        e.preventDefault();
        clearTimeout(clickTimeout);
        clickCount = 0;
        return;
    }

    clickTimeout = setTimeout(() => {
        clickCount = 0;
    }, 300);

    isDragging = true;

    const mouseMoveHandler = (e) => {
        if (isDragging) {
            dragSlider(e);
        }
    };

    const mouseUpHandler = (e) => {
        isDragging = false;
        moveSliderToClosestMarker(slider.offsetLeft);
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
});

slider.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Inicializa a posição do slider
document.addEventListener('DOMContentLoaded', () => {
    // Mover o slider para a posição do primeiro marcador por padrão
    changeBackgroundColorAndImage(markerPositions[0]);

    // Aplicar a cor armazenada do localStorage se existir
    const savedColor = localStorage.getItem('corSelecionada');
    if (savedColor) {
        document.body.style.background = savedColor;
        document.querySelector('.nav-list').style.background = savedColor; // Aplica a cor ao nav-list
    } else {
        // Se não houver cor salva, defina uma cor padrão
        const defaultColor = '#FFFFFF'; // Cor padrão
        document.body.style.background = defaultColor;
        document.querySelector('.nav-list').style.background = defaultColor; // Cor padrão para nav-list
    }
});

// Lógica do toggle
colorToggle.addEventListener('change', () => {
    const isChecked = colorToggle.checked;
    const newTheme = isChecked ? 'dark-theme' : 'light-theme';
    changeTheme(newTheme); // Altera o tema
});

// Função para mudar o tema
function changeTheme(theme) {
    document.body.className = theme; // Altera a classe do body conforme necessário
}

// Função para redirecionar e salvar a cor
function redirectToSite() {
    const currentColor = document.body.style.backgroundColor; // Obtém a cor atual
    localStorage.setItem('corSelecionada', currentColor); // Salva a cor no localStorage
    window.location.href = 'https://affey1.github.io/Test/index1.html#'; // Substitua pela URL desejada
}
