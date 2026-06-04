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
import ServicePage from './components/ServicePage';
import Seo from './components/Seo';
import FAQSection from './components/FAQSection';
import { api } from './lib/api';
import { currentRoute, navigateToRoute } from './lib/navigation';
import { NAV_LINKS } from './data';
import { HOME_FAQS, HOME_SEO, SERVICE_PAGES, faqSchema, localBusinessSchema, serviceSchema } from './seoData';

const SECTION_TITLES = NAV_LINKS.reduce((titles, link) => {
  titles[link.href.replace('#', '').toLowerCase()] = link.label;
  return titles;
}, {});

function pageTitle(route) {
  if (SERVICE_PAGES[route]) {
    return SERVICE_PAGES[route].title;
  }

  return {
    home: 'Novaria Transportation',
    login: 'Login',
    dashboard: 'Dashboard',
    admin: 'Admin',
    ...SECTION_TITLES,
  }[route] || 'Novaria Transportation';
}

export default function App() {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [route, setRoute] = useState(currentRoute());
  const [, setTitle] = useState(pageTitle(currentRoute()));
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      const nextRoute = currentRoute();
      setRoute(nextRoute);
      setTitle(pageTitle(nextRoute));
    };
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    api.session()
      .then((data) => setUser(data.user || null))
      .catch(() => setUser(null))
      .finally(() => setAuthReady(true));
  }, []);

  const servicePage = SERVICE_PAGES[route];
  const seoPage = servicePage
    ? {
        title: servicePage.metaTitle,
        description: servicePage.metaDescription,
        path: servicePage.path,
        keywords: `${servicePage.title}, Novaria Transportation, Dallas-Fort Worth transportation, DFW chauffeur service`,
      }
    : route === 'login'
      ? {
          title: 'Login | Novaria Transportation',
          description: 'Access your Novaria Transportation rider or admin dashboard.',
          path: '/login',
        }
      : route === 'dashboard'
        ? {
            title: 'Dashboard | Novaria Transportation',
            description: 'View Novaria Transportation bookings and account details.',
            path: '/dashboard',
          }
        : route === 'admin'
          ? {
              title: 'Admin Dashboard | Novaria Transportation',
              description: 'Manage Novaria Transportation bookings and operations.',
              path: '/admin',
            }
          : HOME_SEO;

  const schemas = servicePage
    ? [localBusinessSchema(), serviceSchema(servicePage), faqSchema(servicePage.faqs)]
    : route === 'home'
      ? [localBusinessSchema(), faqSchema(HOME_FAQS)]
      : [localBusinessSchema()];

  return (
    <ThemeProvider>
      <Seo page={seoPage} schema={schemas} />
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
      ) : servicePage ? (
        <ServicePage
          page={servicePage}
          user={user}
          onTitleChange={setTitle}
          onDashboard={() => { navigateToRoute(user?.role === 'admin' ? 'admin' : 'dashboard'); }}
        />
      ) : (
        <div className="min-h-screen section-bg">
          <Navbar
            user={user}
            onTitleChange={setTitle}
            onDashboard={() => { navigateToRoute(user?.role === 'admin' ? 'admin' : 'dashboard'); }}
          />
          <Hero />
          <Services />
          <Fleet onSelectVehicle={setSelectedVehicle} />
          <BookingForm preselectedVehicle={selectedVehicle} />
          <Stats />
          <About />
          <FAQSection
            eyebrow="DFW Transportation FAQ"
            title="Luxury Transportation Questions"
            faqs={HOME_FAQS}
          />
          <Contact />
          <Footer />
        </div>
      )}
    </ThemeProvider>
  );
}
