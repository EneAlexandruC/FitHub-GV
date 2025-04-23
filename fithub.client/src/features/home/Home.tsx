import React from "react";
import { RootState } from "../../app/store";
import styles from "./Home.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth?.isAuthenticated ?? false
  );

  const rows = [
    {
      title: "Weekly Routines and Videos!",
      text: `Discover a diverse range of workouts tailored to your needs,
            whether you’re focusing on flexibility, tackling full-body circuits, 
            or anything in between. No matter your goal or fitness level, 
            we’ve got the perfect workout for you!`,
      imgSrc: "img/pexels-photo-416778.jpeg",
    },
    {
      title: "Become Premium!",
      text: `Upgrade to our Premium Membership and unlock exclusive benefits, including: <br />
            Personalized workout plans <br />
            Advanced progress tracking tools <br />
            Unlimited access to all programs`,
      imgSrc: "img/pexels-photo-949129.jpeg",
    },
    {
      title: "Join our community!",
      text: `Here you can:<br />
            Connect with like-minded individuals<br />
            Share your progress and best tips<br />
            Participate in exciting challenges<br />
            Motivate others and find daily inspiration to keep going`,
      imgSrc: "img/pexels-photo-703012.jpeg",
    },
    // Add more rows as needed
  ];

  return (
    <>
      <div className={styles.banner}>
        <h1>Begin your journey with us!</h1>
        <p>
          Whether you’re aiming to hit new milestones, boost your strength, or
          embrace the fun of staying active, we equip you with the tools,
          support, and community essential for your success.
        </p>
        <div className={styles.upperBannerImage} />
      </div>
      <div className={styles.container}>
        {rows.map((row, index) => (
          <div
            key={index}
            className={`${styles.row} ${
              index % 2 === 0 ? styles.rowReverse : ""
            }`}
          >
            <div className={styles.column}>
              <img
                src={row.imgSrc}
                alt={`Image ${index + 1}`}
                className={styles.image}
              />
            </div>
            <div className={styles.column}>
              <h2>{row.title}</h2>
              <p dangerouslySetInnerHTML={{ __html: row.text }}></p>
            </div>
          </div>
        ))}
      </div>
      {!isAuthenticated ? (
        <div className={styles.banner}>
          <h2>Sounds good? Start your journey now!</h2>
          <Link className={styles.button} to="/register" role="button">
            SignUp
          </Link>
          <div className={styles.lowerBannerImage} />
        </div>
      ) : (
        <div className={styles.banner}>
          <h2>Logged in text</h2>
          <button
            className="btn btn-primary ms-md-2"
            style={{ background: "rgb(13, 110, 253)" }}
          >
            Logged in button
          </button>
          <div className={styles.lowerBannerImage} />
        </div>
      )}
    </>
  );
};

export default Home;
