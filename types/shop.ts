export type ApiScheduleDay =
  | { isOpen: false }
  | {
      isOpen: true;
      openMorning?: string;
      closeMorning?: string;
      openEvening?: string;
      closeEvening?: string;
    };

export type ApiWeekSchedule = Partial<Record<
  "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday",
  ApiScheduleDay
>>;

export type ShopStatus =
  | "draft"
  | "pending_validation"
  | "action_required"
  | "validated"
  | "visible"
  | "hidden"
  | "rejected";

export type ApiShopDetails = {
  id: string;
  name: string;
  description: string | null;
  email: string | null;
  phone: string | null;
  address: string;
  addressLine2: string | null;
  city: string;
  zipCode: string;
  country: string;
  latitude: string | null;
  longitude: string | null;
  siret: string;
  logo: string | null;
  coverImage: string | null;
  prepTime: number | null;
  schedule: ApiWeekSchedule | null;
  status: ShopStatus;
  actionRequiredReason: string | null;
  rejectedReason: string | null;
  createdAt: string;
  updatedAt: string;
};
