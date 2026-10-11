document.addEventListener("DOMContentLoaded", function () {
  window.ativarInclinacao = function () {
  const fotosDeProduto = document.querySelectorAll(".produto-imagem");

  fotosDeProduto.forEach((foto) => {
    if (foto.dataset.inclinacao) return;
    foto.dataset.inclinacao = "1";
    const card = foto.closest(".produto");
    if (!card) return;

    card.style.perspective = "700px";

    foto.addEventListener("mousemove", function (evento) {
      const retangulo = foto.getBoundingClientRect();

      const x = ((evento.clientX - retangulo.left) / retangulo.width) * 2 - 1;
      const y = ((evento.clientY - retangulo.top) / retangulo.height) * 2 - 1;

      const ANGULO_MAXIMO = 10;

      foto.style.transform = `
        rotateX(${-y * ANGULO_MAXIMO}deg)
        rotateY(${x * ANGULO_MAXIMO}deg)
        scale(1.04)
      `;
    });

    foto.addEventListener("mouseleave", function () {
      foto.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });
  });
  };
  window.ativarInclinacao();
});
