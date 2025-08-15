import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { HowItWorks } from "./components/HowItWorks";
import { CallToAction } from "./components/CallToAction";
import { Footer } from "./components/Footer";
import { Auth } from "./components/Auth";

type AppState = 'landing' | 'auth';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppState>('landing');

  if (currentPage === 'auth') {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <WhyChooseUs />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}