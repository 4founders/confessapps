import { ImageWithFallback } from "../figma/ImageWithFallback";

interface StoryCardProps {
  nickname: string;
  storyImage: string;
  createdAt: string;
  onClick?: () => void;
}

export function StoryCard({ nickname, storyImage, createdAt, onClick }: StoryCardProps) {
  return (
    <div 
      className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden cursor-pointer hover:border-gray-700 transition-colors"
      onClick={onClick}
    >
      {/* Story Image */}
      <div className="aspect-[3/4] relative">
        <ImageWithFallback
          src={storyImage}
          alt={`Historia de ${nickname}`}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Story Info */}
      <div className="p-3">
        <p className="text-white font-medium text-sm mb-1">{nickname}</p>
        <p className="text-gray-500 text-xs">{createdAt}</p>
      </div>
    </div>
  );
}