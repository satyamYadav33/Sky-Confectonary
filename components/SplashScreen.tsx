
import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 2200);

    // Unmount after animation finishes
    const cleanup = setTimeout(() => {
      onFinish();
    }, 2800);

    return () => {
      clearTimeout(timer);
      clearTimeout(cleanup);
    };
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 transition-opacity duration-700 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        <div className={`w-28 h-28 bg-primary rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-primary/40 transition-transform duration-700 ${isExiting ? 'scale-50' : 'animate-bounce'}`}>
          <span className="material-symbols-outlined text-7xl text-white">bakery_dining</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3 text-center">
          Sky Confectionery
        </h1>
        <p className="text-slate-500 font-bold tracking-widest uppercase text-sm animate-pulse">
          Premium Wholesale Solutions
        </p>
        
        <div className="mt-12 flex gap-3">
            <div className="w-3 h-3 bg-primary rounded-full animate-[bounce_1s_infinite_0ms]"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-[bounce_1s_infinite_200ms]"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-[bounce_1s_infinite_400ms]"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
