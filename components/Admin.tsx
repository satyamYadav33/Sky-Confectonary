
import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';

interface AdminProps {
  onNavigateHome: () => void;
  onNavigateToCatalog: () => void;
  onAddProduct: (product: Product) => void;
}

const Admin: React.FC<AdminProps> = ({ onNavigateHome, onNavigateToCatalog, onAddProduct }) => {
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
  const [discountType, setDiscountType] = useState<'none' | 'percent' | 'fixed'>('none');
  const [discountValue, setDiscountValue] = useState('');

  const [previewBadges, setPreviewBadges] = useState<Array<{ text: string; color: string; bg: string }>>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate final price
  const basePrice = parseFloat(formData.price) || 0;
  let finalPrice = basePrice;
  if (discountType === 'percent') {
    const pct = parseFloat(discountValue) || 0;
    finalPrice = basePrice * (1 - pct / 100);
  } else if (discountType === 'fixed') {
    const amt = parseFloat(discountValue) || 0;
    finalPrice = Math.max(0, basePrice - amt);
  }

  useEffect(() => {
    const badges = [];
    if (discountType !== 'none' && discountValue) {
        if (discountType === 'percent') {
            badges.push({ text: `${discountValue}% OFF`, bg: 'bg-red-100', color: 'text-red-700' });
        } else {
            badges.push({ text: `SAVE $${discountValue}`, bg: 'bg-red-100', color: 'text-red-700' });
        }
    }
    setPreviewBadges(badges);
  }, [discountType, discountValue]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
        alert("Please fill in required fields (Brand, Title, Price).");
        return;
    }

    const newProduct: Product = {
      id: Date.now(),
      brand: formData.brand,
      title: formData.title,
      price: finalPrice,
      type: formData.type,
      unitPriceText: formData.unitPriceText,
      moq: formData.moq,
      shipping: formData.shipping,
      shippingIcon: formData.shippingIcon,
      image: formData.image || 'https://via.placeholder.com/400?text=No+Image',
      description: formData.description,
      badges: previewBadges
    };

    onAddProduct(newProduct);
    alert('Product added successfully!');
    
    // Reset form completely
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
    setPreviewBadges([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background-dark flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full bg-slate-900 text-white border-b border-slate-800">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onNavigateHome}>
            <span className="material-symbols-outlined text-primary">bakery_dining</span>
            <span className="text-xl font-black tracking-tight">Sky Admin</span>
          </div>
          <button onClick={onNavigateToCatalog} className="text-sm font-bold hover:text-primary transition-colors">
            Back to Catalog
          </button>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-7xl w-full p-6 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Form Section */}
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Add New Product</h1>
              <p className="text-slate-500">Enter product details to add to the wholesale catalog.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              
              {/* Product Info Group */}
              <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Brand Name</label>
                      <input 
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-primary transition-all dark:text-white"
                        placeholder="e.g. Sky Blue Essentials"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Product Title</label>
                      <input 
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-primary transition-all dark:text-white"
                        placeholder="e.g. Blue Raspberry Candy"
                        required
                      />
                    </div>
                  </div>
              </div>

              {/* Pricing Group */}
              <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">Pricing & Discounts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Base Price ($)</label>
                      <input 
                        name="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-primary transition-all dark:text-white"
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Discount Type</label>
                      <select 
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value as any)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-primary transition-all dark:text-white"
                      >
                        <option value="none">None</option>
                        <option value="percent">Percentage (%)</option>
                        <option value="fixed">Fixed Amount ($)</option>
                      </select>
                    </div>
                     <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Discount Value</label>
                      <input 
                        type="number"
                        step="0.01"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        disabled={discountType === 'none'}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-primary transition-all dark:text-white disabled:opacity-50"
                        placeholder={discountType === 'percent' ? "e.g. 20" : "e.g. 5.00"}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Unit Type</label>
                        <select 
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-primary transition-all dark:text-white"
                        >
                            <option value="Case">Case</option>
                            <option value="Unit">Unit</option>
                            <option value="Box">Box</option>
                            <option value="Pallet">Pallet</option>
                        </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Unit Price Text</label>
                            <input 
                            name="unitPriceText"
                            value={formData.unitPriceText}
                            onChange={handleChange}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-primary transition-all dark:text-white"
                            placeholder="e.g. $0.45/unit"
                            required
                            />
                        </div>
                  </div>
              </div>

              {/* Shipping Group */}
              <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">Logistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">MOQ (Minimum Order)</label>
                    <input 
                        name="moq"
                        value={formData.moq}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-primary transition-all dark:text-white"
                        placeholder="e.g. 10 Cases"
                        required
                    />
                    </div>
                    <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Shipping Text</label>
                    <input 
                        name="shipping"
                        value={formData.shipping}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-primary transition-all dark:text-white"
                        placeholder="e.g. Ships 24h"
                        required
                    />
                    </div>
                  </div>
              </div>

              {/* Media Group */}
              <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">Media & Description</h3>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Product Image</label>
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    
                    {formData.image ? (
                        <div className="relative group w-full h-48 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                            <img 
                                src={formData.image} 
                                alt="Preview" 
                                className="w-full h-full object-contain"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button 
                                    type="button" 
                                    onClick={removeImage}
                                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                                <button 
                                    type="button" 
                                    onClick={triggerFileInput}
                                    className="bg-white text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                                >
                                    <span className="material-symbols-outlined">edit</span>
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

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                    <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-primary transition-all min-h-[100px] dark:text-white"
                    placeholder="Product description..."
                    />
                  </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">add_circle</span>
                Add Product to Catalog
              </button>
            </form>
          </div>

          {/* Preview Section */}
          <div>
            <div className="mb-8">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Preview</h2>
                <p className="text-slate-500">How the item will appear in the catalog.</p>
            </div>

            <div className="sticky top-24">
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xl max-w-sm mx-auto transform hover:scale-105 transition-transform duration-300">
                    <div className="relative rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden aspect-[4/3] mb-4 flex items-center justify-center">
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

                    <div className="text-xs font-semibold text-slate-500 mb-1">{formData.brand || 'Brand Name'}</div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-3">
                        {formData.title || 'Product Title'}
                    </h3>
                    
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-black text-primary">${finalPrice.toFixed(2)}</span>
                        {basePrice !== finalPrice && (
                             <span className="text-sm font-semibold text-slate-400 line-through">${basePrice.toFixed(2)}</span>
                        )}
                        <span className="text-sm font-medium text-slate-400">/ {formData.type}</span>
                    </div>
                    <div className="text-xs text-slate-400 mb-4">{formData.unitPriceText || '$0.00 per unit'}</div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                        {formData.description || "Product description will appear here."}
                    </p>

                    <div className="flex items-center justify-between py-3 border-t border-slate-100 dark:border-slate-800 mb-4">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                            <span className="material-symbols-outlined text-base">inventory_2</span>
                            MOQ: {formData.moq || '--'}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                            <span className="material-symbols-outlined text-base">{formData.shippingIcon}</span>
                            {formData.shipping || 'Shipping info'}
                        </div>
                    </div>

                    <button className="w-full bg-primary text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 pointer-events-none opacity-50">
                        <span className="material-symbols-outlined text-lg">shopping_cart</span>
                        Add Order
                    </button>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
