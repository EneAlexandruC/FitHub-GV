import axios from "axios";

// TODO: API endpoint for Login
export const loginAPI = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      "https://localhost:7204/api/User/login",
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
      "https://localhost:7204/api/User/add-regularuser",
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
