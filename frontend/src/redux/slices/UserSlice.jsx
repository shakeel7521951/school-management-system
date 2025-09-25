import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  loading: true, // start with loading true
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const selectUserProfile = (state) => state.user.profile;
export const selectUserLoading = (state) => state.user.loading;

export const { setProfile, clearProfile, setLoading } = userSlice.actions;
export default userSlice.reducer;
