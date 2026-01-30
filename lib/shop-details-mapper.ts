import type { ApiShopDetails, ApiWeekSchedule } from "@/types/shop";

const dayLabels: Record<string, string> = {
  monday: "Lundi",
  tuesday: "Mardi",
  wednesday: "Mercredi",
  thursday: "Jeudi",
  friday: "Vendredi",
  saturday: "Samedi",
  sunday: "Dimanche",
};

export type UiOpeningHours = {
  dayKey: keyof ApiWeekSchedule;
  dayLabel: string;
  isOpen: boolean;
  openMorning?: string;
  closeMorning?: string;
  openEvening?: string;
  closeEvening?: string;
};

export function mapScheduleToUi(schedule: ApiWeekSchedule | null): UiOpeningHours[] {
  const keys = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"] as const;

  return keys.map((k) => {
    const d = schedule?.[k];
    if (!d || d.isOpen === false) {
      return { dayKey: k, dayLabel: dayLabels[k], isOpen: false };
    }
    return {
      dayKey: k,
      dayLabel: dayLabels[k],
      isOpen: true,
      openMorning: d.openMorning,
      closeMorning: d.closeMorning,
      openEvening: d.openEvening,
      closeEvening: d.closeEvening,
    };
  });
}

export function getStatusLabel(status: ApiShopDetails["status"]) {
  switch (status) {
    case "draft": return "Brouillon";
    case "pending_validation": return "En attente de validation";
    case "action_required": return "Action requise";
    case "validated": return "Validé";
    case "visible": return "Visible";
    case "hidden": return "Masqué";
    case "rejected": return "Rejeté";
    default: return status;
  }
}

