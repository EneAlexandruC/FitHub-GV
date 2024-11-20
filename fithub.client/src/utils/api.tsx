import axios from 'axios';

// TODO: API endpoint for Login
export const loginAPI = async (credentials: { username: string; password: string }) => {
    const params = new URLSearchParams();
    params.append('username', credentials.username);
    params.append('password', credentials.password);

    const response = await axios.post('https://localhost:7204/api/User/login', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    return response;
}

export const registerAPI = async (credentials: { firstName: string; lastName: string; email: string; password: string; weight: number; height: number; dateOfBirth: string }) => {
    const response = await axios.post('https://localhost:7204/api/User/add-regularuser', credentials);
    return response;
}
