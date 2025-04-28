import React from "react";
import { RootState, AppDispatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Nav.module.css";
import { updateStatusLogin } from "../../features/auth/login/LoginSlice";
import { updateStatusRegister } from "../../features/auth/register/RegisterSlice";
import { logout } from "./NavSlice";

const Nav: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleOnClick = async () => {
    dispatch(updateStatusLogin());
    dispatch(updateStatusRegister());
    dispatch(logout());
  };

  return (
    <nav
      className="navbar navbar-expand-md bg-body py-3"
      style={{ background: "linear-gradient(#000010, #000010), #000010" }}
    >
      <div className="container">
        {/* Left-aligned FitHub link */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <span
            className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon"
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
          <Link className={styles.button} to="/">
            FitHub
          </Link>
        </a>
        {/* Right-aligned navigation links */}
        <button
          data-bs-toggle="collapse"
          className="navbar-toggler"
          data-bs-target="#navcol-2"
        >
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse navbar-collapse" id="navcol-2">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={styles.button} to="/workouts" role="button">
                Workouts
              </Link>
            </li>
            <li className="nav-item">
              <Link className={styles.button} to="/login" role="button">
                Plans
              </Link>
            </li>
            <li className="nav-item">
              <Link className={styles.button} to="/login" role="button">
                Membership
              </Link>
            </li>
            <li className="nav-item">
              <Link className={styles.button} to="/login" role="button">
                Progress
              </Link>
            </li>
            <li className="nav-item">
              <Link className={styles.button} to="/login" role="button">
                Community
              </Link>
            </li>
            <li className="nav-item">
              <Link className={styles.button} to="/faq" role="button">
                Faq
              </Link>
            </li>
          </ul>
          {!isAuthenticated ? (
            <>
              <Link className={styles.button} to="/login" role="button">
                LogIn
              </Link>
              <Link className={styles.button} to="/register" role="button">
                SignUp
              </Link>
            </>
          ) : (
            <Link className={styles.button} to="/" onClick={handleOnClick}>
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
