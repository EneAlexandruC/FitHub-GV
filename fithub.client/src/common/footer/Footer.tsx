import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-light footer"
      style={{ padding: "2rem", backgroundColor: "#f0f0f0" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 text-center text-lg-start my-auto h-100">
            <ul className="list-inline mb-2">
              <li className="list-inline-item list-inline-item">
                <a href="#">About</a>
              </li>
              <li className="list-inline-item list-inline-item">
                <span>⋅</span>
              </li>
              <li className="list-inline-item list-inline-item">
                <a href="#">Contact</a>
              </li>
              <li className="list-inline-item list-inline-item">
                <span>⋅</span>
              </li>
              <li className="list-inline-item list-inline-item">
                <a href="#">Terms of &nbsp;Use</a>
              </li>
              <li className="list-inline-item list-inline-item">
                <span>⋅</span>
              </li>
              <li className="list-inline-item list-inline-item">
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
            <p className="text-muted small mb-4 mb-lg-0">
              © FitHub 2024. All Rights Reserved.
            </p>
          </div>
          <div className="col-lg-6 text-center text-lg-end my-auto h-100">
            <ul className="list-inline mb-0">
              <li className="list-inline-item list-inline-item">
                <i className="fab fa-facebook fa-2x fa-fw"></i>
              </li>
              <li className="list-inline-item list-inline-item">
                <i className="fab fa-instagram fa-2x fa-fw"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
