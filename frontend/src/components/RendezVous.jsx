import React from "react";
import agendaImg from "../home_images/agenda.png";

const RendezVous = ({ textes }) => {
    console.log("textes:", textes); // 🔍 Vérifier la valeur de text

  const rendezVous = textes.filter((t) => t.section === "Rendez-vous");

  return (
    <div className="container rounded mb-4 mt-5 shadow-lg bg-green-800 text-white section">
      <div className="row">
        <div className="col-sm-6 p-5">
          <div className="content-text">
            <h2 className="fw-semibold">Rendez-vous</h2>
            <ul className="p-3">
              {rendezVous.map((texte, index) => (
                <li key={index} className="mt-2">
                  {texte.contenu}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-sm-6 d-flex justify-content-center align-items-center">
          <img src={agendaImg} alt="Agenda" className="rounded img-fluid mb-4" width="500" />
        </div>
      </div>
    </div>
  );
};

export default RendezVous;
