// Variáveis globais
let numeroSecreto;
let numeroTentativas;
const MAX_TENTATIVAS = 10;

// Elementos do DOM
const alertMsg = document.getElementById("alert-msg");
const tentativasOutput = document.getElementById("tentativas-output");
const inputPalpite = document.getElementById("numero-palpite");
const botaoEnviar = document.getElementById("botao-enviar");
const botaoNovoJogo = document.getElementById("botao-novo-jogo");

// Inicia um novo jogo
function novoJogo() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    numeroTentativas = 0;
    
    // Limpa os elementos
    alertMsg.innerHTML = "";
    tentativasOutput.innerHTML = "";
    inputPalpite.value = "";
    inputPalpite.focus();
    
    // Habilita o input e botão
    inputPalpite.disabled = false;
    botaoEnviar.disabled = false;
}

// Verifica o palpite do jogador
function verificarPalpite() {
    const palpite = parseInt(inputPalpite.value);
    
    // Validação básica
    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        alertMsg.innerHTML = `<div class="alert alert-danger">Digite um número entre 1 e 100!</div>`;
        return;
    }
    
    numeroTentativas++;
    
    // Adiciona ao histórico
    tentativasOutput.innerHTML += `<p>${numeroTentativas}ª Tentativa: ${palpite}</p>`;
    
    // Verifica o palpite
    if (palpite > numeroSecreto) {
        alertMsg.innerHTML = `<div class="alert alert-warning">Seu palpite é <strong>maior</strong> que o número secreto!</div>`;
    } else if (palpite < numeroSecreto) {
        alertMsg.innerHTML = `<div class="alert alert-warning">Seu palpite é <strong>menor</strong> que o número secreto!</div>`;
    } else {
        alertMsg.innerHTML = `<div class="alert alert-success">Parabéns!! Você acertou em ${numeroTentativas} tentativas!</div>`;
        inputPalpite.disabled = true;
        botaoEnviar.disabled = true;
        return;
    }
    
    // Verifica se acabaram as tentativas
    if (numeroTentativas >= MAX_TENTATIVAS) {
        alertMsg.innerHTML = `<div class="alert alert-danger">GAME OVER! O número era ${numeroSecreto}</div>`;
        inputPalpite.disabled = true;
        botaoEnviar.disabled = true;
    }
    
    // Limpa o input para o próximo palpite
    inputPalpite.value = "";
    inputPalpite.focus();
}

// Event Listeners
document.addEventListener("DOMContentLoaded", novoJogo);
botaoNovoJogo.addEventListener("click", novoJogo);
botaoEnviar.addEventListener("click", verificarPalpite);