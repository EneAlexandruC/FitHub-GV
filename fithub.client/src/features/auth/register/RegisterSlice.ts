import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface RegisterState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  weight: number;
  height: number;
  dateOfBirth: string;
}

const initialState: RegisterState = {
  loading: false,
  error: null,
  success: false,
};

export const register = createAsyncThunk(
  'register/registerUser',
  async (userData: RegisterData, { rejectWithValue }) => {
    console.log('Registering user:', userData);
    try {
      const response = await fetch('http://localhost:5012/api/User/add-regularuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      let responseBody;
      try {
        responseBody = await response.clone().json();
      } catch (jsonErr) {
        responseBody = await response.text();
      }
      console.error('Register response body:', responseBody);

      if (!response.ok) {
        // Dacă nu e JSON, afișăm textul brut
        if (typeof responseBody === 'string') {
          return rejectWithValue('Server error: ' + responseBody.substring(0, 200));
        }
        return rejectWithValue((responseBody && responseBody.message) || 'Registration failed');
      }

      if (typeof responseBody === 'string') {
        return rejectWithValue('Unexpected server response: ' + responseBody.substring(0, 200));
      }
      return responseBody;
    } catch (error) {
      console.error('Registration error:', error);
      return rejectWithValue('Network error occurred');
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    noMatchingPassword: (state) => {
      state.error = 'Passwords do not match';
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { noMatchingPassword, clearError, resetState } = registerSlice.actions;
export default registerSlice.reducer;
