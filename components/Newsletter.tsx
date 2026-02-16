import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary to-primary/90 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
          
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
              Join 2,500+ Retailers
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              Unlock Exclusive <br/><span className="text-yellow-300">Wholesale Pricing</span>
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Sign up for our partner program to get access to bulk discounts, early product drops, and industry insights delivered straight to your inbox.
            </p>
            
            <div className="flex items-center gap-4 text-white/70 text-sm font-medium justify-center lg:justify-start">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-yellow-300 text-lg">check_circle</span>
                No spam
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-yellow-300 text-lg">check_circle</span>
                Unsubscribe anytime
              </span>
            </div>
          </div>

          <div className="w-full lg:w-auto max-w-md">
            {status === 'success' ? (
              <div className="bg-white rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl">mark_email_read</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Check your inbox!</h3>
                <p className="text-slate-600 mb-6">
                  We've sent a welcome email with your wholesale catalog access link to the address provided.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-primary font-bold hover:underline"
                >
                  Register another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 rounded-xl border-none bg-transparent text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Enter business email..."
                    required
                    disabled={status === 'loading'}
                  />
                </div>
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="h-14 px-8 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  ) : (
                    <>
                      Get Access
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;