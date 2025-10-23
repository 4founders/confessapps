import { StoryCircle } from "./StoryCircle";
import { CreatePostCard } from "./CreatePostCard";
import { PostCard } from "./PostCard";

// Mock data for stories
const stories = [
  {
    nickname: "LunaAzul",
    profileImage: "https://images.unsplash.com/photo-1539605480396-a61f99da1041?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXQlMjBwZXJzb258ZW58MXx8fHwxNzU2NDA2NzIxfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    nickname: "SerenaVerde",
    profileImage: "https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwc21pbGV8ZW58MXx8fHwxNzU2NDc3NDcxfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    nickname: "EcoNocturno",
    profileImage: "https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGNhc3VhbHxlbnwxfHx8fDE3NTY0NTk2Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    nickname: "MenteSilenciosa"
  },
  {
    nickname: "AlmaLibre"
  }
];

// Mock data for posts
const posts = [
  {
    nickname: "LunaAzul",
    profileImage: "https://images.unsplash.com/photo-1539605480396-a61f99da1041?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXQlMjBwZXJzb258ZW58MXx8fHwxNzU2NDA2NzIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    text: "A veces necesitamos estar en silencio para escuchar lo que realmente necesitamos. La naturaleza me ayuda a encontrar esa paz.",
    postImage: "https://images.unsplash.com/photo-1638544576933-d2bdf36ef947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGUlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU2NDYyNTUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    createdAt: "15 de agosto de 2025, 14:30"
  },
  {
    nickname: "SerenaVerde",
    profileImage: "https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwc21pbGV8ZW58MXx8fHwxNzU2NDc3NDcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    text: "Hoy fue un día difícil, pero encontré consuelo en una buena taza de café y un libro. Las pequeñas cosas importan.",
    createdAt: "22 de agosto de 2025, 09:15"
  },
  {
    nickname: "EcoNocturno",
    profileImage: "https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGNhc3VhbHxlbnwxfHx8fDE3NTY0NTk2Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    text: "Los atardeceres me recuerdan que cada día tiene un final hermoso, sin importar cómo haya empezado. Mañana será mejor.",
    postImage: "https://images.unsplash.com/photo-1641917530035-fe757b0fcba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBza3klMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NTY0Nzc0Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    createdAt: "27 de agosto de 2025, 18:45"
  },
  {
    nickname: "MenteSilenciosa",
    text: "Gracias a todos los que han estado ahí para escuchar. Esta comunidad significa mucho para mí.",
    createdAt: "29 de agosto de 2025, 11:20"
  }
];

interface Story {
  nickname: string;
  profileImage?: string;
  storyImage?: string;
  storyText?: string;
}

interface ExplorePageProps {
  onCreatePost?: () => void;
  onCreateStory?: () => void;
  onViewStory?: (stories: Story[], initialIndex: number) => void;
}

export function ExplorePage({ onCreatePost, onCreateStory, onViewStory }: ExplorePageProps) {
  const handleCreateStoryClick = () => {
    if (onCreateStory) {
      onCreateStory();
    } else {
      console.log("Crear historia");
    }
  };

  const handleCreatePostClick = () => {
    if (onCreatePost) {
      onCreatePost();
    } else {
      console.log("Crear publicación");
    }
  };

  const handleStoryClick = (nickname: string) => {
    if (onViewStory) {
      // Datos de historias más variados
      const storyTexts = [
        "A veces solo necesitamos un momento para respirar y recordar que todo va a estar bien.",
        "Hoy decidí dar una caminata y me ayudó mucho a aclarar mis pensamientos.",
        "Recordatorio: eres más fuerte de lo que crees. Has superado el 100% de tus días difíciles hasta ahora.",
        "La música tiene una forma especial de sanar el alma.",
        "Pequeños actos de bondad pueden cambiar completamente el día de alguien."
      ];

      // Imágenes de historias adicionales
      const storyImages = [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBuYXR1cmV8ZW58MXx8fHwxNzU2NDc3NDc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBuYXR1cmV8ZW58MXx8fHwxNzU2NDc3NDc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBuYXR1cmV8ZW58MXx8fHwxNzU2NDc3NDc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbnMlMjBuYXR1cmV8ZW58MXx8fHwxNzU2NDc3NDc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBuYXR1cmV8ZW58MXx8fHwxNzU2NDc3NDc4fDA&ixlib=rb-4.1.0&q=80&w=1080"
      ];

      // Convertir las historias al formato correcto
      const storyData: Story[] = stories.map((story, index) => ({
        nickname: story.nickname,
        profileImage: story.profileImage,
        // Alternar entre imágenes y texto
        ...(index % 2 === 0 
          ? { storyImage: storyImages[index % storyImages.length] }
          : { storyText: storyTexts[index % storyTexts.length] }
        )
      }));
      
      const storyIndex = stories.findIndex(story => story.nickname === nickname);
      onViewStory(storyData, storyIndex >= 0 ? storyIndex : 0);
    } else {
      console.log("Ver historia de:", nickname);
    }
  };

  return (
    <div className="p-6 min-h-full bg-black">
      <div className="max-w-2xl mx-auto">
        {/* Stories Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Historias</h2>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {/* Add Story Button */}
            <div className="flex-shrink-0">
              <StoryCircle isAddStory onClick={handleCreateStoryClick} />
            </div>
            
            {/* Stories */}
            {stories.map((story, index) => (
              <div key={index} className="flex-shrink-0">
                <StoryCircle
                  nickname={story.nickname}
                  profileImage={story.profileImage}
                  onClick={() => handleStoryClick(story.nickname)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-white">Publicaciones</h2>
          
          {/* Create Post Card */}
          <CreatePostCard onCreatePost={handleCreatePostClick} />
          
          {/* Posts */}
          {posts.map((post, index) => (
            <PostCard
              key={index}
              nickname={post.nickname}
              profileImage={post.profileImage}
              text={post.text}
              postImage={post.postImage}
              createdAt={post.createdAt}
              onLike={() => console.log("Like post by", post.nickname)}
              onSave={() => console.log("Save post by", post.nickname)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}