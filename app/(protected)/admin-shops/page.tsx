"use client"

import { AdminShopsManagement, ShopForValidation } from "@/components/AdminShopsManagement";
import { Shop } from "@/components/ShopCard";
import { ShopDetails } from "@/components/ShopGeneralInfo";
import { useState } from "react";


export default function AdminShopPage() {
  const [shopsDetails, setShopsDetails] = useState<Record<string, ShopDetails>>({
    "1": {
      id: "1",
      name: "Burger King",
      category: "Fast Food",
      description: "Savourez nos délicieux burgers grillés à la flamme avec des ingrédients frais et de qualité.",
      address: "123 Rue de la République, 75001 Paris",
      phone: "+33 1 23 45 67 89",
      email: "contact@burgerking.fr",
      siret: "123 456 789 00012",
      legalName: "BK France SARL",
      vatNumber: "FR 12 345678901",
      status: "validated",
      imageUrl: "https://images.unsplash.com/photo-1656439659132-24c68e36b553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3NjQzMTQ1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      createdAt: "2025-01-15T10:30:00Z",
      openingHours: [
        { day: "Lundi", open: "11:00", close: "22:00", closed: false },
        { day: "Mardi", open: "11:00", close: "22:00", closed: false },
        { day: "Mercredi", open: "11:00", close: "22:00", closed: false },
        { day: "Jeudi", open: "11:00", close: "22:00", closed: false },
        { day: "Vendredi", open: "11:00", close: "23:00", closed: false },
        { day: "Samedi", open: "11:00", close: "23:00", closed: false },
        { day: "Dimanche", open: "12:00", close: "21:00", closed: false },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1656439659132-24c68e36b553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3NjQzMTQ1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1654471179701-e6dd7544ae5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBkZWxpY2lvdXMlMjBmb29kfGVufDF8fHx8MTc2ODM4MTExOXww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1768051297578-1ea70392c307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBlbGVnYW50fGVufDF8fHx8MTc2ODMzNzYxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1591805364522-9d563414ee09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllcyUyMGZhc3QlMjBmb29kfGVufDF8fHx8MTc2ODMyMDk4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      menus: [
        {
          id: "1",
          name: "Whopper Classique",
          description: "Notre burger signature avec steak de boeuf grillé à la flamme",
          price: 8.90,
          imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1080",
          ingredients: ["Pain", "Steak de boeuf", "Salade", "Tomate", "Oignons", "Cornichons", "Sauce"],
          allergens: ["Gluten", "Sésame"],
          category: "Burgers",
          available: true,
        },
        {
          id: "2",
          name: "Chicken Royale",
          description: "Poulet pané croustillant avec sauce mayonnaise",
          price: 7.50,
          imageUrl: "https://images.unsplash.com/photo-1562059390-a761a084768e?w=1080",
          ingredients: ["Pain", "Poulet pané", "Salade", "Mayonnaise"],
          allergens: ["Gluten", "Œufs"],
          category: "Burgers",
          available: true,
        },
      ],
      inventory: [
        {
          id: "1",
          name: "Pain à burger",
          quantity: 200,
          unit: "unités",
          minThreshold: 50,
          category: "Boulangerie",
          lastRestocked: "2025-01-14T09:00:00Z",
          supplier: "Boulangerie Martin",
        },
        {
          id: "2",
          name: "Steak de boeuf",
          quantity: 25,
          unit: "kg",
          minThreshold: 30,
          category: "Viandes",
          lastRestocked: "2025-01-13T08:00:00Z",
          supplier: "Boucherie Centrale",
        },
        {
          id: "3",
          name: "Salade iceberg",
          quantity: 15,
          unit: "kg",
          minThreshold: 10,
          category: "Légumes",
          lastRestocked: "2025-01-14T07:00:00Z",
          supplier: "Primeurs du marché",
        },
      ],
    },
    "2": {
      id: "2",
      name: "La Trattoria",
      category: "Restaurant",
      description: "Restaurant italien authentique proposant des pâtes fraîches maison et des pizzas au feu de bois.",
      address: "45 Avenue des Champs-Élysées, 75008 Paris",
      phone: "+33 1 45 67 89 01",
      email: "contact@latrattoria.fr",
      status: "pending",
      imageUrl: "https://images.unsplash.com/photo-1532117472055-4d0734b51f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjQzNDI0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      createdAt: "2025-01-20T14:15:00Z",
      gallery: [
        "https://images.unsplash.com/photo-1532117472055-4d0734b51f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjQzNDI0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      menus: [],
      inventory: [],
    },
    "3": {
      id: "3",
      name: "Sushi Master",
      category: "Sushi",
      description: "Cuisine japonaise raffinée avec sushis, sashimis et makis préparés par nos chefs expérimentés.",
      address: "78 Boulevard Saint-Germain, 75005 Paris",
      status: "pending",
      imageUrl: "https://images.unsplash.com/photo-1700324822763-956100f79b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlJTIwZm9vZHxlbnwxfHx8fDE3NjQzMTE2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      createdAt: "2025-01-22T09:45:00Z",
      gallery: [],
      menus: [],
      inventory: [],
    },
    "4": {
      id: "4",
      name: "Pizza Roma",
      category: "Pizzeria",
      description: "Pizzeria napolitaine traditionnelle avec des recettes authentiques transmises de génération en génération.",
      address: "12 Rue de Rivoli, 75004 Paris",
      status: "draft",
      imageUrl: "https://images.unsplash.com/photo-1563245738-9169ff58eccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzY0Mjk5MDE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      createdAt: "2025-01-25T16:20:00Z",
      adminMessage: "Veuillez fournir vos horaires d'ouverture.",
      gallery: [],
      menus: [],
      inventory: [],
    },
    "5": {
      id: "5",
      name: "Le Bistrot",
      category: "Restaurant",
      description: "Bistrot français traditionnel offrant une cuisine de terroir dans une ambiance chaleureuse et conviviale.",
      address: "34 Rue Montorgueil, 75001 Paris",
      status: "validated",
      imageUrl: "https://images.unsplash.com/photo-1739792598744-3512897156e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGludGVyaW9yfGVufDF8fHx8MTc2NDI5Mjk1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      createdAt: "2025-01-10T11:00:00Z",
      gallery: [],
      menus: [],
      inventory: [],
    },
  });

    const [shopsForValidation, setShopsForValidation] = useState<ShopForValidation[]>([
    {
      id: "1",
      name: "Burger King",
      category: "Fast Food",
      description: "Savourez nos délicieux burgers grillés à la flamme.",
      address: "123 Rue de la République, 75001 Paris",
      phone: "+33 1 23 45 67 89",
      email: "contact@burgerking.fr",
      siret: "123 456 789 00012",
      legalName: "BK France SARL",
      vatNumber: "FR 12 345678901",
      imageUrl: "https://images.unsplash.com/photo-1656439659132-24c68e36b553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3NjQzMTQ1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      createdAt: "2025-01-15T10:30:00Z",
      status: "validated",
      documents: [
        {
          id: "sdoc1",
          type: "business_license",
          name: "Licence commerciale",
          uploadedAt: "2025-01-15T11:00:00Z",
          status: "validated",
          url: "https://example.com/shop-docs/sdoc1.pdf",
        },
        {
          id: "sdoc2",
          type: "kbis",
          name: "Extrait KBIS",
          uploadedAt: "2025-01-15T11:15:00Z",
          expiryDate: "2025-12-31",
          status: "validated",
          url: "https://example.com/shop-docs/sdoc2.pdf",
        },
        {
          id: "sdoc3",
          type: "food_safety_cert",
          name: "Certificat d'hygiène alimentaire",
          uploadedAt: "2025-01-15T11:30:00Z",
          expiryDate: "2026-01-31",
          status: "validated",
          url: "https://example.com/shop-docs/sdoc3.pdf",
        },
      ],
      openingHours: [
        { day: "Lundi", open: "11:00", close: "22:00", closed: false },
        { day: "Mardi", open: "11:00", close: "22:00", closed: false },
        { day: "Mercredi", open: "11:00", close: "22:00", closed: false },
        { day: "Jeudi", open: "11:00", close: "22:00", closed: false },
        { day: "Vendredi", open: "11:00", close: "23:00", closed: false },
        { day: "Samedi", open: "11:00", close: "23:00", closed: false },
        { day: "Dimanche", open: "12:00", close: "21:00", closed: false },
      ],
    },
    {
      id: "2",
      name: "La Trattoria",
      category: "Restaurant",
      description: "Restaurant italien authentique proposant des pâtes fraîches maison.",
      address: "45 Avenue des Champs-Élysées, 75008 Paris",
      phone: "+33 1 45 67 89 01",
      email: "contact@latrattoria.fr",
      siret: "234 567 890 00013",
      legalName: "La Trattoria SARL",
      imageUrl: "https://images.unsplash.com/photo-1532117472055-4d0734b51f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjQzNDI0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      createdAt: "2025-01-20T14:15:00Z",
      status: "pending",
      documents: [
        {
          id: "sdoc4",
          type: "kbis",
          name: "Extrait KBIS",
          uploadedAt: "2025-01-20T14:30:00Z",
          expiryDate: "2025-11-30",
          status: "pending",
          url: "https://example.com/shop-docs/sdoc4.pdf",
        },
        {
          id: "sdoc5",
          type: "food_safety_cert",
          name: "Certificat d'hygiène",
          uploadedAt: "2025-01-20T14:45:00Z",
          expiryDate: "2025-02-15",
          status: "pending",
          url: "https://example.com/shop-docs/sdoc5.pdf",
        },
        {
          id: "sdoc6",
          type: "insurance",
          name: "Assurance professionnelle",
          uploadedAt: "2025-01-20T15:00:00Z",
          expiryDate: "2026-03-31",
          status: "pending",
          url: "https://example.com/shop-docs/sdoc6.pdf",
        },
      ],
    },
    {
      id: "3",
      name: "Sushi Master",
      category: "Sushi",
      description: "Cuisine japonaise raffinée avec sushis, sashimis et makis.",
      address: "78 Boulevard Saint-Germain, 75005 Paris",
      imageUrl: "https://images.unsplash.com/photo-1700324822763-956100f79b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlJTIwZm9vZHxlbnwxfHx8fDE3NjQzMTE2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      createdAt: "2025-01-22T09:45:00Z",
      status: "incomplete",
      documents: [
        {
          id: "sdoc7",
          type: "kbis",
          name: "Extrait KBIS",
          uploadedAt: "2025-01-22T10:00:00Z",
          expiryDate: "2024-12-31",
          status: "refused",
          url: "https://example.com/shop-docs/sdoc7.pdf",
          adminComment: "Le KBIS est expiré. Veuillez télécharger un document à jour.",
        },
        {
          id: "sdoc8",
          type: "food_safety_cert",
          name: "Certificat d'hygiène",
          uploadedAt: "2025-01-22T10:15:00Z",
          status: "validated",
          url: "https://example.com/shop-docs/sdoc8.pdf",
        },
      ],
      adminMessage: "Veuillez fournir un KBIS à jour et une assurance professionnelle.",
    },
  ]);

    const handleValidateShopForValidation = (shopId: string, comment?: string) => {
    setShopsForValidation((prevShops) =>
      prevShops.map((shop) =>
        shop.id === shopId
          ? { ...shop, status: "validated" as const, adminMessage: comment }
          : shop
      )
    );
  };

  const handleRefuseShopForValidation = (shopId: string, comment: string) => {
    setShopsForValidation((prevShops) =>
      prevShops.map((shop) =>
        shop.id === shopId
          ? { ...shop, status: "refused" as const, adminMessage: comment }
          : shop
      )
    );
  };

  const handleRequestInfoForValidation = (shopId: string, comment: string) => {
    setShopsForValidation((prevShops) =>
      prevShops.map((shop) =>
        shop.id === shopId
          ? { ...shop, status: "incomplete" as const, adminMessage: comment }
          : shop
      )
    );
  };

  const handleValidateShopDocument = (
    shopId: string,
    documentId: string,
    comment?: string
  ) => {
    setShopsForValidation((prevShops) =>
      prevShops.map((shop) =>
        shop.id === shopId
          ? {
              ...shop,
              documents: shop.documents.map((doc) =>
                doc.id === documentId
                  ? { ...doc, status: "validated" as const, adminComment: comment }
                  : doc
              ),
            }
          : shop
      )
    );
  };

  const handleRefuseShopDocument = (
    shopId: string,
    documentId: string,
    comment: string
  ) => {
    setShopsForValidation((prevShops) =>
      prevShops.map((shop) =>
        shop.id === shopId
          ? {
              ...shop,
              documents: shop.documents.map((doc) =>
                doc.id === documentId
                  ? { ...doc, status: "refused" as const, adminComment: comment }
                  : doc
              ),
            }
          : shop
      )
    );
  };

handleValidateShopDocument
  // Shop handlers
  const handleCreateShop = (
    shopData: Omit<Shop, "id" | "status" | "createdAt">
  ) => {
    const newId = Date.now().toString();
    const newShopDetails: ShopDetails = {
      ...shopData,
      id: newId,
      status: "pending",
      createdAt: new Date().toISOString(),
      gallery: shopData.imageUrl ? [shopData.imageUrl] : [],
      menus: [],
      inventory: [],
    };
    setShopsDetails((prev) => ({
      ...prev,
      [newId]: newShopDetails,
    }));
  };

  const handleValidateShop = (shopId: string, message?: string) => {
    setShopsDetails((prev) => ({
      ...prev,
      [shopId]: {
        ...prev[shopId],
        status: "validated" as const,
        adminMessage: message,
      },
    }));
  };

  const handleRefuseShop = (shopId: string, message: string) => {
    setShopsDetails((prev) => ({
      ...prev,
      [shopId]: {
        ...prev[shopId],
        status: "refused" as const,
        adminMessage: message,
      },
    }));
  };



  return(
    <>
    <AdminShopsManagement
                    shops={shopsForValidation}
                    onValidateShop={handleValidateShopForValidation}
                    onRefuseShop={handleRefuseShopForValidation}
                    onValidateDocument={handleValidateShopDocument}
                    onRefuseDocument={handleRefuseShopDocument}
                    onRequestMoreInfo={handleRequestInfoForValidation}
                  />
    </>
  )
}