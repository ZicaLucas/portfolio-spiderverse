/* O filtro, escrito como texto SVG
   Ordem dos passos dentro do <filter>:
   a) feTurbulence  -> gera um ruído (mapa de distorção)
   b) feDisplacementMap -> usa o ruído pra entortar o texto (tinta)
   c) feOffset + feColorMatrix -> cria as cópias vermelha e ciano
   d) feBlend -> junta tudo                                        */
const SVG_FILTER = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <filter id="ink-rgb" x="-25%" y="-25%" width="150%" height="150%">
      <!-- a) ruído. baseFrequency baixo = ondas largas e suaves -->
      <feTurbulence type="fractalNoise" baseFrequency="0.015"
                    numOctaves="2" seed="4" result="noise" id="hero-turb"/>

      <!-- b) distorção. scale = força do entortamento (6 = sutil) -->
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="6"
                         xChannelSelector="R" yChannelSelector="G" result="warp"/>

      <!-- c) cópia vermelha deslocada pra esquerda -->
      <feOffset in="warp" dx="-4" dy="0" result="r"/>
      <feColorMatrix in="r" type="matrix"
        values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="rRed"/>

      <!-- cópia ciano deslocada pra direita -->
      <feOffset in="warp" dx="4" dy="0" result="c"/>
      <feColorMatrix in="c" type="matrix"
        values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="cCyan"/>

      <!-- d) junta vermelho + ciano (screen) e por cima o texto original -->
      <feBlend in="rRed" in2="cCyan" mode="screen" result="rgb"/>
      <feBlend in="rgb" in2="warp" mode="normal"/>
    </filter>
  </defs>
</svg>`;

/* Injeta o filtro no começo do body */
document.body.insertAdjacentHTML("afterbegin", SVG_FILTER);

/* Animação: faz a distorção "respirar" */
const prefereMenosMovimento = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefereMenosMovimento) {
  const turb = document.getElementById("hero-turb");
  let t = 0;
  function animar() {
    t += 0.01;
    const freq = 0.015 + Math.sin(t) * 0.006;
    turb.setAttribute("baseFrequency", freq.toFixed(4));
    requestAnimationFrame(animar);
  }
  requestAnimationFrame(animar);
}
