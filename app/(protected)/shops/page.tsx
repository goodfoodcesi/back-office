"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShopsView } from "@/components/ShopsView";
import { Shop } from "@/components/ShopCard";

export default function ShopPage() {
    const [shops, setShops] = useState<Shop[]>([
      {
        id: "1",
        name: "Burger King",
        description: "Savourez nos délicieux burgers grillés à la flamme avec des ingrédients frais et de qualité.",
        address: "123 Rue de la République, 75001 Paris",
        status: "validated",
        imageUrl: "https://images.unsplash.com/photo-1656439659132-24c68e36b553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3NjQzMTQ1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        createdAt: "2025-01-15T10:30:00Z",
        category: "Fast Food",
      },
      {
        id: "2",
        name: "La Trattoria",
        description: "Restaurant italien authentique proposant des pâtes fraîches maison et des pizzas au feu de bois.",
        address: "45 Avenue des Champs-Élysées, 75008 Paris",
        status: "pending",
        imageUrl: "https://images.unsplash.com/photo-1532117472055-4d0734b51f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjQzNDI0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        createdAt: "2025-01-20T14:15:00Z",
        category: "Restaurant",
      },
      {
        id: "3",
        name: "Sushi Master",
        description: "Cuisine japonaise raffinée avec sushis, sashimis et makis préparés par nos chefs expérimentés.",
        address: "78 Boulevard Saint-Germain, 75005 Paris",
        status: "pending",
        imageUrl: "https://images.unsplash.com/photo-1700324822763-956100f79b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlJTIwZm9vZHxlbnwxfHx8fDE3NjQzMTE2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        createdAt: "2025-01-22T09:45:00Z",
        category: "Sushi",
      },
      {
        id: "4",
        name: "Pizza Roma",
        description: "Pizzeria napolitaine traditionnelle avec des recettes authentiques transmises de génération en génération.",
        address: "12 Rue de Rivoli, 75004 Paris",
        status: "draft",
        imageUrl: "https://images.unsplash.com/photo-1563245738-9169ff58eccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzY0Mjk5MDE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        createdAt: "2025-01-25T16:20:00Z",
        category: "Pizzeria",
        adminMessage: "Veuillez fournir vos horaires d'ouverture.",
      },
      {
        id: "5",
        name: "Le Bistrot",
        description: "Bistrot français traditionnel offrant une cuisine de terroir dans une ambiance chaleureuse et conviviale.",
        address: "34 Rue Montorgueil, 75001 Paris",
        status: "validated",
        imageUrl: "https://images.unsplash.com/photo-1739792598744-3512897156e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGludGVyaW9yfGVufDF8fHx8MTc2NDI5Mjk1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
        createdAt: "2025-01-10T11:00:00Z",
        category: "Restaurant",
      },
    ]);


    const handleCreateShop = (
      shopData: Omit<Shop, "id" | "status" | "createdAt">
    ) => {
      const newShop: Shop = {
        ...shopData,
        id: Date.now().toString(),
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      setShops([newShop, ...shops]);
    };
  

  return (
<>
 <ShopsView shops={shops} onCreateShop={handleCreateShop} />
</>
  );
}