import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import MainPage from './pages/MainPage/MainPage';
import ConstructionPage from './pages/Construction/ConstructionPage';
import LoginPage from './pages/Authentication/LoginPage';
import RegisterPage from './pages/Authentication/RegistrationPage';
import AuthRedirect from './components/AuthRedirect';

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();

  const showNavBar = !['/login', '/register'].includes(location.pathname);

  return (
    <div className="App min-h-screen bg-black text-gray-200">
      <AuthRedirect />
      {showNavBar && <NavBar />}
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/construction" element={<ConstructionPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
