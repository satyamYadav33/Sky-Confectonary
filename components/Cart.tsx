import React from 'react';

interface CartProps {
  onNavigateHome: () => void;
  onNavigateToCatalog: () => void;
  onNavigateToCheckout: () => void;
  cartCount?: number;
}

const Cart: React.FC<CartProps> = ({ onNavigateHome, onNavigateToCatalog, onNavigateToCheckout, cartCount = 0 }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-background-dark">
      {/* Cart Header */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 gap-8">
          <div className="flex items-center gap-10">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={onNavigateHome}
            >
              <div className="bg-primary text-white p-1.5 rounded-lg">
                <span className="material-symbols-outlined block">bakery_dining</span>
              </div>
              <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Sky Confectionery
              </h2>
            </div>
            
            <nav className="hidden lg:flex items-center gap-6">
              <button 
                onClick={onNavigateToCatalog}
                className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
              >
                Wholesale Catalog
              </button>
              <button className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                Bulk Candy
              </button>
              <button className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                Beverages
              </button>
              <button className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                Recent Orders
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:block relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                search
              </span>
              <input 
                type="text"
                placeholder="Quick SKU Search"
                className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2.5 pl-10 pr-4 text-sm w-64 outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <button className="relative p-1 text-slate-800 dark:text-slate-200 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                  {cartCount}
                </span>
              )}
            </button>
            
            <img 
              src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" 
              alt="User" 
              className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mx-auto w-full max-w-[1400px] px-6 py-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
              Wholesale Shopping Cart
            </h1>
            <p className="text-slate-500 text-lg">
              Review your bulk order and MOQ requirements.
            </p>
          </div>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">savings</span>
            Estimated Bulk Savings: $142.50
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Alert Banner */}
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 flex gap-4">
              <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">info</span>
              <div>
                <h4 className="font-bold text-orange-800 dark:text-orange-200">Action Required: MOQ Not Met</h4>
                <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                  Some items in your cart do not meet the minimum order quantity for wholesale pricing.
                </p>
              </div>
            </div>

            {/* Cart Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Pricing</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Item 1 */}
              <div className="grid grid-cols-12 gap-4 p-6 border-b border-slate-100 dark:border-slate-800/50 items-center">
                <div className="col-span-6 flex gap-4">
                  <div className="h-20 w-20 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOtbuxazz6j7gVdcqNV5MX8afhj0IK61ghyPsW0tfIOc59IKy6hrrPruX1gKyiujIiaaPiLwnWDQFWd16sop2xx1gtVJBDy2tekyefcEUVlGmFG78Uy7ZyGng2ILoUE5S2Y5lwf2cSVouUWRcjc11-5Nmp1T9tLEKiFK3OUl5icD9bGm8pvTOBKhfP-fefKzIdGFa_bhcDVygXUwVz_LsmtXXdYFMYusKNP_9hnUlrgR0wv2pL-5ORwSpv5Zq5fI9IfRaKOnkP0c" 
                      alt="Gummy Bears" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Gummy Bears (5kg Bulk)</h3>
                    <p className="text-xs text-slate-500 mb-3">SKU: GB-5KG-01</p>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-[10px] font-black uppercase tracking-wide">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      MOQ MET (2 UNITS)
                    </div>
                  </div>
                </div>
                <div className="col-span-2 text-center">
                  <div className="font-bold text-primary text-lg">$45.00</div>
                  <div className="text-xs text-slate-400 line-through">Retail: $60.00</div>
                </div>
                <div className="col-span-2 flex justify-center">
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                    <button className="px-3 py-1 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700">
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="px-2 font-semibold text-sm">3</span>
                    <button className="px-3 py-1 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700">
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <div className="font-bold text-slate-900 dark:text-white text-lg">$135.00</div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="grid grid-cols-12 gap-4 p-6 border-b border-slate-100 dark:border-slate-800/50 items-center">
                <div className="col-span-6 flex gap-4">
                  <div className="h-20 w-20 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2Y9VCMAYqrfdwL319_PJ01D597nh642tdmUHxuoprAtHQafCJwDdxIM3v0aiIEAymLIVAmhXz4CWmYs_kJZKxHIaDGqBAj8cmLHHqcsHWA_hlTZ9tT1xbAsTj-6wFpUc45i4c4bOWQSwug9gbkYa6g8Ia-zsUKYKozs0XrZrbXlPOUAfGznmGYvY1roGRhJAeDzInK5b7UV71QPal6EW4PtUkj5d1JSHNd_3OPoXEz65jyLkO-OrxEetAWER8igY3Zsdg02SxRqY" 
                      alt="Artisanal Soda Pack" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Artisanal Soda Pack</h3>
                    <p className="text-xs text-slate-500 mb-3">SKU: SD-VTY-24</p>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-[10px] font-black uppercase tracking-wide">
                      <span className="material-symbols-outlined text-sm">warning</span>
                      NEED 3 MORE FOR MOQ
                    </div>
                  </div>
                </div>
                <div className="col-span-2 text-center">
                  <div className="font-bold text-primary text-lg">$32.50</div>
                  <div className="text-xs text-slate-400 line-through">Retail: $48.00</div>
                </div>
                <div className="col-span-2 flex justify-center">
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                    <button className="px-3 py-1 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700">
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="px-2 font-semibold text-sm">5</span>
                    <button className="px-3 py-1 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700">
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <div className="font-bold text-slate-900 dark:text-white text-lg">$162.50</div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                <button className="text-slate-500 hover:text-red-500 font-medium text-sm flex items-center gap-2 transition-colors">
                  <span className="material-symbols-outlined text-lg">delete</span>
                  Clear All Items
                </button>
                <button 
                  onClick={onNavigateToCatalog}
                  className="text-primary hover:text-primary/80 font-bold text-sm flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                  Add more items
                </button>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 flex gap-4 items-start">
                <div className="bg-primary/20 p-2 rounded-lg text-primary">
                  <span className="material-symbols-outlined">local_shipping</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Tier 1 Shipping</h4>
                  <p className="text-sm text-slate-500">
                    Orders over $500 qualify for free palletized shipping within 2 days.
                  </p>
                </div>
              </div>
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 flex gap-4 items-start">
                <div className="bg-primary/20 p-2 rounded-lg text-primary">
                  <span className="material-symbols-outlined">inventory_2</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">In Stock Guarantee</h4>
                  <p className="text-sm text-slate-500">
                    All items are ready for dispatch from our central warehouse.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Help */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h3>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Subtotal (8 Units)</span>
                  <span className="font-semibold text-slate-900 dark:text-white">$297.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Bulk Discount</span>
                  <span className="font-semibold text-green-600">-$42.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Est. Shipping</span>
                  <span className="font-semibold text-slate-900 dark:text-white">$15.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Tax (Vat 0%)</span>
                  <span className="font-semibold text-slate-900 dark:text-white">$0.00</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Grand Total</div>
                <div className="flex items-baseline justify-between">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">$270.50</span>
                  <span className="text-xs text-slate-400">Currency: USD</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={onNavigateToCheckout}
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">payments</span>
                  Proceed to Checkout
                </button>
                <button className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold py-4 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">description</span>
                  Download Quote (PDF)
                </button>
              </div>

              <div className="flex justify-center gap-4 mt-6 opacity-40">
                <span className="material-symbols-outlined text-2xl">credit_card</span>
                <span className="material-symbols-outlined text-2xl">account_balance</span>
                <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
              </div>
            </div>

            <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/10">
              <div className="flex gap-3 mb-2">
                <span className="material-symbols-outlined text-primary text-2xl">support_agent</span>
                <h4 className="font-bold text-slate-900 dark:text-white">Need help with Bulk?</h4>
              </div>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                Chat with our wholesale specialists for custom orders over 1,000kg.
              </p>
              <a href="#" className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                Speak with an agent
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;