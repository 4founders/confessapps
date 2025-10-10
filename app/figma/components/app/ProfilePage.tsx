import { StoryCard } from "./StoryCard";
import { PostCard } from "./PostCard";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const defaultProfileImage = "https://images.unsplash.com/photo-1710997740246-75b30937dd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2OTQwNTgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// Mock data for user's own stories
const userStories = [
  {
    nickname: "felipe123",
    storyImage: "https://images.unsplash.com/photo-1523370103628-0f939fe785d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG5hdHVyZSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTY0ODA2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    createdAt: "29 de agosto de 2025, 16:45"
  },
  {
    nickname: "felipe123",
    storyImage: "https://images.unsplash.com/photo-1706195546853-a81b6a190daf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwcmVhZGluZyUyMGNvZmZlZXxlbnwxfHx8fDE3NTY0ODA2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    createdAt: "27 de agosto de 2025, 10:30"
  },
  {
    nickname: "felipe123",
    storyImage: "https://images.unsplash.com/photo-1650184461046-ab908b5f4b4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjByZWZsZWN0aW9uJTIwbWluZGZ1bG5lc3N8ZW58MXx8fHwxNzU2NDgwNjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    createdAt: "25 de agosto de 2025, 19:15"
  },
  {
    nickname: "felipe123",
    storyImage: "https://images.unsplash.com/photo-1642014311549-241528bdc733?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF0aXR1ZGUlMjBqb3VybmFsJTIwd3JpdGluZ3xlbnwxfHx8fDE3NTY0ODA2NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    createdAt: "22 de agosto de 2025, 14:20"
  },
  {
    nickname: "felipe123",
    storyImage: "https://images.unsplash.com/photo-1740814422166-8f4cd289f426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBtb21lbnR8ZW58MXx8fHwxNzU2NDgwNjc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    createdAt: "18 de agosto de 2025, 08:45"
  },
  {
    nickname: "felipe123",
    storyImage: "https://images.unsplash.com/photo-1535007829477-d13662ffb714?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWxmJTIwY2FyZSUyMHdlbGxuZXNzfGVufDF8fHx8MTc1NjM4MTk3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    createdAt: "15 de agosto de 2025, 12:00"
  }
];

// Mock data for user's own posts (sorted by newest first)
const userPosts = [
  {
    nickname: "felipe123",
    profileImage: defaultProfileImage,
    text: "Cada nuevo día es una oportunidad para sanar y crecer. He aprendido a valorar estos momentos de reflexión.",
    postImage: "https://images.unsplash.com/photo-1523370103628-0f939fe785d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG5hdHVyZSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTY0ODA2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    createdAt: "29 de agosto de 2025, 17:30"
  },
  {
    nickname: "felipe123",
    profileImage: defaultProfileImage,
    text: "Encontré paz en las pequeñas cosas: una buena lectura, una taza de té caliente y el sonido de la lluvia. A veces la felicidad está en lo simple.",
    createdAt: "27 de agosto de 2025, 11:15"
  },
  {
    nickname: "felipe123",
    profileImage: defaultProfileImage,
    text: "Hoy practiqué gratitud y me di cuenta de cuántas cosas hermosas me rodean. Esta comunidad es una de ellas. Gracias por existir.",
    createdAt: "24 de agosto de 2025, 20:45"
  },
  {
    nickname: "felipe123",
    profileImage: defaultProfileImage,
    text: "Los momentos difíciles también nos enseñan. Hoy fue uno de esos días, pero siento que cada experiencia me hace más fuerte.",
    postImage: "https://images.unsplash.com/photo-1650184461046-ab908b5f4b4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjByZWZsZWN0aW9uJTIwbWluZGZ1bG5lc3N8ZW58MXx8fHwxNzU2NDgwNjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    createdAt: "21 de agosto de 2025, 16:20"
  },
  {
    nickname: "felipe123",
    profileImage: defaultProfileImage,
    text: "Comenzando un nuevo hábito de autocuidado. Pequeños pasos, grandes cambios. ¿Alguien más está trabajando en mejorar su bienestar?",
    createdAt: "18 de agosto de 2025, 09:30"
  }
];

// Default profile image


interface Story {
  nickname: string;
  profileImage?: string;
  storyImage?: string;
  storyText?: string;
}

interface ProfilePageProps {
  onViewStory?: (stories: Story[], initialIndex: number) => void;
}

export function ProfilePage({ onViewStory }: ProfilePageProps) {
  const handleStoryClick = (createdAt: string) => {
    if (onViewStory) {
      // Convertir las historias del usuario al formato correcto para StoryViewer
      const storyData: Story[] = userStories.map((story, index) => ({
        nickname: story.nickname,
        profileImage: defaultProfileImage,
        storyImage: story.storyImage,
        // Agregar algunos textos alternativos para variedad
        ...(index % 3 === 0 ? { 
          storyText: index === 0 ? "Momento de reflexión y paz interior" :
                     index === 3 ? "Practicando gratitud en mi día a día" :
                     "Encontrando belleza en las pequeñas cosas"
        } : {})
      }));
      
      // Encontrar el índice de la historia clickeada
      const storyIndex = userStories.findIndex(story => story.createdAt === createdAt);
      onViewStory(storyData, storyIndex >= 0 ? storyIndex : 0);
    } else {
      console.log("Ver historia del:", createdAt);
    }
  };

  return (
    <div className="p-6 min-h-full bg-black">
      <div className="max-w-4xl mx-auto">
        {/* User Info Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-700">
              <ImageWithFallback
                src={defaultProfileImage}
                alt="Profile Picture"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">@felipe123</h1>
              <p className="text-gray-400">Miembro desde agosto 2025</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-white">{userStories.length}</p>
              <p className="text-gray-400 text-sm">Historias</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{userPosts.length}</p>
              <p className="text-gray-400 text-sm">Publicaciones</p>
            </div>
          </div>
        </div>

        {/* User Stories Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Mis Historias</h2>
          {userStories.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {userStories.map((story, index) => (
                <StoryCard
                  key={index}
                  nickname={story.nickname}
                  storyImage={story.storyImage}
                  createdAt={story.createdAt}
                  onClick={() => handleStoryClick(story.createdAt)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No has subido historias aún</p>
            </div>
          )}
        </div>

        {/* User Posts Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-white">Mis Publicaciones</h2>
          
          {userPosts.length > 0 ? (
            <div className="space-y-6 max-w-2xl mx-auto">
              {userPosts.map((post, index) => (
                <PostCard
                  key={index}
                  nickname={post.nickname}
                  profileImage={post.profileImage}
                  text={post.text}
                  postImage={post.postImage}
                  createdAt={post.createdAt}
                  onLike={() => console.log("Like own post")}
                  onSave={() => console.log("Save own post")}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No has hecho publicaciones aún</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}