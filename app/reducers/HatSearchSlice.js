import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

export const searchHatByName = createAsyncThunk(
  "hatSearch/searchHatByName",
  async (q, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "postgresapi/user/hat/search",
        {
          params: { q }
        }
      );

      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        return rejectWithValue("Search failed");
      }
    } catch (err) {
      return rejectWithValue(err.message || err);
    }
  }
);

const hatSearchSlice = createSlice({
  name: "hatSearch",
  initialState: {
    loading: false,
    error: null,
    results: []
  },
  reducers: {
    clearHatSearch(state) {
      state.results = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchHatByName.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchHatByName.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.results = payload.data || [];
      })
      .addCase(searchHatByName.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  }
});

export const { clearHatSearch } = hatSearchSlice.actions;
export default hatSearchSlice.reducer;
