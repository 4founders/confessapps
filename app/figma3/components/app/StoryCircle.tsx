import { Plus } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface StoryCircleProps {
  nickname?: string;
  profileImage?: string;
  isAddStory?: boolean;
  onClick?: () => void;
}

export function StoryCircle({ nickname, profileImage, isAddStory = false, onClick }: StoryCircleProps) {
  if (isAddStory) {
    return (
      <div className="flex flex-col items-center space-y-2 cursor-pointer" onClick={onClick}>
        <div className="w-16 h-16 bg-gray-800 border-2 border-dashed border-gray-600 rounded-full flex items-center justify-center hover:border-orange-500 transition-colors">
          <Plus className="w-6 h-6 text-gray-400 hover:text-orange-500 transition-colors" />
        </div>
        <span className="text-xs text-gray-400">Tu historia</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-2 cursor-pointer" onClick={onClick}>
      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full p-0.5">
        <div className="w-full h-full bg-black rounded-full p-0.5">
          {profileImage ? (
            <ImageWithFallback
              src={profileImage}
              alt={nickname || 'Usuario'}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">
                {nickname ? nickname.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
          )}
        </div>
      </div>
      <span className="text-xs text-gray-400 truncate max-w-16">{nickname}</span>
    </div>
  );
}