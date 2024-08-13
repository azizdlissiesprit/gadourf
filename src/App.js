import React, { useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import Sidebar from './scenes/global/Sidebar';
import Topbar from './scenes/global/Topbar';
import Dashboard from './scenes/dashboard';
import Team from './scenes/team';
import Contact from './scenes/contacts';
import Invoices from './scenes/invoices';
import Form from './scenes/form';
import Commande from './scenes/commande';
import Calendar from './scenes/calendar';
import FAQ from './scenes/faq';
import Bar from './scenes/bar';
import Pie from './scenes/pie';
import Line from './scenes/line';
import Geography from './scenes/geography';
import AddProduct from './components/AddProduct';
import Login from './components/Login';

function App() {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // State to hold user information

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* Render Sidebar and Topbar only when authenticated */}
          {isAuthenticated && <Sidebar user={user} />}
          <main className='content'>
            {isAuthenticated && <Topbar />}
            <Routes>
              {/* Route for Login component */}
              <Route path="/login" element={<Login setAuthenticated={setAuthenticated} setUser={setUser} />} />
              {/* Protected routes that require authentication */}
              <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/team" element={isAuthenticated ? <Team /> : <Navigate to="/login" />} />
              <Route path="/contacts" element={isAuthenticated ? <Contact /> : <Navigate to="/login" />} />
              <Route path="/invoices" element={isAuthenticated ? <Invoices /> : <Navigate to="/login" />} />
              <Route path="/form" element={isAuthenticated ? <Form /> : <Navigate to="/login" />} />
              <Route path="/calendar" element={isAuthenticated ? <Calendar /> : <Navigate to="/login" />} />
              <Route path="/faq" element={isAuthenticated ? <FAQ /> : <Navigate to="/login" />} />
              <Route path="/bar" element={isAuthenticated ? <Bar /> : <Navigate to="/login" />} />
              <Route path="/pie" element={isAuthenticated ? <Pie /> : <Navigate to="/login" />} />
              <Route path="/line" element={isAuthenticated ? <Line /> : <Navigate to="/login" />} />
              <Route path="/geography" element={isAuthenticated ? <Geography /> : <Navigate to="/login" />} />
              <Route path="/commande" element={isAuthenticated ? <Commande /> : <Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
