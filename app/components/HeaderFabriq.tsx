import React, { useState } from 'react';
import Link from 'next/link'; // React Router hole `import { Link, useLocation } from 'react-router-dom';`
// Route path dhorar jonno (Next.js hole):
// import { usePathname } from 'next/navigation';
import { 
  Globe, 
  ChevronDown, 
  Heart, 
  ShoppingCart, 
  Search, 
  Layers 
} from 'lucide-react';

interface HeaderFabriqProps {
  storeName?: string;
  cartCount?: number;
  cartTotal?: number;
  categories?: { id: string | number; name: string; slug: string }[];
}

export default function HeaderFabriq({
  storeName = 'Trendy Fashion Hub',
  cartCount = 2,
  cartTotal = 1794,
  categories = []
}: HeaderFabriqProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'BDT'>('USD');
  const [selectedLang, setSelectedLang] = useState('English');
  const [searchQuery, setSearchQuery] = useState('');

  // Next.js use korle: const pathname = usePathname();
  const currentPath = '/shop'; // Default active route check korar jonno

  // Nav items list
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const currencySymbol = selectedCurrency === 'USD' ? '$' : '৳';

  return (
    <header className="w-full bg-[#070b19] text-white">
      {/* 1. Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 border-b border-slate-800/60 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-6">
          {/* Language Selector (Broken icon fixed) */}
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition">
            <Globe size={13} className="text-slate-400" />
            <span>{selectedLang}</span>
            <ChevronDown size={11} className="text-slate-400" />
          </div>

          {/* Currency Selector */}
          <div 
            onClick={() => setSelectedCurrency(prev => prev === 'USD' ? 'BDT' : 'USD')}
            className="flex items-center gap-1.5 cursor-pointer hover:text-white transition"
          >
            <span className="font-semibold text-pink-500">{currencySymbol}</span>
            <span>{selectedCurrency}</span>
            <ChevronDown size={11} className="text-slate-400" />
          </div>
        </div>

        {/* User Profile & Wishlist */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="User" 
              className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-600"
            />
            <ChevronDown size={12} className="text-slate-400" />
          </div>
          <Link href="/wishlist" className="flex items-center gap-1.5 text-slate-300 hover:text-pink-400 transition">
            <Heart size={14} />
            <span>Wishlist</span>
          </Link>
        </div>
      </div>

      {/* 2. Middle Bar: Logo, Search Bar, Cart Button */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-tr from-pink-600 to-rose-500 rounded-lg flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-pink-600/30">
            T
          </div>
          <span className="text-xl font-bold tracking-tight text-white hover:text-pink-400 transition">
            {storeName}
          </span>
        </Link>

        {/* Search Bar with Category Select */}
        <div className="flex-1 max-w-xl flex items-center rounded-lg bg-[#11172e] border border-slate-700/80 overflow-hidden focus-within:border-pink-500 transition">
          <select className="bg-transparent text-xs text-slate-300 px-3 py-2.5 outline-none border-r border-slate-700 cursor-pointer">
            <option value="" className="bg-[#11172e] text-white">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug} className="bg-[#11172e] text-white">
                {c.name}
              </option>
            ))}
          </select>
          <input 
            type="text" 
            placeholder="Enter keywords to search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent px-3.5 py-2 text-xs text-white placeholder-slate-400 outline-none"
          />
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2.5 transition flex items-center justify-center">
            <Search size={15} />
          </button>
        </div>

        {/* Dynamic Cart Button */}
        <Link 
          href="/cart" 
          className="flex items-center gap-3 border border-pink-500/40 bg-pink-950/20 hover:bg-pink-900/30 px-4 py-2 rounded-xl transition"
        >
          <ShoppingCart size={18} className="text-pink-500" />
          <div className="text-left">
            <div className="text-[10px] text-pink-400 font-bold tracking-wider leading-none">CART</div>
            <div className="text-xs font-bold text-white mt-1 leading-none">
              {cartCount} Items - {currencySymbol}{cartTotal.toLocaleString()}
            </div>
          </div>
        </Link>
      </div>

      {/* 3. Bottom Bar: ALL CATEGORIES & Menu Links */}
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center gap-8 border-t border-slate-800/50">
        {/* All Categories Button */}
        <button className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-500 hover:opacity-95 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg shadow-sm transition">
          <Layers size={14} />
          <span>All Categories</span>
        </button>

        {/* Navbar Links (Shop, New Arrivals, About, Contact) */}
        <nav className="flex items-center gap-6">
          {navLinks.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-xs font-semibold tracking-wide transition-colors ${
                  isActive 
                    ? 'text-pink-400 border-b-2 border-pink-500 pb-0.5' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}