import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Plus,
  Trash2,
  Edit2,
  UtensilsCrossed,
  Euro,
  X,
  Save,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  ingredients: string[];
  allergens?: string[];
  category: string;
  available: boolean;
}

interface ShopMenusProps {
  menus: MenuItem[];
  onUpdate: (menus: MenuItem[]) => void;
}

export function ShopMenus({ menus, onUpdate }: ShopMenusProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    ingredients: [],
    allergens: [],
    category: "",
    available: true,
  });
  const [ingredientInput, setIngredientInput] = useState("");
  const [allergenInput, setAllergenInput] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...(prev.ingredients || []), ingredientInput.trim()],
      }));
      setIngredientInput("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleAddAllergen = () => {
    if (allergenInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        allergens: [...(prev.allergens || []), allergenInput.trim()],
      }));
      setAllergenInput("");
    }
  };

  const handleRemoveAllergen = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      allergens: prev.allergens?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.price) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (editingId) {
      // Update existing menu
      const updated = menus.map((menu) =>
        menu.id === editingId ? { ...formData, id: editingId } as MenuItem : menu
      );
      onUpdate(updated);
      toast.success("Plat mis à jour avec succès");
    } else {
      // Create new menu
      const newMenu: MenuItem = {
        ...formData,
        id: Date.now().toString(),
      } as MenuItem;
      onUpdate([...menus, newMenu]);
      toast.success("Plat ajouté avec succès");
    }

    handleCancel();
  };

  const handleEdit = (menu: MenuItem) => {
    setFormData(menu);
    setEditingId(menu.id);
    setIsCreating(true);
  };

  const handleDelete = (id: string) => {
    const updated = menus.filter((menu) => menu.id !== id);
    onUpdate(updated);
    toast.success("Plat supprimé");
  };

  const handleToggleAvailability = (id: string) => {
    const updated = menus.map((menu) =>
      menu.id === id ? { ...menu, available: !menu.available } : menu
    );
    onUpdate(updated);
    toast.success("Disponibilité mise à jour");
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
      ingredients: [],
      allergens: [],
      category: "",
      available: true,
    });
    setIngredientInput("");
    setAllergenInput("");
  };

  return (
    <div className="bg-white rounded-[12px] p-[24px]">
      <div className="flex items-center justify-between mb-[24px]">
        <div>
          <h2 className="font-['Space_Grotesk'] text-[24px] text-[#1f1f1f]">
            Menus & Plats
          </h2>
          <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280] mt-[4px]">
            Gérez les plats disponibles dans votre restaurant
          </p>
        </div>
        {!isCreating && (
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-[#FFBF00] text-[#1f1f1f] hover:bg-[#e6ac00] font-['Space_Grotesk']"
          >
            <Plus className="w-[16px] h-[16px] mr-[8px]" />
            Ajouter un plat
          </Button>
        )}
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <div className="bg-[#f9fafb] rounded-[12px] p-[24px] mb-[24px] border border-[#e5e7eb]">
          <h3 className="font-['Space_Grotesk'] text-[18px] text-[#1f1f1f] mb-[16px]">
            {editingId ? "Modifier le plat" : "Nouveau plat"}
          </h3>

          <div className="grid grid-cols-2 gap-[16px] mb-[16px]">
            <div>
              <Label htmlFor="name" className="font-['Space_Grotesk']">
                Nom du plat *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ex: Burger Classique"
                className="mt-[8px] font-['Space_Grotesk']"
              />
            </div>

            <div>
              <Label htmlFor="category" className="font-['Space_Grotesk']">
                Catégorie
              </Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Ex: Burgers, Entrées, Desserts..."
                className="mt-[8px] font-['Space_Grotesk']"
              />
            </div>
          </div>

          <div className="mb-[16px]">
            <Label htmlFor="description" className="font-['Space_Grotesk']">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Décrivez votre plat..."
              rows={3}
              className="mt-[8px] font-['Space_Grotesk']"
            />
          </div>

          <div className="grid grid-cols-2 gap-[16px] mb-[16px]">
            <div>
              <Label htmlFor="price" className="font-['Space_Grotesk']">
                Prix (€) *
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                className="mt-[8px] font-['Space_Grotesk']"
              />
            </div>

            <div>
              <Label htmlFor="imageUrl" className="font-['Space_Grotesk']">
                URL de l'image
              </Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="mt-[8px] font-['Space_Grotesk']"
              />
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-[16px]">
            <Label className="font-['Space_Grotesk']">Ingrédients</Label>
            <div className="flex gap-[8px] mt-[8px]">
              <Input
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddIngredient()}
                placeholder="Ajouter un ingrédient"
                className="font-['Space_Grotesk']"
              />
              <Button
                onClick={handleAddIngredient}
                type="button"
                size="sm"
                className="bg-[#FFBF00] text-[#1f1f1f] hover:bg-[#e6ac00] font-['Space_Grotesk']"
              >
                Ajouter
              </Button>
            </div>
            <div className="flex flex-wrap gap-[8px] mt-[12px]">
              {formData.ingredients?.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center gap-[4px] bg-white border border-[#e5e7eb] rounded-[6px] px-[8px] py-[4px]"
                >
                  <span className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f]">
                    {ingredient}
                  </span>
                  <button
                    onClick={() => handleRemoveIngredient(index)}
                    className="text-[#ef4444] hover:text-[#dc2626]"
                  >
                    <X className="w-[14px] h-[14px]" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Allergens */}
          <div className="mb-[24px]">
            <Label className="font-['Space_Grotesk']">Allergènes</Label>
            <div className="flex gap-[8px] mt-[8px]">
              <Input
                value={allergenInput}
                onChange={(e) => setAllergenInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddAllergen()}
                placeholder="Ajouter un allergène"
                className="font-['Space_Grotesk']"
              />
              <Button
                onClick={handleAddAllergen}
                type="button"
                size="sm"
                className="bg-[#FFBF00] text-[#1f1f1f] hover:bg-[#e6ac00] font-['Space_Grotesk']"
              >
                Ajouter
              </Button>
            </div>
            <div className="flex flex-wrap gap-[8px] mt-[12px]">
              {formData.allergens?.map((allergen, index) => (
                <div
                  key={index}
                  className="flex items-center gap-[4px] bg-[#fef3c7] border border-[#fbbf24] rounded-[6px] px-[8px] py-[4px]"
                >
                  <span className="font-['Space_Grotesk'] text-[14px] text-[#92400e]">
                    {allergen}
                  </span>
                  <button
                    onClick={() => handleRemoveAllergen(index)}
                    className="text-[#ef4444] hover:text-[#dc2626]"
                  >
                    <X className="w-[14px] h-[14px]" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-[8px]">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="font-['Space_Grotesk']"
            >
              Annuler
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#FFBF00] text-[#1f1f1f] hover:bg-[#e6ac00] font-['Space_Grotesk']"
            >
              <Save className="w-[16px] h-[16px] mr-[8px]" />
              {editingId ? "Mettre à jour" : "Ajouter"}
            </Button>
          </div>
        </div>
      )}

      {/* Menu List */}
      {menus.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-[64px] border-2 border-dashed border-[#d1d5db] rounded-[12px]">
          <UtensilsCrossed className="w-[48px] h-[48px] text-[#d1d5db] mb-[16px]" />
          <p className="font-['Space_Grotesk'] text-[16px] text-[#6b7280]">
            Aucun plat dans le menu
          </p>
          <p className="font-['Space_Grotesk'] text-[14px] text-[#9ca3af] mt-[8px]">
            Ajoutez des plats pour commencer à vendre
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-[16px]">
          {menus.map((menu) => (
            <div
              key={menu.id}
              className={`border rounded-[12px] overflow-hidden ${
                menu.available ? "border-[#e5e7eb]" : "border-[#fca5a5] bg-[#fef2f2]"
              }`}
            >
              <div className="flex gap-[16px] p-[16px]">
                {/* Image */}
                {menu.imageUrl && (
                  <div className="w-[120px] h-[120px] flex-shrink-0 rounded-[8px] overflow-hidden bg-[#f3f4f6]">
                    <ImageWithFallback
                      src={menu.imageUrl}
                      alt={menu.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-[8px]">
                    <div className="flex-1">
                      <h3 className="font-['Space_Grotesk'] text-[18px] text-[#1f1f1f]">
                        {menu.name}
                      </h3>
                      {menu.category && (
                        <p className="font-['Space_Grotesk'] text-[12px] text-[#6b7280]">
                          {menu.category}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-[4px] bg-[#FFBF00] rounded-[6px] px-[8px] py-[4px]">
                      <Euro className="w-[14px] h-[14px] text-[#1f1f1f]" />
                      <span className="font-['Space_Grotesk'] text-[16px] text-[#1f1f1f]">
                        {menu.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <p className="font-['Space_Grotesk'] text-[14px] text-[#4b5563] mb-[8px] line-clamp-2">
                    {menu.description}
                  </p>

                  {menu.ingredients && menu.ingredients.length > 0 && (
                    <div className="mb-[8px]">
                      <p className="font-['Space_Grotesk'] text-[12px] text-[#6b7280]">
                        Ingrédients: {menu.ingredients.join(", ")}
                      </p>
                    </div>
                  )}

                  {menu.allergens && menu.allergens.length > 0 && (
                    <div className="flex flex-wrap gap-[4px] mb-[8px]">
                      {menu.allergens.map((allergen, index) => (
                        <span
                          key={index}
                          className="bg-[#fef3c7] text-[#92400e] px-[6px] py-[2px] rounded-[4px] font-['Space_Grotesk'] text-[11px]"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-[8px] mt-[12px]">
                    <Button
                      onClick={() => handleToggleAvailability(menu.id)}
                      size="sm"
                      variant={menu.available ? "outline" : "default"}
                      className="font-['Space_Grotesk'] text-[12px]"
                    >
                      {menu.available ? "Marquer indisponible" : "Rendre disponible"}
                    </Button>
                    <Button
                      onClick={() => handleEdit(menu)}
                      size="sm"
                      variant="outline"
                      className="font-['Space_Grotesk']"
                    >
                      <Edit2 className="w-[14px] h-[14px]" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(menu.id)}
                      size="sm"
                      variant="destructive"
                      className="font-['Space_Grotesk']"
                    >
                      <Trash2 className="w-[14px] h-[14px]" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
