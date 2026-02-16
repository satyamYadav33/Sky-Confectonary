import React from 'react';

const TrustSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
            Built on Reliability & Tech
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            We combine decades of industry experience with world-class technology to serve our retail partners better.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-background-dark p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
            <div className="bg-primary/10 text-primary w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl">storefront</span>
            </div>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2">3.5 Years</h3>
            <p className="text-primary font-bold uppercase tracking-wider text-sm mb-4">Trusted Retail Partner</p>
            <p className="text-slate-500 leading-relaxed">
              Currently serving over 500+ independent and chain retailers across the region with a 98% on-time delivery rate.
            </p>
          </div>
          <div className="bg-white dark:bg-background-dark p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
            <div className="bg-primary/10 text-primary w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl">developer_mode</span>
            </div>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2">15 Years</h3>
            <p className="text-primary font-bold uppercase tracking-wider text-sm mb-4">Amazon Dev Team Backed</p>
            <p className="text-slate-500 leading-relaxed">
              Our platform is engineered by former Amazon developers to ensure seamless inventory management and ordering stability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;