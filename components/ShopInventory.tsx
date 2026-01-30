import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Plus,
  Trash2,
  Edit2,
  Package,
  AlertTriangle,
  TrendingUp,
  Save,
  X,
} from "lucide-react";
import { toast } from "sonner";

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  minThreshold: number;
  category: string;
  lastRestocked?: string;
  supplier?: string;
}

interface ShopInventoryProps {
  inventory: InventoryItem[];
  onUpdate: (inventory: InventoryItem[]) => void;
}

export function ShopInventory({ inventory, onUpdate }: ShopInventoryProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [restockingId, setRestockingId] = useState<string | null>(null);
  const [restockAmount, setRestockAmount] = useState(0);

  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    name: "",
    quantity: 0,
    unit: "kg",
    minThreshold: 0,
    category: "",
    supplier: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "minThreshold"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSave = () => {
    if (!formData.name || formData.quantity === undefined) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (editingId) {
      const updated = inventory.map((item) =>
        item.id === editingId
          ? { ...formData, id: editingId } as InventoryItem
          : item
      );
      onUpdate(updated);
      toast.success("Article mis à jour avec succès");
    } else {
      const newItem: InventoryItem = {
        ...formData,
        id: Date.now().toString(),
        lastRestocked: new Date().toISOString(),
      } as InventoryItem;
      onUpdate([...inventory, newItem]);
      toast.success("Article ajouté au stock");
    }

    handleCancel();
  };

  const handleEdit = (item: InventoryItem) => {
    setFormData(item);
    setEditingId(item.id);
    setIsCreating(true);
  };

  const handleDelete = (id: string) => {
    const updated = inventory.filter((item) => item.id !== id);
    onUpdate(updated);
    toast.success("Article supprimé du stock");
  };

  const handleRestock = (id: string) => {
    if (restockAmount <= 0) {
      toast.error("Veuillez entrer une quantité valide");
      return;
    }

    const updated = inventory.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + restockAmount,
            lastRestocked: new Date().toISOString(),
          }
        : item
    );
    onUpdate(updated);
    toast.success(`+${restockAmount} ${inventory.find((i) => i.id === id)?.unit} ajouté au stock`);
    setRestockingId(null);
    setRestockAmount(0);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({
      name: "",
      quantity: 0,
      unit: "kg",
      minThreshold: 0,
      category: "",
      supplier: "",
    });
  };

  const getLowStockItems = () => {
    return inventory.filter((item) => item.quantity <= item.minThreshold);
  };

  const getCategoryStats = () => {
    const categories = new Set(inventory.map((item) => item.category));
    return Array.from(categories).map((category) => ({
      name: category,
      count: inventory.filter((item) => item.category === category).length,
    }));
  };

  const lowStockItems = getLowStockItems();
  const categoryStats = getCategoryStats();

  return (
    <div className="space-y-[24px]">
      {/* Header & Stats */}
      <div className="bg-white rounded-[12px] p-[24px]">
        <div className="flex items-center justify-between mb-[24px]">
          <div>
            <h2 className="font-['Space_Grotesk'] text-[24px] text-[#1f1f1f]">
              Gestion du stock
            </h2>
            <p className="font-['Space_Grotesk'] text-[14px] text-[#6b7280] mt-[4px]">
              Gérez vos matières premières et approvisionnements
            </p>
          </div>
          {!isCreating && (
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-[#FFBF00] text-[#1f1f1f] hover:bg-[#e6ac00] font-['Space_Grotesk']"
            >
              <Plus className="w-[16px] h-[16px] mr-[8px]" />
              Ajouter un article
            </Button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-[16px]">
          <div className="bg-[#f9fafb] rounded-[8px] p-[16px]">
            <div className="flex items-center gap-[8px] mb-[8px]">
              <Package className="w-[20px] h-[20px] text-[#3b82f6]" />
              <span className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
                Total articles
              </span>
            </div>
            <p className="font-['Space_Grotesk'] text-[28px] text-[#1f1f1f]">
              {inventory.length}
            </p>
          </div>

          <div className="bg-[#fef2f2] rounded-[8px] p-[16px]">
            <div className="flex items-center gap-[8px] mb-[8px]">
              <AlertTriangle className="w-[20px] h-[20px] text-[#ef4444]" />
              <span className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
                Stock faible
              </span>
            </div>
            <p className="font-['Space_Grotesk'] text-[28px] text-[#ef4444]">
              {lowStockItems.length}
            </p>
          </div>

          <div className="bg-[#f0fdf4] rounded-[8px] p-[16px]">
            <div className="flex items-center gap-[8px] mb-[8px]">
              <TrendingUp className="w-[20px] h-[20px] text-[#22c55e]" />
              <span className="font-['Space_Grotesk'] text-[14px] text-[#6b7280]">
                Catégories
              </span>
            </div>
            <p className="font-['Space_Grotesk'] text-[28px] text-[#1f1f1f]">
              {categoryStats.length}
            </p>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-white rounded-[12px] p-[24px] border-l-4 border-[#ef4444]">
          <div className="flex items-center gap-[8px] mb-[16px]">
            <AlertTriangle className="w-[20px] h-[20px] text-[#ef4444]" />
            <h3 className="font-['Space_Grotesk'] text-[18px] text-[#1f1f1f]">
              Alerte stock faible
            </h3>
          </div>
          <div className="space-y-[8px]">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-[#fef2f2] rounded-[8px] p-[12px]"
              >
                <div>
                  <p className="font-['Space_Grotesk'] text-[14px] text-[#1f1f1f]">
                    {item.name}
                  </p>
                  <p className="font-['Space_Grotesk'] text-[12px] text-[#6b7280]">
                    Stock actuel: {item.quantity} {item.unit} (Seuil: {item.minThreshold} {item.unit})
                  </p>
                </div>
                <Button
                  onClick={() => setRestockingId(item.id)}
                  size="sm"
                  className="bg-[#FFBF00] text-[#1f1f1f] hover:bg-[#e6ac00] font-['Space_Grotesk']"
                >
                  Réapprovisionner
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create/Edit Form */}
      {isCreating && (
        <div className="bg-white rounded-[12px] p-[24px]">
          <h3 className="font-['Space_Grotesk'] text-[18px] text-[#1f1f1f] mb-[16px]">
            {editingId ? "Modifier l'article" : "Nouvel article"}
          </h3>

          <div className="grid grid-cols-2 gap-[16px] mb-[16px]">
            <div>
              <Label htmlFor="name" className="font-['Space_Grotesk']">
                Nom de l'article *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ex: Farine"
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
                placeholder="Ex: Ingrédients secs, Viandes..."
                className="mt-[8px] font-['Space_Grotesk']"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-[16px] mb-[16px]">
            <div>
              <Label htmlFor="quantity" className="font-['Space_Grotesk']">
                Quantité *
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                step="0.01"
                min="0"
                value={formData.quantity}
                onChange={handleInputChange}
                className="mt-[8px] font-['Space_Grotesk']"
              />
            </div>

            <div>
              <Label htmlFor="unit" className="font-['Space_Grotesk']">
                Unité
              </Label>
              <Input
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                placeholder="kg, L, unités..."
                className="mt-[8px] font-['Space_Grotesk']"
              />
            </div>

            <div>
              <Label htmlFor="minThreshold" className="font-['Space_Grotesk']">
                Seuil minimum
              </Label>
              <Input
                id="minThreshold"
                name="minThreshold"
                type="number"
                step="0.01"
                min="0"
                value={formData.minThreshold}
                onChange={handleInputChange}
                className="mt-[8px] font-['Space_Grotesk']"
              />
            </div>
          </div>

          <div className="mb-[24px]">
            <Label htmlFor="supplier" className="font-['Space_Grotesk']">
              Fournisseur
            </Label>
            <Input
              id="supplier"
              name="supplier"
              value={formData.supplier}
              onChange={handleInputChange}
              placeholder="Nom du fournisseur"
              className="mt-[8px] font-['Space_Grotesk']"
            />
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

      {/* Inventory List */}
      <div className="bg-white rounded-[12px] p-[24px]">
        <h3 className="font-['Space_Grotesk'] text-[18px] text-[#1f1f1f] mb-[16px]">
          Articles en stock ({inventory.length})
        </h3>

        {inventory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-[64px] border-2 border-dashed border-[#d1d5db] rounded-[12px]">
            <Package className="w-[48px] h-[48px] text-[#d1d5db] mb-[16px]" />
            <p className="font-['Space_Grotesk'] text-[16px] text-[#6b7280]">
              Aucun article en stock
            </p>
            <p className="font-['Space_Grotesk'] text-[14px] text-[#9ca3af] mt-[8px]">
              Ajoutez des matières premières pour commencer
            </p>
          </div>
        ) : (
          <div className="space-y-[12px]">
            {inventory.map((item) => (
              <div
                key={item.id}
                className={`border rounded-[8px] p-[16px] ${
                  item.quantity <= item.minThreshold
                    ? "border-[#fca5a5] bg-[#fef2f2]"
                    : "border-[#e5e7eb]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-[8px] mb-[4px]">
                      <h4 className="font-['Space_Grotesk'] text-[16px] text-[#1f1f1f]">
                        {item.name}
                      </h4>
                      {item.category && (
                        <span className="bg-[#f3f4f6] text-[#6b7280] px-[8px] py-[2px] rounded-[4px] font-['Space_Grotesk'] text-[12px]">
                          {item.category}
                        </span>
                      )}
                      {item.quantity <= item.minThreshold && (
                        <span className="bg-[#fef3c7] text-[#92400e] px-[8px] py-[2px] rounded-[4px] font-['Space_Grotesk'] text-[12px] flex items-center gap-[4px]">
                          <AlertTriangle className="w-[12px] h-[12px]" />
                          Stock faible
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-[16px] text-[#6b7280]">
                      <p className="font-['Space_Grotesk'] text-[14px]">
                        Stock: <span className="text-[#1f1f1f] font-semibold">{item.quantity} {item.unit}</span>
                      </p>
                      <p className="font-['Space_Grotesk'] text-[14px]">
                        Seuil: {item.minThreshold} {item.unit}
                      </p>
                      {item.supplier && (
                        <p className="font-['Space_Grotesk'] text-[14px]">
                          Fournisseur: {item.supplier}
                        </p>
                      )}
                      {item.lastRestocked && (
                        <p className="font-['Space_Grotesk'] text-[12px]">
                          Dernier réappro: {new Date(item.lastRestocked).toLocaleDateString("fr-FR")}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-[8px]">
                    {restockingId === item.id ? (
                      <div className="flex items-center gap-[8px]">
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          value={restockAmount}
                          onChange={(e) => setRestockAmount(parseFloat(e.target.value) || 0)}
                          placeholder="Quantité"
                          className="w-[100px] font-['Space_Grotesk']"
                        />
                        <Button
                          onClick={() => handleRestock(item.id)}
                          size="sm"
                          className="bg-[#22c55e] text-white hover:bg-[#16a34a] font-['Space_Grotesk']"
                        >
                          <Save className="w-[14px] h-[14px]" />
                        </Button>
                        <Button
                          onClick={() => {
                            setRestockingId(null);
                            setRestockAmount(0);
                          }}
                          size="sm"
                          variant="outline"
                          className="font-['Space_Grotesk']"
                        >
                          <X className="w-[14px] h-[14px]" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button
                          onClick={() => setRestockingId(item.id)}
                          size="sm"
                          className="bg-[#FFBF00] text-[#1f1f1f] hover:bg-[#e6ac00] font-['Space_Grotesk']"
                        >
                          <TrendingUp className="w-[14px] h-[14px] mr-[4px]" />
                          Réappro
                        </Button>
                        <Button
                          onClick={() => handleEdit(item)}
                          size="sm"
                          variant="outline"
                          className="font-['Space_Grotesk']"
                        >
                          <Edit2 className="w-[14px] h-[14px]" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(item.id)}
                          size="sm"
                          variant="destructive"
                          className="font-['Space_Grotesk']"
                        >
                          <Trash2 className="w-[14px] h-[14px]" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
