import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import Sidebar from './scenes/global/Sidebar';
import Topbar from './scenes/global/Topbar';
import Contact from './scenes/contacts';
import Form from './scenes/form';
import Facture from './scenes/Facture';
function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className='content'>
            <Topbar />
            <Routes>
              <Route path="/contacts" element={<Contact />} />
              <Route path="/form" element={<Form />} />
              <Route path="/Facture" element={<Facture />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
