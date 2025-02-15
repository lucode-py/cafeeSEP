import React from "react";
import afficheCinema from "../home_images/afficheCinema1.png";

const Carousel = () => {
  return (
    <div className="container mt-5 section">
      <h2 className="p-3 fw-semibold">Activité</h2>
      <div
        id="carouselExampleCaptions"
        className="carousel slide mx-auto"
        style={{ maxWidth: "800px" }}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={afficheCinema} className="d-block w-100" alt="Sortie au cinéma" />
            <div className="carousel-caption-overlay"></div>
            <div className="carousel-caption">
              <h5>Sortie au cinéma</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Carousel;
