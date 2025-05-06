import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer
      className={styles.footer}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "2rem 0 1rem 0",
        background: "linear-gradient(90deg, rgba(0,0,16,0.92) 0%, rgba(0,0,16,0.807) 100%)",
        color: "#fff"
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 text-center text-lg-start my-auto h-100">
            <ul className="list-inline mb-2">
              <li className="list-inline-item">
                <a href="#" className={styles.link}>About</a>
              </li>
              <li className="list-inline-item">
                <span>⋅</span>
              </li>
              <li className="list-inline-item">
                <a href="#" className={styles.link}>Contact</a>
              </li>
              <li className="list-inline-item">
                <span>⋅</span>
              </li>
              <li className="list-inline-item">
                <a href="#" className={styles.link}>Terms of&nbsp;Use</a>
              </li>
              <li className="list-inline-item">
                <span>⋅</span>
              </li>
              <li className="list-inline-item">
                <a href="#" className={styles.link}>Privacy Policy</a>
              </li>
            </ul>
            <p className="small mb-4 mb-lg-0"
            style={{
              color: "white"
            }}>
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
