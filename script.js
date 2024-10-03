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
        Branco: '../img-baby/MeiaBranca-Feminina.png',
        RosaClaro: '../img-baby/MeiaRosaClaro-Feminina.png',
        RosaChoque: '..img-baby/MeiaRosaChoque-Feminina.png',
        Lilas: '../img-baby/MeiaLilas-Feminina.png',
        VerdeAgua: '../img-baby/MeiaVerdeAgua-Feminina.png'
    },

    'Quadrado-da-Meia-Desenhada-Baby': {
        BrancoSapatilha: '../img-baby/MeiaBrancaSapatilha-Masculina.png',
        VermelhoSapatilha: '../img-baby/MeiaBrancaVermelhaSapatilha-Masculina.png',
        AzulEscuroSapatilha: '../img-baby/MeiaBrancaAzulEscuroSapatilha-Masculina.png',
        AzulClaroSapatilha: '../img-baby/MeiaBrancaAzulClaroSapatilha-Masculina.png',
        VerdeAguaSapatilha: '../img-baby/MeiaBrancaVerdeAguaSapatilha-Masculina.png'
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