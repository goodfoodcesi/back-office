import type { ShopStatus } from "@/types/shop";

interface StatusBadgeProps {
  status: ShopStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const configs = {
    draft: {
      label: "Brouillon",
      bg: "#6b7280",
      text: "white",
      icon: "📝",
    },
    pending_validation: {
      label: "En attente",
      bg: "#FFBF00",
      text: "#1f1f1f",
      icon: "⏳",
    },
    action_required: {
      label: "Action requise",
      bg: "#fb923c",
      text: "white",
      icon: "⚠️",
    },
    validated: {
      label: "Validé",
      bg: "#22c55e",
      text: "white",
      icon: "✓",
    },
    visible: {
      label: "Publié",
      bg: "#16a34a",
      text: "white",
      icon: "👁️",
    },
    hidden: {
      label: "Masqué",
      bg: "#64748b",
      text: "white",
      icon: "🙈",
    },
    rejected: {
      label: "Refusé",
      bg: "#ef4444",
      text: "white",
      icon: "✗",
    },
  } as const;

  const config = configs[status];

  if (!config) {
    // 🔴 IMPORTANT : fallback safe
    return (
      <div className="inline-flex items-center gap-[6px] px-[12px] py-[6px] rounded-[6px] bg-gray-400">
        <span className="text-white text-[12px]">Statut inconnu</span>
      </div>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-[6px] px-[12px] py-[6px] rounded-[6px]"
      style={{ backgroundColor: config.bg }}
    >
      <span style={{ color: config.text }}>{config.icon}</span>
      <span
        className="font-['Space_Grotesk'] text-[12px]"
        style={{ color: config.text }}
      >
        {config.label}
      </span>
    </div>
  );
}
