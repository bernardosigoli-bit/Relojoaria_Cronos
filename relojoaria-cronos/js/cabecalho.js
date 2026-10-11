document.addEventListener("DOMContentLoaded", function () {
  const cabecalho = document.querySelector(".cabecalho");
  if (!cabecalho) return;

  document.body.style.paddingTop = cabecalho.offsetHeight + "px";

  const LIMITE_ROLAGEM = 60;

  function verificarRolagem() {
    if (window.scrollY > LIMITE_ROLAGEM) {
      cabecalho.classList.add("rolado");
    } else {
      cabecalho.classList.remove("rolado");
    }
  }

  window.addEventListener("scroll", verificarRolagem);
  verificarRolagem();
});
