import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import About from "./components/About";
import Carousel from "./components/Carousel";
import RendezVous from "./components/RendezVous";

const useSmoothBackground = () => {
  const [background, setBackground] = useState("linear-gradient(107.15deg, #13331b, #30c052)");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionIndex = Math.round(scrollY / window.innerHeight);

      const gradients = [
        "linear-gradient(107.15deg, #13331b, #30c052)",
        "linear-gradient(107.15deg, #4A7856, #30c052)",
        "linear-gradient(107.15deg, #13331b, #30c052, #4A7856)",
        "linear-gradient(107.15deg, #4A7856, #30c052, #13331b)"
      ];

      setBackground(gradients[sectionIndex] || gradients[0]);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return background;
};

const App = () => {
  const [textes, setTextes] = useState([]);
  const [activities, setActivities] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const background = useSmoothBackground(); // 💡 Correctement utilisé ici

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/textes/")
      .then((res) => res.json())
      .then((data) => setTextes(data))
      .catch((error) => console.error("Erreur de chargement des textes:", error));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/activites/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Activités chargées :", data);
        setActivities(data);
      })
      .catch((error) => console.error("Erreur lors du chargement des activités :", error));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".panel");
      let index = 0;

      sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          index = i;
        }
      });

      setScrollIndex(index);
    };

    document.querySelector(".slides-wrapper").addEventListener("scroll", handleScroll);
    return () => {
      document.querySelector(".slides-wrapper").removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="slides-wrapper" style={{ background }}>
      <section className="panel">
        <div className="fixed-container">
          <Header />
        </div>
      </section>
      <section className="panel">
        <div className="fixed-container">
          <About textes={textes} />
        </div>
      </section>
      <section className="panel">
        <div className="fixed-container">
          <Carousel activities={activities} />
        </div>
      </section>
      <section className="panel">
        <div className="fixed-container">
          <RendezVous textes={textes} />
        </div>
      </section>
    </div>
  );
};

export default App;