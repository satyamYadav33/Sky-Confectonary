
import React from 'react';

const stats = [
  {
    icon: 'history',
    title: '15+ Years',
    subtitle: 'Industry Expertise',
  },
  {
    icon: 'local_shipping',
    title: 'Reliable Delivery',
    subtitle: 'Local & Regional Routes',
  },
  {
    icon: 'payments',
    title: 'Wholesale Pricing',
    subtitle: 'Tiered Volume Models',
  },
];

const StatsBar: React.FC = () => {
  return (
    <section className="bg-slate-50 dark:bg-slate-900/50 py-12 border-y border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="sr-only">Key Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-5 p-4">
              <div className="flex-shrink-0 bg-primary/10 p-4 rounded-2xl text-primary">
                <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{stat.title}</h3>
                <p className="text-sm text-slate-500 font-medium">{stat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
