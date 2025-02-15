import React from "react";
import "./css/About.css"; // Assure-toi d'importer le CSS

const About = ({ textes }) => {
  console.log(textes); // 🔍 Vérifie si c'est undefined
  const aboutTextes = textes.filter((t) => t.section === "À propos de nous");

  return (
    <div className="glassmorph-container">
      <h2 className="fw-semibold p-3">À propos de nous</h2>
      {aboutTextes.map((texte, index) => (
        <p key={index} className="fs-5 p-4">
          {texte.contenu}
        </p>
      ))}
    </div>
  );
};

export default About;
