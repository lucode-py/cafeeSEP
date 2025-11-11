import React from "react";
const agendaImg = "https://cafesep91.fr/media/agenda.png";
import "./css/RendezVous.css";

const RendezVous = ({ textes }) => {
  console.log("textes:", textes); // 🔍 Vérifier la valeur de text

  // Filtrer et trier les textes de la section "Rendez-vous" par date (du plus récent au moins récent)
  const sortedRendezVous = React.useMemo(() => {
    if (!Array.isArray(textes)) return [];
    const items = textes
      .filter((t) => t.section === "Rendez-vous")
      .map((t) => ({ ...t, _ts: t.contenu ? Date.parse(t.contenu) : NaN }));

    items.sort((a, b) => {
      const ta = a._ts;
      const tb = b._ts;
      if (!Number.isNaN(ta) && !Number.isNaN(tb)) return tb - ta; // dates valides -> décroissant
      if (!Number.isNaN(tb)) return 1 * -1; // b valide -> b avant a
      if (!Number.isNaN(ta)) return -1 * -1; // a valide -> a avant b
      return 0; // sinon garder l'ordre
    });

    return items;
  }, [textes]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const ts = Date.parse(dateStr);
    if (Number.isNaN(ts)) return dateStr;
    const d = new Date(ts);
    return d.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
              {sortedRendezVous.map((texte, index) => (
                <li key={texte.id ?? texte.pk ?? index} className="mt-2">
                  {formatDate(texte.contenu)}
                </li>
              ))}
            </ul>
            <div className="contact-buttons">
              {/* Bouton pour appeler Carole */}
              <a href="tel:0685170173" className="contact-btn phone-btn">
                📞 Contacter Carole
              </a>

              {/* Bouton pour envoyer un email à Fabienne */}
              <a href="mailto:fabimic3@gmail.com" className="contact-btn email-btn">
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


