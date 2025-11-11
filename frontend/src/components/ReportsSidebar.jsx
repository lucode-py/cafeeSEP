import React, { useState, useEffect } from 'react';
import "./css/ReportsSidebar.css";

const ReportsSidebar = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  // Charger les rapports depuis l'API
  useEffect(() => {
    fetch('https://cafesep91.fr/api/list_reports/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        console.log("Données des rapports dans le state:", reports);
        return response.json();
      })
      .then(data => {
        console.log("Données reçues:", data); // Vérifie le format de la réponse
        const list = data.reports || data || [];
        // Trier du plus récent au plus ancien. On utilise date_added, puis date, puis title.
        const getTime = (r) => {
          const s = (r.date_added || r.date || r.title || "").toString();
          const t = Date.parse(s);
          return isNaN(t) ? 0 : t;
        };
        const sorted = [...list].sort((a, b) => getTime(b) - getTime(a));
        setReports(sorted);
      })
      .catch(error => console.error('Erreur de chargement des rapports:', error));
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const ts = Date.parse(dateStr);
    if (isNaN(ts)) return dateStr;
    const d = new Date(ts);
    return d.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Sélectionner un compte-rendu
  const handleReportClick = (report) => {
    setSelectedReport(report);
  };

  return (
    <div className="reports-sidebar glassmorph-container">
      <div className="sidebar">
        <h2>Compte-rendus</h2>
        <ul className="report-list">
          {reports.length > 0 ? (
            reports.map((report, index) => (
              <li key={report.id || index} onClick={() => handleReportClick(report)}>
                {formatDate(report.date_added || report.date || report.title) || "Date inconnue"}
              </li>
            ))
          ) : (
            <p>Aucun compte-rendu disponible.</p>
          )}
        </ul>
      </div>

      <div className="report-preview">
        {selectedReport ? (
          <div>
            <iframe
              src={selectedReport.url}
              width="9000px"
              title="Prévisualisation du compte-rendu"
            ></iframe>

            <a href={selectedReport.url} download className="download-btn">
                <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
                <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                </svg></span>
                <span className="text">Télécharger le compte-rendus</span>
            </a>
          </div>
        ) : (
          <p>Sélectionnez un compte-rendu pour le prévisualiser.</p>
        )}
      </div>
    </div>
  );
};

export default ReportsSidebar;