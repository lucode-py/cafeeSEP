import React from "react";
import "./css/Header.css"; // Assure-toi d'avoir un fichier CSS associé


const Header = () => {
  return (
      <div className="header-section section">

        <div className="title-container">
        <svg viewBox="0 0 1410 1557" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1037.33 1153.21C898.866 1282.34 537.996 1120.4 231.308 791.517C-75.3803 462.634 -211.75 91.3468 -73.283 -37.7757C65.1839 -166.898 426.053 -4.95995 732.741 323.923C1039.43 652.805 1175.8 1024.09 1037.33 1153.21Z"
            fill="#4A7856"
          />
        </svg>
        <div className="content  text-center text-white">
          <h1 className="fw-semibold">Café SEP</h1>
        </div>
        </div>

      {/* 🔻 Flèche animée 🔻 */}
      <div className="scroll-down">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"/>
        </svg>
      </div>
    </div>

  );
};

export default Header;
