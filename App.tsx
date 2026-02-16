import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import FeaturedProducts from './components/FeaturedProducts';
import TrustSection from './components/TrustSection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Catalog from './components/Catalog';
import Cart from './components/Cart';
import OrderConfirmation from './components/OrderConfirmation';
import OrderTracking from './components/OrderTracking';
import Support from './components/Support';
import Login from './components/Login';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalog' | 'cart' | 'order-confirmation' | 'tracking' | 'support' | 'login'>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const addToCart = (quantity: number = 1) => {
    setCartCount(prev => prev + quantity);
  };

  const navigateToCatalog = () => {
    window.scrollTo(0, 0);
    setCurrentPage('catalog');
  };

  const navigateToHome = () => {
    window.scrollTo(0, 0);
    setCurrentPage('home');
  };

  const navigateToCart = () => {
    window.scrollTo(0, 0);
    setCurrentPage('cart');
  };

  const navigateToOrderConfirmation = () => {
    window.scrollTo(0, 0);
    setCurrentPage('order-confirmation');
  };

  const navigateToTracking = () => {
    window.scrollTo(0, 0);
    setCurrentPage('tracking');
  };

  const navigateToSupport = () => {
    window.scrollTo(0, 0);
    setCurrentPage('support');
  };

  const navigateToLogin = () => {
    window.scrollTo(0, 0);
    setCurrentPage('login');
  };

  if (currentPage === 'login') {
    return (
        <Login onNavigateHome={navigateToHome} onNavigateToCatalog={navigateToCatalog} />
    );
  }

  if (currentPage === 'catalog') {
    return (
      <div className="relative flex min-h-screen w-full flex-col font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
        <Catalog 
          onNavigateHome={navigateToHome} 
          onNavigateToCart={navigateToCart} 
          cartCount={cartCount}
          onAddToCart={addToCart}
        />
        <Footer 
          onNavigateToCatalog={navigateToCatalog}
          onNavigateToSupport={navigateToSupport}
          onNavigateToHome={navigateToHome}
        />
      </div>
    );
  }

  if (currentPage === 'cart') {
    return (
      <div className="relative flex min-h-screen w-full flex-col font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
        <Cart 
          onNavigateHome={navigateToHome} 
          onNavigateToCatalog={navigateToCatalog} 
          onNavigateToCheckout={navigateToOrderConfirmation}
          cartCount={cartCount}
        />
        <Footer 
          onNavigateToCatalog={navigateToCatalog}
          onNavigateToSupport={navigateToSupport}
          onNavigateToHome={navigateToHome}
        />
      </div>
    );
  }

  if (currentPage === 'order-confirmation') {
    return (
      <div className="relative flex min-h-screen w-full flex-col font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
        <OrderConfirmation 
          onNavigateHome={navigateToHome} 
          onNavigateToCatalog={navigateToCatalog}
          onNavigateToTracking={navigateToTracking}
          onNavigateToSupport={navigateToSupport}
        />
        <Footer 
          onNavigateToCatalog={navigateToCatalog}
          onNavigateToSupport={navigateToSupport}
          onNavigateToHome={navigateToHome}
        />
      </div>
    );
  }

  if (currentPage === 'tracking') {
    return (
      <div className="relative flex min-h-screen w-full flex-col font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
        <OrderTracking 
          onNavigateHome={navigateToHome} 
          onNavigateToCatalog={navigateToCatalog}
          onNavigateToSupport={navigateToSupport}
        />
        <Footer 
          onNavigateToCatalog={navigateToCatalog}
          onNavigateToSupport={navigateToSupport}
          onNavigateToHome={navigateToHome}
        />
      </div>
    );
  }

  if (currentPage === 'support') {
    return (
      <div className="relative flex min-h-screen w-full flex-col font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
        <Support 
          onNavigateHome={navigateToHome} 
          onNavigateToCatalog={navigateToCatalog}
        />
        <Footer 
          onNavigateToCatalog={navigateToCatalog}
          onNavigateToSupport={navigateToSupport}
          onNavigateToHome={navigateToHome}
        />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-sans">
      <Header 
        onNavigateToCatalog={navigateToCatalog} 
        onNavigateToHome={navigateToHome}
        onNavigateToSupport={navigateToSupport}
        onNavigateToLogin={navigateToLogin}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        cartCount={cartCount}
      />
      <main className="flex-1">
        <Hero 
          onNavigateToCatalog={navigateToCatalog} 
          onNavigateToSupport={navigateToSupport}
        />
        <StatsBar />
        <FeaturedProducts 
          onNavigateToCatalog={navigateToCatalog}
          onAddToCart={addToCart}
        />
        <TrustSection />
        <Newsletter />
      </main>
      <Footer 
        onNavigateToCatalog={navigateToCatalog}
        onNavigateToSupport={navigateToSupport}
        onNavigateToHome={navigateToHome}
      />
    </div>
  );
};

export default App;