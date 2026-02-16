import React, { useEffect, useState } from 'react';

interface HeaderProps {
  onNavigateToCatalog?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToSupport?: () => void;
  onNavigateToLogin?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  cartCount?: number;
}

const Header: React.FC<HeaderProps> = ({ 
  onNavigateToCatalog, 
  onNavigateToHome, 
  onNavigateToSupport,
  onNavigateToLogin,
  isDarkMode,
  onToggleTheme,
  cartCount = 0
}) => {
  const [animateCart, setAnimateCart] = useState(false);
  const navLinkClass = "px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 backdrop-blur-md bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white hover:shadow-lg hover:text-primary hover:scale-105 dark:hover:bg-slate-700 dark:hover:text-white dark:text-slate-200 text-slate-700";

  useEffect(() => {
    if (cartCount > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={onNavigateToHome}>
            <div className="bg-primary text-white p-1.5 rounded-lg">
              <span className="material-symbols-outlined block">bakery_dining</span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Sky Confectionery
            </h2>
          </div>
          <nav className="hidden md:flex items-center gap-4">
            <button 
              onClick={onNavigateToCatalog}
              className={navLinkClass}
            >
              Products
            </button>
            <button 
              onClick={onNavigateToSupport}
              className={navLinkClass}
            >
              Become a Partner
            </button>
            <button 
              onClick={onNavigateToCatalog}
              className={navLinkClass}
            >
              Wholesale
            </button>
            <button
               onClick={onNavigateToHome}
               className={navLinkClass}
            >
               About Us
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Toggle Theme"
          >
            <span className="material-symbols-outlined text-xl">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2 border border-transparent focus-within:border-primary/50 transition-all">
            <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
            <input
              type="text"
              className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-slate-500 ml-2 outline-none dark:text-white"
              placeholder="Search bulk items..."
            />
          </div>
          
          <button className={`relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all ${animateCart ? 'scale-110 text-primary' : ''}`}>
             <span className="material-symbols-outlined text-xl">shopping_cart</span>
             {cartCount > 0 && (
               <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 animate-in zoom-in duration-200">
                 {cartCount}
               </span>
             )}
          </button>

          <button 
            onClick={onNavigateToLogin}
            className="flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            Login / Register
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;