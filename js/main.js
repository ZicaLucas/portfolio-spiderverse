// Pega o container onde os cards vão entrar
const grid = document.getElementById("grid-projetos");

// Para cada projeto do array, cria um card e adiciona na grade
PROJETOS.forEach((p) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <span class="card__tag">${p.tag}</span>
    <h3 class="card__title">${p.titulo}</h3>
    <p class="card__desc">${p.descricao}</p>
    ${p.link ? `<a href="${p.link}" class="card__link" target="_blank" rel="noopener">Ver projeto →</a>` : ""}
  `;
  grid.appendChild(card);
});

// Rolagem suave ao clicar nos links do menu
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const alvo = document.querySelector(link.getAttribute("href"));
    if (alvo) {
      e.preventDefault();
      alvo.scrollIntoView({ behavior: "smooth" });
    }
  });
});