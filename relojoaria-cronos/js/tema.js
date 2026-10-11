(function () {
  const CHAVE_TEMA = "relojoaria_tema";

  const ICONE_SOL = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const ICONE_LUA = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';

  if (localStorage.getItem(CHAVE_TEMA) !== "escuro") {
    document.documentElement.setAttribute("data-tema", "claro");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const cabecalho = document.querySelector(".cabecalho");
    if (!cabecalho) return;
    if (document.body.hasAttribute("data-sem-botao-tema")) return;

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "botao-tema";

    function pintarBotao() {
      const claro = document.documentElement.getAttribute("data-tema") === "claro";
      botao.innerHTML = claro ? ICONE_LUA : ICONE_SOL;
      botao.setAttribute("aria-label", claro ? "Ativar modo escuro" : "Ativar modo claro");
    }

    botao.addEventListener("click", function () {
      const claro = document.documentElement.getAttribute("data-tema") === "claro";
      if (claro) {
        document.documentElement.removeAttribute("data-tema");
        localStorage.setItem(CHAVE_TEMA, "escuro");
      } else {
        document.documentElement.setAttribute("data-tema", "claro");
        localStorage.setItem(CHAVE_TEMA, "claro");
      }
      pintarBotao();
    });

    pintarBotao();
    cabecalho.appendChild(botao);
  });
})();
