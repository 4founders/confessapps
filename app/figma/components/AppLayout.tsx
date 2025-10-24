import { useState, useEffect } from "react";
import {
  Phone,
  Search,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { ConnectPage } from "./app/ConnectPage";
import { ExplorePage } from "./app/ExplorePage";
import { ProfilePage } from "./app/ProfilePage";
import { SettingsPage } from "./app/SettingsPage";
import { CallPage } from "./app/CallPage";
import { CreatePostPage } from "./app/CreatePostPage";
import { CreateStoryPage } from "./app/CreateStoryPage";
import { StoryViewer } from "./app/StoryViewer";
import { PremiumUpgrade } from "./app/PremiumUpgrade";
import { Summary } from "./app/Summary";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { useUser } from "@/context/UserContext";
import Loading from "@/app/figma/components/Loading";
import { ConfessAppsLogo } from "./ConfessAppsLogo";
import { avatarOptions } from "../data/avatarOptions";

type TabType = "connect" | "explore" | "profile" | "settings";
type AppState =
  | "main"
  | "call"
  | "createPost"
  | "createStory"
  | "viewStory"
  | "premiumUpgrade"
  | "summary";

interface Story {
  nickname: string;
  profileImage?: string;
  storyImage?: string;
  storyText?: string;
}

interface AppLayoutProps {
  onNavigate: (page: string) => void;
}

export function AppLayout({ onNavigate }: AppLayoutProps) {
  const { user, isLoading } = useUser();
  const [activeTab, setActiveTab] =
    useState<TabType>("connect");
  const [appState, setAppState] = useState<AppState>("main");
  const [storyViewData, setStoryViewData] = useState<{
    stories: Story[];
    initialIndex: number;
  } | null>(null);
  const [currentPlan, setCurrentPlan] = useState<"free" | "premium">("free");
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<'monthly' | 'annual'>('monthly');





  useEffect(() => {
    // Si no está cargando y no hay usuario, redirigir a la página de autenticación.
    if (!isLoading && !user) {
      onNavigate("auth");
    }
  }, [isLoading, user, onNavigate]);

  // Muestra la pantalla de carga mientras se obtienen los datos del usuario.
  if (isLoading || !user) {
    return <Loading />;
  }

  const handleLogout = async() => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/auth';
  };

  const handleStartCall = () => {
    setAppState("call");
  };

  const handleEndCall = () => {
    setAppState("main");
    setActiveTab("connect");
  };

  const handleCreatePost = () => {
    setAppState("createPost");
  };

  const handleCancelCreatePost = () => {
    setAppState("main");
    setActiveTab("explore");
  };

  const handleSubmitPost = (data: {
    nickname: string;
    text: string;
    image?: File;
  }) => {
    // TODO: Implement post creation logic
    console.log("Creating post:", data);
    setAppState("main");
    setActiveTab("explore");
  };

  const handleCreateStory = () => {
    setAppState("createStory");
  };

  const handleCancelCreateStory = () => {
    setAppState("main");
    setActiveTab("explore");
  };

  const handleSubmitStory = (data: {
    nickname: string;
    image: File;
  }) => {
    // TODO: Implement story creation logic
    console.log("Creating story:", data);
    setAppState("main");
    setActiveTab("explore");
  };

  const handleViewStory = (
    stories: Story[],
    initialIndex: number,
  ) => {
    setStoryViewData({ stories, initialIndex });
    setAppState("viewStory");
  };

  const handleCloseStory = () => {
    setAppState("main");
    setActiveTab("explore");
    setStoryViewData(null);
  };

  const handleNavigateToPremium = () => {
    setAppState("premiumUpgrade");
  };

  const handleClosePremiumUpgrade = () => {
    setAppState("main");
    setActiveTab("settings");
  };

  const handleUpgradeToPremium = () => {
    setCurrentPlan("premium");
  };

  const handleNavigateToSummary = (billingCycle: 'monthly' | 'annual') => {
    setSelectedBillingCycle(billingCycle);
    setAppState("summary");
  };

  const handleBackFromSummary = () => {
    setAppState("premiumUpgrade");
  };

  const handleProceedToPayment = () => {
    // TODO: Implement payment logic
    console.log("Proceeding to payment...");
    // For now, just go back to settings
    setAppState("main");
    setActiveTab("settings");
  };

  const handleCancelSummary = () => {
    setAppState("main");
    setActiveTab("settings");
  };

  // If in create post state, show create post page
  if (appState === "createPost") {
    return (
      <CreatePostPage
        onCancel={handleCancelCreatePost}
        onCreatePost={handleSubmitPost}
      />
    );
  }

  // If in create story state, show create story page
  if (appState === "createStory") {
    return (
      <CreateStoryPage
        onCancel={handleCancelCreateStory}
        onCreateStory={handleSubmitStory}
      />
    );
  }

  // If in view story state, show story viewer
  if (appState === "viewStory" && storyViewData) {
    return (
      <StoryViewer
        stories={storyViewData.stories}
        initialIndex={storyViewData.initialIndex}
        onClose={handleCloseStory}
      />
    );
  }

  // If in premium upgrade state, show premium upgrade page
  if (appState === "premiumUpgrade") {
    return (
      <PremiumUpgrade
        onClose={handleClosePremiumUpgrade}
        onUpgrade={handleUpgradeToPremium}
        onNavigateToSummary={handleNavigateToSummary}
      />
    );
  }

  // If in summary state, show summary page
  if (appState === "summary") {
    return (
      <Summary
        billingCycle={selectedBillingCycle}
        onBack={handleBackFromSummary}
        onProceedToPayment={handleProceedToPayment}
        onCancel={handleCancelSummary}
      />
    );
  }

  const tabs = [
    {
      id: "connect" as const,
      label: "Conectar",
      icon: Phone,
      component: (props: any) => (
        <ConnectPage onStartCall={handleStartCall} {...props} />
      ),
    },
    {
      id: "explore" as const,
      label: "Explorar",
      icon: Search,
      component: (props: any) => (
        <ExplorePage
          onCreatePost={handleCreatePost}
          onCreateStory={handleCreateStory}
          onViewStory={handleViewStory}
          {...props}
        />
      ),
    },
    {
      id: "profile" as const,
      label: "Perfil",
      icon: User,
      component: (props: any) => (
        <ProfilePage onViewStory={handleViewStory} {...props} />
      ),
    },
    {
      id: "settings" as const,
      label: "Ajustes",
      icon: Settings,
      component: (props: any) => (
        <SettingsPage 
          currentPlan={currentPlan}
          setCurrentPlan={setCurrentPlan}
          onNavigateToPremium={handleNavigateToPremium}
          {...props} 
        />
      ),
    },
  ];

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component ||
    ((props: any) => (
      <ConnectPage onStartCall={handleStartCall} {...props} />
    ));

  return (
    <div className="h-screen bg-black text-white overflow-hidden">
      {/* Desktop Layout */}
      <div className="hidden md:flex h-full">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <ConfessAppsLogo className="w-8 h-8 object-contain" />
              <span className="text-xl font-semibold">
                <span className="text-white">Confess</span>
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  Apps
                </span>
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 text-orange-400 border border-orange-500/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Profile Section - Moved to bottom */}
          <div className="p-6 border-t border-gray-800">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-gray-700">
                 <ImageWithFallback
                  src={avatarOptions.find(opt => opt.id === String(user.avatar))?.src || avatarOptions[0].src}
                  alt="Profile Picture"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-gray-300 text-sm mb-4">
                @{user.username}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <ActiveComponent />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col h-full">
        {/* Main Content */}
        <div className="flex-1 overflow-auto pb-20">
          <ActiveComponent />
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
          <div className="flex items-center justify-around py-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? "text-orange-400"
                      : "text-gray-400"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${activeTab === tab.id ? "text-orange-400" : "text-gray-400"}`}
                  />
                  <span
                    className={`text-xs ${activeTab === tab.id ? "text-orange-400" : "text-gray-400"}`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}