import React from 'react';

interface OrderConfirmationProps {
  onNavigateHome: () => void;
  onNavigateToCatalog: () => void;
  onNavigateToTracking?: () => void;
  onNavigateToSupport?: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ 
  onNavigateHome, 
  onNavigateToCatalog,
  onNavigateToTracking,
  onNavigateToSupport
}) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Specific Header for this page as per design */}
      <header className="w-full bg-white border-b border-slate-100 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
           <div className="flex items-center gap-2 cursor-pointer" onClick={onNavigateHome}>
              <div className="bg-primary text-white p-1.5 rounded-lg">
                <span className="material-symbols-outlined block">bakery_dining</span>
              </div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">
                Sky Confectionery
              </h2>
           </div>
           <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
             <button onClick={onNavigateToCatalog} className="hover:text-primary">Shop</button>
             <button className="hover:text-primary">Gifts</button>
             <button className="hover:text-primary">Our Story</button>
           </nav>
           <div>
              <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" alt="User" className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200" />
           </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-12">
        {/* Success Message */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
             <span className="material-symbols-outlined text-4xl text-primary">check</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">
            Your order is on its way to being sweet!
          </h1>
          <p className="text-slate-500 max-w-lg leading-relaxed">
            Thank you for choosing Sky Confectionery! We've received your order and our candy makers are already at work.
          </p>
        </div>

        {/* Order Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
           <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-start">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                 <span className="material-symbols-outlined text-base">receipt_long</span>
                 Order Number
              </div>
              <p className="text-2xl font-bold text-slate-900">#SKY-10293847</p>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-start">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                 <span className="material-symbols-outlined text-base">local_shipping</span>
                 Estimated Arrival
              </div>
              <p className="text-2xl font-bold text-slate-900">3-5 Business Days</p>
           </div>
        </div>

        {/* Summary List */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
           <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-lg font-serif">Order Summary</h3>
              <button 
                onClick={() => window.print()}
                className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
              >
                 <span className="material-symbols-outlined text-base">print</span>
                 Print Receipt
              </button>
           </div>
           
           <div className="divide-y divide-slate-50">
              {/* Item 1 */}
              <div className="p-6 flex items-center gap-6">
                 <img src="https://images.unsplash.com/photo-1582234372579-22a84976d8b6?auto=format&fit=crop&q=80&w=200" className="h-20 w-20 object-cover rounded-xl bg-slate-100" alt="Cloud Marshmallows" />
                 <div className="flex-1">
                    <h4 className="font-bold text-slate-900 font-serif">Cloud Marshmallows</h4>
                    <p className="text-sm text-slate-500">Size: Large Jar (500g)</p>
                    <p className="text-sm text-slate-500">Qty: 1</p>
                 </div>
                 <div className="font-bold text-lg">$18.00</div>
              </div>
               {/* Item 2 */}
              <div className="p-6 flex items-center gap-6">
                 <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOtbuxazz6j7gVdcqNV5MX8afhj0IK61ghyPsW0tfIOc59IKy6hrrPruX1gKyiujIiaaPiLwnWDQFWd16sop2xx1gtVJBDy2tekyefcEUVlGmFG78Uy7ZyGng2ILoUE5S2Y5lwf2cSVouUWRcjc11-5Nmp1T9tLEKiFK3OUl5icD9bGm8pvTOBKhfP-fefKzIdGFa_bhcDVygXUwVz_LsmtXXdYFMYusKNP_9hnUlrgR0wv2pL-5ORwSpv5Zq5fI9IfRaKOnkP0c" className="h-20 w-20 object-cover rounded-xl bg-slate-100" alt="Blue Rock Candy" />
                 <div className="flex-1">
                    <h4 className="font-bold text-slate-900 font-serif">Sky-Blue Rock Candy</h4>
                    <p className="text-sm text-slate-500">Flavor: Blueberry Sky</p>
                    <p className="text-sm text-slate-500">Qty: 2</p>
                 </div>
                 <div className="font-bold text-lg">$12.00</div>
              </div>
               {/* Item 3 */}
              <div className="p-6 flex items-center gap-6">
                 <img src="https://images.unsplash.com/photo-1548858231-3051d9575971?auto=format&fit=crop&q=80&w=200" className="h-20 w-20 object-cover rounded-xl bg-slate-100" alt="Galaxy Truffles" />
                 <div className="flex-1">
                    <h4 className="font-bold text-slate-900 font-serif">Galaxy Truffles</h4>
                    <p className="text-sm text-slate-500">Box: 12 Pieces</p>
                    <p className="text-sm text-slate-500">Qty: 1</p>
                 </div>
                 <div className="font-bold text-lg">$24.00</div>
              </div>
           </div>

           <div className="bg-slate-50/50 p-6 space-y-3">
              <div className="flex justify-between text-sm text-slate-600">
                 <span>Subtotal</span>
                 <span className="font-medium">$54.00</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                 <span>Shipping</span>
                 <span className="font-medium">$5.99</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                 <span>Tax</span>
                 <span className="font-medium">$4.32</span>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-slate-200">
                 <span className="font-serif font-bold text-xl text-slate-900">Total</span>
                 <span className="font-serif font-bold text-2xl text-primary">$64.31</span>
              </div>
           </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
           <button 
            onClick={onNavigateToTracking}
            className="flex-1 bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
           >
              <span className="material-symbols-outlined">track_changes</span>
              Track My Treats
           </button>
           <button 
            onClick={onNavigateToCatalog} 
            className="flex-1 bg-white text-primary border-2 border-primary/20 font-bold py-4 rounded-xl hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
           >
              <span className="material-symbols-outlined">shopping_bag</span>
              Continue Shopping
           </button>
        </div>

        {/* Footer Note */}
        <div className="text-center text-sm text-slate-500">
           Need help with your order? <button onClick={onNavigateToSupport} className="text-primary font-bold hover:underline">Contact Customer Support</button> or visit our <button onClick={onNavigateToSupport} className="font-bold hover:text-slate-700">FAQ</button>.
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmation;