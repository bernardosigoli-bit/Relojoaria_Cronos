(function () {
  const ICONE_LUPA = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>';

  function normalizar(texto) {
    return String(texto).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  document.addEventListener("DOMContentLoaded", function () {
    const cabecalho = document.querySelector(".cabecalho");
    if (!cabecalho || typeof produtos === "undefined") return;

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "botao-busca";
    botao.innerHTML = ICONE_LUPA;
    botao.setAttribute("aria-label", "Pesquisar relógios");
    botao.setAttribute("aria-expanded", "false");

    const botaoTema = cabecalho.querySelector(".botao-tema");
    cabecalho.insertBefore(botao, botaoTema);

    const painel = document.createElement("div");
    painel.className = "painel-busca";
    painel.hidden = true;
    painel.innerHTML =
      '<form class="painel-busca-form" role="search">' +
      '<input type="search" id="campo-busca-global" placeholder="Pesquisar relógio pelo nome" aria-label="Pesquisar relógio pelo nome" autocomplete="off" />' +
      '<button type="button" class="painel-busca-fechar" aria-label="Fechar pesquisa">✕</button>' +
      "</form>" +
      '<ul class="resultados-busca" id="resultados-busca" aria-live="polite"></ul>';
    document.body.appendChild(painel);

    const campo = painel.querySelector("input");
    const lista = painel.querySelector("#resultados-busca");

    function posicionar() {
      painel.style.top = cabecalho.offsetHeight + "px";
    }

    function formatar(valor) {
      return typeof formatarPreco === "function" ? formatarPreco(valor) : "R$ " + valor.toFixed(2);
    }

    function desenhar() {
      const termo = normalizar(campo.value.trim());
      if (termo === "") {
        lista.innerHTML = '<li class="busca-aviso">Digite o nome do relógio ou da marca.</li>';
        return;
      }
      const achados = produtos.filter((p) => normalizar(p.nome + " " + p.marca).includes(termo)).slice(0, 8);
      if (achados.length === 0) {
        lista.innerHTML = '<li class="busca-aviso">Nenhum relógio encontrado para "' + campo.value.trim().replace(/</g, "&lt;") + '".</li>';
        return;
      }
      lista.innerHTML = achados
        .map(
          (p) => `
          <li>
            <a href="produto.html?id=${p.id}">
              <span class="busca-foto"><img src="${p.imagem}" alt="" onerror="this.style.display='none'"></span>
              <span class="busca-texto"><strong>${p.nome}</strong><small>${p.marca}</small></span>
              <span class="busca-preco">${formatar(p.preco)}</span>
            </a>
          </li>`
        )
        .join("");
    }

    function abrir() {
      posicionar();
      painel.hidden = false;
      botao.setAttribute("aria-expanded", "true");
      desenhar();
      campo.focus();
    }

    function fechar() {
      painel.hidden = true;
      botao.setAttribute("aria-expanded", "false");
      campo.value = "";
    }

    botao.addEventListener("click", function () {
      if (painel.hidden) abrir();
      else fechar();
    });

    painel.querySelector(".painel-busca-fechar").addEventListener("click", fechar);
    campo.addEventListener("input", desenhar);

    painel.querySelector("form").addEventListener("submit", function (evento) {
      evento.preventDefault();
      const primeiro = lista.querySelector("a");
      if (primeiro) window.location.href = primeiro.getAttribute("href");
    });

    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape" && !painel.hidden) {
        fechar();
        botao.focus();
      }
    });

    document.addEventListener("click", function (evento) {
      if (!painel.hidden && !painel.contains(evento.target) && !botao.contains(evento.target)) fechar();
    });

    window.addEventListener("scroll", function () {
      if (!painel.hidden) posicionar();
    });
  });
})();
