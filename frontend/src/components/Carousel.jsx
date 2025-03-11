import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./css/Caroucel.css"; // Assure-toi d'importer le CSS

const ActivityCarousel = ({ activities }) => {
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-white p-6">Nos Activités</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <SwiperSlide key={index}>
              <div className="glassmorph-container glassmorph-container-slide p-6">
                <h3 className="text-xl font-semibold">{activity.titre}</h3>
                <p className="text-gray-200">{activity.description}</p>
                {activity.image && (
                  <img
                    src={activity.image}
                    alt={activity.titre}
                    className="w-full h-48 object-cover rounded-lg mt-3"
                  />
                )}
                <p className="text-sm text-gray-300 mt-2">{activity.date}</p>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-white">Aucune activité disponible.</p>
        )}
      </Swiper>
    </div>
  );
};

export default ActivityCarousel;