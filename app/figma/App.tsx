'use client';

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { HowItWorks } from "./components/HowItWorks";
import { CallToAction } from "./components/CallToAction";
import { Footer } from "./components/Footer";

export default function App() {
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