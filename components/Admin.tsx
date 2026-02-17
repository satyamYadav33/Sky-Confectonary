
import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';

interface AdminProps {
  onNavigateHome: () => void;
  onNavigateToCatalog: () => void;
  onAddProduct: (product: Product) => void;
  onUpdateProduct?: (product: Product) => void;
  onDeleteProduct?: (productId: number) => void;
  products?: Product[];
}

const SHIPPING_ICONS = [
  { icon: 'local_shipping', label: 'Standard' },
  { icon: 'schedule', label: 'Pre-Order' },
  { icon: 'thermostat', label: 'Cold Chain' },
  { icon: 'verified_user', label: 'Certified' },
  { icon: 'eco', label: 'Organic' },
  { icon: 'wine_bar', label: 'Fragile' },
  { icon: 'inventory_2', label: 'Bulk' },
  { icon: 'flight_takeoff', label: 'Express' }
];

const BADGE_COLORS = [
  { name: 'Red', bg: 'bg-red-100', color: 'text-red-700' },
  { name: 'Green', bg: 'bg-green-100', color: 'text-green-700' },
  { name: 'Blue', bg: 'bg-blue-100', color: 'text-blue-700' },
  { name: 'Orange', bg: 'bg-orange-100', color: 'text-orange-800' },
  { name: 'Purple', bg: 'bg-purple-100', color: 'text-purple-700' },
  { name: 'Gray', bg: 'bg-slate-100', color: 'text-slate-700' },
  { name: 'Teal', bg: 'bg-teal-100', color: 'text-teal-700' },
];

const Admin: React.FC<AdminProps> = ({ 
  onNavigateHome, 
  onNavigateToCatalog, 
  onAddProduct, 
  onUpdateProduct, 
  onDeleteProduct,
  products = [] 
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    brand: '',
    title: '',
    price: '',
    type: 'Case',
    unitPriceText: '',
    moq: '',
    shipping: 'Ships 24h',
    shippingIcon: 'local_shipping',
    image: '',
    description: '',
  });

  // Discount State
  const [discountType, setDiscountType] = useState<'none' | 'percent' | 'fixed' | 'bogo'>('none');
  const [discountValue, setDiscountValue] = useState('');
  const [discountError, setDiscountError] = useState('');

  // Badges State
  const [customBadges, setCustomBadges] = useState<Array<{ text: string; color: string; bg: string }>>([]);
  const [newBadgeText, setNewBadgeText] = useState('');
  const [newBadgeColor, setNewBadgeColor] = useState(BADGE_COLORS[0]);

  const [previewBadges, setPreviewBadges] = useState<Array<{ text: string; color: string; bg: string }>>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate final price
  const basePrice = parseFloat(formData.price) || 0;
  let finalPrice = basePrice;

  if (discountType === 'percent') {
    const pct = parseFloat(discountValue) || 0;
    finalPrice = Math.max(0, basePrice * (1 - pct / 100));
  } else if (discountType === 'fixed') {
    const amt = parseFloat(discountValue) || 0;
    finalPrice = Math.max(0, basePrice - amt);
  }
  // For 'bogo', effective price per unit is halved if buying 2, but list price usually remains same or user might want to adjust.
  // We will keep finalPrice = basePrice for BOGO, but the badge acts as the value proposition.

  useEffect(() => {
    const autoBadges = [];
    setDiscountError('');

    if (discountType === 'bogo') {
        autoBadges.push({ text: 'BUY 1 GET 1 FREE', bg: 'bg-purple-100', color: 'text-purple-700' });
    } else if (discountType !== 'none' && discountValue) {
        const val = parseFloat(discountValue);
        
        // Validation logic for badges / error state
        if (isNaN(val) || val < 0) {
            setDiscountError('Invalid value');
        } else if (discountType === 'percent') {
            if (val > 100) {
                setDiscountError('Percentage cannot exceed 100%');
            } else {
                autoBadges.push({ text: `${val}% OFF`, bg: 'bg-red-100', color: 'text-red-700' });
            }
        } else if (discountType === 'fixed') {
             if (val > basePrice) {
                setDiscountError('Discount exceeds price'); 
             }
             autoBadges.push({ text: `SAVE $${val}`, bg: 'bg-red-100', color: 'text-red-700' });
        }
    }
    
    // Combine auto generated badges with custom badges
    setPreviewBadges([...autoBadges, ...customBadges]);
  }, [discountType, discountValue, basePrice, customBadges]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const validateAndProcessFile = (file: File) => {
    // Client-side validation
    if (!file.type.startsWith('image/')) {
        alert('Invalid file type. Please upload an image (PNG, JPG, GIF).');
        return;
    }
    
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB limit
    if (file.size > maxSizeInBytes) {
        alert('File size too large. Please upload an image smaller than 5MB.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        if (e.target?.result) {
            setFormData(prev => ({ ...prev, image: e.target!.result as string }));
        }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleAddCustomBadge = () => {
    if (!newBadgeText.trim()) return;
    setCustomBadges(prev => [...prev, { 
      text: newBadgeText, 
      color: newBadgeColor.color, 
      bg: newBadgeColor.bg 
    }]);
    setNewBadgeText('');
  };

  const handleRemoveCustomBadge = (index: number) => {
    setCustomBadges(prev => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      brand: '',
      title: '',
      price: '',
      type: 'Case',
      unitPriceText: '',
      moq: '',
      shipping: 'Ships 24h',
      shippingIcon: 'local_shipping',
      image: '',
      description: '',
    });
    setDiscountType('none');
    setDiscountValue('');
    setDiscountError('');
    setCustomBadges([]);
    setPreviewBadges([]);
    setNewBadgeText('');
    setNewBadgeColor(BADGE_COLORS[0]);
    
    // Explicitly clear the file input value
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      brand: product.brand,
      title: product.title,
      price: (product.basePrice || product.price).toString(),
      type: product.type,
      unitPriceText: product.unitPriceText,
      moq: product.moq,
      shipping: product.shipping,
      shippingIcon: product.shippingIcon,
      image: product.image,
      description: product.description || '',
    });

    if (product.discount) {
      setDiscountType(product.discount.type);
      setDiscountValue(product.discount.value);
    } else {
      setDiscountType('none');
      setDiscountValue('');
    }

    setCustomBadges(product.customBadges || []);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      if (onDeleteProduct) onDeleteProduct(id);
      if (editingId === id) resetForm();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
        alert("Please fill in required fields (Brand, Title, Price).");
        return;
    }

    if (discountError) {
        alert("Please fix discount errors before submitting.");
        return;
    }

    // Generate placeholder if no image
    const finalImage = formData.image || `https://placehold.co/600x400/png?text=${encodeURIComponent(formData.title)}`;

    const productData: Product = {
      id: editingId || Date.now(),
      brand: formData.brand,
      title: formData.title,
      price: finalPrice,
      basePrice: basePrice,
      discount: {
        type: discountType,
        value: discountValue
      },
      type: formData.type,
      unitPriceText: formData.unitPriceText,
      moq: formData.moq,
      shipping: formData.shipping,
      shippingIcon: formData.shippingIcon,
      image: finalImage,
      description: formData.description,
      badges: previewBadges, // Final computed badges including discount
      customBadges: customBadges // Store custom ones separately for editing
    };

    if (editingId && onUpdateProduct) {
      onUpdateProduct(productData);
      alert('Product updated successfully!');
    } else {
      onAddProduct(productData);
      alert('Product added successfully!');
    }
    
    resetForm();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background-dark flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onNavigateHome}>
            <span className="material-symbols-outlined text-primary">bakery_dining</span>
            <span className="text-xl font-black tracking-tight">Sky Admin</span>
          </div>
          <button onClick={onNavigateToCatalog} className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors bg-slate-800 px-4 py-2 rounded-lg">
            <span className="material-symbols-outlined text-sm">storefront</span>
            Back to Catalog
          </button>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-7xl w-full p-6 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          
          {/* Form Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
             <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-end bg-slate-50/50 dark:bg-slate-800/30">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                      {editingId ? `Edit Product` : 'Add New Product'}
                  </h1>
                  <p className="text-sm text-slate-500">
                      {editingId ? 'Modify product details below.' : 'Enter product details to add to the wholesale catalog.'}
                  </p>
                </div>
                {editingId && (
                    <button onClick={resetForm} className="text-xs font-bold text-slate-500 hover:text-red-500 transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">close</span>
                        Cancel
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              
              {/* Product Info Group */}
              <div className="space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">info</span>
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Brand Name</label>
                      <input 
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all dark:text-white"
                        placeholder="e.g. Sky Blue Essentials"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Product Title</label>
                      <input 
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all dark:text-white"
                        placeholder="e.g. Blue Raspberry Candy"
                        required
                      />
                    </div>
                  </div>
              </div>

              <hr className="border-slate-100 dark:border-slate-800" />

              {/* Pricing Group */}
              <div className="space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">payments</span>
                    Pricing & Discounts
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Base Price ($)</label>
                      <input 
                        name="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all dark:text-white"
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Discount Type</label>
                      <div className="relative">
                        <select 
                          value={discountType}
                          onChange={(e) => setDiscountType(e.target.value as any)}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all dark:text-white appearance-none"
                        >
                          <option value="none">None</option>
                          <option value="percent">Percentage (%)</option>
                          <option value="fixed">Fixed Amount ($)</option>
                          <option value="bogo">Buy 1 Get 1 Free</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                      </div>
                    </div>
                     <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Discount Value</label>
                      <div className="relative">
                        <input 
                            type="number"
                            step="0.01"
                            value={discountValue}
                            onChange={(e) => setDiscountValue(e.target.value)}
                            disabled={discountType === 'none' || discountType === 'bogo'}
                            className={`w-full bg-slate-50 dark:bg-slate-800 border rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all dark:text-white disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-slate-900 ${discountError ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                            placeholder={discountType === 'percent' ? "e.g. 20" : discountType === 'bogo' ? "N/A" : "e.g. 5.00"}
                        />
                         {discountError && (
                            <div className="absolute top-full left-0 mt-1 text-[10px] text-red-500 font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">error</span>
                                {discountError}
                            </div>
                         )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                       <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Unit Type</label>
                        <div className="relative">
                            <select 
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all dark:text-white appearance-none"
                            >
                                <option value="Case">Case</option>
                                <option value="Unit">Unit</option>
                                <option value="Box">Box</option>
                                <option value="Pallet">Pallet</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                        </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Unit Price Text</label>
                            <input 
                            name="unitPriceText"
                            value={formData.unitPriceText}
                            onChange={handleChange}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all dark:text-white"
                            placeholder="e.g. $0.45/unit"
                            required
                            />
                        </div>
                  </div>
              </div>

              <hr className="border-slate-100 dark:border-slate-800" />

              {/* Logistics Group */}
              <div className="space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">local_shipping</span>
                    Logistics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">MOQ (Minimum Order)</label>
                        <input 
                            name="moq"
                            value={formData.moq}
                            onChange={handleChange}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all dark:text-white"
                            placeholder="e.g. 10 Cases"
                            required
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Shipping Text</label>
                        <input 
                            name="shipping"
                            value={formData.shipping}
                            onChange={handleChange}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all dark:text-white"
                            placeholder="e.g. Ships 24h"
                            required
                        />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Shipping Icon</label>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                        {SHIPPING_ICONS.map((option) => (
                            <button
                                type="button"
                                key={option.icon}
                                onClick={() => setFormData(prev => ({ ...prev, shippingIcon: option.icon }))}
                                className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all aspect-square ${
                                    formData.shippingIcon === option.icon 
                                    ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/20' 
                                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-700'
                                }`}
                                title={option.label}
                            >
                                <span className="material-symbols-outlined text-xl mb-1">{option.icon}</span>
                                <span className="text-[9px] font-bold truncate w-full text-center">{option.label}</span>
                            </button>
                        ))}
                    </div>
                  </div>
              </div>

              <hr className="border-slate-100 dark:border-slate-800" />

              {/* Badges Group */}
              <div className="space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">verified</span>
                    Badges & Tags
                  </h3>
                  <div className="space-y-3">
                      <div className="flex gap-2">
                          <input 
                              type="text" 
                              value={newBadgeText}
                              onChange={(e) => setNewBadgeText(e.target.value)}
                              placeholder="Badge Text (e.g. New Arrival)"
                              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm dark:text-white"
                          />
                          <div className="relative w-32">
                            <select 
                                value={newBadgeColor.name}
                                onChange={(e) => setNewBadgeColor(BADGE_COLORS.find(c => c.name === e.target.value) || BADGE_COLORS[0])}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm font-medium dark:text-white appearance-none"
                            >
                                {BADGE_COLORS.map(c => (
                                    <option key={c.name} value={c.name}>{c.name}</option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">expand_more</span>
                          </div>
                          <button 
                            type="button" 
                            onClick={handleAddCustomBadge}
                            className="bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white px-4 rounded-lg font-bold text-sm transition-colors"
                          >
                              Add
                          </button>
                      </div>
                      
                      {customBadges.length > 0 && (
                          <div className="flex flex-wrap gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                              {customBadges.map((badge, idx) => (
                                  <div key={idx} className={`flex items-center gap-2 pl-3 pr-1 py-1 rounded-full text-xs font-black uppercase tracking-wider ${badge.bg} ${badge.color}`}>
                                      {badge.text}
                                      <button 
                                        type="button" 
                                        onClick={() => handleRemoveCustomBadge(idx)}
                                        className="hover:bg-black/10 rounded-full p-1 transition-colors"
                                      >
                                          <span className="material-symbols-outlined text-[10px] block font-bold">close</span>
                                      </button>
                                  </div>
                              ))}
                          </div>
                      )}
                  </div>
              </div>

              <hr className="border-slate-100 dark:border-slate-800" />

              {/* Media Group */}
              <div className="space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">image</span>
                    Media & Description
                  </h3>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Product Image</label>
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    
                    {formData.image ? (
                        <div className="relative group w-full h-64 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                            <img 
                                src={formData.image} 
                                alt="Preview" 
                                className="w-full h-full object-contain"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <button 
                                    type="button" 
                                    onClick={removeImage}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-bold flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined">delete</span>
                                    Remove
                                </button>
                                <button 
                                    type="button" 
                                    onClick={triggerFileInput}
                                    className="bg-white text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors font-bold flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined">edit</span>
                                    Change
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div 
                            onDragEnter={handleDrag} 
                            onDragLeave={handleDrag} 
                            onDragOver={handleDrag} 
                            onDrop={handleDrop}
                            onClick={triggerFileInput}
                            className={`w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                                dragActive 
                                ? 'border-primary bg-primary/5' 
                                : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-primary hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                        >
                            <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">cloud_upload</span>
                            <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                                Click to upload or drag & drop
                            </p>
                            <p className="text-xs text-slate-400 mt-1">PNG, JPG or GIF (max 5MB)</p>
                        </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Description</label>
                    <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all min-h-[120px] dark:text-white"
                    placeholder="Product description..."
                    />
                  </div>
              </div>

              <div className="flex gap-4 pt-4">
                  {editingId && (
                      <button 
                        type="button"
                        onClick={() => handleDeleteProduct(editingId)}
                        className="flex-1 bg-red-100 text-red-600 font-bold py-4 rounded-xl hover:bg-red-200 transition-all flex items-center justify-center gap-2"
                      >
                          <span className="material-symbols-outlined">delete</span>
                          Delete Product
                      </button>
                  )}
                  <button 
                    type="submit"
                    className={`bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 ${editingId ? 'flex-[2]' : 'w-full'}`}
                  >
                    <span className="material-symbols-outlined">{editingId ? 'save' : 'add_circle'}</span>
                    {editingId ? 'Save Changes' : 'Add Product to Catalog'}
                  </button>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="mb-6">
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">Live Preview</h2>
                <p className="text-sm text-slate-500">How this item will appear to customers.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl max-w-sm mx-auto transform hover:scale-[1.02] transition-transform duration-300">
                <div className="relative rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden aspect-[4/3] mb-4 flex items-center justify-center border border-slate-100 dark:border-slate-700">
                    {formData.image ? (
                        <img 
                            src={formData.image} 
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-slate-400 flex flex-col items-center">
                            <span className="material-symbols-outlined text-4xl mb-2">image</span>
                            <span className="text-xs uppercase font-bold">No Image</span>
                        </div>
                    )}
                    
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {previewBadges.map((badge, i) => (
                            <span 
                            key={i} 
                            className={`text-[10px] font-black px-2 py-1 rounded shadow-sm uppercase tracking-wider ${badge.bg} ${badge.color}`}
                            >
                            {badge.text}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-start mb-1">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{formData.brand || 'Brand Name'}</div>
                    <div className="text-[10px] text-slate-400 font-mono">ID: {editingId || 'NEW'}</div>
                </div>
                
                <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-3">
                    {formData.title || 'Product Title'}
                </h3>
                
                <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-black text-primary">${finalPrice.toFixed(2)}</span>
                    {basePrice !== finalPrice && (
                            <span className="text-sm font-semibold text-slate-400 line-through decoration-2">${basePrice.toFixed(2)}</span>
                    )}
                    <span className="text-sm font-medium text-slate-400">/ {formData.type}</span>
                </div>
                <div className="text-xs text-slate-400 mb-4 font-medium">{formData.unitPriceText || '$0.00 per unit'}</div>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 leading-relaxed">
                    {formData.description || "Product description will appear here..."}
                </p>

                <div className="flex items-center justify-between py-3 border-t border-slate-100 dark:border-slate-800 mb-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-base">inventory_2</span>
                        MOQ: {formData.moq || '--'}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-base">{formData.shippingIcon}</span>
                        {formData.shipping || 'Shipping info'}
                    </div>
                </div>

                <button className="w-full bg-primary text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 pointer-events-none opacity-50 shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-lg">shopping_cart</span>
                    Add to Cart
                </button>
            </div>
          </div>
        </div>

        {/* Product Inventory Management */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Inventory Management</h2>
                    <p className="text-slate-500">Manage your existing product catalog, prices, and stock status.</p>
                </div>
                <div className="text-sm font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg">
                    Total Products: {products.length}
                </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-bold uppercase text-xs border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Product Details</th>
                                <th className="px-6 py-4">Price / Unit</th>
                                <th className="px-6 py-4">Active Badges</th>
                                <th className="px-6 py-4">Logistics</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 flex flex-col items-center justify-center">
                                        <span className="material-symbols-outlined text-4xl mb-2 text-slate-300">inventory_2</span>
                                        <p>No products in inventory.</p>
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700">
                                                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{product.title}</div>
                                                    <div className="text-xs text-slate-500">{product.brand}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900 dark:text-white">${product.price.toFixed(2)}</div>
                                            {product.basePrice && product.basePrice !== product.price && (
                                                <div className="text-xs text-slate-400 line-through">${product.basePrice.toFixed(2)}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-1 flex-wrap max-w-[200px]">
                                                {product.badges.length > 0 ? product.badges.map((b, i) => (
                                                    <span key={i} className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-wide ${b.bg} ${b.color}`}>{b.text}</span>
                                                )) : <span className="text-slate-300 text-xs italic">No badges</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-xs">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-bold">MOQ: {product.moq}</span>
                                                <span className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-xs">{product.shippingIcon}</span>
                                                    {product.shipping}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => handleEditProduct(product)}
                                                    className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                    title="Edit Product"
                                                >
                                                    <span className="material-symbols-outlined text-xl">edit</span>
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                    title="Delete Product"
                                                >
                                                    <span className="material-symbols-outlined text-xl">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
