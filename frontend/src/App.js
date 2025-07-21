import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import PortfolioPage from "./pages/PortfolioPage";
import TransactionsPage from "./pages/TransactionsPage";
import ReportsPage from "./pages/ReportsPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [mode, setMode] = useState('light');
  const theme = createTheme({ palette: { mode } });

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar toggleTheme={() => setMode(mode === 'light' ? 'dark' : 'light')} />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/portfolio" element={<PrivateRoute><PortfolioPage /></PrivateRoute>} />
            <Route path="/transactions" element={<PrivateRoute><TransactionsPage /></PrivateRoute>} />
            <Route path="/reports" element={<PrivateRoute roles={['admin']}><ReportsPage /></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
