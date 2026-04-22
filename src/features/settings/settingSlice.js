import { createSlice } from "@reduxjs/toolkit";

const applyThemeToDOM = (theme) => {
  if (typeof window === "undefined") return;
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  
  if (theme === "system" || theme === "auto") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
};

const savedTheme = localStorage.getItem("theme") || "light";
applyThemeToDOM(savedTheme); // Apply instantly on load

const initialState = {
  theme: savedTheme,
  language: localStorage.getItem("language") || "en",
  profilePhoto: localStorage.getItem("profilePhoto") || "", // Load saved photo
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
      applyThemeToDOM(action.payload); // Instantly change site colors
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem("language", action.payload);
    },
    setProfilePhoto: (state, action) => {
      state.profilePhoto = action.payload;
      localStorage.setItem("profilePhoto", action.payload);
    }
  },
});

export const { setTheme, setLanguage, setProfilePhoto } = settingsSlice.actions;
export default settingsSlice.reducer;