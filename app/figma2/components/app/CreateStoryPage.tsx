import { useState } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface CreateStoryPageProps {
  onCancel: () => void;
  onCreateStory: (data: { nickname: string; image: File }) => void;
}

export function CreateStoryPage({ onCancel, onCreateStory }: CreateStoryPageProps) {
  const [nickname, setNickname] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim() && selectedImage) {
      onCreateStory({
        nickname: nickname.trim(),
        image: selectedImage
      });
    }
  };

  const handleCancel = () => {
    setNickname('');
    setSelectedImage(null);
    setImagePreview(null);
    onCancel();
  };

  return (
    <div className="min-h-full bg-black p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="text-gray-400 hover:text-white hover:bg-gray-800 mr-4 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-semibold text-white">Crear historia</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nickname Input */}
          <div className="space-y-2">
            <Label htmlFor="nickname" className="text-white">
              Seudónimo
            </Label>
            <Input
              id="nickname"
              type="text"
              placeholder="Ej: MenteSilenciosa"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image" className="text-white">
              Imagen de la historia *
            </Label>
            <div className="space-y-4">
              <div className="relative">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image')?.click()}
                  className="w-full bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-orange-500 transition-colors"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {selectedImage ? 'Cambiar imagen' : 'Subir imagen'}
                </Button>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Vista previa de historia"
                    className="w-full max-h-96 object-cover rounded-lg border border-gray-700"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-gray-900/80 text-white hover:bg-red-500 hover:text-white"
                  >
                    Eliminar
                  </Button>
                </div>
              )}

              {/* Helper text */}
              <p className="text-sm text-gray-400">
                Las historias son una forma de compartir momentos especiales que desaparecen después de 24 horas.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              className="flex-1 text-white hover:bg-gray-800"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!nickname.trim() || !selectedImage}
              className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Crear historia
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}