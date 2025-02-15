import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
    // Init Lenis pour le scroll fluide
    const lenis = new Lenis({
        smooth: true,
        lerp: 0.1,
        smoothWheel: true,
        smoothTouch: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sélectionne toutes les sections
    const sections = document.querySelectorAll(".section");

    sections.forEach((section, index) => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onEnter: () => scrollToSection(index),
            onEnterBack: () => scrollToSection(index),
        });
    });

    function scrollToSection(index) {
        const target = sections[index];
        lenis.scrollTo(target, { duration: 1, easing: "easeOut" });
    }
});
