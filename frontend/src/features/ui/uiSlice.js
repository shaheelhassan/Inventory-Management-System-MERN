import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: true, // Default to dark as requested earlier
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      // Also update a body attribute for CSS scoping
      if (state.isDarkMode) {
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
      }
    },
    setTheme: (state, action) => {
      state.isDarkMode = action.payload;
      if (state.isDarkMode) {
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
      }
    }
  },
});

export const { toggleTheme, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
