import axios from 'axios';

// TODO: API endpoint for Login
export const loginAPI = async (credentials : { email: string; password: string }) => {
    throw new Error('Not implemented');

    const response = await axios.post('/login', credentials);
    return response;
}

export const registerAPI = async (credentials: { firstName: string; lastName: string; email: string; password: string; weight: number; height: number; dateOfBirth: string }) => {
    const response = await axios.post('https://localhost:7204/api/User/add-regularuser', credentials);
    return response;
}