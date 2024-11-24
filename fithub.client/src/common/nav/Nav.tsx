import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Nav: React.FC = () => {
  return (
    <nav
      className="navbar navbar-expand-md bg-body py-3"
      style={{
        background: "linear-gradient(black 40%, #00000e 100%), rgb(0,0,0)",
      }}
    >
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <span
            className="d-flex justify-content-center align-items-center bs-icon-sm bs-icon-rounded bs-icon-primary me-2 bs-icon"
            style={{ width: "32px", height: "32px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
              style={{ fontSize: "23px" }}
            >
              <path
                d="M20.2739 9.86883L16.8325 4.95392L18.4708 3.80676L21.9122 8.72167L20.2739 9.86883Z"
                fill="currentColor"
              ></path>
              <path
                d="M18.3901 12.4086L16.6694 9.95121L8.47783 15.687L10.1985 18.1444L8.56023 19.2916L3.97162 12.7383L5.60992 11.5912L7.33068 14.0487L15.5222 8.31291L13.8015 5.8554L15.4398 4.70825L20.0284 11.2615L18.3901 12.4086Z"
                fill="currentColor"
              ></path>
              <path
                d="M20.7651 7.08331L22.4034 5.93616L21.2562 4.29785L19.6179 5.445L20.7651 7.08331Z"
                fill="currentColor"
              ></path>
              <path
                d="M7.16753 19.046L3.72607 14.131L2.08777 15.2782L5.52923 20.1931L7.16753 19.046Z"
                fill="currentColor"
              ></path>
              <path
                d="M4.38208 18.5549L2.74377 19.702L1.59662 18.0637L3.23492 16.9166L4.38208 18.5549Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
          <span style={{ color: "var(--bs-primary)" }}>FitHub</span>
        </a>
        <button
          data-bs-toggle="collapse"
          data-bs-target="#navcol-2"
          className="navbar-toggler"
        >
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="navbar-nav ms-auto">
          <Link to="/" style={{ color: "#ffffff" }} />
            <li className="nav-item">
              <a
                className="nav-link"
                href="index.html"
                style={{ color: "#ffffff" }}
              >
                Home
              </a>
            </li>
            <li className="nav-item" style={{ color: "#ffffff" }}>
              <a className="nav-link" href="#" style={{ color: "#ffffff" }}>
                Workouts
              </a>
            </li>
            <li className="nav-item" style={{ color: "#ffffff" }}>
              <a className="nav-link" href="#" style={{ color: "#ffffff" }}>
                Plans
              </a>
            </li>
            <li className="nav-item" style={{ color: "#ffffff" }}>
              <a className="nav-link" href="#" style={{ color: "#ffffff" }}>
                Membership
              </a>
            </li>
            <li className="nav-item" style={{ color: "#ffffff" }}>
              <a
                className="nav-link"
                href="#"
                style={{ color: "#ffffff", padding: "8px" }}
              >
                Progress
              </a>
            </li>
            <li className="nav-item" style={{ color: "#ffffff" }}>
              <a
                className="nav-link"
                href="#"
                style={{ color: "#ffffff", padding: "8px" }}
              >
                Community
              </a>
            </li>
            <li className="nav-item" style={{ color: "#ffffff" }}>
              <a
                className="nav-link"
                href="#"
                style={{ color: "#ffffff", padding: "8px" }}
              >
                About
              </a>
            </li>
            <li className="nav-item"></li>
            <li className="nav-item"></li>
          </ul>
          <a
            className="btn btn-primary ms-md-2"
            role="button"
            href="login.html"
            style={{
              marginRight: "0px",
              background: "rgb(13, 110, 253)",
              paddingRight: "12px",
              paddingLeft: "12px",
            }}
          >
            Login
          </a>
          <a
            className="btn btn-primary ms-md-2"
            role="button"
            href="signup.html"
            style={{
              paddingLeft: "12px",
              marginRight: "1px",
              background: "rgb(13,110,253)",
              paddingRight: "12px",
            }}
          >
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
