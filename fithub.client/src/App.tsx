import { useEffect, useState } from 'react';
import './App.css';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function App() {
    const [forecasts] = useState<Forecast[]>();
    const [authState, setAuthState] = useState<{ isAuthenticated: boolean, username: string }>({ isAuthenticated: false, username: '' });

    useEffect(() => {
        checkAuthentication();
    }, []);

    async function checkAuthentication() {
        const response = await fetch('https://localhost:7204/api/Account/isAuthenticated', {
            method: 'GET',
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            setAuthState({ isAuthenticated: data.isAuthenticated, username: data.username });
        } else {
            setAuthState({ isAuthenticated: false, username: '' });
        }
    }

    async function handleLogin() {
        try {
            window.location.href = "https://localhost:7204/api/Account/login"; // Redirect to the login page
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    async function handleLogout() {
        const response = await fetch('https://localhost:7204/api/Account/logout', {
            method: 'POST',
            credentials: 'include'
        });
        if (response.ok) {
            // Perform client-side redirect after successful logout
            window.location.href = "https://localhost:5173/";
        } else {
            console.error('Logout failed');
        }
    }


    if (!authState.isAuthenticated) {
        return <div>Please log in to access this page.
            <button onClick={handleLogin}>Login</button></div>;
    }

    const contents = forecasts === undefined
        ? <button onClick={handleLogout}>Logout</button>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <p>Welcome, {authState.username}!</p>
            {contents}
        </div>
    );
}

export default App;