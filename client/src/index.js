import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import theme, { rtlCache } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <CacheProvider value={rtlCache}>
  <ThemeProvider theme={theme}>
    <CssBaseline />
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
  </ThemeProvider>
  </CacheProvider>
);

 