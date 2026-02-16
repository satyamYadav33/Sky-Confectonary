import React from 'react';

interface OrderTrackingProps {
  onNavigateHome: () => void;
  onNavigateToCatalog: () => void;
  onNavigateToSupport?: () => void;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ 
  onNavigateHome, 
  onNavigateToCatalog,
  onNavigateToSupport
}) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Header */}
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
             <button onClick={onNavigateToSupport} className="hover:text-primary">Support</button>
           </nav>
           <div>
              <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" alt="User" className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200" />
           </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <button onClick={onNavigateHome} className="flex items-center gap-2 text-slate-500 hover:text-primary text-sm font-bold mb-4">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Home
          </button>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 mb-2">Track Order</h1>
              <p className="text-slate-500">Order #SKY-10293847 • Placed on Oct 24, 2024</p>
            </div>
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">inventory_2</span>
              Processing Order
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-8">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full"></div>
            <div className="absolute top-1/2 left-0 w-[25%] h-1 bg-primary -translate-y-1/2 rounded-full transition-all duration-1000"></div>

            {/* Steps */}
            <div className="relative flex justify-between z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center border-4 border-white shadow-sm">
                  <span className="material-symbols-outlined text-lg">check</span>
                </div>
                <div className="text-center">
                  <p className="font-bold text-sm text-slate-900">Order Placed</p>
                  <p className="text-xs text-slate-400">Oct 24, 10:30 AM</p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center border-4 border-white shadow-sm ring-4 ring-primary/20 animate-pulse">
                  <span className="material-symbols-outlined text-lg">sync</span>
                </div>
                <div className="text-center">
                  <p className="font-bold text-sm text-primary">Processing</p>
                  <p className="text-xs text-slate-400">In Progress</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border-4 border-white">
                  <span className="material-symbols-outlined text-lg">local_shipping</span>
                </div>
                <div className="text-center">
                  <p className="font-bold text-sm text-slate-400">Shipped</p>
                  <p className="text-xs text-slate-400">Pending</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border-4 border-white">
                  <span className="material-symbols-outlined text-lg">home</span>
                </div>
                <div className="text-center">
                  <p className="font-bold text-sm text-slate-400">Delivered</p>
                  <p className="text-xs text-slate-400">Est. Oct 29</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Updates */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400">history</span>
              Order Updates
            </h3>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="space-y-8 relative">
                <div className="absolute top-2 bottom-2 left-[19px] w-[2px] bg-slate-100"></div>
                
                <div className="relative flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center z-10 border-4 border-white">
                    <span className="material-symbols-outlined text-lg">inventory</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Order is being packed</h4>
                    <p className="text-sm text-slate-500 mb-1">Our warehouse team is gathering your items.</p>
                    <p className="text-xs text-slate-400">Oct 24, 2:15 PM</p>
                  </div>
                </div>

                <div className="relative flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center z-10 border-4 border-white">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Order Placed Successfully</h4>
                    <p className="text-sm text-slate-500 mb-1">We have received your order details.</p>
                    <p className="text-xs text-slate-400">Oct 24, 10:30 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Shipping To</h4>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-slate-400">location_on</span>
                <div className="text-sm text-slate-600">
                  <p className="font-bold text-slate-900 mb-1">Sky Retail Branch #4</p>
                  <p>122 Wholesale Way</p>
                  <p>Suite 400</p>
                  <p>Logistics District, IL 60601</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Items</h4>
               <div className="space-y-3">
                 <div className="flex justify-between text-sm">
                   <span className="text-slate-600">4 Items</span>
                   <span className="font-bold text-slate-900">$64.31</span>
                 </div>
                 <button onClick={onNavigateToCatalog} className="w-full py-2 text-primary text-sm font-bold border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">
                   View Items
                 </button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderTracking;