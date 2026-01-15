import { useState } from "react";
import { Button } from "./ui/button";
import { ImagePlus, Trash2, Image as ImageIcon } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Input } from "./ui/input";
import { toast } from "sonner@2.0.3";

interface ShopGalleryProps {
  images: string[];
  onUpdate: (images: string[]) => void;
}

export function ShopGallery({ images, onUpdate }: ShopGalleryProps) {
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isAddingImage, setIsAddingImage] = useState(false);

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      onUpdate([...images, newImageUrl]);
      setNewImageUrl("");
      setIsAddingImage(false);
      toast.success("Image ajoutée à la galerie");
    }
  };

  const handleDeleteImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onUpdate(updated);
    toast.success("Image supprimée");
  };

  const handleSetMainImage = (index: number) => {
    const updated = [...images];
    const [mainImage] = updated.splice(index, 1);
    updated.unshift(mainImage);
    onUpdate(updated);
    toast.success("Image principale mise à jour");
  };

  return (
    <div className="bg-white rounded-[12px] p-[24px]">
      <div className="flex items-center justify-between mb-[24px]">
        <div>
          <h2 className="font-['Space_Grotesk'] text-[24px] text-[#1f1f1f]">
            Galerie du restaurant
          </h2>
          <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280] mt-[4px]">
            La première image sera utilisée comme image principale
          </p>
        </div>
        <Button
          onClick={() => setIsAddingImage(true)}
          className="bg-[#FFBF00] text-[#1f1f1f] hover:bg-[#e6ac00] font-['Space_Grotesk']"
        >
          <ImagePlus className="w-[16px] h-[16px] mr-[8px]" />
          Ajouter une image
        </Button>
      </div>

      {/* Add Image Form */}
      {isAddingImage && (
        <div className="bg-[#f9fafb] rounded-[8px] p-[16px] mb-[24px]">
          <label className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f] mb-[8px] block">
            URL de l'image
          </label>
          <div className="flex gap-[8px]">
            <Input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 font-['Space_Grotesk']"
            />
            <Button
              onClick={handleAddImage}
              className="bg-[#FFBF00] text-[#1f1f1f] hover:bg-[#e6ac00] font-['Space_Grotesk']"
            >
              Ajouter
            </Button>
            <Button
              onClick={() => {
                setIsAddingImage(false);
                setNewImageUrl("");
              }}
              variant="outline"
              className="font-['Space_Grotesk']"
            >
              Annuler
            </Button>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-[64px] border-2 border-dashed border-[#d1d5db] rounded-[12px]">
          <ImageIcon className="w-[48px] h-[48px] text-[#d1d5db] mb-[16px]" />
          <p className="font-['Space_Grotesk'] text-[16px] text-[#6b7280]">
            Aucune image dans la galerie
          </p>
          <p className="font-['Space_Grotesk'] text-[14px] text-[#9ca3af] mt-[8px]">
            Ajoutez des images pour présenter votre restaurant
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-[16px]">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group rounded-[12px] overflow-hidden aspect-video bg-[#f3f4f6]"
            >
              <ImageWithFallback
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Main Image Badge */}
              {index === 0 && (
                <div className="absolute top-[8px] left-[8px] bg-[#FFBF00] text-[#1f1f1f] px-[8px] py-[4px] rounded-[6px]">
                  <span className="font-['Space_Grotesk'] text-[12px]">
                    Image principale
                  </span>
                </div>
              )}

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-[8px]">
                {index !== 0 && (
                  <Button
                    onClick={() => handleSetMainImage(index)}
                    size="sm"
                    className="bg-[#FFBF00] text-[#1f1f1f] hover:bg-[#e6ac00] font-['Space_Grotesk']"
                  >
                    Définir comme principale
                  </Button>
                )}
                <Button
                  onClick={() => handleDeleteImage(index)}
                  size="sm"
                  variant="destructive"
                  className="font-['Space_Grotesk']"
                >
                  <Trash2 className="w-[14px] h-[14px] mr-[4px]" />
                  Supprimer
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
