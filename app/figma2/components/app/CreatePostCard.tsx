import { Plus, Image, MessageSquare } from "lucide-react";

interface CreatePostCardProps {
  onCreatePost?: () => void;
}

export function CreatePostCard({ onCreatePost }: CreatePostCardProps) {
  return (
    <div 
      className="bg-gray-900 rounded-xl border-2 border-dashed border-gray-700 p-6 cursor-pointer hover:border-orange-500 transition-colors group"
      onClick={onCreatePost}
    >
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center group-hover:from-red-500/30 group-hover:to-orange-500/30 transition-colors">
          <Plus className="w-8 h-8 text-orange-500" />
        </div>
        
        <div>
          <h3 className="text-white font-medium mb-2">Crear publicación</h3>
          <p className="text-gray-400 text-sm mb-4">Comparte tus pensamientos con la comunidad</p>
        </div>

        <div className="flex space-x-4 text-gray-500">
          <div className="flex items-center space-x-1">
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs">Texto</span>
          </div>
          <div className="flex items-center space-x-1">
            <Image className="w-4 h-4" />
            <span className="text-xs">Imagen</span>
          </div>
        </div>
      </div>
    </div>
  );
}