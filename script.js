document.addEventListener('DOMContentLoaded', function () {
    const imagens = ['img/carrosselKids.png', 'img/carrosselFeminino.png', 'img/carrosselMasculino.png'];
    let indiceAtual = 0;

    function atualizarImagem() {
        const carrosselContainer = document.getElementById('carrosselContainer');
        const bolinhasContainer = document.querySelector('.bolinhas');

        // Atualizar bolinhas
        bolinhasContainer.innerHTML = '';
        for (let i = 0; i < imagens.length; i++) {
            const bolinha = document.createElement('div');
            bolinha.className = `bolinha ${i === indiceAtual ? 'ativa' : ''}`;
            
            // Adicionar evento de clique para cada bolinha
            bolinha.addEventListener('click', function () {
                indiceAtual = i;  // Atualiza o índice com base na bolinha clicada
                atualizarImagem(); // Atualiza a imagem do carrossel
            });
            
            bolinhasContainer.appendChild(bolinha);
        }

        // Atualizar posição do carrossel container
        carrosselContainer.style.transform = `translateX(${-(indiceAtual * 100)}%)`;
    }

    function proximaImagem() {
        indiceAtual = (indiceAtual + 1) % imagens.length; // Avançar para o próximo slide
        atualizarImagem();
    }

    function imagemAnterior() {
        indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length; // Voltar para o slide anterior
        atualizarImagem();
    }

    // Configurar intervalo para trocar de imagem a cada 5 segundos
    setInterval(proximaImagem, 5000);

    // Adicionar eventos de clique para as setas
    document.querySelector('.setinhaPrev').addEventListener('click', imagemAnterior);
    document.querySelector('.setinhaNext').addEventListener('click', proximaImagem);

    // Atualizar a imagem inicial
    atualizarImagem();
});

const imagensPorCor = {
    'Quadrado-da-meia-Color-Baby': {
        Branco: 'img-baby/MeiaBranca-Feminina.png',
        RosaClaro: 'img-baby/MeiaRosaClaro-Feminina.png',
        RosaChoque: 'img-baby/MeiaRosa-Feminina.png',
        Lilas: 'img-baby/MeiaLilas-Feminina.png',
        VerdeAgua: 'img-baby/MeiaVerdeAgua-Feminina.png'
    },

    'Quadrado-da-Meia-Desenhada-Baby-um': {
        AzulEscuro: 'img-baby/MeiaDesenhadaAzulEscuro-Feminina.png'
    },

    'Quadrado-da-Meia-Desenhada-Baby': {
        BrancoSapatilha: 'img-baby/MeiaBrancaSapatilha-Masculina.png',
        VermelhoSapatilha: 'img-baby/MeiaBrancaVermelhaSapatilha-Masculina.png',
        AzulEscuroSapatilha: 'img-baby/MeiaBrancaAzulEscuroSapatilha-Masculina.png',
        AzulClaroSapatilha: 'img-baby/MeiaBrancaAzulClaroSapatilha-Masculina.png',
        VerdeAguaSapatilha: 'img-baby/MeiaBrancaVerdeAguaSapatilha-Masculina.png'
     }

};

