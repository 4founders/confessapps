import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { HowItWorks } from "./components/HowItWorks";
import { CallToAction } from "./components/CallToAction";
import { Footer } from "./components/Footer";
import { Auth } from "./components/Auth";
import { Pricing } from "./components/Pricing";
import { Contact } from "./components/Contact";
import { HealthAnnouncements } from "./components/HealthAnnouncements";
import { TermsAndConditions } from "./components/TermsAndConditions";
import { AppLayout } from "./components/AppLayout";
import { Toaster } from "./components/ui/sonner";

type AppState =
  | "landing"
  | "auth"
  | "pricing"
  | "contact"
  | "health-announcements"
  | "terms"
  | "app";

export default function App() {
  const [currentPage, setCurrentPage] =
    useState<AppState>("app");

  const handleNavigation = (page: string) => {
    setCurrentPage(page as AppState);
  };

  if (currentPage === "app") {
    return (
      <>
        <AppLayout onNavigate={handleNavigation} />
        <Toaster />
      </>
    );
  }

  if (currentPage === "auth") {
    return <Auth onNavigate={handleNavigation} />;
  }

  if (currentPage === "pricing") {
    return (
      <div className="min-h-screen bg-white">
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigation}
        />
        <main>
          <Pricing onNavigate={handleNavigation} />
        </main>
        <Footer onNavigate={handleNavigation} />
      </div>
    );
  }

  if (currentPage === "contact") {
    return (
      <div className="min-h-screen bg-white">
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigation}
        />
        <main>
          <Contact />
        </main>
        <Footer onNavigate={handleNavigation} />
      </div>
    );
  }

  if (currentPage === "health-announcements") {
    return (
      <div className="min-h-screen bg-white">
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigation}
        />
        <main>
          <HealthAnnouncements />
        </main>
        <Footer onNavigate={handleNavigation} />
      </div>
    );
  }

  if (currentPage === "terms") {
    return <TermsAndConditions onNavigate={handleNavigation} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigation}
      />
      <main>
        <Hero onNavigate={handleNavigation} />
        <WhyChooseUs />
        <HowItWorks />
        <CallToAction onNavigate={handleNavigation} />
      </main>
      <Footer onNavigate={handleNavigation} />
    </div>
  );
}