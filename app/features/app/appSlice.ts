import { createSlice } from '@reduxjs/toolkit';
import { remote } from 'electron';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';

const getInitialTheme = () => {
  let theme = localStorage.getItem('theme');
  if (!theme) {
    theme = remote.nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  }
  return theme;
};

const appSlice = createSlice({
  name: 'app',
  initialState: { theme: getInitialTheme() },
  reducers: {
    setLightTheme: (state) => {
      localStorage.setItem('theme', 'light');
      state.theme = 'light';
    },
    setDarkTheme: (state) => {
      localStorage.setItem('theme', 'dark');
      state.theme = 'dark';
    },
  },
});

export const { setLightTheme, setDarkTheme } = appSlice.actions;

export const flipTheme = (): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.app.theme === 'dark') {
      return dispatch(setLightTheme());
    }
    return dispatch(setDarkTheme());
  };
};

export default appSlice.reducer;

export const currentTheme = (state: RootState) => state.app.theme;
