import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import About from "./components/About";
import Carousel from "./components/Carousel";
import RendezVous from "./components/RendezVous";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [textes, setTextes] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/textes/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Données reçues:", data);
        setTextes(data);
      })
      .catch((error) => console.error("Erreur de chargement des textes:", error));

    const lenis = new Lenis({
      duration: 1.5, // Augmente la durée pour un scroll plus doux
      smooth: true,
      ease: "easeOutQuad",
      gestureOrientation: "vertical", 
      wheelMultiplier: 0.8, // Réduit la sensibilité du scroll
      normalizeWheel: true,
      smoothTouch: true, // Active le smooth sur mobile
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    let sections = gsap.utils.toArray("section"),
    currentSection = sections[0];

  // stretch out the body height according to however many sections there are. 
  gsap.set("body", {height: (sections.length * 100) + "%"});

  // create a ScrollTrigger for each section
  sections.forEach((section, i) => {
    
    const st = ScrollTrigger.create({
      // use dynamic scroll positions based on the window height (offset by half to make it feel natural)
      /*pinned: true,
      start: () => (i - 0.1) * innerHeight,
      end: () => (i + 0.2) * innerHeight,
      onToggle: self => self.isActive && setSection(section),
      markers: true,
      id: "sec-" + i,
      trigger: section,
      scrub: 1, // Augmente la valeur pour un effet plus fluide
      snap: {
        snapTo: 1 / (sections.length - 1),
        duration: 0.8, // Rend le snap plus doux
        ease: "power2.out",
      },*/

      

      
    
      
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: 0.8,
            ease: "power2.out",
          },
          markers: false, // Désactive les markers
        });
      });

    });
    section._st = st;
  });

  function setSection(newSection) {
    if (newSection !== currentSection) {
      
      // new section timeline
      var tl = gsap.timeline({ 
        defaults: { 
          duration: 0.5
        } 
      })
        tl.to(newSection, {scale: 1, autoAlpha: 1})
          .to(currentSection, {scale: 1.2, autoAlpha: 0}, "<")
          .from(newSection.querySelector("h1"), { autoAlpha: 0, y: 50 }, "<")
          .from(newSection.querySelector("p"), { autoAlpha: 0, y: 20 }, ">" );

      currentSection = newSection;
    }
  }
  ScrollTrigger.create({
    start: 1,
  }).scroll(2);

  // manual anchor tags effect 


  let offsetPositions = []
  let container = document.querySelector('section');
  let containerWidth = container.offsetHeight

  // work out what percentage of the distance into the container the box's center is and push that value into an array

  // could we ever get any anchors to work dynamically? Unsure of whether to scrollto an offsetheight or something would work with ScrollToPlugin
  gsap.utils.toArray(".slide2-link").forEach(function(a) {
    a.addEventListener("click", function(e) {
      e.preventDefault();
      gsap.to(window, { scrollTo: {y: sections[2]._st.end } });
    });
  });

}, []);

  return (
    <div ref={containerRef} className="slides-wrapper">
      <section id="intro" className="intro panel">
        <div className="fixed-container"> 
            <Header />
        </div>
      </section>
      <section id="one" className="first panel">
        <div className="fixed-container">
            <About textes={textes} />
        </div>
       </section>
        <section id="three" className="third panel">
            <div className="fixed-container">
                <Carousel textes={textes} />
            </div>
        </section>
        <section id="four" className="fouth panel">
            <div className="fixed-container">
                <RendezVous textes={textes} />
            </div>
        </section>
    </div>
  );
};

export default App;
