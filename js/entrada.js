const cena = document.getElementById("cena-cidade");
const portal = document.getElementById("portal");

document.getElementById("btn-entrar").addEventListener("click", () => {
  portal.style.opacity = "1";
  portal.style.transform = "scale(1)";
  portal.classList.add("ativo");
  cena.style.opacity = "0";
  cena.style.transform = "scale(1.18)";

  // portal cresce até engolir a tela
  setTimeout(() => {
    portal.style.transform = "scale(7)";
    portal.style.opacity = "0";
  }, 1300);

  // vai para a página principal
  setTimeout(() => {
    window.location.href = "portifolio.html";
  }, 1900);
});