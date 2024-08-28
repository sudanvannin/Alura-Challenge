const mapaSubstituicoes = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat"
};

const mapaInverso = Object.fromEntries(
    Object.entries(mapaSubstituicoes).map(([chave, valor]) => [valor, chave])
);

function processarTexto(texto, mapa) {
    return texto.toLowerCase().replace(/[aeiou]/g, letra => mapa[letra] || letra);
}

function codificarTexto(texto) {
    return processarTexto(texto, mapaSubstituicoes);
}

function decodificarTexto(texto) {
    const padrao = new RegExp(Object.keys(mapaInverso).join("|"), "g");
    return texto.replace(padrao, match => mapaInverso[match]);
}

function atualizarInterface(resultado) {
    const elementoResultado = document.getElementById("resultado");
    const conteudoPadrao = document.getElementById("conteudo-padrao");
    const btnCopiar = document.getElementById("btn-copiar");
    const saidaTexto = document.querySelector(".saida-texto");

    if (resultado) {
        elementoResultado.value = resultado;
        elementoResultado.style.display = "block";
        conteudoPadrao.style.display = "none";
        btnCopiar.style.display = "block";
        saidaTexto.style.justifyContent = "space-between";
    } else {
        elementoResultado.style.display = "none";
        conteudoPadrao.style.display = "flex";
        btnCopiar.style.display = "none";
        saidaTexto.style.justifyContent = "center";
    }
}

function manipularTexto(funcaoProcessamento) {
    const textoOriginal = document.getElementById("texto-original").value;
    const resultado = funcaoProcessamento(textoOriginal);
    atualizarInterface(resultado);
}

document.getElementById("criptografar").addEventListener("click", () => manipularTexto(codificarTexto));
document.getElementById("descriptografar").addEventListener("click", () => manipularTexto(decodificarTexto));

document.getElementById("btn-copiar").addEventListener("click", async () => {
    const textoParaCopiar = document.getElementById("resultado").value;
    await navigator.clipboard.writeText(textoParaCopiar);
    alert("Texto copiado para a área de transferência!");
});
