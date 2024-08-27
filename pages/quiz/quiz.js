import { trocarTema, verificarTema } from "../../Helpers/tema-helper.js";

const botaoTema = document.querySelector(".tema button");
const body = document.querySelector("body");
const assunto = localStorage.getItem("assunto");

let quiz = {};
let pontos = 0;
let pergunta = 1;
let resposta = "";
let idInputResposta = "";
let respostaCorretaId = "";

botaoTema.addEventListener("click", () => {
    trocarTema(botaoTema, body);
});

verificarTema(botaoTema, body);

function alterarAssunto() {
    const divIcone = document.querySelector(".assunto-icone");
    const iconeImg = document.querySelector(".assunto-icone img");
    const assuntoTitulo = document.querySelector(".assunto h1");

    divIcone.classList.add(assunto.toLowerCase());
    iconeImg.setAttribute("src", `../../assets/images/icon-${assunto.toLowerCase()}.svg`);
    iconeImg.setAttribute("alt", `Ícone de ${assunto}`);
    assuntoTitulo.innerHTML = assunto;
}

async function buscarPerguntas() {
    const urlDados = "../../data.json";

    await fetch(urlDados).then(resposta => resposta.json()).then(dados => {
        dados.quizzes.forEach(dado => {
            if (dado.title === assunto){
                quiz = dado;
            }
        })
    })

    console.log(quiz);
}

function montarPerguntar() {
    const main = document.querySelector("main");

    main.innerHTML = `
        <section class="pergunta">
            <div>
                <p>Questão ${pergunta} de 10</p>

                <h2>${alterarSinais(quiz.questions[pergunta-1].question)}</h2>
            </div>
        
            <div class="barra-progresso">
                <div style="width: ${pergunta*10}%"></div>
            </div>
        </section>

        <section class="alternativas">
            <form action="">
                <label for="alternativa-a">
                    <input type="radio" id="alternativa-a" name="alternativa" value="${alterarSinais(quiz.questions[pergunta-1].options[0])}">

                    <div>
                        <span>A</span>
                        ${alterarSinais(quiz.questions[pergunta-1].options[0])}
                    </div>
                </label>

                <label for="alternativa-b">
                    <input type="radio" id="alternativa-b" name="alternativa" value="${alterarSinais(quiz.questions[pergunta-1].options[1])}">

                    <div>
                        <span>B</span>
                        ${alterarSinais(quiz.questions[pergunta-1].options[1])}
                    </div>
                </label>

                <label for="alternativa-c">
                    <input type="radio" id="alternativa-c" name="alternativa" value="${alterarSinais(quiz.questions[pergunta-1].options[2])}">

                    <div>
                        <span>C</span>
                        ${alterarSinais(quiz.questions[pergunta-1].options[2])}
                    </div>
                </label>

                <label for="alternativa-d">
                    <input type="radio" id="alternativa-d" name="alternativa" value="${alterarSinais(quiz.questions[pergunta-1].options[3])}">

                    <div>
                        <span>D</span>
                        ${alterarSinais(quiz.questions[pergunta-1].options[3])}
                    </div>
                </label>
            </form>

            <button>Responder</button>
        </section>
    `
}

function alterarSinais(texto) {
    return texto.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function guardarResposta(evento) {
    resposta = evento.target.value;
    idInputResposta = evento.target.id;

    const butaoEnviar = document.querySelector(".alternativas button");

    butaoEnviar.addEventListener("click", validarResposta);
}

function validarResposta() {
    const botaoEnviar = document.querySelector(".alternativas button");
    botaoEnviar.innerHTML = "Próxima"
    botaoEnviar.removeEventListener("click", validarResposta);

    if (pergunta === 10) {
        botaoEnviar.innerHTML = "Finalizar";
        botaoEnviar.addEventListener("click", finalizar);
    }
    else {
        botaoEnviar.addEventListener("click", proximaPergunta);
    }

    if (resposta === quiz.questions[pergunta-1].answer) {
        document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id", "correta");
    }
    else {
        document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id", "errada");
        document.querySelector(`label[for='${respostaCorretaId}']`).setAttribute("id", "correta");
    }

    const inputs = document.querySelectorAll(".alternativas input");
    inputs.forEach(input => {
        input.setAttribute("disabled", "true");
    })

    pergunta = pergunta + 1;
}

function finalizar() {
    localStorage.setItem("pontos", pontos);

    window.location.href = "../resultado/resultado.html"
}

function proximaPergunta() {
    montarPerguntar();
    adicionarEventoInputs();
}

function adicionarEventoInputs() {
    const inputsResposta = document.querySelectorAll(".alternativas input");
    inputsResposta.forEach(input => {
        input.addEventListener("click", guardarResposta);

        if (input.value === quiz.questions[pergunta-1].answer) {
            respostaCorretaId = input.id;
        }
    })
}

async function iniciar() {
    alterarAssunto();
    await buscarPerguntas();
    montarPerguntar();
    adicionarEventoInputs();
}

iniciar();