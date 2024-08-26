import { trocarTema, verificarTema } from "../../Helpers/tema-helper.js";

const botaoTema = document.querySelector(".tema button");
const body = document.querySelector("body");

botaoTema.addEventListener("click", () => {
    trocarTema(botaoTema, body);
});

verificarTema(botaoTema, body);

const assunto = localStorage.getItem("assunto");

function alterarAssunto() {
    const divIcone = document.querySelector(".assunto-icone");
    const iconeImg = document.querySelector(".assunto-icone img");
    const assuntoTitulo = document.querySelector(".assunto h1");

    divIcone.classList.add(assunto.toLowerCase());
    iconeImg.setAttribute("src", `../../assets/images/icon-${assunto.toLowerCase()}.svg`);
    iconeImg.setAttribute("alt", `Ícone de ${assunto}`);
    assuntoTitulo.innerHTML = assunto;
}

alterarAssunto();