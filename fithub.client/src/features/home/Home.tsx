import React from "react";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <>
      <header
        className="text-center text-white masthead"
        style={{
          background:
            'linear-gradient(#000010, rgba(0,0,16,0.848626379971918) 35%, rgba(0,0,16,0.55) 97%), url("src/assets/img/photo-1651840403916-d1e0515b32c4.jpg")',
          backgroundSize: "auto, cover",
        }}
      >
        <div className="container">
          <div
            className="row"
            style={{ paddingBottom: "0px", marginBottom: "47px" }}
          >
            <div
              className="col-xl-7 mx-auto position-relative"
              style={{ paddingBottom: "0px", marginLeft: "0px" }}
            >
              <h1 className="text-center mb-5">
                <span style={{ backgroundColor: "rgba(217, 209, 204, 0)" }}>
                  Begin your journey!&nbsp;
                </span>
              </h1>
              <div className="row">
                <div className="col">
                  <p style={{ marginBottom: "-5px" }}>
                    <strong>
                      <span style={{ backgroundColor: "rgba(11, 35, 163, 0)" }}>
                        - Workouts based on goals
                      </span>
                    </strong>
                  </p>
                  <p style={{ marginBottom: "-5px" }}>
                    <strong>-Weekley plans</strong>
                  </p>
                  <p style={{ marginBottom: "20px" }}>
                    <strong>-Comunity</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-10 col-lg-8 col-xl-7 mx-auto position-relative">
              <form>
                <div className="row">
                  <div className="col-12 col-md-12 mb-2 mb-md-0">
                    <a
                      className="btn btn-primary btn-lg"
                      role="button"
                      href="register"
                    >
                      Sign up!
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
      <section
        className="text-center bg-light features-icons"
        style={{
          background:
            "linear-gradient(rgba(0,0,16,0.81), rgba(48,48,61,0.8456684966732837) 0%, white 100%), #000010",
        }}
      >
        <div
          className="container border-2"
          style={{
            borderRadius: "0px",
            border: "1px none var(--bs-tertiary-color)",
            borderRightWidth: "10px",
            borderRightStyle: "none",
          }}
        >
          <div className="row">
            <div className="col-lg-12 offset-lg-0" style={{ marginLeft: "1%" }}>
              <p
                className="fw-light text-start"
                style={{
                  marginBottom: "0px",
                  fontSize: "16px",
                  marginLeft: "0px",
                }}
              >
                <strong>
                  At FitHub, we’re here to make your fitness journey simpler and
                  more enjoyable. With a wide variety of workouts to choose
                  from, easy-to-follow routines, and helpful nutrition tips, we
                  guide you every step of the way.&nbsp;
                </strong>
              </p>
              <p
                className="fw-light text-start"
                style={{
                  fontSize: "16px",
                  marginRight: "0px",
                  marginLeft: "0px",
                }}
              >
                <strong>
                  We focus on promoting a healthy lifestyle with a relaxed
                  approach, while keeping you motivated and on track.&nbsp;
                </strong>
              </p>
              <p className="text-start" style={{ fontSize: "16px" }}>
                <strong>
                  Start your fitness transformation with FitHub today!
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className="showcase"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,16,0.76), rgba(255,255,255,0) 14%)",
        }}
      >
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-lg-6 my-auto order-lg-1 showcase-text">
              <h2>
                <a
                  className="btn btn-primary"
                  role="button"
                  style={{
                    fontSize: "25px",
                    background: "rgb(50,50,50)",
                    borderTopColor: "var(--bs-btn-disabled-color)",
                    borderRightColor: "var(--bs-btn-disabled-color)",
                    borderBottomColor: "var(--bs-btn-disabled-color)",
                    borderLeftColor: "var(--bs-btn-disabled-color)",
                  }}
                >
                  Find a workout!
                </a>
              </h2>
              <p className="lead mb-0">
                We offer a wide variety of workouts, from flexibility exercises
                to full-body circuits and much more. Whatever your goal or
                fitness level, you'll find the perfect workout for you!
              </p>
            </div>
            <div
              className="col-lg-6 text-white order-lg-2 showcase-img"
              style={{
                background:
                  'url("src/assets/img/photo-1485727749690-d091e8284ef3.jpg") left / cover repeat',
              }}
            >
              <span></span>
            </div>
          </div>
          <div className="row g-0">
            <div className="col-lg-6 my-auto order-lg-1 showcase-text">
              <h2>
                <a
                  className="btn btn-primary"
                  role="button"
                  style={{
                    fontSize: "25px",
                    background: "rgb(50,50,50)",
                    borderTopColor: "var(--bs-btn-disabled-color)",
                    borderRightColor: "var(--bs-btn-disabled-color)",
                    borderBottomColor: "var(--bs-btn-disabled-color)",
                    borderLeftColor: "var(--bs-btn-disabled-color)",
                  }}
                >
                  Become Premium!
                </a>
              </h2>
              <p className="lead mb-0">
                With the premium membership we offer advantages like:
              </p>
              <p className="lead mb-0">-Custom plans</p>
              <p className="lead mb-0">-Progress tracking</p>
              <p className="lead mb-0">-Access to all programs</p>
              <p className="lead mb-0">-Premium features in the community</p>
            </div>
            <div
              className="col-lg-6 text-white showcase-img"
              style={{
                background:
                  'url("src/assets/img/photo-1637713871652-4c9f1e601209.jpg")',
                backgroundSize: "cover",
              }}
            >
              <span></span>
            </div>
          </div>
          <div className="row g-0">
            <div className="col-lg-6 my-auto order-lg-1 showcase-text">
              <h2>
                <a
                  className="btn btn-primary"
                  role="button"
                  style={{
                    fontSize: "25px",
                    background: "rgb(50,50,50)",
                    borderTopColor: "var(--bs-btn-disabled-color)",
                    borderRightColor: "var(--bs-btn-disabled-color)",
                    borderBottomColor: "var(--bs-btn-disabled-color)",
                    borderLeftColor: "var(--bs-btn-disabled-color)",
                  }}
                >
                  Join our comunity!
                </a>
              </h2>
              <p className="lead mb-0">Here you can:</p>
              <p className="lead mb-0">-Connect with like-minded individuals</p>
              <p className="lead mb-0">-Share your progress and your tips</p>
              <p className="lead mb-0">-Join challenges</p>
              <p className="lead mb-0">-Motivate and inspire</p>
            </div>
            <div
              className="col-lg-6 text-white order-lg-2 showcase-img"
              style={{
                background:
                  'linear-gradient(0deg, rgba(0,0,16,0.76), rgba(255,255,255,0) 24%), url("src/assets/img/pexels-photo-1387037.jpeg") center / cover',
              }}
            >
              <span></span>
            </div>
          </div>
        </div>
      </section>
      <section
        className="text-center text-white call-to-action"
        style={{
          background:
            'linear-gradient(#000010, rgba(13,13,28,0.9509982431990265) 43%, rgba(40,40,53,0.57) 91%, rgba(68,68,79,0.7344322455647683) 100%, rgba(148,148,154,0.42187674014483384) 100%, rgba(255,255,255,0) 100%), url("assets/img/photo-1651840403916-d1e0515b32c4.jpg") bottom / cover no-repeat',
          marginTop: "0px",
        }}
      >
        <div
          className="overlay"
          style={{ marginTop: "0px", paddingTop: "0px" }}
        ></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-9 mx-auto position-relative">
              <h2 className="mb-4">Sounds good? Start your journey now!</h2>
            </div>
          </div>
        </div>
        <div className="col-md-10 col-lg-8 col-xl-7 mx-auto position-relative">
          <form>
            <div className="row">
              <div className="col-12 col-md-12 mb-2 mb-md-0">
                <a
                  className="btn btn-primary btn-lg"
                  role="button"
                  href="register"
                >
                  Sign up!
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;
