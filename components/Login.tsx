import React from 'react';

interface LoginProps {
  onNavigateHome: () => void;
  onNavigateToCatalog: () => void;
}

const Login: React.FC<LoginProps> = ({ onNavigateHome, onNavigateToCatalog }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-background-dark px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
            <span className="material-symbols-outlined text-2xl">bakery_dining</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-slate-500 text-sm">Sign in to your wholesale account</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onNavigateToCatalog(); }}>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all dark:text-white"
              placeholder="name@company.com"
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Password</label>
            <input 
              type="password" 
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all dark:text-white"
              placeholder="••••••••"
              required 
            />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
              <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
              <span>Remember me</span>
            </label>
            <button type="button" className="text-primary font-bold hover:underline">Forgot password?</button>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-sm text-slate-500">
          Don't have an account? <button className="text-primary font-bold hover:underline">Apply for Wholesale</button>
        </div>
        
        <div className="mt-4 text-center">
             <button onClick={onNavigateHome} className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back to Home
             </button>
        </div>
      </div>
    </div>
  );
};

export default Login;