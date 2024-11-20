import React from 'react';
import styles from './Home.module.css';

const Home: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>Welcome to FitHub</h1>
            <p>Your one-stop solution for all fitness needs.</p>
        </div>
    );
};

export default Home;