import { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Fleet from './components/Fleet';
import BookingForm from './components/BookingForm';
import Stats from './components/Stats';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { api } from './lib/api';

function currentRoute() {
  return (window.location.hash.replace('#', '').split('?')[0] || 'home').toLowerCase();
}

export default function App() {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [route, setRoute] = useState(currentRoute());
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const handleHash = () => setRoute(currentRoute());
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    api.session()
      .then((data) => setUser(data.user || null))
      .catch(() => setUser(null))
      .finally(() => setAuthReady(true));
  }, []);

  return (
    <ThemeProvider>
      {route === 'login' ? (
        <Login onLogin={setUser} />
      ) : route === 'dashboard' || route === 'admin' ? (
        authReady ? (
          <Dashboard user={user} onLogout={() => setUser(null)} />
        ) : (
          <div className="flex min-h-screen items-center justify-center section-bg text-theme-muted">
            Loading dashboard...
          </div>
        )
      ) : (
        <div className="min-h-screen section-bg">
          <Navbar
            user={user}
            onDashboard={() => { window.location.hash = user ? (user.role === 'admin' ? '#admin' : '#dashboard') : '#login'; }}
          />
          <Hero />
          <Services />
          <Fleet onSelectVehicle={setSelectedVehicle} />
          <BookingForm preselectedVehicle={selectedVehicle} />
          <Stats />
          <About />
          <Contact />
          <Footer />
        </div>
      )}
    </ThemeProvider>
  );
}
