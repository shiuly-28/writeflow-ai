"use client";

import { useState } from "react";
import FAQ from "./components/FAQ";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import PopularTemplates from "./components/PopularTemplates";
import Pricing from "./components/Pricing";
import StatsAndReviews from "./components/StatsAndReviews";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
    }`}>
      
      {/* নেবারে স্টেট এবং সেট-স্টেট ফাংশন পাস করা হলো */}
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      {/* বাকি সব সেকশন */}
      <Hero isDarkMode={isDarkMode} />
      <Features isDarkMode={isDarkMode} />
      <HowItWorks isDarkMode={isDarkMode}/>
      <PopularTemplates isDarkMode={isDarkMode}/>
      <Pricing isDarkMode={isDarkMode}/>
      <StatsAndReviews isDarkMode={isDarkMode}/>
      <FAQ isDarkMode={isDarkMode}/>
      <Footer isDarkMode={isDarkMode}/>
    </main>
  );
}