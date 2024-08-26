import { trocarTema, verificarTema } from "./Helpers/tema-helper.js";

const botaoTema = document.querySelector(".tema button");
const body = document.querySelector("body");

botaoTema.addEventListener("click", () => {
    trocarTema(botaoTema, body);
});

verificarTema(botaoTema, body);

const botoesAssunto = document.querySelectorAll(".assuntos button");
botoesAssunto.forEach(botao => {
    botao.addEventListener("click", selecionarAssunto)
})

function selecionarAssunto(evento) {
    const assunto = evento.target.innerText;
    console.log(assunto);
    localStorage.setItem("assunto", assunto);
    window.location.href = "./pages/quiz/quiz.html";
}