import React, { useState } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  moq: string;
  image: string;
}

interface FeaturedProductsProps {
  onNavigateToCatalog?: () => void;
  onAddToCart?: (quantity: number) => void;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Premium Gummy Bears (5kg)',
    description: 'Classic fruit flavored gummy bears in bulk catering bags.',
    price: '45.00',
    moq: 'MOQ: 10 Boxes',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlOtbuxazz6j7gVdcqNV5MX8afhj0IK61ghyPsW0tfIOc59IKy6hrrPruX1gKyiujIiaaPiLwnWDQFWd16sop2xx1gtVJBDy2tekyefcEUVlGmFG78Uy7ZyGng2ILoUE5S2Y5lwf2cSVouUWRcjc11-5Nmp1T9tLEKiFK3OUl5icD9bGm8pvTOBKhfP-fefKzIdGFa_bhcDVygXUwVz_LsmtXXdYFMYusKNP_9hnUlrgR0wv2pL-5ORwSpv5Zq5fI9IfRaKOnkP0c',
  },
  {
    id: 2,
    title: 'Artisan Soda Variety Pack',
    description: 'Mixed crate of natural fruit-infused sparkling beverages.',
    price: '28.50',
    moq: 'MOQ: 24 Cases',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2Y9VCMAYqrfdwL319_PJ01D597nh642tdmUHxuoprAtHQafCJwDdxIM3v0aiIEAymLIVAmhXz4CWmYs_kJZKxHIaDGqBAj8cmLHHqcsHWA_hlTZ9tT1xbAsTj-6wFpUc45i4c4bOWQSwug9gbkYa6g8Ia-zsUKYKozs0XrZrbXlPOUAfGznmGYvY1roGRhJAeDzInK5b7UV71QPal6EW4PtUkj5d1JSHNd_3OPoXEz65jyLkO-OrxEetAWER8igY3Zsdg02SxRqY',
  },
  {
    id: 3,
    title: 'Dark Sea Salt Chocolate Bars',
    description: 'Premium 70% cacao dark chocolate bars, 100g each.',
    price: '3.20',
    moq: 'MOQ: 50 Units',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEYU1Z3F4wTXA-SIf3ITi5DsrUif13h3hJIJw-39DlhOOJ4pDowQLWcA9Igj8RtYC5JQaxGltiA4n3kQz3qsYw4u4mzbfh1jblW2w0Feg9gLX21w-CQUh4TXZ8Vbk83cURPuHfQl4Xr_KnC8jgo_xBpvn7CXZ2Oya6qaJV02vrlYlJWlf90v68W1hfgjg1DVgRL5RFmg5jRmsV-v8B-eD23Doy5E_2eE1wPYID_RxXErO9ckUdAJLfSJwt_NbnaoUAVs92hc0b-G4',
  },
  {
    id: 4,
    title: 'Organic Trail Mix (2kg)',
    description: 'Nutritious mix of nuts, seeds, and dried organic fruits.',
    price: '19.95',
    moq: 'MOQ: 15 Bags',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDJ4P1k1CqcALlj2aozwBmFsg_k9G-FviRj3mJgCeBjSCFv0411KyTVzi_3vGuTV4hDjUQe29N11f0d_Nkyub18oojaZxxgkQ3_RkMWqZEpZXqAKI6E_ot5fdb1OjyGP25-LKVmzICOzNVY21HhrQt-sX_iz-j1rTRVaEyoiyIk6dZVGDzpRGYElwiRWbKNGCwtSkiOsVGXNPiJgXzZo0K0AOk9ABRkw6cL69L9FJavgqOEFKO8-iNpuVbXA0moe7vmCSOngS3yiw',
  },
];

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onNavigateToCatalog, onAddToCart }) => {
  const [addedItems, setAddedItems] = useState<number[]>([]);

  const handleAddToCart = (id: number) => {
    if (onAddToCart) {
      onAddToCart(1);
      setAddedItems(prev => [...prev, id]);
      setTimeout(() => {
        setAddedItems(prev => prev.filter(itemId => itemId !== id));
      }, 2000);
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-background-dark">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-4xl mb-4">
              Top-Selling Bulk Items
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-medium">
              Stock your shelves with our most popular wholesale confectionery and grocery products.
            </p>
          </div>
          <button 
            onClick={onNavigateToCatalog}
            className="inline-flex items-center text-primary font-bold hover:gap-2 transition-all"
          >
            View All Products
            <span className="material-symbols-outlined ml-1">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-3 transition-all hover:shadow-xl"
            >
              <div className="relative overflow-hidden rounded-xl aspect-square mb-4 bg-slate-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-black tracking-widest uppercase text-primary border border-primary/20">
                  {product.moq}
                </div>
              </div>
              <h3 className="px-2 text-lg font-bold text-slate-900 dark:text-white mb-1">
                {product.title}
              </h3>
              <p className="px-2 text-sm text-slate-500 mb-4 font-medium">
                {product.description}
              </p>
              <div className="mt-auto px-2 pb-2">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-black text-slate-900 dark:text-white">
                    ${product.price} <span className="text-xs font-normal text-slate-400">/ unit</span>
                  </span>
                </div>
                <button 
                  onClick={() => handleAddToCart(product.id)}
                  className={`w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold text-white transition-all active:scale-95 ${
                    addedItems.includes(product.id) 
                      ? "bg-green-600 hover:bg-green-700" 
                      : "bg-primary hover:bg-primary/90"
                  }`}
                >
                  {addedItems.includes(product.id) ? (
                    <>
                      <span className="material-symbols-outlined text-lg">check</span>
                      Added!
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg">shopping_cart</span>
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;