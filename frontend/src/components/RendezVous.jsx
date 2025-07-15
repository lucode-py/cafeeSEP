import React from "react";
const agendaImg = "https://cafesep91.fr/media/agenda.png";
import "./css/RendezVous.css";

const RendezVous = ({ textes }) => {
  console.log("textes:", textes); // 🔍 Vérifier la valeur de text

  const rendezVous = textes.filter((t) => t.section === "Rendez-vous");

  return (
    <div className="glassmorph-container-rdv">
      <div className="rendez-vous-container">
        {/* Texte à gauche sur grand écran, en haut sur mobile */}
        <div className="p-5">
          <div className="content-text">
            <h2>Rendez-vous</h2>
            <p>
              Nous vous attendons à la Maison Pour Tous des Amonts aux Ulis. <br />
              Voici les créneaux disponibles :
            </p>
            <ul className="p-3">
              {rendezVous.map((texte, index) => (
                <li key={index} className="mt-2">
                  {texte.contenu}
                </li>
              ))}
            </ul>
            <div className="contact-buttons">
              {/* Bouton pour appeler Carole */}
              <a href="tel:0685170173" className="contact-btn phone-btn">
                📞 Contacter Carole
              </a>

              {/* Bouton pour envoyer un email à Fabienne */}
              <a href="mailto:fabimics3@gmail.com" className="contact-btn email-btn">
                📧 Contacter Fabienne
              </a>
            </div>
          </div>
        </div>
        {/* Image à droite sur grand écran, en bas sur mobile */}
        <div className="col-md-6 text-center">
          <img src={agendaImg} alt="Agenda" className="img-fluid" width="100" />
          
        </div>
      </div>
    </div>
  );
};

export default RendezVous;


