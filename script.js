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

    // Configurar intervalo para trocar de imagem a cada 3 segundos
    setInterval(proximaImagem, 5000);

    // Adicionar evento de clique para voltar para a imagem anterior
    document.querySelector('.carrossel').addEventListener('click', imagemAnterior);

    // Atualizar a imagem inicial
    atualizarImagem();

});