export type MenuChoice = {
  id: string;
  name: string;
  price: number;
};

export type MenuOption = {
  id: string;
  name: string;
  required: boolean;
  type: "single" | "multiple";
  minChoices: number;
  maxChoices: number;
  choices: MenuChoice[];
};

export type MenuItemApi = {
  id: string;
  shopId: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  category: string;
  isPublished: boolean;
  options?: MenuOption[];
  createdAt?: string;
  updatedAt?: string;
};
