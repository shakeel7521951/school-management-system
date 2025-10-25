// redux/slices/languageSlice.js
import { createSlice } from "@reduxjs/toolkit";
import i18n from "../../i18n";

const initialState = {
  language: localStorage.getItem("lang") || "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.language = state.language === "en" ? "ar" : "en";
      i18n.changeLanguage(state.language);
      localStorage.setItem("lang", state.language);
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
      localStorage.setItem("lang", action.payload);
    },
  },
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
