


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
  return (
    <main className="min-h-screen bg-slate-950">
      {/* ১. নেভবার */}
      <Navbar/>
      
      {/* ২. হিরো সেকশন */}
      <Hero />
      <Features/>
      <HowItWorks/>
      <PopularTemplates/>
      <Pricing/>
      <StatsAndReviews/>
      <FAQ/>
      <Footer/>
    </main>
  );
}