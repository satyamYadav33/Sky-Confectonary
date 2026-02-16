import React from 'react';

interface HeroProps {
  onNavigateToCatalog?: () => void;
  onNavigateToSupport?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToCatalog, onNavigateToSupport }) => {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-background-dark py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary mb-6">
            <span className="material-symbols-outlined text-lg mr-2">verified</span>
            Wholesale Distribution Excellence
          </div>
          <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white lg:text-7xl mb-6">
            Empowering Your Retail Business with <span className="text-primary">Quality</span> Confectionery.
          </h1>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-10 max-w-xl">
            High-quality bulk supplies with reliable regional delivery and competitive wholesale pricing. Scalable solutions for retailers of all sizes.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onNavigateToCatalog}
              className="rounded-xl bg-primary px-8 py-4 text-lg font-bold text-white shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Shop Wholesale
            </button>
            <button 
              onClick={onNavigateToSupport}
              className="rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-transparent px-8 py-4 text-lg font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
        <div className="relative">
          {/* Decorative Blob */}
          <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-[100px]"></div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 aspect-[4/3] bg-slate-200">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuApCK91c23hYJEuSdNiPmFJccSLscxgd-OMs2o09CmzRQlk-jOqZR34DxRK6kNFXcP1c2Hxa9UMVN1tZJX-Qq9_9paBJAfmgs-at1PlH1LrJP3o-2FtSDBHN9u6bVbMYuOYfisPo10Br3Y-iEunzHRRNkiDizxt4kMuq6v_8oRucb1vdXDsn34fwss7Tj4FEpHsQ3rQAAkRweSz2qNK45WGqOHSSKzGRHGQB6-ljPtZYzsalOyCEby0kh4wowUaji40Ovwvjhse2ZM"
              alt="Assorted colorful bulk confectionery and candies in a warehouse"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;