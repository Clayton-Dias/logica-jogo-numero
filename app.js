// Lista para armazenar os números sorteados, para evitar repetições
let listaNumerosSorteados = [];
// Limite superior para o número aleatório gerado
let numeroLimite = 10;
// Variável que armazena o número secreto gerado aleatoriamente
let numeroSecreto = gerarNumeroAleatorio();
// Variável que conta o número de tentativas do jogador
let tentativas = 1;

// Função para exibir texto na tela e também falar o texto em voz alta
function exibirTextoNaTela(tag, texto) {
    // Seleciona o elemento HTML pela tag
    let campo = document.querySelector(tag);
    // Atualiza o conteúdo do elemento HTML com o texto
    campo.innerHTML = texto;
    // Usa a biblioteca responsiveVoice para falar o texto em português
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

// Função que exibe a mensagem inicial do jogo
function exibirMensagemInical() {
    // Exibe o título e a instrução do jogo na tela
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}
// Chama a função para exibir a mensagem inicial
exibirMensagemInical();

// Função que gera um número aleatório entre 1 e numeroLimite (no caso, 10)
function gerarNumeroAleatorio() {
    // Gera um número aleatório entre 1 e numeroLimite
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    // Verifica quantos números já foram sorteados
    let qtdElementosNaLista = listaNumerosSorteados.length;

    // Se todos os números já foram sorteados, limpa a lista para recomeçar
    if (qtdElementosNaLista == numeroLimite) {
        listaNumerosSorteados = [];
    }

    // Se o número sorteado já foi escolhido antes, chama a função novamente para gerar um novo número
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        // Se o número não foi sorteado antes, adiciona à lista e retorna o número
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }    
}

// Função que verifica o chute do jogador
function verificarChute() {
    // Pega o valor do campo de input (o chute do jogador)
    let chute = document.querySelector('input').value;

    // Verifica se o chute do jogador é igual ao número secreto
    if (chute == numeroSecreto) {
        // Se acertou, exibe uma mensagem de vitória
        exibirTextoNaTela('h1', 'Acertou');
        
        // Define a palavra correta para "tentativa" ou "tentativas" dependendo do número de tentativas
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        
        // Exibe a mensagem informando quantas tentativas foram usadas
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa} !`;
        exibirTextoNaTela('p', mensagemTentativa);

        // Habilita o botão de reiniciar para o jogador começar de novo
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        // Se o chute for maior que o número secreto
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            // Se o chute for menor que o número secreto
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        // Incrementa o número de tentativas
        tentativas++;
        // Limpa o campo de input após cada tentativa
        limparCampo();
    }
}

// Função para limpar o campo de entrada onde o jogador coloca o chute
function limparCampo() {
    // Seleciona o campo de input e limpa o valor
    chute = document.querySelector('input');
    chute.value = '';
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    // Exibe a mensagem inicial novamente
    exibirMensagemInical();
    // Gera um novo número secreto aleatório
    numeroSecreto = gerarNumeroAleatorio();
    // Limpa o campo de input
    limparCampo();
    // Reseta o contador de tentativas para 1
    tentativas = 1;
    
    // Desabilita o botão de reiniciar até que o jogo seja vencido
    document.getElementById('reiniciar').setAttribute('disable', true);
}
