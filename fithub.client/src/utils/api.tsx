import axios from "axios";

const API_BASE_URL = "http://localhost:5012";

export const logoutAPI = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/User/logout`,
      {},
      { withCredentials: true }
    );
    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

export const loginAPI = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/User/login`,
      credentials,
      { withCredentials: true }
    );

    //    if (response.data.redirectUrl)                                Am comentat blocul asta de cod pentru ca stergea toate starile curente si nu
    //                                                                  imi seta isAuthenticated pe true. Am adaugat in Login.tsx 
    //    {
    //        window.location.href = response.data.redirectUrl;
    //    }

    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

export const registerAPI = async (credentials: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  weight: number;
  height: number;
  dateOfBirth: string;
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/User/add-regularuser`,
      credentials
    );
    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};
