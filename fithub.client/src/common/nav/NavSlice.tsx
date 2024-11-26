import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logoutAPI } from "../../utils/api";
import { RootState } from "../../app/rootReducer";

interface NavState {
  loading: boolean;
  error: string | null;
}

const initialState: NavState = {
  loading: false,
  error: null,
};

export const logout = createAsyncThunk(
  "nav/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutAPI();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectNav = (state: RootState) => state.nav;

export default navSlice.reducer;
