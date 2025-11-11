import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./css/Caroucel.css"; // Assure-toi d'importer le CSS

const ActivityCarousel = ({ activities }) => {
  // Définit une liste triée des activités par date (du plus récent au moins récent).
  // On utilise useMemo pour éviter de resortir à chaque rendu si `activities` ne change pas.
  const sortedActivities = React.useMemo(() => {
    if (!Array.isArray(activities)) return [];
    // Copie l'array pour ne pas muter la prop
    return [...activities].sort((a, b) => {
      const da = a && a.date ? Date.parse(a.date) : NaN;
      const db = b && b.date ? Date.parse(b.date) : NaN;
      // Si les deux dates sont valides, trier par ordre décroissant
      if (!Number.isNaN(da) && !Number.isNaN(db)) return db - da;
      // Si une seule est valide, la placer avant
      if (!Number.isNaN(db)) return 1 * -1; // b a une date -> b avant a
      if (!Number.isNaN(da)) return -1 * -1; // a a une date -> a avant b
      // Sinon, garder l'ordre d'origine
      return 0;
    });
  }, [activities]);

  // Etat pour pagination personnalisée
  const [activeIndex, setActiveIndex] = React.useState(0);
  const swiperRef = React.useRef(null);

  // Formatte une date en français. Si la date n'est pas valide, renvoie la chaîne d'origine.
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const ts = Date.parse(dateStr);
    if (Number.isNaN(ts)) return dateStr;
    const d = new Date(ts);
    // Ex: "mardi 11 novembre 2025"
    return d.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-white p-6">Nos Activités</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="mySwiper"
      >
        {sortedActivities.length > 0 ? (
          sortedActivities.map((activity, index) => (
            <SwiperSlide key={activity.id ?? activity.pk ?? index}>
              <div className="glassmorph-container glassmorph-container-slide p-6 color-white">
                <h3 className="text-xl font-semibold">{activity.titre}</h3>
                <p className="text-gray-200">{activity.description}</p>
                {activity.image && (
                  <img
                    src={activity.image}
                    alt={activity.titre}
                    className="w-full h-48 object-cover rounded-lg mt-3"
                  />
                )}
                <p className="text-sm text-gray-300 mt-2">{formatDate(activity.date)}</p>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-white">Aucune activité disponible.</p>
        )}
      </Swiper>
      {/* Controls: left arrow, dots, right arrow */}
      {sortedActivities.length > 0 && (
        <div className="carousel-controls">
          <button
            className={`carousel-arrow carousel-arrow-left ${activeIndex === 0 ? 'disabled' : ''}`}
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Précédent"
            disabled={activeIndex === 0}
          >
            ‹
          </button>

          <div className="carousel-dots">
            {sortedActivities.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === activeIndex ? 'active' : ''}`}
                onClick={() => swiperRef.current?.slideTo(i)}
                aria-label={`Aller à la diapositive ${i + 1}`}
              />
            ))}
          </div>

          <button
            className={`carousel-arrow carousel-arrow-right ${activeIndex === sortedActivities.length - 1 ? 'disabled' : ''}`}
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Suivant"
            disabled={activeIndex === sortedActivities.length - 1}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityCarousel;