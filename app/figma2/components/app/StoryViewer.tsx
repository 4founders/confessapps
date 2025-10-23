import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';

interface Story {
  nickname: string;
  profileImage?: string;
  storyImage?: string;
  storyText?: string;
}

interface StoryViewerProps {
  stories: Story[];
  initialIndex: number;
  onClose: () => void;
}

export function StoryViewer({ stories, initialIndex, onClose }: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentStory = stories[currentIndex];

  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 200);
    } else {
      // Si es la última historia, cerrar el viewer
      onClose();
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 200);
    }
  };

  // Auto advance to next story after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < stories.length - 1) {
        goToNext();
      } else {
        onClose();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, stories.length, onClose]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Story Container */}
      <div className="relative w-full h-full max-w-sm mx-auto">
        {/* Progress Bars */}
        <div className="absolute top-4 left-4 right-4 z-20 flex space-x-1">
          {stories.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden"
            >
              <div
                className={`h-full bg-white rounded-full transition-all duration-100 ${
                  index < currentIndex
                    ? 'w-full'
                    : index === currentIndex
                    ? 'w-full animate-pulse'
                    : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-12 left-4 right-4 z-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
              {currentStory.profileImage ? (
                <ImageWithFallback
                  src={currentStory.profileImage}
                  alt={currentStory.nickname}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {currentStory.nickname.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">{currentStory.nickname}</h3>
              <p className="text-gray-300 text-xs">Hace 2h</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Story Content */}
        <div 
          className={`absolute inset-0 transition-all duration-200 ${
            isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        >
          {currentStory.storyImage ? (
            <ImageWithFallback
              src={currentStory.storyImage}
              alt={`Historia de ${currentStory.nickname}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-red-500/30 to-orange-500/30 flex items-center justify-center p-8">
              <div className="text-center max-w-sm">
                <p className="text-white text-xl font-medium leading-relaxed drop-shadow-lg">
                  {currentStory.storyText || "Historia sin contenido"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Areas */}
        <div className="absolute inset-0 flex">
          {/* Left side - Previous */}
          <div 
            className={`w-1/2 h-full flex items-center justify-start pl-4 ${
              currentIndex > 0 ? 'cursor-pointer' : 'cursor-default'
            }`}
            onClick={goToPrevious}
          >
            {currentIndex > 0 && (
              <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black/30 rounded-full p-2 backdrop-blur-sm">
                <ChevronLeft className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
            )}
          </div>
          
          {/* Right side - Next */}
          <div 
            className={`w-1/2 h-full flex items-center justify-end pr-4 ${
              currentIndex < stories.length - 1 ? 'cursor-pointer' : 'cursor-default'
            }`}
            onClick={goToNext}
          >
            {currentIndex < stories.length - 1 ? (
              <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black/30 rounded-full p-2 backdrop-blur-sm">
                <ChevronRight className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
            ) : (
              <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black/30 rounded-full p-2 backdrop-blur-sm">
                <X className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
            )}
          </div>
        </div>

        {/* Story Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-white text-xs">
              {currentIndex + 1} de {stories.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}