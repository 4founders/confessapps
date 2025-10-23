import { Heart, Bookmark } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useState } from "react";

interface PostCardProps {
  nickname: string;
  profileImage?: string;
  text?: string;
  postImage?: string;
  createdAt: string;
  onLike?: () => void;
  onSave?: () => void;
}

export function PostCard({ nickname, profileImage, text, postImage, createdAt, onLike, onSave }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.();
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
      {/* Header with profile and nickname */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10">
          {profileImage ? (
            <ImageWithFallback
              src={profileImage}
              alt={nickname}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">
                {nickname.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div>
          <p className="text-white font-medium">{nickname}</p>
          <p className="text-gray-500 text-sm">{createdAt}</p>
        </div>
      </div>

      {/* Post text */}
      {text && (
        <div className="mb-4">
          <p className="text-gray-300">{text}</p>
        </div>
      )}

      {/* Post image */}
      {postImage && (
        <div className="mb-4">
          <ImageWithFallback
            src={postImage}
            alt="Publicación"
            className="w-full rounded-lg object-cover max-h-96"
          />
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 transition-colors ${
            isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          <span className="text-sm">Me gusta</span>
        </button>
        
        <button
          onClick={handleSave}
          className={`flex items-center space-x-2 transition-colors ${
            isSaved ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          <span className="text-sm">Guardar</span>
        </button>
      </div>
    </div>
  );
}