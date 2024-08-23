import { trocarTema, verificarTema } from "../../Helpers/tema-helper.js";

const botaoTema = document.querySelector(".tema button");
const body = document.querySelector("body");

botaoTema.addEventListener("click", () => {
    trocarTema(botaoTema, body);
});

verificarTema(botaoTema, body);