// Para cada quadrado de meia na seção "todas-as-meias-feminina-cano-curto"
document.querySelectorAll('.todasAsMeiasBaby-CompreJunto > div').forEach((quadrado) => {
    // Seleciona a imagem da meia dentro do quadrado atual
    const imgMeia = quadrado.querySelector('img');

    // Seleciona todas as cores disponíveis para o quadrado atual
    const cores = quadrado.querySelectorAll('.RosaClaro, .Lilas, .VerdeAgua, .RosaChoque, .Branco, .AzulEscuro, .BrancoSapatilha, .VermelhoSapatilha, .AzulEscuroSapatilha, .AzulClaroSapatilha, .VerdeAguaSapatilha');

    // Obtém o nome da classe do quadrado (primeiro nome de classe)
    const quadradoId = quadrado.className.split(' ')[0];

    // Armazena a imagem atual para restaurar depois
    let currentImage = imgMeia.src;

    // Armazena a cor selecionada pelo usuário
    let selectedColor = '';

    // Adiciona eventos para cada cor
    cores.forEach((cor) => {
        // Obtém o nome da classe da cor (ex.: preta, branca, cinza)
        const corNome = cor.className;

        // Quando o mouse está sobre a cor
        cor.addEventListener('mouseover', () => {
            // Troca a imagem da meia para a cor correspondente
            imgMeia.src = imagensPorCor[quadradoId][corNome];
        });

        // Quando o mouse sai da cor
        cor.addEventListener('mouseout', () => {
            // Restaura a imagem original da meia
            imgMeia.src = currentImage;
        });

        // Quando a cor é clicada
        cor.addEventListener('click', () => {
            // Atualiza a imagem da meia para a cor selecionada
            currentImage = imagensPorCor[quadradoId][corNome];
            selectedColor = corNome;
            imgMeia.src = currentImage;
        });
    });

    // Evento para o botão "Eu Quero!" dentro do quadrado atual
    quadrado.querySelector('.botao-euQuero').addEventListener('click', () => {
        const corSelecionada = selectedColor;

        if (corSelecionada) {
            window.location.href = `descricaoFeminina/CanoCurtoFeminina.html?cor=${corSelecionada}`;
        } else {
            alert('Por favor, selecione uma cor.');
        }
    });

});

const todasAsMeias = document.querySelector('.todasAsMeiasBaby-CompreJunto2');
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;
let indiceAtual = 0;
const totalSlides = 3; // Quantos conjuntos de 3 itens você tem
const larguraSlide = 340;

// Função para detectar o tamanho do item (muda dependendo do tamanho da tela)
function getItemWidth() {
  return window.innerWidth <= 768 ? document.querySelector('#divMeiasBaby').offsetWidth : 340;
}

// Detectar os eventos de arraste (mouse ou toque)
todasAsMeias.addEventListener('mousedown', startDrag);
todasAsMeias.addEventListener('touchstart', startDrag);
todasAsMeias.addEventListener('mouseup', endDrag);
todasAsMeias.addEventListener('touchend', endDrag);
todasAsMeias.addEventListener('mousemove', drag);
todasAsMeias.addEventListener('touchmove', drag);

// Iniciar o arraste
function startDrag(event) {
    isDragging = true;
    startPosition = getPositionX(event);
    animationID = requestAnimationFrame(animation);
}

// Terminar o arraste
function endDrag() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    
    const movedBy = currentTranslate - prevTranslate;

    // Verifica se arrastou o suficiente para mudar de item
    if (movedBy < -100 && currentIndex < todasAsMeias.children.length - 1) {
        currentIndex += 1;
    }

    if (movedBy > 100 && currentIndex > 0) {
        currentIndex -= 1;
    }

    setPositionByIndex();
}

// Lógica de arraste
function drag(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPosition;
    }
}

// Pega a posição X (suporte para mouse e touch)
function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

// Faz a animação do arraste
function animation() {
    setCarouselPosition();
    if (isDragging) requestAnimationFrame(animation);
}

// Atualiza a posição do carrossel no CSS
function setCarouselPosition() {
    todasAsMeias.style.transform = `translateX(${currentTranslate}px)`;
}

// Alinha o carrossel conforme o índice atual
function setPositionByIndex() {
    const itemWidth = getItemWidth(); // Verifica a largura do item para o redimensionamento correto
    currentTranslate = currentIndex * -itemWidth;
    prevTranslate = currentTranslate;
    setCarouselPosition();
}

function mudarSlide(indice) {
    const carrossel = document.querySelector('.todasAsMeiasBaby-CompreJunto2');
    indiceAtual = indice;
    const deslocamento = indiceAtual * larguraSlide * 3;
    carrossel.style.transform = `translateX(-${deslocamento}px)`;
    
    atualizarTracinhos();
}

function atualizarTracinhos() {
    const tracinhos = document.querySelectorAll('.ponto');
    tracinhos.forEach((ponto, index) => {
        ponto.classList.toggle('active', index === indiceAtual);
    });
}

// Inicializar o primeiro tracinho como ativo
atualizarTracinhos();

// Atualiza a posição quando a tela redimensionar
window.addEventListener('resize', setPositionByIndex);

