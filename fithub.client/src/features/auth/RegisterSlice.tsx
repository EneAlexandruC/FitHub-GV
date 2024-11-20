import { createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { registerAPI } from "../../utils/api";
import { RootState } from "../../app/store";

interface RegisterState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    // confirmPassword: string;
    weight: number;
    height: number;
    dateOfBirth: string;
    loading: boolean;
    error: string | null;
}

const initialState: RegisterState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    // confirmPassword: '',
    weight: 0,
    height: 0,
    dateOfBirth: '',
    loading: false,
    error: null,
};

export const register = createAsyncThunk(
    'auth/register',
    async (credentials: { firstName: string; lastName: string; email: string; password: string; weight: number; height: number, dateOfBirth: string }, { rejectWithValue }) => {
        try {
            const response = await registerAPI(credentials);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        noMatchingPassword: (state) => {
            state.error = 'Passwords do not match';
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
                state.error = null;
            })
            .addCase(register.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError, noMatchingPassword } = registerSlice.actions;

export const selectRegister = (state: RootState) => state.register;

export default registerSlice.reducer;


