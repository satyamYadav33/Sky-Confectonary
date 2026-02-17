
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartProps {
  onNavigateHome: () => void;
  onNavigateToCatalog: () => void;
  onNavigateToCheckout: () => void;
  cartCount?: number;
  cartItems?: CartItem[];
  onUpdateQuantity?: (productId: number, delta: number) => void;
  onRemoveItem?: (productId: number) => void;
  onClearCart?: () => void;
}

const Cart: React.FC<CartProps> = ({ 
  onNavigateHome, 
  onNavigateToCatalog, 
  onNavigateToCheckout, 
  cartCount = 0,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);
  const [isClearCartOpen, setIsClearCartOpen] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discount = subtotal > 500 ? subtotal * 0.05 : 0; // Simple discount logic
  const shipping = subtotal > 1000 ? 0 : 25; // Simple shipping logic
  const total = subtotal - discount + shipping;

  const handleRemoveItem = () => {
    if (itemToRemove !== null && onRemoveItem) {
      onRemoveItem(itemToRemove);
      setItemToRemove(null);
    }
  };

  const handleClearCart = () => {
    if (onClearCart) {
      onClearCart();
      setIsClearCartOpen(false);
    }
  };

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
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-1 text-slate-800 dark:text-slate-200 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                  {cartCount}
                </span>
              )}
            </button>
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
          {discount > 0 && (
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">savings</span>
            Estimated Bulk Savings: ${discount.toFixed(2)}
          </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            
            {cartItems.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-4xl text-slate-400">shopping_basket</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Your cart is empty</h2>
                    <p className="text-slate-500 mb-8">Start adding items from our wholesale catalog.</p>
                    <button 
                        onClick={onNavigateToCatalog}
                        className="bg-primary text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-primary/90 transition-all"
                    >
                        Browse Catalog
                    </button>
                </div>
            ) : (
                <>
                {/* Cart Table */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:grid">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Pricing</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Total</div>
                </div>

                {cartItems.map((item) => (
                <div key={item.product.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-6 border-b border-slate-100 dark:border-slate-800/50 items-center">
                    <div className="col-span-1 sm:col-span-6 flex gap-4">
                    <div className="h-20 w-20 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden border border-slate-200 dark:border-slate-700">
                        <img 
                        src={item.product.image} 
                        alt={item.product.title} 
                        className="h-full w-full object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">{item.product.title}</h3>
                        <p className="text-xs text-slate-500 mb-3">{item.product.brand}</p>
                        {/* Mobile Remove */}
                        <button 
                            onClick={() => setItemToRemove(item.product.id)}
                            className="text-xs text-red-500 hover:text-red-600 font-bold flex items-center gap-1 sm:hidden"
                        >
                            Remove
                        </button>
                        {/* Desktop Remove (Added for completeness/visibility) */}
                         <button 
                            onClick={() => setItemToRemove(item.product.id)}
                            className="hidden sm:flex text-xs text-slate-400 hover:text-red-500 font-bold items-center gap-1 mt-1 transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">delete</span>
                            Remove Item
                        </button>
                    </div>
                    </div>
                    <div className="col-span-1 sm:col-span-2 text-left sm:text-center">
                    <div className="font-bold text-primary text-lg">${item.product.price.toFixed(2)}</div>
                    <div className="text-xs text-slate-400">Per {item.product.type}</div>
                    </div>
                    <div className="col-span-1 sm:col-span-2 flex justify-start sm:justify-center">
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                        <button 
                            onClick={() => onUpdateQuantity?.(item.product.id, -1)}
                            className="px-3 py-1 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"
                        >
                        <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="px-2 font-semibold text-sm">{item.quantity}</span>
                        <button 
                            onClick={() => onUpdateQuantity?.(item.product.id, 1)}
                            className="px-3 py-1 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"
                        >
                        <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                    </div>
                    </div>
                    <div className="col-span-1 sm:col-span-2 text-right">
                    <div className="font-bold text-slate-900 dark:text-white text-lg">${(item.product.price * item.quantity).toFixed(2)}</div>
                    </div>
                </div>
                ))}

                {/* Actions Footer */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                    <button 
                        onClick={() => setIsClearCartOpen(true)}
                        className="text-slate-500 hover:text-red-500 font-medium text-sm flex items-center gap-2 transition-colors"
                    >
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
                        Orders over $1000 qualify for free palletized shipping within 2 days.
                    </p>
                    </div>
                </div>
                </div>
                </>
            )}
          </div>

          {/* Right Column - Summary & Help */}
          {cartItems.length > 0 && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h3>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Subtotal ({cartCount} Units)</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Bulk Discount</span>
                  <span className="font-semibold text-green-600">-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Shipping</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Tax (Vat 0%)</span>
                  <span className="font-semibold text-slate-900 dark:text-white">$0.00</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Grand Total</div>
                <div className="flex items-baseline justify-between">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">${total.toFixed(2)}</span>
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
            </div>
          </div>
          )}
        </div>
      </main>

      {/* Confirmation Dialogs */}
      {/* Remove Item Dialog */}
      {itemToRemove !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setItemToRemove(null)}></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">delete</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Remove Item?</h3>
            <p className="text-slate-500 mb-6">
              Are you sure you want to remove this item from your cart?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setItemToRemove(null)}
                className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleRemoveItem}
                className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear Cart Dialog */}
      {isClearCartOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsClearCartOpen(false)}></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all">
             <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">remove_shopping_cart</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Clear Cart?</h3>
            <p className="text-slate-500 mb-6">
              This will remove all items from your cart. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsClearCartOpen(false)}
                className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleClearCart}
                className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Cart;
