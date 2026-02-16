import React from 'react';

interface FooterProps {
  onNavigateToCatalog?: () => void;
  onNavigateToSupport?: () => void;
  onNavigateToHome?: () => void;
}

const Footer: React.FC<FooterProps> = ({ 
  onNavigateToCatalog, 
  onNavigateToSupport,
  onNavigateToHome 
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-white cursor-pointer" onClick={onNavigateToHome}>
              <span className="material-symbols-outlined text-primary">bakery_dining</span>
              <span className="text-xl font-black tracking-tight">Sky Confectionery</span>
            </div>
            <p className="text-sm leading-relaxed">
              The premier B2B wholesale platform for high-quality confectionery and groceries, built on a foundation of reliability and scale.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <span className="material-symbols-outlined text-lg">public</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <span className="material-symbols-outlined text-lg">alternate_email</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li><button onClick={onNavigateToCatalog} className="hover:text-primary transition-colors text-left">Product Catalog</button></li>
              <li><button onClick={onNavigateToCatalog} className="hover:text-primary transition-colors text-left">Wholesale Pricing</button></li>
              <li><button onClick={onNavigateToSupport} className="hover:text-primary transition-colors text-left">Shipping Policy</button></li>
              <li><button onClick={onNavigateToSupport} className="hover:text-primary transition-colors text-left">Become a Partner</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                <span>122 Wholesale Way, Suite 400<br />Logistics District, IL 60601</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">call</span>
                <span>+1 (800) SKY-BULK</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">mail</span>
                <span>sales@skyconfectionery.com</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Our Location</h4>
            <div className="rounded-xl overflow-hidden h-32 w-full bg-slate-800 relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZwMbt_lx5twUXttX3Cd4e8lu5m-Kaa0VqktyUVFYlpWAaj9gY-TQH10lrYvL9L2czDZBsaG3Ue-kV79qD2GcuBvSqcKD9RLSwg4wSABe7RY-S88NKowkczEtU11dbFX2ZB2Rh_aPyxGMj9XeA8wm_Cb_ns4xMqPr582XveqT_9G2oecCGRAEjUx7kir4F5M4x3-Lx-K_ODyt3ICE8pYkYqfchXJMNHNg7bWrkRngEthNPjKRGNYcaCNafUK1s8NX2BSCLPcKFrf4"
                alt="Map location"
                className="h-full w-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2024 Sky Confectionery Group Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;