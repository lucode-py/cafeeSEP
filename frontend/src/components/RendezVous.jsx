import React from "react";
const agendaImg = "http://127.0.0.1:8000/static/home_images/agenda.png";

const RendezVous = ({ textes }) => {
  console.log("textes:", textes); // 🔍 Vérifier la valeur de text

  const rendezVous = textes.filter((t) => t.section === "Rendez-vous");

  return (
    <div className="glassmorph-container">
      <div className="row d-flex align-items-center flex-column-reverse flex-md-row">
        {/* Texte à gauche sur grand écran, en haut sur mobile */}
        <div className="col-md-6 p-5">
          <div className="content-text">
            <h2>Rendez-vous</h2>
            <ul className="p-3">
              {rendezVous.map((texte, index) => (
                <li key={index} className="mt-2">
                  {texte.contenu}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Image à droite sur grand écran, en bas sur mobile */}
        <div className="col-md-6 text-center">
          <img src={agendaImg} alt="Agenda" className="img-fluid" width="700" />
        </div>
      </div>
    </div>
  );
};

export default RendezVous;