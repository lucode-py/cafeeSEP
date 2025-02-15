import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  smooth: true, // Scroll fluide
  lerp: 0.1, // Paramètre de lissage
});

function raf(time) {
  lenis.raf(time);  // Mettre à jour Lenis à chaque frame
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
